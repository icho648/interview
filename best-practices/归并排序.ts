function mergeSort(arr: number[]) {
	// 采用自上而下的递归方法
	const len = arr.length
	if (len < 2) {
		return arr
	}
	let middle = Math.floor(len / 2),
		left = arr.slice(0, middle),
		right = arr.slice(middle)
	return merge(mergeSort(left), mergeSort(right))

	function merge(left: number[], right: number[]) {
		const result: number[] = []

		while (left.length && right.length) {
			if (left[0] <= right[0]) {
				result.push(left.shift()!)
			} else {
				result.push(right.shift()!)
			}
		}

		if (left.length) result.push(...left)

		if (right.length) result.push(...right)

		return result
	}
}
