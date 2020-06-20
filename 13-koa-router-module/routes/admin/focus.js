//admin focus 轮播图 router

const router=require("@koa/router")()

router.get("/",async (ctx)=>{
    ctx.body="focus index page"
})

router.get("/add",async (ctx)=>{
    ctx.body="add focus"
})

router.get("/edit",async (ctx)=>{
    ctx.body="edit focus"
})

router.get("/delete",async (ctx)=>{
    ctx.body="delete focus"
})

module.exports=router.routes()

