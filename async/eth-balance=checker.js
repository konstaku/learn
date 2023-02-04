'use strict'
const data = async() => {
  // Forming a request
  const response = await fetch('https://api.etherscan.io/api' +
    '?module=account' +
    '&action=balance' +
    '&address=0x40fc7489c72453d5cc30bf8915526be62e899102' +
    '&tag=latest' +
    '&apikey=NEDW6D5C3SANKXRRDUQV8J5NNFAYTFRBRW');

  // Getting the result from response
  const data = await response.json();
  // Calculating ETH from wei
  const result = Math.round((data.result / 1000000000000000000) * 1000 ) / 1000;

  return result;
};

data()
  .then(result => console.log('Current balance:', result, 'ETH'))
  .catch(error => console.log('Error:', error.message));
