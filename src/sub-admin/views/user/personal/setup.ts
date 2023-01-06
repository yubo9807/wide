import { deleteEmpty } from "@/common/utils/object"
import { reactive, Ref, ref } from "vue"
import { api_resetPassword } from '@/sub-admin/api/user';
import { ElMessageBox, FormInstance } from "element-plus";
import useStoreUser from '@/sub-admin/store/user';

export default () => {

  const storeUser = useStoreUser();

  const form = reactive({
    username: storeUser.info.username,
    password: '',
  })

  const formRef: Ref<FormInstance> = ref();


  async function confirm() {
    formRef.value.validate(async valid => {
      if (!valid) return;

      const params = deleteEmpty(form);
      const [err] = await api_resetPassword(params);
      if (err) return;

      ElMessageBox.confirm('用户名密码已修改，请重新登录', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'info',
      }).then(() => {
        storeUser.signOut();
      }).catch(() => {})
    })
  }

  return {
    form,
    formRef,
    confirm,
  }
}