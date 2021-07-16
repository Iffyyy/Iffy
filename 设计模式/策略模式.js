/*
 * @Description  :
 * @Author       : lihui
 * @Date         : 2021-07-14 17:04:06
 * @LastEditTime : 2021-07-15 10:35:03
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\设计模式\策略模式.js
 */
//计算年终奖
// var performanceS=function(){}
// performanceS.prototype.calculate=function(salary){
//   return salary*4
// }

// var performanceA=function(){}
// performanceA.prototype.calculate=function(salary){
//   return salary*2
// }

// var Bonus=function(){
//   this.salary=null
//   this.strategy=null
// }

// Bonus.prototype.setStrategy=function(strategy){
//   this.strategy=strategy
// }

// Bonus.prototype.setSalary=function(salary){
//   this.salary=salary
// }

// Bonus.prototype.getBonus=function(){
//   return this.strategy.calculate(this.salary)
// }

// var bonus=new Bonus()
// bonus.setSalary(1000)
// bonus.setStrategy(new performanceA())
// console.log(bonus.getBonus())

// js中
// var strategys={
//   'S':function(salary){
//     return salary*4
//   },
//   'A':function(salary){
//     return salary*2
//   }
// }

// var calculateBonus=function(strategy,salary){
//   return strategys[strategy](salary)
// }

// 缓动动画
var tween = {
  linear: function (t, b, c, d) {
    return (c * t) / d + b;
  },
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  strongEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  strongEaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  sineaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  sineaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
};

var Animate = function (dom) {
  this.dom = dom;
  this.startTime = 0;
  this.startPos = 0;
  this.endPos = 0;
  this.propertyName = null;
  this.easing = null;
  this.duration = null;
};

Animate.prototype.start = function (propertyName, endPos, duration, easing) {
  this.startTime = +new Date();
  this.startPos = this.dom.getBoundingClientRecr()[propertyName];
  this.propertyName = propertyName;
  this.ednPos = endPos;
  this.duration = duration;
  this.easing = tween[easing];

  var self = this;
  var timeId = setInterval(function () {
    if (self.step() === false) {
      clearInterval(timeId);
    }
  }, 19);
};

Animate.prototype.step = function () {
  var t = +new Date();
  if (t >= this.startTime + this.duration) {
    this.update(this.ednPos);
    return false;
  }
  var pos = this.easing(
    t - this.startTime,
    this.startPos,
    this.ednPos - this.startPos,
    this.duration
  );
  this.update(pos);
};

Animate.prototype.update = function (pos) {
  this.dom.style[this.propertyName] = pos + "px";
};
