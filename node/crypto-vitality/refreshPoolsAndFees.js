const fs = require('fs');

const DUNE_API_KEY = 'o0T6Pl9KPv2fjRgqnhDegftHX5RSbg2z';

const poolList = [
    {
        network: 'optimism',
        url: 'https://api.dune.com/api/v1/query/2427486/results?api_key=',
    },
    {
        network: 'polygon',
        url: 'https://api.dune.com/api/v1/query/2428000/results?api_key=',
    }
];

async function refreshPoolsAndFeesData(pools) {
    for (const pool of pools) {
        const response = await fetch(pool.url + DUNE_API_KEY);
        const data = await response.json();
        fs.writeFile(`./data/uni_v3_${pool.network}_pools_and_fees.json`, JSON.stringify(data, null, 4), error => {
            if(error) {
                console.log('Error writing data:', error);
            }
        })
    }
}

refreshPoolsAndFeesData(poolList);
