import path from 'path';
import { defineConfig } from 'vite';

// plugin
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import WindiCSS from 'vite-plugin-windicss';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

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

    /**
     * On-demand Import element-plus
     * https://element-plus.org/en-US/guide/quickstart.html#on-demand-import
     */
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    ElementPlus(),

    /**
     * custom svg file loader
     */
    SvgLoader()
  ]
});
