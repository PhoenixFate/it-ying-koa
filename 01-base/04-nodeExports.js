// ES6标准发布后，module成为标准，标准使用是以export指令导出接口，以import引入模块，
// 但是在我们一贯的node模块中，我们依然采用的是CommonJS规范，使用require引入模块，使用module.exports导出接口。


var name="abc"
var test=function(){
    console.log("test export")
}
module.exports={
    name,
    test
}
//exports其实是module.exports的引用
// exports.bb="bb"


