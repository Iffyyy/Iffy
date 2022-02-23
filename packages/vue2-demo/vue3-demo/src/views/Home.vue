<template>
  <div class="home">
    <div>{{count}}</div>
    <button @click="add">增加</button>
    <div v-for="item in 4" :key="item">{{item}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

function increase() {
  const count = ref(0)
  const add = () => {
    count.value++
  }
  return {
    count, add
  }
}

export default defineComponent({
  name: 'Home',
  components: {
  },
  beforeCreate(){
    console.log('beforeCreate')
  },
  created(){
    console.log('created')
  },
  setup(props, context) {
    let { count, add } = increase()
    console.log('setup')

    // onMounted(()=>{
    //   console.log('mounted')
    // })

    return {
      count, add
    }
  }
});
</script>
