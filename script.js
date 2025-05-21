// Dark mode toggle with persistence
const darkToggle = document.getElementById('dark-toggle');
const body = document.body;

function setDarkMode(enabled) {
  if (enabled) {
    body.classList.add('dark');
    darkToggle.textContent = '☀️';
  } else {
    body.classList.remove('dark');
    darkToggle.textContent = '🌙';
  }
  localStorage.setItem('darkMode', enabled ? 'true' : 'false');
}

darkToggle.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  setDarkMode(!isDark);
});

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true') {
    setDarkMode(true);
  } else if (saved === 'false') {
    setDarkMode(false);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }
});


// LIGHTBOX FUNCTIONALITY
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.getElementById('lightbox-close');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentIndex = -1;

function openLightbox(index) {
  const item = galleryItems[index];
  if (!item) return;
  currentIndex = index;
  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = item.querySelector('img').alt || '';
  lightboxCaption.textContent = item.dataset.caption || '';
  lightbox.hidden = false;
  lightbox.focus();
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  currentIndex = -1;
}

function showPrev() {
  if (currentIndex === -1) return;
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox(currentIndex);
}

function showNext() {
  if (currentIndex === -1) return;
  currentIndex = (currentIndex + 1) % galleryItems.length;
  openLightbox(currentIndex);
}

// Open lightbox on click or keyboard (Enter/Space)
galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(i);
    }
  });
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

// Close on Escape key or lightbox background click
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lightbox.hidden) {
    closeLightbox();
  }
  if (!lightbox.hidden) {
    if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'ArrowRight') {
      showNext();
    }
  }
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});
