import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

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
  resolve : {
    extensions: [".ts", ".tsx", ".js"],
    alias : {
      // '@' : resolve(__dirname, './src')
      '@/': `${resolve(__dirname, 'src')}/`
    }
  }
})
