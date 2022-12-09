import useStoreUser from '@/sub-www/pinia/user';
import { ElMessageBox } from 'element-plus';

export default () => {
  const storeUser = useStoreUser();

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
    signOut
  } 
}