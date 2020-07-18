//mongodb
var MongoDB=require("mongodb")
var MongoClient=MongoDB.MongoClient;
const ObjectID=MongoDB.ObjectID;
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

    getObjectId(id){
        return new ObjectID(id);
    }


    insert(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).insertOne(json,function(err,result){
                    if(err){
                        reject(err)
                    }else {
                        resolve(result)
                    }
                })
            })
        })
    }

    update(collectionName,query,json2){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                //db.user.update({},{$set:{}})
                db.collection(collectionName).updateOne(query,{
                    $set:json2
                },(err,result)=>{
                    if(err){
                        reject(err)
                    }else {
                        resolve(result)
                    }
                })
            })
        })
    }

    remove(collectionName,query){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).removeOne(query,(err,result)=>{
                    if(err){
                        reject(err)
                    }else {
                        resolve(result)
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