import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElNotification, ElLoading, ElMessageBox } from 'element-plus';

import { asyncto, fractureTips } from '@/common/utils/network';
import useStoreUser, { getToken } from '../store/user';
import useStoreRequest from '../store/request';
import { isType } from '@/common/utils/type';
import env from '@/common/env';

fractureTips();

let storeUser = null;
let storeRequest = null;
Promise.resolve().then(() => {
  storeUser = useStoreUser();
  storeRequest = useStoreRequest();
})

interface SateConfig extends AxiosRequestConfig {
  noTips?: boolean
}

let loading = null;

const config: AxiosRequestConfig = {
  baseURL: env.VISIT_ORIGIN + '/api',
  timeout: 5000,
};

const instance = axios.create(config);

// 请求拦截器
instance.interceptors.request.use(config => {
  loading = ElLoading.service({ lock: true });
  // 有 token 的话将其放在 headers 中
  const authorization = getToken();
  if (authorization) {
    config.headers.Authorization = authorization;
  }
  return config;
})

// 响应拦截器
instance.interceptors.response.use((response) => {
  loading.close();
  return unificationIntercept(response);
}, error => {
  loading.close();
  if (error.response) return unificationIntercept(error.response);

  // 响应出现错误（连接超时/网络断开/服务器忙没响应）
  ElNotification.closeAll();
  ElNotification({
    title: '网络可能存在一些问题',
    message: error.message || '错误原因：网络断开/无法连接/网络差/连接超时/服务器忙，请尝试重新操作或刷新页面',
    duration: null,
  })
  
  // 返回统一数据格式，不会导致代码取不到 code 而报错
  const { url } = error.config;
  return Promise.reject({
    code: 500,
    msg: error.message || 'network error: ' + url,
  });

});


/**
 * 统一拦截报错
 * @param response 
 * @returns 
 */
function unificationIntercept(response: AxiosResponse<any, any>) {
  if (response.headers && response.headers['content-type'].includes('text/html;')) {
    ElMessage.error('请求地址错误');
    return Promise.reject(response);
  }

  const config: SateConfig = response.config;
  const data = response.data;

  // 不符合约定数据格式，直接返回数据
  if (isType(data) !== 'object') return Promise.resolve(data);

  // 记录请求次数
  storeRequest.additionalCount(data.code);

  // 与后端协商 code 码
  if (data.code === 200) return Promise.resolve(data);

  // token 无效/被篡改，直接退出
  if (data.code === 401) {
    storeUser.signOut();
    return Promise.reject(data);
  }

  // token 过期，提示用户退出登录
  if (data.code === 403) {
    storeRequest[403] === 1 && ElMessageBox.confirm('登录信息已过期，请重新登录', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      storeUser.signOut();
    }).catch(() => {});
    return Promise.reject(data);
  }

  console.error(Object.assign(data, { url: config.url }));
  !(config as SateConfig).noTips && ElMessage.error(data.msg);
  return Promise.reject(data);
}

export default function(option: SateConfig) {
  return asyncto(instance(option));
}
