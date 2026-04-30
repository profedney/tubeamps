// ================= MENU MOBILE =================
document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  if (!hamburger || !menu) return;

  hamburger.addEventListener("click", function () {
    menu.classList.toggle("active");
  });

});
// ================= SLIDESHOW =================
let slideIndex = 0;

function showSlides() {
  const slides = document.querySelectorAll(".mySlides");

  if (slides.length === 0) return;

  // remove classe active de todos
  slides.forEach(slide => slide.classList.remove("active"));

  // avança índice
  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  // ativa slide atual
  slides[slideIndex - 1].classList.add("active");

  // loop automático
  setTimeout(showSlides, 4000); // 4s
}

// inicia slideshow após carregar DOM
document.addEventListener("DOMContentLoaded", function () {
  showSlides();
});

