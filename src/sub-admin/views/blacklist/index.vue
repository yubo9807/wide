<template>
  <LayoutContainer class="blacklist">
    <el-table :data="tableData">
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="IP" prop="ip" />
      <el-table-column label="访问时间" prop="create_time" />
      <el-table-column label="请求次数" prop="request_number" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-link type="danger" @click="deleteBlacklistIP(scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
  </LayoutContainer>
</template>

<script>
import LayoutContainer from '@/common/components/layout-container/index.vue';
import setup from './setup';
export default {
  components: {
    LayoutContainer,
  },
  setup
}
</script>

<style>

</style>