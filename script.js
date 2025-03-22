
// --- ADMIN FUNCTIONS --- //
function saveBanner() {
  const input = document.getElementById('banner-upload');
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem('bannerImage', e.target.result);
      alert('Banner image saved!');
    };
    reader.readAsDataURL(file);
  }
}

function saveLogo() {
  const input = document.getElementById('logo-upload');
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem('cartLogo', e.target.result);
      alert('Logo image saved!');
    };
    reader.readAsDataURL(file);
  }
}

function updateProduct(id, key, value) {
  const parts = JSON.parse(localStorage.getItem('partsData')) || {};
  parts[id] = parts[id] || {};
  parts[id][key] = value;
  localStorage.setItem('partsData', JSON.stringify(parts));
}

function loadAdminParts() {
  const list = document.getElementById('admin-parts-list');
  if (!list) return;
  const parts = {
    oil_filter: { name: "Oil Filter", price: 20, desc: "High-efficiency oil filter", img: "images/oil_filter.jpg" },
    front_brake: { name: "Front Brake Pads", price: 150, desc: "Durable brake pads", img: "images/front_brake.jpg" },
    petrol_treat: { name: "Petrol Treatment", price: 29, desc: "Boosts performance", img: "images/petrol_treatment.jpg" }
  };
  const saved = JSON.parse(localStorage.getItem('partsData')) || {};
  Object.keys(parts).forEach(id => {
    const part = { ...parts[id], ...saved[id] };
    list.innerHTML += `
      <div>
        <h4>${id.replace('_', ' ')}</h4>
        <label>Name: <input value="${part.name}" onchange="updateProduct('${id}', 'name', this.value)" /></label><br/>
        <label>Price: <input type="number" value="${part.price}" onchange="updateProduct('${id}', 'price', this.value)" /></label><br/>
        <label>Description: <input value="${part.desc}" onchange="updateProduct('${id}', 'desc', this.value)" /></label><br/>
        <label>Image: <input type="file" onchange="savePartImage(event, '${id}')"></label>
      </div><hr/>
    `;
  });
}

function savePartImage(e, id) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      const parts = JSON.parse(localStorage.getItem('partsData')) || {};
      parts[id] = parts[id] || {};
      parts[id]['img'] = evt.target.result;
      localStorage.setItem('partsData', JSON.stringify(parts));
    };
    reader.readAsDataURL(file);
  }
}

function applyAdminSettings() {
  const banner = localStorage.getItem('bannerImage');
  if (banner) {
    const img = document.getElementById('banner-image');
    if (img) img.src = banner;
  }
  const logo = localStorage.getItem('cartLogo');
  if (logo) {
    const img = document.getElementById('cart-logo');
    if (img) img.src = logo;
  }
  const partsData = JSON.parse(localStorage.getItem('partsData') || '{}');
  Object.keys(partsData).forEach(id => {
    const part = partsData[id];
    const container = document.querySelector('[data-part="' + id + '"]');
    if (container) {
      container.querySelector('h3').textContent = part.name;
      container.querySelector('p.desc').textContent = part.desc;
      container.querySelector('p.price').innerHTML = "<strong>€" + parseFloat(part.price).toFixed(2) + "</strong>";
      container.querySelector('img').src = part.img;
    }
  });
}
