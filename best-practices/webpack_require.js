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

/* src/a.js */
export function funcA() {
	console.log("in funcA")
}

/* src/index.js */
import { funcA } from "./a"

export function funcB() {
	funcA()
	console.log("in funcB")
}
/**
 * @description 自执行函数，第一个return从Index文件开始，把定义的webpack_require传给index的模块函数，让它在内部替换import。
 * 自执行函数的Modules参数被webpack_require闭包引用，webpack_require在遇到对应的id时直接去缓存再从modules里面找。
 * installedModules缓存了id和对应的导出数据
 */
var WebpackTest2 = (function (modules) {
	// webpackBootstrap
	// The module cache
	var installedModules = {}
	// The require function
	function __webpack_require__(moduleId) {
		// Check if module is in cache
		if (installedModules[moduleId]) {
			return installedModules[moduleId].exports
		}
		// Create a new module (and put it into the cache)
		var module = (installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {},
		})
		// Execute the module function
		modules[moduleId].call(
			module.exports,
			module,
			module.exports,
			__webpack_require__
		)
		// Flag the module as loaded
		module.l = true
		// Return the exports of the module
		return module.exports
	}
	// define getter function for harmony exports
	__webpack_require__.d = function (exports, name, getter) {
		if (!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter })
		}
	}
	// define __esModule on exports
	__webpack_require__.r = function (exports) {
		if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" })
		}
		Object.defineProperty(exports, "__esModule", { value: true })
	}
	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function (object, property) {
		return Object.prototype.hasOwnProperty.call(object, property)
	}

	// Load entry module and return exports
	return __webpack_require__((__webpack_require__.s = "./src/index.js"))
})(
	/************************************************************************/
	{
		"./src/a.js": function (module, __webpack_exports__, __webpack_require__) {
			__webpack_require__.r(__webpack_exports__)
			__webpack_require__.d(__webpack_exports__, "funcA", function () {
				return funcA
			})
			function funcA() {
				console.log("in funcA")
			}
		},

		"./src/index.js": function (
			module,
			__webpack_exports__,
			__webpack_require__
		) {
			__webpack_require__.r(__webpack_exports__)
			__webpack_require__.d(__webpack_exports__, "funcB", function () {
				return funcB
			})
			//在这里把import改写
			var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/a.js")
			function funcB() {
				Object(_a__WEBPACK_IMPORTED_MODULE_0__["funcA"])()
				console.log("in funcB")
			}
		},
	}
)
