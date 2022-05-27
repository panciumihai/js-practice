function ProductForm(id) {
  this.id = id;
}

Object.assign(ProductForm.prototype, {
  render: function (container) {
    let template = document.getElementById('productFormTemplate');
    let form = document.importNode(template.content, true);
    form.querySelector('.addProduct').id = this.id;

    form.querySelector('button').addEventListener('click', this.add.bind(this));
    container.appendChild(form);
  },
  add: function (e) {
    e.preventDefault();

    let input = document.querySelector(`#${this.id} input`);
    let name = input.value;
    if (name.length === 0) return;

    input.value = '';

    console.log(`ProductForm: added a product ${name}`);
    pubsub.publish('addProduct', name);
  },
});
