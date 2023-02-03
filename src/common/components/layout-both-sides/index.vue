<template>
  <div ref="wrap" class="clearfix layout-search">
    <div class="left" :style="{ width: `calc(100% - ${rightWidth})`}">
      <slot name="left" />
    </div>
    <div ref="right" class="right" :style="{ width: rightWidth}">
      <div class="alignment">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
/**
 * 表格页面头部搜索区域两端布局
 * @props rightWidth 右侧宽度
 */
export default {
  props: {
    /**
     * 右边的宽度
     */
    rightWidth: {
      type: String,
      default: '210px'
    }
  }
}
</script>

<style lang='scss'>
.layout-search{
  margin-bottom: 8px;
  .left, .right{
    float: left;
  }
  .right {
    text-align: right;
    .alignment{
      display: inline-block;
      vertical-align: top;
    }
  }
}
</style>
