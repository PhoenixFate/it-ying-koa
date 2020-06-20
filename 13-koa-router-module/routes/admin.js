const router=require("@koa/router")()

var user=require("./admin/user")
var focus=require("./admin/focus")

//配置admin的层级路由
router.use("/user",user)
router.use("/focus",focus)


module.exports=router.routes();