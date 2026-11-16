/* Recorrido de mindfulness — /laboratorio-recorrido-mindfulness/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var caja = document.querySelector("[data-rm-actitudes]");
  if (!caja) return;
  var sal = caja.querySelector("[data-rm-salida]");
  var NIVEL = {
    "no juzgar": ["el nivel 2", "/laboratorio-de-mindfulness/"],
    "la paciencia": ["el nivel 3", "/laboratorio-de-meditacion/"],
    "la mente de principiante": ["el nivel 2", "/laboratorio-de-mindfulness/"],
    "la confianza": ["el nivel 1", "/laboratorio-de-presencia/"],
    "no esforzarse": ["el nivel 3", "/laboratorio-de-meditacion/"],
    "la aceptación": ["el nivel 2", "/laboratorio-de-mindfulness/"],
    "soltar": ["el nivel 3", "/laboratorio-de-meditacion/"]
  };
  var pintar = function () {
    var l = Array.prototype.map.call(caja.querySelectorAll("input[type=range]"), function (b) { return { n: b.getAttribute("data-rm"), v: +b.value }; });
    var min = l.slice().sort(function (a, b) { return a.v - b.v; })[0], max = l.slice().sort(function (a, b) { return b.v - a.v; })[0];
    sal.innerHTML = "";
    if (min.v === max.v) { sal.textContent = "Tus actitudes están parejas. Empezá por el nivel 1 y movés las barras a medida que practiques."; return; }
    var n = NIVEL[min.n];
    sal.appendChild(document.createTextNode("La actitud que más te cuesta hoy es " + min.n + ". Te puede ayudar " + n[0] + ": "));
    var a = document.createElement("a"); a.href = n[1]; a.textContent = "ir al laboratorio";
    sal.appendChild(a);
    sal.appendChild(document.createTextNode(". Tu actitud más fuerte, " + max.n + ", puede ser tu punto de apoyo."));
  };
  caja.addEventListener("input", pintar);
  pintar();
})();
