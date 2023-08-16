import {cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';

let productHtml = '';
products.forEach( (product) => {
  productHtml += `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src= ${product.image}>
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="./images/ratings/rating-${product.rating.stars*10}.png" alt="rating stars">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      ₹${product.priceRupees}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>


    <button data-product-id = "${product.id}" class="add-to-cart-button button-primary js-add-to-cart">
      Add to Cart
    </button>
</div>`;

});

document.querySelector('.products-grid').innerHTML = productHtml;

function updateCartQuantity () {
  let cartQuantity = 0;
  cart.forEach ( (item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart').forEach( (button)=> {
  button.addEventListener('click', () => { 
    const cartProductId = button.dataset.productId;
    addToCart(cartProductId);
    updateCartQuantity();
  });
});

