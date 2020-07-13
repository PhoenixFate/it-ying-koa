const { render } = require("art-template")

const router=require("@koa/router")()

// 后台路由
router.get("/",async (ctx)=>{
    await ctx.render("index")
})

router.get("/add",async (ctx)=>{
    ctx.body="user add /"
})

router.get("/edit",async (ctx)=>{
    ctx.body="user edit /"
})

router.get("/delete",async (ctx)=>{
    ctx.body="user delete /"
})

router.get("/list",async (ctx)=>{
    ctx.body="user list /"
})

module.exports=router.routes()