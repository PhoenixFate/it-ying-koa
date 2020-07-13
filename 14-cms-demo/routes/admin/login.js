const router=require("@koa/router")()

// 后台路由
router.get("/",async (ctx)=>{
    await ctx.render("admin/login")
})

module.exports=router.routes()