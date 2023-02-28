import { defineStore } from "pinia";

const arr = [200, 401, 406, 500];
type Config = {
  [prop in keyof typeof arr]?: number
}

/**
 * 请求计数
 */
export default defineStore({
  id: 'request',

  // 每次切换页面都会重新计数
  state: (): Config => ({}),

  actions: {
    /**
     * 追加请求错误次数
     */
    additionalCount(key: keyof Config) {
      this[key]++;
    },

    /**
     * 重置请求错误次数
     */
    resetCount() {
      arr.forEach(val => this[val] = 0);
    }
  },
})