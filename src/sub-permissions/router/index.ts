import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Permissions from '../views/permissions/index.vue';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'Permissions',
    component: Permissions
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: import('@/common/components/not-found/index.vue'),
  }
]

const router = createRouter({
  history: createWebHistory('/wide/permissions'),
  routes: routes,
})

export default router
