import type { Design } from '../../types'

interface Props {
  design:    Design
  connected: boolean
  saved:     boolean
}

export default function StatusBar({ design, connected, saved }: Props) {
  return (
    <div className="h-[26px] bg-kc-bar border-t border-black/[0.06] flex items-center
                    px-3.5 gap-4 text-[8px] text-stone-400">
      <span className="flex items-center gap-1">
        <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-kc-green' : 'bg-stone-300'}`} />
        {connected ? 'Supabase 已连接' : '未连接'}
      </span>
      <span className="flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-kc-yellow" />
        {design.profile.toUpperCase()} · {design.material === 'matte' ? '哑光' : design.material} PBT
      </span>
      <span className="flex items-center gap-1">
        <span className={`w-1.5 h-1.5 rounded-full ${saved ? 'bg-kc-green' : 'bg-kc-red'}`} />
        {saved ? '已保存' : '未保存'}
      </span>
      <span className="ml-auto">{design.name}</span>
    </div>
  )
}
