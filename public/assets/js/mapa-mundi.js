/* Mapa de psicologías del mundo: clic (o Enter) en un país muestra sus tradiciones. */
(function () {
  "use strict";
  var raiz = document.querySelector("[data-mapa-mundi]");
  var fuente = document.getElementById("mapa-mundi-datos");
  if (!raiz || !fuente) return;
  var D = JSON.parse(fuente.textContent);
  var panel = raiz.querySelector("[data-mm-panel]");
  var leyenda = raiz.querySelector("[data-mm-leyenda]");
  var activo = null;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function tarjeta(k) {
    var s = D.series[k];
    return '<a class="lab-tarjeta mm-serie" href="' + s.mapa + '"><h3>' + esc(s.nombre) + "</h3><p>" + esc(s.desc) + "</p></a>" +
      (s.glosario ? '<p class="mm-glosario"><a href="' + s.glosario + '">Ver el glosario</a></p>' : "");
  }

  function mostrar(nombre, series, el) {
    if (activo) activo.classList.remove("mm-sel");
    activo = el; if (el) el.classList.add("mm-sel");
    marcar(null);
    panel.innerHTML = '<h2 class="mm-titulo">' + esc(nombre) + "</h2>" +
      '<p class="mm-intro">' + (series.length > 1 ? "Tradiciones relacionadas con este lugar:" : "Tradición relacionada con este lugar:") + "</p>" +
      '<div class="mm-lista">' + series.map(function (k) { return '<div class="mm-item">' + tarjeta(k) + "</div>"; }).join("") + "</div>";
  }

  function marcar(k) {
    raiz.querySelectorAll(".mm-resalta").forEach(function (e) { e.classList.remove("mm-resalta"); });
    leyenda.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.serie === k ? "true" : "false"); });
    if (!k) return;
    raiz.querySelectorAll("[data-pais]").forEach(function (e) {
      if (D.paises[e.dataset.pais][1].indexOf(k) > -1) e.classList.add("mm-resalta");
    });
    raiz.querySelectorAll("[data-marca]").forEach(function (e) {
      if (D.marcas[+e.dataset.marca].series.indexOf(k) > -1) e.classList.add("mm-resalta");
    });
  }

  function elegir(el) {
    if (el.dataset.pais) { var p = D.paises[el.dataset.pais]; mostrar(p[0], p[1], el); }
    else if (el.dataset.marca) { var m = D.marcas[+el.dataset.marca]; mostrar(m.nombre, m.series, el); }
    panel.focus({ preventScroll: true });
    if (window.matchMedia("(max-width: 760px)").matches) panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  raiz.addEventListener("click", function (e) {
    var el = e.target.closest("[data-pais],[data-marca]");
    if (el) elegir(el);
  });
  raiz.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var el = e.target.closest("[data-pais],[data-marca]");
    if (el) { e.preventDefault(); elegir(el); }
  });

  leyenda.innerHTML = Object.keys(D.series).map(function (k) {
    return '<button type="button" data-serie="' + k + '" aria-pressed="false">' + esc(D.series[k].nombre) + "</button>";
  }).join("");
  leyenda.hidden = false;
  leyenda.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    var k = b.dataset.serie, ya = b.getAttribute("aria-pressed") === "true";
    if (activo) { activo.classList.remove("mm-sel"); activo = null; }
    marcar(ya ? null : k);
    if (!ya) panel.innerHTML = '<h2 class="mm-titulo">' + esc(D.series[k].nombre) + '</h2><p class="mm-intro">Los lugares resaltados en el mapa se relacionan con esta tradición.</p><div class="mm-lista"><div class="mm-item">' + tarjeta(k) + "</div></div>";
  });
})();
