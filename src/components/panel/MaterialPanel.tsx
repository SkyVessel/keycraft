import type { Material } from '../../types'

const OPTIONS: { key: Material; label: string }[] = [
  { key: 'matte',       label: '哑光'   },
  { key: 'gloss',       label: '光泽'   },
  { key: 'transparent', label: '透明'   },
  { key: 'metal',       label: '金属'   },
]

interface Props { current: Material; onChange: (m: Material) => void }

export default function MaterialPanel({ current, onChange }: Props) {
  return (
    <div>
      <p className="text-[8px] uppercase tracking-widest text-stone-400 mb-2">材质</p>
      <div className="flex flex-wrap gap-1.5">
        {OPTIONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`text-[9px] px-2.5 py-1 rounded-md transition-all border
              ${current === key
                ? 'bg-kc-red/10 border-kc-red/30 text-kc-red'
                : 'bg-black/5 border-transparent text-stone-500 hover:bg-black/8'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
