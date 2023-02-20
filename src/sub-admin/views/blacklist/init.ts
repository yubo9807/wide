import { InitTableNoPaging } from "@/common/utils/init-table";
import { api_getBlacklist } from "@/sub-admin/api/blacklist";
import { onBeforeUnmount } from "vue";

export let refresh = null;

const searchForm = {}
export default class extends InitTableNoPaging<typeof searchForm> {
  constructor() {
    super(searchForm, api_getBlacklist);
    this.initData();

    refresh = this.initData;
    onBeforeUnmount(() => {
      refresh = null;
    })
  }
}