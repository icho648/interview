/**
 * @description 返回一个promise，在promise中创建script element，element text content为从url中导入模块，并将*赋给window.name
 * script onload之后用window.name的值resolve，然后delete window.name，element.remove, error则reject
 * 最后在dom中挂载这个script
 * @param {*} url
 * @returns
 */
function importModule(url) {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script")
		const tempGlobal =
			"__tempModuleLoadingVariable" + Math.random().toString(32).substring(2)
		script.type = "module"
		script.textContent = `import * as m from "${url}"; window.${tempGlobal} = m;`

		script.onload = () => {
			resolve(window[tempGlobal])
			delete window[tempGlobal] //delete只是断开引用，不包含内存释放
			script.remove()
		}

		script.onerror = () => {
			reject(new Error("Failed to load module script with URL " + url))
			delete window[tempGlobal]
			script.remove()
		}

		document.documentElement.appendChild(script)
	})
}

importModule("lazy-module.js").then((m) => {
	console.log(m)
})
