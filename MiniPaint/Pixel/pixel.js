function Pixel(x, y, size = 5) {
  this.id = '';
  this.ref = null;

  this.x = x;
  this.y = y;
  this.size = size;

  this.color = 'white';
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
