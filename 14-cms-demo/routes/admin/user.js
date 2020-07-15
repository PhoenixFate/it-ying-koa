const {
    render
} = require("art-template")

const router = require("@koa/router")()

// 后台路由
router.get("/", async (ctx) => {
    await ctx.render("admin/user/list")
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