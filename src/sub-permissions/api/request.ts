import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage, ElNotification, ElLoading, ElMessageBox } from 'element-plus';

import { asyncto, fractureTips } from '@/common/utils/network';
import { isType } from '@/common/utils/type';

fractureTips();

interface SateConfig extends AxiosRequestConfig {
  noTips?: boolean
}

let loading = null;

const config: AxiosRequestConfig = {
  baseURL: '/permissions',
  timeout: 5000,
};

const instance = axios.create(config);

// 请求拦截器
instance.interceptors.request.use(config => {
  loading = ElLoading.service({ lock: true });
  // 有 token 的话将其放在 headers 中
  // const authorization = getToken();
  // if (authorization) {
  //   config.headers.Authorization = 'Bearer ' + authorization;
  // }
  return config;
})

// 响应拦截器
instance.interceptors.response.use((response) => {
  loading.close();

  if (response.headers && response.headers['content-type'].includes('text/html;')) {
    ElMessage.error('请求地址错误');
    return Promise.reject(response);
  }

  if (response.status === 200) {
    const config: SateConfig = response.config;
    const data = response.data;

    if (isType(data) !== 'object') {
      return Promise.resolve(data);
    }

    // 与后端协商 code 码
    if (data.code === 200) {
      return Promise.resolve(data);
    } else {
      console.error(Object.assign(data, { url: config.url }));

      !(config as SateConfig).noTips && ElMessage.error(data.message);
      return Promise.reject(data);
    }

  } else {  // 状态码异常
    return Promise.reject(response);
  }
}, error => {
  loading.close();

  if (error.response) {
    !error.config.noTips && ElMessage.error(error.response.data.error);
    return Promise.reject(error.response.data);
  }

  const { baseURL, url } = error.config;
  // 响应出现错误（连接超时/网络断开/服务器忙没响应）
  ElNotification.closeAll();
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


export default function(option: SateConfig) {
  return asyncto(instance(option));
}
