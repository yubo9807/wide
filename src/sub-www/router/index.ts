import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/login/index.vue';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: import('@/common/components/not-found/index.vue'),
  }
]

const router = createRouter({
  history: createWebHistory('/wide/www'),
  routes: routes,
})

export default router
