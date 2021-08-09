/*
 * @Description  :
 * @Author       : lihui
 * @Date         : 2021-08-05 10:50:44
 * @LastEditTime : 2021-08-05 14:34:33
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\函数式编程\curry.js
 */

function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = [...prevArgs, nextArg];
      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

function looseCurry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(...nextArgs) {
      var args = [...prevArgs, ...nextArgs];
      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

function uncarrying(fn) {
  return function uncarried(...args) {
    let ret = fn;
    for (arg in args) {
      ret = ret(arg);
    }
    return ret;
  };
}
