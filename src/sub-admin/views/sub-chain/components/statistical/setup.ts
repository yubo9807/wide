import { asyncto } from "@/common/utils/network";
import { api_getSubchainNumber } from "@/sub-admin/api/sub-chain";
import { api_getTradingNumber } from "@/sub-admin/api/trading";
import { api_getUserNumer } from "@/sub-admin/api/user";
import { reactive } from "vue"


export default () => {

  const list = reactive([
    { name: '子链数量', value: 0, color: '#E58F46', icon: '&#xe00a;' },
    { name: '跨链交易数量', value: 0, color: '#E58F46', icon: '&#xe004;' },
    { name: '路由数量', value: 0, color: '#E58F46', icon: '&#xe00b;' },
    { name: '平台用户', value: 0, color: '#464DE5', icon: '&#xe007;' },
  ]);

  getStatistical();
  async function getStatistical() {
    const promises = [
      api_getSubchainNumber(),
      api_getTradingNumber(),
      asyncto(Promise.resolve({ data: 0 })),  // 占位
      api_getUserNumer(),
    ];
    const res: any[] = await Promise.allSettled(promises);
    if (res.findIndex(val => val.value[0]) >= 0) return;

    list.forEach((val, index, self) => {
      const timer = setInterval(() => {
        const maxNumber = res[index].value[1].data
        if (val.value >= maxNumber) {
          clearInterval(timer);
          return;
        }
        self[index].value ++;
      }, 30)
    })

  }

  return {
    list,
  }
}