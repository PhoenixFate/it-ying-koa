# koa
## 把koa当作一个模块
- npm install koa --save
```
var Koa=require('koa')
var app=new Koa()
app.listen(3000)
```

## koa 路由
- npm install @koa/router --save
```
var router=require('@koa/router')()
router.get("/",async (ctx)=>{
    ctx.body="hello koa"
})
app.use(router.routes())
```

## koa中使用ejs模板引擎
1. 安装koa-views 和 ejs
- npm install --save koa-views
- npm install --save ejs

2. 引入koa-views  配置中间件
```
const views=require('koa-views')
app.use(views('views',{map:{html:'ejs'}}))
```


## koa中使用koa-bodyparser 接受post提交的表单数据
1. 安装
- npm install --save koa-bodyparser
2. 引入配置中间件
```
    var bodyParser=require('koa-bodyparser')
    app.usr(bodyParser())
```
