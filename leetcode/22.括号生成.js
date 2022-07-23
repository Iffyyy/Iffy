/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  const result = []

  function generate(left,right,str){
    if(left===n&&right===n)return result.push(str)
    if(left<n)generate(left+1,right,str+'(')
    if(right<left)generate(left,right+1,str+')')
  }

  generate(0,0,'')
  return result
};
// @lc code=end

