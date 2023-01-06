<template>
  <LayoutContainer>
    <LayoutSearch class="reset-search-header-input">
      <template #left>
        <TwiceSearchInput v-model="form.tradeHash" class="input" placeholder="请输入用户名" @keyup.enter="search" @clear="search" />
      </template>

      <template #right>
        <el-button @click="search">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </template>
    </LayoutSearch>


    <el-table :data="tableData">
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="真实姓名" prop="realname" />
      <el-table-column label="邮箱" prop="email" min-width="140" />
      <el-table-column label="状态" prop="enabled">
        <template #default="scope">
          <span>{{ scope.row.enabled === 1 ? '启用' : '禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="140">
        <template #default="scope">
          <el-link @click="modifyUserEnabled(scope.row)">{{ scope.row.enabled === 1 ? '禁用' : '启用' }}</el-link>
          <el-link type="danger" @click="deleteUser(scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :default-current-page="paging.pageNumber"
      :default-page-size="paging.pageSize"
      :total="paging.total"
      @current-change="onCurrentChange"
      @size-change="onSizeChange"
    />

  </LayoutContainer>
</template>

<script lang='ts'>
import LayoutContainer from '@/common/components/layout-container/index.vue';
import LayoutSearch from '@/common/components/layout-search-header/index.vue';
import TwiceSearchInput from '@/common/components/twice/search-input';
import TwiceSearchSelect from '@/common/components/twice/search-select';
import TwiceSearchDatePicker from '@/common/components/twice/search-date-picker';

import init from './init';
import operation from './operation';

export default {
  components: {
    LayoutContainer,
    LayoutSearch,
    TwiceSearchInput,
    TwiceSearchSelect,
    TwiceSearchDatePicker,
  },
  setup() {
    return {
      ...init(),
      ...operation(),
    }
  }
}
</script>
