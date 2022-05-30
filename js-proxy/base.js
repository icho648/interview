/**
 * 当对象中不存在属性名时，默认返回值为 37
 */
const handler = {
	get: function (obj, prop) {
		return prop in obj ? obj[prop] : 37
	},
}

const p = new Proxy({}, handler)
p.a = 1
p.b = undefined

console.log(p.a, p.b) // 1, undefined
console.log("c" in p, p.c) // false, 37
