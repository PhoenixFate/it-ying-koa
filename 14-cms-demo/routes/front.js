const router=require("@koa/router")()

// 前台路由
router.get("/",async (ctx)=>{
    ctx.body="index /"
})

module.exports=router.routes()