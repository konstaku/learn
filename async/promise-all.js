'use strict'
const names = ['iliakan', 'remy', 'jeresig', 'konstaku'];

const requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(results => {
    for (const result of results) console.log(`${result.url}: ${result.status}`)
    return results;
  })
  .then(results => Promise.all(results.map(result => result.json())))
  .then(users => users.forEach(user => console.log(user.name)));

