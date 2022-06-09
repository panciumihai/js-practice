var svgNamespace = 'http://www.w3.org/2000/svg';

function DropZone() {
  this.ref = null;
}

Object.assign(DropZone.prototype, {
  render(container) {
    let dropZone = document.createElementNS(svgNamespace, 'rect');

    dropZone.setAttribute('x', 75);
    dropZone.setAttribute('y', -100);
    dropZone.setAttribute('width', 350);
    dropZone.setAttribute('height', 5);
    dropZone.setAttribute('fill', 'red');

    this.ref = dropZone;
    container.appendChild(dropZone);
    return dropZone;
  },
  changePosition(y) {
    this.ref.setAttribute('y', y);
  },
});

// const dropZone2 = new DroppableZone(1);
// dropZone2.render(svg);

// const dropZone3 = new DroppableZone(2);
// dropZone3.render(svg);
