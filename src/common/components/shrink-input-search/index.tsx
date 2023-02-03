import { ElButton } from "element-plus";
import { defineComponent, h, ref } from "vue";
import TwiceDialog from "../twice/dialog";
import LayoutBothSides from '../layout-both-sides/index.vue';
import './index.scss';

export default defineComponent({

  props: {
    storageKey: {
      type: String,
      required: true
    },
    inputList: {
      type: Array,
      default: () => []
    },
    buttonList: {
      type: Array,
      default: () => []
    },
    rightWidth: {
      type: String,
      default: '160px'
    }
  },
  
  setup(props) {

    const PRDFIX = 'searchShrink_'
    const key = PRDFIX + props.storageKey;

    const dialogVisible = ref(false);

    const showInputList = ref([]);
    const hiddenInputList = ref([]);

    const customInputList = ref([]);


    init()
    function init() {
      const data = props.storageKey ? JSON.parse(localStorage.getItem(key)) : null;
      if (data) {

        // #region 数据对比
        const arr = data.showInputList.concat(data.hiddenInputList);
        arr.forEach(val => {
          const index = props.inputList.findIndex((item: any) => item.label === val);

          // 已去除项
          if (index < 0) {
            const i = data.showInputList.findIndex(item => item === val);
            i >= 0 && data.showInputList.splice(i, 1);
            const j = data.hiddenInputList.findIndex(item => item === val);
            j >= 0 && data.hiddenInputList.splice(j, 1);
          } 
        })

        // 新增项
        props.inputList.forEach((val: any) => {
          const index = arr.findIndex(item => val.label === item);
          if (index < 0) data.showInputList.push(val.label);
        })
        // #endregion

        showInputList.value   = data.showInputList;
        hiddenInputList.value = data.hiddenInputList;
      } else {
        reset();
      }
      save();
    }

    /**
     * 保存
     */
    function save() {
      const arr = [];
      showInputList.value.forEach(val => {
        const value = props.inputList.find((item: any) => val === item.label);
        arr.push(value);
      })
      customInputList.value = arr;
      props.storageKey && localStorage.setItem(key, JSON.stringify({
        showInputList:   showInputList.value.filter(val => val),
        hiddenInputList: hiddenInputList.value.filter(val => val),
      }));
      dialogVisible.value = false;
    }

    /**
     * 添加全部
     */
    function addAll() {
      showInputList.value   = showInputList.value.concat(hiddenInputList.value); 
      hiddenInputList.value = [];
    }

    /**
     * 重置
     */
    function reset() {
      showInputList.value   = props.inputList.map((val: any) => val.label);
      hiddenInputList.value = [];
    }

    /**
     * 添加显示列
     */
    function addShowColumn(row) {
      const index = hiddenInputList.value.findIndex(val => val === row);
      if (index < 0) return;
      hiddenInputList.value.splice(index, 1);
      showInputList.value.push(row);
    }

    /**
     * 删除显示列
     */
    function delShowColumn(row) {    
      const index = showInputList.value.findIndex(val => val === row);
      if (index < 0) return;
      showInputList.value.splice(index, 1);
      hiddenInputList.value.push(row);
    }


    return () => h(<div class='input-search-shrink'>

      <div class='custom-column'>
        <span onClick={() => dialogVisible.value = true }>⚙︎</span>
      </div>


      <LayoutBothSides rightWidth={props.rightWidth} style="margin-right: 20px">{{
        left: () => <div>{props.inputList.map((val: any) =>{
          const index = customInputList.value.findIndex(item => val.label === item.label);
          return index >= 0 ? <div class="input-item">{val.slots}</div> : null;
        })}</div>,

        right: () => <div class='clearfix'>{props.buttonList.map(val =>
          <div class="button-item">{val}</div>
        )}</div>
      }}</LayoutBothSides>


      <TwiceDialog title='显示搜索框' modelValue={dialogVisible.value} onClose={() => dialogVisible.value = false}>{{

        default: () => <div class="table-shrink-wrap">
          <div class='yet-add'>
            {showInputList.value.map((val, index) => <span key={index} class='item' onClick={()=>{delShowColumn(val)}}>{val}
              <span class='icon-del'>-</span>
            </span>)}
          </div>

          <div class='line'></div>

          <div class='no-add'>
            {hiddenInputList.value.map(val => <span class='item' onClick={()=>{addShowColumn(val)}}>{val}
              <span class='icon-add'>+</span>
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
            <ElButton size="small" type="primary" onClick={() => save()}>{{ default: () => '保存' }}</ElButton>
          </div>
        </span>

      }}</TwiceDialog>
    </div>)
  }
})