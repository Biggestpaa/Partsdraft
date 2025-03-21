let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, price) {
  cart.push({ name: product, price: price });
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
  let cartList = document.getElementById('cart-list');
  if (!cartList) return;

  cartList.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((item, index) => {
    let li = document.createElement('li');
    li.innerHTML = item.name + ' - €' + item.price.toFixed(2) +
      ' <button onclick="removeFromCart(' + index + ')">X</button>';
    cartList.appendChild(li);
    totalPrice += item.price;
  });

  let totalDisplay = document.getElementById('total-price');
  if (totalDisplay) totalDisplay.textContent = 'Total: €' + totalPrice.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function checkout() {
  localStorage.removeItem('cart');
  cart = [];
  window.location.href = 'checkout.html';
}

window.onload = updateCart;


function showCartPreview() {
  const cartPreview = document.getElementById('cart-preview');
  if (cartPreview) {
    cartPreview.style.display = 'block';
    updateCartPreview();
  }
}

function hideCartPreview() {
  const cartPreview = document.getElementById('cart-preview');
  if (cartPreview) {
    cartPreview.style.display = 'none';
  }
}

function updateCartPreview() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartPreview = document.getElementById('cart-preview');
  if (!cartPreview) return;
  let html = '<ul>';
  cart.forEach(item => {
    html += `<li>${item.name} - €${item.price.toFixed(2)}</li>`;
  });
  html += '</ul>';
  cartPreview.innerHTML = cart.length ? html : '<p>Your cart is empty.</p>';
}
