/**
 * 总结：全局变量持有了闭包作用域，释放之前被另一个闭包作用域内的变量持有了，释放时候全局变量又去持有了那个作用域
 *
 * 全局变量foo虽然没有直接引用闭包，但是由于函数内只有一个闭包作用域，间接持有了闭包
 * 来到下一个闭包时，新的bar又指向了foo, 即新的bar持有了原来的foo持有的闭包，然后foo->bar，形成循环引用链
 */

let foo = null
function outer() {
	let bar = foo
	function unused() {
		// 未使用到的函数
		console.log(`bar is ${bar}`)
	}

	foo = {
		// 给foo变量重新赋值
		bigData: new Array(100000).join("this_is_a_big_data"), // 如果这个对象携带的数据非常大，将会造成非常大的内存泄漏
		inner: function () {
			console.log(`inner method run`)
		},
	}
}
for (let i = 0; i < 1000; i++) {
	outer()
}

// 解决方法1：手动释放bar
// bar = null

// 解决方法2： 将bar变量定义在一个块级作用域内，这样outer函数中就没有定义变量了，自然inner也不会形成闭包
// {
// 	let bar = foo
// 	function unused() {
// 		// 未使用到的函数
// 		console.log(`bar is ${bar}`)
// 	}
// }
