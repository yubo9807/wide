import { AnyObj } from "@/common/utils/type";
import { api_batchSynchronization, api_deleteMenu } from "@/sub-permissions/api/permissions";
import { ElMessage, ElMessageBox } from "element-plus";
import { getCurrentInstance, reactive, ref } from "vue"


export default () => {

  const current = getCurrentInstance();
  const _this: AnyObj = current.proxy;

  const selectMenu = reactive({ name: '', id: '' });

  function showConfig(row: AnyObj = {}) {
    selectMenu.name = row.name;
    selectMenu.id = row.id;
    (current.refs.drawerConfig as any).visible = true;
  }

  const dialogMenuType = ref(0);
  const dialogMenuNeed = ref({});

  function addMenu() {
    dialogMenuType.value = 0;
    dialogMenuNeed.value = {};
    (current.refs.dialogMenu as any).visible = true;
  }

  function modifyMenu(row) {
    const { id, name, title, parent } = row;
    dialogMenuType.value = 1;
    dialogMenuNeed.value = { id, name, title, parent };
    (current.refs.dialogMenu as any).visible = true;
  }

  function deleteMenu(row) {
    ElMessageBox.confirm('确认删除该用户？删除后配置中的接口/元素会归类到公共配置中！', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      const [err, res] = await api_deleteMenu({ id: row.id });
      if (err) return;
      ElMessage.success('删除成功');
      _this.initData();
    }).catch(() => {});
  }

  async function select(rows) {
    const contactIdList = rows.map(val => val.id);
    const deleteIdList = _this.flatData
      .filter(val => !contactIdList.includes(val.id))
      .map(val => val.id);
    const params = {
      tableType: 'menu',
      roleId: _this.nowRole.id,
      contactIdList,
      deleteIdList,
    }
    const [err] = await api_batchSynchronization(params);
    if (err) return;
    _this.initData();
  }

  return {
    selectMenu,
    showConfig,

    dialogMenuType,
    dialogMenuNeed,
    addMenu,
    modifyMenu,
    deleteMenu,

    select,
  }
}