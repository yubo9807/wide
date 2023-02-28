import { createNum } from "@/common/utils/number";
import { toGreatHump } from "@/common/utils/string";
import { RouteRecordRaw } from "vue-router";
import { ROLE_CONFIG } from "../store/user";

const exclude = ['login'];  // 排除访问文件

const iter = createNum();
const order = () => iter.next().value;

const pageConfig = {
  // 排在第一个的为首页
  Home:
    { order: order(), icon: '&#xe62e;', title: '首页', },
  Access:
    { order: order(), icon: '&#xe603;', title: '访客记录', },
  Servers:
    { order: order(), icon: '&#xe98e;', title: '服务器', roles: [ROLE_CONFIG.super], },
  ServersRedis:
    { order: order(), icon: '&#xe637;', title: '数据缓存', },
  ServersConnector:
    { order: order(), icon: '&#xe610;', title: '接口日志', roles: [ROLE_CONFIG.super], },
  Blacklist:
    { order: order(), icon: '&#xe722;', title: '黑名单', roles: [ROLE_CONFIG.super, ROLE_CONFIG.visitor], },
  Users:
    { order: order(), icon: '&#xe6d6;', title: '用户管理', roles: [ROLE_CONFIG.super], },
  FriendLink:
    { order: order(), icon: '&#xe617;', title: '友情链接', },
}

/**
 * 获取所有 routes
 * @returns 
 */
function getRoutesAll(): RouteRecordRaw[] {
  const obj = import.meta.glob(['../views/**/index.vue', '../views/**/index.tsx']);

  const routes = [];
  for (const prop in obj) {
    let isExclude = false;
    exclude.forEach(val => prop.includes(val) && (isExclude = true));
    if (isExclude || prop.includes('/components/')) continue;

    const splits = prop.split('/');
    const arr = splits.slice(2, splits.length - 1);

    const name = arr.map(val => toGreatHump(val)).join('');
    routes.push({
      name,
      path: '/'+arr.join('/'),
      component: obj[prop],
      meta: pageConfig[name] || { order: order() },
    })
  }

  return routes.sort((a, b) => a.meta.order - b.meta.order);
}

export const routesAll = getRoutesAll();

/**
 * 获取树形结构 routes
 * @param routes 
 * @returns 
 */
function getTreeRoutes(routes: RouteRecordRaw[]) {
  const indexArr = [];
  const newRoutes = [];
  routes.forEach((val, i) => {
    const children = routes.filter((item, j) => {
      const bool = item.path.startsWith(val.path + '/');
      bool && indexArr.push(j);
      return bool;
    });
    if (children.length > 0) {
      val.children = getTreeRoutes(children);
    }
    !indexArr.includes(i) && newRoutes.push(val);
  })  
  return newRoutes;
}

export const layoutRoutes = getTreeRoutes(routesAll);
// console.log(layoutRoutes);
