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
export default {
  props: {
    rightWidth: {
      type: String,
      default: '250px'
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

  .el-input__wrapper{
    border-radius: 0;
    height: 40px;
    background: var(--main-color-bg-gray);
    box-shadow: none;
    &.is-focus, &:hover{
      box-shadow: none;
    }
  }

  .el-select, .el-date-editor.el-input, .el-date-editor.el-input__wrapper{
    width: 100%;
    height: 42px;
    box-sizing: border-box;
  }

  .el-button{
    border-radius: 0;
    height: 42px;
    width: 100px;
  }
}
</style>