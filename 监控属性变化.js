/**
 * @description 使用defineProperty
 * @param {*} obj
 * @param {*} name
 * @param {*} func
 */
function watch(obj, name, func) {
	var value = obj[name]

	Object.defineProperty(obj, name, {
		get: function () {
			return value
		},
		set: function (newValue) {
			value = newValue
			func(value)
		},
	})

	if (value) obj[name] = value
}

/**
 * @description 使用Proxy
 * @param {*} target
 * @param {*} func
 * @returns
 */
function watch2(target, func) {
	var proxy = new Proxy(target, {
		get: function (target, prop) {
			return target[prop]
		},
		set: function (target, prop, value) {
			target[prop] = value
			func(prop, value)
		},
	})

	return proxy
}
