//引入 koa模块
var Koa = require("koa")

var Router = require("@koa/router")

//实例化
var app = new Koa()
var router = new Router()


//配置路由
router.get("/", async (ctx) => {
    // 返回数据
    ctx.body = "index page"
}).get('/news', async (ctx) => {
    ctx.body = "news page"
})


// 启动路由
app.use(router.routes())  //启动路由
.use(router.allowedMethods()) 

/*
router.allowedMethods()
当所有路由中间件最后调用时，自动ctx.status设置response响应头
*/

app.listen(3006)
