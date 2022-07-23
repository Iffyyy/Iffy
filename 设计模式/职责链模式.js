// 坏味道
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

// 推荐
Function.prototype.after = function (fn) {
  var _this = this;
  return function () {
    var ret = _this.apply(this.arguments);
    fn.apply(this, arguments);
    return ret;
  };
};

// 职责链模式
var getActiveUploadObj = function () {
  try {
    return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
  } catch (e) {
    return "nextSuccessor";
  }
};

var getFlashUploadObj = function () {
  if (supportFlash()) {
    var str = '<object type="application/x-shockwave-flash"></object>';

    return $(str).appendTo($("body"));
  }

  return "nextSuccessor";
};

var getFormUpladObj = function () {
  return $('<form><input name="file" type="file"/></form>').appendTo($("body"));
};

var getUploadObj = getActiveUploadObj
  .after(getFlashUploadObj)
  .after(getFormUpladObj);

console.log(getUploadObj());