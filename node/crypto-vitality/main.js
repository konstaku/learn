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

function readPoolsFromDisk(chain) {
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

	fetchPoolsForChain(ChainsAndPools[1]);

	async function fetchPoolsForChain(poolList) {

		// 1. Turn pools into fetch requests and pack them into batches of 30 or less
		const promises = prepareFetchesInBatch(poolList, 30);
		const responses = await Promise.all(promises[0]);

		console.log('responses', responses);

		const data = await Promise.all(responses.map(el => el.json()));
		
		console.log('data', data);

		

		// 2. Set timeout to fetch next chunk each 6 seconds. Clear timeout if done

		// 3. Fill the array with responses, resolve them all with Promise.all

		// 4. Return an array with data for each pool

	}
}



prepareFetchData(networks)
	.then(result => fetchPoolData(result))
	.catch(e => console.log(e));



function prepareFetchesInBatch(poolList, batchsize) {

	if (poolList.pools.length == 0) {
		throw new Error('Unable to make batches, pool list empty');
	}

	const result = [];
	let currentBatch = 0;
	let currentIndex = 0;
	result[currentBatch] = [];

	const chain = poolList.chain;
	const pools = poolList.pools;

	for (let i = 0; i < pools.length; i++) {
		if(currentIndex < batchsize) {
			result[currentBatch].push(fetch(`https://api.dexscreener.com/latest/dex/pairs/${chain}/${pools[i].address}`));
			currentIndex++;
		} else {
			currentIndex = 0;
			currentBatch++;
			result[currentBatch] = [];
			i--;
			continue;
		}
	}

	return result;
}










// The query limit is max of 30 pools at once, so the function forms batches 
// of 30 addresses (or a remaining amount of addresses), and calls the loadBatch 
// function with the current batch until all pools are called.
async function fetchHotPools(pools, network) {
  const entryPoolData = pools.result.rows;
  const resultingPoolData = [];

  let poolChunk = [];
  let i = 0;

  while (i < entryPoolData.length) {
	poolChunk.push(entryPoolData[i]);
	i++;

	if (poolChunk.length == 30) {
	  console.log(`Loading pool chunk, ${i} pools loaded`);
	  await loadBatch(poolChunk, resultingPoolData, network);
	  poolChunk = [];
	}

	if (i == entryPoolData.length - 1) {
	  console.log(`Loading final chunk, ${i} pools loaded`);
	  await loadBatch(poolChunk, resultingPoolData, network)
	  poolChunk = null;
	  break;
	}
  }
  
  return resultingPoolData;
}

async function loadBatch(chunk, base, network) {
	const urls = chunk.map(el => fetch(`https://api.dexscreener.com/latest/dex/pairs/${network}/${el.address}`));
	await Promise.all(urls) // 1: Add await
		.then(responses => Promise.all(responses.map(el => el.json()))) // 2: *Return* Promise all, not just execute
		.then(results => { 
	  		for (let i = 0; i < results.length; i++) {
		
			if (!results[i].pair || !results[i].pair.liquidity) {
			continue;
			}

			if (results[i].pair.liquidity.usd < 1000) {
			continue;
			}

			const pairInfo = {
			pair: `${results[i].pair.baseToken.name}/${results[i].pair.quoteToken.name}`,
			vitality: null,
			tvl: results[i].pair.liquidity.usd,
			volume: results[i].pair.volume.h24,
			fee: chunk[i].fees / 10000,
			address: results[i].pair.pairAddress,
			};

			// IMPORTANT to add || null, otherwise sort will not work properly
			pairInfo.vitality = pairInfo.volume / pairInfo.tvl * pairInfo.fee || null;
			base.push(pairInfo);
		}

	  	return base;
	})
	.then(result => result.sort((a, b) => b.vitality - a.vitality))
	.catch(e => console.log('Error:', e));
}

// fetchHotPools(uniPoolsAndFeesOptimism, 'optimism')
//   .then(results => {
//     console.log(`
//       ============ 10 hottest optimism pools: ============
//     `);

//     for (let i = 0; i < 10; i++) {
//       console.log(`
//       Pool:     ${results[i].pair}
//       TVL:      ${results[i].tvl}
//       Vitality: ${results[i].vitality}
//       Address:  ${results[i].address}`);
//     }
//   });
