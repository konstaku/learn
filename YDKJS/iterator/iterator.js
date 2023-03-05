function getSomeData(url) {
  ajax(url, function onResponse(resp){
    console.log(`
      Response from ${ url }: ${ resp }
    `);
  });
}

getSomeData('https://jsonplaceholder.typicode.com/posts');
