/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0c',
        foreground: '#f3f0ff',
        voidcat: {
          500: '#7c3aed',
          900: '#3b1a78',
        },
        mystical: {
          shadow: '#1f1b2e',
          cosmic: '#4c1d95',
        },
      },
      borderRadius: {
        mystical: '0.75rem',
        spiritual: '1rem',
      },
      animation: {
        'cosmic-float': 'cosmic-float 6s ease-in-out infinite',
        'mystical-pulse': 'mystical-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'cosmic-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'mystical-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
