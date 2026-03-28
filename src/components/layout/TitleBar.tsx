import { Link, useLocation } from 'react-router-dom'

const TABS = [
  { to: '/studio',        label: 'Studio'  },
  { to: '/kits',          label: '套件'    },
  { to: '/box',           label: '包装盒'  },
  { to: '/manufacturers', label: '导出'    },
]

export default function TitleBar() {
  const { pathname } = useLocation()
  return (
    <div className="h-10 bg-kc-bar border-b border-black/[0.08] flex items-center px-3.5 gap-2.5">
      {/* macOS traffic lights */}
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-kc-red shadow-inner" />
        <div className="w-3 h-3 rounded-full bg-kc-yellow shadow-inner" />
        <div className="w-3 h-3 rounded-full bg-kc-green shadow-inner" />
      </div>

      <span className="mx-auto text-xs font-bold tracking-[0.18em] text-kc-brown">
        KEYCRAFT
      </span>

      <nav className="flex gap-0.5">
        {TABS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`text-[10px] px-2.5 py-1 rounded-md transition-all
              ${pathname.startsWith(to)
                ? 'bg-kc-red/10 text-kc-red'
                : 'text-stone-400 hover:text-stone-600'
              }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
