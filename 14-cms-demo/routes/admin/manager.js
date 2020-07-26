const router = require("@koa/router")()
const db=require("../../model/db")
const tools=require("../../model/tool")

// 后台路由
router.get("/index", async (ctx) => {
    let managerList=await db.find("user",{})
    await ctx.render("admin/manager/index",{
        managerList:managerList
    })
})

router.get("/add", async (ctx) => {
    await ctx.render("admin/manager/add")
})

router.post("/doAdd",async(ctx)=>{
    //1.获取表单提交的数据
    let username=ctx.request.body.username
    let password=ctx.request.body.password
    let rpassword=ctx.request.body.rpassword
    let phone=ctx.request.body.phone
    let address=ctx.request.body.address
    //username不合法，则跳转到error页面
    if(!/^\w{4,20}/.test(username)){
        await ctx.render("admin/error",{
            message:"用户名不合法",
            redirect:ctx.state.HOST+"/admin/manager/add"
        })
    }else if(password!=rpassword){
        await ctx.render("admin/error",{
            message:"密码和确认密码不一致",
            redirect:ctx.state.HOST+"/admin/manager/add"
        })
    }else if(password.length<6){
        awaitctx.render("admin/error",{
            message:"密码长度需要大于等于6",
            redirect:ctx.state.HOST+"/admin/manager/add"
        })
    }
    //查询数据库中username是否存在
    let result=await db.find("user",{"username":username})
    if(result.length>0){
        //存在
        await ctx.render("admin/error",{
            message:"username已经存在",
            redirect:ctx.state.HOST+"/admin/manager/add"
        })
    }else {
        let addResult=await db.insert("user",{username:username,password:tools.md5(password),state:1,phone:phone,address:address})
        if(addResult.ok){
            await ctx.redirect(ctx.state.HOST+"/admin/manager")
        }else {
            await ctx.render("admin/error",{
                message:"服务器异常，添加管理员失败",
                redirect:ctx.state.HOST+"/admin/manager/add"
            })
        }
    }
})

router.get("/edit", async (ctx) => {
    //获取get传值
    let id=ctx.query.id
    let result=await db.find("user",{"_id":db.getObjectId(id)})
    await ctx.render("admin/manager/edit",{
        manager:result[0]
    })
})

router.post("/doEdit",async (ctx)=>{
    let id=ctx.request.body.id
    let password=ctx.request.body.password
    let rpassword=ctx.request.body.rpassword
    let phone=ctx.request.body.phone
    let address=ctx.request.body.address
    //密码如果为空，则不修改密码
    let userinfo={

    }
    if(password!=""){
        if(password!=rpassword){
            await ctx.render("admin/error",{
                message:"密码和确认密码不一致",
                redirect:ctx.state.HOST+"/admin/manager"
            })
        }else if(password.length<6){
            await ctx.render("admin/error",{
                message:"密码长度需要大于等于6",
                redirect:ctx.state.HOST+"/admin/manager"
            })
        }
        userinfo.password=tools.md5(password)
    }
    if(phone!=""){
        userinfo.phone=phone
    }
    if(address!=""){
        userinfo.address=address
    }
    //更新数据
    let updateResult=await db.update("user",{_id:db.getObjectId(id)},userinfo)
    if(updateResult.ok){
        await ctx.redirect(ctx.state.HOST+"/admin/manager/index")
    }else {
        await ctx.render("admin/error",{
            message:"服务器异常，更新管理员失败",
            redirect:ctx.state.HOST+"/admin/manager/index"
        })
    }
})


router.get("/delete", async (ctx) => {
    let id=ctx.query.id
    let deleteResult=await db.remove("user",{_id:db.getObjectId(id)})
    if(deleteResult.result.ok){
        await ctx.redirect(ctx.state.HOST+"/admin/manager/index")
    }else {
        await ctx.render("admin/error",{
            message:"服务器出错，删除管理员失败",
            redirect:ctx.state.HOST+"/admin/manager/index"
        })
    }
})

module.exports = router.routes()