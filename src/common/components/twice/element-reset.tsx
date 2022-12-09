/**
 * 重置组件 props 属性
 */
import { ElTableColumn, ElPagination, ElDatePicker, ElInput, ElSelect } from 'element-plus'

Object.defineProperties(ElTableColumn.props, {
  showOverflowTooltip: {
    value: { default: true }
  },
})

Object.defineProperties(ElPagination.props, {
  background: {
    value: { default: true }
  },
  pageSizes: {
    value: { default: [10, 30, 50, 100] }
  },
  layout: {
    value: { default: 'sizes, prev, pager, next, jumper, total' }
  },
})

Object.defineProperties(ElInput.props, {
  placeholder: {
    value: { default: '请输入' }
  },
  clearable: {
    value: { default: true }
  },
})

Object.defineProperties(ElSelect.props, {
  placeholder: {
    value: { default: '请选择' }
  },
})

Object.defineProperties(ElDatePicker.props, {
  placeholder: {
    value: { default: '请选择时间' }
  },
  startPlaceholder: {
    value: { default: '开始时间' }
  },
  endPlaceholder: {
    value: { default: '结束时间' }
  },
  rangeSeparator: {
    value: { default: '-' }
  },
})
