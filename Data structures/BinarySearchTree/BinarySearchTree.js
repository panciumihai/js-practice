function TreeNode(value, left = null, right = null) {
  this.value = value;
  this.left = left;
  this.right = right;
}

function BinarySearchTree() {
  this.root = null;
}

Object.assign(BinarySearchTree.prototype, {
  // ---- insert ----
  insert(value) {
    let newNode = new TreeNode(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  },

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) node.left = newNode;
      else this.insertNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this.insertNode(node.right, newNode);
    }
  },

  // ---- remove ----
  remove(value) {
    this.root = this.removeNode(this.root, value);
  },

  removeNode(node, value) {
    if (node === null) return null;
    else {
      if (value < node.value) {
        node.left = this.removeNode(node.left, value);
        return node;
      } else if (value > node.value) {
        node.right = this.removeNode(node.right, value);
        return node;
      } else {
        // remove node with no children
        if (node.left === null && node.right === null) {
          node = null;
          return node;
        }

        // remove node with one child
        if (node.left === null) {
          node = node.right;
          return node;
        } else if (node.right === null) {
          node = node.left;
          return node;
        }

        // remove node with two children
        const temporaryNode = this.getMinNode(node.right);
        node.value = temporaryNode.value;

        node.right = this.removeNode(node.right, temporaryNode.value);
        return node;
      }
    }
  },

  getMinNode(node) {
    if (node.left === null) return node;
    else this.getMinNode(node.left);
  },

  // ---- search ----
  search(value) {
    return this.searchNode(this.root, value);
  },

  searchNode(node, value) {
    if (node === null) return null;
    if (node.value === value) return node;
    if (node.left === null && node.right === null) return null;

    if (value < node.value) return this.searchNode(node.left, value);
    else return this.searchNode(node.right, value);
  },

  // ---- traversal ----
  traversalMethods: {
    preOrder: (node) => {
      if (node !== null) {
        console.log(node.value);
        traversalMethods.preOrder(node.left);
        traversalMethods.preOrder(node.right);
      }
    },

    inOrder: (node) => {
      if (node !== null) {
        traversalMethods.inOrder(node.left);
        console.log(node.value);
        traversalMethods.inOrder(node.right);
      }
    },

    postOrder: (node) => {
      if (node !== null) {
        traversalMethods.postOrder(node.left);
        traversalMethods.postOrder(node.right);
        console.log(node.value);
      }
    },
  },

  traversal(method = this.traversalMethods.inOrder) {
    method(this.root);
  },
});
