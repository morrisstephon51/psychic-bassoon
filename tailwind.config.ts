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
        // Legacy dark tokens (kept for reference)
        'plug-dark': '#0A0A0A',

        // ── Light Brand Vault ──────────────────────────────────
        // Backgrounds
        'plug-bg':       '#FAFAFA',
        'plug-surface':  '#F5F3FF',
        'plug-card':     '#FFFFFF',
        'plug-subtle':   '#F0EEFF',

        // Borders
        'plug-border':   '#EDE9FE',
        'plug-border-md':'#D8D0F7',

        // Text
        'plug-text':     '#1A0533',
        'plug-text-2':   '#6B5A8E',
        'plug-muted':    '#9385B5',

        // Brand
        'plug-purple':   '#6B21A8',
        'plug-purple-md':'#7C3AED',
        'plug-green':    '#22C55E',
        'plug-green-dk': '#16A34A',
        'plug-gold':     '#F59E0B',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(107,33,168,0.07), 0 4px 16px rgba(107,33,168,0.04)',
        'card-hover': '0 4px 24px rgba(107,33,168,0.14), 0 1px 4px rgba(107,33,168,0.08)',
        'green': '0 0 40px rgba(34,197,94,0.25)',
        'purple': '0 0 40px rgba(107,33,168,0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grid-move': 'gridMove 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
