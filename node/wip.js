import { BinaryNode } from './BinaryTree.js';
const { log } = console;

const root = new BinaryNode('Once');
root.insert('Upon');
root.insert('Z');
root.insert('A');
root.insert('Time');
root.insert('Yankee');

log('tree before deletion:', root);

root.delete('Z');

log('tree after deletion:', root);