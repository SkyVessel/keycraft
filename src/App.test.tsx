import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App'

// Mock supabase auth so AuthGuard doesn't block rendering
vi.mock('./lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: () => Promise.resolve({ data: { session: { user: { id: 'test' } } }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          limit: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          })
        }),
        order: () => Promise.resolve({ data: [], error: null }),
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
    functions: { invoke: vi.fn() },
    storage: {
      from: () => ({
        upload: vi.fn(),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  }
}))

test('renders KeyCraft app', async () => {
  render(<App />)
  // KEYCRAFT appears in TitleBar once session is loaded
  // Wait for loading state to clear
  await new Promise(r => setTimeout(r, 50))
  expect(screen.getByText(/KEYCRAFT/i)).toBeInTheDocument()
})
