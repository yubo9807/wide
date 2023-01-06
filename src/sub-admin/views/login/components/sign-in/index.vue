<template>
  <el-form ref="formRef" :model="form" :rules="rules" class="login" label-width="60px" label-position="top">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" placeholder="请输入密码" type="password" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input v-model="form.code" placeholder="请输入验证码" :clearable="false" @keyup.enter="signIn">
        <template #suffix>
          <img :src="captcha" alt="验证码" height="40" @click="getCaptcha">
        </template>
      </el-input>
    </el-form-item>
    <el-button type="primary" class="sign-in-button" @click="signIn">登录</el-button>
  </el-form>
</template>

<script lang="ts">
import { deleteEmpty } from '@/common/utils/object';
import { api_signIn, api_getCaptcha } from '@/sub-admin/api/login';
import { reactive, ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useStoreUser from '@/sub-admin/store/user';
import rules from '../rules';
import { FormInstance } from 'element-plus'
import { AnyObj } from '@/common/utils/type';

export default {
  setup() {
    const captcha = ref('')
    getCaptcha()
    async function getCaptcha() {
      const [err, res] = await api_getCaptcha()
      if (err) return;

      const blob = new window.Blob([res], {type: 'image/jpeg'});
      const url = window.URL.createObjectURL(blob);
      captcha.value = url;
    }

    const $route    = useRoute();
    const $router   = useRouter();
    const storeUser = useStoreUser();

    const form = reactive({
      username: '',
      password: '',
      code: '',
    })

    const formRef: Ref<FormInstance> = ref()

    /**
     * 登录
     */
    async function signIn() {
      formRef.value.validate(async valid => {
        if (!valid) return;

        const params: AnyObj = deleteEmpty(form);
        params.code = Number(params.code);
        const [err, res] = await api_signIn(params);
        if (err) return;

        storeUser.signIn(res.data.token);
        const redirect = $route.query.redirect || '/';
        $router.replace((redirect as string));
      })
    }

    return {
      captcha,
      getCaptcha,

      formRef,
      form,
      rules,
      signIn,
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  ::v-deep .el-input__inner{
    height: 40px;
  }
}
.sign-in-button{
  width: 100%;
  background: var(--main-color);
}
</style>