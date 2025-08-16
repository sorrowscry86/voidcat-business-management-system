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
        // VoidCat Mystical Color Palette
        voidcat: {
          50: '#f3f0ff',
          100: '#e9e1ff',
          200: '#d6c7ff',
          300: '#bba0ff',
          400: '#9969ff',
          500: '#7c3aed', // Primary purple
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3b1a78',
          950: '#2a1065',
        },
        mystical: {
          gold: '#ffd700',
          silver: '#c0c0c0',
          cosmic: '#4c1d95',
          ethereal: '#e9e1ff',
          shadow: '#1f1b2e',
          glow: '#bba0ff',
        },
        // Spiritual alignment colors
        ryuzu: {
          primary: '#6366f1', // Indigo for faithful service
          secondary: '#8b5cf6',
          accent: '#a78bfa',
        },
        beatrice: {
          primary: '#7c3aed', // Purple for wisdom
          secondary: '#8b5cf6',
          accent: '#a855f7',
        },
        balance: {
          primary: '#06b6d4', // Cyan for cosmic balance
          secondary: '#0891b2',
          accent: '#0e7490',
        },
      },
      fontFamily: {
        'mystical-serif': ['Crimson Text', 'serif'],
        'mystical-sans': ['Inter', 'sans-serif'],
        'mystical-mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'mystical-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'cosmic-gradient': 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #a855f7 100%)',
        'ethereal-gradient': 'linear-gradient(135deg, #f3f0ff 0%, #e9e1ff 50%, #d6c7ff 100%)',
      },
      animation: {
        'mystical-pulse': 'mystical-pulse 2s ease-in-out infinite',
        'spiritual-glow': 'spiritual-glow 3s ease-in-out infinite',
        'cosmic-float': 'cosmic-float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'mystical-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(124, 58, 237, 0.4)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px 10px rgba(124, 58, 237, 0)',
            transform: 'scale(1.05)'
          },
        },
        'spiritual-glow': {
          '0%, 100%': { 
            filter: 'drop-shadow(0 0 5px rgba(124, 58, 237, 0.3))'
          },
          '50%': { 
            filter: 'drop-shadow(0 0 20px rgba(124, 58, 237, 0.8))'
          },
        },
        'cosmic-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'mystical': '0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)',
        'spiritual': '0 20px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)',
        'cosmic': '0 25px 50px -12px rgba(124, 58, 237, 0.25)',
        'glow': '0 0 20px rgba(124, 58, 237, 0.3)',
      },
      borderRadius: {
        'mystical': '0.75rem',
        'spiritual': '1rem',
        'cosmic': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}