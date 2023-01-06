<template>
  <main class="layout-container">
    <slot />
  </main>
</template>

<script lang="ts">
export default {}
</script>

<style>
.layout-container{
  margin: 14px;
  margin-top: 0;
  padding: 14px 15px;
  border-radius: 4px;
  background: white;
  min-height: calc(100vh - 150px);
}
</style>

