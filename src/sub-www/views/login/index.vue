<template>
  <div class="page-login">
    <h1 class="title">跨链服务平台</h1>
    <el-form>
      <el-form-item>
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" @keyup.enter="signIn" />
      </el-form-item>
      <el-button type="primary" class="sign-in-button" @click="signIn">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import setup from './setup';
export default {
  setup,
}
</script>

<style lang="scss" scoped>
.page-login{
  width: 300px;
  margin: 200px auto;
  padding: 20px;
  box-shadow: 0 4px 10px 4px rgba(0,0,0,.1);
  .title{
    text-align: center;
    margin-bottom: 14px;
    letter-spacing: 6px;
  }
  .sign-in-button{
    width: 100%;
    background: var(--main-color);
  }
}

</style>