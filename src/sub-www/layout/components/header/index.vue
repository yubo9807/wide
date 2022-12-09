<template>
  <header class="header">
    <router-link class="logo" to="/">
      <img src="" alt="跨链服务平台">
    </router-link>

    <nav class="nav">
      <ul class="clearfix">
        <li v-for="item in navList" :key="item.name">
          <router-link :to="{ name: item.name }">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>

    <div class="account">
      <ul class="clearfix">
        <li class="user-name">
          <img class="portrait" src="" alt="">
          超级管理员
          <el-dropdown>
            <i>icon</i>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click="signOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
        <li>
          <i>icon</i>
          消息通知
        </li>
      </ul>
    </div>

  </header>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import nav from './nav';
import user from './user'

export default defineComponent({
  setup() {
    return {
      ...nav(),
      ...user(),
    }
  }
})
</script>

<style lang='scss' scoped>
.header{
  min-width: 1200px;
  display: flex;
  justify-content: space-between;
  padding: 24px 42px;
  border-bottom: 2px solid #FAFBFD;
}
@media (max-width: 1300px) {
  .header{
    padding: 24px 10px;
  }
}

$logoWidth: 120px;
.logo{
  width: $logoWidth;
  height: 42px;
  border: 1px solid #ccc;
}

$accountWidth: 270px;
.account{
  width: $accountWidth;
  >ul{
    >li{
      float: right;
      line-height: 44px;
      &:not(:last-child){
        margin-left: 24px;
      }
      &.user-name{
        font-weight: 700;
      }
    }
  }
  .portrait{
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
    margin-right: 8px;
  }
}

.nav{
  width: calc(100% - $logoWidth - $accountWidth);
  text-align: center;
  > ul{
    margin-top: 2px;
    display: inline-block;
    > li{
      float: left;
      padding: 0 4px;
      > a{
        display: inline-block;
        height: 38px;
        line-height: 38px;
        padding: 0 14px;
        color: var(--main-color);
        &.router-link-active{
          background: var(--main-color);
          color: white;
        }
      }
    }
  }
}
</style>