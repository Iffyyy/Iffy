/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0,
    right = height.length - 1,
    max = 0;
  while (left < right) {
    const temp = (right - left) * Math.min(height[left], height[right]);
    if (temp > max) {
      max = temp;
    }
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return max;
};
// @lc code=end
