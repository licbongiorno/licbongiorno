/* Lienzo para dibujar — mandala (/laboratorio-de-imaginacion-activa/) y persona bajo la lluvia.
   <div data-lienzo data-lienzo-archivo="nombre.png"> con <canvas data-lienzo-hoja>, botones [data-lienzo-modo],
   [data-lienzo-grosor], [data-lienzo-color] (opcional), [data-lienzo-simetria] (opcional: 1, 4, 6, 8; con espejo),
   [data-lienzo-deshacer], [data-lienzo-borrar], [data-lienzo-bajar] y [data-lienzo-estado].
   El dibujo no sale del dispositivo. */
(function () {
  "use strict";
  document.querySelectorAll("[data-lienzo]").forEach(function (caja) {
    var hoja = caja.querySelector("[data-lienzo-hoja]");
    if (!hoja || !hoja.getContext) return;
    var ctx = hoja.getContext("2d");
    var estado = caja.querySelector("[data-lienzo-estado]"), grosor = caja.querySelector("[data-lienzo-grosor]");
    var color = caja.querySelector("[data-lienzo-color]"), sim = caja.querySelector("[data-lienzo-simetria]");
    var archivo = caja.getAttribute("data-lienzo-archivo") || "dibujo.png";
    var modo = "lapiz", dibujando = false, ultimo = null, historial = [], MAX = 30, tocado = false;
    var decir = function (t) { if (estado) estado.textContent = t; };

    var fondo = function () { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, hoja.width, hoja.height); };
    fondo();
    var guardarPaso = function () {
      try { historial.push(ctx.getImageData(0, 0, hoja.width, hoja.height)); } catch (e) { return; }
      if (historial.length > MAX) historial.shift();
    };
    var punto = function (e) {
      var r = hoja.getBoundingClientRect();
      return { x: (e.clientX - r.left) * hoja.width / r.width, y: (e.clientY - r.top) * hoja.height / r.height };
    };
    var linea = function (a, b) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); };
    var trazo = function (a, b) {
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.strokeStyle = modo === "goma" ? "#ffffff" : (color ? color.value : "#26241F");
      ctx.lineWidth = (+(grosor && grosor.value) || 4) * (modo === "goma" ? 4 : 1);
      var n = sim ? parseInt(sim.value, 10) || 1 : 1;
      if (n <= 1) { linea(a, b); return; }
      var cx = hoja.width / 2, cy = hoja.height / 2;
      for (var k = 0; k < n; k++) {
        var ang = 2 * Math.PI * k / n, c = Math.cos(ang), s = Math.sin(ang);
        var rot = function (p, espejo) { var x = (espejo ? -(p.x - cx) : p.x - cx), y = p.y - cy; return { x: cx + x * c - y * s, y: cy + x * s + y * c }; };
        linea(rot(a, false), rot(b, false));
        linea(rot(a, true), rot(b, true));
      }
    };

    hoja.addEventListener("pointerdown", function (e) {
      if (e.button !== undefined && e.button > 0) return;
      e.preventDefault();
      guardarPaso();
      dibujando = true; tocado = true; ultimo = punto(e);
      try { hoja.setPointerCapture(e.pointerId); } catch (err) { /* sin captura */ }
      trazo(ultimo, { x: ultimo.x + 0.01, y: ultimo.y + 0.01 });
    });
    hoja.addEventListener("pointermove", function (e) {
      if (!dibujando) return;
      var p = punto(e); trazo(ultimo, p); ultimo = p;
    });
    var fin = function () { dibujando = false; ultimo = null; };
    hoja.addEventListener("pointerup", fin);
    hoja.addEventListener("pointercancel", fin);
    hoja.addEventListener("pointerleave", fin);

    caja.querySelectorAll("[data-lienzo-modo]").forEach(function (b) {
      b.addEventListener("click", function () {
        modo = b.getAttribute("data-lienzo-modo");
        caja.querySelectorAll("[data-lienzo-modo]").forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
        decir(modo === "goma" ? "Goma activada." : "Lápiz activado.");
      });
    });
    if (sim) sim.addEventListener("change", function () { decir(sim.value === "1" ? "Sin simetría." : "Simetría en " + sim.value + " ejes, con espejo."); });
    var bDes = caja.querySelector("[data-lienzo-deshacer]");
    if (bDes) bDes.addEventListener("click", function () {
      var prev = historial.pop();
      if (prev) { ctx.putImageData(prev, 0, 0); decir("Se deshizo el último trazo."); }
      else decir("No hay nada para deshacer.");
    });
    var bBor = caja.querySelector("[data-lienzo-borrar]");
    if (bBor) bBor.addEventListener("click", function () {
      guardarPaso(); fondo(); tocado = false; decir("La hoja quedó en blanco. Si fue sin querer, podés deshacer.");
    });
    var bBaj = caja.querySelector("[data-lienzo-bajar]");
    if (bBaj) bBaj.addEventListener("click", function () {
      if (!tocado) { decir("Todavía no hay nada dibujado para guardar."); return; }
      hoja.toBlob(function (blob) {
        if (!blob) { decir("No se pudo guardar el dibujo en este navegador."); return; }
        if (window.LAB) window.LAB.guardarArchivo(archivo, blob);
        decir("Listo: el dibujo se descargó en tu dispositivo.");
      }, "image/png");
    });
  });
})();
