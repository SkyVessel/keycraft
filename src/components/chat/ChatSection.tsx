import { useRef, useEffect } from 'react'
import { useChat }     from '../../hooks/useChat'
import MessageBubble   from './MessageBubble'
import ChatInput       from './ChatInput'
import { supabase }    from '../../lib/supabase'

interface Props {
  designId:        string
  onTextureChange: (url: string | null) => void
}

export default function ChatSection({ designId, onTextureChange }: Props) {
  const { messages, loading, sendMessage } = useChat(designId)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bottomRef.current && typeof bottomRef.current.scrollIntoView === 'function') {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  async function handleGeneratePattern() {
    if (!messages.length) {
      // No context yet, use a default prompt
      const { data, error } = await supabase.functions.invoke('generate-pattern', {
        body: { prompt: 'geometric pattern', style: 'minimalist', color_palette: '#C4956A' },
      })
      if (!error && data?.texture_url) {
        onTextureChange(data.texture_url)
      }
      return
    }
    // Use last AI message as prompt context
    const lastAiMsg = [...messages].reverse().find(m => m.role === 'assistant')
    const prompt = lastAiMsg?.content.slice(0, 200) ?? 'keycap pattern'
    const { data, error } = await supabase.functions.invoke('generate-pattern', {
      body: { prompt, style: 'minimalist', color_palette: '#C4956A' },
    })
    if (!error && data?.texture_url) {
      onTextureChange(data.texture_url)
    }
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-3 pt-2 pb-1 flex items-center gap-1.5">
        <span className="text-[8px] uppercase tracking-widest text-stone-400">AI 助手</span>
        <span className="text-[7px] px-1.5 py-0.5 bg-kc-green/10 border border-kc-green/25 text-green-700 rounded">
          ● 在线
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-1 space-y-2">
        {messages.length === 0 && (
          <p className="text-[10px] text-stone-300 mt-4 text-center">
            描述你的键帽风格，或上传草图 ✨
          </p>
        )}
        {messages.map(m => <MessageBubble key={m.id} message={m} />)}
        {loading && (
          <div className="flex items-center gap-1.5 text-[9px] text-stone-400">
            <span className="animate-pulse">●</span> AI 思考中…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput
        onSend={sendMessage}
        onGeneratePattern={handleGeneratePattern}
        loading={loading}
      />
    </div>
  )
}
