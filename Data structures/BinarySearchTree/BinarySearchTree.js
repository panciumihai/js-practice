const createTreeNode = (value, left = null, right = null) => {
  this.value = value;
  this.left = value;
  this.right = value;
  return {
    value,
    left,
    right,
  };
};

const BSTTraversalMethods = {
  preOrder: (node) => {
    if (node !== null) {
      console.log(node.value);
      BSTTraversalMethods.preOrder(node.left);
      BSTTraversalMethods.preOrder(node.right);
    }
  },

  inOrder: (node) => {
    if (node !== null) {
      BSTTraversalMethods.inOrder(node.left);
      console.log(node.value);
      BSTTraversalMethods.inOrder(node.right);
    }
  },

  postOrder: (node) => {
    if (node !== null) {
      BSTTraversalMethods.postOrder(node.left);
      BSTTraversalMethods.postOrder(node.right);
      console.log(node.value);
    }
  },
};

const BinarySearchTree = () => {
  this.root = null;

  const insert = (value) => {
    let newNode = createTreeNode(value);

    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  };

  const insertNode = (node, newNode) => {
    if (newNode.value < node.value) {
      if (node.left === null) node.left = newNode;
      else insertNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else insertNode(node.right, newNode);
    }
  };

  const remove = (value) => {
    root = removeNode(root, value);
  };

  const removeNode = (node, value) => {
    if (node === null) return null;
    else {
      if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.value) {
        node.right = removeNode(node.right, key);
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
        const temporaryNode = getMinNode(node.right);
        node.value = temporaryNode.value;

        node.right = removeNode(node.right, temporaryNode.value);
        return node;
      }
    }
  };

  const getMinNode = (node) => {
    if (node.left === null) return node;
    else getMinNode(node.left);
  };

  const search = (value) => {
    return searchNode(root, value);
  };

  const searchNode = (node, value) => {
    if (node === null) return null;
    if (node.value === value) return node;
    if (node.left === null && node.right === null) return null;

    if (value < node.value) return searchNode(node.left, value);
    else return searchNode(node.right, value);
  };

  const traversal = (method = BSTTraversalMethods.inOrder) => {
    method(root);
  };

  return {
    root,
    insert,
    remove,
    search,
    traversal,
  };
};
