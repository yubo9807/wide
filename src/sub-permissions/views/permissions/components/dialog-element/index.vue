<template>
  <TwiceDialog v-model="visible" width="400px">
    <el-form ref="formRef" label-width="100px" :model="form" :rules="rules" label-position="left">
      <el-form-item label="元素名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Key" prop="key">
        <el-input v-model="form.key" />
      </el-form-item>
      <el-form-item label="父级菜单">
        <el-tree-select v-model="form.menuId" :data="menuList" clearable :props="{ children: 'children', label: 'title', value: 'id' }" :render-after-expand="false" :disabled="type === 0" @node-click="treeNodeClick" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确认</el-button>
      </el-form-item>
    </el-form>
  </TwiceDialog>
</template>

<script lang="ts">
import TwiceDialog from '@/common/components/twice/dialog';

import setup from './setup';

export default {
  components: {
    TwiceDialog,
  },
  props: {
    type: {
      type: Number,
      default: 0,  // 0: 添加， 1: 修改
    },
    need: {
      type: Object,
      default: () => ({}),
    }
  },
  setup
}
</script>