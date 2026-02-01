import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ===============================
           SURFACES / BACKGROUNDS
           =============================== */
        background: 'var(--bg-page)',
        surface: 'var(--bg-subtle)',
        hover: 'var(--bg-hover)',
        'muted-bg': 'var(--bg-muted)',

        /* ===============================
           TEXT HIERARCHY
           =============================== */
        foreground: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',

        /* ===============================
           BORDERS
           =============================== */
        border: 'var(--border-subtle)',
        'border-strong': 'var(--border-strong)',

        /* ===============================
           BRAND (SOLAR)
           =============================== */
        primary: 'var(--brand)',
        'primary-hover': 'var(--brand-hover)',
        'primary-muted': 'var(--brand-muted)',

        /* ===============================
           SECONDARY (INVERTER / ELECTRICAL)
           =============================== */
        navy: 'var(--secondary)',                // Navy Blue
        'navy-muted': 'var(--secondary-muted)',

        /* ===============================
           ACCENT (ENERGY / CTA)
           =============================== */
        accent: 'var(--accent)',                 // Solar Yellow
        'accent-hover': 'var(--accent-hover)',

        /* ===============================
           STATUS (FEEDBACK)
           =============================== */
        success: 'var(--success)',
        'success-bg': 'var(--success-bg)',
        destructive: 'var(--destructive)',
        'destructive-bg': 'var(--destructive-bg)',
      },

      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },

      spacing: {
        section: '5rem',
        'section-sm': '3rem',
      },
    },
  },
  plugins: [],
}

export default config
