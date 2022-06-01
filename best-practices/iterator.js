//可迭代对象都有@@iterator 方法，该方法挂载在可迭代对象的[Symbol.iterator]属性上，
//即[Symbol.iterator]属性指向@@iterator 方法的函数体，所以拥有@@iterator 方法的对象称为iterable对象。

/**
 * @description 简单迭代器
 * @param {*} array
 * @returns
 */
function makeIterator(array) {
	let nextIndex = 0
	return {
		next: function () {
			return nextIndex < array.length
				? {
						value: array[nextIndex++],
						done: false,
				  }
				: {
						done: true,
				  }
		},
	}
}

let it = makeIterator(["哟", "呀"])

console.log(it.next().value) // '哟'
console.log(it.next().value) // '呀'
console.log(it.next().done) // true

/**
 * @description 无穷迭代器
 * @returns
 */
function idMaker() {
	let index = 0
	return {
		next: function () {
			return {
				value: index++,
				done: false,
			}
		},
	}
}

it = idMaker()

console.log(it.next().value) // '0'
console.log(it.next().value) // '1'
console.log(it.next().value) // '2'

/**
 * 类中的迭代器
 */
class SimpleClass {
	constructor(data) {
		this.data = data
	}

	[Symbol.iterator]() {
		// Use a new index for each iterator. This makes multiple
		// iterations over the iterable safe for non-trivial cases,
		// such as use of break or nested looping over the same iterable.
		let index = 0

		return {
			next: () => {
				if (index < this.data.length) {
					return { value: this.data[index++], done: false }
				} else {
					return { done: true }
				}
			},
		}
	}
}

const simple = new SimpleClass([1, 2, 3, 4, 5])

for (const val of simple) {
	console.log(val) //'1' '2' '3' '4' '5'
}

/**
 * 生成器对象是迭代器，也是可迭代对象
 */
let aGeneratorObject = (function* () {
	yield 1
	yield 2
	yield 3
})()

typeof aGeneratorObject.next
// 返回"function", 因为有一个next方法，所以这是一个迭代器

typeof aGeneratorObject[Symbol.iterator]
// 返回"function", 因为有一个@@iterator方法，所以这是一个可迭代对象

aGeneratorObject[Symbol.iterator]() === aGeneratorObject
// 返回true, 因为@@iterator方法返回自身（即迭代器），所以这是一个格式良好的可迭代对象
;[...aGeneratorObject]
// 返回[1, 2, 3]

console.log(Symbol.iterator in aGeneratorObject)
// 返回true, 因为@@iterator方法是aGeneratorObject的一个属性
