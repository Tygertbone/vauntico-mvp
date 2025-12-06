import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "vaunticocom-di",
    project: "javascript-react"
  })],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    include: ['src/**/*.test.{js,jsx}'],
    exclude: ['src/components/mystical/**', 'src/components/quests/**']
  },
  server: {
    port: 3000,
    open: true,
  },
      build: {
    outDir: 'dist',
    sourcemap: true, // Disable sourcemaps in production for security
    minify: 'esbuild', // Fast minification with esbuild
    chunkSizeWarningLimit: 600, // Increase warning threshold
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React dependencies
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Markdown rendering (only used in specific pages)
          'markdown': ['react-markdown', 'remark-gfm'],
          
          // Analytics (can be loaded async)
          'analytics': ['mixpanel-browser'],
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