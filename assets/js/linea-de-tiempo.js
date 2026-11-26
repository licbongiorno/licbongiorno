/* Línea de tiempo: filtro por región (el contenido ya viene en el HTML). */
(function () {
  "use strict";
  var filtro = document.querySelector("[data-lt-filtro]");
  var lt = document.querySelector("[data-linea-tiempo]");
  if (!filtro || !lt) return;
  filtro.hidden = false;
  filtro.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    var r = b.dataset.region;
    filtro.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    lt.querySelectorAll(".lt-hito").forEach(function (h) { h.hidden = !!r && h.dataset.region !== r; });
    lt.querySelectorAll(".lt-era").forEach(function (s) { s.hidden = !s.querySelector(".lt-hito:not([hidden])"); });
  });
})();
