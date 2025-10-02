'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LandingPage from '@/components/LandingPage'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/chat')
    }
  }, [session, router])

  return <LandingPage />
}