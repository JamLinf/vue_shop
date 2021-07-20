import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
// import { Message } from 'element-ui'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/home',
      component: Home
    }
  ]
})

// 挂载路由导航，在浏览器无token和token实效的情况下重新导航至登录页面
router.beforeEach((to, from, next) => {
  // to 表示要访问的路径  from 表示路由来的路径  next 表示放行 next() 放行 next('强制要跳转的路径F')
  if (to.path === '/login') next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})
export default router
