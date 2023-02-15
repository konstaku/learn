'use strict'
const getData = async () => {
  
  const response = await fetch('https://jsonplaceholder.typicode.com/postss');

  if (response.status != 200) {
    throw new Error(response.status);
  }
    
  const data = await response.json();

  return(data);

};

getData()
  .then(data => console.log('resolved:', data))
  .catch(err => console.log('rejected:', err, err.message));

