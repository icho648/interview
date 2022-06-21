var obj = {
	x: 100,
	show() {
		//调用了window.setTimeout,this指向window，没有x
		setTimeout(function () {
			console.log(this.x)
		}, 500)
	},
}
obj.show() //打印结果：undefined

var obj = {
	x: 100, //属性x
	show() {
		setTimeout(() => {
			//this是show中的this,show的this是obj
			console.log(this.x)
		}, 500)
	},
}
obj.show() //打印结果：100

var obj = {
	a: 5,
	fun: () => {
		//this是obj中的this，是global
		console.log(this)
	},
}
