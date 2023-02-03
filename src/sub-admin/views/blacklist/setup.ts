import { api_deleteBlacklistIP, api_getBlacklist } from '@/sub-admin/api/blacklist';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { dateFormater } from '@/common/utils/date';

export default () => {

  const tableData = ref([]);
  
  initData();
  async function initData() {
    const [err, res] = await api_getBlacklist();
    if (err) return;
    const list = res.data;
    list.forEach(val => {
      val.create_time = dateFormater(val.create_time);
    });
    tableData.value = list;
  }

  function deleteBlacklistIP(row) {
    ElMessageBox.confirm('确认将此 IP 移出黑名单？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      const [err, res] = await api_deleteBlacklistIP({ id: row.id })
      if (err) return;
      ElMessage.success('已删除');
      initData();
    }).catch(() => {})
  }

  return {
    tableData,

    deleteBlacklistIP
  }
}