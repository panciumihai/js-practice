function Dot(x, y, size = 5) {
  this.size = size;
  this.x = x + this.size / 2;
  this.y = y + this.size / 2;
  this.colored = false;

  this.ref = null;
  this.container = null;
}

Object.assign(Dot.prototype, {
  render(container) {
    let dot = document.createElementNS(svgNamespace, 'circle');

    dot.setAttribute('cx', this.x);
    dot.setAttribute('cy', this.y);
    dot.setAttribute('r', this.size);
    dot.setAttribute('fill', '#D5D5D5');

    dot.classList.add('dot');

    this.ref = dot;

    this.container = container;
    container.appendChild(dot);
  },
  checkDistance(currentX, currentY, range) {
    let distance = Math.hypot(
      currentX - this.size / 2 - this.x,
      currentY - this.size / 2 - this.y
    );

    if (distance > range) {
      this.ref.setAttribute('fill', '#D5D5D5');
      this.colored = false;
    } else {
      if (!this.colored) {
        this.ref.setAttribute(
          'fill',
          '#' + Math.floor(Math.random() * 16777215).toString(16)
        );
        this.colored = true;
      }
    }
  },
});
