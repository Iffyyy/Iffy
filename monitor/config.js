/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2022-03-11 16:51:23
 * @LastEditTime : 2022-03-11 16:59:21
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\monitor\config.js
 */
export const defaultInfo = {
  fromCode:{
    name:'代码错误',
    total:0,
    SyntaxError:{
      name: '语法错误',
      total: 0,
      list:[]
    },
    TypeError:{
      name: '类型错误',
      total: 0,
      list:[]
    },
    ReferenceError:{
      name: '未声明的错误',
      total: 0,
      list:[]
    },
    RangeError:{
      name: '内存溢出',
      total: 0,
      list:[]
    },
  },
  fromNetWork:{
    name:'网络错误',
    total:0,
    ResourceError:{

    }
  }
}