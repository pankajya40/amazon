export let cart = JSON.parse(localStorage.getItem('cart')) || [{productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b", quantity: 1}, {productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53", quantity: 1}];

export function addToCart (cartProductId) {
  let matchingItem;
  cart.forEach( (item) => {
    if (cartProductId===item.productId) {
      matchingItem = item;
    }
  });

  const quantitySelector = document.querySelector(`.js-quantity-selector-${cartProductId}`);
  const quantity =Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity+= quantity;
  } else {
    cart.push({productId: cartProductId, quantity: quantity});
  }

  saveToStorage();
  
}

function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeCartItems (productId) {
  const newCart = [];
  cart.forEach( (item) =>{
    if (item.productId !== productId) {
      newCart.push(item);
    }
  });
  cart = newCart;

  saveToStorage ();
}



