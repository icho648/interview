/**
 * @description 将传入的函数链式调用
 * compose(fn1, fn2, fn3) (...args) = > fn1(fn2(fn3(...args)))
 * 每次迭代返回一个函数
 * @param funcs
 * @returns
 */
function compose(...funcs: Function[]) {
	return funcs.reduce(
		(previous, current) =>
			(...args) =>
				previous(current(...args))
	)
}
