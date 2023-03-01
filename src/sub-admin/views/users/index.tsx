// npm
import { defineComponent, h } from "vue";

// components
import LayoutContainer from '@/common/components/layout-container/index.vue';
import ShrinkInputSearch from "@/common/components/shrink-input-search";
import ShrinkTable from "@/common/components/shrink-table";
import { ElButton, ElInput, ElLink, ElMessageBox } from "element-plus";
import ElPagination from '@/common/components/twice/pagination';


// utils
import { dateFormater } from "@/common/utils/date";

// api
import { api_getUserList } from "@/sub-admin/api/users";
import { InitTable } from "@/common/utils/init-table";



const SHRINKKEY = 'page-users';

const searchForm = {
  name: '',
  role: '',
}

class Init extends InitTable<typeof searchForm> {
  constructor() {
    super(searchForm, api_getUserList);
    this.initData();
  }
}

export default defineComponent(() => {


  const {
    // 分页
    paging, onCurrentChange, onSizeChange, pagingIndex,

    // 表格数据
    tableData, initData,

    // 搜索
    form, search, reset,
  } = new Init();


  function onKeydown(e) {
    e.keyCode === 13 && search();  // 回车搜索
  }

  const JSX_Search = () => <ShrinkInputSearch
    storageKey={SHRINKKEY} 
    inputList={[
      { label: '用户名', slots: <ElInput placeholder='请输入用户名' modelValue={form.name} onInput={value => form.name = value} onKeydown={onKeydown} onClear={search} /> },
      { label: '角色', slots: <ElInput placeholder='请输入角色' modelValue={form.role} onInput={value => form.role = value} onKeydown={onKeydown} onClear={search} /> },
    ]}
    buttonList={[
      <ElButton type='primary' onClick={search}>{{ default: () => '搜索' }}</ElButton>,
      <ElButton onClick={reset}>{{ default: () => '重置' }}</ElButton>,
    ]}
  />


  // #region 表格，访问记录
  function deleteBlacklistIP(row) {
    ElMessageBox.confirm('确认注销当前用户', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      console.log('注销该用户')
    }).catch(() => {})
  }

  const tableColumnProps = [
    { label: '序号', width: 60, slots: (scope) => pagingIndex(paging.pageNumber, paging.pageSize, scope.$index) },
    { prop: 'name', label: '用户名', width: 120 },
    { prop: 'role', label: '角色', width: 120 },
    { prop: 'mail', label: '邮箱', width: 190 },
    { prop: 'create_time', label: '注册时间', width: 160, slots: (scope) => dateFormater(scope.row.accessTime * 1000) },
    { prop: 'remark', label: '备注', minWidth: 140 },
    { label: '操作', fixed: 'right', width: 80, slots: (scope) => <ElLink type="danger" onClick={() => deleteBlacklistIP(scope.row)}>{{ default: () => '注销'}}</ElLink> }
  ]

  const JSX_Table = () => <ShrinkTable storageKey={SHRINKKEY} tableProps={{ data: tableData.value }} tableColumnProps={tableColumnProps} /> 
  // #endregion



  return () => h(<LayoutContainer>{{
    default: () => [
      <JSX_Search />,
      <JSX_Table />,
      <ElPagination
        currentPage={paging.pageNumber}
        pageSize={paging.pageSize}
        total={paging.total}
        onCurrentChange={onCurrentChange}
        onSizeChange={onSizeChange}
      />
    ]}}
  </LayoutContainer>)

})