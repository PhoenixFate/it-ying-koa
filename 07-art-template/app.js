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


app.use(router.routes())
app.listen(3012)
