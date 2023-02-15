'use strict'

const getStatsByUrl = async function(url) {
  const formatter = new Intl.NumberFormat('ru', {
    maximumFractionDigits: 0,
  });

  const response = await fetch(url);
  const json = await response.json();

  const result = {
    totalSupply: formatter.format(json.data.total_supply),
    circulatingSupply: formatter.format(json.data.circulating_supply),
    lockedSupply: formatter.format(json.data.locked_supply),
  };

  return result;
}

const veloStats = 'https://api.velodrome.finance/api/v1/supply';

const veloData = getStatsByUrl(veloStats)
  .then(data => console.log('Locked supply:', data.lockedSupply, '\n', 
                            'Circulating supply:', data.circulatingSupply, '\n', 
                            'Total supply:', data.totalSupply));

