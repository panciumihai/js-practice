/// ------Generare stele------
// solutia e ok, te rog s-o modifici astfel incat in loc de stele in consola sa afiseze patrate pe ecran in aceeasi maniera
// ne vor trebui:
// o functie specializata care stie sa creeze un nod de tip square (primeste parametri de dimensiuni si pozitii) createSquare()
// o functie separata de paint care primeste nodul si stie sa-l picteze pe ecran paintSquare()
// o functie recursiva care creaza patternul pe ecran.

const paintSquare = (parent, size = 25) => {
  const newSquare = document.createElement('div');
  newSquare.classList.add('square');
  newSquare.style.width = size;
  newSquare.style.height = size;
  newSquare.style.background =
    '#' + Math.floor(Math.random() * 16777215).toString(16);

  setTimeout(() => {
    newSquare.classList.add('visible');
  }, 100);
  parent.appendChild(newSquare);
};

const printRow = (rowContainer, n) => {
  if (n <= 0) return;
  paintSquare(rowContainer);
  printRow(rowContainer, n - 1);
};

const raisingStars = (n, i = 1) => {
  if (n === 0) {
    return;
  }

  let newRow = document.createElement('div');
  newRow.classList.add('row');
  document.getElementById('container').appendChild(newRow);
  printRow(newRow, i);

  raisingStars(n - 1, i + 1);
};

const fallingStars = (n) => {
  if (n === 0) {
    return;
  }

  let newRow = document.createElement('div');
  newRow.classList.add('row');
  document.getElementById('container').appendChild(newRow);
  printRow(newRow, n);

  fallingStars(n - 1);
};

const starsTriangle = (n) => {
  if (n < 0 || n > 20) {
    console.log('Please enter maximum 20 stars.');
    return;
  }

  raisingStars(n);
  fallingStars(n - 1);
};

console.log('------Generare stele------');
starsTriangle(10);
