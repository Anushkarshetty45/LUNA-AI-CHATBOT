import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const session = await getServerSession()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { message, conversationId } = await req.json()

  try {
    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-exp:free',
        messages: [
          { role: 'user', content: message }
        ],
      }),
    })

    const data = await response.json()
    const aiMessage = data.choices[0].message.content

    // Save to Supabase
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

    return NextResponse.json({ message: aiMessage })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}

