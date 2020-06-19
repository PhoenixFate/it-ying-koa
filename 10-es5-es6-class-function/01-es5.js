//es5中的类和静态方法
function Person(name,age){
    //构造函数里面的方法和属性 属于当前实例
    this.name=name
    this.age=age
    this.run=function(){
        console.log(`${this.name}--${this.age}`)
    }
}

//原型链上门的属性和方法
//原型链上门的属性和方法可以被多个实例共享
Person.prototype.sex='男'
Person.prototype.work=function(){
    console.log(`${this.name} ${this.sex} is working`)
}

//静态方法
Person.setName=function(){
    console.log("Person 静态方法")
}
//实例方法，创建实例来调用
let p=new Person('tom',22)
p.run()
p.work()

//静态方法，使用类名调用
Person.setName()


//es5中的继承

//对象冒充实现继承
function Male(name,age){
    Person.call(this,name,age)
}

let male=new Male("superman",88)
male.run()
//对象冒充继承，没法继承原型链上门的方法
//male.work() is not a function
// male.work()


//原型链继承 可以继承构造函数里面以及原型链上门的属性和方法，
//但实例化子类但时候无法给父类传参
function Female(){

}

Female.prototype=new Person()
let female=new Female('female',23)
female.run()
female.work()

//对象冒充继承 + 原型链继承
function SmartPerson(name,age){
    Person.call(name,age)
}
SmartPerson.prototype=new Person()

let smartPerson=new Person("晓峰",45)
smartPerson.run()
smartPerson.work()

