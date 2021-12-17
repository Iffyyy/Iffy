import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VfUI from 'vfox-ui';

Vue.config.productionTip = false
// Vue.use(VfUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
