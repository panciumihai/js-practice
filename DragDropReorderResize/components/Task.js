var svgNamespace = 'http://www.w3.org/2000/svg';

function Task(index, value, x = 200, y = 50, width = 400, height = 70) {
  this.index = index;
  this.id = `task_${index}`;
  this.ref = null;
  this.rectRef = null;
  this.textRef = null;
  this.clone = null;

  this.value = value;

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.minWidth = 250;
  this.maxWidth = 450;
  this.minHeight = 50;
  this.maxHeight = 150;

  this.grabOffset = { top: 0, left: 0 };

  this.container = null;
  this.containerOffset = null;

  // events
  this.onMouseDown = () => {};
  this.onCloneMove = () => {};
  this.onMouseUp = () => {};
}

Object.assign(Task.prototype, {
  render(container) {
    this.container = container;
    let task = document.createElementNS(svgNamespace, 'g');
    this.ref = task;

    task.classList.add('task');

    let rect = document.createElementNS(svgNamespace, 'rect');
    this.rectRef = rect;

    task.appendChild(rect);

    let text = document.createElementNS(svgNamespace, 'text');
    this.textRef = text;

    text.innerHTML = this.value;

    task.appendChild(text);

    container.appendChild(task);
    this.refresh();

    this.addEventListeners();
    return task;
  },
  refresh() {
    this.ref.setAttribute('transform', `translate(${this.x}, ${this.y})`);

    this.rectRef.setAttribute('x', 0);
    this.rectRef.setAttribute('y', 0);
    this.rectRef.setAttribute('rx', 20);
    this.rectRef.setAttribute('ry', 20);
    this.rectRef.setAttribute('width', this.width);
    this.rectRef.setAttribute('height', this.height);
    this.rectRef.setAttribute('fill', '#27888e');

    this.textRef.setAttribute('x', this.width / 2);
    this.textRef.setAttribute('y', this.height / 2);
    this.textRef.setAttribute('dominant-baseline', 'middle');
    this.textRef.setAttribute('text-anchor', 'middle');
    this.textRef.setAttribute('fill', 'white');
  },
  createClone() {
    this.clone = this.ref.cloneNode(true);
    this.clone.querySelector('rect').setAttribute('fill', 'green');
    this.clone.style.opacity = 0.7;
    this.bringToFront();
    this.container.appendChild(this.clone);
  },
  removeClone() {
    this.clone.remove();
    this.clone = null;
  },
  fade(toggle = true) {
    if (toggle) this.ref.classList.add('faded');
    else this.ref.classList.remove('faded');
  },
  bringToFront() {
    this.container.insertBefore(this.ref, null);
  },
  setWidth(width, left = false) {
    if (width < this.minWidth || width > this.maxWidth) return;

    this.rectRef.setAttribute('width', width);
    this.textRef.setAttribute('x', width / 2);
    if (left) {
      let newX = this.x + (this.width - width);
      this.ref.setAttribute('transform', `translate(${newX}, ${this.y})`);
      this.x = newX;
    }
    this.width = width;
  },
  setHeight(height, up = false) {
    if (height < this.minHeight || height > this.maxHeight) return;

    this.rectRef.setAttribute('height', height);
    this.textRef.setAttribute('y', height / 2);
    if (up) {
      let newY = this.y + (this.height - height);
      this.ref.setAttribute('transform', `translate(${this.x}, ${newY})`);
      this.y = newY;
    }
    this.height = height;
  },

  addEventListeners() {
    const mouseDown = (e) => {
      this.containerOffset = container.getBoundingClientRect();
      const taskGrabOffset = this.ref.getBoundingClientRect();

      this.grabOffset.left = e.x - taskGrabOffset.left;
      this.grabOffset.top = e.y - taskGrabOffset.top;

      this.createClone();
      this.fade(true);
      this.onMouseDown(e, this);

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
    };

    const mouseMove = (e) => {
      requestAnimationFrame(() => {
        if (this.clone)
          this.clone.setAttribute(
            'transform',
            `translate(${
              e.x - this.containerOffset.left - this.grabOffset.left
            }, ${e.y - this.containerOffset.top - this.grabOffset.top})`
          );
      });

      this.onCloneMove(e, this);
    };

    const mouseUp = (e) => {
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);
      this.fade(false);
      this.removeClone();
      this.onMouseUp(e, this);
    };

    this.ref.addEventListener('mousedown', mouseDown);
  },
});
