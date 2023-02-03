<template>
  <LayoutContainer>
    <LayoutSearch class="reset-search-header-input" right-width="430px">
      <template #left>
        <el-select v-model="nowRole.id" :clearable="false">
          <el-option v-for="(item, index) in roleList" :key="index" :label="item.role" :value="item.id" />
        </el-select>
        <el-input v-model="form.title" class="input" placeholder="请输入菜单名称" @keyup.enter="search" @clear="search" />
      </template>

      <template #right>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary">角色管理</el-button>
        <el-button type="primary" @click="showConfig()">公共配置</el-button>
      </template>
    </LayoutSearch>


    <el-table ref="tableEl" :data="tableData" row-key="id" default-expand-all :tree-props="{children: 'children'}" @select="select" @select-all="select">
      <el-table-column type="selection" width="40" label="" />
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column label="菜单名称" prop="title" />
      <el-table-column label="Name" prop="name" />
      <el-table-column label="更新时间">
        <template #default="scope">
          {{ dateFormater((scope.row.updateTime || scope.row.createTime) * 1000) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="140">
        <template #default="scope">
          <el-link @click="showConfig(scope.row)">配置</el-link>
          <el-link @click="modifyMenu(scope.row)">修改</el-link>
          <el-link @click="deleteMenu(scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <TableAddBtn @click="addMenu" />

    <el-pagination
      :default-current-page="paging.pageNumber"
      :default-page-size="paging.pageSize"
      :total="paging.total"
      @current-change="onCurrentChange"
      @size-change="onSizeChange"
    />

    <DrawerConfig ref="drawerConfig" :roleId="nowRole.id" :menuId="selectMenu.id" />
    <DialogMenu ref="dialogMenu" :type="dialogMenuType" :need="dialogMenuNeed" @success="initData" />

  </LayoutContainer>
</template>

<script lang='ts'>
import LayoutContainer from '@/common/components/layout-container/index.vue';
import LayoutSearch from '@/common/components/layout-both-sides/index.vue';
import DrawerConfig from './components/drawer-config/index.vue';
import TableAddBtn from './components/table-add-btn/index.vue';
import DialogMenu from './components/dialog-menu/index.vue';

import { dateFormater } from '@/common/utils/date';
import init from './init';
import operation from './operation';

export default {
  components: {
    LayoutContainer,
    LayoutSearch,
    DrawerConfig,
    TableAddBtn,
    DialogMenu,
  },
  setup() {
    return {
      dateFormater,
      ...init(),
      ...operation(),
    }
  }
}
</script>
