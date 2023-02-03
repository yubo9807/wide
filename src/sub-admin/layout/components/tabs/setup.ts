import useStoreTabs from '@/sub-admin/store/tabs';
import { watch, ref, Ref, getCurrentInstance, nextTick, reactive } from 'vue';
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
    nextTick(() => {
      (current.refs.mouseWheelX as any).refresh()
    })
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

  function jump(name: string) {
    router.push({ name });
  }



  // #region 右键菜单
  let selectTab: Tab = null;
  const isMenu = ref(false);
  const menuPosition = reactive({
    top: 0,
    left: 0,
  });

  /**
   * 右键菜单
   */
  function rightMenu(e: MouseEvent, item: Tab) {
    e.preventDefault();
    selectTab = item;
    isMenu.value = true;
    menuPosition.top = e.clientY;
    menuPosition.left = e.clientX;
  }

  /**
   * 关闭指定tab
   */
  function close(name: string) {
    storeTabs.del(name);
    renderTabs(storeTabs.names);
    if (name === nowRouteName.value) {
      router.push({ name: tabs.value[tabs.value.length - 1].name });
    }
  }

  function closeOwn() {
    close(selectTab.name);
    isMenu.value = false;
  }

  /**
   * 关闭其他
   */
  function closeOther() {
    storeTabs.clearAll();
    renderTabs(storeTabs.names);
    storeTabs.add(selectTab.name);
    router.push({ name: selectTab.name });
    isMenu.value = false;
  }

  /**
   * 关闭全部
   */
  function closeAll() {
    storeTabs.clearAll();
    renderTabs(storeTabs.names);
    router.push('/');
    isMenu.value = false;
  }
  // #endregion



  const nowRouteName = ref('');
  const route = useRoute();
  watch(() => route.name, value => {
    nowRouteName.value = value as string;
  }, { immediate: true })

  return {
    tabs,
    jump,
    close,
    closeOwn,
    closeOther,
    closeAll,

    isMenu,
    menuPosition,
    rightMenu,

    nowRouteName,
  }
}