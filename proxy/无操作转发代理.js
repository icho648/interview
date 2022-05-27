let target = {}
/**
 * 使用了一个原生 JavaScript 对象，代理会将所有应用到它的操作转发到这个对象上。
 */
let p = new Proxy(target, {})

p.a = 37 // 操作转发到目标

console.log(target.a) // 37. 操作已经被正确地转发
