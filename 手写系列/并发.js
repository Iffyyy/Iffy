class Scheduler {
  constructor(){
    this.waitTasks = []
    this.excuteTasks = []
    this.maxTask = 2
  }
  add(promiseMaker) {
    if(this.excuteTasks.length<this.maxTask ){
      this.run(promiseMaker)
    }else{
      this.waitTasks.push(promiseMaker)
    }
  }

  run(promiseMaker){
    const index = this.excuteTasks.push(promiseMaker) - 1
    promiseMaker().then(()=>{
      this.excuteTasks.splice(index,1)
      if(this.waitTasks.length){
        this.run(this.waitTasks.shift())
      }
    })

  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
// output：2 3 1 4
// 一开始，1，2两个任务进入队列。
// 500ms 时，2完成，输出2，任务3入队。
// 800ms 时，3完成，输出3，任务4入队。
// 1000ms 时，1完成，输出1。