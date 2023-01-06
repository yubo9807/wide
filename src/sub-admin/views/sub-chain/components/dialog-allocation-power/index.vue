<template>
  <TwiceDialog v-model="visible" title="权限控制">
    <el-table ref="table" :data="tableData" row-key="id" @selection-change="tableSelectionChange" >
      <el-table-column type="selection" width="60" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="子链ID" prop="chainId" />
      <el-table-column label="SERCETID" prop="secretId" />
      <el-table-column label="子链标签" prop="tag" />
      <el-table-column label="接口地址" prop="address" />
      <!-- <el-table-column label="公开状态" prop="status">
        <template #default="scope">
          <StatusMakePublic :value="scope.row.status" />
        </template>
      </el-table-column> -->
    </el-table>
    <div style="text-align: center; margin-top: 20px;">
      <el-button type="primary" @click="confirm">确认</el-button>
    </div>
  </TwiceDialog>
</template>

<script lang="ts">
import TwiceDialog from '@/common/components/twice/dialog';
import StatusMakePublic from '@/common/components/status/make-public.vue'
import init from './init'
import operation from './operation';

export default {
  components: {
    TwiceDialog,
    StatusMakePublic,
  },
  props: {
    need: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    return {
      ...init(),
      ...operation(),
    }
  }
}
</script>

<style lang="scss" scoped>
</style>