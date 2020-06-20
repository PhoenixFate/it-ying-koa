const router=require("@koa/router")()

router.get("/",async (ctx)=>{
    await ctx.render("front/index")
})

//注意，如果父路由是/，则子路由不需要写/
router.get("case",async (ctx)=>{
    await ctx.render("front/case")
})

router.get("about",async (ctx)=>{
    await ctx.render("front/about")
})

module.exports=router.routes()
