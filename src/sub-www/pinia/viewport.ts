import { defineStore } from 'pinia';

export default defineStore({
  id: 'viewport',

  state: () => ({
    clientWidth: 0,
    scrollY: 0,
  }),

  actions: {

    set_clientWidth(width: number) {
      this.clientWidth = width;
    },

    set_scrollY(scrollY: number) {
      this.scrollY = scrollY;
    },

  }
})