/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2022-03-11 17:13:32
 * @LastEditTime : 2022-03-11 17:16:42
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\monitor\tool.js
 */
function randomString(len) {　　
  len = len || 32;
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let maxPos = chars.length;
  let pwd = '';　　
  for (let i = 0; i < len; i++) {　　　　
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));　　
  }　　
  return pwd;
}

function compressString(str, key) {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZ';
  if (!str || !key) {
      return 'null';
  }
  let n = 0,
      m = 0;
  for (let i = 0; i < str.length; i++) {
      n += str[i].charCodeAt();
  }
  for (let j = 0; j < key.length; j++) {
      m += key[j].charCodeAt();
  }
  let num = n + '' + key[key.length - 1].charCodeAt() + m + str[str.length - 1].charCodeAt();
  if(num) {
      num = num + chars[num[num.length - 1]];
  }
  return num;
}

export function handleErr(error) {
  switch (error.type) {
    case 'error':
        error instanceof ErrorEvent ? reportCaughtError(error)  : reportResourceError(error)
      break;
    case 'unhandledrejection':
      // reportPromiseError(error)
    break;
    // case 'httpError':
    //     reportHttpError(error)
    //   break;
  }
  // setGlobalHealth('error')
}