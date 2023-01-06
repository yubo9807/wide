import { AnyObj } from '@/common/utils/type';
import useStoreUser, { ROLE_CONFIG } from '@/sub-admin/store/user';
import { ElMessageBox } from 'element-plus';
import { computed, Ref } from 'vue';
import { useRouter } from 'vue-router';

export default () => {
  const storeUser = useStoreUser();
  const $router = useRouter();

  const role = computed(() => storeUser.role);
  const userInfo = computed(() => storeUser.info);

  function userPersonal() {
    $router.push({ name: 'UserPersonal' });
  }

  function userSignUp() {
    $router.push({ name: 'UserSignUp' });
  }

  function signOut() {
    ElMessageBox.confirm('确认退出登录', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      storeUser.signOut();
    }).catch(() => {});
  }

  return {
    role,
    ROLE_CONFIG,
    userInfo,
    userPersonal,
    userSignUp,
    signOut,
  } 
}