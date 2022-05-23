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
books.push('Full stack');

console.log(`Is full? ${books.isFull()}`);
console.log(books.getValues());

console.log(`Current size: ${books.getSize()}`);

// ----------------------------- End Stash Test -------------------------
