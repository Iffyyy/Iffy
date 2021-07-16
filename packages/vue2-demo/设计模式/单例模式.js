/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2021-07-14 15:46:42
 * @LastEditTime : 2021-07-14 16:19:34
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\设计模式\单例模式.js
 */
//只创建一次
// var Single=function(name){
//   this.name=name
//   this.instance=null
// }

// Single.prototype.getName=function(){
//   console.log(this.name)
// }

// Single.getSingle=function(name){
//   if(!this.test){
//     this.test=new Single(name)
//   }
//   return this.test
// }

// var a=Single.getSingle('name1')
// var b=Single.getSingle('name2')
// console.log(a===b)

// 透明的单例模式 创建唯一的div节点
// var CreateDiv=(function(){
//   var instance
//   var CreateDiv=function(html){
//     if(instance){
//       return instance
//     }
//     this.html=html
//     this.init()
//     return instance=this
//   }

//   CreateDiv.prototype.init()=function(){
//     var div=document.createElement('div')
//     div.innerHTML=this.html
//     document.body.appendChild(div)
//   }
//   return CreateDiv
// })()

// var a=new CreateDiv('div1')
// var b=new CreateDiv('div2')
// console.log(a===b)

// 用代理实现单例模式
// var CreateDiv=function(html){
//   this.html=html
//   this.init()
// }

// CreateDiv.prototype.init()=function(){
//   var div=document.createElement('div')
//   div.innerHTML=this.html
//   document.body.appendChild(div)
// }

// var ProxySingletonCreatDiv=(function(){
//   var instance
//   return function(html){
//     if(!instance){
//       instance=new CreateDiv(html)
//     }
//     return instance
//   }
// })()

// var a=new ProxySingletonCreatDiv('div1')
// var b=new ProxySingletonCreatDiv('div2')
// console.log(a===b)

