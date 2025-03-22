// JavaScript Logic for Toyota Parts Store

const carData = {
  "151D12345": { make: "Toyota", model: "Yaris" },
  "161D54321": { make: "Toyota", model: "Corolla" },
  "171C67890": { make: "Toyota", model: "Rav4" }
};

function lookupCar() {
  const reg = document.getElementById('reg-input').value.trim().toUpperCase();
  const output = carData[reg];
  document.getElementById('make-output').textContent = output ? output.make : 'Not Found';
  document.getElementById('model-output').textContent = output ? output.model : 'Not Found';
  localStorage.setItem('selectedModel', output ? output.model : '');
}

function toggleDropdown() {
  const menu = document.getElementById('dropdown-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function toggleSection(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

function addToCart(name, price, qtyInputId) {
  const qty = parseInt(document.getElementById(qtyInputId).value) || 1;
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(name + " added to cart.");
}

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const ul = document.getElementById('cart-items');
  const total = document.getElementById('total-cost');
  if (!ul || !total) return;
  ul.innerHTML = '';
  let sum = 0;
  cartItems.forEach((item, index) => {
    sum += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - Qty: ${item.qty} - €${(item.price * item.qty).toFixed(2)} 
    <button onclick="removeItem(${index})">Remove</button>`;
    ul.appendChild(li);
  });
  total.innerHTML = '<strong>Total: €' + sum.toFixed(2) + '</strong>';
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function goToCheckout() {
  window.location.href = "checkout.html";
}

function loadCheckoutSummary() {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const ul = document.getElementById('checkout-summary');
  const total = document.getElementById('checkout-total');
  if (!ul || !total) return;
  ul.innerHTML = '';
  let sum = 0;
  cartItems.forEach(item => {
    sum += item.price * item.qty;
    const li = document.createElement('li');
    li.textContent = `${item.name} - Qty: ${item.qty} - €${(item.price * item.qty).toFixed(2)}`;
    ul.appendChild(li);
  });
  total.innerHTML = '<strong>Total: €' + sum.toFixed(2) + '</strong>';
}
