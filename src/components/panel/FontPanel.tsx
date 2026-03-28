const FONTS = ['Helvetica','Arial','Georgia','Courier New','手写体']

interface Props { current: string; onChange: (f: string) => void }

export default function FontPanel({ current, onChange }: Props) {
  return (
    <div>
      <p className="text-[8px] uppercase tracking-widest text-stone-400 mb-2">字体</p>
      <div className="flex flex-wrap gap-1.5">
        {FONTS.map(font => (
          <button
            key={font}
            onClick={() => onChange(font)}
            className={`text-[9px] px-2.5 py-1 rounded-md transition-all border
              ${current === font
                ? 'bg-kc-red/10 border-kc-red/30 text-kc-red'
                : 'bg-black/5 border-transparent text-stone-500 hover:bg-black/8'
              }`}
            style={{ fontFamily: font }}
          >
            {font}
          </button>
        ))}
      </div>
    </div>
  )
}
