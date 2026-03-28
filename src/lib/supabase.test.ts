import { describe, it, expect } from 'vitest'
import { supabase } from './supabase'

describe('supabase client', () => {
  it('initializes without throwing', () => {
    expect(supabase).toBeDefined()
    expect(typeof supabase.from).toBe('function')
  })
})
