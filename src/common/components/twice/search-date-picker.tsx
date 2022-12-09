import { ElDatePicker } from "element-plus";
import { defineComponent, getCurrentInstance, h } from "vue";

const NewElDatePicker: any = ElDatePicker
export default defineComponent({

  props: {
    modelValue: {
      type: [Array, String, Date],
      default: ''
    },
  },

  setup(props) {
    const current = getCurrentInstance();

    return () => h(<NewElDatePicker
      type='datetimerange'
      onUpdate:modelValue={val => current.emit('update:modelValue', val)}
      prefixIcon={<i>icon</i>}
      {...props}
    >{{
      ...current.slots
    }}
    </NewElDatePicker>)
  },

})
