/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'arena': '#F4F0E6',
        'arcilla': '#D94E1F',
        'cielo': '#4A90E2',
        'paja': '#8B9E6B',
        'negro-illimani': '#1A1A1A',
        'gris-roca': '#2D2D2D',
      },
      fontFamily: {
        'sans': ['"Protest Revolution"', 'cursive'],
        'display': ['"Emblema One"', 'cursive'],
        'accent': ['"MedievalSharp"', 'cursive'],
        'mono': ['"Space Mono"', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        'hard': '6px 6px 0px 0px #1A1A1A',
        'hard-sm': '3px 3px 0px 0px #1A1A1A',
        'hard-xl': '10px 10px 0px 0px #1A1A1A',
        'hard-hover': '2px 2px 0px 0px #1A1A1A',
        'glow': '0 0 20px rgba(217, 78, 31, 0.4)',
        'glow-lg': '0 0 40px rgba(217, 78, 31, 0.5)',
        'glow-cielo': '0 0 20px rgba(74, 144, 226, 0.4)',
      },
      borderWidth: {
        '3': '3px',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-arcilla': 'linear-gradient(135deg, #D94E1F 0%, #E8673A 50%, #F28C5A 100%)',
        'gradient-cielo': 'linear-gradient(135deg, #4A90E2 0%, #6BA3E8 50%, #8CB8EE 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 50%, #3D3D3D 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      keyframes: {
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        flicker: {
          '0%': { opacity: '0.97' },
          '5%': { opacity: '0.9' },
          '10%': { opacity: '0.97' },
          '15%': { opacity: '0.95' },
          '100%': { opacity: '0.97' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(217, 78, 31, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(217, 78, 31, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'scan': 'scan 8s linear infinite',
        'flicker': 'flicker 2s infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      }
    },
  },
  plugins: [],
}