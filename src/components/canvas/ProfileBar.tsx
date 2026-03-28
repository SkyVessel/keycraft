import type { Profile } from '../../types'

const PROFILES: { key: Profile; label: string }[] = [
  { key: 'oem',    label: 'OEM'    },
  { key: 'cherry', label: 'Cherry' },
  { key: 'sa',     label: 'SA'     },
  { key: 'dsa',    label: 'DSA'    },
  { key: 'kat',    label: 'KAT'    },
  { key: 'kam',    label: 'KAM'    },
  { key: 'xda',    label: 'XDA'    },
  { key: 'mt3',    label: 'MT3'    },
]

interface Props {
  current:         Profile
  onProfileChange: (p: Profile) => void
}

export default function ProfileBar({ current, onProfileChange }: Props) {
  return (
    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5
                    bg-white/70 backdrop-blur-sm border border-black/7
                    rounded-lg px-3 py-1.5 shadow-sm">
      <span className="text-[8px] uppercase tracking-widest text-stone-400 mr-1">
        高度
      </span>
      {PROFILES.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onProfileChange(key)}
          className={`text-[8px] px-2 py-0.5 rounded transition-all
            ${current === key
              ? 'bg-kc-yellow/20 border border-kc-yellow/50 text-amber-700 font-medium'
              : 'bg-black/5 text-stone-500 hover:bg-black/10'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
