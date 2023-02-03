import { ElSelect } from "element-plus";
import { defineComponent, getCurrentInstance, h } from "vue";

/**
 * 搜索区选择框(二次封装)
 */
export default defineComponent({

  props: {
    modelValue: {
      type: String,
      default: ''
    },
  },

  setup(props) {
    const current = getCurrentInstance();

    return () => h(<ElSelect
      placeholder="请选择"
      clearable
      modelValue={props.modelValue}
      onChange={val => current.emit('update:modelValue', val)}
      {...props}
    >{{
      prefix: () => <i>icon</i>,
      ...current.slots
    }}
    </ElSelect>)
  },

})
