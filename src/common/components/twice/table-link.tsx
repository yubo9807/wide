import { ElLink } from "element-plus";
import { defineComponent, getCurrentInstance, h } from "vue";
import './table-link.scss';

/**
 * 表格中统一用的按钮
 */
export default defineComponent({

  setup(props) {
    const current = getCurrentInstance();

    return () => h(<span class='table-link'>
      <ElLink underline={false} {...props}>{{ ...current.slots }}</ElLink>
    </span>)
  },

})
