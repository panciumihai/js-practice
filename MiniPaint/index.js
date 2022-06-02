function Pixel(x, y, size = 5) {
  this.id = '';
  this.x = x;
  this.y = y;
  this.size = size;
  this.changed = false;
  this.color = 'white';

  this.ref = null;
}

Object.assign(Pixel.prototype, {
  render: function (container) {
    const pixel = document.createElement('div');

    this.id = `pixel_${this.y}x${this.x}`;
    pixel.id = this.id;
    this.ref = pixel;

    pixel.style.width = `${this.size}px`;
    pixel.style.height = `${this.size}px`;
    pixel.style.left = `${this.x * this.size}px`;
    pixel.style.top = `${this.y * this.size}px`;

    pixel.style.background = this.color;

    pixel.classList.add('pixel');

    pixel.addEventListener('mouseenter', this.hover.bind(this));

    container.appendChild(pixel);
  },
  hover: function (event) {
    if (!isCanvasClicked) {
      return;
    }
    requestAnimationFrame(() => {
      this.color = currentColor;
      event.target.style.background = currentColor;
    });
  },
  setValue: function (color) {
    this.color = color;
    this.ref.style.background = color;
  },
});

function Matrix(size) {
  this.size = size;
  this.undoHistory = new Stash([], 30);
  this.redoHistory = new Stash([], 30);

  this.pixels = [];

  for (let i = 0; i < this.size; i++) {
    let row = [];
    for (let j = 0; j < this.size; j++) {
      const pixel = new Pixel(j, i);
      row.push(pixel);
    }
    this.pixels.push(row);
  }

  let colors = this.load();
  if (colors === null) {
    colors = this.getColors();
  }

  this.undoHistory.push(colors);
}

Object.assign(Matrix.prototype, {
  render: function (container) {
    let undoButton = document.getElementById('undoButton');
    undoButton.addEventListener('click', this.undo.bind(this));

    let redoButton = document.getElementById('redoButton');
    redoButton.addEventListener('click', this.redo.bind(this));

    let clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', this.clear.bind(this));

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.pixels[i][j].render(container);
      }
    }
    this.undo();
  },
  clear: function () {
    this.addUndo();
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.pixels[i][j].setValue('white');
      }
    }
    this.save();
  },
  getColors: function () {
    let colors = [];
    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        let value = this.pixels[i][j].color;
        row.push(value);
      }
      colors.push(row);
    }
    return colors;
  },

  addUndo: function () {
    let currentColors = this.getColors();
    this.undoHistory.push(currentColors);
  },

  addRedo: function () {
    const currentColors = this.getColors();
    this.redoHistory.push(currentColors);
  },

  undo: function () {
    if (this.undoHistory.isFull() || this.undoHistory.isEmpty()) return;

    const restorePoint = this.undoHistory.top();
    this.undoHistory.pop();
    this.addRedo();

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.pixels[i][j].setValue(restorePoint[i][j]);
      }
    }
    this.save();
  },

  redo: function () {
    if (this.redoHistory.isFull() || this.redoHistory.isEmpty()) return;

    const restorePoint = this.redoHistory.top();
    this.redoHistory.pop();
    this.addUndo();

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.pixels[i][j].setValue(restorePoint[i][j]);
      }
    }
    this.save();
  },
  save: function () {
    const currentColors = this.getColors();
    localStorage.setItem('paint', JSON.stringify(currentColors));
  },
  load: function () {
    return JSON.parse(localStorage.getItem('paint'));
  },
});

const container = document.getElementById('paintingCanvas');
const pixelsMatrix = new Matrix(100);
pixelsMatrix.render(container);

var isCanvasClicked = false;

const colorPicker = document.getElementById('colorPicker');
var currentColor = colorPicker.value;
colorPicker.addEventListener('change', (e) => {
  currentColor = e.currentTarget.value;
});

function mouseMoveWhilstDown(target) {
  var endMove = function (event) {
    event.stopPropagation();
    isCanvasClicked = false;
    pixelsMatrix.redoHistory.empty();
    pixelsMatrix.save();
    window.removeEventListener('mouseup', endMove);
  };

  target.addEventListener('mousedown', function (event) {
    isCanvasClicked = true;
    pixelsMatrix.addUndo();
    window.addEventListener('mouseup', endMove);
  });
}

mouseMoveWhilstDown(container);
