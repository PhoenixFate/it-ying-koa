const Koa=require("koa")
const router=require("@koa/router")()
const render=require("koa-art-template")
const path=require("path")
const static=require("koa-static")

var app=new Koa();

//配置静态路由的中间件
app.use(static(__dirname+"/public"))


//引入子路由
const admin=require("./routes/admin")
const api=require("./routes/api")
const front=require("./routes/front")
//配置子路由/层级路由
router.use('/admin',admin)
router.use('/api',api)
router.use(front)



//配置模板引擎
render(app,{
    root:path.join(__dirname,"view"),
    extname:".html",
    debug:process.env.NODE_ENV!=='production'
})

//启动路由
app.use(router.routes())
app.use(router.allowedMethods())





app.listen(3521)
