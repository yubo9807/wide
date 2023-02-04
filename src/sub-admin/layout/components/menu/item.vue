<template>
  <li :class="'tier-'+count">
    <a v-if="menu.children && menu.children.length > 0" :class="[isOpen?'active':'']" @click="open">
      <i v-if="count === 0" class="iconfont icon" v-html="menu.icon"></i>
      <span v-show="!unfold">{{ menu.title }}</span>
      <i class="iconfont icon-open">&#xe64b;</i>
    </a>
    <router-link v-else :to="{ name: menu.name }">
      <i v-if="count === 0" class="iconfont icon" v-html="menu.icon"></i>
      <span v-show="!unfold">{{ menu.title }}</span>
    </router-link>

    <ul
      ref="menuRef"
      :class="['menu', isOpen?'active':'']"
      :style="{ height }"
    >
      <MenuItem v-for="(item, index) in menu.children" :key="index" :menu="item" :count="count+1" />
    </ul>

  </li>
</template>

<script lang="ts">
import { ref, getCurrentInstance, computed, PropType, nextTick } from 'vue'
import useStoreSlidebar from '@/sub-admin/store/slidebar';

type MenuType = {
  children: MenuType[],
  icon: string,
  title: string,
  name: string,
}

export default {
  name: 'MenuItem',
  props: {
    menu: {
      type: Object as PropType<MenuType>,
      default: () => ({}),
    },
    nowRoutes: {
      type: Array as PropType<string[]>,
      default: []
    },
    /**
     * 组件递归计数，不需要传递
     */
    count: {
      type: Number,
      default: 0,
    }
  },
  setup(props) {
    const current = getCurrentInstance();

    if (props.nowRoutes.includes(props.menu.name)) {
      nextTick(open)
    }

    const isOpen = ref(false);
    const height = ref('0');
    function open() {
      const el = current.refs.menuRef as HTMLElement;
      if (isOpen.value) {
        isOpen.value = false;
        el.style.height = 'auto';
        const h = el.offsetHeight;
        height.value = h + 'px';
        setTimeout(() => {
          height.value = '0';
        })
      } else {
        isOpen.value = true;
        el.style.height = 'auto';
        const h = el.offsetHeight;
        el.style.height = '0';
        setTimeout(() => {
          height.value = h + 'px';
          setTimeout(() => {
            height.value = 'auto';
          }, 400)
        }, 0)
      }
    }

    const storeSlidebar = useStoreSlidebar();

    return {
      isOpen,
      height,
      open,
      unfold: computed(() => storeSlidebar.unfold),
    }
  }
}
</script>

<style lang="scss" scoped>
li{
  cursor: pointer;
}
a{
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 56px;
  padding: 0 24px;
  box-sizing: border-box;
  .icon-open{
    float: right;
    line-height: 56px;
    text-align: center;
    width: 16px;
    transform-origin: center center;
    transition: transform .4s;
  }
  &.active .icon-open{
    display: inline-block;
    transform: rotate(90deg);
  }
  &.router-link-active, &:hover{
    color: white;
    background: var(--main-color);
    border-radius: 4px;
  }

  position: relative;
  overflow: hidden;
  &::before, &::after{
    content: '';
    position: absolute;
    top: -50%;
    background: linear-gradient(200deg, rgba(255,255,255,.4) 2%, rgba(255,255,255,0));
    right: -10px;
    height: 100px;
    transform: rotate(-20deg) translateX(40px);
  }
  &::after{
    width: 36px;
    transition: transform .4s linear .2s;
  }
  &::before{
    width: 56px;
    transition: transform .4s linear;
  }
  &.router-link-active, &:hover{
    &::before, &::after{
      transform: rotate(-20deg);
    }
  }
}

.icon{
  font-size: 16px;
  margin-right: 6px;
}

.menu{
  height: 0;
  overflow: hidden;
  transition: height .4s;
  padding-left: 20px;
}
</style>
