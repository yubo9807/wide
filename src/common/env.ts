import { AnyObj } from "./utils/type";

declare const process: AnyObj;

export const DEVELOPMENT = 'development';
export const PRODUCTION  = 'production';

const VISIT_ORIGIN = window.origin;

// 生产环境
let env = {

  NODE_ENV: process.env.NODE_ENV,

  BASE_ROUTE_URL: '/wide',

  VISIT_ORIGIN,

  SYSTEM_NAME: '',

  BASE_RESOURCE_URL: 'http://assets.hpyyb.cn',

};

// 开发环境
if (process.env.NODE_ENV === DEVELOPMENT) {

  env.VISIT_ORIGIN = 'http://10.0.5.70';

}

export default Object.freeze(env);
