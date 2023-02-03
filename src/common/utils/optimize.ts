/**
 * 节流
 * @param handler 
 * @param wait 
 * @returns 
 */
export const throttle = (handler: Function, wait: number, ...args: any) => {
  let lastTime = 0;
  return function () {
    let nowTime = new Date().getTime();
    if (nowTime - lastTime > wait) {
      handler.apply(this, ...args);
      lastTime = nowTime;
    }
  }
}

/**
* 防抖
* @param handler 
* @param delay 
* @returns 
*/
export function debounce(handler: Function, delay: number, ...args: any) {
  let timer = null;
  return function () {
    let _self = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      handler.apply(_self, ...args);
    }, delay);
  }
}