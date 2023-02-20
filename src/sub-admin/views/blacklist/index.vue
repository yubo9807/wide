<template>
  <LayoutContainer class="blacklist">
    <el-table :data="tableData">
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="IP" prop="ip" />
      <el-table-column label="访问时间" prop="create_time">
        <template #default="scope">{{ dateFormater(scope.row.create_time * 1000) }}</template>
      </el-table-column>
      <el-table-column label="请求次数" prop="request_number" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-link type="danger" @click="deleteBlacklistIP(scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
  </LayoutContainer>
</template>

<script lang="ts">
import LayoutContainer from '@/common/components/layout-container/index.vue';
import Init from './init';
import operation from './operation';
import { dateFormater } from '@/common/utils/date';

export default {
  components: {
    LayoutContainer,
  },
  setup() {
    return {
      dateFormater,
      ...new Init(),
      ...operation(),
    }
  }
}
</script>

<style>

</style>