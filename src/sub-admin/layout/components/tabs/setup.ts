import useStoreTabs from '@/sub-admin/store/tabs';
import { watch, ref, Ref, getCurrentInstance, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default () => {
  const router = useRouter();
  const storeTabs = useStoreTabs();
  const exclude = storeTabs.exclude;
  const current = getCurrentInstance();

  type Tab = {
    name: string
    title: string
    disable: boolean
  }
  const tabs: Ref<Tab[]> = ref([]);
  
  watch(() => storeTabs.names, value => {
    renderTabs(value);
    calculativeWidth();
  }, { immediate: true, deep: true })

  function renderTabs(names: string[]) {
    const arr = [];
    exclude.concat(names).forEach(name => {
      const route = router.getRoutes().find(val => val.name === name);
      if (!route) return;

      const disable = storeTabs.exclude.includes(name);
      arr.push({ title: route.meta.title, name, disable });
    })
    tabs.value = arr;
  }

  const wrapWidth = ref(0);
  function calculativeWidth() {
    nextTick(() => {
      const arr = current.refs.item;
      let width = 0;
      (arr as HTMLElement[]).forEach(val => {
        width += val.offsetWidth;
      });
      wrapWidth.value = width;
    })
  }

  /**
   * 关闭自个儿
   */
  function close(item: Tab) {
    storeTabs.del(item.name);
    renderTabs(storeTabs.names);
  }

  /**
   * 关闭其他
   */
  function closeOther(item: Tab) {
    storeTabs.clearOther(item.name);
    renderTabs(storeTabs.names);
  }

  /**
   * 关闭全部
   */
  function closeAll() {
    storeTabs.clearAll();
    renderTabs(storeTabs.names);
  }


  const nowRouteName = ref('');
  const route = useRoute();
  watch(() => route.name, value => {
    nowRouteName.value = value as string;
  }, { immediate: true })

  return {
    tabs,
    close,
    closeOther,
    closeAll,

    wrapWidth,

    nowRouteName,
  }
}