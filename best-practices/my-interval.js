function mySetInterval(fn, time) {
	const ref = {}
	if (typeof fn === "function") {
		const exec = () => {
			return setTimeout(() => {
				fn()
				ref.id = exec()
			}, time)
		}
		ref.id = exec()
		return ref
	}
}

function myClearInterval(ref) {
	clearTimeout(ref.id)
}
