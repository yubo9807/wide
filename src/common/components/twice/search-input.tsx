import { ElInput } from "element-plus";
import { defineComponent, getCurrentInstance, h } from "vue";

export default defineComponent({

  props: {
    modelValue: {
      type: String,
      default: ''
    },
  },

  setup(props) {
    const current = getCurrentInstance();

    return () => h(<ElInput
      placeholder="请输入"
      clearable
      modelValue={props.modelValue}
      onInput={val => current.emit('update:modelValue', val)}
      {...props}
    >{{
      prefix: () => <i>icon</i>,
      ...current.slots
    }}
    </ElInput>)
  },

})
