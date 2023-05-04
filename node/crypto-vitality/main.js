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

async function fetchPoolData(chainsAndPools) {
	// let result = [];

	for (let i = 0; i < chainsAndPools.length; i++) {
		await fetchPoolsForChain(chainsAndPools[i]);
		sortPoolsByVitality(chainsAndPools[i]);
	}

	// for (let i = 0; i < chainsAndPools.length; i++) {
	// 	sortPoolsByVitality(chainsAndPools[i]);
	// }

	 return chainsAndPools;
	// return result;
}

async function fetchPoolsForChain(poolList) {
	const MILLISECONDS_IN_MINUTE = 60000;
	const MINUTE_FETCH_LIMIT = 300;
	const batchSize = 30;
	const cooldown = MILLISECONDS_IN_MINUTE / MINUTE_FETCH_LIMIT * batchSize;
	
	const result = [];
	const chain = poolList.chain;
	const pools = poolList.pools;
  
	if (poolList.pools.length == 0) {
		throw new Error('Unable to make batches, pool list empty');
	}
  
	let currentPool = 0;
  
	while (currentPool < pools.length) {
		const batch = pools.slice(currentPool, currentPool + batchSize);
		const promises = batch.map(pool => {
			return fetch(`https://api.dexscreener.com/latest/dex/pairs/${chain}/${pool.address}`);
		});
	
		const responses = await Promise.all(promises);
		const data = await Promise.all(responses.map(el => el.json()));
		result.push(...data);
	
		console.log(`Fetching ${currentPool + 1}-${currentPool + batch.length} of ${pools.length} ${chain} pools`);
	
		currentPool += batchSize;
		await new Promise(resolve => setTimeout(resolve, cooldown));
	}
  
	console.log(`Done fetching ${pools.length} ${chain} pools`);

	for (let i = 0; i < poolList.pools.length; i++) {
		const pool = poolList.pools[i];
		const entry = result[i].pairs[0];

		if (!entry || !entry.liquidity) {
			console.log(`No liquidity info for pool ${entry.baseToken.symbol}/${entry.quoteToken.symbol}!`);
			continue;
		}

		pool.tvl = entry.liquidity.usd || null;
		pool.volume = entry.volume.h24;
		pool.vitality = pool.volume / pool.tvl * pool.fees || null;
		pool.name = `${entry.baseToken.symbol}/${entry.quoteToken.symbol}`;
	}

	return poolList;
}

function sortPoolsByVitality(poolList) {
	poolList.pools = poolList.pools.sort((a, b) => b.vitality - a.vitality);
	return poolList;
}

async function writeDataToDisk(data) {
	console.log('Saving data to disk...');

	fs.writeFile(`./data/results/result.txt`, JSON.stringify(data), (err) => {
		if (err) {
			console.log('Error writing file', err);
		} else {
			console.log('Data saved!');
		}
	});
}

prepareFetchData(networks)
	.then(result => fetchPoolData(result))
	.then(data => writeDataToDisk(data))
	.catch(e => console.log(e));
