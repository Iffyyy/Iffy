function debounce(func,wait,immediate){
  let timer = null
  return function(){
    let context  =this,args = arguments
    if(timer)clearTimeout(timer)
    if(immediate){
      if(!timer)func.apply(context,args)
      timer = setTimeout(()=>{
        timer = null
      },wait)
    }else{
      timer = setTimeout(()=>{
        func.apply(context,args)
      },wait)
    }
  }
}

function throttle(func,wait){
  let preTime = 0
  return function(){
    let context = this,args = arguments,nowTime = +new Date()
    if(nowTime-preTime>wait){
      func.apply(context,args)
      preTime = nowTime
    }
  }
}


function throttle1(func,wait){
  let timer = null
  return function(){
    let context = this,args = arguments
    if(!timer){
      setTimeout(()=>{
        timer = null
        func.apply(context,args)
      },wait)
    }
  }
}