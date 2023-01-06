<template>
  <span v-if="MAKE_PUBLIC[value]" :style="{ color: MAKE_PUBLIC[value].color }">
    {{ MAKE_PUBLIC[value].label }}
    <i class="iconfont icon" @click="$emit('icon-click', value, MAKE_PUBLIC)">&#xe01a;</i>
  </span>
  <span v-else>未知状态</span>
</template>

<script lang="ts">
export default {
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
  },
  setup() {
    return {
      MAKE_PUBLIC: {
        '已公开': { label: '已公开', color: '#131926' },
        '未公开': { label: '未公开', color: '#B72121' },
      }
    }
  }
}
</script>

<style scoped>
.icon{
  cursor: pointer;
}
</style>