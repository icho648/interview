function calculate(s: string) {
	let operator = ""
	let result = NaN
	let temp = ""
	for (const i of s) {
		if (i === "+" || i === "-") {
			add()
			operator = i
			temp = ""
		} else {
			temp += i
		}
	}
	add()

	function add() {
		if (Number.isNaN(result)) {
			result = Number(temp)
		} else {
			if (operator === "+") {
				result += Number(temp)
			} else {
				result -= Number(temp)
			}
		}
	}
	return result
}
