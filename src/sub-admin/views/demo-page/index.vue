<template>
  <LayoutContainer>
    <LayoutSearch class="reset-search-header-input" rightWidth="400px">
      <template #left>
        <TwiceSearchInput v-model="form.name" class="input" @keyup.enter="search" @clear="search" />
        <TwiceSearchDatePicker v-model="form.time" class="input" @change="search" />
        <TwiceSearchSelect v-model="form.name" class="input" @blur="search">
          <el-option label="haha" value="1"></el-option>
          <el-option label="heihei" value="2"></el-option>
        </TwiceSearchSelect>
      </template>

      <template #right>
        <el-button @click="search">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="createSubChain">新增子链</el-button>
      </template>
    </LayoutSearch>


    <el-table :data="tableData">
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="子链ID" prop="name" />
      <el-table-column label="SERCETID" prop="" />
      <el-table-column label="子链标签" prop="" />
      <el-table-column label="接口地址" prop="" />
      <el-table-column label="哈希值" prop="" />
      <el-table-column label="公开状态" prop="" />
      <el-table-column label="操作" fixed="right" width="140" :showOverflowTooltip="false">
        <template #default="scope">
          <el-link @click="editSubChain(scope.row)">编辑</el-link>
          <el-link>权限控制</el-link>
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

    <DialogSubChain ref="dialogSubChain" @success="initData" />

  </LayoutContainer>
</template>

<script lang='ts'>
import LayoutContainer from '@/common/components/layout-container/index.vue';
import LayoutSearch from '@/common/components/layout-both-sides/index.vue';
import TwiceSearchInput from '@/common/components/twice/search-input';
import TwiceSearchSelect from '@/common/components/twice/search-select';
import TwiceSearchDatePicker from '@/common/components/twice/search-date-picker';
import DialogSubChain from './components/dialog-sub-chain/index.vue';

import init from './init';
import operation from './operation';

export default {
  components: {
    LayoutContainer,
    LayoutSearch,
    TwiceSearchInput,
    TwiceSearchSelect,
    TwiceSearchDatePicker,
    DialogSubChain,
  },
  setup() {
    return {
      ...init(),
      ...operation(),
    }
  }
}
</script>
