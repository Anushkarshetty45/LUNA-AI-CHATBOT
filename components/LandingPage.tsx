'use client'

import { signIn } from 'next-auth/react'
import { MessageCircle, Lock, Zap } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Moon Icon with LUNA */}
          <div className="flex items-center justify-center gap-5 mb-8">
            <div className="relative group">
              {/* Outer glow layers - black glow effect */}
              <div className="absolute inset-0 -m-8 rounded-full bg-gray-300/40 blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 -m-6 rounded-full bg-gray-400/50 blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute inset-0 -m-4 rounded-full bg-gray-500/60 blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
              
              {/* Moon icon - black with glow */}
              <svg className="w-24 h-24 relative z-10 text-gray-900 drop-shadow-[0_0_20px_rgba(0,0,0,0.6)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
            <h1 className="text-8xl font-light tracking-widest text-black">
              LUNA
            </h1>
          </div>
          
          <p className="text-lg text-black mb-12 font-light">
            Your intelligent AI companion
          </p>
          
          <button
            onClick={() => signIn('google', { callbackUrl: '/chat' })}
            className="group relative px-8 py-4 bg-black/90 backdrop-blur-sm border border-black rounded-full text-white font-light text-lg hover:bg-black transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              Start Chatting
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

        {/* Minimal Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-24">
          <Feature
            icon={<MessageCircle className="w-6 h-6" strokeWidth={1.5} />}
            title="Natural Conversations"
            description="Powered by Gemini AI"
          />
          <Feature
            icon={<Lock className="w-6 h-6" strokeWidth={1.5} />}
            title="Secure & Private"
            description="Your data, protected"
          />
          <Feature
            icon={<Zap className="w-6 h-6" strokeWidth={1.5} />}
            title="Lightning Fast"
            description="Instant responses"
          />
        </div>
      </div>
    </div>
  )
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center p-6 rounded-xl bg-gray-50 backdrop-blur-sm border border-gray-200 hover:bg-gray-100 transition-all duration-300">
      <div className="flex justify-center mb-3 text-black">{icon}</div>
      <h3 className="text-sm font-light text-black mb-1">{title}</h3>
      <p className="text-xs text-gray-700 font-light">{description}</p>
    </div>
  )
}

