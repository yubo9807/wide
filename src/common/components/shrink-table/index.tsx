import { ElButton } from 'element-plus';
import { defineComponent, h, ref } from 'vue';
import TwiceDialog from '../twice/dialog';
import TwiceTable from '../twice/table';
import './index.scss';

export default defineComponent({

  props: {
    storageKey: {
      type: String,
      required: true
    },
    tableColumnProps: {
      type: Array,
      default: () => []
    },
    tableProps: {
      type: Object,
      default: () => ({})
    }
  },

  setup(props) {
    const PRDFIX = 'tableShrink_';
    const key = PRDFIX + props.storageKey;

    const dialogVisible = ref(false);
  
    const showColumnList   = ref([]);
    const hiddenColumnList = ref([]);
    const customColumn     = ref([]);
  
    init();
    function init() {
      const data = props.storageKey ? JSON.parse(localStorage.getItem(key)) : null;
      const defaultShowColumnList = props.tableColumnProps
        .filter((val: any) => val.prop && val.label)
        .map((val: any) => ({ prop: val.prop, label: val.label }));

      if (data) {

        // #region 数据对比
        const arr = data.showColumnList.concat(data.hiddenColumnList);
        arr.forEach(val => {
          const index = defaultShowColumnList.findIndex((item: any) => item.label === val.label && item.prop === val.label);

          // 已去除项
          if (index < 0) {
            const i = data.showColumnList.findIndex(item => item.label === val.label && item.prop === val.label);
            i >= 0 && data.showColumnList.splice(i, 1);
            const j = data.hiddenColumnList.findIndex(item => item.label === val.label && item.prop === val.label);
            j >= 0 && data.hiddenColumnList.splice(j, 1);
          } 
        })

        // 新增项
        defaultShowColumnList.forEach((val: any) => {
          const index = arr.findIndex(item => item.label === val.label && item.prop === val.prop);
          if (index < 0) data.showColumnList.push(val);
        })
        // #endregion

        showColumnList.value   = data.showColumnList;
        hiddenColumnList.value = data.hiddenColumnList;
      } else {
        reset();
      }
      save();
    }

    /**
     * 重置
     */
    function reset() {
      showColumnList.value = props.tableColumnProps
        .filter((val: any) => val.prop && val.label)
        .map((val: any) => ({ prop: val.prop, label: val.label }));
      hiddenColumnList.value = [];
    }
  
    /**
     * 添加全部
     */
    function addAll() {
      showColumnList.value = showColumnList.value.concat(hiddenColumnList.value);
      hiddenColumnList.value = [];
    }
  
    /**
     * 添加显示列
     */
    function addShowColumn(row) {
      const index = hiddenColumnList.value
        .findIndex(val => val.prop === row.prop && val.label === row.label);
      hiddenColumnList.value.splice(index, 1);
      showColumnList.value.push(row);
    }
  
    /**
     * 删除显示列
     */
    function delShowColumn(row) {
      const index = showColumnList.value
        .findIndex(val => val.prop === row.prop && val.label === row.label);
      showColumnList.value.splice(index, 1);
      hiddenColumnList.value.push(row);
    }
  
    save();
    /**
     * 保存
     */
    function save() {
      const arr = [];
  
      props.tableColumnProps.forEach((val: any) => {
        if (!val.prop || !val.label) arr.push(val);
      });
  
      showColumnList.value.forEach((val) => {
        const value = props.tableColumnProps.find(
          (item: any) => val.prop === item.prop && val.label === item.label
        );
        !!value && arr.push(value);
      });
  
      customColumn.value = arr;
      props.storageKey && localStorage.setItem(key, JSON.stringify({
        showColumnList: showColumnList.value,
        hiddenColumnList: hiddenColumnList.value
      }))
      dialogVisible.value = false;
    }



    return () => h(<div class='table-shrink'>
      <div class='custom-column'>
        <span onClick={() => dialogVisible.value = true }>⚙︎</span>
      </div>

      <TwiceTable tableProps={props.tableProps} tableColumnProps={customColumn.value} />
  
      <TwiceDialog title='表头显示' modelValue={dialogVisible.value} onClose={() => dialogVisible.value = false}>{{
        default: () => <div class="table-shrink-wrap">
          <div class="yet-add">
            {showColumnList.value.map((item, index) => <span key={index} class="item">{item.label}
              <span class="icon-del" onClick={() => delShowColumn(item)}>-</span>
            </span>)}
          </div>
  
          <div class="line" />
  
          <div class="no-add">
            {hiddenColumnList.value.map((item, index) => <span key={index} class="item">{item.label}
              <span class="icon-add" onClick={() => addShowColumn(item)}>+</span>
            </span>)}
          </div>
  
        </div>,
  
        footer: () => <span class="dialog-footer btn">
          <div class="btn-left">
            <div class="add-all" onClick={addAll}>添加全部</div>
            <div class="reset" onClick={reset}>重置</div>
          </div>
          <div>
            <ElButton size="small" onClick={() => dialogVisible.value = false}>{{ default: () => '取消' }}</ElButton>
            <ElButton size="small" type="primary" onClick={save}>{{ default: () => '保存' }}</ElButton>
          </div>
        </span>
  
      }}</TwiceDialog>
    </div>)
  }
})
