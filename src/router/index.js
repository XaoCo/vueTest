import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/**
 * route 数组
 */
const routes = [
  {
    path:'/',
    name:'Login',
    component: () => import('@/pages/login/Login.vue'),
  },
  {
    path:'/error',
    name:'Error',
    component: () => import('@/pages/error/Error.vue'),
  },
]

// const createRouter = () => new VueRouter({
//   mode: 'hash',
//   scrollBehavior: () => ({
//     y: 0
//   }),
//   routes: routes
// })
// const router = createRouter()
// export default router

export default new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})