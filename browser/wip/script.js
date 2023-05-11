const firstAddress = '0x03ee19d4b16da09982c5248d597448f6910cbd11';
const secondAddress = '0x3b7e1cd87cf5cdc539eb8aad5111ea902460b059';

const addresses = [firstAddress, secondAddress];
const fetches = addresses.map(el => fetch(`https://api.dexscreener.com/latest/dex/pairs/arbitrum/${el}`));

const result = [];

Promise.all(fetches)
  .then(responses => {
    responses.forEach(el => {
      let poolInfo = el.json();
      result.push(poolInfo);
    });
    return result;
  })
  .then(data => Promise.all(data))
  .then(result => result.forEach(el => console.log(el.pair.pairAddress)));
