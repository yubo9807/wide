import { AnyObj } from '@/common/utils/type';
import request from './request';

/**
 * 获取统计数据
 */
export function api_getSubchainNumber() {
  return request({
    url: '/chain/count',
    method: 'get',
  })
}

/**
 * 查询子链
 */
export function api_getSubChainList(params: AnyObj) {
  return request({
    url: '/chain/queryChain',
    method: 'get',
    params,
  })
}

/**
 * 新增子链
 */
export function api_createSubChain(data: AnyObj) {
  return request({
    url: '/chain/add',
    method: 'post',
    data,
  })
}

/**
 * 修改子链
 */
export function api_modifySubChain(data: AnyObj) {
  return request({
    url: '/chain/edit',
    method: 'post',
    data,
  })
}


/**
 * 删除子链
*/
export function api_deleteSubChain(data: AnyObj) {
  return request({
    url: '/chain/delPermission',
    method: 'post',
    data,
  })
}

/**
 * 修改子链状态
 */
export function api_modifySubChainStatus(data: AnyObj) {
  return request({
    url: '/chain/editStatus',
    method: 'post',
    data,
  })
}

/**
 * 校验存证地址
 */
export function api_checkCZAddress(params: AnyObj) {
  return request({
    url: '/chain/check',
    method: 'get',
    params,
    noTips: true,
  })
}

/**
 * 获取公开子链列表
 */
export function api_getPublicSubChainList(params: AnyObj) {
  return request({
    url: '/chain/queryChainByStatus',
    method: 'get',
    params,
  })
}

/**
 * 给子链分配权限
 */
export function api_allocationPower(data: AnyObj) {
  return request({
    url: '/chain/addPermission',
    method: 'post',
    data,
  })
}