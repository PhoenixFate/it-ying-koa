
// 引入模块
var koa=require('koa');
// 实例对象
var app=new koa();

//配置中间件
//ctx context
app.use(async(ctx)=>{
    //ctx.body 类似于响应数据
    ctx.body="中文测试 hello koa 2.x"
})


//监听端口
app.listen(3005)
