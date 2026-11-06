/* Laboratorio narrativo — /laboratorio-narrativo/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* ---------- Externalizar el problema ---------- */
  var ex = document.querySelector("[data-narr-externalizar]");
  if (ex) {
    var sal = ex.querySelector("[data-ex-salida]");
    var v = function (id) { return ex.querySelector("#" + id).value.trim().replace(/[.]+$/, ""); };
    var min = function (t) { return t ? t.charAt(0).toLowerCase() + t.slice(1) : t; };
    var armar = function () {
      var n = v("ex-nombre"), dice = v("ex-dice"), af = v("ex-afecta"), gana = v("ex-gana"), pierde = v("ex-pierde");
      if (!n && !dice && !af && !gana && !pierde) { sal.textContent = "Completá los pasos y acá aparece tu relato."; return; }
      var N = n ? "«" + n.charAt(0).toUpperCase() + n.slice(1) + "»" : "El problema", p = [];
      if (dice) p.push(N + " me dice que " + min(dice) + ".");
      else p.push(N + " es un problema que me visita, pero no soy yo.");
      if (af) p.push("Cuando aparece, " + min(af) + ".");
      if (gana) p.push("Tiene más fuerza cuando " + min(gana) + ".");
      if (pierde) p.push("Pero no siempre gana: pierde fuerza cuando " + min(pierde) + ". Eso también dice algo de mí.");
      sal.textContent = p.join(" ");
    };
    ex.addEventListener("input", armar);
    armar();
  }

  /* ---------- El árbol de la vida ---------- */
  var form = document.querySelector("[data-narr-arbol]"), svg = document.querySelector("[data-arbol-svg]");
  if (!form || !svg) return;
  var NS = "http://www.w3.org/2000/svg";
  var el = function (tag, at, txt) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); if (txt != null) e.textContent = txt; return e; };
  var items = function (k) {
    return form.querySelector('[data-arbol="' + k + '"]').value.split(/[,;\n]/).map(function (x) { return x.trim(); }).filter(Boolean)
      .slice(0, 5).map(function (x) { return x.length > 18 ? x.slice(0, 17) + "…" : x; });
  };
  var dibujar = function () {
    while (svg.childNodes.length > 1) svg.removeChild(svg.lastChild);
    // Suelo y raíces
    svg.appendChild(el("rect", { x: 0, y: 300, width: 360, height: 100, class: "arbol-suelo" }));
    [[180, 300, 120, 360], [180, 300, 240, 365], [180, 300, 80, 335], [180, 300, 280, 340], [180, 300, 180, 380]].forEach(function (r) {
      svg.appendChild(el("path", { d: "M" + r[0] + " " + r[1] + " Q" + ((r[0] + r[2]) / 2) + " " + (r[3] - 10) + " " + r[2] + " " + r[3], class: "arbol-raiz" }));
    });
    // Tronco y ramas
    svg.appendChild(el("path", { d: "M160 300 C165 240 160 200 170 160 L190 160 C200 200 195 240 200 300 Z", class: "arbol-tronco" }));
    [[175, 175, 90, 120], [185, 170, 270, 115], [180, 165, 180, 70], [178, 190, 105, 175], [182, 190, 255, 170]].forEach(function (r) {
      svg.appendChild(el("path", { d: "M" + r[0] + " " + r[1] + " Q" + ((r[0] + r[2]) / 2) + " " + (r[3] + 25) + " " + r[2] + " " + r[3], class: "arbol-rama" }));
    });
    // Copa
    [[180, 95, 95, 70], [110, 130, 60, 45], [250, 130, 60, 45]].forEach(function (c) {
      svg.appendChild(el("ellipse", { cx: c[0], cy: c[1], rx: c[2], ry: c[3], class: "arbol-copa" }));
    });
    var texto = function (x, y, t, clase, ancla) { svg.appendChild(el("text", { x: x, y: y, class: clase || "arbol-texto", "text-anchor": ancla || "middle" }, t)); };
    // Etiquetas
    var raices = items("raices"), suelo = items("suelo"), tronco = items("tronco"), ramas = items("ramas"), hojas = items("hojas"), frutos = items("frutos");
    raices.forEach(function (t, k) { texto(60 + k * 60, 356 + (k % 2) * 16, t, "arbol-texto arbol-texto--claro"); });
    suelo.slice(0, 3).forEach(function (t, k) { texto(60 + k * 120, 318, t, "arbol-texto arbol-texto--claro"); });
    tronco.forEach(function (t, k) { texto(180, 200 + k * 20, t, "arbol-texto arbol-texto--tronco"); });
    var posRamas = [[85, 112], [275, 108], [180, 58], [100, 168], [262, 162]];
    ramas.forEach(function (t, k) { texto(posRamas[k][0], posRamas[k][1], t); });
    var posHojas = [[130, 80], [230, 80], [180, 120], [70, 140], [290, 140]];
    hojas.forEach(function (t, k) { var p = posHojas[k]; svg.appendChild(el("circle", { cx: p[0] - 4, cy: p[1] - 14, r: 5, class: "arbol-hoja" })); texto(p[0], p[1], t); });
    var posFrutos = [[150, 40], [215, 40], [60, 105], [300, 105], [180, 150]];
    frutos.forEach(function (t, k) { var p = posFrutos[k]; svg.appendChild(el("circle", { cx: p[0], cy: p[1] - 14, r: 6, class: "arbol-fruto" })); texto(p[0], p[1], t); });
    if (!raices.length && !suelo.length && !tronco.length && !ramas.length && !hojas.length && !frutos.length) {
      texto(180, 240, "Completá el formulario", "arbol-texto arbol-texto--tronco");
    }
  };
  form.addEventListener("input", dibujar);
  dibujar();
})();
