class BinaryNode {
    constructor(value, left = null, right = null) {1
        this.value = value;
        this.left = left;
        this.right = right;
        this.indent = '';
    }

    insertNode(value, node = this) {
        if (this.value === null) {
            this.value = value;
            this.left = null;
            this.right = null;
        }

        else if (value < node.value) {
            if (node.left === null) {
                node.left = new BinaryNode(value);
            } 

            else {
                this.insertNode(value, node.left);
            }
        } 

        else if (value > node.value) {
            if (node.right === null) {
                node.right = new BinaryNode(value);
            } 

            else {
                this.insertNode(value, node.right);
            }
        }
    }

    searchNode(value, node = this) {
        if (node === null || node.value === value) {
            return node;
        } 

        else if (value < node.value) {
            return this.searchNode(value, node.left);
        } 

        else if (value > node.value) {
            return this.searchNode(value, node.right);
        } 

        else {
            return null;
        }
    }

    deleteNode(valueToDelete, node = this) {
        if (node === null) {
            return null;
        }

        else if (valueToDelete < node.value) {
            node.left = this.deleteNode(valueToDelete, node.left);
            return node;
        }

        else if (valueToDelete > node.value) {
            node.right = this.deleteNode(valueToDelete, node.right);
            return node;
        }

        // We are deep enough to find the node to delete:
        else if (valueToDelete === node.value) {
            // If no left child, return right child
            if (node.left === null) {
                return node.right;
            }

            // If there is a left child, but no right child, return left child
            else if (node.right === null) {
                return node.left;
            }

            // If the node has both childs
            else {
                // Right child of a node is now the right child of the leftmost node
                node.right = this.liftNode(node.right, node);
                return node;
            }
        }
    }

    traverseAndPrint(node = this) {
        if (node === null) {
            return;
        }

        if (node.left !== null) {
            this.indent += '-';
            this.traverseAndPrint(node.left);
            this.indent = this.indent.slice(0, -1);
        }

        console.log(this.indent + node.value);

        if (node.right !== null) {
            this.indent += '-';
            this.traverseAndPrint(node.right);
            this.indent = this.indent.slice(0, -1);
        }
    }

    // Function is called in case when the deleted node has both childs
    // Its purpose is to find leftmost value of all childs and put it on top
    liftNode(node, nodeToDelete) {
        // Recursively look for a leftmost child
        if (node.left !== null) {
            node.left = this.liftNode(node.left, nodeToDelete);
            return node;
        } 

        // Base case: we found the leftmost child
        // Putting leftmost child value as a value of node to delete,
        // returning its right child with its branch
        else {
            nodeToDelete.value = node.value;
            return node.right;
        }
    }
}

export class BinaryTree extends BinaryNode {
    constructor(values) {
        const root = super(values[0]);

        for (let i = 1; i < values.length; i++) {
            values[i] = root.insertNode(values[i]);
        }

        return root;
    }
}
