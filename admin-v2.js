
function loadAdminPage() {
  loadBanner();
  loadLogo();
  displayParts();
  displayAccessories();
}

function loadBanner() {
  const banner = localStorage.getItem("bannerImage");
  if (banner) document.getElementById("banner").src = banner;
}

function loadLogo() {
  const logo = localStorage.getItem("logoImage");
  if (logo) document.getElementById("logo").src = logo;
}

function updateBanner() {
  const input = document.getElementById("bannerUpload");
  const reader = new FileReader();
  reader.onload = function () {
    localStorage.setItem("bannerImage", reader.result);
    document.getElementById("banner").src = reader.result;
  };
  if (input.files[0]) reader.readAsDataURL(input.files[0]);
}

function updateLogo() {
  const input = document.getElementById("logoUpload");
  const reader = new FileReader();
  reader.onload = function () {
    localStorage.setItem("logoImage", reader.result);
    document.getElementById("logo").src = reader.result;
  };
  if (input.files[0]) reader.readAsDataURL(input.files[0]);
}

function displayParts() {
  const container = document.getElementById("partsManager");
  const parts = JSON.parse(localStorage.getItem("parts") || "[]");
  container.innerHTML = parts.map((part, i) => `
    <div class="admin-item" data-name="${part.name}" data-number="${part.partNumber}" data-make="${part.make}" data-model="${part.model}">
      <strong>${part.name}</strong> - ${part.partNumber} (${part.make} ${part.model}) - €${part.price}
      <button onclick="deletePart(${i})">Delete</button>
    </div>
  `).join("");
}

function displayAccessories() {
  const container = document.getElementById("accessoriesManager");
  const accessories = JSON.parse(localStorage.getItem("accessories") || "[]");
  container.innerHTML = accessories.map((item, i) => `
    <div class="admin-item" data-name="${item.name}" data-number="${item.partNumber}" data-make="${item.make}" data-model="${item.model}">
      <strong>${item.name}</strong> - ${item.partNumber} (${item.make} ${item.model}) - €${item.price}
      <button onclick="deleteAccessory(${i})">Delete</button>
    </div>
  `).join("");
}

function addPart() {
  const name = prompt("Part name:");
  const partNumber = prompt("Part number:");
  const make = prompt("Make:");
  const model = prompt("Model:");
  const price = prompt("Price:");
  const parts = JSON.parse(localStorage.getItem("parts") || "[]");
  parts.push({ name, partNumber, make, model, price });
  localStorage.setItem("parts", JSON.stringify(parts));
  displayParts();
}

function addAccessory() {
  const name = prompt("Accessory name:");
  const partNumber = prompt("Part number:");
  const make = prompt("Make:");
  const model = prompt("Model:");
  const price = prompt("Price:");
  const accessories = JSON.parse(localStorage.getItem("accessories") || "[]");
  accessories.push({ name, partNumber, make, model, price });
  localStorage.setItem("accessories", JSON.stringify(accessories));
  displayAccessories();
}

function deletePart(index) {
  const parts = JSON.parse(localStorage.getItem("parts") || "[]");
  parts.splice(index, 1);
  localStorage.setItem("parts", JSON.stringify(parts));
  displayParts();
}

function deleteAccessory(index) {
  const accessories = JSON.parse(localStorage.getItem("accessories") || "[]");
  accessories.splice(index, 1);
  localStorage.setItem("accessories", JSON.stringify(accessories));
  displayAccessories();
}
