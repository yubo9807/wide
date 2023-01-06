<template>
  <LayoutContainer>

    <Statistical />

    <LayoutSearch class="reset-search-header-input" rightWidth="320px">
      <template #left>
        <TwiceSearchInput v-model="form.chainId" class="input" placeholder="请输入子链ID" @keyup.enter="search" @clear="search" />
        <TwiceSearchInput v-model="form.tag" class="input" placeholder="请输入子链标签" @keyup.enter="search" @clear="search" />
        <!-- <TwiceSearchInput v-model="form.userId" class="input" placeholder="请输入用户ID" @keyup.enter="search" @clear="search" /> -->
      </template>

      <template #right>
        <el-button @click="search">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="createSubChain">新增子链</el-button>
      </template>
    </LayoutSearch>


    <el-table :data="tableData">
      <el-table-column label="序号" type="index" fixed="left" width="60" />
      <el-table-column label="子链名称" prop="name" />
      <el-table-column label="子链ID" prop="chainId" min-width="280" />
      <el-table-column label="SERCETID" prop="secretId" min-width="280" />
      <el-table-column label="子链标签" prop="tag" />
      <el-table-column label="接口地址" prop="address" min-width="100" />
      <el-table-column label="公开状态" prop="status" width="100">
        <template #default="scope">
          <StatusMakePublic :value="scope.row.status" @icon-click="changeStatus(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="90" :showOverflowTooltip="false">
        <template #default="scope">
          <el-tooltip content="编辑" placement="top">
            <i class="iconfont table-operation-btn" @click="editSubChain(scope.row)">&#xe001;</i>
          </el-tooltip>
          <el-tooltip content="权限控制" placement="top">
            <i class="iconfont table-operation-btn" @click="allocationPower(scope.row)">&#xe006;</i>
          </el-tooltip>
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

    <DialogSubChain ref="dialogSubChain" :type="dialogSubChainType" :need="dialogSubChainNeed" @success="initData" />
    <DialogAllocationPower ref="dialogAllocationPower" :need="dialogAllocationPowerNeed" @success="initData" />

  </LayoutContainer>
</template>

<script lang='ts'>
import LayoutContainer from '@/common/components/layout-container/index.vue';
import LayoutSearch from '@/common/components/layout-search-header/index.vue';
import TwiceSearchInput from '@/common/components/twice/search-input';
import TwiceSearchSelect from '@/common/components/twice/search-select';
import TwiceSearchDatePicker from '@/common/components/twice/search-date-picker';
import StatusMakePublic from '@/common/components/status/make-public.vue';
import Statistical from './components/statistical/index.vue'
import DialogSubChain from './components/dialog-sub-chain/index.vue';
import DialogAllocationPower from './components/dialog-allocation-power/index.vue'

import init from './init';
import chain from './chain';
import power from './power';

export default {
  components: {
    LayoutContainer,
    LayoutSearch,
    TwiceSearchInput,
    TwiceSearchSelect,
    TwiceSearchDatePicker,
    StatusMakePublic,
    Statistical,
    DialogSubChain,
    DialogAllocationPower,
  },
  setup() {
    return {
      ...init(),
      ...chain(),
      ...power(),
    }
  }
}
</script>
