/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2021-05-19 09:24:33
 * @LastEditTime : 2021-07-14 09:12:10
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\test\设计模式\unit1.js
 */
// var duck = { 
//   duckSinging: function(){ 
//     console.log( '嘎嘎嘎' ); 
//   } 
//  }; 
//  var chicken = { 
//   duckSinging: function(){ 
//     console.log( '嘎嘎嘎' ); 
//   }
//  }; 
//  var choir = []; // 合唱团
//  var joinChoir = function( animal ){ 
//   if ( animal && typeof animal.duckSinging === 'function' ){ 
//     choir.push( animal ); 
//     console.log( '恭喜加入合唱团' ); 
//     console.log( '合唱团已有成员数量:' + choir.length ); 
//   } 
//  }; 
//  joinChoir( duck ); // 恭喜加入合唱团
//  joinChoir( chicken ); // 恭喜加入合唱团

 //原型模式
//  var Plane = function(){ 
//   this.blood = 100; 
//   this.attackLevel = 1; 
//   this.defenseLevel = 1; 
//  }; 
//  var plane = new Plane(); 
//  plane.blood = 500; 
//  plane.attackLevel = 10; 
//  plane.defenseLevel = 7; 
//  var clonePlane = Object.create( plane ); 
//  console.log( clonePlane ); // 输出：Object {blood: 500, attackLevel: 10, defenseLevel: 7} 
//  //在不支持 Object.create 方法的浏览器中，则可以使用以下代码：
//  Object.create = Object.create || function( obj ){ 
//   var F = function(){}; 
//   F.prototype = obj; 
//   return new F(); 
//  }
// 模拟new关键字
// var factoryNew=function(){
//   var obj = new Object(),Constructor=[].shift.call(arguments)
//   obj.__proto__=Constructor.prototype
//   var ret=Constructor.apply(obj,arguments)

//   return typeof ret ==='object'?ret:obj
// }

//原型继承
// var obj = {name:'sven'}
// var A=function(){}
// A.prototype=obj

// var a=new A()
// console.log(a.name)

// var B=function(){}
// B.prototype=new A()
// var b=new B()
// console.log(b.name)
