import { getCurrentInstance, nextTick, provide, reactive, ref, watch } from "vue"
import { deleteEmpty } from "@/common/utils/object";
import { api_getRoleList, api_getMenuList } from '@/sub-permissions/api/permissions';
import { InitTable } from "@/common/utils/init-table";


const searchForm = {
  name: '',
  title: '',
}

export default class extends InitTable<typeof searchForm> {

  #current = null;

  nowRole = reactive({ role: '', id: '' });
  roleList = ref([]);

  constructor() {
    super(searchForm, api_getMenuList);
    this.#current = getCurrentInstance();

    const self = this;
    (async function() {
      const [err, res] = await api_getRoleList();
      if (err) return;

      const list = res.data;
      self.roleList.value = list;
      self.nowRole.role = list[0].role;
      self.nowRole.id = list[0].id;
    }())

    watch(() => this.nowRole.id, value => {
      this.initData();
    })

    provide('getRoleList', () => this.roleList.value);
    provide('getMenuList', () => this.tableData.value);
  }


  flatData = ref([]);  // 原始数据
  initData = async () => {
    const params = deleteEmpty({
      roleId: this.nowRole.id,
      ...this.form,
    })
    const [err, res] = await api_getMenuList(params);
    if (err) return;

    const list: any[] = disposeData(res.data);
    this.flatData.value = res.data;
    this.tableData.value = list;

    nextTick(() => {
      const tableEl: any = this.#current.refs.tableEl;
      recursionSelected(this.tableData.value, tableEl);
    })
  };

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

/**
 * 递归选择
 * @param list 
 * @param tableEl 
 */
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
