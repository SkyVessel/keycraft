import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Message } from '../types'

export function useChat(designId: string) {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages,  setMessages]  = useState<Message[]>([])
  const [loading,   setLoading]   = useState(false)

  // Create or load session
  useEffect(() => {
    if (!designId) return
    async function loadOrCreateSession() {
      const { data } = await supabase
        .from('chat_sessions')
        .select('id')
        .eq('design_id', designId)
        .limit(1)
        .single()
      if (data) {
        setSessionId(data.id)
      } else {
        const { data: s } = await supabase
          .from('chat_sessions')
          .insert({ design_id: designId })
          .select('id')
          .single()
        if (s) setSessionId(s.id)
      }
    }
    loadOrCreateSession()
  }, [designId])

  // Subscribe to Realtime
  useEffect(() => {
    if (!sessionId) return
    // Load existing messages
    supabase
      .from('messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at')
      .then(({ data }) => data && setMessages(data as Message[]))

    // Subscribe to new messages
    const channel = supabase
      .channel(`messages:${sessionId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `session_id=eq.${sessionId}`,
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [sessionId])

  async function sendMessage(content: string, sketchUrl?: string) {
    if (!sessionId) return
    setLoading(true)
    try {
      await supabase.functions.invoke('chat', {
        body: { session_id: sessionId, message: content, sketch_url: sketchUrl },
      })
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, sendMessage }
}
