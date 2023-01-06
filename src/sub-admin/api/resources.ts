import { AnyObj } from "@/common/utils/type";
import request from "./request";

/**
 * 获取交易列表
 */
export function api_getTradingList(params: AnyObj) {
  return request({
    url: '/admin/queryChain',
    method: 'get',
    params,
  })
}