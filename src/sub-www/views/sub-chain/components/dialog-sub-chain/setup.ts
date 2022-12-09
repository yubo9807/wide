import { api_createSubChain } from "@/sub-www/api/sub-chain";
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
    url: '',
  })

  const rules = {
    url: [
      { required: true, message: '请输入地址', trigger: 'blur' }
    ]
  }


  function createSubChain() {
    formRef.value.validate(async valid => {
      if (!valid) return;

      const [err] = await api_createSubChain({});
      if (err) return;
      current.emit('success');
    })
  }


  return {
    visible,

    ...{ form, rules, formRef },

    createSubChain,
  }
}