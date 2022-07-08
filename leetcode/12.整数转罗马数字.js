/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
  const options={
    1:'I',
    5:'V',
    10:'X',
    50:'L',
    100:'C',
    500:'D',
    1000:'M'
  }
  let res = '',keys = Object.keys(options).reverse()
  for(let i=0;i<keys.length;i++){
    if(num<keys[i])continue
    let times = parseInt(num/keys[i])
    if(num===4||num===9){
      res+=options[(num+1)] +options[1]
      continue
    }
    if(num===40||num===90){
      res+=options[(num+10)] +options[10]
      continue
    }
    if(num===400||num===900){
      res+=options[(num+100)] + options[100]
      continue
    }
    num=num%keys[i]
    console.log(num)
    res+=options[keys[i]].repeat(times)
  }
  return res
};
// @lc code=end

