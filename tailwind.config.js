/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0C1E1A',
          800: '#0F2620',
          700: '#143329',
          600: '#1C4537',
        },
        surface: '#e3f1ff',
        light: '#f0f3f7',
        // Solvio brand orange. Token kept as `lime` so all existing bg-lime / text-lime-dark classes pick it up.
        lime: {
          DEFAULT: '#FF6700',
          dark: '#D95800',
        },
        amber: {
          DEFAULT: '#F4B740',
          dark: '#E09A14',
        },
        slatey: {
          500: '#5A6B62',
          400: '#7E8C84',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 8px 30px -12px rgba(12, 30, 26, 0.18)',
        lift: '0 20px 60px -20px rgba(12, 30, 26, 0.30)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.12) translate(-1.5%, -1.5%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'spin-slow': 'spin-slow 40s linear infinite',
        kenburns: 'kenburns 18s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
