<template>
  <LayoutContainer>
    <LayoutSearch class="reset-search-header-input">
      <template #left>
        <TwiceSearchInput v-model="form.tradeHash" class="input" placeholder="请输入子链名称" @keyup.enter="search" @clear="search" />
      </template>

      <template #right>
        <el-button @click="search">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </template>
    </LayoutSearch>


    <el-table :data="tableData">
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="子链ID" prop="chainId" min-width="220" />
      <el-table-column label="子链名称" prop="name" />
      <el-table-column label="用户名" prop="byUserName" />
      <el-table-column label="区块高度" prop="" />
      <el-table-column label="标签" prop="tag" />
      <el-table-column label="公开状态" prop="status" width="100">
        <template #default="scope">
          <StatusMakePublic :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90" fixed="right">
        <template #default="scope">
          <el-tooltip content="发送交易" placement="top">
            <i class="iconfont table-operation-btn" @click="sendTrading(scope.row)">&#xe002;</i>
          </el-tooltip>
          <el-tooltip content="查询交易" placement="top">
            <i class="iconfont table-operation-btn" @click="queryTrading(scope.row)">&#xe00e;</i>
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

    <DialogSendTrading ref="dialogSendTrading" :need="sendTradingNeed" @success="initData" />
    <DialogQueryTrading ref="dialogQueryTrading" />

  </LayoutContainer>
</template>

<script lang='ts'>
import LayoutContainer from '@/common/components/layout-container/index.vue';
import LayoutSearch from '@/common/components/layout-search-header/index.vue';
import TwiceSearchInput from '@/common/components/twice/search-input';
import TwiceSearchSelect from '@/common/components/twice/search-select';
import TwiceSearchDatePicker from '@/common/components/twice/search-date-picker';
import StatusMakePublic from '@/common/components/status/make-public.vue';
import DialogSendTrading from './components/dialog-send-trading/index.vue';
import DialogQueryTrading from './components/dialog-query-trading/index.vue';

import init from './init';
import operation from './operation';

export default {
  components: {
    LayoutContainer,
    LayoutSearch,
    TwiceSearchInput,
    TwiceSearchSelect,
    TwiceSearchDatePicker,
    StatusMakePublic,
    DialogSendTrading,
    DialogQueryTrading,
  },
  setup() {
    return {
      ...init(),
      ...operation(),
    }
  }
}
</script>
