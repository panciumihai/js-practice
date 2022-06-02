function Cart(id) {
  this.id = id;
  this.products = [];
}

Object.assign(Cart.prototype, {
  render: function (container) {
    let template = document.getElementById('cartTemplate');
    let form = document.importNode(template.content, true);
    form.querySelector('.cart').id = this.id;
    container.appendChild(form);

    let ul = document.querySelector('.cart ul');
    ul.addEventListener('click', this.deleteProduct.bind(this));

    console.log('Cart: subscribe to event addProduct');
    pubsub.subscribe('addProduct', this.addProductToList.bind(this));
  },
  addProductToList: function (productName) {
    console.log(`Cart: I hear that addProduct event was emitted`);
    this.products = [productName, ...this.products];

    console.log('Cart: publish productsUpdate');
    pubsub.publish('productsUpdated', this.products);

    let ul = document.querySelector('#cart ul');
    ul.innerHTML = '';

    this.products.map((p) => {
      let li = document.createElement('li');
      li.innerHTML = p;
      ul.appendChild(li);
    });
  },
  deleteProduct: function (e) {
    let item = e.target.closest('li');
    let name = item.textContent;
    this.products = this.products.filter((p) => p !== name);
    item.parentElement.removeChild(item);

    console.log('Cart: publish deleteProduct event :D');
    pubsub.publish('productDeleted', this.products);
  },
});
