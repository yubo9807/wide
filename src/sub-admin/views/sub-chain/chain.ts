import { api_modifySubChainStatus } from "@/sub-admin/api/sub-chain";
import { ElMessage } from "element-plus";
import { getCurrentInstance, reactive, ref } from "vue"


export default () => {

  const current = getCurrentInstance();
  const _this: any = current.proxy;

  const dialogSubChainType = ref(0);
  const dialogSubChainNeed = ref({});

  function createSubChain() {
    dialogSubChainType.value = 0;
    dialogSubChainNeed.value = {};
    (current.refs.dialogSubChain as any).visible = true;
  }

  function editSubChain(row) {
    dialogSubChainType.value = 1;
    dialogSubChainNeed.value = {
      id: row.id,
      status: row.status,
      secretId: row.secretId,
      secretKey: row.secretKey,
      address: row.address,
      name: row.name,
      tag: row.tag,
    };
    (current.refs.dialogSubChain as any).visible = true;
  }

  async function changeStatus(row) {
    const params = {
      id: row.id,
      status: row.status === '已公开' ? '未公开' : '已公开',
    }
    const [err] = await api_modifySubChainStatus(params);
    if (err) return;
    ElMessage.success('状态已修改');
    _this.initData();
  }

  return {
    dialogSubChainType,
    dialogSubChainNeed,
    createSubChain,
    editSubChain,

    changeStatus,
  }
}