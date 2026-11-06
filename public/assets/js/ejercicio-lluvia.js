/* Lienzo para dibujar — /ejercicio-persona-bajo-la-lluvia/
   Lápiz, goma, grosor, deshacer, borrar y descargar en PNG. El dibujo no sale del dispositivo. */
(function () {
  "use strict";
  var caja = document.querySelector("[data-lienzo]");
  if (!caja) return;
  var hoja = caja.querySelector("[data-lienzo-hoja]"), ctx = hoja.getContext("2d");
  var estado = caja.querySelector("[data-lienzo-estado]"), grosor = caja.querySelector("[data-lienzo-grosor]");
  var modo = "lapiz", dibujando = false, ultimo = null, historial = [], MAX = 30, tocado = false;

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
  var trazo = function (a, b) {
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.strokeStyle = modo === "goma" ? "#ffffff" : "#26241F";
    ctx.lineWidth = (+grosor.value || 4) * (modo === "goma" ? 4 : 1);
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
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
      estado.textContent = modo === "goma" ? "Goma activada." : "Lápiz activado.";
    });
  });
  caja.querySelector("[data-lienzo-deshacer]").addEventListener("click", function () {
    var prev = historial.pop();
    if (prev) { ctx.putImageData(prev, 0, 0); estado.textContent = "Se deshizo el último trazo."; }
    else estado.textContent = "No hay nada para deshacer.";
  });
  caja.querySelector("[data-lienzo-borrar]").addEventListener("click", function () {
    guardarPaso(); fondo(); tocado = false; estado.textContent = "La hoja quedó en blanco. Si fue sin querer, podés deshacer.";
  });
  caja.querySelector("[data-lienzo-bajar]").addEventListener("click", function () {
    if (!tocado) { estado.textContent = "Todavía no hay nada dibujado para guardar."; return; }
    hoja.toBlob(function (blob) {
      if (!blob) { estado.textContent = "No se pudo guardar el dibujo en este navegador."; return; }
      window.LAB.guardarArchivo("persona-bajo-la-lluvia.png", blob);
      estado.textContent = "Listo: el dibujo se descargó en tu dispositivo.";
    }, "image/png");
  });
})();
