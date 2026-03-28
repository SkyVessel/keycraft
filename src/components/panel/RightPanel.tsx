import MaterialPanel from './MaterialPanel'
import ColorPanel    from './ColorPanel'
import FontPanel     from './FontPanel'
import ChatSection   from '../chat/ChatSection'
import type { Design, Material } from '../../types'

interface Props {
  design:           Design
  onMaterialChange: (m: Material) => void
  onColorChange:    (c: string) => void
  onFontChange:     (f: string) => void
  onTextureChange:  (url: string | null) => void
}

export default function RightPanel({ design, onMaterialChange, onColorChange, onFontChange, onTextureChange }: Props) {
  return (
    <div className="bg-kc-panel flex flex-col h-full overflow-hidden">
      <div className="p-3 border-b border-black/6 space-y-4">
        <MaterialPanel current={design.material} onChange={onMaterialChange} />
        <ColorPanel    current={design.base_color} onChange={onColorChange} />
        <FontPanel     current={design.font_family} onChange={onFontChange} />
      </div>
      <ChatSection
        designId={design.id}
        onTextureChange={onTextureChange}
      />
    </div>
  )
}
