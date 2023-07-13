class Node {
    value;
    nextNode;

    constructor(value) {
        this.value = value;
    }

    set nextNode(nextNode) {
        this.nextNode = nextNode;
    }
}

class LinkedList {
    
}

const node1 = new Node('Once');
const node2 = new Node('upon');

node1.nextNode = node2;

console.log(node1);
