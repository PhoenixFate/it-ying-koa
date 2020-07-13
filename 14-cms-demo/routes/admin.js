const router=require("@koa/router")()


// 配置中间件 获取url的地址
router.use(async (ctx,next)=>{
    console.log(ctx.request)
    console.log(ctx.request.header.host) //http://localhost:3000
    //模板引擎配置全局变量
    ctx.state.HOST="http://"+ctx.request.header.host
    await next()
})



// 后台路由
router.get("/",async (ctx)=>{
    ctx.body="admin /"
})

const login=require("./admin/login")
const user=require("./admin/user")
router.use('/login',login)
router.use('/user',user)

module.exports=router.routes()