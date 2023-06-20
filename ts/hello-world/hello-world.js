"use strict";
const hello = 'Hello world';
function sayHello(phrase, times) {
    for (let i = 0; i < times; i++) {
        console.log(phrase);
    }
}
sayHello(hello, 5);
