import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' 

export default defineConfig({
  plugins: [react()],
  
  // El alias "@" (esto está perfecto)
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    },
  },
})