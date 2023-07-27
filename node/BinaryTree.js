export class BinaryNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    search(value, node = this) {
        if (node === null || node.value === value) {
            return node;
        } else if (value < node.value) {
            return this.search(value, node.left);
        } else if (value > node.value) {
            return this.search(value, node.right);
        } else {
            return null;
        }
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

    delete(valueToDelete, node = this) {
        if (node === null) {
            return null;
        }

        else if (valueToDelete < node.value) {
            nodee.left = this.delete(valueToDelete, node.left);
            return node;
        }

        else if (valueToDelete > node.value) {
            node.right = this.delete(valueToDelete, node.right);
            return node;
        }

        else if (valueToDelete === node.value) {
            if (node.left === null) {
                return node.right;
            }

            else if (node.right === null) {
                return node.left;
            }

            else {
                node.right = this.lift(node.right, node);
                return node;
            }
        }
    }

    lift(node, nodeToDelete) {
        if (node.left !== null) {
            node.left = this.lift(node.left, nodeToDelete);
            return node;
        } else {
            nodeToDelete.value = node.value;
            return node.right;
        }
    }
}
