import { AnyObj } from "@/common/utils/type";
import { getCurrentInstance, reactive, Ref, ref } from "vue"


export default () => {

  const current = getCurrentInstance();

  const sendTradingNeed = ref({});

  function sendTrading(row) {
    sendTradingNeed.value = { chainId: row.chainId };
    (current.refs.dialogSendTrading as any).visible = true;
  }

  function queryTrading(row) {
    (current.refs.dialogQueryTrading as any).visible = true;
  }

  return {
    sendTradingNeed,
    sendTrading,

    queryTrading,
  }
}