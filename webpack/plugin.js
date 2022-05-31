class HelloWorldPlugin {
	apply(compiler) {
		compiler.hooks.done.tap(
			"Hello World Plugin",
			(stats /* 绑定 done 钩子后，stats 会作为参数传入。 */) => {
				console.log("Hello World!")
			}
		)
	}
}

class HelloCompilationPlugin {
	apply(compiler) {
		// 指定一个挂载到 compilation 的钩子，回调函数的参数为 compilation 。
		compiler.hooks.compilation.tap("HelloCompilationPlugin", (compilation) => {
			// 现在可以通过 compilation 对象绑定各种钩子
			compilation.hooks.optimize.tap("HelloCompilationPlugin", () => {
				console.log("资源已经优化完毕。")
			})
		})
	}
}
class HelloAsyncPlugin {
	apply(compiler) {
		compiler.hooks.emit
			.tapAsync("HelloAsyncPlugin", (compilation, callback) => {
				// 执行某些异步操作...
				setTimeout(function () {
					console.log("异步任务完成...")
					callback()
				}, 1000)
			})
			.compiler.hooks.emit.tapPromise("HelloAsyncPlugin", (compilation) => {
				// 返回一个 promise ，异步任务完成后 resolve
				return new Promise((resolve, reject) => {
					setTimeout(function () {
						console.log("异步任务完成...")
						resolve()
					}, 1000)
				})
			})
	}
}

class FileListPlugin {
	static defaultOptions = {
		outputFile: "assets.md",
	}

	// 需要传入自定义插件构造函数的任意选项
	//（这是自定义插件的公开API）
	constructor(options = {}) {
		// 在应用默认选项前，先应用用户指定选项
		// 合并后的选项暴露给插件方法
		// 记得在这里校验所有选项
		this.options = { ...FileListPlugin.defaultOptions, ...options }
	}

	apply(compiler) {
		const pluginName = FileListPlugin.name

		// webpack 模块实例，可以通过 compiler 对象访问，
		// 这样确保使用的是模块的正确版本
		// （不要直接 require/import webpack）
		const { webpack } = compiler

		// Compilation 对象提供了对一些有用常量的访问。
		const { Compilation } = webpack

		// RawSource 是其中一种 “源码”("sources") 类型，
		// 用来在 compilation 中表示资源的源码
		const { RawSource } = webpack.sources

		// 绑定到 “thisCompilation” 钩子，
		// 以便进一步绑定到 compilation 过程更早期的阶段
		compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
			// 绑定到资源处理流水线(assets processing pipeline)
			compilation.hooks.processAssets.tap(
				{
					name: pluginName,

					// 用某个靠后的资源处理阶段，
					// 确保所有资源已被插件添加到 compilation
					stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
				},
				(assets) => {
					// "assets" 是一个包含 compilation 中所有资源(assets)的对象。
					// 该对象的键是资源的路径，
					// 值是文件的源码

					// 遍历所有资源，
					// 生成 Markdown 文件的内容
					const content =
						"# In this build:\n\n" +
						Object.keys(assets)
							.map((filename) => `- ${filename}`)
							.join("\n")

					// 向 compilation 添加新的资源，
					// 这样 webpack 就会自动生成并输出到 output 目录
					compilation.emitAsset(this.options.outputFile, new RawSource(content))
				}
			)
		})
	}
}
module.exports = { FileListPlugin }
