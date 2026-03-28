// src/components/canvas/KeyCapMesh.tsx
import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Profile, Material } from '../../types'

interface Props {
  profile:    Profile
  color:      string
  material:   Material
  textureUrl: string | null
}

// Fallback box shown until real GLB models are added
function FallbackMesh({ color, material, textureUrl }: Omit<Props, 'profile'>) {
  const meshRef = useRef<THREE.Mesh>(null)
  const mat = useMemo(() => new THREE.MeshStandardMaterial(), [])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.08
    }
  })

  useEffect(() => {
    mat.color.set(color)
    mat.roughness = material === 'matte' ? 0.85 : material === 'gloss' ? 0.1 : material === 'metal' ? 0.3 : 0.05
    mat.metalness = material === 'metal' ? 0.8 : 0
    mat.opacity   = material === 'transparent' ? 0.6 : 1
    mat.transparent = material === 'transparent'
    if (textureUrl) {
      new THREE.TextureLoader().load(textureUrl, (tex) => {
        mat.map = tex
        mat.needsUpdate = true
      })
    } else {
      mat.map = null
    }
    mat.needsUpdate = true
  }, [color, material, textureUrl, mat])

  return (
    <mesh ref={meshRef} material={mat}>
      <boxGeometry args={[1.2, 0.5, 1.2]} />
    </mesh>
  )
}

export default function KeyCapMesh(props: Props) {
  // GLB models are placeholder (0-byte) files — use FallbackMesh until real models are added
  return <FallbackMesh color={props.color} material={props.material} textureUrl={props.textureUrl} />
}
