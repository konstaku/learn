import { BinaryTree } from './BinaryTree.js';

// Create an array of 1000 numbers
const numbersArray = new Array(100);
for (let i = 0; i < 100; i++) {
    numbersArray[i] = i;
}

// Shuffle an array
for (let i = 0; i < 1000; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);

    const temp = numbersArray[x];
    numbersArray[x] = numbersArray[y];
    numbersArray[y] = temp;
}

const tree = new BinaryTree(numbersArray);

//console.log(tree.searchNode(numbersArray[0]));
tree.traverseAndPrint();
