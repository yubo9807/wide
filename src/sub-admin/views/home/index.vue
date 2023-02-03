<template>
  <LayoutContainer class="home-page">
    <div class="box">
      <ChartAccessRecord />
    </div>
    <SystemInfo class="box" />
    <div class="box">
      <ChartRedis />
    </div>
  </LayoutContainer>
</template>

<script lang='ts'>
import LayoutContainer from '@/common/components/layout-container/index.vue';
import Loading from '@/common/components/loading/index.vue';
import SystemInfo from './components/system-info/index.vue';
import { defineAsyncComponent } from 'vue';

const ChartAccessRecord = defineAsyncComponent({
  loader: () => import('./components/chart-access-record/index.vue'),
  loadingComponent: Loading,
})
const ChartRedis = defineAsyncComponent({
  loader: () => import('./components/chart-redis/index.vue'),
  loadingComponent: Loading,
})

export default {
  // name: 'Home',
  components: {
    LayoutContainer,
    SystemInfo,
    ChartAccessRecord,
    ChartRedis
  }
}
</script>

<style lang='scss' scoped>
.box{
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,.2);
  margin-bottom: 14px;
}
</style>