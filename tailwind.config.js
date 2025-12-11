/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🎨 1. NUEVA PALETA DE COLORES (Neo-Brutalismo Andino)
      colors: {
        'arena': '#F4F0E6',       // Fondo principal (Arena del Sur)
        'arcilla': '#D94E1F',     // Acción / CTA (Arcilla Intensa)
        'cielo': '#4A90E2',       // Detalles / Enlaces
        'paja': '#8B9E6B',        // Naturaleza
        'negro-illimani': '#1A1A1A', // Texto y Bordes principales
        'gris-roca': '#2D2D2D',   // Fondos oscuros alternativos
      },

      // 🔤 2. TIPOGRAFÍA TÉCNICA
      fontFamily: {
        // Reemplazamos las fuentes "decorativas" viejas por las de ingeniería
        'sans': ['Inter', 'sans-serif'],                // Texto cuerpo (lectura)
        'display': ['"Space Grotesk"', 'sans-serif'],   // Titulares GIGANTES
        'mono': ['"Space Mono"', '"Courier New"', 'monospace'], // Detalles técnicos y Chatbot
      },

      // 📦 3. SOMBRAS DURAS (La firma del estilo)
      boxShadow: {
        'hard': '6px 6px 0px 0px #1A1A1A',        // Sombra estándar
        'hard-sm': '3px 3px 0px 0px #1A1A1A',     // Sombra pequeña (botones pequeños)
        'hard-xl': '10px 10px 0px 0px #1A1A1A',   // Sombra grande (modales)
        'hard-hover': '2px 2px 0px 0px #1A1A1A',  // Estado "presionado"
      },
      
      // 📏 4. BORDES GRUESOS
      borderWidth: {
        '3': '3px',
      },

      // 🎬 5. TUS ANIMACIONES (Conservadas intactas)
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
        }
      },
      animation: {
        scan: 'scan 8s linear infinite',
        flicker: 'flicker 2s infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}