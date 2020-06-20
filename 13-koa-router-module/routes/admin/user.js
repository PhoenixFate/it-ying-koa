//admin user router

const router=require("@koa/router")()

router.get("/",async (ctx)=>{
    // ctx.body="user index page"
    await ctx.render('admin/user/index')
})

router.get("/add",async (ctx)=>{
    ctx.body="add user"
    await ctx.render('admin/user/add')

})

router.get("/edit",async (ctx)=>{
    ctx.body="edit user"
    await ctx.render('admin/user/edit')

})

router.get("/delete",async (ctx)=>{
    ctx.body="delete user"
    await ctx.render('admin/user/delete')

})

module.exports=router.routes()

