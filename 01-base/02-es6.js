// let是块作用域
let a=123
console.log(a)

const PI=3.14
console.log(PI)

//模板字符串
var name="张三"
var age=20
console.log(name+"年龄是: "+age)
console.log(`${name}年龄是${age}`)


//方法、属性的简写
var app={
    name:name,
    run:function(){
        console.log("app.run")
    }
}
console.log(app.name)
var app2={
    name,
    run(){
        console.log("app2.run")
    }
}
console.log(app2.name)
app.run()
app2.run()


//箭头函数
setTimeout(function(){
    console.log("普通方法")
},300)

setTimeout(()=>{
    console.log("箭头函数")
},400)



//回调函数 
function getData(callback){
    setTimeout(function(){
        var name="tom"
        callback(name)
    },600)
}

//外部获取异步方法里面的数据
getData(function(data){
    console.log(data)
})

//promise
var p=new Promise(function(resolve,reject){
    setTimeout(function(){
        var name="promise"
        if(Math.random()<0.6){
            resolve(name)
        }else {
            reject("my error")
        }
    },800)
})

p.then((data)=>{
    console.log(data)
}).catch((error)=>{
    console.log(error)
})






//async 让方法变成异步
//await = async wait 等待异步结束
async function common(){
    return "common data"
}
//Promise { 'common data' }
//加了async之后 返回的是一个Promise对象
console.log(common())

//获取async方法里面的数据的第一种方式
var pp=common();
pp.then((data)=>{
    console.log(data)
})

//获取async方法里面的数据的第二种方法
//await is only valid in async function
// var dd=await common();
// console.log("dd: "+dd)

async function common2(){
    //await 把异步改成同步
    var d=await common();
    console.log("await: "+d)
}

common2()

//返回promise 可以在async方法中使用await来获取数据
function returnPromise(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            var username="abcc"
            resolve(username)
        },1100)
    })
}

async function test(){
    let data=await returnPromise();
    console.log(data)
}

test()
