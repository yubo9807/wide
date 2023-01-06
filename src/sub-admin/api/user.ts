import { AnyObj } from "@/common/utils/type";
import request from "./request";

/**
 * 获取用户列表
 */
export function api_getUserList(params: AnyObj) {
  return request({
    url: '/admin/user',
    method: 'get',
    params,
  })
}

/**
 * 修改用户可用性
 */
export function api_modifyUserEnabled(data: AnyObj) {
  return request({
    url: '/admin/user/enabled',
    method: 'post',
    data,
  })
}

/**
 * 重置密码
 */
export function api_resetPassword(data: AnyObj) {
  return request({
    url: '/user/update/resetPassword',
    method: 'post',
    data,
  })
}

/**
 * 删除用户
 */
export function api_deleteUser(data: AnyObj) {
  return request({
    url: '/admin/user/delete',
    method: 'post',
    data,
  })
}

/**
 * 获取用户数量
 */
export function api_getUserNumer() {
  return request({
    url: '/user/count',
    method: 'get',
  })
}