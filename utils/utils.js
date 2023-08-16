
import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

export function totalQuantity () {
  let totalQuantity = 0;
  cart.forEach( (item) => {
    totalQuantity += item.quantity;
  });
  return totalQuantity;
}

export function calculateTotalPrice() {
  let totalPrice = 0;

  cart.forEach(item => {
    const matchingProduct = products.find(product => product.id === item.productId);
    if (matchingProduct) {
      totalPrice += matchingProduct.priceRupees * item.quantity;
    }
  });

  return totalPrice;
}