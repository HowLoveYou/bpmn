import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

import '@/styles/index.scss' //全局样式

//路由拦截器
import '@/router/interceptor.js'

require('@/mock');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')