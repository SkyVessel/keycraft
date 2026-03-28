// Auto-generated shape matching supabase/migrations/001_schema.sql
export interface Database {
  public: {
    Tables: {
      designs: {
        Row: {
          id: string
          user_id: string
          name: string
          profile: 'oem'|'cherry'|'sa'|'dsa'|'kat'|'kam'|'xda'|'mt3'
          material: 'matte'|'gloss'|'transparent'|'metal'
          base_color: string
          font_family: string
          texture_url: string | null
          kit_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name?: string
          profile?: 'oem'|'cherry'|'sa'|'dsa'|'kat'|'kam'|'xda'|'mt3'
          material?: 'matte'|'gloss'|'transparent'|'metal'
          base_color?: string
          font_family?: string
          texture_url?: string | null
          kit_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          profile?: 'oem'|'cherry'|'sa'|'dsa'|'kat'|'kam'|'xda'|'mt3'
          material?: 'matte'|'gloss'|'transparent'|'metal'
          base_color?: string
          font_family?: string
          texture_url?: string | null
          kit_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      kits: {
        Row: {
          id: string
          user_id: string
          name: string
          layout: Record<string, unknown>
          design_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          layout?: Record<string, unknown>
          design_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          layout?: Record<string, unknown>
          design_id?: string | null
          created_at?: string
        }
        Relationships: []
      }
      chat_sessions: {
        Row: {
          id: string
          design_id: string
          created_at: string
        }
        Insert: {
          id?: string
          design_id: string
          created_at?: string
        }
        Update: {
          id?: string
          design_id?: string
          created_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          session_id: string
          role: 'user'|'assistant'
          content: string
          sketch_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: 'user'|'assistant'
          content: string
          sketch_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          role?: 'user'|'assistant'
          content?: string
          sketch_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      manufacturers: {
        Row: {
          id: string
          name: string
          country: string | null
          profiles: string[]
          website: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          name: string
          country?: string | null
          profiles?: string[]
          website?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          name?: string
          country?: string | null
          profiles?: string[]
          website?: string | null
          notes?: string | null
        }
        Relationships: []
      }
      render_jobs: {
        Row: {
          id: string
          design_id: string
          status: 'pending'|'processing'|'done'|'error'
          result_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          design_id: string
          status?: 'pending'|'processing'|'done'|'error'
          result_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          design_id?: string
          status?: 'pending'|'processing'|'done'|'error'
          result_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
