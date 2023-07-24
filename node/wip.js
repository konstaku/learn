'use strict';
import { Node, LinkedList } from './linkedList.js';

const node1 = new Node('Once');
const node2 = new Node('Upon');
const node3 = new Node('A');
const node4 = new Node('Time');

const list = new LinkedList(node1);

node1.nextNode = node2;
node2.nextNode = node3;
node3.nextNode = node4;

list.insertAtIndex(0, '********');
list.deleteAtIndex(4);

console.log(list.read(0).data);
console.log(list.read(1).data);
console.log(list.read(2).data);
console.log(list.read(3).data);
