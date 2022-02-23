/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2022-02-14 16:50:02
 * @LastEditTime : 2022-02-17 16:26:32
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\vit-demo\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
// import 'virtual:svg-icons-register'

createApp(App).use(createPinia()).mount('#app')
