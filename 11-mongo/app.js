var Koa = require("koa")
var router = require("@koa/router")()
const render = require('koa-art-template')
var app = new Koa()
const path = require('path')
//db
var db=require("./module/db.js")



//引入
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
})


// art-template 中使用ejs语法
router.get("/", async (ctx) => {
    let result=await db.find("user",{})
    console.log(result)
    ctx.body="db test"
})



app.use(router.routes())
app.listen(3015, console.log("application is starting at port 3015"))
