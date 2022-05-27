function Checkout(id) {
  this.id = id;
}

Object.assign(Checkout.prototype, {
  render: function (container) {
    let template = document.getElementById('checkoutTemplate');
    let form = document.importNode(template.content, true);
    form.querySelector('.checkout').id = this.id;

    console.log(`Checkout: subscribed to event: productAdded`);
    pubsub.subscribe('productsUpdated', this.update.bind(this));

    console.log(`Checkout: subscribed to event: productDeleted`);
    pubsub.subscribe('productDeleted', this.decreaseProductsNumber.bind(this));

    container.appendChild(form);
  },
  update: function (products) {
    let checkout = document.getElementById(`${this.id}`);
    let productsNumber = checkout.querySelector('.info .productsNumber');
    productsNumber.textContent = products.length;
  },
  decreaseProductsNumber: function () {
    let checkout = document.getElementById(`${this.id}`);
    let productsNumber = checkout.querySelector('.info .productsNumber');
    productsNumber.textContent = +productsNumber.textContent - 1;
  },
});
