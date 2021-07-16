/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2021-07-15 11:05:02
 * @LastEditTime : 2021-07-15 16:53:58
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\设计模式\代理模式.js
 */
//小明追MM
// 不用代理
// var Flower=function(){}

// var xiaoming={
//   sendFlower:function(target){
//     var flower=new Flower()
//     target.recieveFlower(flower)
//   }
// }

// var A={
//   recieveFlower:function(flower){
//     console.log('收到花'+flower)
//   }
// }

// xiaoming.sendFlower(A)

// 引入代理B
// var Flower=function(){}

// var xiaoming={
//   sendFlower:function(target){
//     var flower=new Flower()
//     target.recieveFlower(flower)
//   }
// }

// var A={
//   recieveFlower:function(flower){
//     console.log('收到花'+flower)
//   },
//   listenGoodMood:function(fn){
//     setTimeout(function(){
//       fn()
//     },5000)
//   }
// }

// var B={
//   recieveFlower:function(flower){
//     A.listenGoodMood(function(){
//       A.recieveFlower(flower)
//     })
//   }
// }

// xiaoming.sendFlower(B)

// 动态创建代理
var mult=function(){
  var a=1
  for(var i=0,l=arguments.length;i<l;i++){
    a=a*arguments[i]
  }
  return a
}

var plus=function(){
  var a=0
  for(var i=0,l=arguments.length;i<l;i++){
    a=a+arguments[i]
  }
  return a
}

var createProxyFactory=function(fn){
  var cache={}
  return function(){
    var args=Array.prototype.join.call(arguments,',')
    if(args in cache){
      return cache[args]
    }
    return cache[args]=fn.apply(this,arguments)
  }
}

var proxyMult = createProxyFactory( mult ), 
proxyPlus = createProxyFactory( plus ); 
console.log ( proxyMult( 1, 2, 3, 4 ) ); // 输出：24 
console.log ( proxyMult( 1, 2, 3, 4 ) ); // 输出：24 
console.log ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10 
console.log ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10