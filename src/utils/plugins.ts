import fs from 'fs';
import type { Plugin } from 'vite';
import { compileTemplate } from 'vue/compiler-sfc';

/**
 * @description svg-loader
 * 将svg编译成vue组件
 * see more: https://github.com/jpkleemans/vite-svg-loader
 */
export function SvgLoader(): Plugin {
  return {
    name: 'svg-loader',
    enforce: 'pre',

    load(file: string) {
      if (!file.match(/\.svg$/))
        return;
      const svg = fs.readFileSync(file, 'utf-8');

      const { code } = compileTemplate({
        id: file,
        source: svg,
        filename: file,
        transformAssetUrls: false
      });
      return `${code}\nexport default { render }`;
    }
  };
}
