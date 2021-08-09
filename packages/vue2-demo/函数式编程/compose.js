/*
 * @Description  :
 * @Author       : lihui
 * @Date         : 2021-08-05 15:26:06
 * @LastEditTime : 2021-08-05 17:33:23
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\函数式编程\compose.js
 */

function compose1(...args) {
  return function composed(result) {
    const list = [...args];

    while (list.length) {
      result = list.pop()(result);
    }

    return result;
  };
}

function compose(...fns) {
  return function composed(result) {
    return [...fns].reverse().reduce(function reducer(result, fn) {
      return fn(result);
    }, result);
  };
}

function compose2(...fns) {
  return fns.reverse().reverse(function reducer(fn1, fn2) {
    return function composed(...args) {
      return fn2(fn1(...args));
    };
  });
}

// 递归
function compose3(...fns) {
  const [fn1, fn2, ...rest] = fns.reverse();

  const composedFn = function composed(...args) {
    return fn2(fn1(...args));
  };

  if (!rest.length) return composedFn;

  return compose3(...rest.reverse(), composedFn);
}
