import { defineStore } from "pinia";

export default defineStore({
  id: 'request',

  // 每次切换页面都会重新计数
  state: () => ({
    errorCount: 0,  // 请求错误计数
    tokenFailureCount: 0,  // token 失效计数
  }),

  actions: {
    /**
     * 追加请求错误次数
     */
    additionalErrorCount() {
      this.errorCount ++;
    },

    /**
     * 追加请求 token 错误次数
     */
    additionalTokenFailureCount() {
      this.tokenFailureCount ++;
    },

    /**
     * 重置请求错误次数
     */
    resetCount() {
      this.errorCount = 0;
      this.tokenFailureCount = 0;
    }
  },
})