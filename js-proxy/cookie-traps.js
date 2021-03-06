/** 
  var docCookies = ... get the "docCookies" object here:
  https://developer.mozilla.org/zh-CN/docs/DOM/document.cookie#A_little_framework.3A_a_complete_cookies_reader.2Fwriter_with_full_unicode_support
*/
var docCookies = new Proxy(docCookies, {
	get: function (oTarget, sKey) {
		return oTarget[sKey] || oTarget.getItem(sKey) || undefined
	},
	set: function (oTarget, sKey, vValue) {
		if (sKey in oTarget) {
			return false
		}
		return oTarget.setItem(sKey, vValue)
	},
	deleteProperty: function (oTarget, sKey) {
		if (sKey in oTarget) {
			return false
		}
		return oTarget.removeItem(sKey)
	},
	enumerate: function (oTarget, sKey) {
		return oTarget.keys()
	},
	ownKeys: function (oTarget, sKey) {
		return oTarget.keys()
	},
	has: function (oTarget, sKey) {
		return sKey in oTarget || oTarget.hasItem(sKey)
	},
	defineProperty: function (oTarget, sKey, oDesc) {
		if (oDesc && "value" in oDesc) {
			oTarget.setItem(sKey, oDesc.value)
		}
		return oTarget
	},
	getOwnPropertyDescriptor: function (oTarget, sKey) {
		var vValue = oTarget.getItem(sKey)
		return vValue
			? {
					value: vValue,
					writable: true,
					enumerable: true,
					configurable: false,
			  }
			: undefined
	},
})

/* Cookies 测试 */

alert((docCookies.my_cookie1 = "First value"))
alert(docCookies.getItem("my_cookie1"))

docCookies.setItem("my_cookie1", "Changed value")
alert(docCookies.my_cookie1)
