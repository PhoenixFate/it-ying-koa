console.log("中文测试: 对应的base64编码")
console.log(Buffer.from("中文测试","utf-8").toString("base64"))
console.log("解码后对应的字符串:")
console.log(Buffer.from("5Lit5paH5rWL6K+V","base64").toString("utf-8"))
