import { ElDialog } from "element-plus";
import { defineComponent, getCurrentInstance, h } from "vue";
import './dialog.scss';

export default defineComponent({

  props: {},

  setup(props) {
    const current = getCurrentInstance();

    return () => h(<ElDialog modelValue {...props}>{{
      ...current.slots
    }}</ElDialog>)
  },

}) as any