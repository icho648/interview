/**
 * @description 
 * ***总之就是先把this保存为self，然后在包装函数里把context传给self.call()***
 * bind() 函数会创建一个新的绑定函数（bound function，BF）。绑定函数是一个 exotic function object（怪异函数对象，ECMAScript 2015 中的术语），它包装了原函数对象。调用绑定函数通常会导致执行包装函数。
绑定函数具有以下内部属性：
[[BoundTargetFunction]] - 包装的函数对象
[[BoundThis]] - 在调用包装函数时始终作为 this 值传递的值。
[[BoundArguments]] - 列表，在对包装函数做任何调用都会优先用列表元素填充参数列表。
[[Call]] - 执行与此对象关联的代码。通过函数调用表达式调用。内部方法的参数是一个this值和一个包含通过调用表达式传递给函数的参数的列表。
当调用绑定函数时，它调用 [[BoundTargetFunction]] 上的内部方法 [[Call]]，就像这样 Call(boundThis, args)。其中，boundThis 是 [[BoundThis]]，args 是 [[BoundArguments]] 加上通过函数调用传入的参数列表。

绑定函数也可以使用 new 运算符构造，它会表现为目标函数已经被构建完毕了似的。提供的 this 值会被忽略，但前置参数仍会提供给模拟函数。
 * @param {*} context
 * @returns
 */
Function.prototype.bind2 = function (context) {
	if (typeof this !== "function") {
		throw new Error(
			"Function.prototype.bind - what is trying to be bound is not callable"
		)
	}

	var self = this
	var args = Array.prototype.slice.call(arguments, 1)

	var fNOP = function () {}

	var fBound = function () {
		var bindArgs = Array.prototype.slice.call(arguments)
		return self.apply(
			this instanceof fNOP ? this : context,
			args.concat(bindArgs)
		)
	}

	fNOP.prototype = this.prototype
	fBound.prototype = new fNOP()
	return fBound
}
