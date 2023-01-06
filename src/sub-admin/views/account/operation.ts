import { getCurrentInstance } from "vue"
import { api_deleteUser, api_modifyUserEnabled } from '@/sub-admin/api/user';
import { ElMessageBox } from "element-plus";

export default () => {

  const current = getCurrentInstance();
  const _this: any = current.proxy;

  async function modifyUserEnabled(row) {
    const params = {
      userid: row.userid,
      enabled: row.enabled === 1 ? 0 : 1,
    }
    const [err, res] = await api_modifyUserEnabled(params);
    if (err) return;
    _this.initData()
  }

  function deleteUser(row) {
    ElMessageBox.confirm('确认删除该用户', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      const [err, res] = await api_deleteUser({ userid: row.userid });
      if (err) return;
      _this.initData();
    }).catch(() => {});
  }

  return {
    modifyUserEnabled,
    deleteUser,
  }
}