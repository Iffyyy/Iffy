Function.prototype.myCall = function (context) {
  if (typeof this !== "function") {
    console.error("type error");
  }

  let args = [...arguments].slice(1),
    result;
  context = context || window;
  context.fn = this;
  result = context.fn(...args);
  delete context.fn;
  return result;
};

Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    console.error("type error");
  }

  let result;
  context = context || window;
  context.fn = this;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    console.error("type error");
  }
  var args = [...arguments].slice(1);
  fn = this;
  return function Fn() {
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};

function myNew(context){
  const obj = {}
  obj.__proto__=context.prototype
  const res = context.apply(obj,[...arguments].slice(1))
  return typeof res==='object'?res:obj
}