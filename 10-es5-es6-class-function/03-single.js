
class Mongodb {

    static getInstance(){
        if(!Mongodb.instance){
            Mongodb.instance=new Mongodb();
        }
        return Mongodb.instance
    }

    constructor(){
        console.log("Mongodb constructor")
    }

}

let mongo1=Mongodb.getInstance()
console.log(mongo1)
let mongo2=Mongodb.getInstance()
console.log(mongo2)
