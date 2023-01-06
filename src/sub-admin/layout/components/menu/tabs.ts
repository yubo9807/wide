import useStoreTabs from '@/sub-admin/store/tabs';
import { useRoute } from 'vue-router';

export default () => {
  const stoteTabs = useStoreTabs();

  const route = useRoute();
  stoteTabs.add(route.name as string);

  return {}
}
