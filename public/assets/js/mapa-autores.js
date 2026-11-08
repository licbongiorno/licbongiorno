/* Mapa de la psicología — /recursos/mapa-de-la-psicologia/
   El SVG y el índice vienen del HTML: sin JS, el mapa y el índice se ven completos y los nombres son enlaces. */
(function () {
  "use strict";
  var svg = document.querySelector("[data-mapa]");
  if (!svg) return;
  var raiz = svg.closest(".mapa");
  var ficha = raiz.querySelector("[data-mapa-ficha]");
  var nodos = Array.prototype.slice.call(svg.querySelectorAll(".mapa-nodo"));
  var rels = Array.prototype.slice.call(svg.querySelectorAll(".mapa-rel"));
  var trays = Array.prototype.slice.call(svg.querySelectorAll(".mapa-trayectoria"));
  var seleccion = null;
  raiz.classList.add("mapa--js");

  var cerrar = function () {
    seleccion = null;
    svg.classList.remove("hay-seleccion");
    nodos.concat(rels, trays).forEach(function (e) { e.classList.remove("activo"); });
    ficha.hidden = true; ficha.innerHTML = "";
  };

  var abrir = function (id, enfocar) {
    var fuente = document.getElementById("autor-" + id);
    if (!fuente) return;
    seleccion = id;
    svg.classList.add("hay-seleccion");
    var vecinos = {}; vecinos[id] = true;
    rels.forEach(function (r) {
      var on = r.getAttribute("data-de") === id || r.getAttribute("data-a") === id;
      r.classList.toggle("activo", on);
      if (on) { vecinos[r.getAttribute("data-de")] = true; vecinos[r.getAttribute("data-a")] = true; }
    });
    nodos.forEach(function (n) { n.classList.toggle("activo", !!vecinos[n.getAttribute("data-id")]); });
    trays.forEach(function (t) { t.classList.toggle("activo", t.getAttribute("data-id") === id); });
    ficha.innerHTML = "";
    var caja = document.createElement("div");
    caja.className = "mapa__ficha-cuerpo";
    caja.innerHTML = fuente.innerHTML;
    var acciones = document.createElement("p");
    acciones.className = "mapa__ficha-acciones";
    var leer = document.createElement("a");
    leer.className = "boton boton--chico"; leer.href = "/recursos/" + id + "/"; leer.textContent = "Leer el artículo";
    var x = document.createElement("button");
    x.type = "button"; x.className = "boton boton--secundario boton--chico"; x.textContent = "Cerrar";
    x.addEventListener("click", function () { var n = svg.querySelector('.mapa-nodo[data-id="' + id + '"]'); cerrar(); if (n) n.focus(); });
    acciones.appendChild(leer); acciones.appendChild(x);
    caja.appendChild(acciones);
    ficha.appendChild(caja);
    ficha.hidden = false;
    if (enfocar) {
      var n = svg.querySelector('.mapa-nodo[data-id="' + id + '"]');
      if (n && n.scrollIntoView) n.scrollIntoView({ block: "nearest", inline: "center" });
    }
  };

  nodos.forEach(function (n) {
    n.addEventListener("click", function (ev) {
      var id = n.getAttribute("data-id");
      if (seleccion === id) return; // segundo toque: sigue el enlace al artículo
      ev.preventDefault();
      abrir(id);
    });
    n.addEventListener("keydown", function (ev) { if (ev.key === "Escape") cerrar(); });
  });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && seleccion) cerrar(); });

  /* Filtro por escuela */
  var chipsEsc = Array.prototype.slice.call(raiz.querySelectorAll("[data-filtro-escuela]"));
  chipsEsc.forEach(function (c) {
    c.addEventListener("click", function () {
      var esc = c.getAttribute("data-filtro-escuela");
      chipsEsc.forEach(function (o) { o.setAttribute("aria-pressed", String(o === c)); });
      svg.setAttribute("data-filtro", esc);
      var dentro = {};
      nodos.forEach(function (n) {
        var ok = !esc || n.getAttribute("data-escuela") === esc;
        n.classList.toggle("atenuado", !ok);
        if (ok) dentro[n.getAttribute("data-id")] = true;
      });
      rels.forEach(function (r) { r.classList.toggle("atenuado", !!esc && !(dentro[r.getAttribute("data-de")] || dentro[r.getAttribute("data-a")])); });
      svg.querySelectorAll(".mapa-carril").forEach(function (g) { g.classList.toggle("atenuado", !!esc && g.getAttribute("data-escuela") !== esc); });
    });
  });

  /* Filtro por tipo de relación */
  raiz.querySelectorAll("[data-filtro-tipo]").forEach(function (c) {
    c.addEventListener("click", function () {
      var on = c.getAttribute("aria-pressed") !== "true";
      c.setAttribute("aria-pressed", String(on));
      svg.classList.toggle("oculta-" + c.getAttribute("data-filtro-tipo"), !on);
    });
  });

  /* Abrir desde el índice o desde un artículo: #autor-slug */
  var desdeHash = function () {
    var m = /^#autor-([a-z0-9-]+)$/.exec(location.hash);
    if (m && svg.querySelector('.mapa-nodo[data-id="' + m[1] + '"]')) abrir(m[1], true);
  };
  window.addEventListener("hashchange", desdeHash);
  desdeHash();
})();
