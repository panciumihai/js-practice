function Checkout(id) {
  this.id = id;
}

Object.assign(Checkout.prototype, {
  render: function (container) {
    let template = document.getElementById('checkoutTemplate');
    let form = document.importNode(template.content, true);
    form.querySelector('.checkout').id = this.id;

    const checkbox = form.getElementById('checkoutSubscribedInput');
    checkbox.addEventListener('click', this.subscribeToggle.bind(this));

    console.log(`Checkout: subscribed to event: productAdded`);
    pubsub.subscribe('productsUpdated', this.update.bind(this));

    console.log(`Checkout: subscribed to event: productDeleted`);
    pubsub.subscribe('productDeleted', this.decreaseProductsNumber.bind(this));

    container.appendChild(form);
  },
  subscribeToggle: function (e) {
    if (e.target.checked) {
      console.log(`Checkout: subscribed to event: productAdded`);
      pubsub.subscribe('productsUpdated', this.update.bind(this));

      console.log(`Checkout: subscribed to event: productDeleted`);
      pubsub.subscribe(
        'productDeleted',
        this.decreaseProductsNumber.bind(this)
      );
    } else {
      console.log(`Checkout: UNsubscribed to event: productAdded`);
      pubsub.unsubscribe('productsUpdated', this.update.bind(this));

      console.log(`Checkout: UNsubscribed to event: productDeleted`);
      pubsub.unsubscribe(
        'productDeleted',
        this.decreaseProductsNumber.bind(this)
      );
    }
  },
  update: function (products) {
    let checkout = document.getElementById(`${this.id}`);
    let productsNumber = checkout.querySelector('.info .productsNumber');
    productsNumber.textContent = products.length;
  },
  decreaseProductsNumber: function (products) {
    let checkout = document.getElementById(`${this.id}`);
    let productsNumber = checkout.querySelector('.info .productsNumber');
    productsNumber.textContent = products.length;
  },
});
