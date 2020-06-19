//es6 中可以使用class 定义类

class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    getName(){
        console.log(this.name)
    }
    //实例方法
    setName(name){
        this.name=name;
    }
    //静态方法
    static work(){
        console.log("es6 中的静态方法")
    }
}

let p=new Person("张大仙",67)
p.getName()
Person.work()
Person.instance="person instance" //公共属性
console.log(Person.instance)

//es6 中的继承
class Male extends Person{
    constructor(name,age,sex){
        super(name,age)
        this.sex=sex
    }
    personInfo(){
        console.log(`${this.name} ${this.age} ${this.sex}`)
    }
}

let male=new Male("male",23,'男')
male.personInfo()

