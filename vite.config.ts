import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
declare const __dirname: string;

const proxy = {
  '/api': {
    target: 'http://hicky.hpyyb.cn',
    changeOrigin: true,
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 键必须以斜线开始和结束
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname)
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  base: '/vise',
  server: { proxy },
  preview: { proxy },

  root: 'page',
  publicDir: path.resolve(__dirname, './public'),
  build: {
    outDir: path.resolve(__dirname, './dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'page/index.html'),
        www: path.resolve(__dirname, 'page/www/index.html'),
        admin: path.resolve(__dirname, 'page/admin/index.html'),
      },
    }
  }
})
