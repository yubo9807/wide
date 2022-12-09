import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import env from '@/common/env';
import Login from '../views/login/index.vue';
import layout from './slidebar';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  layout,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: import('@/common/components/not-found/index.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(env.BASE_ROUTE_URL+'/www'),
  routes: routes,
})

export default router
