// vue
import { getCurrentInstance, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

// api
import { api_getAccessRecordChart } from '@/sub-admin/api/access';

// utils
import { getNowDayZeroTimestamp } from '@/common/utils/date';

// stroe
import useStoreViewport from '@/sub-admin/store/viewport';

// echarts
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { TitleComponent, GridComponent, TooltipComponent } from 'echarts/components';
import option from './option';

echarts.use([
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LineChart,
  CanvasRenderer
]);



export default () => {

  const current = getCurrentInstance();
  const $router = useRouter();

  let chart = null;
  onMounted(() => {

    // 初始化图表
    chart = echarts.init((current.refs.chart as HTMLElement));

    // 点击图标跳转页面
    chart.on('click', event => {
      if (event.data === 0) return;
      $router.push({ name: 'Access', query: { log: event.name.trim() + '.log' } });
    })

  })

  const storeViewport = useStoreViewport();
  watch(() => storeViewport.clientWidth, value => {
    chart.resize();
  })



  const visitorsNumber = ref(0);  // 访问次数

  /**
   * 初始化数据
   */
  (async function() {
    const dayDuration = 1000 * 60 * 60 * 24;

    // 获取六天前 00:00:00 的时间戳
    const weekAgo = getNowDayZeroTimestamp() - dayDuration * 6;
    const startTime = Math.floor(new Date(weekAgo).getTime() / 1000);

    // 获取数据
    const [err, res] = await api_getAccessRecordChart({ startTime });
    if (err) return;
    
    const { data } = res;
    const dateList: string[]  = Object.keys(data);
    const countList: number[] = Object.values(data);
    const emptyStr = '                 ', len = dateList.length;
    dateList[0] = emptyStr + dateList[0];
    dateList[len - 1] = dateList[len - 1] + emptyStr;

    option.xAxis.data = dateList;
    option.series[0].data = Object.values(data);
    chart.setOption(option);

    visitorsNumber.value = countList.reduce((a: number, b: number) => a + b);
  }())



  return {
    visitorsNumber
  }

}
