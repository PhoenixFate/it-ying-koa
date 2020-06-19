var Koa = require("koa")
var router = require("@koa/router")()
const render = require('koa-art-template')
var app = new Koa()
const path = require('path')


//引入
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
})


const session = require('koa-session')
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
  secure: true, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};
 
app.use(session(CONFIG, app));


/*
1.npm install koa-session  --save

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

// art-template 中使用ejs语法
router.get("/", async (ctx) => {
    let data = {
        name: 'tom',
        content: "<h3>this is a h3 label<h3>",
        number: 20,
        list: [11, 22, 33]
    }
    await ctx.render('user', {
        data
    })
})


router.get("/setSession", async (ctx) => {
    ctx.session.userinfo="张三"
    ctx.body = "set session successfully"
})

router.get("/getSession", async (ctx) => {
    var userinfo = ctx.session.userinfo;
    ctx.body = userinfo
})


app.use(router.routes())
app.listen(3014, console.log("application is starting at port 3014"))
