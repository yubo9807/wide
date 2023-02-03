import { api_clearMemoryRedis, api_getMemoryRedis } from '@/sub-admin/api/memory';
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { dateFormater, getTimeDistance } from '@/common/utils/date';
import { calculateByte } from '@/common/utils/number';
import { getLSUsedSpace } from '@/common/utils/object';
import { ElMessage, ElMessageBox } from 'element-plus';

export default () => {

  const table = ref([]);
  const total = reactive({
    length: 0,
    size: '0Byte',
  })

  let backups = null;  // 数据备份


  // 监听路由变化，刷新相应数据
  const $route = useRoute();
  watch(() => $route.query.path, async(value: string) => {
    if (!backups || !value) await initData();
    if (value) table.value = [ backups.find(val => val.key === value) ];
  }, { immediate: true })
  

  /**
   * 初始化数据
   */
  async function initData() {
    const [err, res] = await api_getMemoryRedis();
    if (err) return;

    const { data, size, length } = res.data;
    total.length = length;
    total.size = calculateByte(size);

    const list = [];
    for (const key in data) {
      const { createTime, overTime, count, value } = data[key];
      list.push({
        key,
        createTime: dateFormater(createTime),
        cacheTime: overTime === null ? Infinity : getTimeDistance(overTime / 1000),
        overTime: overTime === null ? '-' : dateFormater(createTime + overTime),
        count,
        value: JSON.stringify(value),
        size: getLSUsedSpace(data[key]) + key.length,
      });
    }
    table.value = list;
    backups = list;
  }

  /**
   * 清空缓存
   */
  function clearCache() {
    ElMessageBox.confirm('确认清空 Redis 缓存？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      const [err] = await api_clearMemoryRedis();
      if (err) return;
      ElMessage.success('操作成功');
      initData();
    }).catch(() => {})
  }


  return {
    table,
    total,
    clearCache,
  }
}