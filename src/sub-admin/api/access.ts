import { AnyObj } from '@/common/utils/type';
import request from './request';

/**
 * 获取访客记录列表
 */
export function api_getAccessRecordList(params: AnyObj) {
  return request({
    url: '/access',
    method: 'get',
    params
  })
}

/**
 * 获取访客记录图表
 */
export function api_getAccessRecordChart(params: AnyObj) {
  return request({
    url: '/access/chart',
    method: 'get',
    params
  })
}