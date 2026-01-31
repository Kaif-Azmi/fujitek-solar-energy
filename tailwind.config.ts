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
        /* Surfaces */
        background: 'var(--bg-page)',
        surface: 'var(--bg-subtle)',
        hover: 'var(--bg-hover)',
        'muted-bg': 'var(--bg-muted)',

        /* Text hierarchy */
        foreground: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',

        /* Borders */
        border: 'var(--border-subtle)',
        'border-strong': 'var(--border-strong)',

        /* Brand */
        primary: 'var(--brand)',
        'primary-hover': 'var(--brand-hover)',
        'primary-muted': 'var(--brand-muted)',

        /* Status */
        success: 'var(--success)',
        'success-bg': 'var(--success-bg)',
        destructive: 'var(--destructive)',
        'destructive-bg': 'var(--destructive-bg)',
        /* Alias for positive accent (success) */
        accent: 'var(--success)',
        'accent-light': 'var(--success-bg)',
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      },
      spacing: {
        'section': '5rem',
        'section-sm': '3rem',
      },
    },
  },
  plugins: [],
}

export default config
