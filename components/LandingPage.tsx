'use client'

import { signIn } from 'next-auth/react'
import { MessageCircle, Lock, Zap } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0520] via-[#0d0d2b] to-[#1a1a3e] relative overflow-hidden">
      {/* Night Sky Background */}
      <div className="absolute inset-0">
        {/* Shooting star effect */}
        <div className="absolute top-20 right-1/4 w-1 h-1 bg-white rounded-full shadow-lg shadow-white/50 animate-ping"></div>
        
        {/* Stars - Small twinkling dots */}
        <div className="absolute top-10 left-10 w-1.5 h-1.5 bg-white rounded-full shadow-sm shadow-white animate-pulse"></div>
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-white rounded-full shadow-sm shadow-white opacity-90 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-32 right-1/3 w-1 h-1 bg-blue-100 rounded-full shadow-sm shadow-blue-100 opacity-80 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 right-1/4 w-0.5 h-0.5 bg-white rounded-full opacity-70 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-52 left-1/3 w-1.5 h-1.5 bg-white rounded-full shadow-sm shadow-white opacity-95 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-16 right-20 w-1 h-1 bg-purple-100 rounded-full shadow-sm shadow-purple-100 opacity-75 animate-pulse" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute top-64 left-1/2 w-1 h-1 bg-white rounded-full shadow-sm shadow-white opacity-85 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-80 right-1/2 w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-pulse" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-white rounded-full shadow-sm shadow-white opacity-90 animate-pulse" style={{animationDelay: '1.8s'}}></div>
        <div className="absolute bottom-60 right-40 w-1 h-1 bg-blue-100 rounded-full shadow-sm shadow-blue-100 opacity-80 animate-pulse" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-80 left-1/3 w-1 h-1 bg-white rounded-full shadow-sm shadow-white opacity-70 animate-pulse" style={{animationDelay: '2.2s'}}></div>
        <div className="absolute bottom-32 right-1/3 w-1.5 h-1.5 bg-white rounded-full shadow-sm shadow-white opacity-95 animate-pulse" style={{animationDelay: '0.6s'}}></div>
        
        {/* More scattered stars */}
        <div className="absolute top-28 left-20 w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-pulse" style={{animationDelay: '1.3s'}}></div>
        <div className="absolute top-48 right-10 w-1 h-1 bg-white rounded-full shadow-sm shadow-white opacity-75 animate-pulse" style={{animationDelay: '0.9s'}}></div>
        <div className="absolute top-96 left-40 w-1 h-1 bg-purple-100 rounded-full shadow-sm shadow-purple-100 opacity-70 animate-pulse" style={{animationDelay: '1.6s'}}></div>
        <div className="absolute bottom-24 left-1/4 w-1 h-1 bg-blue-100 rounded-full shadow-sm shadow-blue-100 opacity-80 animate-pulse" style={{animationDelay: '2.3s'}}></div>
        <div className="absolute bottom-52 right-1/4 w-0.5 h-0.5 bg-white rounded-full opacity-65 animate-pulse" style={{animationDelay: '1.1s'}}></div>
        
        {/* Bright glowing stars */}
        <div className="absolute top-24 right-1/2 w-2 h-2 bg-blue-200 rounded-full blur-[2px] opacity-80 animate-pulse shadow-lg shadow-blue-200/50" style={{animationDelay: '2.7s'}}></div>
        <div className="absolute bottom-48 left-1/2 w-2 h-2 bg-purple-200 rounded-full blur-[2px] opacity-70 animate-pulse shadow-lg shadow-purple-200/50" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-36 left-1/4 w-2 h-2 bg-white rounded-full blur-[1px] opacity-60 animate-pulse shadow-lg shadow-white/50" style={{animationDelay: '1.4s'}}></div>
        
        {/* Nebula/Galaxy clouds */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-600/30 via-blue-600/20 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-700/30 via-indigo-600/20 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/15 via-purple-600/15 to-transparent rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Moon Icon with LUNA */}
          <div className="flex items-center justify-center gap-5 mb-8">
            <div className="relative group">
              {/* Outer glow layers */}
              <div className="absolute inset-0 -m-8 rounded-full bg-yellow-300/30 blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 -m-6 rounded-full bg-yellow-400/40 blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute inset-0 -m-4 rounded-full bg-yellow-400/50 blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
              
              {/* Moon icon */}
              <svg className="w-24 h-24 relative z-10 text-yellow-100 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
            <h1 className="text-8xl font-light tracking-widest text-white">
              LUNA
            </h1>
          </div>
          
          <p className="text-lg text-gray-400 mb-12 font-light">
            Your intelligent AI companion
          </p>
          
          <button
            onClick={() => signIn('google', { callbackUrl: '/chat' })}
            className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white font-light text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
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
    <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-all duration-300">
      <div className="flex justify-center mb-3 text-purple-400">{icon}</div>
      <h3 className="text-sm font-light text-white mb-1">{title}</h3>
      <p className="text-xs text-gray-400 font-light">{description}</p>
    </div>
  )
}

