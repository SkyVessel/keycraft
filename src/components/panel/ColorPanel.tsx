const PALETTE = [
  '#C4956A','#8A6040','#E8D0A8','#F5EDE0', // 暖棕系
  '#FF5F57','#FFBD2E','#28C840',            // 交通灯
  '#2A2018','#FFFFFF','#6A8A6A',            // 其他
]

interface Props { current: string; onChange: (c: string) => void }

export default function ColorPanel({ current, onChange }: Props) {
  return (
    <div>
      <p className="text-[8px] uppercase tracking-widest text-stone-400 mb-2">颜色</p>
      <div className="flex flex-wrap gap-1.5">
        {PALETTE.map(color => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`w-5 h-5 rounded-[4px] transition-transform shadow-sm
              ${current === color ? 'scale-125 ring-2 ring-offset-1 ring-stone-400' : 'hover:scale-110'}`}
            style={{ background: color, border: color === '#FFFFFF' ? '1px solid #e8e0d8' : undefined }}
          />
        ))}
        {/* Custom color picker */}
        <label className="w-5 h-5 rounded-[4px] bg-gradient-to-br from-kc-red via-kc-yellow to-kc-green
                          cursor-pointer hover:scale-110 transition-transform shadow-sm" title="自定义">
          <input
            type="color"
            className="sr-only"
            value={current}
            onChange={e => onChange(e.target.value)}
          />
        </label>
      </div>
    </div>
  )
}
