import { AnyObj } from "@/common/utils/type";
import { api_allocationPower } from "@/sub-admin/api/sub-chain";
import { ElMessage } from "element-plus";
import { getCurrentInstance, nextTick, ref } from "vue"

export default () => {

  const current = getCurrentInstance();
  const props: AnyObj = current.props;
  const _this: AnyObj = current.proxy;

  let tableSelectRows = [];

  function tableSelectionChange(rows) {
    tableSelectRows = rows;
  }

  async function confirm() {
    const ids = tableSelectRows.map(val => val.id);
    const params = {
      ...props.need,
      ids: ids.toString(),
    }
    const [err] = await api_allocationPower(params);
    if (err) return;

    _this.initData();
    ElMessage.success('权限分配成功');
    current.emit('success')
  }

  return {
    tableSelectionChange,
    confirm,
  }
}