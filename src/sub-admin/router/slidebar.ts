import { RouteRecordRaw } from 'vue-router';
import Layout from '../layout/index.vue';
import { ROLE_CONFIG } from '../store/user';

const slidebar: Readonly<RouteRecordRaw> = {
  path: '/',
  name: 'Layout',
  component: Layout,
  redirect: '/home',
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('../views/home/index.vue'),
      meta: { title: '首页', icon: '&#xe62e;' },
    },
    {
      path: 'access',
      name: 'Access',
      component: () => import('../views/access/index'),
      meta: { title: '访客记录', icon: '&#xe603;' },
    },
    {
      path: 'servers',
      name: 'Servers',
      meta: { title: '服务器', icon: '&#xe98e;' },
      children: [
        {
          path: 'redis',
          name: 'ServersRedis',
          component: () => import('../views/servers/redis/index.vue'),
          meta: { title: '数据缓存', icon: '&#xe637;', roles: ['super', 'visitor'] },
        },
        {
          path: 'connector',
          name: 'ServersConnector',
          component: () => import('../views/servers/connector/index.vue'),
          meta: { title: '接口日志', icon: '&#xe610;', roles: ['super'] },
        },
      ]
    },
    {
      path: 'blacklist',
      name: 'Blacklist',
      component: () => import('../views/blacklist/index.vue'),
      meta: { title: '黑名单', icon: '&#xe722;', roles: ['super'] },
    },
    {
      path: 'users',
      name: 'Users',
      component: () => import('../views/users/index'),
      meta: { title: '用户管理', icon: '&#xe6d6;', roles: ['super'] },
    },
    {
      path: 'friend-link',
      name: 'FriendLink',
      component: () => import('../views/friend-link/index.vue'),
      meta: { title: '友情链接', icon: '&#xe617;' },
    },
  ]
}

export default slidebar;
