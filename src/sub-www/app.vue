
<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default {
  setup() {
    return {
      zhCn
    }
  }
}

</script>

<style lang='scss' scoped>
</style>
