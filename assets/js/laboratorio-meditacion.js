/* Laboratorio de meditación — /laboratorio-de-meditacion/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* ---------- Temporizador de sesión con campanas ---------- */
  var s = document.querySelector("[data-med-sesion]");
  if (s) {
    var reloj = s.querySelector("[data-med-reloj]"), est = s.querySelector("[data-med-estado]"), mitad = s.querySelector("[data-med-mitad]");
    var be = s.querySelector("[data-med-empezar]"), bf = s.querySelector("[data-med-frenar]"), tm = null, tMitad = null;
    var minutos = function () { return parseInt(s.querySelector('input[name="med-min"]:checked').value, 10); };
    var preparar = function () {
      if (tm && tm.activo()) return;
      tm = LAB.temporizador(minutos() * 60, reloj, function () {
        clearTimeout(tMitad); LAB.campana(); est.textContent = "Terminó la sesión."; be.disabled = false; bf.disabled = true;
      });
      reloj.textContent = LAB.mmss(minutos() * 60);
    };
    s.addEventListener("change", function (e) { if (e.target !== mitad) preparar(); });
    be.addEventListener("click", function () {
      preparar(); LAB.campana(); tm.empezar();
      if (mitad.checked) tMitad = setTimeout(LAB.campana, minutos() * 30000);
      est.textContent = "Empezó la sesión de " + minutos() + " minutos.";
      be.disabled = true; bf.disabled = false;
    });
    bf.addEventListener("click", function () { tm.frenar(); clearTimeout(tMitad); est.textContent = "Sesión detenida."; be.disabled = false; bf.disabled = true; });
    preparar();
  }

  /* ---------- Una palabra que calma ---------- */
  var pal = document.querySelector("[data-med-palabra]");
  if (pal) {
    var ecos = document.querySelectorAll("[data-med-palabra-eco]");
    pal.addEventListener("input", function () { var v = pal.value.trim() || "calma"; ecos.forEach(function (e) { e.textContent = v; }); });
  }

  /* ---------- Mandala ---------- */
  var svg = document.querySelector("[data-med-mandala]");
  if (svg) {
    var NS = "http://www.w3.org/2000/svg", C = 160;
    var el = function (tag, at) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); return e; };
    var dibujar = function () {
      while (svg.childNodes.length > 1) svg.removeChild(svg.lastChild);
      var simetria = LAB.azar([4, 6, 8, 12]), anillos = 3 + Math.floor(Math.random() * 3);
      svg.appendChild(el("circle", { cx: C, cy: C, r: 150, class: "mandala-borde" }));
      for (var a = anillos; a >= 1; a--) {
        var r = 140 * a / anillos, forma = LAB.azar(["petalo", "circulo", "rombo"]), tam = 140 / anillos * (0.7 + Math.random() * 0.3);
        var clase = "mandala-f" + (a % 3);
        for (var k = 0; k < simetria; k++) {
          var ang = k * 360 / simetria + (a % 2 ? 180 / simetria : 0);
          var g = el("g", { transform: "rotate(" + ang + " " + C + " " + C + ")", class: clase });
          var y = C - r + tam / 2;
          if (forma === "petalo") g.appendChild(el("ellipse", { cx: C, cy: y, rx: tam * 0.4, ry: tam * 0.68 }));
          else if (forma === "circulo") g.appendChild(el("circle", { cx: C, cy: y, r: tam * 0.38 }));
          else g.appendChild(el("polygon", { points: [C, y - tam * 0.62, C + tam * 0.38, y, C, y + tam * 0.62, C - tam * 0.38, y].join(",") }));
          svg.appendChild(g);
        }
        svg.appendChild(el("circle", { cx: C, cy: C, r: r, class: "mandala-anillo" }));
      }
      svg.appendChild(el("circle", { cx: C, cy: C, r: 10, class: "mandala-centro" }));
    };
    document.querySelector("[data-med-mandala-otro]").addEventListener("click", dibujar);
    dibujar();
  }
})();
