
/**
 * 生成随机颜色
 */
export function createColor() {
  return '#' + Math.random().toString(16).slice(2, 8);
}

/**
 * 首字母大写
 * @param text 
 * @returns 
 */
export function initialUppercase(text: string) {
  return text[0].toLocaleUpperCase() + text.slice(1);
}

/**
 * 字符串转大驼峰
 * @param text 
 * @returns 
 */
export function toGreatHump(text: string) {
  return text.split(/\-|\_/).map(val => initialUppercase(val)).join('');
}
