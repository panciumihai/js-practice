function Dots(horizontalDotsNumber, verticalDotsNumber, area) {
  this.horizontalDotsNumber = horizontalDotsNumber;
  this.verticalDotsNumber = verticalDotsNumber;
  this.area = area;

  this.container = null;
  this.containerOffset = null;
  this.dots = [];
  this.createDots();
}

Object.assign(Dots.prototype, {
  render(container) {
    this.container = container;
    this.dots.forEach((dot) => {
      dot.render(container);
    });
    this.containerOffset = container.getBoundingClientRect();
    container.addEventListener('mousemove', this.mouseMove.bind(this));
  },
  createDots() {
    for (let i = 0; i < this.verticalDotsNumber; i++) {
      for (let j = 0; j < this.horizontalDotsNumber; j++) {
        let x = DOTS_GAP + (DOT_SIZE + DOTS_GAP) * j;
        let y = DOTS_GAP + (DOT_SIZE + DOTS_GAP) * i;
        const dot = new Dot(x, y);

        this.dots.push(dot);
      }
    }
  },
  mouseMove(e) {
    requestAnimationFrame(() => {
      let currentX = e.x - this.containerOffset.left;
      let currentY = e.y - this.containerOffset.top;
      this.dots.forEach((dot) =>
        dot.checkDistance(currentX, currentY, this.area)
      );
    });
  },
});
