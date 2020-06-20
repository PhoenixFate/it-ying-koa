const router=require("@koa/router")()

router.get("/news/list",(ctx)=>{
    ctx.body="news list"
})

router.get("/news/detail",(ctx)=>{
    ctx.body="news detail"
})

module.exports=router.routes()
