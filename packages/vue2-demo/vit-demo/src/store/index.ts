/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2022-02-17 14:00:47
 * @LastEditTime : 2022-02-17 16:28:42
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\vit-demo\src\store\index.ts
 */
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () =>({ name: 'codexu', num: 18 }),
  getters: {},
  actions: {}
})