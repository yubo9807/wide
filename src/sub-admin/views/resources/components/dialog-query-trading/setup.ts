import { deleteEmpty } from "@/common/utils/object";
import { api_queryTrading } from "@/sub-admin/api/trading";
import { FormInstance } from "element-plus";
import { getCurrentInstance, reactive, Ref, ref, watch } from "vue";

export default () => {

  const current = getCurrentInstance();

  const visible = ref(false);
  
  const formRef: Ref<FormInstance> = ref();
  watch(() => visible.value, value => {
    if (value) {

    } else {
      formRef.value.resetFields();
    }
  })

  const form = reactive({
    tradeHash: '',
  })

  const rules = {
    tradeHash: [
      { required: true, message: '请输入交易HASH', trigger: 'blur' }
    ],
  }

  const tradingData: Ref<any> = ref({});

  async function queryTrading() {
    const [err, res] = await api_queryTrading(form);
    if (err) return;

    tradingData.value = res.data[0];
  }

  return {
    visible,

    ...{ form, rules, formRef },

    tradingData,
    queryTrading,
  }
}