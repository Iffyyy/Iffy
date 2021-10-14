/*
 * @Description  :
 * @Author       : lihui
 * @Date         : 2021-05-19 09:24:33
 * @LastEditTime : 2021-08-11 15:04:13
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\设计模式\unit3.js
 */

//命令模式
// var Tv = {
//   open: function () {
//     console.log("open");
//   },
//   close: function () {
//     console.log("close");
//   },
// };

// var Command = function (execute) {
//   this.receiver = execute;
// };
// Command.prototype.execute = function () {
//   this.receiver.open();
// };

// Command.prototype.undo = function () {
//   this.receiver.close();
// };

// var setCommand = function (command) {
//   return command;
// };

// var test=setCommand(new Command(Tv))
// test.execute()
// test.undo()

//单例模式
// var getSingle=function(fn){
//   var ret
//   return function(){
//     return ret||(ret=fn.apply(this,arguments))
//   }
// }

// var getScript=getSingle(function(){
//   return this
// })

// var script1=getScript()
// var script2=getScript()

// console.log(script1===script2)

//AOP //装饰者模式
// Function.prototype.before = function (fn) {
//   var _this = this;
//   return function () {
//     fn.apply(this, arguments);
//     return _this.apply(this, arguments);
//   };
// };

Function.prototype.after = function (fn) {
  var _this = this;
  return function () {
    var ret = _this.apply(this.arguments);
    fn.apply(this, arguments);
    return ret;
  };
};

// var func=function(){
//   console.log(2)
// }

// func=func.before(function(){
//   console.log(1)
// }).after(function(){
//   console.log(3)
// })
// func()

//柯里化
// var currying=function(fn){
//   var args=[]
//   return function(){
//     if(arguments.length===0){
//       return fn.apply(this,args)
//     }else{
//       [].push.apply(args,arguments)
//       return arguments.callee
//     }
//   }
// }

// var cost=(function(){
//   var money=0
//   return function(){
//     for(var i =0,l=arguments.length;i<l;i++){
//       money+=arguments[i]
//     }
//     return money
//   }
// })()

// cost(100)
// cost(200)
// console.log(cost())

// uncarrying
// Function.prototype.uncarrying = function () {
//   var self = this;
//   return function () {
//     var obj = Array.prototype.shift.call(arguments);
//     return self.apply(obj, arguments);
//   };
// };

// 节流
// var throttle=function(fn,interval){
//   var _self=fn
//   var timer,firstTime=true
//   return function(){
//     var args=arguments,_me=this
//     if(firstTime){
//       _self.apply(_me,args)
//       return firstTime=false
//     }
//     if(timer)return
//     timer=setTimeout(function(){
//       clearTimeout(timer)
//       timer=null
//       _self.apply(_me,args)
//     },interval||500)
//   }
// }

// 分时函数
// var timeChunk = function (ary, fn, count) {
//   var t;

//   var start = function () {
//     for (var i = 0; i < Math.min(count || 1, ary.lenngth); i++) {
//       var obj = ary.shift();
//       fn(obj);
//     }
//   };

//   return function () {
//     t = setInterval(function () {
//       if (!ary.length) {
//         return clearInterval(t);
//       }
//       start();
//     }, 200);
//   };
// };

//惰性加载函数
//bad
var addEvent = function (elem, type, handler) {
  if (window.addEventListener) {
    return elem.addEventListener(type, handler, false)
  }
  if (window.attachEvent) {
    return elem.attachEvent('on' + type, handler)
  }
}
//better  
var addEvent=function(ele,type,handler){
  if(window.addEventListener){
    addEvent=function(ele,type,handler){
      ele.addEventListener(ele,type,handler,false)
    }
  }else if(window.attachEvent){
    addEvent=function(ele,type,handler){
      ele.addEventListener(ele,type,handler)
    }
  }

  addEvent(ele,type,handler)
}