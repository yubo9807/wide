import { defineComponent } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default () => {
  const $router = useRouter();

  const navList = $router.options.routes
    .find(val => val.name === 'Layout')
    .children
    .map(val => ({
      name: val.name,
      title: val.meta && val.meta.title,
    }))

  return {
    navList,
  }
}