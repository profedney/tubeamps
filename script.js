document.addEventListener("DOMContentLoaded", function () {

  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  if (!track || slides.length === 0) return;

  let index = 0;
  let startX = 0;
  let isDragging = false;
  let autoplayInterval;

  const SLIDE_INTERVAL = 4000;

  function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    updateSlide();
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
  }

  /* ===== BOTÕES ===== */
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  /* ===== AUTOPLAY ===== */
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, SLIDE_INTERVAL);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  startAutoplay();

  /* Pausa ao interagir */
  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);
  track.addEventListener('touchstart', stopAutoplay);

  /* ===== SWIPE TOUCH ===== */
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener('touchend', e => {
    if (!isDragging) return;

    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();

    isDragging = false;
  });

  /* ===== DRAG COM MOUSE (desktop) ===== */
  track.addEventListener('mousedown', e => {
    startX = e.clientX;
    isDragging = true;
    stopAutoplay();
  });

  track.addEventListener('mouseup', e => {
    if (!isDragging) return;

    let diff = startX - e.clientX;

    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();

    isDragging = false;
    startAutoplay();
  });

  track.addEventListener('mouseleave', () => {
    isDragging = false;
  });

});
