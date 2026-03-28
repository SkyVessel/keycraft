import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import KeyCapMesh from './KeyCapMesh'
import type { Profile, Material } from '../../types'

interface Props {
  profile:    Profile
  color:      string
  material:   Material
  textureUrl: string | null
}

export default function KeyCapCanvas({ profile, color, material, textureUrl }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 3], fov: 45 }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <Suspense fallback={null}>
        <KeyCapMesh
          profile={profile}
          color={color}
          material={material}
          textureUrl={textureUrl}
        />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls
        enableZoom={true}
        minDistance={1.5}
        maxDistance={6}
      />
    </Canvas>
  )
}
