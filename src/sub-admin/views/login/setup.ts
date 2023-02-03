import useStoreUser from '@/sub-admin/store/user';
import { useRouter, useRoute } from 'vue-router';
import { reactive } from 'vue';
import { api_signIn } from '@/sub-admin/api/login';
import env from '@/common/env';

export default () => {
  const $router = useRouter();
  const $route = useRoute();
  const storeUser = useStoreUser();

  const form = reactive({
    username: '',
    password: ''
  })

  /**
   * 登录
   */
  async function signIn() {
    const [err, res] = await api_signIn(form);
    if (err) return;
    const { token } = res.data;
    storeUser.signIn(token);
    const redirect = $route.query.redirect || '/home';
    $router.replace((redirect as string));
  }

  /**
   * 访客登录
   */
  async function visitorSignIn() {
    form.username = 'visitor';
    form.password = '111111';
    signIn();
  }

  return {
    SYSTEM_NAME: env.SYSTEM_NAME,
    form,
    signIn,
    visitorSignIn,
  }
}
