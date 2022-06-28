/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] Z 字形变换
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  if(!s||s.length<numRows)return s
  const arr=new Array(numRows)
  let r=0,c=0,up=1
  for(let i=0;i<s.length;i++){
    if(!arr[r])arr[r]=[]
    arr[r][c]=s[i]
    if(r==0||r==numRows-1){
      up=!up
    }
    if(up){
      r--
      c++
    }else{
      r++
    }
  }
  let res = ''
  for(let i=0;i<arr.length;i++){
    for(let j=0;j<arr[i].length;j++){
      if(arr[i][j]){
        res+=arr[i][j]
      }
    }
  }
  return res
};
// @lc code=end

