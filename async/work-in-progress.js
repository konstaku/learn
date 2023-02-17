'use strict'
function digPow(n, p){
  let numberArray = n.toString().split('').map(Number);
  let result = 0;
  
  for (let i = 0; i < numberArray.length; i++) {
    result += numberArray[i] ** (p+i);
  }
  
  let k = result / n;

  console.log(Number.isInteger(k));
  console.log(`n: ${n}, p: ${p}, result: ${result}, k: ${k}`);
}

digPow(92, 1);