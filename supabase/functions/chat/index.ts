// supabase/functions/chat/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const SYSTEM_PROMPT = `你是 KeyCraft AI 助手，专注于机械键盘键帽设计。

键帽知识：
- 高度档位：OEM（最常见）、Cherry（GMK标准）、SA（高球面）、DSA（均一低球面）、KAT（高柱面）
- 套件构成：Base Kit（字母+修饰键）、Novelties（装饰键）、Spacebars（空格套）
- 主要厂商：GMK（德国，ABS双色注塑）、SP（美国，SA/DSA）、KeyReative（国产，KAT/KAM）
- 常见材质：PBT（耐久哑光）、ABS（光泽感强）

当用户描述设计时，返回结构化建议，格式：
**材质** 值 · **颜色** #hex · **字体** 值 · **高度** 值

如用户上传草图，分析草图风格并据此提出建议。`

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { session_id, message, sketch_url } = await req.json()
    const apiKey = Deno.env.get('GOOGLE_AI_KEY')!

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Load history
    const { data: history } = await supabase
      .from('messages')
      .select('role, content')
      .eq('session_id', session_id)
      .order('created_at', { ascending: true })
      .limit(20)

    // Build parts
    const userParts: unknown[] = [{ text: message }]
    if (sketch_url) {
      const res = await fetch(sketch_url)
      const buf = await res.arrayBuffer()
      const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)))
      userParts.push({ inline_data: { mime_type: 'image/png', data: b64 } })
    }

    // Build contents
    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      ...(history ?? []).map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      })),
      { role: 'user', parts: userParts },
    ]

    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    })

    const data = await geminiRes.json()
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '抱歉，请稍后再试'

    // Save both messages
    await supabase.from('messages').insert([
      { session_id, role: 'user',      content: message,  sketch_url: sketch_url ?? null },
      { session_id, role: 'assistant', content: reply },
    ])

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
