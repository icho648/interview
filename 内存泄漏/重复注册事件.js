const events = require("events")
class Page extends events.EventEmitter {
	onShow() {
		for (let i = 0; i < 1000; i++) {
			this.on("ok", () => {
				console.log("on ok signal.")
			})
		}
	}
	onDestory() {}
}
let page = new Page()
page.setMaxListeners(0) // 设置可以注册多个同名事件
page.onShow()
page.onDestory()
//解决方式就是，在页面离开的时候移除所有事件，或者在页面创建的时候仅注册一次事件
