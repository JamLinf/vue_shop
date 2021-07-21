import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      // app.vue中的router-view默认承载 path:'/'，我们这里是将其重定向到了login，要不然就是一片空白，当然也可以直接不管'/login'路径与Login组件的一致性。如果给'/'赋予组件，app.vue作为入口就会直接加载这个组件。
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        }
      ]
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
