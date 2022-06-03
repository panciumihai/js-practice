function Button(id, label, callback) {
  this.ref = null;
  this.name = id;
  this.label = label;
  this.callback = callback;
}

Object.assign(Button.prototype, {
  render: function (container) {
    const button = document.createElement('button');

    button.id = this.id;
    button.innerText = this.label;
    this.ref = button;

    button.addEventListener('click', this.callback);
    container.appendChild(button);
  },
});
