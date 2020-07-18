const router=require("@koa/router")()
const tools=require("../../model/tool.js")
// 验证码模块
const svgCaptcha = require('svg-captcha');


// 后台路由
router.get("/",async (ctx)=>{
    await ctx.render("admin/login")
})

router.post("/doLogin",async (ctx)=>{
    console.log(ctx.request.body)
    if(ctx.request.body.username=="admin"&&ctx.request.body.password=="123456"){
        ctx.session.username=ctx.request.body.username
        ctx.redirect("/admin")
    }else {
        ctx.render("admin/error",{
            message:"用户名或者密码错误",
            redirect:ctx.state.HOST+"/admin/login"
        })
    }
})


router.get("/code",async (ctx)=>{
    var captcha = svgCaptcha.create({
        size:4,
        fontSize:50,
        width:100,
        height:40,
        background:"#cc9966"
    });
    ctx.session.captcha = captcha.text;
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
    ctx.session.captcha = captcha.text;
    console.log(captcha.text)
    ctx.response.type="image/svg+xml"
    ctx.body=captcha.data
})


module.exports=router.routes()