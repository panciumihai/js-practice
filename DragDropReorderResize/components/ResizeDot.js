function ResizeDot(x, y, direction = 'top') {
  this.x = x;
  this.y = y;
  this.ref = null;
  this.direction = direction;
  this.offset = 0;

  this.startPosition = 0;
  this.endPosition = 0;

  this.onMouseDown = () => {};
  this.onMove = (position, direction) => {};
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

    if (this.direction === 'left' || this.direction === 'right') {
      dot.classList.add('dotHorizontal');
    } else {
      dot.classList.add('dotVertical');
    }

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
      if (this.direction === 'left' || this.direction === 'right') {
        this.offset = e.x - this.x;
        this.startPosition = this.x;
      } else {
        this.offset = e.y - this.y;
        this.startPosition = this.y;
      }

      this.onMouseDown(e);

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
    };

    const mouseMove = (e) => {
      requestAnimationFrame(() => {
        let newPosition = 0;

        if (this.direction === 'left' || this.direction === 'right') {
          this.ref.setAttribute('cx', e.x - this.offset);
          this.x = e.x - this.offset;
          newPosition = this.startPosition - this.x;
        } else {
          this.ref.setAttribute('cy', e.y - this.offset);
          this.y = e.y - this.offset;
          newPosition = this.startPosition - this.y;
        }

        this.onMove(newPosition, this.direction);
      });
    };

    const mouseUp = (e) => {
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);

      this.onMouseUp(e);
    };

    this.ref.addEventListener('mousedown', mouseDown);
  },
});
