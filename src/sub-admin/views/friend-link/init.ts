import { InitTableNoPaging } from "@/common/utils/init-table";
import { api_getFriendLinklist } from "@/sub-admin/api/friend-link";
import { onBeforeUnmount } from "vue";

export let refresh = null;

const searchForm = {}
export default class extends InitTableNoPaging<typeof searchForm> {
  constructor() {
    super(searchForm, api_getFriendLinklist);
    this.initData();

    refresh = this.initData;
    onBeforeUnmount(() => {
      refresh = null;
    })
  }
}