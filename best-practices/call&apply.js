Function.prototype.call2 = function (context) {
	context.fn = this
	var args = []
	for (var i = 1; i < arguments.length; i++) {
		args.push("arguments[" + i + "]")
	}
	var result = eval("context.fn(" + args + ")")
	delete context.fn
	return result
}

Function.prototype.call3 = function (context, ...args) {
	context.fn = this
	var result = context.fn(...args)
	delete context.fn
	return result
}

Function.prototype.apply2 = function (context, arr) {
	var context = Object(context) || window
	context.fn = this

	var result
	if (!arr) {
		result = context.fn()
	} else {
		var args = []
		for (var i = 0, len = arr.length; i < len; i++) {
			args.push("arr[" + i + "]")
		}
		result = eval("context.fn(" + args + ")")
	}

	delete context.fn
	return result
}
