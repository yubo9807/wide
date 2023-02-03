<template>
  <LayoutContainer class="logs-page clearfix">

    <ul class="list">
      <li
        v-for="(item, index) in fileList"
        :key="index"
        :class="$route.query.log === item.name ? 'active' : ''"
        @click="getFileContent(item.path)"
      >
        <span>{{ item.name }}</span>
      </li>
    </ul>

    <div class="wrap">
      <div class="head">
        <span>{{ calculateByte(fileAttr.size) }}</span>
        <el-link type="primary" :underline="false" @click="newline = !newline">自动换行</el-link>
      </div>
      <div ref="content" class="content">
        <pre :class="[newline ? 'newline' : '']">{{ fileAttr.content }}</pre>
      </div>
    </div>

  </LayoutContainer>
</template>

<script>
import LayoutContainer from '@/common/components/layout-container/index.vue';
import { defineComponent } from 'vue';
import setup from './setup';

export default defineComponent({
  components: {
    LayoutContainer,
  },
  setup
})
</script>

<style lang="scss" scoped>
@import './module.scss';
</style>