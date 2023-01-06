import { ElDrawer } from "element-plus";
import { defineComponent, getCurrentInstance, h } from "vue";
import './dialog.scss';

/**
 * 弹窗二次封装
 */
export default defineComponent({

  setup(props) {
    const current = getCurrentInstance();

    return () => h(<ElDrawer {...props}>{{
      ...current.slots
    }}</ElDrawer>)
  }

})