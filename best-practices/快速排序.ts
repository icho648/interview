function quickSort(arr: number[]) {
	function recursion(left: number, right: number) {
		if (left >= right) return
		let i = left
		let lb = left
		let rb = right
		while (left < right) {
			while (arr[right] >= arr[i] && left < right) {
				right--
			}
			if (left >= right) break
			;[arr[i], arr[right]] = [arr[right], arr[i]]
			i = right
			while (arr[left] <= arr[i] && left < right) {
				left++
			}
			if (left >= right) break
			;[arr[i], arr[left]] = [arr[left], arr[i]]
			i = left
		}
		recursion(lb, i - 1)
		recursion(i + 1, rb)
	}
	recursion(0, arr.length - 1)
	return arr
}
