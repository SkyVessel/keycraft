import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  return { session, loading }
}

interface Props {
  children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-kc-bg">
        <div className="text-[11px] text-stone-400 tracking-widest">KEYCRAFT</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-kc-bg">
        <div className="bg-white rounded-2xl shadow-lg border border-black/7 p-8 w-80">
          <div className="flex gap-1.5 mb-6">
            <div className="w-3 h-3 rounded-full bg-kc-red" />
            <div className="w-3 h-3 rounded-full bg-kc-yellow" />
            <div className="w-3 h-3 rounded-full bg-kc-green" />
          </div>
          <h1 className="text-sm font-bold tracking-[0.15em] text-kc-brown mb-1">KEYCRAFT</h1>
          <p className="text-[10px] text-stone-400 mb-6">AI 键帽设计工具</p>
          <button
            onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
            className="w-full bg-kc-red text-white text-[11px] font-medium py-2 rounded-lg
                       hover:bg-red-500 transition-colors shadow-md shadow-kc-red/25"
          >
            GitHub 登录
          </button>
          <button
            onClick={() => {
              const email = prompt('邮箱地址')
              if (email) supabase.auth.signInWithOtp({ email })
            }}
            className="w-full mt-2 text-[10px] text-stone-500 py-2 hover:text-stone-700 transition-colors"
          >
            邮箱登录
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
