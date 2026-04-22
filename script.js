// ================= MENU MOBILE =================
document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  if (!hamburger || !menu) return;

  hamburger.addEventListener("click", function () {
    menu.classList.toggle("active");
  });

});
