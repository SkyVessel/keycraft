export type { Database } from './database.types'

export type Profile = 'oem'|'cherry'|'sa'|'dsa'|'kat'|'kam'|'xda'|'mt3'
export type Material = 'matte'|'gloss'|'transparent'|'metal'
export type MessageRole = 'user'|'assistant'

export interface Design {
  id: string
  name: string
  profile: Profile
  material: Material
  base_color: string
  font_family: string
  texture_url: string | null
  kit_id: string | null
}

export interface Message {
  id: string
  session_id: string
  role: MessageRole
  content: string
  sketch_url: string | null
  created_at: string
}

export interface Manufacturer {
  id: string
  name: string
  country: string | null
  profiles: string[]
  website: string | null
  notes: string | null
}
