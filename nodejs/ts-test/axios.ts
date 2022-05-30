import axios from "axios"

axios.interceptors.request.use(
	(config) => {
		console.log("请求拦截器")
		// 在发送请求前处理配置，并返回处理后的配置
		return config
	},
	(error) => {
		// 发生错误时
		return Promise.reject(error)
	}
)

axios.interceptors.response.use(
	(response) => {
		console.log("响应拦截器")
		// 对响应数据做处理，并返回处理后的数据
		return response
	},
	(error) => {
		// 发生错误时
		return Promise.reject(error)
	}
)
