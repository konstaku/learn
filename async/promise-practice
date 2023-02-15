'use strict'
function makePromiseWithConstructor(itShouldResolve) {

  return new Promise((resolve, reject) => 
    itShouldResolve 
      ? resolve('Resolved!') 
      : reject('Unresolved')
  )
}

makePromiseWithConstructor(true)
  .then(result => console.log(result))
  .catch(err => console.log(err));

