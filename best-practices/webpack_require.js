// 自执行函数
/**
 * @description 将各个模块包裹成函数，将函数们传给自执行函数。
 * 在自执行函数中设置一个cache，
 * 在自执行函数中定义require方法，接受一个模块名
 * 通过函数们[模块名]找到对应的模块函数
 * 在require中新建一个module传入模块函数中并执行，
 * 在模块函数中使用将export的内容赋给该module参数，并在cache中储存该module，
 * require方法最后返回该module的exports
 * 自执行函数返回require主模块的结果
 */
var WebpackTest = (function (modules) {
	// 用于储存已经加载过的模块
	var installedModules = {}

	// 加载主模块
	return require("main")

	function require(moduleName) {
		if (installedModules[moduleName]) {
			return installedModules[moduleName].exports
		}

		var module = (installedModules[moduleName] = {})
		modules[moduleName](module, require)

		return module.exports
	}
})({
	main: function (module, require) {
		var addModule = require("./add")
		console.log(addModule.add(1, 1))

		var squareModule = require("./square")
		console.log(squareModule.square(3))
	},
	"./add": function (module, require) {
		console.log("加载了 add 模块")
		module.exports = {
			add: function (x, y) {
				return x + y
			},
		}
	},
	"./square": function (module, require) {
		console.log("加载了 square 模块")

		var multiply = require("./multiply")
		module.exports = {
			square: function (num) {
				return multiply.multiply(num, num)
			},
		}
	},
	"./multiply": function (module, require) {
		console.log("加载了 multiply 模块")

		module.exports = {
			multiply: function (x, y) {
				return x * y
			},
		}
	},
})
