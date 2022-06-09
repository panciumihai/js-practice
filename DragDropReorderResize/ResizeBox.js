function ResizeBox() {
  this.ref = null;

  this.container = null;
  this.task = null;

  this.topDot = null;
  this.rightDot = null;
  this.bottomDot = null;
  this.leftDot = null;
}

Object.assign(ResizeBox.prototype, {
  render(container) {
    let resizeBox = document.createElementNS(svgNamespace, 'g');
    this.container = container;

    resizeBox.id = 'resizeBox';

    let x = 100;
    let y = -100;
    this.topDot = new ResizeDot(x, y);
    this.topDot.render(resizeBox);

    this.rightDot = new ResizeDot(x, y);
    this.rightDot.render(resizeBox);

    this.bottomDot = new ResizeDot(x, y);
    this.bottomDot.render(resizeBox);

    this.leftDot = new ResizeDot(x, y);
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
  },
  bringToFront() {
    // document.getElementsByTagName('use')[0].remove();
    // let resizeBox = document.createElementNS(svgNamespace, 'use');
    // resizeBox.setAttribute('xlink:href', '#resizeBox');
    // this.container.appendChild(resizeBox);
    this.container.insertBefore(this.ref, null);
  },
  resizeRight() {
    this.task.setWidth(200);
    this.ref.remove();
    this.render(this.container, this.task);
  },
});

function ResizeDot(x, y) {
  this.x = x;
  this.y = y;
  this.ref = null;
  this.offset = 0;

  this.onMouseDown = () => {};
  this.onMouseMove = () => {};
  this.onMouseUp = () => {};
}

Object.assign(ResizeDot.prototype, {
  render(container) {
    let dot = document.createElementNS(svgNamespace, 'circle');

    dot.setAttribute('cx', this.x);
    dot.setAttribute('cy', this.y);
    dot.setAttribute('r', 10);
    dot.setAttribute('stroke', '#27888e');
    dot.setAttribute('stroke-width', 2);
    dot.setAttribute('fill', 'white');

    this.ref = dot;
    this.addEventListeners();
    container.appendChild(dot);
  },
  changePosition(x, y) {
    this.ref.setAttribute('cx', x);
    this.x = x;
    this.ref.setAttribute('cy', y);
    this.y = y;
  },
  addEventListeners() {
    const mouseDown = (e) => {
      // this.containerOffset = container.getBoundingClientRect();
      // const taskGrabOffset = this.ref.getBoundingClientRect();

      // this.grabOffset.left = e.x - taskGrabOffset.left;
      // this.grabOffset.top = e.y - taskGrabOffset.top;

      // this.createClone();
      // this.ref.classList.add('faded');
      this.offset = e.x - this.x;
      this.onMouseDown(e, this);

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
    };

    const mouseMove = (e) => {
      console.log(e.x + ' : ' + this.x + ' - ' + this.offset);

      this.ref.setAttribute('cx', e.x - this.offset);
      this.x = e.x - this.offset;
      this.onMouseMove(e, this);
    };

    const mouseUp = (e) => {
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);

      this.onMouseUp(e, this);
    };

    this.ref.addEventListener('mousedown', mouseDown);
  },
});
