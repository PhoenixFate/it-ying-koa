const {
    render
} = require("art-template")

const router = require("@koa/router")()
const db=require("../../model/db")
const tools=require("../../model/tool")

// 后台路由
router.get("/index", async (ctx) => {
    var categoryData=await db.find("category",{})
    var categoryList=tools.categoryToList(categoryData)

    await ctx.render("admin/category/index",{
        list:categoryList
    })
})

router.get("/add", async (ctx) => {
    var categorylist=await db.find("category",{
        "pid":"0"
    })
    await ctx.render("admin/category/add",{
        categoryList:categorylist
    })
})

router.post("/doAdd",async (ctx)=>{
    console.log(ctx.request.body)
    let data=ctx.request.body
    let addResult=await db.insert("category",data)
    if(addResult.result.ok){
        await ctx.redirect(ctx.state.HOST+"/admin/category/index")
    }else {
        await ctx.render("admin/error",{
            message:"服务器出错，新增失败",
            redirect:ctx.state.HOST+"/admin/category/add"
        })
    }
})

router.get("/edit", async (ctx) => {
    let id=ctx.query.id
    let category=await db.find("category",{_id:db.getObjectId(id)})
    var categoryList=await db.find("category",{
        "pid":"0"
    })
    await ctx.render("admin/category/edit",{
        category:category[0],
        categoryList:categoryList
    })

})

router.post("/doEdit",async (ctx)=>{
    let id=ctx.request.body.id
    let data=ctx.request.body
    delete data.id
    console.log(data)
    let updateResult=await db.update("category",{_id:db.getObjectId(id)},data)
    if(updateResult.result.ok){
        await ctx.redirect(ctx.state.HOST+"/admin/category/index")
    }else {
        await ctx.render("admin/error",{
            message:"服务器出错，修改分类属性失败",
            redirect:ctx.state.HOST+"/admin/category/add"
        })
    }
})

router.get("/delete", async (ctx) => {
    let id=ctx.query.id
    let deleteResult=await db.remove("category",{_id:db.getObjectId(id)})
    let deleteAll=await db.remove("category",{pid:id})
    if(deleteResult.result.ok || deleteAll.result.ok){
        await ctx.redirect(ctx.state.HOST+"/admin/category/index")
    }else {
        await ctx.render("admin/error",{
            message:"服务器出错，删除分类失败",
            redirect:ctx.state.HOST+"/admin/category/index"
        })
    }
})

module.exports = router.routes()