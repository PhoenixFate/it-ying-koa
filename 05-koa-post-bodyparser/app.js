var Koa=require("koa")
var router=require("@koa/router")()
var app=new Koa()
var common=require("./module/common.js")
var bodyParser=require('koa-bodyparser')
/*
    Koa 中 koa-bodyparser 中间件获取表单提交的数据
    1.npm install --save koa-bodyparser
    2.引入var bodyParser = require('koa-bodyparser');
    3.app.use(bodyParser());
    4.ctx.request.body;  获取表单提交的数据
**/

//引入
var views=require('koa-views')
//配置第三方模板引擎
//如果这样 配置，模板到后缀名是.html
//app.use(views('views',{map:{html:'ejs'}})) //这样配置也行 
//这样模板到后缀名是ejs
app.use(views('views',{extension:'ejs'}))


router.get("/",async (ctx)=>{
    await ctx.render("index")
})


router.get("/native",async (ctx)=>{
    await ctx.render("index")
})

//使用原生nodejs接受post提交到数据
router.post("/doAdd",async (ctx)=>{
    //原生nodejs在koa中获取post表单提交到数据
    var data=await common.getPostData(ctx);
    console.log(data)
    ctx.body=data
})

//使用koa-bodyparser接受post提交到数据
//配置body-parser中间件
app.use(bodyParser())

router.get("/parser",async (ctx)=>{
    await ctx.render("index2")
})

//使用koa-bodyparser接受post提交到数据
router.post("/doAdd2",async (ctx)=>{
    console.log(ctx.request.body)
    ctx.body=ctx.request.body
})



app.use(router.routes())
app.listen(3010)
