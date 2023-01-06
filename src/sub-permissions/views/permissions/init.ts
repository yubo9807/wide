import { getCurrentInstance, nextTick, provide, reactive, ref, watch, watchEffect } from "vue"
import { deleteEmpty } from "@/common/utils/object";
import {
  api_getRoleList,
  api_getMenuList,
} from '@/sub-permissions/api/permissions'

export default () => {

  const current = getCurrentInstance();


  const roleList = ref([]);
  const nowRole = reactive({ role: '', id: '' });
  
  getRoleList();
  async function getRoleList() {
    const [err, res] = await api_getRoleList();
    if (err) return;

    const list = res.data;
    roleList.value = list;
    nowRole.role = list[0].role;
    nowRole.id = list[0].id;
  }



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
    name: '',
    title: '',
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
  const flatData = ref([]);  // 原始数据
  
  watch(() => nowRole.id, value => {
    initData();
  })

  /**
   * 初始化数据
   */
  async function initData() {
    const params = {
      roleId: nowRole.id,
      ...deleteEmpty(form),
    }
    const [err, res] = await api_getMenuList(params);
    if (err) return;

    const list: any[] = disposeData(res.data);
    flatData.value = res.data;
    tableData.value = list;

    nextTick(() => {
      const tableEl: any = current.refs.tableEl;
      recursionSelected(tableData.value, tableEl);
    })
  }

  /**
   * 树形数据处理
   * @param list 数据
   * @param parent 不需要传递
   * @returns 
   */
  function disposeData(list: any[], parent = null) {
    const newList = [], childrenList = [];
    list.forEach(val => {
      val.parent === parent ? newList.push(val) : childrenList.push(val);
    })
    list.forEach(val => {
      if (val.parent === parent) {
        val.children = disposeData(childrenList, val.id);
      };
    });
    return newList;
  }

  function recursionSelected(list: any[], tableEl) {
    list.forEach(val => {
      tableEl.toggleRowSelection(val, val.selected);
      if (val.children && val.children.length > 0) {
        val.children.map(item => {
          recursionSelected(val.children, tableEl)
        })
      }
    });
  }
  // #endregion


  provide('getRoleList', () => roleList.value);
  provide('getMenuList', () => tableData.value);


  return {
    // 角色
    ...{ roleList, nowRole },

    // 表格数据
    ...{ tableData, flatData, initData },

    // 分页
    ...{ paging, onSizeChange, onCurrentChange },

    // 搜索
    ...{ form, search, reset },
  }
}