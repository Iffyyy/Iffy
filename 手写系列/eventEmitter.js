class EventEmitter{
  constructor(){
    events = {}
  }

  emit(event,...args){
    if(this.events[event]){
      const fns = [...this.events[event]]
      fns.forEach(fn=>{
        fn.apply(this,args)
      })
    }
  }

  on(event,cb){
    if(!this.events[event]){
      this.events[event] = []
    }
    this.events[event].push(cb)
  }

  off(event,cb){
    const events = this.events[event]
    const i =events.indexOf(cb)
    if(i!=-1){
      events.splice(i,1)
    }
  }

  once(event,cb){
    const wrap = (...args)=>{
      cb(...args)
      this.off(event,cb)
    }
    this.on(event,wrap)
  }
}