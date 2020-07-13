const { resolveCname } = require("dns")

function getData() {
    return 'hello'
}

async function testAsync() {
    return 'test async'
}


async function test() {
    let v1 = getData()
    console.log(v1)
    const v11 = await getData()
    console.log(v11)
    let v2 = testAsync()
    console.log(v2)
    const v22 = await testAsync()
    console.log(v22)
}

test()



/**
 * 
    async 会将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象，而
    await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来。
 */

function getDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello promise')
        }, 100)
    })
}

async function testPromise() {
    let data = await getDataPromise()
    console.log(data)
}

testPromise()