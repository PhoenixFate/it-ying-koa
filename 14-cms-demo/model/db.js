//mongodb
var MongoDB = require("mongodb")
var MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;
var Config = require("./config.js")

class MyMongodb {

    static getInstance() {
        if (!MyMongodb.instance) {
            MyMongodb.instance = new MyMongodb()
        }
        return MyMongodb.instance
    }

    constructor() {
        this.db = ""
        this.connect()
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                MongoClient.connect(Config.url, Config.options, (err, client) => {
                    if (err) {
                        reject(err)
                    } else {
                        var db = client.db(Config.dbName)
                        this.db = db
                        resolve(db)
                    }
                })
            } else {
                resolve(this.db)
            }
        })
    }

    /*
     DB.find('user',{})  返回所有数据
     DB.find('user',{},{"title":1})    返回所有数据  只返回一列
     DB.find('user',{},{"title":1},{   返回第二页的数据
        page:2,
        pageSize:20
     })
     js中实参和形参可以不一样      
     arguments 对象接收实参传过来的数据
    */
    find(collectionName, query, page = 1, pageSize = 10) {
        let slipNumber = (page - 1) * pageSize
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                //var result=db.collection(collectionName).find(json);

                /**
                 * DeprecationWarning: 
                 * (node:7692) DeprecationWarning: collection.find option [fields] is deprecated and will be removed in a later version.
                 * 
                 * db.collection(collectionName).find(query, {
                    fields: field
                   })
                 * 
                 */

                /**
                 *  .find({ sessionCode: '18JANMON', completed: false })
                    .limit(10)
                    .sort({time: 1})
                    .select({time: 1, sessionCode: 1});
                 */
                var result = db.collection(collectionName).find(query).skip(slipNumber).limit(pageSize);
                result.toArray(function (err, docs) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(docs);
                })
            })
        })
    }

    getObjectId(id) {
        return new ObjectID(id);
    }


    insert(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).insertOne(json, function (err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            })
        })
    }

    update(collectionName, query, json2) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                //db.user.update({},{$set:{}})
                db.collection(collectionName).updateOne(query, {
                    $set: json2
                }, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            })
        })
    }

    remove(collectionName, query) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).removeOne(query, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            })
        })
    }

    //统计数量的方法
    count(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                var result = db.collection(collectionName).countDocuments(json);
                result.then(function (count) {
                    resolve(count);
                })
            }).catch(function (error) {
                reject(error)
            })
        })
    }
}

module.exports = MyMongodb.getInstance()