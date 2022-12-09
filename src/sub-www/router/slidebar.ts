import router from '.';
import Layout from '../layout/index.vue';
import { getToken } from '../pinia/user';

/**
 * key: 后端返回角色
 * value: 前端权限控制角色
 */
export const roleConfig = {
  'super': 'admin',
  'user': 'user',
  'visitor': 'visitor'
}

export default {
  path: '/',
  name: 'Layout',
  component: Layout,
  redirect: '/sub-chain',
  beforeEnter(to, from, next) {
    const redirectHref = to.path;
    if (getToken()) next();
    else router.replace(`/login?redirect=${redirectHref}`);
  },
  children: [
    {
      path: 'sub-chain',
      name: 'Home',
      component: () => import('../views/sub-chain/index.vue'),
      meta: { title: '子链管理' },
    },
    {
      path: 'resource',
      name: 'Resource',
      component: () => import('../views/sub-chain/index.vue'),
      meta: { title: '资源管理' },
    },
    {
      path: 'across-chain',
      name: 'AcrossChain',
      component: () => import('../views/sub-chain/index.vue'),
      meta: { title: '跨链交易管理' },
    },
    {
      path: 'router',
      name: 'Router',
      component: () => import('../views/sub-chain/index.vue'),
      meta: { title: '路由器管理' },
    },
    {
      path: 'account',
      name: 'Account',
      component: () => import('../views/sub-chain/index.vue'),
      meta: { title: '账户管理' },
    },
  ]
}
