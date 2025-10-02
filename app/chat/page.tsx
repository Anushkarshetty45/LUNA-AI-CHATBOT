'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ChatInterface from '@/components/ChatInterface'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Conversation {
  id: string
  title: string
  preview: string
  messages: Message[]
}

export default function ChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string>('')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [userMemory, setUserMemory] = useState<string>('')

  // Load conversations and user memory from localStorage on mount
  useEffect(() => {
    if (session?.user?.email) {
      const storageKey = `luna_conversations_${session.user.email}`
      const memoryKey = `luna_memory_${session.user.email}`
      
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setConversations(parsed)
        } catch (e) {
          console.error('Failed to load conversations:', e)
        }
      }
      
      const savedMemory = localStorage.getItem(memoryKey)
      if (savedMemory) {
        setUserMemory(savedMemory)
      }
    }
  }, [session?.user?.email])

  // Save conversations and memory to localStorage whenever they change
  useEffect(() => {
    if (session?.user?.email && conversations.length > 0) {
      const storageKey = `luna_conversations_${session.user.email}`
      localStorage.setItem(storageKey, JSON.stringify(conversations))
    }
  }, [conversations, session?.user?.email])

  useEffect(() => {
    if (session?.user?.email && userMemory) {
      const memoryKey = `luna_memory_${session.user.email}`
      localStorage.setItem(memoryKey, userMemory)
    }
  }, [userMemory, session?.user?.email])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  const currentConversation = conversations.find(c => c.id === currentConversationId)
  const messages = currentConversation?.messages || []
  
  // Filter conversations to only show those with messages
  const conversationsWithMessages = conversations.filter(c => c.messages.length > 0)

  const handleNewChat = () => {
    // Remove any empty conversations first
    setConversations(prev => prev.filter(c => c.messages.length > 0))
    
    const newConv: Conversation = {
      id: `conv_${Date.now()}`,
      title: 'New Chat',
      preview: 'Start a conversation...',
      messages: []
    }
    setConversations(prev => [newConv, ...prev])
    setCurrentConversationId(newConv.id)
  }

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id)
  }

  const handleDeleteConversation = (id: string) => {
    // Remove the conversation from the list
    setConversations(prev => prev.filter(c => c.id !== id))
    
    // If we're deleting the current conversation, clear it
    if (currentConversationId === id) {
      setCurrentConversationId('')
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input
    setInput('')
    
    // If no current conversation, create one
    if (!currentConversationId) {
      const newConv: Conversation = {
        id: `conv_${Date.now()}`,
        title: userMessage.slice(0, 30) + (userMessage.length > 30 ? '...' : ''),
        preview: userMessage.slice(0, 50) + (userMessage.length > 50 ? '...' : ''),
        messages: [{ role: 'user', content: userMessage }]
      }
      setConversations(prev => [newConv, ...prev])
      setCurrentConversationId(newConv.id)
      
      // Continue with API call using the new conversation ID
      await processMessage(userMessage, newConv.id)
      return
    }
    
    // Add user message to current conversation
    setConversations(prev => prev.map(conv => 
      conv.id === currentConversationId
        ? { 
            ...conv, 
            messages: [...conv.messages, { role: 'user', content: userMessage }],
            // Update title and preview if this is the first message
            title: conv.messages.length === 0 ? userMessage.slice(0, 30) + (userMessage.length > 30 ? '...' : '') : conv.title,
            preview: userMessage.slice(0, 50) + (userMessage.length > 50 ? '...' : '')
          }
        : conv
    ))
    
    await processMessage(userMessage, currentConversationId)
  }

  const processMessage = async (userMessage: string, conversationId: string) => {
    setLoading(true)

    try {
      // Get the current conversation to send history
      const currentConv = conversations.find(c => c.id === conversationId)
      
      // Convert messages to Gemini format
      const history = currentConv?.messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })) || []

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          conversationId,
          history,
          userMemory 
        }),
      })

      const data = await response.json()
      
      const aiMessage = response.ok && data.message
        ? data.message
        : `Error: ${data.error || 'Failed to get response. Please check your API keys.'}`
      
      // Update user memory if provided
      if (data.updatedMemory) {
        setUserMemory(data.updatedMemory)
      }
      
      // Add AI response to current conversation
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId
          ? { ...conv, messages: [...conv.messages, { role: 'assistant', content: aiMessage }] }
          : conv
      ))
    } catch (error) {
      console.error('Error:', error)
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId
          ? { ...conv, messages: [...conv.messages, { role: 'assistant', content: 'Network error. Please try again.' }] }
          : conv
      ))
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <ChatInterface
      messages={messages}
      input={input}
      setInput={setInput}
      onSend={sendMessage}
      onNewChat={handleNewChat}
      conversations={conversationsWithMessages}
      currentConversationId={currentConversationId}
      onSelectConversation={handleSelectConversation}
      onDeleteConversation={handleDeleteConversation}
      loading={loading}
    />
  )
}