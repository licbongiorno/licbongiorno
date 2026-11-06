/* Laboratorio de valores y sentido — /laboratorio-de-valores/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;
  var raiz = document.querySelector("[data-valores]");
  if (!raiz) return;

  var VALORES = ["Familia", "Amistad", "Amor de pareja", "Salud", "Libertad", "Honestidad", "Justicia", "Aprender", "Creatividad",
    "Aventura", "Seguridad", "Espiritualidad", "Naturaleza", "Humor", "Generosidad", "Cuidar a otros", "Logro", "Autonomía",
    "Belleza", "Calma", "Comunidad", "Coraje", "Curiosidad", "Disfrute", "Esfuerzo", "Gratitud", "Humildad", "Lealtad",
    "Respeto", "Responsabilidad", "Trabajo con sentido", "Autocuidado"];
  var MAX = 10;
  var elegidos = [];

  /* ---------- 1. Elegir ---------- */
  var chips = raiz.querySelector("[data-val-chips]"), cuenta = raiz.querySelector("[data-val-cuenta]");
  chips.innerHTML = VALORES.map(function (v, k) {
    return '<label class="opcion"><input type="checkbox" name="val" value="' + k + '"><span></span></label>';
  }).join("");
  chips.querySelectorAll("span").forEach(function (s, k) { s.textContent = VALORES[k]; });
  var cajas = chips.querySelectorAll("input");

  chips.addEventListener("change", function (e) {
    var v = VALORES[+e.target.value];
    if (e.target.checked) { if (elegidos.indexOf(v) < 0) elegidos.push(v); }
    else elegidos = elegidos.filter(function (x) { return x !== v; });
    var lleno = elegidos.length >= MAX;
    cajas.forEach(function (c) { c.disabled = lleno && !c.checked; });
    cuenta.textContent = elegidos.length + " de " + MAX + " elegidos" + (lleno ? ". Llegaste al máximo: si querés otro, desmarcá alguno." : "");
    pintarOrden(); pintarBrujula();
  });

  /* ---------- 2. Ordenar ---------- */
  var orden = raiz.querySelector("[data-val-orden]"), vacio = raiz.querySelector("[data-val-vacio]"), estOrden = raiz.querySelector("[data-val-orden-estado]");
  var pintarOrden = function (foco) {
    vacio.hidden = elegidos.length > 0;
    orden.innerHTML = "";
    elegidos.forEach(function (v, k) {
      var li = document.createElement("li");
      li.className = "lab-orden__item" + (k < 5 ? " es-nucleo" : "");
      li.innerHTML = '<span class="lab-orden__nombre"></span><span class="lab-orden__botones">' +
        '<button type="button" class="lab-orden__btn" data-mover="-1"><span aria-hidden="true">↑</span><span class="visualmente-oculto"></span></button>' +
        '<button type="button" class="lab-orden__btn" data-mover="1"><span aria-hidden="true">↓</span><span class="visualmente-oculto"></span></button></span>';
      li.querySelector(".lab-orden__nombre").textContent = v;
      var bs = li.querySelectorAll("button");
      bs[0].querySelector(".visualmente-oculto").textContent = "Subir " + v; bs[0].disabled = k === 0;
      bs[1].querySelector(".visualmente-oculto").textContent = "Bajar " + v; bs[1].disabled = k === elegidos.length - 1;
      bs.forEach(function (b) { b.setAttribute("data-k", k); });
      orden.appendChild(li);
    });
    if (foco) {
      var b = orden.querySelector('button[data-k="' + foco.k + '"][data-mover="' + foco.d + '"]') || orden.querySelector('button[data-k="' + foco.k + '"]:not(:disabled)');
      if (b && !b.disabled) b.focus(); else { var otro = orden.querySelectorAll('button[data-k="' + foco.k + '"]'); for (var i = 0; i < otro.length; i++) if (!otro[i].disabled) { otro[i].focus(); break; } }
    }
  };
  orden.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-mover]");
    if (!b) return;
    var k = +b.getAttribute("data-k"), d = +b.getAttribute("data-mover"), j = k + d;
    if (j < 0 || j >= elegidos.length) return;
    var t = elegidos[k]; elegidos[k] = elegidos[j]; elegidos[j] = t;
    estOrden.textContent = t + " quedó en el puesto " + (j + 1) + ".";
    pintarOrden({ k: j, d: d }); pintarBrujula();
  });

  /* ---------- 3. Brújula ---------- */
  var brujula = raiz.querySelector("[data-val-brujula]"), filas = raiz.querySelector("[data-val-brujula-filas]"), estB = raiz.querySelector("[data-val-brujula-estado]");
  var datos = {};
  var pintarBrujula = function () {
    var top = elegidos.slice(0, 5);
    if (!top.length) { filas.innerHTML = '<p class="lab-nota">Elegí y ordená tus valores para completar la brújula.</p>'; return; }
    filas.innerHTML = "";
    top.forEach(function (v, k) {
      var d = datos[v] || (datos[v] = { nivel: 5, accion: "" });
      var div = document.createElement("div");
      div.className = "lab-brujula__fila";
      div.innerHTML = '<p class="lab-paso__titulo"><span>' + (k + 1) + '</span><b></b></p>' +
        '<label class="lab-paso__ayuda" for="bv-n' + k + '">¿Cuánto lo vivo hoy? <output for="bv-n' + k + '"></output> de 10</label>' +
        '<input class="lab-rango" type="range" min="0" max="10" step="1" id="bv-n' + k + '">' +
        '<label class="lab-paso__ayuda" for="bv-a' + k + '">Una acción pequeña para esta semana</label>' +
        '<input class="lab-campo" type="text" id="bv-a' + k + '" autocomplete="off">';
      div.querySelector("b").textContent = v;
      var r = div.querySelector("input[type=range]"), o = div.querySelector("output"), a = div.querySelector("input[type=text]");
      r.value = d.nivel; o.textContent = d.nivel; a.value = d.accion;
      r.addEventListener("input", function () { d.nivel = +r.value; o.textContent = r.value; });
      a.addEventListener("input", function () { d.accion = a.value; });
      filas.appendChild(div);
    });
  };
  var textoBrujula = function () {
    var top = elegidos.slice(0, 5);
    if (!top.length) return "";
    var l = ["Mi brújula de valores", "", "Valores elegidos, en orden: " + elegidos.join(", ") + ".", ""];
    top.forEach(function (v, k) {
      var d = datos[v] || { nivel: 5, accion: "" };
      l.push((k + 1) + ". " + v + " — lo vivo hoy: " + d.nivel + " de 10" + (d.accion.trim() ? "\n   Acción para esta semana: " + d.accion.trim() : ""));
    });
    return l.join("\n") + "\n";
  };
  brujula.addEventListener("submit", function (e) { e.preventDefault(); });
  brujula.querySelector("[data-val-bajar]").addEventListener("click", function () {
    var t = textoBrujula();
    if (!t) { estB.textContent = "Primero elegí tus valores."; return; }
    LAB.guardarTexto("mi-brujula-de-valores.txt", t); estB.textContent = "Listo: se descargó en tu dispositivo.";
  });
  brujula.querySelector("[data-val-copiar]").addEventListener("click", function (e) {
    var t = textoBrujula();
    if (!t) { estB.textContent = "Primero elegí tus valores."; return; }
    LAB.copiar(t, e.currentTarget);
  });
  pintarOrden();

  /* ---------- 4. Rueda de la vida ---------- */
  var rueda = document.querySelector("[data-rueda]");
  if (rueda) {
    var AREAS = ["Salud", "Familia", "Pareja o amor", "Amistades", "Trabajo o estudio", "Dinero", "Tiempo libre", "Crecimiento personal"];
    var val = AREAS.map(function () { return 5; });
    var ctrl = rueda.querySelector("[data-rueda-controles]"), svg = rueda.querySelector("[data-rueda-svg]"), resumen = rueda.querySelector("[data-rueda-resumen]");
    AREAS.forEach(function (a, k) {
      var d = document.createElement("div");
      d.className = "lab-rueda__fila";
      d.innerHTML = '<label for="rv' + k + '"><span></span> <output for="rv' + k + '">5</output></label><input class="lab-rango" type="range" min="0" max="10" step="1" value="5" id="rv' + k + '">';
      d.querySelector("label span").textContent = a;
      var r = d.querySelector("input"), o = d.querySelector("output");
      r.addEventListener("input", function () { val[k] = +r.value; o.textContent = r.value; dibujar(); });
      ctrl.appendChild(d);
    });
    var NS = "http://www.w3.org/2000/svg", C = 160, R = 120;
    var punto = function (k, v) { var ang = -Math.PI / 2 + k * 2 * Math.PI / AREAS.length; return [C + Math.cos(ang) * R * v / 10, C + Math.sin(ang) * R * v / 10]; };
    var el = function (tag, at) { var e = document.createElementNS(NS, tag); for (var x in at) e.setAttribute(x, at[x]); return e; };
    var dibujar = function () {
      while (svg.childNodes.length > 1) svg.removeChild(svg.lastChild);
      [2.5, 5, 7.5, 10].forEach(function (n) {
        svg.appendChild(el("polygon", { points: AREAS.map(function (_, k) { return punto(k, n).join(","); }).join(" "), class: "rueda-anillo" }));
      });
      AREAS.forEach(function (a, k) {
        var p = punto(k, 10);
        svg.appendChild(el("line", { x1: C, y1: C, x2: p[0], y2: p[1], class: "rueda-eje" }));
        var q = punto(k, 11.6), t = el("text", { x: q[0], y: q[1], class: "rueda-texto", "text-anchor": Math.abs(q[0] - C) < 8 ? "middle" : (q[0] > C ? "start" : "end"), "dominant-baseline": "middle" });
        t.textContent = a.split(" ")[0];
        svg.appendChild(t);
      });
      svg.appendChild(el("polygon", { points: val.map(function (v, k) { return punto(k, v).join(","); }).join(" "), class: "rueda-area" }));
      var min = Math.min.apply(null, val), bajas = AREAS.filter(function (_, k) { return val[k] === min; });
      var prom = val.reduce(function (s, v) { return s + v; }, 0) / val.length;
      resumen.textContent = "Promedio: " + prom.toFixed(1).replace(".", ",") + " de 10. " + (min < 10 ? "El área que más atención pide hoy: " + bajas.join(", ") + "." : "Todo en 10: ¡qué momento!");
    };
    dibujar();
  }
})();
