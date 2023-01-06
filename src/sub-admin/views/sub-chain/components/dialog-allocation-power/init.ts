import { getCurrentInstance, nextTick, reactive, ref, watch } from "vue"
import { api_getPublicSubChainList } from '@/sub-admin/api/sub-chain'
import { deleteEmpty } from "@/common/utils/object";
import { AnyObj } from "@/common/utils/type";

export default () => {

  const current = getCurrentInstance();
  const props: AnyObj = current.props;

  const visible = ref(false);

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
    chainId: '',
    tag: '',
    userId: '',
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
  // #endregion



  // #region 表格数据，初始化数据
  const tableData = ref([]);

  async function initData() {
    const params = {
      ...props.need,
      ...deleteEmpty(form),
    };
    const [err, res] = await api_getPublicSubChainList(params);
    if (err) return;

    const allocation = res.data['已分配权限的链'];
    const notAllocation = res.data['未分配权限的链'];
    tableData.value = allocation.concat(notAllocation);

    // 设置选中行
    const tableEl: any = current.refs.table;
    nextTick(() => {
      allocation.forEach(val => tableEl.toggleRowSelection(val));
    })
  }
  // #endregion


  watch(() => visible.value, value => {
    if (value) {
      initData();
    } else {
      tableData.value = [];
    }
  })



  return {
    visible,

    // 表格数据
    ...{ tableData, initData },

    // 分页
    ...{ paging, onSizeChange, onCurrentChange },

    // 搜索
    ...{ form, search, reset },

  }
}