import { AnyObj } from '@/common/utils/type';
import request from './request';

/**
 * 获取用户列表
 */
export function api_getUserList(params: AnyObj) {
  return request({
    url: '/user/list',
    method: 'get',
    params,
  });
}
