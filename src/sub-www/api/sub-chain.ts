import { AnyObj } from '@/common/utils/type';
import request from './request';

export function api_createSubChain(data: AnyObj) {
  return request({
    url: '',
    method: 'post',
    data,
  })
}