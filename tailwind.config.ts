import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 交通灯三色
        'kc-red':    '#FF5F57',
        'kc-yellow': '#FFBD2E',
        'kc-green':  '#28C840',
        // 暖棕主色
        'kc-brown':  '#b07840',
        // 背景色
        'kc-bg':     '#faf6f0',
        'kc-panel':  '#f5f0e8',
        'kc-bar':    '#f2ece4',
      },
    },
  },
  plugins: [],
} satisfies Config
