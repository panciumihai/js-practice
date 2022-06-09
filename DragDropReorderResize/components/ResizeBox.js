function ResizeBox() {
  this.ref = null;

  this.container = null;
  this.task = null;

  this.startWidth = 0;
  this.startHeight = 0;

  let x = 100;
  let y = -100;

  // events
  this.onEndResize = () => {};
  this.onStartResize = () => {};

  // resize dots
  this.topDot = new ResizeDot(x, y, 'top');
  this.topDot.onMouseDown = this.dotMouseDown.bind(this);
  this.topDot.onMove = this.dotMove.bind(this);
  this.topDot.onMouseUp = this.dotMouseUp.bind(this);

  this.rightDot = new ResizeDot(x, y, 'right');
  this.rightDot.onMouseDown = this.dotMouseDown.bind(this);
  this.rightDot.onMove = this.dotMove.bind(this);
  this.rightDot.onMouseUp = this.dotMouseUp.bind(this);

  this.bottomDot = new ResizeDot(x, y, 'bottom');
  this.bottomDot.onMouseDown = this.dotMouseDown.bind(this);
  this.bottomDot.onMove = this.dotMove.bind(this);
  this.bottomDot.onMouseUp = this.dotMouseUp.bind(this);

  this.leftDot = new ResizeDot(x, y, 'left');
  this.leftDot.onMouseDown = this.dotMouseDown.bind(this);
  this.leftDot.onMove = this.dotMove.bind(this);
  this.leftDot.onMouseUp = this.dotMouseUp.bind(this);
}

Object.assign(ResizeBox.prototype, {
  render(container) {
    let resizeBox = document.createElementNS(svgNamespace, 'g');
    this.container = container;

    this.topDot.render(resizeBox);
    this.rightDot.render(resizeBox);
    this.bottomDot.render(resizeBox);
    this.leftDot.render(resizeBox);

    container.appendChild(resizeBox);

    this.ref = resizeBox;
    return resizeBox;
  },
  setFocus(task) {
    this.task = task;

    let x = task.x + task.width / 2;
    let y = task.y;
    this.topDot.changePosition(x, y);

    x = task.x + task.width;
    y = task.y + task.height / 2;
    this.rightDot.changePosition(x, y);

    x = task.x + task.width / 2;
    y = task.y + task.height;
    this.bottomDot.changePosition(x, y);

    x = task.x;
    y = task.y + task.height / 2;
    this.leftDot.changePosition(x, y);
    this.bringToFront();
  },
  hide() {
    let x = 100;
    let y = -100;
    this.topDot.changePosition(x, y);
    this.rightDot.changePosition(x, y);
    this.bottomDot.changePosition(x, y);
    this.leftDot.changePosition(x, y);
  },
  bringToFront() {
    this.container.insertBefore(this.ref, null);
  },
  dotMouseDown() {
    this.startWidth = this.task.width;
    this.startHeight = this.task.height;
    this.onStartResize();
  },
  dotMove(amount, direction) {
    if (direction === 'top') {
      this.task.setHeight(this.startHeight + amount, true);
    }
    if (direction === 'right') {
      this.task.setWidth(this.startWidth - amount);
    }
    if (direction === 'bottom') {
      this.task.setHeight(this.startHeight - amount);
    }
    if (direction === 'left') {
      this.task.setWidth(this.startWidth + amount, true);
    }
    this.setFocus(this.task);
  },
  dotMouseUp() {
    this.onEndResize();
    this.setFocus(this.task);
  },
});
