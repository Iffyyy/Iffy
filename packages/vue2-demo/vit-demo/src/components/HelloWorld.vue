<!--
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2022-02-14 16:50:02
 * @LastEditTime : 2022-02-18 14:30:39
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\vit-demo\src\components\HelloWorld.vue
-->
<script setup lang="ts">
import { ref, defineComponent, toRef } from 'vue'
import { useUserStore } from '../store/index'

defineProps<{ msg: string }>()

const userStore = useUserStore()
const count = toRef(userStore,'num')

</script>

<template>
  <h1>{{ msg }}</h1>
  <div>{{userStore.name}}</div>
  <button type="button" @click="count++">count is: {{ count }}</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
