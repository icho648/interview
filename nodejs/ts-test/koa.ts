import koa from "koa"
import Router from "koa-router"

const app = new koa()
const router = new Router()

app.use(async (ctx, next) => {
	console.log("I am the first middleware")
	await next()
	console.log("first middleware end calling")
})

app.use(async (ctx, next) => {
	console.log("I am the second middleware")
	await next()
	console.log("second middleware end calling")
})

router.get("/api/test1", async (ctx, next) => {
	console.log("I am the router middleware => /api/test1")
	ctx.body = "hello"
})

router.get("/api/testerror", async (ctx, next) => {
	throw new Error("I am error.")
})

app.use(router.routes())

app.listen(3000)
console.log("server listening at port 3000")
