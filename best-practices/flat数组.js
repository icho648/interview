/**
 * @description let of 递归实现
 * @param {*} arr
 * @param {*} result
 * @returns
 */
function flatten(arr, result = []) {
  for (let item of arr) {
    if (Array.isArray(item)) flatten(item, result)
    else result.push(item)
  }
  return result
}

/**
 * @description 生成器实现 嵌套 yield 需要再加一个星号，这被称为生成器委托。
不能使用 forEach 代替 for...of 但可以用 for 循环，因为 for 循环和for...of 可以中断迭代去执行 yield，forEach 不行，有兴趣的读者可以自己尝试一下~

作者：云峰yf
链接：https://www.jianshu.com/p/b1fb3434e1f5
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 * @param {*} arr
 */
function* flat(arr) {
  for (let item of arr) {
    if (Array.isArray(item)) yield* flat(item)
    else yield item
  }
}

function flatten2(arr) {
  let result = []
  for (let val of flat(arr)) {
    result.push(val)
  }
  return result
}

/**
 * @description 使用reduce
 * @param {*} arr
 * @returns
 */
function flatten3(arr) {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    )
  }, [])
}

/**
 * @description 无递归数组扁平化，使用堆栈
注意：深度的控制比较低效，因为需要检查每一个值的深度
也可能在 shift / unshift 上进行 w/o 反转，但是末端的数组 OPs 更快
 * @param {*} input
 * @returns
 */
function flatten4(input) {
  const stack = [...input]
  const res = []
  while (stack.length) {
    // 使用 pop 从 stack 中取出并移除值
    const next = stack.pop()
    if (Array.isArray(next)) {
      // 使用 push 送回内层数组中的元素，不会改动原始输入
      stack.push(...next)
    } else {
      res.push(next)
    }
  }
  // 反转恢复原数组的顺序
  return res.reverse()
}
