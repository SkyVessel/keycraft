import { renderHook } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { useChat } from './useChat'

// Mock supabase client
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          limit: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          })
        })
      }),
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      })
    }),
    channel: () => ({
      on: function() { return this },
      subscribe: () => ({ unsubscribe: vi.fn() })
    }),
    removeChannel: vi.fn(),
    functions: {
      invoke: vi.fn().mockResolvedValue({ data: null, error: null })
    }
  }
}))

describe('useChat', () => {
  test('initializes with empty messages and loading false', () => {
    const { result } = renderHook(() => useChat(''))
    expect(result.current.messages).toEqual([])
    expect(result.current.loading).toBe(false)
  })
})
