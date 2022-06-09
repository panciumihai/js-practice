var svgNamespace = 'http://www.w3.org/2000/svg';

function Task(index, value, x = 50, y = 50, width = 400, height = 70) {
  this.index = index;
  this.id = `task_${index}`;
  this.ref = null;
  this.rectRef = null;
  this.textRef = null;
  this.clone = null;

  this.value = value;

  this.x = x;
  this.y = y;
  this.grabOffset = { top: 0, left: 0 };
  this.width = width;
  this.height = height;

  this.container = null;
  this.containerOffset = null;

  // events
  this.onMouseDown = () => {};
  this.onCloneMove = () => {};
  this.onMouseUp = () => {};
}

Object.assign(Task.prototype, {
  render(container) {
    // change with container
    this.container = container;
    let task = document.createElementNS(svgNamespace, 'g');

    task.setAttribute('transform', `translate(${this.x}, ${this.y})`);
    task.classList.add('task');

    let rect = document.createElementNS(svgNamespace, 'rect');
    this.rectRef = rect;

    rect.setAttribute('x', 0);
    rect.setAttribute('y', 0);
    rect.setAttribute('rx', 20);
    rect.setAttribute('ry', 20);
    rect.setAttribute('width', this.width);
    rect.setAttribute('height', this.height);
    rect.setAttribute('fill', '#27888e');

    task.appendChild(rect);

    let text = document.createElementNS(svgNamespace, 'text');
    this.textRef = text;

    text.setAttribute('x', this.width / 2);
    text.setAttribute('y', 35);
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'white');
    text.innerHTML = this.value;

    task.appendChild(text);

    container.appendChild(task);
    this.ref = task;

    this.addDragEvents();
    return task;
  },
  createClone() {
    this.clone = this.ref.cloneNode(true);
    this.clone.querySelector('rect').setAttribute('fill', 'green');
    this.clone.style.opacity = 0.7;
    this.container.appendChild(this.clone);
  },
  removeClone() {
    this.clone.remove();
    this.clone = null;
  },
  setWidth(width) {
    this.rectRef.setAttribute('width', width);
    this.textRef.setAttribute('x', width / 2);
  },

  addDragEvents() {
    const mouseDown = (e) => {
      this.containerOffset = container.getBoundingClientRect();
      const taskGrabOffset = this.ref.getBoundingClientRect();

      this.grabOffset.left = e.x - taskGrabOffset.left;
      this.grabOffset.top = e.y - taskGrabOffset.top;

      this.createClone();
      this.ref.classList.add('faded');
      this.onMouseDown(e, this);

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
    };

    const mouseMove = (e) => {
      this.clone.setAttribute(
        'transform',
        `translate(${e.x - this.containerOffset.left - this.grabOffset.left}, ${
          e.y - this.containerOffset.top - this.grabOffset.top
        })`
      );
      this.onCloneMove(e, this);
    };

    const mouseUp = (e) => {
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);
      this.ref.classList.remove('faded');
      this.removeClone();
      this.onMouseUp(e, this);
    };

    this.ref.addEventListener('mousedown', mouseDown);
  },
});
