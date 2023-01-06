import router from './router';
import useStoreUser from './store/user';

const layoutRoutes = router.options.routes[1].children;
Promise.resolve().then(() => {
  const storeUser = useStoreUser();
  let lock = true;
  router.beforeEach(async(to, from, next) => {

    // 不属于 layout
    if (to.matched[0].name != 'Layout') return next();

    // 获取用户信息，保证进入页面只请求一次
    lock && await storeUser.getUserInfo();
    lock = false;

    // 没有设置权限，相当于设置了所有权限
    const roles = to.meta.roles;
    if (!roles) return next();

    // 符合设置权限
    const bool = (roles as string[]).includes(storeUser.role);
    if (bool) return next();

    // 不符合跳转到首页
    router.replace(`/`);
    next();
  })
})