import { ElPagination } from "element-plus"
import { Component, defineComponent, h } from "vue"

/**
 * JSX 中有类型报错
 */
export default defineComponent({
  setup(props) {
    return () => h(<ElPagination {...props} />)
  }
}) as any
