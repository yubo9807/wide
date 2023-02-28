import { defineStore } from "pinia";

const arr = [200, 401, 406, 500];
type Config = {
  [prop in keyof typeof arr]?: number
}

export default defineStore({
  id: 'request',

  // 每次切换页面都会重新计数
  state: (): Config => ({
    // errorCount: 0,  // 请求错误计数
    // tokenFailureCount: 0,  // token 失效计数
  }),

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