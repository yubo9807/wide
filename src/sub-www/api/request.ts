import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage, ElNotification } from 'element-plus';

import env from '@/common/env';
import { asyncto, axiosRetry } from '@/common/utils/network';
import useStoreUser, { getToken } from '../pinia/user';

interface SateConfig extends AxiosRequestConfig {
  noTips?: boolean
}

const config: AxiosRequestConfig = {
  baseURL: env.BASE_API,
  timeout: 2000,
};

const instance = axios.create(config);

axiosRetry(instance, {
  retries:    3,
  retryDelay: 3000,
  retryTips:  () => ElMessage.warning('网络错误，正在尝试重新连接'),
});

// 响应拦截器
instance.interceptors.response.use((response) => {

  if (response.headers && response.headers['content-type'].includes('text/html;')) {
    ElMessage.error('请求地址错误');
    return Promise.reject(response);
  }

  const storeUser = useStoreUser();
  if (response.status === 200) {
    const { data, config } = response;

    if ([401, 403].includes(data.code)) {
      storeUser.signOut();
      return Promise.reject(data);
    }

    // 与后端协商 code 码
    if (data.code === 200) {
      return Promise.resolve(data);
    } else {
      console.error(Object.assign(data, { url: config.url }));
      !(config as SateConfig).noTips && ElMessage.error(data.msg);
      return Promise.reject(data);
    }

  } else {  // 状态码异常
    return Promise.reject(response);
  }
}, error => {
  // console.log('error', error)
  const { baseURL, url } = error.config;
  // 响应出现错误（连接超时/网络断开/服务器忙没响应）
  ElNotification({
    title: '网络可能存在一些问题',
    message: error.message || '错误原因：网络断开/无法连接/网络差/连接超时/服务器忙，请尝试重新操作或刷新页面',
    duration: null,
  })
  
  // 返回统一数据格式，不会导致代码取不到 code 而报错
  return Promise.reject({
    code: 500,
    msg: error.message || 'network error',
  });

});

// 请求拦截器
instance.interceptors.request.use(config => {
  // 有 token 的话将其放在 headers 中
  const authorization = getToken();
  if (authorization) {
    config.headers.Authorization = authorization;
  }
  return config;
})

export default function(option: SateConfig) {
  return asyncto(instance(option));
}
