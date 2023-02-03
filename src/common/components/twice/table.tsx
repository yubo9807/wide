import { ElTable, ElTableColumn } from "element-plus";
import { defineComponent, h } from "vue";


export default defineComponent({

  props: {
    tableProps: {
      type: Object,
      default: () => ({})
    },
    tableColumnProps: {
      type: Object,
      default: () => ([])
    }
  },

  setup(props) {
    return () => h(<ElTable {...props.tableProps}>{{
      default: () => props.tableColumnProps.map(val => <ElTableColumn showOverflowTooltip {...val}>
        { val.slots ? val.slots : null }
      </ElTableColumn>)
    }}</ElTable>)
  }

})
