import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'plug-purple': '#6B21A8',
        'plug-green': '#22C55E',
        'plug-dark': '#0A0A0A',
        'plug-card': '#111111',
        'plug-gold': '#F59E0B',
        'plug-text': '#F5F5F5',
        'plug-muted': '#A3A3A3',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grid-move': 'gridMove 20s linear infinite',
      },
      keyframes: {
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
      },
    },
  },
  plugins: [],
}

export default config
