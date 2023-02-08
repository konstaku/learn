'use strict'
const makeObservable = function(target) {
  target.observe = function(func) {
    console.log('function observe triggered');
  //  func();
  }

  return new Proxy(target, {
    set(target, property, value) {
    //  target.observe(property, value);
    }
  })
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => { console.log(`SET ${key} = ${value}`); });

//user.name = 'Konsta';