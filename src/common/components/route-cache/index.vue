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

<script lang="ts">
import { PropType } from 'vue';

/**
 * 页面缓存控制
 * @props include
 */
export default {
  props: {
    /**
     * 最终会传给 keep-alive 的 include
     */
    include: {
      type: Array as PropType<string[]>,
      default: () => [],
    }
  }
}
</script>
