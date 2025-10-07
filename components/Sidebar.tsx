'use client'

import { Plus, MessageSquare, Trash2 } from 'lucide-react'

interface Conversation {
  id: string
  title: string
  preview: string
}

interface SidebarProps {
  onNewChat: () => void
  conversations: Conversation[]
  currentConversationId: string
  onSelectConversation: (id: string) => void
  onDeleteConversation: (id: string) => void
}

export default function Sidebar({ onNewChat, conversations, currentConversationId, onSelectConversation, onDeleteConversation }: SidebarProps) {
  return (
    <div className="w-64 bg-white/30 dark:bg-gradient-to-b dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-md text-gray-900 dark:text-white p-4 flex flex-col h-screen border-r border-gray-200/50 dark:border-gray-700/30">
      <button
        onClick={onNewChat}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-4 py-3 rounded-xl transition-all mb-6 font-light text-sm shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30 cursor-pointer"
      >
        <Plus className="w-4 h-4" strokeWidth={1.5} />
        <span>New Chat</span>
      </button>

      <div className="flex-1 overflow-y-auto space-y-1">
        <h3 className="text-xs font-light text-gray-400 dark:text-gray-500 px-2 mb-3 tracking-wider">RECENT CHATS</h3>
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`group relative rounded-lg transition-all ${
              currentConversationId === conv.id
                ? 'bg-white/70 dark:bg-white/10 border border-gray-200/50 dark:border-gray-600/30'
                : 'hover:bg-white/30 dark:hover:bg-white/5 hover:border hover:border-gray-500/20'
            }`}
          >
            <button
              onClick={() => onSelectConversation(conv.id)}
              className="w-full text-left px-3 py-2.5 font-light cursor-pointer"
            >
              <div className="flex items-start gap-2 pr-6">
                <MessageSquare className={`w-3.5 h-3.5 mt-1 flex-shrink-0 ${
                  currentConversationId === conv.id
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`} strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <div className={`text-xs truncate ${
                    currentConversationId === conv.id
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>{conv.title}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">{conv.preview}</div>
                </div>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDeleteConversation(conv.id)
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md opacity-50 group-hover:opacity-100 hover:bg-red-500/10 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-all cursor-pointer"
              title="Delete chat"
            >
              <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

