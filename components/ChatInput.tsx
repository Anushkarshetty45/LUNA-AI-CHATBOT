'use client'

import { Send } from 'lucide-react'

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  onSend: () => void
  loading: boolean
}

export default function ChatInput({ input, setInput, onSend, loading }: ChatInputProps) {
  return (
    <div className="relative z-10 bg-white/70 dark:bg-gradient-to-b dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/30 p-6 shadow-lg">
      <div className="flex gap-3 max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !loading && onSend()}
          placeholder="Ask me anything..."
          className="flex-1 px-6 py-4 bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-500/50 dark:focus:ring-gray-400/50 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 font-light text-sm transition-all shadow-sm hover:shadow-md"
        />
        <button
          onClick={onSend}
          disabled={loading || !input.trim()}
          className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-2xl hover:from-gray-900 hover:to-black hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-gray-900/20 hover:shadow-gray-900/40 cursor-pointer"
        >
          <Send className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 dark:text-gray-500 font-light mt-3">Powered by Google Gemini AI</p>
    </div>
  )
}

