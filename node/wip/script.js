const fs = require('fs');

async function fetchAndSave(url) {
    const poolData = await fetch(url);
    
    fs.writeFile('./poolData.json', JSON.stringify(await poolData.json()), err => {
        if (err) {
            console.log(err);
        }
    });
}

fetchAndSave('https://api.dexscreener.com/latest/dex/pairs/arbitrum/0x03ee19d4b16da09982c5248d597448f6910cbd11');

