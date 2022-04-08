/*
 * @Description  : 
 * @Author       : lihui
 * @Date         : 2022-03-25 17:00:20
 * @LastEditTime : 2022-03-25 17:18:28
 * @LastEditors  : lihui
 * @FilePath     : d:\workspace\myprojects\Iffy\node\git.js
 */
const simpleGit = require('simple-git')

const git = simpleGit();

const init = async () => {
  const status = await git.status();
  console.log(status)
  // console.log(status.tracking) //分支名称
}
init()