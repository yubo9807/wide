<template>
  <el-form :model="form" :rules="rules" label-width="80px" label-position="top">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" placeholder="请输入密码" type="password" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="真实姓名" prop="realname">
      <el-input v-model="form.realname" placeholder="请输入真实姓名" />
    </el-form-item>
    <el-button type="primary" class="sign-in-button" @click="signUp">注册</el-button>
  </el-form>
</template>

<script lang="ts">
import { deleteEmpty } from '@/common/utils/object';
import { api_signUp } from '@/sub-admin/api/login';
import { ElMessageBox } from 'element-plus'
import { reactive } from 'vue';
import rules from '../rules'

export default {
  setup() {
    const form = reactive({
      username: '',
      password: '',
      email: '',
      phone: '',
      realname: '',
    })


    /**
     * 注册
     */
    async function signUp() {
      const params = deleteEmpty(form);
      const [err, res] = await api_signUp(params);
      if (err) return;

      ElMessageBox.confirm('注册成功，前往登录页登录', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        //
      }).catch(() => {});
    }

    return {
      form,
      rules,
      signUp,
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-in-button{
  width: 100%;
  background: var(--main-color);
}
</style>