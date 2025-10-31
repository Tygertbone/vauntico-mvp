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
    chunkSizeWarningLimit: 600, // Increase warning threshold
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React dependencies
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Markdown rendering (only used in specific pages)
          'markdown': ['react-markdown', 'remark-gfm'],
          
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
