export class Node {
    constructor(data) {
        this.data = data;
        this.nextNode = null;
    }
}

export class LinkedList {
    constructor(firstNode) {
        this.firstNode = firstNode;
    }

    read(index) {
        let currentNode = this.firstNode;
        let currentIndex = 0;

        while (currentIndex < index) {
            if (currentNode === null) break;
            
            currentNode = currentNode.nextNode;
            currentIndex += 1;
        }

        return currentNode;
    }

    insertAtIndex(index, value) {
        let currentNode = this.firstNode;
        let currentIndex = 0;

        if (index === 0) {
            const newNode = new Node(value);
            this.firstNode = newNode;
            newNode.nextNode = currentNode;
            return;
        } 

        while (currentIndex < index - 1) {
            if (currentNode === null) break;

            currentNode = currentNode.nextNode;
            currentIndex += 1;
        }

        const newNode = new Node(value);
        newNode.nextNode = currentNode.nextNode;
        currentNode.nextNode = newNode;
    }

    deleteAtIndex(index) {
        let currentNode = this.firstNode;
        let currentIndex = 0;

        if (index === 0) {
            this.firstNode = this.firstNode.nextNode;
            return;
        } 

        while (currentIndex < index - 1) {
            currentNode = currentNode.nextNode;
            currentIndex++;
        }

        let nodeAfterDeletedNode = currentNode.nextNode.nextNode;
        currentNode.nextNode = nodeAfterDeletedNode;
    }

    indexOf(value) {
        let currentNode = this.firstNode;
        let currentIndex = 0;

        while (currentNode) {
            if (currentNode.data === value) {
                return currentIndex;
            }

            currentNode = currentNode.nextNode;
            currentIndex++;
        }

        return null;
    }
}
