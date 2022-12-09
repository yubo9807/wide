import { api_signIn } from '@/sub-www/api/login'
import { reactive } from 'vue'
import useStoreUser from '@/sub-www/pinia/user';
import { useRoute, useRouter } from 'vue-router';
import { deleteEmpty } from '@/common/utils/object';

export default () => {

  const $route    = useRoute();
  const $router   = useRouter();
  const storeUser = useStoreUser();

  const form = reactive({
    username: '',
    password: '',
  })


  /**
   * 登录
   */
  async function signIn() {
    const params = deleteEmpty(form);
    const [err, res] = await api_signIn(params);
    if (err) return;

    storeUser.signIn(res.data.token);
    const redirect = $route.query.redirect || '/';
    $router.replace((redirect as string));
  }

  return {
    form,
    signIn,
  }
}