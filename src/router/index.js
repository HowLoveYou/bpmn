import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

import business_router from './business_router'
const routes = [{
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'main',
    component: () => import('@/layout/index.vue'),
    children: [].concat(business_router)
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router