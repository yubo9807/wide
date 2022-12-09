<template>
  <LayoutContainer>
    <LayoutSearch rightWidth="400px">
      <template #left>
        <LayoutSearchInputItem>
          <TwiceSearchInput v-model="form.name" @keyup.enter="search" @clear="search" />
        </LayoutSearchInputItem>
        <LayoutSearchInputItem>
          <TwiceSearchDatePicker v-model="form.time" @change="search" />
        </LayoutSearchInputItem>
        <LayoutSearchInputItem>
          <TwiceSearchSelect v-model="form.name" @blur="search">
            <el-option label="haha" value="1"></el-option>
            <el-option label="heihei" value="2"></el-option>
          </TwiceSearchSelect>
        </LayoutSearchInputItem>
      </template>

      <template #right>
        <LayoutSearchButtonItem>
          <el-button type="info" @click="search">查询</el-button>
        </LayoutSearchButtonItem>
        <LayoutSearchButtonItem>
          <el-button type="primary" @click="reset">重置</el-button>
        </LayoutSearchButtonItem>
        <LayoutSearchButtonItem>
          <el-button type="primary" @click="createSubChain">新增子链</el-button>
        </LayoutSearchButtonItem>
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
          <TwiceTableLink @click="editSubChain(scope.row)">编辑</TwiceTableLink>
          <TwiceTableLink>权限控制</TwiceTableLink>
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
import LayoutSearch from '@/common/components/layout-search-header/index.vue';
import LayoutSearchInputItem from '@/common/components/layout-search-header/input-item.vue';
import LayoutSearchButtonItem from '@/common/components/layout-search-header/button-item.vue';
import TwiceSearchInput from '@/common/components/twice/search-input';
import TwiceSearchSelect from '@/common/components/twice/search-select';
import TwiceSearchDatePicker from '@/common/components/twice/search-date-picker';
import TwiceTableLink from '@/common/components/twice/table-link';
import TwiceDialog from '@/common/components/twice/dialog';
import DialogSubChain from './components/dialog-sub-chain/index.vue';

import init from './init';
import operation from './operation';

export default {
  components: {
    LayoutContainer,
    LayoutSearch,
    LayoutSearchInputItem,
    LayoutSearchButtonItem,
    TwiceSearchInput,
    TwiceSearchSelect,
    TwiceSearchDatePicker,
    TwiceTableLink,
    TwiceDialog,
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
