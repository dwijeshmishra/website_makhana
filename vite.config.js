import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: '/',
  publicDir: 'assets',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  preview: {
    port: 8080,
    open: true,
  },
})