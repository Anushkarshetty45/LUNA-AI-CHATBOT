'use client'

import { signOut, useSession } from 'next-auth/react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import Sidebar from './Sidebar'
import ThemeToggle from './ThemeToggle'
import { LogOut } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Conversation {
  id: string
  title: string
  preview: string
}

interface ChatInterfaceProps {
  messages: Message[]
  input: string
  setInput: (value: string) => void
  onSend: () => void
  onNewChat: () => void
  conversations: Conversation[]
  currentConversationId: string
  onSelectConversation: (id: string) => void
  onDeleteConversation: (id: string) => void
  loading: boolean
}

export default function ChatInterface({ 
  messages, 
  input, 
  setInput, 
  onSend, 
  onNewChat, 
  conversations,
  currentConversationId,
  onSelectConversation,
  onDeleteConversation,
  loading 
}: ChatInterfaceProps) {
  const { data: session } = useSession()

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950">
      {/* Sidebar */}
      <Sidebar 
        onNewChat={onNewChat} 
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={onSelectConversation}
        onDeleteConversation={onDeleteConversation}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-80 h-80 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 dark:bg-teal-500/10 rounded-full filter blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 bg-white/70 dark:bg-gradient-to-r dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/30 px-8 py-5 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative group">
              {/* Outer glow layers */}
              <div className="absolute inset-0 -m-2 rounded-full bg-yellow-400/20 dark:bg-yellow-300/30 blur-lg animate-pulse"></div>
              <div className="absolute inset-0 -m-1 rounded-full bg-yellow-400/30 dark:bg-yellow-300/40 blur-md animate-pulse" style={{animationDelay: '0.5s'}}></div>
              
              {/* Moon icon */}
              <svg className="w-6 h-6 relative z-10 text-gray-800 dark:text-yellow-100 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
            <h1 className="text-2xl font-light tracking-wider bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">LUNA</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-gray-700/30">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300 font-light">{session?.user?.email}</span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 px-4 py-2 text-xs font-light text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5 rounded-lg transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        <MessageList messages={messages} loading={loading} />
        <ChatInput input={input} setInput={setInput} onSend={onSend} loading={loading} />
      </div>
    </div>
  )
}

