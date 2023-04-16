import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/common', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url))
    }
  },
  optimizeDeps: {
    // fast-deep-equal doesnt have default export
    include: ['fast-deep-equal']
  }
})
