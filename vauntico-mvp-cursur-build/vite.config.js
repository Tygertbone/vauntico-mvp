import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
    build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production for security
    minify: 'esbuild', // Fast minification with esbuild
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
