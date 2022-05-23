'use strict';

let numbers = [1, 2, 2, 3, 4, 5, 5, 2];

const recursiveCounter = (list, number) => {
  if (list.length === 0) return '';
  let currentValue = list.shift();
  //mereu sari primul element din lista, poate ar trebui sa captezi return value de la .shift() si sa
  //compari cu numarul in loc sa folosesti list[0] dupa ce shiftate lista (deja ai scos primul element)

  // R: Mi-a scapat cazul asta. Good catch!
  if (currentValue === number) return 1 + recursiveCounter(list, number);
  return recursiveCounter(list, number);
};

console.log('------Numărare recursivă------ ');
console.log(recursiveCounter(numbers, 2)); //intuiesc ca daca pui tot un 2 pe prima pozitie in lista in loc de 1 iti va da acelasi raspuns

//--------------------
// as dori sa modifici functia asta astfel incat sa poata lucra cu un alfabet extensibil gen ["a", "b", "c"], sau de exemplu 0, 1, 2 in loc de 0 si 1
// R: done

const elements = ['a', 'b', 'c'];
let combinations = [];

const binaryCombinations = (length, combination = '') => {
  if (combination.length === length) {
    combinations.push(combination);
    return '';
  }

  for (let e of elements) {
    binaryCombinations(length, combination + e);
  }
};

console.log('-----Generare recursivă-------');
binaryCombinations(elements.length);
console.log(combinations);
//--------------------

const factorial = (number) => {
  if (number <= 1) return 1;
  return number * factorial(number - 1);
};

console.log('------Factorial------ ');
console.log(factorial(5));
