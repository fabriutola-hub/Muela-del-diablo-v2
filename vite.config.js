import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"), 
    },
  },

  // === OPTIMIZACIÓN CRÍTICA PARA MÓVILES ===
  build: {
    // 1. Generar código moderno es más ligero y rápido de procesar para móviles
    target: 'esnext',
    
    // 2. Minificación rápida y eficiente
    minify: 'esbuild',
    
    // 3. Dividir el CSS ayuda a no bloquear el renderizado
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        // 4. ESTRATEGIA DE CHUNKING (División de Código)
        // Separa las librerías gigantes para que no bloqueen la carga inicial
        manualChunks: {
          // Núcleo de React separado
          'vendor-react': ['react', 'react-dom'],
          
          // Librerías 3D (Three.js es muy pesado, mejor tenerlo aislado)
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          
          // Mapas (Mapbox es enorme, aislarlo es vital)
          'vendor-map': ['react-map-gl', 'mapbox-gl'],
          
          // UI y Animaciones
          'vendor-ui': ['framer-motion', 'lucide-react']
        }
      }
    },
    
    // Aviso de límite de tamaño de chunk (aumentado para evitar warnings innecesarios tras dividir)
    chunkSizeWarningLimit: 1000,
  }
})
