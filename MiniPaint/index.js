const container = document.getElementById('paintScreen');

const paintScreen = new PaintScreen(100);
paintScreen.render(container);

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
    paintScreen.redoHistory.empty();
    paintScreen.save();
    window.removeEventListener('mouseup', endMove);
  };

  target.addEventListener('mousedown', function (event) {
    isCanvasClicked = true;
    paintScreen.addUndo();
    window.addEventListener('mouseup', endMove);
  });
}

mouseMoveWhilstDown(container);
