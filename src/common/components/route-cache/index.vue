/**
 * vue3 KeepAlive 使用方式有变动
 * https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 */
<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="include">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>

<script>
export default {
  props: {
    include: {
      type: Array,
      default: () => [],
    }
  },
}
</script>
