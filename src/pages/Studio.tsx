import { useState } from 'react'
import KeyCapCanvas   from '../components/canvas/KeyCapCanvas'
import CanvasToolbar  from '../components/canvas/CanvasToolbar'
import ProfileBar     from '../components/canvas/ProfileBar'
import RightPanel     from '../components/panel/RightPanel'
import { useDesign }  from '../hooks/useDesign'

export default function Studio() {
  const { design, setProfile, setMaterial, setColor, setFont, setTextureUrl } = useDesign()
  const [tool, setTool] = useState<'select'|'rotate'|'texture'|'camera'|'reset'>('select')

  return (
    <div className="grid h-full" style={{ gridTemplateColumns: '1fr 260px' }}>
      {/* Canvas Area */}
      <div className="relative bg-kc-bg border-r border-black/6 overflow-hidden">
        <KeyCapCanvas
          profile={design.profile}
          color={design.base_color}
          material={design.material}
          textureUrl={design.texture_url}
        />
        <CanvasToolbar
          active={tool}
          onToolChange={setTool}
          onReset={() => {}}
          onScreenshot={() => {}}
        />
        <ProfileBar current={design.profile} onProfileChange={setProfile} />
      </div>

      {/* Right Panel */}
      <RightPanel
        design={design}
        onMaterialChange={setMaterial}
        onColorChange={setColor}
        onFontChange={setFont}
        onTextureChange={setTextureUrl}
      />
    </div>
  )
}
