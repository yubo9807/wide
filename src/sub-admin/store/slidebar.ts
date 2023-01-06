import { defineStore } from "pinia";

export default defineStore({
  id: 'slidebar',

  state: () => ({
    unfold: false,
  }),

  actions: {
    open(bool: boolean) {
      this.unfold = bool;
    }
  }
})