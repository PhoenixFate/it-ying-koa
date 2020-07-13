const router=require("@koa/router")()

// api路由
router.get("/",async (ctx)=>{
    ctx.body="api /"
})

module.exports=router.routes()