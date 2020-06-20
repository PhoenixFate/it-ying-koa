var Koa = require("koa")
var router = require("@koa/router")()
const render = require('koa-art-template')
var app = new Koa()
const path = require('path')
//db
var db = require("./module/db.js")
var bodyParser = require('koa-bodyparser')
//使用koa-bodyparser接受post提交到数据
//配置body-parser中间件
app.use(bodyParser())


//引入
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
})

//mongodb  增删改查
router.get("/add", async (ctx) => {
    let json = {
        'username': 'insertName',
        'age': 888,
        'sex': "female"
    }
    let result = await db.insert('user', json)
    console.log(result)
    if (result.result.ok === 1) {
        ctx.body = "insert successfully"
    } else {
        ctx.body = "insert failed"
    }
})

router.get("/update", async (ctx) => {
    let query = {
        "username": "insertName"
    }
    let result = await db.update('user', query, { "username": "insertName2", "status": '1' })
    if (result.result.ok === 1) {
        ctx.body = "update successfully"
    } else {
        ctx.body = "update failed"
    }
})

router.get("/remove", async (ctx) => {
    let query = {
        "username": "insertName2"
    }
    let result = await db.remove('user', query)
    console.log(result)
    if (result.result.ok === 1) {
        ctx.body = "remove successfully"
    } else {
        ctx.body = "remove failed"
    }
})

//显示数据库中的所有学员
router.get("/showUser", async (ctx) => {
    let result = await db.find('user', {})
    console.log(result)
    await ctx.render('news', {
        data: result
    })
})

//新增user
router.get("/addUser", async (ctx) => {
    await ctx.render("user/add")
})

//编辑user
router.get("/editUser", async (ctx) => {
    //获取用户信息
    //通过id获取用户信息　
    let id = ctx.query.id;
    let data = await db.find('user', { '_id': db.getObjectId(id) })
    console.log(data)
    await ctx.render("user/edit", {
        user: data[0]
    })
})



router.post("/doAddUser", async (ctx) => {
    console.log(ctx.request.body)
    if (ctx.request.body.username) {
        let result = await db.insert('user', ctx.request.body)
        if (result.result.ok === 1) {
            // ctx.body="add user successfully"
            ctx.redirect("/")
        } else {
            ctx.body = "add user failed"
        }
    } else {
        ctx.body = "parameters is null"
    }
})


router.post("/doEditUser", async (ctx) => {
    console.log(ctx.request.body)
    let id = ctx.request.body._id
    delete ctx.request.body._id
    let data = ctx.request.body
    console.log(data)
    if (ctx.request.body.username) {
        let result = await db.update('user', { '_id': db.getObjectId(id) }, data)
        if (result.result.ok === 1) {
            // ctx.body="add user successfully"
            ctx.redirect("/")
        } else {
            ctx.body = "add user failed"
        }
    } else {
        ctx.body = "parameters is null"
    }
})


// art-template 中使用ejs语法
router.get("/", async (ctx) => {
    let result = await db.find("user", {})
    await ctx.render("index", {
        list: result
    })
})


router.get("/doDelete", async (ctx) => {
    let id = ctx.query.id
    let data = await db.remove("user", { "_id": db.getObjectId(id) })
    if(data.result.ok){
        ctx.redirect("/")
    }else{
        ctx.body="删除失败"
    }
})

app.use(router.routes())
app.listen(3015, console.log("application is starting at port 3015"))
