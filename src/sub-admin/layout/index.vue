<template>
  <div :class="['layout', unfold ? 'unfold' : '']">
    <!-- 侧边栏 -->
    <aside class="side">
      <!-- logo -->
      <div class="logo">
        <router-link to="/">
          <h1>后台管理系统</h1>
        </router-link>
      </div>

      <!-- 菜单 -->
      <Menu />
      
      <!-- 展开/收起 -->
      <span class="open" @click="open">
        <i class="iconfont icon">&#xe623;</i>
        <span v-show="!unfold">收起</span>
      </span>
    </aside>

    <!-- 主体 -->
    <main class="main">
      <!-- 头部 -->
      <Header />

      <!-- tabs -->
      <Tabs />

      <!-- 内容区 -->
      <RouteCache :include="tabs">
        <router-view />
      </RouteCache>
    </main>
  </div>
</template>

<script lang='ts'>
import RouteCache from '@/common/components/route-cache/index.vue';
import Menu from './components/menu/index.vue';
import Header from './components/header/index.vue';
import Tabs from './components/tabs/index.vue';
import watchLoginStatus from './watch-login-status';
import slidebar from './slidebar';
import watchRoute from './watch-route';

export default {
  components: {
    RouteCache,
    Header,
    Menu,
    Tabs,
  },
  setup() {
    return {
      ...watchLoginStatus(),
      ...slidebar(),
      ...watchRoute(),
    }
  },
}
</script>

<style lang='scss' scoped>
@import './module.scss';
</style>