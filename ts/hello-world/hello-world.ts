const hello: string = 'Hello world';

function sayHello(phrase: string, times: number) {
    for (let i = 0; i < times; i++) {
        console.log(phrase);
    }
}

sayHello(hello, 5);
