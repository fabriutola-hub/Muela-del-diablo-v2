import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <-- Importa path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Ya NO necesitamos 'optimizeDeps' porque estamos en versiones estables

  // La forma correcta de poner el alias
  resolve: {
    alias: {
      // Usa process.cwd() en lugar de __dirname
      "@": path.resolve(process.cwd(), "./src"), 
    },
  },
})