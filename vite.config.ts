import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
/// <reference types="vitest" />
export default defineConfig({
  plugins: [vue()],
  css: {
    // loaderOptions : {
    //   scss: {
    //     data: `
    //       @import "./src/styles/index.scss";
    //       `
    //   }
    // },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/index.scss";
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
// @import "./src/styles/_variables.scss";
// @import "./src/styles/_typography.scss";
// @import "./src/styles/_functions.scss";
// @import "./src/styles/components/index.scss";