import { refresh } from './init';
import { ElMessage, ElMessageBox } from 'element-plus';
import { api_deleteFriendLink } from '@/sub-admin/api/friend-link';

export default () => {

  function deleteFriendLink(row) {
    ElMessageBox.confirm('确认删除该友链？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      const [err] = await api_deleteFriendLink({ id: row.id });
      if (err) return;
      ElMessage.success('删除成功');
      refresh();
    }).catch(() => {})
  }

  return {
    deleteFriendLink
  }
}