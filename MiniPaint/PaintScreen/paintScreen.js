function PaintScreen(size) {
  this.size = size;
  this.undoHistory = new Stash([], 30);
  this.redoHistory = new Stash([], 30);

  this.pixels = [];

  // Initialize pixels
  for (let i = 0; i < this.size; i++) {
    let row = [];
    for (let j = 0; j < this.size; j++) {
      const pixel = new Pixel(j, i);
      row.push(pixel);
    }
    this.pixels.push(row);
  }

  // check localStorage for saved paint
  let colors = this.load();
  if (colors === null) {
    colors = this.getColors();
  }

  this.undoHistory.push(colors);
}

Object.assign(PaintScreen.prototype, {
  render: function (container) {
    // create buttons
    const buttonsContainer = document.getElementById('buttonsContainer');

    const undoButton = new Button('undoButton', 'Undo', this.undo.bind(this));
    undoButton.render(buttonsContainer);

    const clearButton = new Button(
      'clearButton',
      'Clear',
      this.clear.bind(this)
    );
    clearButton.render(buttonsContainer);

    const redoButton = new Button('redoButton', 'Redo', this.redo.bind(this));
    redoButton.render(buttonsContainer);

    // render pixels
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.pixels[i][j].render(container);
      }
    }
    this.undo();
    this.redoHistory.empty();
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
    // extract colors from the pixels matrix
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
