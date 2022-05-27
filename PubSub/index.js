var pubsub = new PubSub();

document.addEventListener('DOMContentLoaded', () => {
  let body = document.querySelector('body');

  const productForm = new ProductForm('productForm');
  productForm.render(body);

  const checkout = new Checkout('checkout');
  checkout.render(body);

  const cart = new Cart('cart');
  cart.render(body);
});
