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
var intToRoman = function (num) {
  const options = {
    1: "I",
    4:'IV',
    5: "V",
    9:'IX',
    10: "X",
    40:'XL',
    50: "L",
    90:'XC',
    100: "C",
    400: "CD",
    500: "D",
    900: "CM",
    1000: "M",
  };
  let res = "",
    keys = Object.keys(options).reverse();
  for (let i = 0; i < keys.length; i++) {
    if (num < keys[i]) continue;
    let times = parseInt(num / keys[i]);
    num = num % keys[i];
    res += options[keys[i]].repeat(times);
  }
  return res;
};
// @lc code=end
