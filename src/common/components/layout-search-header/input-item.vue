<template>
  <div class="layout-search-input-item" :style="{ width }">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    width: {
      type: String,
      default: '294px'
    }
  }
}
</script>

<style lang="scss">
.layout-search-input-item{
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>