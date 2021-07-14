/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2021-05-19 09:24:33
 * @LastEditTime : 2021-07-14 11:03:40
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\test\设计模式\unit2.js
 */
//apply修正this
// document.getElementById=(function(func){
//   return function(){
//     return func.apply(document,arguments)
//   }
// }(document.getElementById))
// var getId=document.getElementById
// getId('test')

//bind
// Function.prototype.bind=function(){
//   var self=this
//   var context=[].shift.call(arguments)
//   var args=[].slice.call(arguments)
//   return function(){
//     return self.apply(context,[].concat.call(args,[].slice.call(arguments)))
//   }
// }
// var obj={}

// var func=function test(a,b,c,d){
//   console.log(a+b+c+d)
// }.bind(obj,1,2)
// func(3,4)

//命令模式
