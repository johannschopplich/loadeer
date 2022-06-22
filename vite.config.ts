import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // minify: false,
    // target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Loadeer',
      formats: ['es', 'umd', 'iife'],
    },
  },
})
