import request from './request';

/**
 * 获取文件列表或文件内容
 */
export function api_getFileListOrContent(params) {
  return request({
    url: '/file/read',
    method: 'get',
    params,
  })
}

/**
 * 获取日志文件列表或文件内容
 */
export function api_getLogsFileListOrContent(params) {
  return request({
    url: '/file/read/logs',
    method: 'get',
    params,
  })
}

