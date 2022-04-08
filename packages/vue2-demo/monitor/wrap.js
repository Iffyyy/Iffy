/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2022-03-11 16:41:04
 * @LastEditTime : 2022-03-11 16:44:34
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\monitor\wrap.js
 */
function wrapErrors(fn) {
  // don't wrap function more than once
  if (!fn.__wrapped__) {
    fn.__wrapped__ = function () {
      try {
        return fn.apply(this, arguments);
      } catch (e) {
        throw e; // re-throw the error
      }
    };
  }

  return fn.__wrapped__;
}
// wrapErrors(foo)()

const originAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (type, listener, options) {
  const wrappedListener = function (...args) {
    try {
      return listener.apply(this, args);
    }
    catch (err) {
      throw err;
    }
  }
  return originAddEventListener.call(this, type, wrappedListener, options);
}

