'use strict'
const makeObservable = function(target) {
  target.observe = function(callback) {
    this.observe = callback;
  }

  return new Proxy(target, {
    set(target, property, value) {
      target.observe(property, value);
      return Reflect.set(...arguments);
    }
  })
}

let user = {};
user = makeObservable(user);
user.observe((key, value) => { console.log(`SET ${key} = ${value}`); });

user.name = 'Konsta';
user.name = 'Frank';
