import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/assets/tldraw-app/',
  build: {
    outDir: '../docs/assets/tldraw-app',
    emptyOutDir: true,
  }
})
