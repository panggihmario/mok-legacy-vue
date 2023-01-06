import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
/// <reference types="vitest" />
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/_variables.scss";
          @import "./src/styles/_typography.scss";
          @import "./src/styles/_functions.scss";
          @import "./src/styles/components/index.scss";
          `
      }
    }
  },
})
