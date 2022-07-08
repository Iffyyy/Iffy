/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits || !digits.length) return [];
  const keyMap = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  const newArr = digits.split("").map((item) => keyMap[Number(item)]);

  let arr1 = newArr.shift();
  let arr2 = [];
  while (newArr.length) {
    arr2 = newArr.shift();
    let temp = [];
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        temp.push(arr1[i] + arr2[j]);
      }
    }
    arr1 = temp;
  }
  return arr1;
};
// @lc code=end
