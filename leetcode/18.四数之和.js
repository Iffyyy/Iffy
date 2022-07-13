/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  nums.sort((a,b)=>a-b)
  let res = [],len=nums.length,set = new Set()
  for(let i=0;i<len;i++){
    for(let j = i+1;j<len;j++){
      let left = j+1,right=len-1
      while(left<right){
        let sum = nums[i]+nums[j]+nums[left]+nums[right]
        if(sum===target){
          const item = [nums[i],nums[j],nums[left],nums[right]]
          if(!set.has(item.toString())){
            set.add(item.toString())
            res.push(item)
          }
        }
        if(sum<target){
          left++
        }else{
          right--
        }
      }
    }
  }
  return res
};
// @lc code=end

