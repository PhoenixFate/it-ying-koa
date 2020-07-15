const router=require("@koa/router")()
const tools=require("../../model/tool.js")

// 后台路由
router.get("/",async (ctx)=>{
    await ctx.render("admin/login")
})

router.post("/doLogin",async (ctx)=>{
    console.log(ctx.request.body)

    if(ctx.request.body.username=="admin"&&ctx.request.body.password=="123456"){
        ctx.session.username=ctx.request.body.usernam
        ctx.redirect("/admin")
    }
    

    ctx.body="用户名或者密码错误"
})

module.exports=router.routes()