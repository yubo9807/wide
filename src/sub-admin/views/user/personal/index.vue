<template>
  <LayoutContaine>
    <el-form ref="formRef" :model="form" :rules="rules" class="user-info" label-width="80px" label-position="left">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm">修改密码</el-button>
      </el-form-item>
    </el-form>
  </LayoutContaine>
</template>

<script lang="ts">
import LayoutContaine from '@/common/components/layout-container/index.vue'
import setup from './setup';
import rules from '../rules';
export default {
  components: {
    LayoutContaine,
  },
  setup() {
    return {
      rules,
      ...setup(),
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info{
  width: 400px;
  margin: 80px auto;
}
</style>