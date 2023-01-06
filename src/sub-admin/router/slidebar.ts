import { RouteRecordRaw } from 'vue-router';
import Layout from '../layout/index.vue';
import { ROLE_CONFIG } from '../store/user';

const slidebar: Readonly<RouteRecordRaw> = {
  path: '/',
  name: 'Layout',
  component: Layout,
  redirect: '/sub-chain',
  children: [
    {
      path: 'sub-chain',
      name: 'Home',
      component: () => import('../views/sub-chain/index.vue'),
      meta: { title: '子链管理', icon: '&#xe00a;' },
    },
    {
      path: 'resources',
      name: 'Resources',
      component: () => import('../views/resources/index.vue'),
      meta: { title: '资源管理', icon: '&#xe00d;' },
    },
    {
      path: 'trading',
      name: 'Trading',
      component: () => import('../views/trading/index.vue'),
      meta: { title: '跨链交易管理', icon: '&#xe004;' },
    },
    {
      path: 'account',
      meta: { title: '账户管理', icon: '&#xe003;' },
      children: [
        {
          path: '',
          name: 'Account',
          component: () => import('../views/account/index.vue'),
          meta: { title: '账户管理', icon: '&#xe003;' },
        },
        {
          path: 'personal',
          name: 'UserPersonal',
          component: () => import('../views/user/personal/index.vue'),
          meta: { title: '个人中心', icon: '&#xe003;', hidden: true },
        },
        {
          path: 'signUp',
          name: 'UserSignUp',
          component: () => import('../views/user/sign-up/index.vue'),
          meta: { title: '用户注册', icon: '&#xe003;', hidden: true, roles: [ ROLE_CONFIG[1] ] },
        },
      ]
    },
  ]
}

export default slidebar;
