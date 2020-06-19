/*
nodejs操作mongodb数据库
 1.安装mongodb、
    cnpm install mongodb --save

 2.引入mongodb下面的MongoClient
    var MongoClient = require('mongodb').MongoClient;

 3.定义数据库连接的地址 以及配置数据库
    koa数据库的名称
    var url = 'mongodb://localhost:27017/';
    var dbName = 'koa'

 4.nodejs连接数据库
    MongoClient.connect(url,function(err,client){
        const db = client.db(dbName);  数据库db对象
    })

5.操作数据库
     db.user.insert
     MongoClient.connect(url,function(err,db){
            db.collection('user').insertOne({"name":"张三"},function(err,result){
                db.close() //关闭连接
            })
     })
*/

var MongoClient =require('mongodb').MongoClient
var dbUrl="mongodb://root:root@114.67.89.253:40017"
var dbName="koa"

MongoClient.connect(dbUrl,function(error,client){
    if(error){
        console.log(error)
        return
    }
    var db=client.db(dbName)

    //插入数据
    // db.collection('user').insertOne({"name":"koaUser",age:"89",sex:"female"},function(error2,result){
    //     if(!error2){
    //         console.log("添加数据成功")
    //         // console.log(result)
    //     }
    //     client.close() 
    // })

    //查询数据
    var result=db.collection("user").find({});
    result.toArray((err,docs)=>{
        console.log(docs)
    })

})