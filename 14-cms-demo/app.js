const Koa=require("koa")
const router=require("@koa/router")()
const render=require("koa-art-template")
const path=require("path")
const static=require("koa-static")
const session = require('koa-session')
var bodyParser=require('koa-bodyparser')
/*
    Koa 中 koa-bodyparser 中间件获取表单提交的数据
    1.npm install --save koa-bodyparser
    2.引入var bodyParser = require('koa-bodyparser');
    3.app.use(bodyParser());
    4.ctx.request.body;  获取表单提交的数据
**/
var app=new Koa();
app.use(bodyParser())
//session的签名
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};
app.use(session(CONFIG, app));

/*
1. npm install koa-session  --save
2、const session = require('koa-session');
3、
 app.keys = ['some secret hurr'];
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
设置 session
ctx.session.username = "张三"
获取 session
 ctx.session.username
* */


//配置静态路由的中间件
app.use(static(__dirname+"/public"))


//引入子路由
const admin=require("./routes/admin")
const api=require("./routes/api")
const front=require("./routes/front")
//配置子路由/层级路由
router.use('/admin',admin)
router.use('/api',api)
router.use(front)



//配置模板引擎
render(app,{
    root:path.join(__dirname,"view"),
    extname:".html",
    debug:process.env.NODE_ENV!=='production'
})

//启动路由
app.use(router.routes())
app.use(router.allowedMethods())





// 启动项目 node app.js
app.listen(3521)
