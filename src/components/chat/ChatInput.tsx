import { useState, useRef } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { Paperclip, Sparkles, Send } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface Props {
  onSend:            (msg: string, sketchUrl?: string) => void
  onGeneratePattern: () => void
  loading:           boolean
}

export default function ChatInput({ onSend, onGeneratePattern, loading }: Props) {
  const [text,      setText]      = useState('')
  const [sketchUrl, setSketchUrl] = useState<string | undefined>()
  const fileRef = useRef<HTMLInputElement>(null)

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const { data } = await supabase.storage
      .from('sketches')
      .upload(`${Date.now()}_${file.name}`, file)
    if (data) {
      const { data: url } = supabase.storage.from('sketches').getPublicUrl(data.path)
      setSketchUrl(url.publicUrl)
    }
  }

  function submit() {
    if (!text.trim() && !sketchUrl) return
    onSend(text.trim(), sketchUrl)
    setText('')
    setSketchUrl(undefined)
  }

  return (
    <div className="border-t border-black/6 pt-2 pb-3 px-3">
      <div className="flex gap-1.5 mb-1.5">
        <button
          onClick={() => fileRef.current?.click()}
          className="text-[8px] px-2 py-1 bg-black/5 rounded text-stone-500 hover:bg-black/8 flex items-center gap-1"
        >
          <Paperclip size={9} /> 草图
        </button>
        <button
          onClick={onGeneratePattern}
          className="text-[8px] px-2 py-1 bg-kc-green/10 border border-kc-green/25 rounded text-green-700 hover:bg-kc-green/15 flex items-center gap-1"
        >
          <Sparkles size={9} /> 生成图案
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={handleFile} />
      </div>
      <div className="flex gap-1.5 items-end">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="描述你的键帽风格，或上传草图…"
          rows={2}
          className="flex-1 bg-white border border-black/10 rounded-lg px-2.5 py-1.5
                     text-[10px] text-stone-600 placeholder:text-stone-300 resize-none
                     focus:outline-none focus:border-kc-red/30 shadow-sm"
        />
        <button
          onClick={submit}
          disabled={loading || (!text.trim() && !sketchUrl)}
          className="w-8 h-8 bg-kc-red rounded-lg flex items-center justify-center
                     text-white shadow-md shadow-kc-red/30 hover:bg-red-500
                     disabled:opacity-40 transition-all flex-shrink-0"
        >
          <Send size={13} />
        </button>
      </div>
      {sketchUrl && (
        <p className="text-[8px] text-kc-green mt-1">✓ 草图已上传</p>
      )}
    </div>
  )
}
