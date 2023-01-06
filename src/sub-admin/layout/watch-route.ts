import { computed, watch } from "vue"
import { useRoute } from "vue-router"
import useStoreRequest from '@/sub-admin/store/request';
import useStoreTabs from '@/sub-admin/store/tabs';

export default () => {

  const route = useRoute();
  const storeRequest = useStoreRequest();
  const storeTabs = useStoreTabs();

  // 路由发生变化
  watch(() => route.name, (value: string) => {
    storeRequest.resetCount();
    storeTabs.add(value);
  }, { immediate: true })

  const tabs = computed(() => storeTabs.exclude.concat(storeTabs.names));

  return {
    tabs,
  }
}