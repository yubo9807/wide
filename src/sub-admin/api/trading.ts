import { AnyObj } from "@/common/utils/type";
import request from "./request";

/**
 * 获取交易列表
 */
export function api_getTradingList(params: AnyObj) {
  return request({
    url: '/trade/queryChain',
    method: 'get',
    params,
  })
}

/**
 * 获取交易数量
 */
export function api_getTradingNumber() {
  return request({
    url: '/trade/count',
    method: 'get',
  })
}

/**
 * 发送交易
*/
export function api_sendTrading(data: AnyObj) {
  return request({
    url: '/trade/sendTrade',
    method: 'post',
    data,
  })
}

/**
 * 查询交易
*/
export function api_queryTrading(params: AnyObj) {
  return request({
    url: '/trade/queryTrade',
    method: 'get',
    params,
  })
}

/**
 * 根据子链状态查询所有子链
 */
export function api_querySubChainAll(params: AnyObj) {
  return request({
    url: '/trade/queryChain',
    method: 'get',
    params,
  })
}