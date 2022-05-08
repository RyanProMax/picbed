import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';

/**
 * 英文文档：https://windicss.org/
 * 中文文档: https://cn.windicss.org/
 */
export default defineConfig({
  darkMode: 'class',
  attributify: {
    prefix: 'w:'
  },
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      },
      colors: {
        gray: colors.coolGray,
        blue: colors.sky,
        red: colors.rose,
        pink: colors.fuchsia
      }
    }
  },
  shortcuts: {
    'btn': 'py-1 px-4 font-sans font-thin rounded transition duration-250',
    'btn-red': 'text-white bg-red-500 hover:bg-red-700',
    'input': 'py-2 px-4 text-center border-1 rounded border-gray-500 outline-none font-thin bg-transparent hover:(border-red-500) focus:(border-red-500) transition duration-250'
  }
});
