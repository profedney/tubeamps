// ===================== INIT =====================
document.addEventListener("DOMContentLoaded", function () {
  initCarousel();
});


// ===================== SLIDESHOW =====================
let slideIndex = 0;

function initCarousel() {
  const slides = document.getElementsByClassName("mySlides");

  // proteção: evita erro se não houver slides
  if (!slides || slides.length === 0) return;

  showSlides();
}

function showSlides() {
  const slides = document.getElementsByClassName("mySlides");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 4000); // 4 segundos
}


// ===================== MENU MOBILE =====================
function toggleMenu() {
  const nav = document.getElementById("navMobile");

  if (!nav) return;

  if (nav.className.indexOf("w3-show") === -1) {
    nav.className += " w3-show";
  } else {
    nav.className = nav.className.replace(" w3-show", "");
  }
}
