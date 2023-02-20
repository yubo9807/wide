import { api_deleteBlacklistIP } from '@/sub-admin/api/blacklist';
import { refresh } from './init';
import { ElMessage, ElMessageBox } from 'element-plus';

export default () => {

  function deleteBlacklistIP(row) {
    ElMessageBox.confirm('确认将此 IP 移出黑名单？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      const [err, res] = await api_deleteBlacklistIP({ id: row.id })
      if (err) return;
      ElMessage.success('已删除');
      refresh();
    }).catch(() => {})
  }

  return {
    deleteBlacklistIP
  }
}