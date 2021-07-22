/*
 * @Description  :
 * @Author       : lihui
 * @Date         : 2021-07-16 10:15:33
 * @LastEditTime : 2021-07-16 17:57:47
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\设计模式\迭代模式.js
 */
//each
// var each=function(arr,callback){
//   for(var i=0,l=arr.length;i<l;i++){
//     callback.call(arr[i],i,arr[i])
//   }
// }

// each([1,2,3,4],function(i,item){
//   console.log(i,item)
// })
// 外部迭代器
// var Iterator=function(obj){
//   var current=0
//   var next=function(){
//     current+=1
//   }
//   var isDone=function(){
//     return current>=obj.length
//   }
//   var getCurrItem=function(){
//     return obj[current]
//   }

//   return {
//     next:next,
//     isDone:isDone,
//     getCurrItem:getCurrItem
//   }
// }

// var compare=function(iterator1,iterator2){
//   while(!iterator1.isDone()&&!iterator2.isDone()){
//     if(iterator1.getCurrItem()!==iterator2.getCurrItem){
//       throw new Error('不相等')
//     }
//     iterator1.next()
//     iterator2.next()
//   }
// }

// compare(Iterator([1,2,3]),Iterator([1,2,4]))

//迭代器实现 上传文件
//bad
var getUploadObj = function () {
  try {
    return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
  } catch (e) {
    if (supportFlash()) {
      // supportFlash 函数未提供
      var str = '<object type="application/x-shockwave-flash"></object>';
      return $(str).appendTo($("body"));
    } else {
      var str = '<input name="file" type="file"/>'; // 表单上传
      return $(str).appendTo($("body"));
    }
  }
};
//better
var getActiveUploadObj = function () {
  try {
    return new ActiveXObject("EXFTNActiveX.FTNUpload");
  } catch (e) {
    return false;
  }
};

var getFlashUploadObj = function () {
  if (supportFlash()) {
    var str = '<object type="application/x-shockwave-flash"></object>';
    return $(str).appendTo($("body"));
  }
  return false;
};

var getFormUpladObj = function () {
  var str = '<input name="file" type="file" class="ui-file"/>'; // 表单上传
  return $(str).appendTo($("body"));
};

var iteratorUploadObj = function () {
  for (var i = 0, fn; (fn = arguments[i++]); ) {
    var uploadObj = fn();
    if (uploadObj !== false) {
      return uploadObj;
    }
  }
};
var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUpladObj);

// if()
