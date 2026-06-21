import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Better code splitting for production
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-animation': ['framer-motion', 'gsap'],
          'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Enable source maps for debugging in production
    sourcemap: false,
  },
  css: {
    devSourcemap: true,
  },
})
