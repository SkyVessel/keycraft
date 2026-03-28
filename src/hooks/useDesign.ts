import { useState } from 'react'
import type { Design, Profile, Material } from '../types'

const DEFAULT: Design = {
  id:          '',
  name:        'Untitled Design',
  profile:     'oem',
  material:    'matte',
  base_color:  '#C4956A',
  font_family: 'Helvetica',
  texture_url: null,
  kit_id:      null,
}

export function useDesign() {
  const [design, setDesign] = useState<Design>(DEFAULT)

  return {
    design,
    setProfile:    (profile: Profile)   => setDesign(d => ({ ...d, profile })),
    setMaterial:   (material: Material) => setDesign(d => ({ ...d, material })),
    setColor:      (base_color: string) => setDesign(d => ({ ...d, base_color })),
    setFont:       (font_family: string) => setDesign(d => ({ ...d, font_family })),
    setTextureUrl: (texture_url: string | null) => setDesign(d => ({ ...d, texture_url })),
  }
}
