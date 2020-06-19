var Koa=require("koa")
var router=require("@koa/router")()
var app=new Koa()
var bodyParser=require('koa-bodyparser')
var static=require('koa-static')

console.log(__dirname)
/*
    1. 安装
    - npm install --save koa-static
    2. 配置静态资源中间件
    const static=require('koa-static')
    app.use(static('static'))
**/
//引入
var views=require('koa-views')
//配置第三方模板引擎
//如果这样 配置，模板到后缀名是.html
//app.use(views('views',{map:{html:'ejs'}})) //这样配置也行 
//这样模板到后缀名是ejs
app.use(views('views',{extension:'ejs'}))
//使用koa-bodyparser接受post提交到数据
//配置body-parser中间件
app.use(bodyParser())


//配置静态资源中间件
//http://localhost:3011/css/basic.css 首先去static目录找，找到返回
// app.use(static("static"))
app.use(static(__dirname+"/static"))
//可以配置多个
app.use(static(__dirname+"/public"))

router.get("/",async (ctx)=>{
    await ctx.render("index")
})

router.get("/native",async (ctx)=>{
    await ctx.render("index")
})

//使用koa-bodyparser接受post提交到数据
router.post("/doAdd",async (ctx)=>{
    console.log(ctx.request.body)
    ctx.body=ctx.request.body
})


app.use(router.routes())
app.listen(3011)
