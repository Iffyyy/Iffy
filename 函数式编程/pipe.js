/*
 * @Description  :
 * @Author       : lihui
 * @Date         : 2021-08-05 17:47:44
 * @LastEditTime : 2021-08-06 09:56:21
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\函数式编程\pipe.js
 */
// pipe(..)与compose(..)是相同的，只是它按照从左到右的顺序处理函数列表
// const pipe=reverseArgs(compose)

function pipe(...fns) {
  return function piped(ret) {
    let list = [...fns];
    let ret;
    while (list.length) {
      ret = list.shift()(ret);
    }
    return ret;
  };
}
