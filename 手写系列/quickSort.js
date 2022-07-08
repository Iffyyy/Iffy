function quickSort(start,end,nums){
  if(start<end){
    const mid = sort(start,end,nums)
    quickSort(start,mid-1)
    quickSort(mid+1,end,nums)
  }
}
function sort(start,end,arr){
  let left = start,right = end,base=arr[start]
  while(left!=right){
    while(arr[right]>=base&&right>left){
      right--
    }
    arr[left]=arr[right]
    while(arr[left]<base&&right>left){
      left--
    }
    arr[right]=arr[left]
  }
  arr[left] = base
  return left
}

function mySort(nums){
  quickSort(0,nums.length-1,nums)
  return nums
}