const Koa=require("koa")
const router=require("@koa/router")()
const render=require("koa-art-template")
const path=require("path")
//引入子路由
var admin=require("./routes/admin")
var api=require("./routes/api")
var front=require("./routes/front")

var app=new Koa();

//配置模板引擎
render(app,{
    root:path.join(__dirname,"views"),
    extname:".html",
    debug:process.env.NODE_ENV!=='production'
})

//启动路由
app.use(router.routes())
app.use(router.allowedMethods())

//配置子路由/层级路由
router.use('/',front)
router.use('/admin',admin)
router.use('/api',api) //在模块里面暴露路由并且启动路由


app.listen(3021)
