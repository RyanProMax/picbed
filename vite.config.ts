import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import WindiCSS from 'vite-plugin-windicss';
import { SvgLoader } from './src/utils/plugins';

// const isProd = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': `${path.resolve(__dirname, 'src')}`
    }
  },
  plugins: [
    /**
     * 启用响应性语法糖
     * https://staging-cn.vuejs.org/guide/extras/reactivity-transform.html
     */
    Vue({ reactivityTransform: true }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    /**
     * https://cn.windicss.org/
     * see windi.config.ts for config
     */
    WindiCSS(),
    SvgLoader()
  ]
});
