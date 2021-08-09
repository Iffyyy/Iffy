/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2021-07-20 11:00:24
 * @LastEditTime : 2021-07-23 14:54:12
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\设计模式\命令模式.js
 */

var setCommand=function(button,command){
  button.onclick=function(){
    command.execute()
  }
}

var MenuBar={
  refresh:function(){
    console.log('refresh')
  }
}

var RefreshMenuBarCommand=function(reciever){
  return {
    execute:function(){
      reciever.refresh()
    }
  }
}

var refreshMenuBarCommand=RefreshMenuBarCommand(MenuBar)

setCommand(button1,refreshMenuBarCommand)
