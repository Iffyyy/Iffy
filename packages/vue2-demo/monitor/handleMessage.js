/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2022-03-11 16:41:20
 * @LastEditTime : 2022-03-11 17:18:27
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\monitor\handleMessage.js
 */
window.onerror = function (message, url, line, column, error) {
  console.log(message, url, line, column, error);
  return true
}

window.addEventListener('error', (message, url, line, column, error) => {
  console.log(message, url, line, column, error);
  return true;
}, true);

window.addEventListener("unhandledrejection", function(e){
  e.preventDefault()
  console.log(e.reason);
  return true;
});


const errorKey = `${+new Date()}@${randomString(8)}`
const eventKey = compressString(String(e.message), String(e.colno) + String(e.lineno))