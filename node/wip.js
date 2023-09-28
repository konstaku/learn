class Me {
    constructor() {
        this.name = 'Konsta'
    }

    sayHello() {
        console.log(`Hello from ${this.name}`)
    }

    sayHelloArrow = () => console.log(`Hello from ${this.name}`)
}


const konsta = new Me;

konsta.sayHello()
konsta.sayHelloArrow()

const foo = konsta.sayHello
const bar = konsta.sayHelloArrow

//foo()
bar()