import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    hidden: true,
    redirect: '/login',
  },
    {
      path:'/login',
      name: 'login',
      hidden: true,
      component: () => import('../views/login')
    },
  {
    path: '/Home',
    component: Layout,
    redirect: '/Home/index',
    children: [{
      path: 'index',
      name: 'Home',
      meta: { title: '首页', affix: true },
      component: () => import('../views/Home.vue')
    }]

  },
    {
      path: '/system',
      component: Layout,
      meta: { title: '系统管理'},
      children: [
          {
        path: 'user',
        name: 'user',
        meta: { title: '用户管理'},
        component: () => import('../views/system/user')
      },{
        path: 'role',
        name: 'role',
        meta: { title: '角色管理'},
        component: () => import('../views/system/role')
      }]
    },{
      path: '/table',
      component: Layout,
      meta: { title: '表格管理', tableOne: true},
      children: [
        {
          path: 'index',
          name: 'index',
          meta: { title: '用户管理'},
          component: () => import('../views/system/user')
        }
      ]
    },
    {
      path: '/about',
      component: Layout,
      redirect: '/about/index',
      children: [{
        path: 'index',
        name: 'about',
        meta: { title: '关于'},
        component: () => import('../views/about.vue')
      }]
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
