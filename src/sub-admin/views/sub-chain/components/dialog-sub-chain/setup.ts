import { deleteEmpty } from "@/common/utils/object";
import { AnyObj } from "@/common/utils/type";
import { api_checkCZAddress, api_createSubChain, api_modifySubChain } from "@/sub-admin/api/sub-chain";
import { ElMessage, FormInstance } from "element-plus";
import { getCurrentInstance, nextTick, reactive, Ref, ref, watch } from "vue";

export default () => {

  const current = getCurrentInstance();
  const props: AnyObj = current.props;

  const visible = ref(false);



  // #region 表单数据
  const formRef: Ref<FormInstance> = ref();

  const form = reactive({
    secretId: '',
    secretKey: '',
    address: '',
    name: '',
    tag: '',
    status: '',
  })

  const rules = {
    secretId: [
      { required: true, message: '请输入 SERCETID', trigger: 'blur' }
    ],
    secretKey: [
      { required: true, message: '请输入 SERCETKEY', trigger: 'blur' }
    ],
    address: [
      { trigger: 'blur', async validator(rule, value, callback) {
        const bool = await checkCZAddress();
        if (bool) return callback();
        callback(new Error('error'));
      }}
    ],
    name: [
      { required: true, message: '请输入子链名称', trigger: 'blur' }
    ],
    tag: [
      { required: true, message: '请输入子链标签', trigger: 'blur' }
    ],
  }

  watch(() => visible.value, value => {
    if (value) {
      if (props.type === 1) {
        for (const prop in form) {
          form[prop] = props.need[prop];
        }
      }
    } else {
      formRef.value.resetFields();
      for (const prop in form) {
        form[prop] = '';
      }
    }
  })
  // #endregion



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
      ElMessage.success('添加成功');
      current.emit('success');
    })
  }

  /**
   * 修改子链
   */
  function editSubChain() {
    formRef.value.validate(async valid => {
      if (!valid) return;

      const params: AnyObj = deleteEmpty(form);
      params.id = props.need.id;
      const [err] = await api_modifySubChain(params);
      if (err) return;
      visible.value = false;
      ElMessage.success('修改成功');
      current.emit('success');
    })
  }


  const checkStatus = ref(false);

  /**
   * 校验存证地址
   */
  async function checkCZAddress() {
    checkStatus.value = false;
    if (!form.secretId || !form.secretKey) return false;
    const params = {
      secretId: form.secretId,
      secretKey: form.secretKey,
      address: form.address,
    }
    const [err] = await api_checkCZAddress(params);
    if (err) return false;

    ElMessage.success('校验成功');
    checkStatus.value = true;
    return true;
  }

  /**
   * 手动失焦
   */
  function manualOutOfFocus() {
    const elSecretId: any = current.refs.secretIdRef;
    const elSecretKey: any = current.refs.secretKeyRef;
    const elAddress: any = current.refs.addressRef;
    elSecretId.focus();
    elSecretKey.focus();
    elAddress.focus();
    setTimeout(() => {
      elSecretId.blur();
      elSecretKey.blur();
      elAddress.blur();
    });
  }


  return {
    visible,

    ...{ form, rules, formRef },

    createSubChain,
    editSubChain,

    checkStatus,
    manualOutOfFocus,
  }
}