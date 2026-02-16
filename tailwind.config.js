/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          main: 'var(--bg-main)',
          header: 'var(--bg-header)',
          card: 'var(--bg-card)',
          hover: 'var(--bg-hover)',
        },

        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },

        accent: {
          default: 'var(--accent)',
          soft: 'var(--accent-soft)',
        },

        border: {
          default: 'var(--border)',
        },
      },

      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '18px',
      },

      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06)',
        hover: '0 4px 12px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
