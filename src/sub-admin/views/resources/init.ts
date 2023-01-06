import { reactive, ref } from "vue"
import { api_getTradingList } from '@/sub-admin/api/resources';
import { deleteEmpty } from "@/common/utils/object";
export default () => {



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
    tradeHash: '',
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

  initData();
  async function initData() {
    const params = deleteEmpty(form);
    const [err, res] = await api_getTradingList(params);
    if (err) return;

    tableData.value = res.data;
  }
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