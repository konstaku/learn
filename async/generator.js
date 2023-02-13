'use strict'
const pseudoRandom = function*(seed) {
  let temp = seed;

  while (true) {
      yield temp = temp * 16807 % 2147483647;
  }
};

const generator = pseudoRandom(1);

console.log(generator.next().value); // 16807
console.log(generator.next().value); // 282475249
console.log(generator.next().value); // 1622650073
