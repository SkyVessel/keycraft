// supabase/functions/analyze-sketch/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

// Sketch analysis is handled by the /chat function with sketch_url parameter.
// This is a stub for future dedicated sketch analysis.
serve(async (_req) => {
  return new Response(JSON.stringify({ message: 'Use /chat with sketch_url parameter' }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
