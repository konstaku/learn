'use strict'
const getTodos = (resource) => {

  return new Promise ((resolve, reject) => {

    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4) {
        reject('Could not fetch data');
      }
    });

    request.open('GET', resource);
    request.send();
  });

}

getTodos('https://jsonplaceholder.typicode.com/comments')
  .then(data => {
    console.log('Promise 1 resolved:', data);
    return getTodos('https://jsonplaceholder.typicode.com/albums');
  }).then(data => {
    console.log('Promise 2 resolved', data);
    return getTodos('https://jsonplaceholder.typicode.com/photos');
  }).then(data => {
    console.log('promise 3 resolved', data);
  })
  .catch(error => {
    console.log('Promise unresolved:', error);
  });

