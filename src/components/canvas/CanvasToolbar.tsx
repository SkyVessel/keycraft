import type { LucideIcon } from 'lucide-react'
import { MousePointer, RefreshCw, Layers, Camera, RefreshCcw } from 'lucide-react'

type Tool = 'select' | 'rotate' | 'texture' | 'camera' | 'reset'

interface Props {
  active:       Tool
  onToolChange: (t: Tool) => void
  onReset:      () => void
  onScreenshot: () => void
}

const TOOLS: { key: Tool; Icon: LucideIcon; title: string }[] = [
  { key: 'select',  Icon: MousePointer, title: '选择' },
  { key: 'rotate',  Icon: RefreshCw,    title: '旋转' },
  { key: 'texture', Icon: Layers,       title: '贴图' },
]

export default function CanvasToolbar({ active, onToolChange, onReset, onScreenshot }: Props) {
  return (
    <div className="absolute top-3 left-3 flex flex-col gap-1.5
                    bg-white/70 backdrop-blur-sm border border-black/7
                    rounded-xl p-1.5 shadow-sm">
      {TOOLS.map(({ key, Icon, title }) => (
        <button
          key={key}
          title={title}
          onClick={() => onToolChange(key)}
          className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all
            ${active === key
              ? 'bg-kc-red/10 text-kc-red border border-kc-red/30'
              : 'text-stone-400 hover:bg-black/5 hover:text-stone-600'
            }`}
        >
          <Icon size={13} strokeWidth={1.8} />
        </button>
      ))}
      <div className="h-px bg-black/7 my-0.5" />
      <button title="截图" onClick={onScreenshot}
        className="w-7 h-7 flex items-center justify-center rounded-lg
                   text-stone-400 hover:bg-black/5 hover:text-stone-600 transition-all">
        <Camera size={13} strokeWidth={1.8} />
      </button>
      <button title="重置" onClick={onReset}
        className="w-7 h-7 flex items-center justify-center rounded-lg
                   text-stone-400 hover:bg-black/5 hover:text-stone-600 transition-all">
        <RefreshCcw size={13} strokeWidth={1.8} />
      </button>
    </div>
  )
}
