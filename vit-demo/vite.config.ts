/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2022-02-14 16:50:02
 * @LastEditTime : 2022-02-18 11:24:28
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\vit-demo\vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const path = require("path");

const resolve = (dir, url) => path.resolve(dir, url)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // createSvgIconsPlugin({
    //   iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
    //   symbolId: 'icon-[dir]-[name]',
    // }),
    Components({
      resolvers: [
        AntDesignVueResolver()
      ]
    }),

    AutoImport({
      dts: './src/auto-imports.d.ts',
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // 把 @ 指向到 src 目录去
    },
  },
})
