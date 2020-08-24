const {
    render
} = require("art-template")

const router = require("@koa/router")()
const db=require("../../model/db")
const tools=require("../../model/tool")



//引入图片上传模块
const multer = require('koa-multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload');   /*配置图片上传的目录     注意：图片上传的目录必须存在*/
    },
    filename: function (req, file, cb) {   /*图片上传完成重命名*/
        var fileFormat = (file.originalname).split(".");   /*获取后缀名  分割数组*/
        cb(null,fileFormat[0]+"_" +Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
var upload = multer({ storage: storage });



// 后台路由
router.get("/index", async (ctx) => {
    let page=ctx.query.page || 1
    let pageSize=ctx.query.pageSize || 5

    //查询总数量
    console.log(page)
    console.log(pageSize)
    let count=await db.count("article",{})
    console.log(count)
    var articleData=await db.find("article",{},page,pageSize)
    //var articleList=tools.articleToList(articleData)

    await ctx.render("admin/article/index",{
        list:articleData,
        page:page,
        totalPages:Math.ceil(count/pageSize)
    })
})

router.get("/add", async (ctx) => {
    var articlelist=await db.find("article",{
        "pid":"0"
    })
    await ctx.render("admin/article/add",{
        articleList:articlelist
    })
})

router.post("/doAdd",upload.single('pic'),async (ctx)=>{
    //上传图片


    ctx.body = {
        filename: ctx.req.file.filename,  //返回文件名
        body:ctx.req.body
    }


    // console.log(ctx.request.body)
    // let data=ctx.request.body
    // let addResult=await db.insert("article",data)
    // if(addResult.result.ok){
    //     await ctx.redirect(ctx.state.HOST+"/admin/article/index")
    // }else {
    //     await ctx.render("admin/error",{
    //         message:"服务器出错，新增失败",
    //         redirect:ctx.state.HOST+"/admin/article/add"
    //     })
    // }
})


router.get("/ueditor",async (ctx)=>{
    await ctx.render("admin/article/ueditor")
})

router.get("/edit", async (ctx) => {
    let id=ctx.query.id
    let article=await db.find("article",{_id:db.getObjectId(id)})
    var articleList=await db.find("article",{
        "pid":"0"
    })
    await ctx.render("admin/article/edit",{
        article:article[0],
        articleList:articleList
    })

})

router.post("/doEdit",async (ctx)=>{
    let id=ctx.request.body.id
    let data=ctx.request.body
    delete data.id
    console.log(data)
    let updateResult=await db.update("article",{_id:db.getObjectId(id)},data)
    if(updateResult.result.ok){
        await ctx.redirect(ctx.state.HOST+"/admin/article/index")
    }else {
        await ctx.render("admin/error",{
            message:"服务器出错，修改分类属性失败",
            redirect:ctx.state.HOST+"/admin/article/add"
        })
    }
})

router.get("/delete", async (ctx) => {
    let id=ctx.query.id
    let deleteResult=await db.remove("article",{_id:db.getObjectId(id)})
    let deleteAll=await db.remove("article",{pid:id})
    if(deleteResult.result.ok || deleteAll.result.ok){
        await ctx.redirect(ctx.state.HOST+"/admin/article/index")
    }else {
        await ctx.render("admin/error",{
            message:"服务器出错，删除分类失败",
            redirect:ctx.state.HOST+"/admin/article/index"
        })
    }
})

module.exports = router.routes()