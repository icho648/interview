var wsSocket
//通过websocket来通信
if (!!window.WebSocket && (wsSocket = window.WebSocket)) {
	try {
		/*
		 * 实例一个WebSocket对象并传入要连接的URL
		 * 需要注意的是，必须要给WebSocket构造函数传入绝对的URL，同源策略对WebSocket不适用，因此可以通过它打开到任何站点的链接，至于是否会给某个域中的页面通信，完全取决于服务器
		 * */
		ws = new wsSocket("ws://localhost:3020/JA/server") //var wsSocket;
		/*
		 * 实例化了WebSocket对象后，浏览器就会马上尝试建立连接，与XHR相似，WebSocket也有一个表示当前状态的ReadyState属性，不过这个属性与XHR不同
		 * WebSocket.onOpen(0):正在建立连接
		 * WebSocket.open(1):已经建立连接
		 * WebSocket.closing(2):正在关闭连接
		 * WebSocket.close(3):已经关闭连接
		 * WebSocket没有readyStateChange事件，不过，它还有其他事件，对应中而不同的状态，readyState的永远从0开始
		 *
		 * 要关闭WebSocket方法，可以在任何事件调用close方法
		 * socket.close()
		 * 调用close()之后，readyState的值立刻编程2，然后关闭连接后变成3
		 * */
		ws.onopen = function (event) {
			ws.type = "ws" //非加密的webSocket连接
			send("Test", function (data) {
				//发送数据 send()中可以传入任意字符串
				cosnsole.log("正在建立连接")
			})
		}
		//关闭WebSocket连接，ws置为undefined
		ws.onclose = function (event) {
			ws = undefined
		}
		//在发生错误是触发，连接不能持续，ws置为undefined
		ws.onerror = function (event) {
			ws = undefined
			console.log("通信发出错误")
		}
		/*
		 * 因为WebSocket只能通过连接发送纯文本数据，所以对于复杂的数据结构，在链接发送之前，必须进行序列化然后在发送到服务器
		 * socket.send(JSON.stringify(message));
		 * 接下来服务器要读取其中的数据，就要解析收到的JSON字符串
		 * */

		//当服务器向客户端发来信息时，WebSocket对象就会触发onMessage事件，
		// 这个message事件与其他传递消息的协议类似，也是把返回值保留在event.data中

		ws.onmessage = function (event) {
			var data
			try {
				data = JSON.parse(event.data)
			} catch (e) {
				console.log("exception==>" + event.data + "----" + e)
			}
		}
	} catch (e) {}
}
