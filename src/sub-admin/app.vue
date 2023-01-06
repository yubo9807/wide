
<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default {
  setup() {
    document.title = '跨链服务平台'
    return {
      zhCn
    }
  }
}

</script>

<style lang='scss' scoped>
</style>
