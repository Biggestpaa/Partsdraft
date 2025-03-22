
function loadBanner() {
  const stored = localStorage.getItem('bannerImage');
  if (stored) {
    const banner = document.getElementById('banner-image');
    if (banner) banner.src = stored;
  }
}

function saveBanner() {
  const input = document.getElementById('banner-upload');
  if (!input || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const dataUrl = e.target.result;
    localStorage.setItem('bannerImage', dataUrl);
    const banner = document.getElementById('banner-image');
    if (banner) banner.src = dataUrl;
    alert('Banner updated successfully!');
  };
  reader.readAsDataURL(input.files[0]);
}
