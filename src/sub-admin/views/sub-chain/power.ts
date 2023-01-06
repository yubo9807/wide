
import { getCurrentInstance, ref } from "vue"


export default () => {

  const current = getCurrentInstance();

  const dialogAllocationPowerNeed = ref({});


  function allocationPower(row) {
    dialogAllocationPowerNeed.value = {
      currentId: row.id,
    };
    (current.refs.dialogAllocationPower as any).visible = true;
  }

  return {
    dialogAllocationPowerNeed,
    allocationPower,
  }
}