import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useStoreUser from "@/sub-admin/store/user";

export default () => {
  const $router = useRouter();

  const $route = useRoute();
  const nowRoutes = ref([]);
  nowRoutes.value = $route.matched.map(val => val.name);
  
  const layoutRoutes = $router.options.routes
    .find(val => val.name === 'Layout')
    .children;

  const navList = ref([]);
  const storeUser = useStoreUser();

  watch(() => storeUser.login, value => {
    if (value === 1) {
      navList.value = regularity(layoutRoutes);
    } else {
      navList.value = [];
    }
  }, { immediate: true })

  /**
   * 数据规整
   */
  function regularity(routes = []) {
    const arr = []
    routes.forEach(val => {
      const meta = val.meta || {};
      if (meta.roles && !meta.roles.includes(storeUser.role)) return;
      if (meta.hidden) return;

      arr.push({
        name: val.name,
        title: meta.title || 'no title',
        icon: meta.icon || null,
        hidden: meta.hidden || false,
        children: regularity(val.children),
      })
    })

    arr.forEach((val, index) => {
      if (val.children.length == 1) {
        arr[index] = val.children[0];
      }
    })
    return arr;
  }

  return {
    navList,
    nowRoutes,
  }
}