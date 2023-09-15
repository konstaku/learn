import { useState } from 'react';

export function BtcPrice() {
  const [price, setPrice] = useState('???');

  return <h1 onClick={incPrice}>Bnb price: {price}</h1>;

  async function incPrice() {
    const newPriceData = await fetch(
      'https://api.dexscreener.com/latest/dex/tokens/0x2170Ed0880ac9A755fd29B2688956BD959F933F8,0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    );
    const newPrice = await newPriceData.json();
    const bnbPrice = newPrice.pairs[0].priceUsd;

    setPrice(bnbPrice);
  }
}
