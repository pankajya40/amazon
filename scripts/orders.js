import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
import {calculateTotalPrice} from '../utils/utils.js'

let orderItemHtml = '';

cart.forEach( (item) => {

  const productId = item.productId;
  let matchingProduct;

  products.forEach(product => {
    if (product.id ===productId) {
      matchingProduct = product;
    }
  });

  orderItemHtml += `
  <div class="product-image-container">
    <img src=${matchingProduct.image}>
  </div>

  <div class="product-details">
    <div class="product-name">
      ${matchingProduct.name}
    </div>
    <div class="product-delivery-date">
      Arriving on: August 15
    </div>
    <div class="product-quantity">
      ${item.quantity}
    </div>
    <button class="buy-again-button button-primary">
      <img class="buy-again-icon" src="images/icons/buy-again.png">
      <span class="buy-again-message">Buy it again</span>
    </button>
  </div>`;
});

document.querySelector('.js-order-details-grid').innerHTML = orderItemHtml;

document.querySelector('.js-total-ordered-you').innerHTML = `₹${calculateTotalPrice()}`;