import { AnyObj } from '@/common/utils/type';
import request from './request';

/**
 * 获取验证码 
 */
export function api_captcha() {
  return request({
    url: '/captcha',
    method: 'get',
  })
}

/**
 * 注册 
 */
export function api_signUp(data: AnyObj) {
  return request({
    url: '/reg',
    method: 'post',
    data
  })
}

/**
 * 获取验证码
 */
export function api_getCaptcha() {
  return request({
    url: '/captcha',
    method: 'get',
    responseType: 'arraybuffer',
  })
}

/**
 * 清空验证码
 */
export function api_clearCaptcha() {
  return request({
    url: '/remove/captcha',
    method: 'get',
  })
}

/**
 * 校验验证码
 */
export function api_verifyCaptcha(data) {
  return request({
    url: '/verify',
    method: 'post',
    data,
  })
}

/**
 * 登录
 */
export function api_signIn(data: AnyObj) {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

/**
 * 获取用户信息
 */
export function api_getUserInfo() {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
  });
}
