<template>
  <!-- 头部 -->
  <Header />
  
  <!-- 内容区 -->
  <RouteCache>
    <router-view />
  </RouteCache>
</template>

<script lang='ts'>
import RouteCache from '@/common/components/route-cache/index.vue';
import Header from './components/header/index.vue';
import useStoreUser, { getToken } from '../pinia/user';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: {
    RouteCache,
    Header
  },
  setup() {
    const $router   = useRouter();
    const $route    = useRoute();
    const storeUser = useStoreUser();

    storeUser.getUserInfo();
    const login = computed(() => storeUser.login);

    // 监听登录状态，退出页面
    watch(() => login.value, value => {
      if (value === 1) return;
      exitLayout();
    })
    
    /**
     * 退出
     */
    function exitLayout() {
      const redirectHref = $route.path;
      $router.replace(`/login?redirect=${redirectHref}`);
    }

    return {}
  },
}
</script>

<style lang='scss'>
</style>