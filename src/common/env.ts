declare const process: any;

export const DEVELOPMENT = 'development';
export const PRODUCTION  = 'production';

const VISIT_ORIGIN = window.origin;

// 生产环境
let env = {

  NODE_ENV: process.env.NODE_ENV,

  BASE_API: '/api',

  BASE_ROUTE_URL: '/vise',

  VISIT_ORIGIN,

};

// 开发环境
if (process.env.NODE_ENV === DEVELOPMENT) {

  env.VISIT_ORIGIN = 'http://10.0.5.70';

}

export default Object.freeze(env);
