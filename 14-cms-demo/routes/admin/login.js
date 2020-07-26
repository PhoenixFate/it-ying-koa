const router=require("@koa/router")()
const tools=require("../../model/tool.js")
// 验证码模块
const svgCaptcha = require('svg-captcha');
const db=require("../../model/db.js")

// 后台路由
router.get("/",async (ctx)=>{
    await ctx.render("admin/login")
})

router.post("/doLogin",async (ctx)=>{
    console.log(ctx.request.body)
    if(ctx.request.body.checkCode.toUpperCase()==ctx.session.checkCode.toUpperCase()){
        let result=await db.find("user",{"username":ctx.request.body.username,"password":tools.md5(ctx.request.body.password)})
        console.log(result)
        if(result.length>0){
            console.log(result[0])
            ctx.session.userinfo=result[0]

            //登录成功之后，更新数据的 上一次登录时间
            await db.update("user",{"_id":db.getObjectId(result[0]._id)},{
                lastLogin:new Date()
            })


            ctx.redirect(ctx.state.HOST+"/admin")
        }else {
            ctx.render("admin/error",{
                message:"用户名或者密码错误",
                redirect:ctx.state.HOST+"/admin/login"
            })
        }
    }else {
        ctx.render("admin/error",{
            message:"验证码错误",
            redirect:ctx.state.HOST+"/admin/login"
        })
    }
})

//退出登录
router.get("/logout",async (ctx)=>{
    ctx.session.userinfo=null
    ctx.redirect(ctx.state.HOST+"/admin/login")
})


router.get("/code",async (ctx)=>{
    var captcha = svgCaptcha.create({
        size:4,
        fontSize:50,
        width:100,
        height:40,
        background:"#cc9966"
    });
    ctx.session.checkCode = captcha.text;
    console.log(captcha.text)
    //设置响应头
    ctx.response.type="image/svg+xml"
    ctx.body=captcha.data
})

router.get("/math",async (ctx)=>{
    // mathMin: 1 // the minimum value the math expression can be
    // mathMax: 9 // the maximum value the math expression can be
    // mathOperator: + // The operator to use, +, - or +- (for random + or -)
    var captcha = svgCaptcha.createMathExpr({
        mathMin:1,
        mathMax:20
    });
    ctx.session.checkCode = captcha.text;
    ctx.response.type="image/svg+xml"
    ctx.body=captcha.data
})


module.exports=router.routes()