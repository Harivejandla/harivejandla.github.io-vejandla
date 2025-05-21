console.log("Portfolio Loaded");

document.getElementById('dark-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

const gallery = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const captionText = document.getElementById('caption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let images = Array.from(gallery.querySelectorAll('img'));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

function updateLightbox() {
  const img = images[currentIndex];
  lightboxImage.src = img.src;
  captionText.textContent = img.dataset.caption || '';
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
}

images.forEach((img, index) => {
  img.addEventListener('click', () => openLightbox(index));
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Simple arrow key game logic
const player = document.getElementById('player');
let posX = 10, posY = 10;

document.addEventListener('keydown', (e) => {
  const step = 10;
  switch (e.key) {
    case "ArrowUp": posY = Math.max(0, posY - step); break;
    case "ArrowDown": posY = Math.min(170, posY + step); break;
    case "ArrowLeft": posX = Math.max(0, posX - step); break;
    case "ArrowRight": posX = Math.min(270, posX + step); break;
  }
  player.style.top = posY + "px";
  player.style.left = posX + "px";
});
