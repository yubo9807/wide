<template>
  <main class="layout-container">
    <slot />
  </main>
</template>

<script lang="ts">
/**
 * 管理端每个页面的容器
 */
export default {}
</script>

<style>
.layout-container{
  margin: 14px;
  margin-top: 0;
  padding: 14px 15px;
  border-radius: 4px;
  background: white;
  min-height: calc(100vh - 160px);
}
</style>

