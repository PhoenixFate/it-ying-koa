const router=require("@koa/router")()

// 配置中间件 获取url的地址
router.use(async (ctx,next)=>{
    //模板引擎配置全局变量
    ctx.state.HOST="http://"+ctx.request.header.host
    ctx.state.ROOT="http://"+ctx.request.header.host
    // 所有的路由都会经过中间件
    //在此处判断是否登录
    if(ctx.session.userinfo || ctx.url.startsWith("/admin/login")){
        await next()
    }else {
        //跳转到登录页面
        ctx.redirect("/admin/login")
    }
})

// 后台路由
router.get("/",async (ctx)=>{
    await ctx.render("admin/index")
})

const login=require("./admin/login")
const user=require("./admin/user")
router.use('/login',login)
router.use('/user',user)
module.exports=router.routes()