<template>
  <ul class="space-between statistical">
    <li class="space-between" v-for="(item, index) in list" :key="index">
      <div class="left">
        <p>
          <span class="point" :style="{background: item.color}"></span>{{ item.name }}
        </p>
        <strong class="number">{{ item.value }}</strong>
      </div>
      <div class="right">
        <span class="icon" :style="{background: item.color, boxShadow: `0 0 0 4px ${item.color}90`}">
          <i class="iconfont" v-html="item.icon"></i>
        </span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import setup from './setup';
export default {
  setup
}
</script>

<style lang="scss" scoped>
.statistical{
  $height: 85px;
  margin-bottom: 14px;
  height: $height;
  border: 1px solid #EEEEEE;
  > li{
    width: calc(25% - 14px);
    padding: 16px 22px;
    box-sizing: border-box;
    position: relative;
    &:not(:last-child){
      &::after{
        content: '';
        position: absolute;
        width: 2px;
        height: 24px;
        background: #131926;
        right: -12px;
        top: 42px;
        transform: translateY(-50%);
      }
    }
  }

  .left{
    .point{
      display: inline-block;
      $size: 8px;
      width: $size;
      height: $size;
      border-radius: 50%;
      margin-right: 4px;
    }
    .number{
      font-size: 26px;
    }
  }

  .icon{
    $size: 50px;
    display: inline-block;
    width: $size;
    height: $size;
    text-align: center;
    line-height: $size;
    border-radius: 50%;
    color: white;
    font-size: 24px;
  }
}
</style>