class DeepClone {
	constructor() {
		this.cacheList = []
	}
	clone(source) {
		if (source instanceof Object) {
			const cache = this.findCache(source) // 如果找到缓存，直接返回
			if (cache) return cache
			else {
				let target
				if (target instanceof Array) {
					target = new Array()
				} else if (target instanceof Function) {
					target = function () {
						return source.apply(this, arguments)
					}
				} else if (target instanceof Date) {
					target = new Date(source)
				} else if (target instanceof RegExp) {
					target = new RegExp(source.source, source.flags)
				} else {
					target = new Object() // 不要忘记普通对象
				}

				this.cacheList.push([source, target]) // 把原对象和新对象放进缓存列表
				for (let key in source) {
					if (source.hasOwnProperty(key)) {
						// 不拷贝原型上的属性，浪费内存
						target[key] = this.clone(source[key]) // 递归
					}
				}
				return target
			}
		} else {
			return source
		}
	}
	findCache(source) {
		for (let i = 0; i < this.cacheList.length; ++i) {
			if (this.cacheList[i][0] === source) {
				return this.cacheList[i][1]
			}
		}
	}
}
