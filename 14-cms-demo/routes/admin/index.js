const router=require("@koa/router")()
const tools=require("../../model/tool.js")
// 验证码模块
const svgCaptcha = require('svg-captcha');
const db=require("../../model/db.js")

// 后台路由
router.get("/",async (ctx)=>{
    await ctx.render("admin/index")
})

router.get("/testJson",async (ctx)=>{
    ctx.body={"success":"0","message":"ok",data:{}}
})

router.get("/changeStatus",async (ctx)=>{
    console.log(ctx.query)
    let collectionName=ctx.query.collectionName
    let id=ctx.query.id
    let attr=ctx.query.attr
    let data=parseInt(ctx.query.data)
    /*es6 属性名表达式*/
    let json={
        [attr]:data
    }
    let updateResult=await db.update(collectionName,{"_id":db.getObjectId(id)},json)
    console.log(updateResult)
    if(updateResult){
        ctx.body={"message":'更新成功',"success":true}
    }else {
        ctx.body={"message":'更新失败',"success":false}
    }
})


module.exports=router.routes()