<template>
  <TwiceDialog v-model="visible" width="400px">
    <el-form ref="formRef" label-width="100px" :model="form" :rules="rules" label-position="left">
      <el-form-item label="接口名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="方法" prop="method">
        <el-select v-model="form.method">
          <el-option v-for="(item, index) in methodList" :key="index" :label="item.value" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="Url" prop="url">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="父级菜单">
        <el-tree-select v-model="form.menuId" :data="menuList" :props="{ children: 'children', label: 'title', value: 'id' }" :render-after-expand="false" :disabled="type === 0" @node-click="treeNodeClick" />
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