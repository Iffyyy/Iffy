function deepClone(obj = {},map=new Map()){
  if(typeof obj != 'object'){
    return obj
  }
  if(map.get(obj)){
    return map.get(obj)
  }
  let result = {}
  if(obj instanceof Array||obj.prototype.toString.call(obj)==='[object Array]'){
    result = []
  }
  map.set(obj,result)
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      result[key]=deepClone(obj[key],map)
    }
  }
  return result
}