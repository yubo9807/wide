<template>
  <div class="system-info">

    <ul class="wrap clearfix">
      <li>
        <strong>CPU型号：</strong><span>{{ info.model }}</span>
      </li>
      <li>
        <strong>操作系统：</strong><span>{{ info.type }}</span>
      </li>
      <li>
        <strong>内核版本：</strong><span>{{ info.version }}</span>
      </li>
      <li>
        <strong>运行时间：</strong><span>{{ getTimeDistance(info.uptime) }}</span>
      </li>
    </ul>

    <div class="charts">
      <div>
        <ChartLoad :loadList="loadList" />
      </div>
      <div>
        <ChartMemory :memoryList="memoryList" />
      </div>
    </div>

  </div>
</template>

<script lang='ts'>
import { defineAsyncComponent } from 'vue';
import Loading from '@/common/components/loading/index.vue';

const ChartLoad = defineAsyncComponent({
  loader: () => import('./components/chart-load/index.vue'),
  loadingComponent: Loading,
});
const ChartMemory = defineAsyncComponent({
  loader: () => import('./components/chart-memory/index.vue'),
  loadingComponent: Loading,
});
import main from './setup';
import { getTimeDistance } from '@/common/utils/date';

export default {
  components: {
    ChartMemory,
    ChartLoad,
  },
  setup() {
    return {
      ...main(),
      getTimeDistance
    }
  }
}
</script>

<style lang='scss' scoped>
.system-info{

  > .wrap{
    letter-spacing: 1.2px;
    padding-left: 4px;
    > li{
      line-height: 2;
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .charts{
    display: flex;
    justify-content: space-between;
    height: 140px;
    > div{
      width: 48%;
    }
  }
}
</style>