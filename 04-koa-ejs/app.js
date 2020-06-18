var Koa=require("koa")
var router=require("@koa/router")()
var app=new Koa()

/**
 * koa中使用ejs模板引擎
 * 1.npm install --save koa-views
 * npm install --save ejs
 * 
 * 2.var views=require('koa-views')
 * 3.app.use(views(__dirname,{extension:'ejs'}))
 * 
 * 4.await ctx.render('index')
 */

//引入
var views=require('koa-views')
//配置第三方模板引擎
//如果这样 配置，模板到后缀名是.html
//app.use(views('views',{map:{html:'ejs'}})) //这样配置也行 
//这样模板到后缀名是ejs
app.use(views('views',{extension:'ejs'}))



//注意 如果每个路由想要有公共数据
//则使用ctx.state
/**
 * //在中间件中使用
 * ctx.state={
 *  username:"zhangsan"
 *  session:this.session
 * }
 */

 app.use(async (ctx,next)=>{
    ctx.state={
        username:"tom"
    }
    await next()
 })



router.get("/",(ctx)=>{
    ctx.body="index page"
})

router.get("/ejs",async(ctx)=>{
    let title="hello ejs"
    //注意 一定要await
    await ctx.render('index',{
        title:title
    })
})

router.get("/news",async(ctx)=>{
    let list=[111,222,333]
    let content="<h2>content</h2>"
    let number=123
    await ctx.render("news",{
        list:list,
        content,
        number
    })
})


app.use(router.routes())
app.listen(3009)
