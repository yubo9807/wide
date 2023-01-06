<template>
  <LayoutContaine>
    <el-form ref="formRef" :model="form" :rules="rules" class="sign-up" label-width="80px" label-position="left">
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
  </LayoutContaine>
</template>

<script lang="ts">
import LayoutContaine from '@/common/components/layout-container/index.vue'
import { deleteEmpty } from '@/common/utils/object';
import { api_signUp } from '@/sub-admin/api/login';
import { ElMessage, FormInstance } from 'element-plus'
import { reactive, ref, Ref } from 'vue';
import rules from '../rules'

export default {
  components: {
    LayoutContaine,
  },
  setup() {
    const form = reactive({
      username: '',
      password: '',
      email: '',
      phone: '',
      realname: '',
    })

    const formRef: Ref<FormInstance> = ref();

    /**
     * 注册
     */
    function signUp() {
      formRef.value.validate(async valid => {
        if (!valid) return;

        const params = deleteEmpty(form);
        const [err, res] = await api_signUp(params);
        if (err) return;
  
        ElMessage.success('注册成功');
      })
    }

    return {
      form,
      rules,
      formRef,
      signUp,
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-up{
  width: 400px;
  margin: 80px auto;
}
.sign-in-button{
  width: 100%;
  background: var(--main-color);
}
</style>