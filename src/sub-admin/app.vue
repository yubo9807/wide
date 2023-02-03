
<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { debounce, throttle } from '@/common/utils/optimize';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import useStoreViewport from './store/viewport';

export default {
  setup() {
    document.title = '后台管理系统'

    const storeViewport = useStoreViewport();
    window.addEventListener('resize', debounce(() => {
      storeViewport.set_clientWidth(document.body.clientWidth);
    }, 300))

    window.addEventListener('scroll', throttle(() => {
      storeViewport.set_scrollY(window.scrollY);
    }, 16))

    return {
      zhCn
    }
  }
}

</script>

<style lang='scss' scoped>
</style>
