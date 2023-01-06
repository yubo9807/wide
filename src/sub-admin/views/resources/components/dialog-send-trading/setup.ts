import { deleteEmpty } from "@/common/utils/object";
import { api_createSubChain } from "@/sub-admin/api/sub-chain";
import { api_getTradingList } from '@/sub-admin/api/trading'
import { FormInstance } from "element-plus";
import { getCurrentInstance, reactive, Ref, ref, watch } from "vue";

export default () => {

  const current = getCurrentInstance();
  const { props } = current;

  const visible = ref(false);
  
  const formRef: Ref<FormInstance> = ref();
  watch(() => visible.value, value => {
    if (value) {
      form.recChainId = (props.need as any).chainId;
      querySubChainAll();
    } else {
      formRef.value.resetFields();
    }
  })

  const form = reactive({
    sendChainId: '',
    recChainId: '',
    dataList: [],
    tagList: [],
    content: '',
  })

  const rules = {
    sendChainId: [
      { required: true, message: '请输入接受ID', trigger: 'blur' }
    ],
    recChainId: [
      { required: true, message: '请输入发送ID', trigger: 'blur' }
    ],
  }

  const receiveIDList = ref([]);

  async function querySubChainAll() {
    const [err, res] = await api_getTradingList({})
    if (err) return;
    receiveIDList.value = res.data;
  }
  /**
   * 创建子链
   */
  function createSubChain() {
    formRef.value.validate(async valid => {
      if (!valid) return;

      const params = deleteEmpty(form);
      const [err] = await api_createSubChain(params);
      if (err) return;
      visible.value = false;
      current.emit('success');
    })
  }

  return {
    visible,

    ...{ form, rules, formRef },

    receiveIDList,

    createSubChain,
  }
}