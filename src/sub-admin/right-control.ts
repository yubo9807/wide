import router from './router';
import useStoreUser, { getToken } from './store/user';

Promise.resolve().then(() => {
  const storeUser = useStoreUser();
  let lock = true;
  router.beforeEach(async(to, from, next) => {

    // 退出登录把锁打开，再次进入保证重新获取用户数据
    if (storeUser.login === 2) lock = true;

    // 不属于 layout
    if (to.matched[0].name != 'Layout') return next();

    if (!getToken()) {
      router.replace('/login');
      return next();
    }

    // 获取用户信息，保证进入页面只请求一次
    if (lock) {
      const result = await storeUser.getUserInfo();
      if (!result) {
        router.replace('/login');
        return next();
      }
    }
    lock = false;

    // 没有设置权限，相当于设置了所有权限
    // 这里的 to.meta 会继承父级的属性，不晓得为啥子
    const roles = to.matched[to.matched.length-1].meta.roles;
    if (!roles) return next();

    // 符合设置权限
    const bool = (roles as string[]).includes(storeUser.role);
    if (bool) return next();

    // 不符合跳转到首页
    router.replace(`/`);
    next();
  })
})