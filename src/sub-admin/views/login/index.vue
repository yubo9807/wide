<template>
  <div class="page-login">
    <h1 class="title">跨链服务平台</h1>
    <SignIn v-if="type" />
    <SignUp v-else />
    <!-- <el-link class="btn" type="primary" @click="type = !type">{{ type ? '注册' : '登录' }}</el-link> -->
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import SignIn from './components/sign-in/index.vue'
import SignUp from './components/sign-up/index.vue'
export default {
  components: {
    SignIn,
    SignUp
  },
  setup() {
    const type = ref(true);

    return {
      type,
    }
  }
}
</script>

<style lang="scss" scoped>
.page-login{
  width: 320px;
  margin: 150px auto;
  padding: 20px;
  box-shadow: 0 4px 10px 4px rgba(0,0,0,.1);
  position: relative;
  .title{
    text-align: center;
    margin-bottom: 14px;
    letter-spacing: 6px;
  }

  .btn{
    position: absolute;
    top: 24px;
    right: 20px;
  }
}

</style>