import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import './assets/css/reset.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 初始化样式
//import './styles/element-variables.scss'
import '@/styles/index.scss' // global css

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
