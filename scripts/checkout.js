import {cart, removeCartItems} from '../data/cart.js';
import {products} from '../data/products.js';
import { totalQuantity, calculateTotalPrice } from '../utils/utils.js';

let cartItemHtml = '';

cart.forEach( (item) => {

  const productId = item.productId;
  let matchingProduct;

  products.forEach(product => {
    if (product.id ===productId) {
      matchingProduct = product;
    }
  });

  cartItemHtml += 
  `<div class="cart-item-container js-cart-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src=${matchingProduct.image}>

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${matchingProduct.priceRupees}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${item.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-cart" data-delete-id = ${matchingProduct.id}>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" 
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              ₹49 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              ₹99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
});


document.querySelector('.order-summary').innerHTML = cartItemHtml;

document.querySelectorAll('.js-delete-cart').forEach( (deleteCart) => {
  deleteCart.addEventListener('click', () =>{
    const productId = deleteCart.dataset.deleteId;
    removeCartItems(productId);
    
    document.querySelector(`.js-cart-container-${productId}`).remove();
    location.reload();
  });
});

document.querySelector('.js-checkout-total-items').innerHTML = `Checkout (${totalQuantity()} Items)`;

document.querySelector('.payment-summary').innerHTML = 
`<div class="payment-summary-title">Order Summary</div>

<div class="payment-summary-row">
  <div>Items (${totalQuantity()}):</div>
  <div class="payment-summary-money">₹${calculateTotalPrice()}</div>
</div>

<div class="payment-summary-row">
  <div>Shipping &amp; handling:</div>
  <div class="payment-summary-money">₹49</div>
</div>

<div class="payment-summary-row subtotal-row">
  <div>Total before tax:</div>
  <div class="payment-summary-money">₹${calculateTotalPrice()+49}</div>
</div>

<div class="payment-summary-row">
  <div>Estimated tax (10%):</div>
  <div class="payment-summary-money">₹${((calculateTotalPrice()+49)*0.1).toFixed(2)}</div>
</div>

<div class="payment-summary-row total-row">
  <div>Order total:</div>
  <div class="payment-summary-money">₹${totalOrderWithTax ()}</div>
</div>

<button class="place-order-button button-primary js-place-order">Place your order</button>
<p class="js-you-placed"></p>`;


document.querySelector('.js-place-order').addEventListener('click', () =>{
  document.querySelector('.js-you-placed').innerHTML= '<a href="./orders.html"><button class="place-order-button button-primary">Check your order</button></a>';  
});


function totalOrderWithTax () {
  return ((calculateTotalPrice()+49)*0.1) + calculateTotalPrice();
}
