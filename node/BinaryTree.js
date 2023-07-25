
export class BinaryNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    insert(value, node = this) {
        if (value < node.value) {
            if (node.left === null) {
                node.left = new BinaryNode(value);
            } else {
                this.insert(value, node.left);
            }
        } else if (value > node.value) {
            if (node.right === null) {
                node.right = new BinaryNode(value);
            } else {
                this.insert(value, node.right);
            }
        }
    }
}