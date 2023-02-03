<template>
  <div class="container">
    <MouseWheelX ref="mouseWheelX" class="tabs">
      <div
        v-for="(item, index) in tabs"
        :key="index"
        :class="['item', nowRouteName === item.name ? 'active' : '']"
        @click.self="jump(item.name)"
        @contextmenu="rightMenu($event, item)"
      >
        {{ item.title }}
        <i v-if="!item.disable" class="iconfont close" @click="close(item.name)">&#xeca0;</i>
      </div>
    </MouseWheelX>

    <div v-show="isMenu" class="mask" @click.self="isMenu = false">
      <ul class="menu" :style="{top: menuPosition.top + 'px', left: menuPosition.left + 'px'}">
        <li @click="closeOwn">关闭</li>
        <li @click="closeAll">关闭全部</li>
        <li @click="closeOther">关闭其他</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import MouseWheelX from '@/common/components/mouse-wheel-x/index.vue'
import setup from './setup';

export default {
  components:{
    MouseWheelX
  },
  setup,
}
</script>

<style lang="scss" scoped>
.tabs{
  font-weight: 700;
  .item{
    display: inline-block;
    height: 20px;
    padding: 14px 36px;
    white-space: nowrap;
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    position: relative;
    $size: 8px;
    &::before, &::after{
      content: '';
      display: none;
      position: absolute;
      bottom: -$size;
      width: $size * 2;
      height: $size * 2;
      background: white;
      -webkit-mask: radial-gradient(circle at $size $size, #0000 $size, red 0);
      -webkit-mask-position: (-$size) (-$size);
    }
    &::before{
      left: -$size;
    }
    &::after{
      right: -$size;
    }
    &:first-child{
      margin-left: 28px;
    }
    &:last-child{
      margin-right: 28px;
    }
    &.active{
      background: white;
      &::before, &::after{
        display: block;
      }
    }
  }
  .close{
    $size: 20px;
    font-size: 10px;
    width: $size;
    height: $size;
    cursor: pointer;
    margin-left: 35px;
    vertical-align: middle;
  }
}

.mask{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
.menu{
  position: fixed;
  padding: 6px 14px;
  background: white;
  box-shadow: 0 5px 5px rgba(0,0,0,.4);
  border-radius: 5px;
  font-size: 14px;
  li{
    line-height: 2.2;
    cursor: pointer;
  }
}
</style>