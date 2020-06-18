

//引入koa模块
var Koa = require("koa")
//引入和实例化router
var router = require("@koa/router")()


//实例化app
var app = new Koa()

router.get("/", async (ctx) => {
    ctx.body = "index page 首页信息"
})

router.get("/news", async (ctx) => {
    ctx.body = "news page 新闻页面"
})

//获取get传值
//http://localhost:3007/newsDetail?aid=20
router.get("/newsDetail", async (ctx) => {

    /*
    在koa2中 
    通过query、querystring 接受get传参    
    query 返回的时格式化好的参数对象
    querystring 返回的是请求字符串

    */
    console.log(ctx.query) //{ aid: '20' }
    console.log(ctx.querystring) //aid=20

    //通过request接受get参数
    console.log(ctx.request)
    console.log(ctx.request.url)
    console.log(ctx.url)
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)

    ctx.body = "news detail 新闻详情"
})



//动态路由
router.get("/newsDetail/:aid", async (ctx) => {
    //获取动态路由的传值
    console.log("")
    console.log(ctx.params)
    ctx.body = "动态路由页面"
})



//启动路由
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3007)