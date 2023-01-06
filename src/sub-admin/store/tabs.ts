import { defineStore } from "pinia";


export default defineStore({
  id: 'tabs',

  state: () => ({
    exclude: ['Home'],
    names: [],
  }),

  actions: {

    /**
     * 添加
     * @param name 
     */
    add(name: string) {
      if (this.exclude.includes(name)) return;

      const index = this.names.findIndex(val => val === name);
      if (index >= 0) return;
      this.names.push(name);
    },

    /**
     * 删除
     * @param name 
     */
    del(name: string) {
      if (this.exclude.includes(name)) return;

      const index = this.names.findIndex(val => val === name);
      if (index >= 0) {
        this.names.splice(index, 1);
      }
    },

    /**
     * 删除其他
     * @param name 
     */
    clearOther(name: string) {
      this.names = this.exclude.concat([name]);
    },

    /**
     * 清空全部
     */
    clearAll() {
      this.names = this.exclude;
    },
  }

})
