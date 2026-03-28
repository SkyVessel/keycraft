// supabase/functions/generate-pattern/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const IMAGEN_URL = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, style = 'minimalist', color_palette = '#C4956A' } = await req.json()
    const apiKey = Deno.env.get('GOOGLE_AI_KEY')!

    const fullPrompt = `Keycap texture pattern: ${prompt}. Style: ${style}.
    Primary color: ${color_palette}. Transparent background.
    High quality, flat design, suitable for keycap printing.
    Size: 1024x1024. No text, no letters.`

    const res = await fetch(`${IMAGEN_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt: fullPrompt }],
        parameters: { sampleCount: 1, aspectRatio: '1:1' },
      }),
    })

    const data = await res.json()
    const b64  = data.predictions?.[0]?.bytesBase64Encoded
    if (!b64) {
      return new Response(JSON.stringify({ error: 'Generation failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Upload to Supabase Storage
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )
    const bytes    = Uint8Array.from(atob(b64), c => c.charCodeAt(0))
    const filename = `generated/${Date.now()}.png`
    await supabase.storage.from('textures').upload(filename, bytes, { contentType: 'image/png' })

    const { data: urlData } = supabase.storage.from('textures').getPublicUrl(filename)

    return new Response(JSON.stringify({ texture_url: urlData.publicUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
