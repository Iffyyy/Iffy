/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function(head, n) {
  if(!head)return head
  const map = new Map()
  let current = head
  let i = 0
  while(current){
    map.set(++i,current)
    current = current.next
  }
  const index = i-n
  let preNode = head
  if(index){
    preNode = map.get(index)
    const curNode = preNode.next
    preNode.next = curNode.next
    curNode.next = null
  }else{
    if(head.next){
        head = head.next
    }else{
        head = null
    }
  }
  return head
};
// @lc code=end

