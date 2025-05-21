// Placeholder for any JavaScript functionality
console.log("Welcome to Vejandla's Portfolio!");

(() => {
  const gallery = document.querySelector('#gallery .gallery');
  if (!gallery) return; // safety check if gallery is missing

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const captionText = document.getElementById('caption');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const images = Array.from(gallery.querySelectorAll('img'));
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
    closeBtn.focus(); // accessibility focus
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // restore scroll
    images[currentIndex].focus(); // return focus to thumbnail
  }

  function updateLightbox() {
    const img = images[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    captionText.textContent = img.dataset.caption || img.alt || '';
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
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') showNext();
    else if (e.key === 'ArrowLeft') showPrev();
  });

  // Touch swipe support
  let startX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX;
  });
  lightbox.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].screenX;
    const diffX = endX - startX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) showPrev();
      else showNext();
    }
  });
})();
