const router = require("@koa/router")()
const db=require("../../model/db")


// 后台路由
router.get("/", async (ctx) => {
    let managerList=await db.find("user",{})
    console.log(managerList)
    await ctx.render("admin/manager/list",{
        managerList:managerList
    })
})

router.get("/add", async (ctx) => {
    await ctx.render("admin/user/add")
})

router.get("/edit", async (ctx) => {
    ctx.body = "user edit /"
})

router.get("/delete", async (ctx) => {
    ctx.body = "user delete /"
})

router.get("/list", async (ctx) => {
    await ctx.render("admin/user/list")
})

module.exports = router.routes()