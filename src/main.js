import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入icon的图标样式表
import './assets/font/iconfont.css'
//  导入全局的样式表来统一去除掉浏览器默认样式
import './assets/css/global.css'
// 导入axios网络请求库
import axios from 'axios'
// 配置axios的根路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.config.productionTip = false

Vue.prototype.$http = axios // 将Vue对象原型(prototype) 自定义属性http 赋值为axios，方便Vue环境下全局使用
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
