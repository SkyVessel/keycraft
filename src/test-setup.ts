import '@testing-library/jest-dom'

// Polyfill ResizeObserver for jsdom (required by @react-three/fiber)
window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
