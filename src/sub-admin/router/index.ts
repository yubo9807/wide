import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import env from '@/common/env';
import Layout from '../layout/index.vue';
import { layoutRoutes } from './create-routes'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: layoutRoutes[0].path,
    children: layoutRoutes
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/common/components/not-found/index.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(env.BASE_ROUTE_URL+'/admin'),
  routes: routes,
})

export default router
