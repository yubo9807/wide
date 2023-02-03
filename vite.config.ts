import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
declare const __dirname: string;

const proxy = {
  '/api': {
    target: 'http://127.0.0.1:20010',
    changeOrigin: true,
  },
  '/permissions': {
    target: 'http://127.0.0.1:20020',
    changeOrigin: true,
  },
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
  base: '/wide/',
  server: { proxy },
  preview: { proxy },

  root: 'page',
  publicDir: path.resolve(__dirname, './public'),
  build: {
    minify: true,
    chunkSizeWarningLimit: 1000,
    outDir: path.resolve(__dirname, './dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'page/index.html'),

        // www: path.resolve(__dirname, 'page/www/index.html'),
        // admin: path.resolve(__dirname, 'page/admin/index.html'),
        // permissions: path.resolve(__dirname, 'page/permissions/index.html'),
      },
      output: {
        manualChunks(url) { // 分包
          if (url.includes('node_modules')) {
            if (url.includes('@vue')) return 'vue';
            if (url.includes('vue-router')) return 'vue-router';
            if (/tslib|dayjs|lodash|memoize/.test(url)) return 'tools';
            return url.toString().split('node_modules/')[1].split('/')[0].toString();
          }
          if (url.includes('src/common/utils')) return 'utils';
          if (url.includes('src/sub-admin/layout')) return 'layout';
          if (url.includes('src/sub-admin/views')) {
            return 'page-' + url.toString().split('src/sub-admin/views/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})
