const router=require("@koa/router")()
const url=require("url")

// 配置中间件 获取url的地址
router.use(async (ctx,next)=>{
    //模板引擎配置全局变量
    ctx.state.HOST="http://"+ctx.request.header.host
    let pathname=url.parse(ctx.request.url).pathname.substring(1) //去掉最开头的 /
    console.log(pathname)
    let urlSplit=pathname.split("/")
    //配置全局信息
    ctx.state.G={
        url:urlSplit,
        userinfo:ctx.session.userinfo,
        previousPage:ctx.request.headers["referer"]  //上一页的地址
    }

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
const login=require("./admin/login")
const index=require("./admin/index")
const user=require("./admin/user")
const manager=require("./admin/manager")
const category=require("./admin/category")
const article=require("./admin/article")

router.use(index)
router.use('/login',login)
router.use('/user',user)
router.use("/manager",manager)
router.use("/category",category)
router.use("/article",article)


module.exports=router.routes()