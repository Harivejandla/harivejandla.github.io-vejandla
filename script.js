// Dark mode toggle
const darkToggleBtn = document.getElementById('dark-toggle');

darkToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    darkToggleBtn.textContent = '☀️';
  } else {
    darkToggleBtn.textContent = '🌙';
  }
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightboxBtn = document.getElementById('close-lightbox');
const prevBtn = document.getElementById('prev-lightbox');
const nextBtn = document.getElementById('next-lightbox');

const images = [
  {
    src: 'images/photo1.jpg',
    alt: 'Photo 1 description',
    caption: 'Photo 1 Description',
  },
  {
    src: 'images/photo2.jpg',
    alt: 'Photo 2 description',
    caption: 'Photo 2 Description',
  },
  {
    src: 'images/photo3.jpg',
    alt: 'Photo 3 description',
    caption: 'Photo 3 Description',
  },
  {
    src: 'images/photo4.jpg',
    alt: 'Photo 4 description',
    caption: 'Photo 4 Description',
  },
];

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.hidden = false;
  lightbox.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
}

function updateLightbox() {
  const imgData = images[currentIndex];
  lightboxImg.src = imgData.src;
  lightboxImg.alt = imgData.alt;
  lightboxCaption.textContent = imgData.caption;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index)));
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(parseInt(item.dataset.index));
    }
  });
});

closeLightboxBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

lightbox.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    showPrev();
  } else if (e.key === 'ArrowRight') {
    showNext();
  }
});
