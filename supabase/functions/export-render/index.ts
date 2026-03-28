// supabase/functions/export-render/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

// Render export stub for V1
serve(async (_req) => {
  return new Response(JSON.stringify({ message: 'Render export coming in V2' }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
