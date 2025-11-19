/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Tus fuentes personalizadas (NO LAS BORRÉ)
      fontFamily: {
        'limelight': ['Limelight', 'cursive'],
        'new-rocker': ['"New Rocker"', 'cursive'],
        'instrument': ['"Instrument Serif"', 'serif'],
        // Agregué esta para asegurar el look "máquina de escribir" del Chatbot
        'mono': ['"Courier New"', 'Courier', 'monospace'], 
      },
      // 👇 AGREGAR ESTO: Definición de las animaciones del Chatbot y Loading
      keyframes: {
        // Animación para las líneas de escaneo (bajan infinitamente)
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        // Animación para el parpadeo de monitor viejo (CRT)
        flicker: {
          '0%': { opacity: '0.97' },
          '5%': { opacity: '0.9' },
          '10%': { opacity: '0.97' },
          '15%': { opacity: '0.95' },
          '100%': { opacity: '0.97' },
        },
        // Animación para el brillo lento (usado en loading)
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        }
      },
      // 👇 AGREGAR ESTO: Nombres de clases para usar en el HTML
      animation: {
        scan: 'scan 8s linear infinite',      // class="animate-scan"
        flicker: 'flicker 2s infinite',       // class="animate-flicker"
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}