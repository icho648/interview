/**
 * @description 在内部调用生成器函数，在result done之前递归调用next，有错误则reject，没有则将value传给一个新的promise，在onfulfilled中继续调用next。
 * done之后将返回值resolve。
 * @param {*} generatorFunc
 * @returns 生成器函数转化成的返回promise的函数
 */
function asyncToGenerator(generatorFunc) {
	return function () {
		const gen = generatorFunc.apply(this, arguments)
		return new Promise((resolve, reject) => {
			function step(key, arg) {
				let generatorResult
				try {
					generatorResult = gen[key](arg)
				} catch (error) {
					return reject(error)
				}
				const { value, done } = generatorResult
				if (done) {
					return resolve(value)
				} else {
					// Promise.resolve(value).then模拟await效果
					/**
           * await 表达式会暂停当前 async function 的执行，等待 Promise 处理完成。若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 async function。
            若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。
            另外，如果 await 操作符后的表达式的值不是一个 Promise，则返回该值本身。
           */
					return Promise.resolve(value).then(
						function onfulfilled(val) {
							/** 
              next()方法返回一个对象，这个对象包含两个属性：value 和 done，value 属性表示本次 yield 表达式的返回值，done 属性为布尔类型，
              表示生成器后续是否还有 yield 语句，即生成器函数是否已经执行完毕并返回。
              调用 next()方法时，如果传入了参数，那么这个参数会传给上一条执行的 yield语句左边的变量
              */
							//将val赋给 await 左边的变量，调用next继续执行
							step("next", val)
						},
						function onrejected(err) {
							step("throw", err)
						}
					)
				}
			}
			step("next")
		})
	}
}
