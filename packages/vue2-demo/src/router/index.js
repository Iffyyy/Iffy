import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = () => import('@/components/HelloWorld')

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }
]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

export default router