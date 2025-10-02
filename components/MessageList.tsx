'use client'

import MarkdownRenderer from './MarkdownRenderer'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface MessageListProps {
  messages: Message[]
  loading: boolean
}

export default function MessageList({ messages, loading }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
      {messages.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center max-w-md space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-4 backdrop-blur-sm shadow-lg shadow-gray-900/20">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-light text-gray-700 dark:text-gray-300">Start a conversation with LUNA</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light">Ask me anything! I'm here to help with questions, ideas, or just to chat.</p>
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              <div className="px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-gray-700/20 text-xs text-gray-600 dark:text-gray-400 font-light hover:border-gray-500/40 transition-all cursor-pointer">💡 Get creative ideas</div>
              <div className="px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-gray-700/20 text-xs text-gray-600 dark:text-gray-400 font-light hover:border-gray-500/40 transition-all cursor-pointer">📚 Learn something new</div>
              <div className="px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-gray-700/20 text-xs text-gray-600 dark:text-gray-400 font-light hover:border-gray-500/40 transition-all cursor-pointer">🤔 Solve problems</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div
                className={`max-w-2xl px-5 py-3.5 rounded-2xl font-light text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-gray-900/20'
                    : 'bg-white/80 dark:bg-white/10 backdrop-blur-md text-gray-800 dark:text-gray-100 border border-gray-200/50 dark:border-gray-700/10'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <MarkdownRenderer content={msg.content} />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-gray-200/50 dark:border-gray-700/10 shadow-sm">
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

