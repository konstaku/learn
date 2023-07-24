export class Queue {
    constructor() {
        this.queue = new DoublyLinkedList();
    }

    enque(value) {
        this.queue.insertAtEnd(value);
    }

    deque() {
        return this.queue.removeFromFront();
    }

    tail() {
        return this.queue.lastNode.data;
    }
}

export class DoublyLinkedList {
    constructor(firstNode = null, lastNode = null) {
        this.firstNode = firstNode;
        this.lastNode = lastNode;
    }

    insertAtEnd(value) {
        const newNode = new Node(value);

        if (!this.firstNode) {
            this.firstNode = newNode;
            this.lastNode = newNode;
        } else {
            newNode.previousNode = this.lastNode;
            this.lastNode.nextNode = newNode;
            this.lastNode = newNode;
        }
    }

    removeFromFront() {
        const result = this.firstNode;
        this.firstNode = this.firstNode.nextNode;
        return result;
    }
}

export class Node {
    constructor(data) {
        this.data = data;
        this.nextNode = null;
        this.previousNode = null;
    }
}
