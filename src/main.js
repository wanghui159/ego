import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'
import './assets/css/iconfont/iconfont.css'
import api from './api/index.js'
// 导入echarts
import * as echarts from 'echarts'
console.log('echarts', echarts);
Vue.prototype.$echarts = echarts
Vue.prototype.$api = api
Vue.config.productionTip = false
// 持久化
let user = localStorage.getItem('user')
if (user) {
  console.log('main-user', user);
  user = JSON.parse(user);
  console.log('json-main-user', user);
  store.commit('loginModule/setUser', user)
} else {

}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
