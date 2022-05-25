'use strict';
// ------------------------ Stash Test -------------------------------
const books = Stash(['Atomic Habits', 'Blue Zones'], 4);

console.log(books);
books.push('Richest man in Babylon');
console.log(books.getValues());
books.pop();
console.log(books.top());

books.pop();
books.pop();

console.log(`Is empty? ${books.isEmpty()}`);

books.push('Sapiens');
books.push('Homo Deus');
books.push('Meditation');
books.push('Enzima Miracol');
books.push('Full Stash');

console.log(`Is full? ${books.isFull()}`);
console.log(books.getValues());

console.log(`Current size: ${books.getSize()}`);

//----------------------------- Double Linked List Test -------------------------
console.log('------ Double Linked List -----');
console.log('');
console.log('');

const stations = DoublyLinkedList();

stations.insertFirst('Lujerului');
stations.insertFirst('Gorjului');
stations.displayForward();

stations.deleteFirst();
stations.displayForward();

stations.deleteFirst();
stations.displayForward();

stations.deleteFirst();
stations.displayForward();

stations.insertLast('Politehnica');
stations.displayForward();

stations.insertLast('Eroiilor');
stations.displayForward();

stations.insertLast('Timpuri Noi');
stations.displayForward();

stations.deleteLast();
stations.displayForward();

stations.deleteLast();
stations.displayForward();

stations.deleteLast();
stations.displayForward();

stations.deleteLast();
stations.displayForward();

stations.insertLast('Timpuri Noi');
stations.displayForward();

stations.insertLast('Timpuri Noi');
stations.displayForward();

stations.insertAfter('Timpuri Noi', 'Preciziei');
stations.displayForward();

stations.deleteNode('Timpuri Noi');
stations.displayBackward();
stations.displayForward();

try {
  stations.insertAfter('Timpuri Noi2', 'Preciziei');
} catch (error) {
  console.log(error.message);
}
stations.displayForward();

stations.deleteNode('Timpuri Noi');
stations.displayBackward();

//----------------------------- Binary Search Tree Test -------------------------
console.log('------ Binary Search Tree -----');
const binaryTree = BinarySearchTree();

binaryTree.insert(5);
binaryTree.insert(3);
binaryTree.insert(2);
binaryTree.insert(4);

binaryTree.insert(6);
binaryTree.insert(7);
binaryTree.insert(1);
binaryTree.insert(12);

console.log(root);

binaryTree.remove(3);
console.log(root);

console.log(binaryTree.search(1));
console.log(binaryTree.search(15));

console.log('------ inOrder -----');
binaryTree.traversal();
console.log('------ preOrder -----');
binaryTree.traversal(BSTTraversalMethods.preOrder);
console.log('------ postOrder -----');
binaryTree.traversal(BSTTraversalMethods.postOrder);
