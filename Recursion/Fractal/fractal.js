console.log('------Fractali Pătrate------');
// aici as vrea sa refactorizam putin si sa avem urmatorul behaviour:
// - citim depth si square size din inputuri de pe ecran
// - avem un buton de generate care porneste flow-ul de generare/pictare
// - un container de tip ecran care e tinta paintului
// - functii specializate: de generare node-uri, pictare, cleanup si ce mai consideri necesar astfel incat sa poti gestiona un flow nou la fiecare apasare de buton
// - te poti gandi la chestii suplimentare (de ex, cum sa facem cat mai usor configurabil aspectul unui patrat, cum sa putem configura sincronicitatea pictarilor, etc)

// nota: poti tine state (global) intre pasi daca vrei (nivel curent, dimensiune curenta, pozitii de referinta sau ce mai consideri necesar si-ti poti configura/etapiza flowul cum vrei
// poate vrei sa ai secvente gen createSquares, drawSquares, stepDeeper, updateSizeValues, si iar createSquares, drawSquares...etc (doar un exemplu de referinta nu un must le organizezi cum vrei)
// nota: functia drawSquares sau cum se va numi, cea apelata din butonul generate va ramane recursiva dar se va putea folosi de functii specializate (SRP) gen helperi pentru un singur "task"

const drawSquare = (parent, size, x, y) => {
  const square = document.createElement('div');

  const borderWidth = size / 10;
  square.style.width = `${size}px`;
  square.style.height = `${size}px`;
  square.style.borderWidth = `${borderWidth}px`;
  square.style.borderColor =
    '#' + Math.floor(Math.random() * 16777215).toString(16);

  square.classList.add('square');

  setTimeout(() => {
    square.classList.add('visible');
  }, 100);

  if (x === 0) square.style.left = `${-borderWidth}px`;
  if (x === 1) square.style.left = `calc(100% + ${borderWidth}px)`;
  if (y === 0) square.style.top = `${-borderWidth}px`;
  if (y === 1) square.style.top = `calc(100% + ${borderWidth}px)`;

  parent.appendChild(square);
  return square;
};

const createChildren = (parent, size, n = 0) => {
  if (n === 0) {
    return;
  }

  setTimeout(() => {
    createChildren(drawSquare(parent, size, 0, 0), size / 2, n - 1);
    createChildren(drawSquare(parent, size, 1, 0), size / 2, n - 1);
    createChildren(drawSquare(parent, size, 0, 1), size / 2, n - 1);
    createChildren(drawSquare(parent, size, 1, 1), size / 2, n - 1);
  }, 300);
};

const recursiveSquareFractal = (container, size, steps = 1) => {
  if (steps < 0 || steps > 8) return;
  const newSquare = drawSquare(container, size, -1, -1);
  createChildren(newSquare, size / 2, steps - 1);
};

const container = document.getElementById('container');
const depthInput = document.getElementById('depthInput');
const squareSize = document.getElementById('squareSize');

const eraseSquares = () => {
  container.innerHTML = '';
};

const generateSquaresButton = document.getElementById('generateButton');
generateSquaresButton.addEventListener('click', () => {
  eraseSquares();
  recursiveSquareFractal(container, squareSize.value, depthInput.value);
});
