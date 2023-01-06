<template>
  <TwiceDrawer v-model="visible" size="80%">

    <el-radio-group v-model="selectType" class="ml-4">
      <el-radio :label="0">接口</el-radio>
      <el-radio :label="1">元素</el-radio>
    </el-radio-group>

    <InterfaceList ref="interfaceListRef" v-show="selectType === 0" :roleId="roleId" :menuId="menuId" />

    <ElementList ref="elementListRef" v-show="selectType === 1" :roleId="roleId" :menuId="menuId" />

  </TwiceDrawer>
</template>

<script lang="ts">
import TwiceDrawer from '@/common/components/twice/drawer';
import InterfaceList from '../interface-list/index.vue';
import ElementList from '../element-list/index.vue'

import setup from './setup';

export default {
  components: {
    TwiceDrawer,
    InterfaceList,
    ElementList,
  },
  props: {
    roleId: {
      type: [String, Number],
      required: true
    },
    menuId: {
      type: String,
      default: ''
    }
  },
  setup,
}
</script>
