/*
 * Tube Amps & FX
 * JavaScript básico para navegação mobile
 * Autor: Edney Rossi
 */

function toggleMenu() {
  var menu = document.getElementById("navMobile");

  if (!menu) {
    return;
  }

  if (menu.className.indexOf("w3-show") === -1) {
    menu.className += " w3-show";
  } else {
    menu.className = menu.className.replace(" w3-show", "");
  }
}

// Slideshow automático (W3.CSS style)
var slideIndex = 0;

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 4000); // 4 segundos
}

// Inicia após carregar a página
document.addEventListener("DOMContentLoaded", showSlides);

