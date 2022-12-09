/**
 * vue3 KeepAlive 使用方式有变动
 * https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 */
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>

<script lang='ts'>
export default {}
</script>
