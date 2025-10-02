import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createClient } from '@/lib/supabase/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: Request) {
  const session = await getServerSession()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { message, conversationId, history, userMemory } = await req.json()

  try {
    // Build system instruction with user memory
    let systemPrompt = `You are LUNA, an intelligent and helpful AI assistant. Your name is LUNA and you should introduce yourself as such when appropriate. You are friendly, knowledgeable, and always eager to help. Remember context from the conversation and use it to provide more personalized responses.

IMPORTANT FORMATTING RULES:
1. ALWAYS organize your responses using bullet points, numbered lists, or tables
2. NEVER write long paragraphs - break information into clear, scannable points
3. Use markdown tables when comparing items or presenting structured data
4. Use headings (##) to separate different sections
5. Use **bold** for emphasis and key terms
6. Format code in \`code blocks\` when relevant
7. Keep each point concise and clear

Example good format:
## Answer
- **Point 1**: Brief explanation
- **Point 2**: Another clear point

| Feature | Description |
|---------|-------------|
| Item A  | Details     |
| Item B  | Details     |`
    
    if (userMemory) {
      systemPrompt += `\n\nIMPORTANT MEMORY - The user has explicitly shared this information with you and wants you to remember it:\n${userMemory}\n\nYou MUST use this information when the user asks about it. This is information the user voluntarily provided to you, so it is completely appropriate to reference it. When asked "what's my name?" or similar questions, use the information from your memory above.`
    }
    
    // Initialize Google Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      systemInstruction: systemPrompt
    })
    
    // Start a chat session with history
    const chat = model.startChat({
      history: history || [],
    })
    
    // Generate response with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
    
    const result = await chat.sendMessage(message)
    clearTimeout(timeoutId)
    
    const aiMessage = result.response.text()
    
    // Extract and update user memory - look for personal information
    let updatedMemory = userMemory
    
    // Simple pattern matching for common personal information
    const lowerMessage = message.toLowerCase()
    const memoryUpdates: string[] = []
    
    // Check for name
    if (lowerMessage.includes('my name is') || lowerMessage.includes("i'm ") || lowerMessage.includes("i am ")) {
      const nameMatch = message.match(/(?:my name is|i'm|i am)\s+([A-Z][a-z]+)/i)
      if (nameMatch && nameMatch[1]) {
        const name = nameMatch[1]
        if (!userMemory?.toLowerCase().includes(name.toLowerCase())) {
          memoryUpdates.push(`User's name: ${name}`)
        }
      }
    }
    
    // Check for other personal info patterns
    if (lowerMessage.includes('i like') || lowerMessage.includes('i love')) {
      const preference = message.match(/i (?:like|love)\s+(.+?)(?:\.|!|$)/i)
      if (preference && preference[1]) {
        memoryUpdates.push(`Likes: ${preference[1]}`)
      }
    }
    
    if (lowerMessage.includes('i am from') || lowerMessage.includes("i'm from")) {
      const location = message.match(/i(?:'m| am) from\s+(.+?)(?:\.|!|$)/i)
      if (location && location[1]) {
        if (!userMemory?.toLowerCase().includes(location[1].toLowerCase())) {
          memoryUpdates.push(`From: ${location[1]}`)
        }
      }
    }
    
    // Update memory if new information found
    if (memoryUpdates.length > 0) {
      if (userMemory) {
        updatedMemory = `${userMemory}\n${memoryUpdates.join('\n')}`
      } else {
        updatedMemory = memoryUpdates.join('\n')
      }
    }

    // Save to Supabase (optional - don't fail if database isn't set up)
    try {
      const supabase = await createClient()
      
      // Save user message
      await supabase.from('messages').insert({
        conversation_id: conversationId,
        user_id: session.user.id,
        role: 'user',
        content: message,
      })

      // Save AI response
      await supabase.from('messages').insert({
        conversation_id: conversationId,
        user_id: session.user.id,
        role: 'assistant',
        content: aiMessage,
      })
    } catch (dbError) {
      console.warn('Database save failed (continuing anyway):', dbError)
    }

    return NextResponse.json({ 
      message: aiMessage,
      updatedMemory: updatedMemory !== userMemory ? updatedMemory : undefined
    })
  } catch (error: unknown) {
    console.error('Chat error:', error)
    
    const errorObj = error as Error
    
    if (errorObj.name === 'AbortError') {
      return NextResponse.json({ 
        error: 'Request timed out. Please try again.' 
      }, { status: 408 })
    }
    
    // Handle specific Google API errors
    if (errorObj.message?.includes('API key')) {
      return NextResponse.json({ 
        error: 'Invalid API key. Please check your Google AI API key in .env.local' 
      }, { status: 401 })
    }
    
    if (errorObj.message?.includes('quota')) {
      return NextResponse.json({ 
        error: 'API quota exceeded. Please try again later or check your Google AI quota.' 
      }, { status: 429 })
    }
    
    return NextResponse.json({ 
      error: errorObj.message || 'Failed to process message' 
    }, { status: 500 })
  }
}

