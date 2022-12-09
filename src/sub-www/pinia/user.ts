import { api_getUserInfo } from "../api/login";
import { roleConfig } from "../router/slidebar";
import { defineStore } from "pinia";
import env, { DEVELOPMENT } from "@/common/env";

const TEST = false;  // 在后端接口不通的情况下，开启它跳转相应的路有进行开发

const TOKEN = 'token';
let lock = false;

export function getToken() {
  return sessionStorage.getItem(TOKEN);
}
function setToken(value) {
  sessionStorage.setItem(TOKEN, value);
}
function delToken() {
  sessionStorage.removeItem(TOKEN);
}

export default defineStore({
  id: 'user',

  state: () => ({
    login: 0,  // 登录状态  0: 未登录，1: 已登陆，2: 已退出
    role: null,  // 角色
    token: getToken() || '',  // token
    info: {},  // 用户信息
  }),

  actions: {

    /**
     * 设置用户信息
     * @note 有些后端喜欢把信息返回在登录接口内
     */
    setInfo(info: any) {
      this.info = info;
    },

    /**
     * 登录
     * @param token 
     */
    signIn(token: string) {
      this.token = token;
      setToken(token);
      this.getUserInfo();
    },

    /**
     * 获取用户信息
     */
    async getUserInfo() {
      if (TEST && env.NODE_ENV === DEVELOPMENT) {
        this.login = 1;
        return;
      }

      if (lock) return;  // 并发，防止多次调用

      lock = true;
      const [err, res] = await api_getUserInfo();
      if (err) return;

      this.info = res.data;
      this.role = roleConfig[res.data.role]
      this.login = 1;
      lock = false;
    },

    /**
     * 退出登录
     */
    signOut() {
      this.info = {};
      this.token = '';
      delToken();
      this.login = 2;
    },
  }
})
