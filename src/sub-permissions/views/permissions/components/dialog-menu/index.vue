<template>
  <TwiceDialog v-model="visible" width="400px">
    <el-form ref="formRef" label-width="100px" :model="form" :rules="rules" label-position="left">
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name" placeholder="保证唯一，对应前端路由设置 name" />
      </el-form-item>
      <el-form-item label="父级菜单">
        <el-tree-select v-model="form.parent" :data="menuList" :props="{ children: 'children', label: 'title', value: 'id' }" :render-after-expand="false" @node-click="treeNodeClick" />
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