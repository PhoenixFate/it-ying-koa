var Koa = require("koa")
var router = require("@koa/router")()
const render=require('koa-art-template')
var app = new Koa()
const path = require('path')

//引入
render(app,{
    root:path.join(__dirname,'views'),
    extname:'.html',
    debug:process.env.NODE_ENV!=='production'
})


/**
 * cookie
 * 1.保存用户信息
 * 2.浏览历史记录
 * 3.猜你喜欢
 * 4.10天免登陆
 * 5.多个页面之间的数据传递
 * 6.cookie实现购物车功能
 */

// art-template 中使用ejs语法
router.get("/", async (ctx) => {
    let data={
        name:'tom',
        content:"<h3>this is a h3 label<h3>",
        number:20,
        list:[11,22,33]
    }
    await ctx.render('user',{
        data
    })
})

//art-template中使用angular语法
router.get("/news", async(ctx)=>{
    let data={
        name:'tom',
        content:"<h3>this is a h3 label<h3>",
        number:20,
        list:[11,22,33]
    }
    await ctx.render('news',{
        data
    })
})


router.get("/setCookie",async(ctx)=>{
    ctx.cookies.set('userinfo','zhangsan',{
        maxAge:60*1000*60,
        // 配置可以访问的页面
        // path:'/news'
        // 正常情况下面不要设置 默认就是当前域下面的所有页面都可以访问
        // domain:'.baidu.com'
        // true表示只有服务器端能够访问，false表示客户端、服务端都能访问
        // 默认true
        // httpOnly:true
        httpOnly:false
    })
    ctx.body="set cookie successfully"
})

router.get("/getCookie",async(ctx)=>{
    var userinfo=ctx.cookies.get("userinfo")
    ctx.body=userinfo
})


router.get("/setCookieChinese",async(ctx)=>{
    //koa 中默认cookie不支持中文
    //把字符串转成base64编码
    let username=new Buffer("张三").toString('base64')
    ctx.cookies.set('username',username,{
        maxAge:60*1000*60
    })
    ctx.body="设置 中文的cookie成功"
})

router.get("/getCookieChinese",async(ctx)=>{
    let userTemp=ctx.cookies.get('username')
    if (userTemp!=null){
        ctx.body=new Buffer(userTemp,'base64').toString()
    }else {
        ctx.bode="为找到cookie"
    }

})


app.use(router.routes())
app.listen(3013,console.log("application is starting at port 3013"))
