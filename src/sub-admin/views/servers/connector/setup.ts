import { api_getLogsFileListOrContent } from '@/sub-admin/api/file';
import { getCurrentInstance, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { calculateByte } from '@/common/utils/number';

export default () => {

  const current = getCurrentInstance();
  const $router = useRouter();
  const $route = useRoute();
  
  const fileList = ref([]);
  getFileList();

  /**
   * 获取文件列表
   */
  async function getFileList() {
    const { log } = $route.query;
    const [err, res] = await api_getLogsFileListOrContent({ path: '/' })
    if (err) return;

    const list = res.data.reverse();
    fileList.value = list;
    $router.replace({ query: { log: log || list[0].name } })
    
    const queryLog = list.find(val => val.name === log);
    queryLog ? getFileContent(queryLog.path) : getFileContent(list[0].path);
  }
  

  const fileAttr = ref({});
  
  /**
   * 获取文件属性
   * @param path 
   */
  async function getFileContent(path) {
    const [err, res] = await api_getLogsFileListOrContent({ path })
    const { data } = res;
    fileAttr.value = data;
    $router.replace({ query: { log: data.name } })
    toBottom();
  }

  function toBottom() {
    setTimeout(() => {
      const ElContent: any = current.refs.content;
      ElContent.scrollTo({ top: ElContent.scrollHeight, behavior: 'smooth' });
    }, 0)
  }

  const newline = ref(true);

  watch(() => newline.value, value => {
    value && toBottom();
  })

  return {
    fileList,
    fileAttr,
    getFileContent,
    calculateByte,

    newline
  }
}
