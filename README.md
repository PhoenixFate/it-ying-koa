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

## koa中使用静态资源中间件
1. 安装
- npm install --save koa-static
2. 配置静态资源中间件
```
    const static=require('koa-static')
    app.use(static('static'))
```

## koa中渲染速度最快的模版引擎 art-template
1. 安装
- npm install art-template --save
- npm install koa-art-template --save
2. 使用
```
    const render=require('koa-art-template')
    render(app,{
        root:path.join(__dirname,'view'),
        extname:'.art',
        debug:process.env.NODE_ENV!=='production'
    })
    app.get('/',async (ctx)=>{
        await ctx.render('user')
    })
```

## koa-session
1. 安装
- npm install koa-session --save
2. 配置中间件
``` 
    const session = require('koa-session')
    //session的签名
    app.keys = ['some secret hurr'];
    //配置session中间件
    const CONFIG = {
        key: 'koa:sess',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false,
    };
    app.use(session(CONFIG, app));
```


## mongodb
1. 安装
- npm install mongodb --save


## koa 应用生成器
1. 安装
- npm install koa-generator -g

2. 创建项目
- koa koa_demo

3. 安装依赖
- cd koa_demo
- npm install

4. 启动项目
-  npm start


## 验证码svg-captcha
```
var svgCaptcha = require('svg-captcha');
var captcha = svgCaptcha.create();
console.log(captcha);
// {data: '<svg.../svg>', text: 'abcd'}
```

## koa-jsonp
- koa接口返回json数据 需要使用该模块


## mongodb 导入导出
- 导出
mongodump -h dbhost -d dbname -o dbdirectory
- 导入
mongorestore -h dbhost -d dbname path 