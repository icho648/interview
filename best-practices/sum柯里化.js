// 确定参数的函数柯里化实现

function sum(a, b, c, d) {
  return a + b + c + d
}
function curry(fn) {
  return function sum(...args) {
    if (args.length < fn.length) { // 判断接受的参数是否小于函数的参数长度
      return function () {  // 参数不够长度，再次接受传递参数
        return sum(...args, ...arguments)
      }
    }
    return fn(...args)// 不要求改变this,
  }
}
let curried = curry(sum)
console.log(curried(1)(2)(3)(4))//10
console.log(curried(1, 2)(2, 4))//9