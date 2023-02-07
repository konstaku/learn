'use strict'

let generator = function(num) {
  return num * 16807 % 2147483647;
}

const generatorDecorator = function(func) {
  let current = 0;
  let next = 0;

  return function(x) {
    current = x;
    next = func(current);
    current += next;
    return next;
  }
}

generator = generatorDecorator(generator);

console.log(generator(1));
console.log(generator(1));
console.log(generator(1));
console.log(generator(1));
console.log(generator(1));
