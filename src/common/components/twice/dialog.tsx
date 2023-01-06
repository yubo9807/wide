import { ElDialog } from "element-plus";
import { defineComponent, getCurrentInstance, h } from "vue";
import './dialog.scss';

/**
 * 弹窗二次封装
 * @note 对 header 做了修改
 */
export default defineComponent({

  props: {
    class: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    }
  },

  setup(props) {
    const current = getCurrentInstance();

    return () => h(<ElDialog {...props} class={'twice-dialog ' + props.class}>{{
      header: () => <div>
        <span class='point'></span>
        <span class='title-text'>{props.title}</span>
      </div>,
      ...current.slots
    }}</ElDialog>)
  }

})