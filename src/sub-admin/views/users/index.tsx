// npm
import { defineComponent, h, reactive, ref } from "vue";

// components
import LayoutContainer from '@/common/components/layout-container/index.vue';
import ShrinkInputSearch from "@/common/components/shrink-input-search";
import ShrinkTable from "@/common/components/shrink-table";
import { ElButton, ElInput, ElLink, ElMessageBox, ElPagination } from "element-plus";

// utils
import { dateFormater } from "@/common/utils/date";
import { deleteEmpty } from "@/common/utils/object";
import { pagingIndex } from "@/common/utils/number";

// api
import { api_getUserList } from "@/sub-admin/api/users";


export default defineComponent(() => {


  // #region 分页
  const paging = reactive({
    pageNumber: 1,
    pageSize:   10,
    total:      0,
  })

  function onSizeChange(val: number) {
    paging.pageSize = val;
    initData();
  }
  function onCurrentChange(val: number) {
    paging.pageNumber = val;
    initData();
  }

  const JSX_Pagination = () => <ElPagination
    defaultCurrentPage={paging.pageNumber}
    defaultPageSize={paging.pageSize}
    total={paging.total}
    onCurrentChange={onCurrentChange}
    onSizeChange={onSizeChange}
  />
  // #endregion



  // #region 搜索
  const initialForm = {
    name: '',
    role: '',
  }
  const form = reactive(Object.assign({}, initialForm));

  function search() {
    paging.pageNumber = 1;
    Promise.resolve().then(initData);
  }

  function reset() {
    for (const key in initialForm) {
      form[key] = initialForm[key];
    }
    search();
  }

  function onKeydown(e) {
    e.keyCode === 13 && search();  // 回车搜索
  }

  const JSX_Search = () => <ShrinkInputSearch
    storageKey="222" 
    inputList={[
      { label: '用户名', slots: <ElInput placeholder='请输入用户名' modelValue={form.name} onInput={value => form.name = value} onKeydown={onKeydown} onClear={search} /> },
      { label: '角色', slots: <ElInput placeholder='请输入角色' modelValue={form.role} onInput={value => form.role = value} onKeydown={onKeydown} onClear={search} /> },
    ]}
    buttonList={[
      <ElButton type='primary' onClick={search}>{{ default: () => '搜索' }}</ElButton>,
      <ElButton onClick={reset}>{{ default: () => '重置' }}</ElButton>,
    ]}
  />
  // #endregion



  // #region 表格，访问记录
  const tableData = ref([]);  // 访问数据

  initData();
  /**
   * 获取当天访问数据
   */
  async function initData() {
    const searchForm = deleteEmpty(form);
    const params     = {
      pageNumber: paging.pageNumber,
      pageSize:   paging.pageSize,
      ...searchForm,
    }
    const [err, res] = await api_getUserList(params);
    if (err) return;
    const { list, total } = res.data;
    tableData.value = list;
    paging.total = total;
  }

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

  const JSX_Table = () => <ShrinkTable storageKey="222" tableProps={{ data: tableData.value }} tableColumnProps={tableColumnProps} /> 
  // #endregion



  return () => h(<LayoutContainer>{{
    default: () => [
      <JSX_Search />,
      <JSX_Table />,
      <JSX_Pagination />,
    ]}}
  </LayoutContainer>)

})