import { InitTable } from "@/common/utils/init-table";
import { deleteEmpty } from "@/common/utils/object";
import { api_getAccessRecordList } from "@/sub-admin/api/access";
import { api_getFileListOrContent } from "@/sub-admin/api/file";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const searchForm = {
  ip:   '',
  url:  '',
  time: [Date.now(), Date.now()],
}

export default class Init extends InitTable<typeof searchForm> {
  #route   = null;
  #router  = null;
  nowDay   = ref();
  menuList = ref([]);

  constructor() {
    super(searchForm, api_getAccessRecordList);
    this.#route  = useRoute();
    this.#router = useRouter();

    const self = this;
    (async function() {
      const [err, res] = await api_getFileListOrContent({ path: '/access' });
      if (err) return;

      const data = res.data.reverse();
      self.menuList.value = data;
      
      const log = self.#route.query.log;
      if (log) {
        self.nowDay.value = (log as string).replace('.log', '');
        self.initData();
      } else {
        self.#router.replace({ query: { log: data[0].name }});
      }
    }());

    watch(() => this.#route.query.log, value => {
      if (value) {
        this.nowDay.value = (value as string).replace('.log', '');
        this.initData();
      }
    })

    this.initData();
  }

  /**
   * 切换菜单
   * @param val 
   */
  changeMenu = (val) => {
    this.#router.replace({ query: { log: val.name } });
    this.paging.pageNumber = 1;
    this.initData();
  }

  /**
   * 初始化表格数据
   * @returns 
   */
  initData = async() => {
    const hour      = 1000 * 60 * 60;
    const startTime = new Date(this.nowDay.value).getTime() - hour * 8;
    const endTime   = startTime + hour * 24;

    const params = deleteEmpty({
      startTime:  startTime / 1000,
      endTime:    endTime / 1000 - 1,
      pageNumber: this.paging.pageNumber,
      pageSize:   this.paging.pageSize,
      ...this.form,
    })
    const [err, res] = await api_getAccessRecordList(params);
    if (err) {
      this.tableData.value = [];
      this.paging.total = 0;
      return;
    };

    const { list, total } = res.data;
    this.tableData.value = list;
    this.paging.total = total;
  }
}