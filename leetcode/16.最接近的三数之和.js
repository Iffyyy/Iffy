/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  let res = Infinity,len=nums.length
  nums.sort((a,b)=>a-b)
  for(let i=0;i<len;i++){
    let left=i+1,right=len-1
    while(left<right){
      if(res ===target)return res
      let sum = nums[i]+nums[left]+nums[right]
      if(Math.abs(sum-target)<Math.abs(res-target)){
        res = sum
      }
      if(sum<target){
        left++
      }else{
        right-- ;
      }
    }
  }
  return res
};
// @lc code=end

