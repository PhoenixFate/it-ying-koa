var Koa=require("koa")
var app=new Koa()
var router=require("@koa/router")()

//koa中间件
//应用级中间件
//匹配任何路由
//可以在匹配路由之前做一些操作
app.use(async (ctx,next)=>{
    console.log(new Date())
    //当前路由匹配完成以后继续向下匹配；
    //如果不写next()，就不会继续向下匹配
    await next()
})




router.get("/",async (ctx)=>{
    ctx.body="index page"
})

//路由级中间件
//匹配到路由之后继续向下匹配路由
router.get("/news",async (ctx,next)=>{
    console.log("xxx 访问news页面")
    await next()
})

router.get("/news",async (ctx)=>{
    ctx.body="news pages"
})



//错误处理中间件
app.use(async (ctx,next)=>{
    await next()
    //不管next是否匹配到，后面到代码依然会执行
    console.log(ctx.status)
    if(ctx.status==404){
        ctx.body="这是一个404页面"
    }else {
        console.log(ctx.url)
    }
})


app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3008)

