import { deleteEmpty } from "@/common/utils/object";
import { AnyObj } from "@/common/utils/type";
import { api_getInterfaceList } from "@/sub-permissions/api/permissions";
import { getCurrentInstance, nextTick, reactive, ref, watch } from "vue";


export default () => {

  const current = getCurrentInstance();
  const props: AnyObj = current.props;

  // #region 分页
  const paging = reactive({
    pageNumber: 1,
    pageSize: 10,
    total: 0
  })

  function onCurrentChange(val: number) {
    paging.pageNumber = val;
    initData();
  }
  function onSizeChange(val: number) {
    paging.pageSize = val;
    initData();
  }
  // #endregion



  // #region 搜索
  const initialForm = {
    url: '',
  }
  const form = reactive(Object.assign({}, initialForm));

  function search() {
    paging.pageNumber = 1;
    // 等待数据变更后再进行请求
    // 比如：el-input 在清空的时候会同时改变数据和触发请求函数
    Promise.resolve().then(initData);
  }

  function reset() {
    for (const key in initialForm) {
      form[key] = initialForm[key];
    }
    search();
  }
  // #endregion


  // #region 初始化数据
  const tableData = ref([]);

  async function initData() {
    const params = deleteEmpty({
      roleId: props.roleId,
      menuId: props.menuId,
      ...form,
    })
    const [err, res] = await api_getInterfaceList(params);
    if (err) return;
    tableData.value = res.data;

    const tableEl: any = current.refs.tableEl;
    const selectList = res.data.filter(val => val.selected);
    nextTick(() => {
      selectList.forEach(val => tableEl.toggleRowSelection(val));
    })
  }

  // watch(() => props.role, value => {
  //   initData();
  // }, { immediate: true })
  // watch(() => props.menuId, value => {
  //   initData();
  // })
  // #endregion

  return {
    // 表格数据
    ...{ tableData, initData },

    // 分页
    ...{ paging, onSizeChange, onCurrentChange },

    // 搜索
    ...{ form, search, reset },

  }
}