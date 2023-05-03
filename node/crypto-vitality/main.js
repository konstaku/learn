const fs = require('fs');

const networks = [
	'ethereum',
	'arbitrum',
	'optimism',
	'polygon',
	'bsc',
];

async function prepareFetchData(chains) {
	const promises = chains.map(chain => readPoolsFromDisk(chain));
	// Using Promise.all instead a for loop, so I have all the data filled before moving next
	const poolData = await Promise.all(promises);

	const preparedData = chains.map((chain, index) => {
		const poolInfo = {};
		poolInfo.chain = chain;
		poolInfo.pools = poolData[index];
		// Normalize fees (3000 = 0.3)
		poolInfo.pools.forEach(el => el.fees /= 10000);
		return poolInfo;
	});

	return preparedData;
}

async function readPoolsFromDisk(chain) {
	return new Promise((resolve, reject) => {
		fs.readFile(`./data/uni_v3_${chain}_pools_and_fees.json`, 'utf-8', (err, data) => {
		if (err) {
			reject(err);
		} else {
			console.log(`Data from ${chain} pool read successfully`);
			const poolsAndFees = JSON.parse(data).result.rows;
			
			resolve(poolsAndFees);
		}
		})
	});
}

async function fetchPoolData(ChainsAndPools) {
	// Index of the pool I'm currently reading. Done if == ChainsAndPools.length
	let poolsRead = 0;

	let result = await fetchPoolsForChain(ChainsAndPools[1]);
	console.log('Result:', result);

	return result;
}

async function fetchPoolsForChain(poolList) {
	const batchSize = 30;
  
	if (poolList.pools.length == 0) {
	  throw new Error('Unable to make batches, pool list empty');
	}
  
	const MINUTE_FETCH_LIMIT = 300;
	const MILLISECONDS_IN_MINUTE = 60000;
  
	const result = [];
	const cooldown = MILLISECONDS_IN_MINUTE / MINUTE_FETCH_LIMIT * batchSize;
  
	let currentPool = 0;
  
	const chain = poolList.chain;
	const pools = poolList.pools;
  
	while (currentPool < pools.length) {
	  const batch = pools.slice(currentPool, currentPool + batchSize);
	  const promises = batch.map(pool => {
		return fetch(`https://api.dexscreener.com/latest/dex/pairs/${chain}/${pool.address}`);
	  });
  
	  const responses = await Promise.all(promises);
	  const data = await Promise.all(responses.map(el => el.json()));
	  result.push(...data);
  
	  console.log(`Fetching ${currentPool + batch.length}/${pools.length} ${chain} pools`);
  
	  currentPool += batchSize;
	  await new Promise(resolve => setTimeout(resolve, cooldown));
	}
  
	console.log(`Done fetching ${currentPool} pools for ${chain}`);
	return result;
  }

prepareFetchData(networks)
	.then(result => fetchPoolData(result))
	.catch(e => console.log(e));
