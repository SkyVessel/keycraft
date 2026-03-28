// src/components/canvas/KeyCapMesh.tsx
import { useRef, useEffect, useMemo, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { Profile, Material } from '../../types'

const MODEL_MAP: Record<Profile, string> = {
  oem:    '/models/oem.glb',
  cherry: '/models/cherry.glb',
  sa:     '/models/sa.glb',
  dsa:    '/models/dsa.glb',
  kat:    '/models/kat.glb',
  kam:    '/models/kam.glb',
  xda:    '/models/xda.glb',
  mt3:    '/models/mt3.glb',
}

interface Props {
  profile:    Profile
  color:      string
  material:   Material
  textureUrl: string | null
}

// Fallback box shown when GLB is unavailable
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

function GLBMesh({ profile, color, material, textureUrl }: Props) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const { scene } = useGLTF(MODEL_MAP[profile])
  const cloned   = useMemo(() => scene.clone(), [scene])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.08
    }
  })

  useEffect(() => {
    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      const mat = child.material as THREE.MeshStandardMaterial
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
        mat.needsUpdate = true
      }
    })
  }, [color, material, textureUrl, cloned])

  return <primitive ref={meshRef} object={cloned} />
}

export default function KeyCapMesh(props: Props) {
  return (
    <Suspense fallback={<FallbackMesh color={props.color} material={props.material} textureUrl={props.textureUrl} />}>
      <GLBMesh {...props} />
    </Suspense>
  )
}

// Preload all profiles
Object.values(MODEL_MAP).forEach(url => useGLTF.preload(url))
