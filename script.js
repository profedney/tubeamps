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
