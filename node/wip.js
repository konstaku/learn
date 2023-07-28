import { BinaryNode, BinaryTree } from './BinaryTree.js';

// Create an array of 1000 numbers
const numbersArray = new Array(1000000);
for (let i = 0; i < 1000000; i++) {
    numbersArray[i] = i;
}

// Shuffle an array
for (let i = 0; i < 100000000; i++) {
    const x = Math.floor(Math.random() * 1000000);
    const y = Math.floor(Math.random() * 1000000);

    const temp = numbersArray[x];
    numbersArray[x] = numbersArray[y];
    numbersArray[y] = temp;
}

console.log(numbersArray);

const tree = new BinaryTree(numbersArray);

console.log(tree);
