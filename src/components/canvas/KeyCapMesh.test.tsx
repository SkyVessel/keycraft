import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import KeyCapMesh from './KeyCapMesh'

// Mock drei's useGLTF to avoid needing real GLB files
vi.mock('@react-three/drei', () => {
  const useGLTF = () => ({
    scene: { clone: () => ({ traverse: vi.fn() }) },
  })
  useGLTF.preload = () => {}
  return {
    useGLTF,
    Environment: () => null,
    OrbitControls: () => null,
  }
})

describe('KeyCapMesh', () => {
  it('renders inside a Canvas without error', () => {
    expect(() =>
      render(
        <Canvas>
          <KeyCapMesh profile="oem" color="#C4956A" material="matte" textureUrl={null} />
        </Canvas>
      )
    ).not.toThrow()
  })
})
