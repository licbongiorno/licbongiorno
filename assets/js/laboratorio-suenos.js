/* Laboratorio de sueños — /laboratorio-de-suenos/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;
  var form = document.querySelector('[data-lab-form="mi-sueno"]');
  if (!form) return;

  /* Contador de palabras del relato. */
  var relato = form.querySelector("#su-relato"), cont = form.querySelector("[data-su-palabras]");
  var contar = function () {
    var n = relato.value.trim() ? relato.value.trim().split(/\s+/).length : 0;
    cont.textContent = n + (n === 1 ? " palabra" : " palabras");
  };
  relato.addEventListener("input", contar);

  /* Las preguntas de amplificación nombran la imagen elegida. */
  var imagen = form.querySelector("[data-su-imagen]");
  var preguntas = form.querySelectorAll("[data-su-pregunta]");
  var originales = Array.prototype.map.call(preguntas, function (p) { return p.textContent; });
  var actualizar = function () {
    var x = imagen.value.trim().replace(/[.]+$/, "");
    preguntas.forEach(function (p, k) {
      p.textContent = x ? p.getAttribute("data-su-pregunta").replace("{x}", "«" + x + "»") : originales[k];
    });
  };
  imagen.addEventListener("input", actualizar);
  form.addEventListener("reset", function () { setTimeout(function () { contar(); actualizar(); }, 0); });
})();
