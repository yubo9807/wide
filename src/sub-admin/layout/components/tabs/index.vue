<template>
  <div class="container">
    <ul class="tabs clearfix" :style="{ width: wrapWidth + 'px' }">
      <li ref="item" v-for="(item, index) in tabs" :key="index" :class="[nowRouteName === item.name ? 'active' : '']">
        <router-link :to="{ name: item.name }">{{ item.title }}</router-link>
        <i v-if="!item.disable" class="iconfont close">&#xe017;</i>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import setup from './setup';

export default {
  setup,
}
</script>

<style lang="scss" scoped>
.container{
  overflow-x: auto;
  overflow-y: hidden;
}
.tabs{
  font-weight: 700;
  margin-left: 28px;
  > li{
    float: left;
    padding: 14px 36px;
    white-space: nowrap;
    border-radius: 8px 8px 0 0;
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
    &.active{
      background: white;
      &::before, &::after{
        display: block;
      }
    }
  }
  .close{
    $size: 20px;
    width: $size;
    height: $size;
    cursor: pointer;
    margin-left: 35px;
    vertical-align: middle;
  }
}
</style>