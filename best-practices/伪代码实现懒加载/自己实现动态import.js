console.log("init")
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

importModule("./2.js").then((m) => {
  console.log(m)
})
