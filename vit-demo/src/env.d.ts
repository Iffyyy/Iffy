/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2022-02-14 16:50:02
 * @LastEditTime : 2022-02-21 11:03:46
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\vit-demo\src\env.d.ts
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
