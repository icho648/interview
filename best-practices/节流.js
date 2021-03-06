function throttle(func, wait) {
	let timeout = null
	return () => {
		if (!timeout) {
			func()
			timeout = setTimeout(() => {
				timeout = null
			}, wait)
		}
	}
}

// 第四版
function throttle2(func, wait, options) {
	var timeout, context, args, result
	var previous = 0
	if (!options) options = {}

	var later = function () {
		previous = options.leading === false ? 0 : new Date().getTime()
		timeout = null
		func.apply(context, args)
		if (!timeout) context = args = null
	}

	var throttled = function () {
		var now = new Date().getTime()
		if (!previous && options.leading === false) previous = now
		var remaining = wait - (now - previous)
		context = this
		args = arguments
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			previous = now
			func.apply(context, args)
			if (!timeout) context = args = null
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining)
		}
	}
	return throttled
}
