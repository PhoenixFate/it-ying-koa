//mongodb

var MongoClient=require('mongodb').MongoClient;
var Config=require("./config.js")

class MyMongodb{

    static getInstance(){
        if(!MyMongodb.instance){
            MyMongodb.instance=new MyMongodb()
        }
        return MyMongodb.instance
    }

    constructor(){
        this.db=""
        this.connect()
    }

    connect(){
        return new Promise((resolve,reject)=>{
            if(!this.db){
                MongoClient.connect(Config.url,Config.options,(err,client)=>{
                    if(err){
                        reject(err)
                    }else {
                        var db=client.db(Config.dbName)
                        this.db=db
                        resolve(db)
                    }
                })
            }else {
                resolve(this.db)
            }

            
        }) 
    }

    find(collectionName,query){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                var result=db.collection(collectionName).find(query);
                result.toArray((error,docs)=>{
                    if(error){
                        reject(error)
                    }else {
                        resolve(docs)
                    }
                })
            })
        })
    }
}


// var myDb=MyMongodb.getInstance()
// console.time("start")
// myDb.find("user",{}).then(result=>{
//     // console.log(result)
//     console.timeEnd("start")
// })

// setTimeout(()=>{
//     console.time("start2")
//     myDb.find("user",{}).then(result=>{
//         //console.log(result)
//         console.timeEnd("start2")
//     })
// },2000)

// var myDb2=MyMongodb.getInstance()
// setTimeout(() => {
//     console.time("start3")
//     myDb2.find("user",{}).then(result=>{
//         //console.log(result)
//         console.timeEnd("start3")
//     })
// }, 3000);


module.exports=MyMongodb.getInstance()