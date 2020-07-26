const md5=require("md5")

let tools={
    md5(str){
        return md5(str)
    },
    categoryToList(data){
        //1.获取一级分类
        let firstArray=[]
        for(let i=0;i<data.length;i++){
            if(data[i].pid=="0"){
                firstArray.push(data[i])
            }
        }
        //2.获取二级分类
        for(let i=0;i<firstArray.length;i++){
            firstArray[i].list=[]
            //遍历所有数组，如果那个pid等于_id 
            for(let j=0;j<data.length;j++){
                if(firstArray[i]._id==data[j].pid){
                    firstArray[i].list.push(data[j])
                }
            }
        }
        console.log(firstArray)
        return firstArray
    }

}
module.exports=tools