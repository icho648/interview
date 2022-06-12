function createBigData() {
	const bigData = []
	for (let j = 0; j < 100; j++) {
		bigData.push(new Array(10000).join("this_is_a_big_data"))
	}
	return bigData
}

function fn() {
	foo = createBigData() // 意外的全局变量导致内存泄漏
}
for (let j = 0; j < 100; j++) {
	fn()
}
