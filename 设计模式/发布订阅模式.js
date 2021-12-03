/*
 * @Description  :
 * @Author       : lihui
 * @Date         : 2021-07-16 11:15:19
 * @LastEditTime : 2021-07-16 17:10:34
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\设计模式\发布订阅模式.js
 */
// 自定义事件
// var salesOffices={}
// salesOffices.clientList={}
// salesOffices.listen=function(key,fn){
//   if(!this.clientList[key]){
//     this.clientList[key]=[]
//   }
//   this.clientList[key].push(fn)
// }
// salesOffices.trigger=function(){
//   var key=Array.prototype.shift.call(arguments),fn=this.clientList[key]
//   if(!fn||!fn.length)return false
//   for(var i=0,fn;fn=this.clientList[key][i++];){
//     fn.apply(this,arguments)
//   }
// }
// salesOffices.listen('101',function(price){
//   console.log(price)
// })
// salesOffices.listen('120',function(price){
//   console.log(price)
// })
// salesOffices.trigger(101,20000)
// salesOffices.trigger(120,22000)

// 通用实现
// var events = {
//   clientList: [],
//   listen: function (key, fn) {
//     if (!this.clientList[key]) {
//       this.clientList[key] = [];
//     }

//     this.clientList[key].push(fn);
//   },
//   trigger: function () {
//     var key = Array.prototype.shift.call(arguments),
//       fn = this.clientList[key];
//     if (!fn || !fn.length) return false;
//     for (var i = 0, fn; (fn = this.clientList[key][i++]); ) {
//       fn.apply(this, arguments);
//     }
//   },
// };

// // 取消订阅事件
// events.remove = function (key, fn) {
//   var fns = this.clientList[key];
//   if (!fns) return false;
//   if (!fn) {
//     fns && (fns.length = 0);
//   } else {
//     for (var l = fns.length - 1; l >= 0; l--) {
//       var _fn = fns[l];
//       if (_fn === fn) {
//         fns.splice(l, 1);
//       }
//     }
//   }
// };

// var installEvent = function (obj) {
//   for (var i in events) {
//     obj[i] = events[i];
//   }
// };

// var salesOffices = {};
// installEvent(salesOffices);
// salesOffices.listen("101", fn1 = function (price) {
//   console.log(price,1);
// });
// salesOffices.listen("101", fn2 = function (price) {
//   console.log(price,2);
// });
// // salesOffices.trigger("101", 20000);
// salesOffices.remove('101', fn1)
// salesOffices.trigger("101", 22000);

// 登录

// 中介
var Event = (function () {
  var clientList = {},
    listen,
    trigger,
    remove;
  listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };
  trigger = function () {
    var key = Array.prototype.shift.call(arguments),
      fns = clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (var i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments);
    }
  };
  remove = function (key, fn) {
    var fns = this.clientList[key];
    if (!fns) return false;
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  };
  return {
    listen: listen,
    trigger: trigger,
    remove: remove,
  };
})();

Event.listen("squareMeter88", function (price) {
  // 小红订阅消息
  console.log("价格= " + price); // 输出：'价格=2000000'
});
Event.trigger("squareMeter88", 2000000); // 售楼处发布消息

class EventEmitter {
  constructor() {
    this.handlers = {};
  }

  on(eventName, cb) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }

    this.handlers[eventName].push(cb);
  }

  emit(eventName, ...args) {
    if (this.handlers[eventName]) {
      const handlers = this.handlers[eventName].slice();
      handlers.forEach((fn) => {
        fn(...args);
      });
    }
  }

  off(eventName, cb) {
    const callbacks = this.handlers[eventName];
    const index = callbacks.indexOf(cb);
    if (!index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  once(eventName, cb) {
    const wrapper = (...args) => {
      cb(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}
