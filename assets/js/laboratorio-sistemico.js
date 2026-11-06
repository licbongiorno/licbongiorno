/* Laboratorio sistémico — /laboratorio-sistemico/
   Requiere lab-base.js. Nada se envía a ningún servidor ni se guarda en el navegador. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;
  var NS = "http://www.w3.org/2000/svg";
  var el = function (tag, at, txt) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); if (txt != null) e.textContent = txt; return e; };

  /* ---------- Genograma ---------- */
  var gen = document.querySelector("[data-genograma]");
  if (gen) {
    var svg = gen.querySelector("[data-gen-svg]"), lista = gen.querySelector("[data-gen-lista]"), rels = gen.querySelector("[data-gen-relaciones]");
    var est = gen.querySelector("[data-gen-estado]"), sels = gen.querySelectorAll("[data-gen-sel]");
    var GEN = { 1: "Abuelos", 2: "Padres y tíos", 3: "Mi generación", 4: "Hijos y sobrinos" };
    var SEXO = { mujer: "mujer", varon: "varón", otro: "otra identidad" };
    var TIPO = { cercana: "cercana", conflictiva: "conflictiva", distante: "distante o cortada", pareja: "de pareja" };
    var personas = [], relaciones = [], sig = 1;
    var pos = function () {
      var p = {};
      [1, 2, 3, 4].forEach(function (g) {
        var fila = personas.filter(function (x) { return x.g === g; });
        fila.forEach(function (x, k) { p[x.id] = [ (k + 1) * 640 / (fila.length + 1), 40 + (g - 1) * 110 ]; });
      });
      return p;
    };
    var dibujarGen = function () {
      while (svg.childNodes.length > 1) svg.removeChild(svg.lastChild);
      [1, 2, 3, 4].forEach(function (g) {
        svg.appendChild(el("text", { x: 6, y: 44 + (g - 1) * 110, class: "gen-fila" }, GEN[g]));
        svg.appendChild(el("line", { x1: 0, x2: 640, y1: 98 + (g - 1) * 110, y2: 98 + (g - 1) * 110, class: "gen-separador" }));
      });
      var p = pos();
      relaciones.forEach(function (r) {
        var a = p[r.a], b = p[r.b];
        if (!a || !b) return;
        if (r.t === "conflictiva") {
          var n = 10, d = "M" + a[0] + " " + a[1];
          for (var i = 1; i <= n; i++) {
            var x = a[0] + (b[0] - a[0]) * i / n, y = a[1] + (b[1] - a[1]) * i / n;
            var dx = -(b[1] - a[1]), dy = b[0] - a[0], L = Math.sqrt(dx * dx + dy * dy) || 1;
            d += " L" + (x + (i % 2 ? 6 : -6) * dx / L) + " " + (y + (i % 2 ? 6 : -6) * dy / L);
          }
          svg.appendChild(el("path", { d: d, class: "gen-rel gen-rel--conflictiva" }));
        } else if (r.t === "pareja") {
          [-3, 3].forEach(function (o) { svg.appendChild(el("line", { x1: a[0], y1: a[1] + o, x2: b[0], y2: b[1] + o, class: "gen-rel gen-rel--pareja" })); });
        } else {
          svg.appendChild(el("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: "gen-rel gen-rel--" + r.t }));
        }
      });
      personas.forEach(function (x) {
        var c = p[x.id], g = el("g", { class: "gen-persona" });
        if (x.s === "mujer") g.appendChild(el("circle", { cx: c[0], cy: c[1], r: 15 }));
        else if (x.s === "varon") g.appendChild(el("rect", { x: c[0] - 14, y: c[1] - 14, width: 28, height: 28 }));
        else g.appendChild(el("polygon", { points: [c[0], c[1] - 17, c[0] + 17, c[1], c[0], c[1] + 17, c[0] - 17, c[1]].join(",") }));
        if (x.f) { g.appendChild(el("line", { x1: c[0] - 12, y1: c[1] - 12, x2: c[0] + 12, y2: c[1] + 12, class: "gen-x" })); g.appendChild(el("line", { x1: c[0] + 12, y1: c[1] - 12, x2: c[0] - 12, y2: c[1] + 12, class: "gen-x" })); }
        g.appendChild(el("text", { x: c[0], y: c[1] + 34, "text-anchor": "middle", class: "gen-nombre" }, x.n));
        svg.appendChild(g);
      });
      if (!personas.length) svg.appendChild(el("text", { x: 320, y: 210, "text-anchor": "middle", class: "gen-nombre" }, "Agregá a la primera persona"));
    };
    var nombrePorId = function (id) { var x = personas.filter(function (p) { return p.id === id; })[0]; return x ? x.n : "?"; };
    var pintarListas = function () {
      lista.innerHTML = ""; rels.innerHTML = "";
      personas.forEach(function (x) {
        var li = document.createElement("li"); li.className = "lab-orden__item";
        li.innerHTML = '<span class="lab-orden__nombre"></span><span class="lab-orden__botones"><button type="button" class="lab-orden__btn" data-quitar-p="' + x.id + '"><span aria-hidden="true">×</span><span class="visualmente-oculto"></span></button></span>';
        li.querySelector(".lab-orden__nombre").textContent = x.n + " — " + GEN[x.g].toLowerCase() + ", " + SEXO[x.s] + (x.f ? ", falleció" : "");
        li.querySelector(".visualmente-oculto").textContent = "Quitar a " + x.n;
        lista.appendChild(li);
      });
      relaciones.forEach(function (r, k) {
        var li = document.createElement("li"); li.className = "lab-orden__item";
        li.innerHTML = '<span class="lab-orden__nombre"></span><span class="lab-orden__botones"><button type="button" class="lab-orden__btn" data-quitar-r="' + k + '"><span aria-hidden="true">×</span><span class="visualmente-oculto">Quitar relación</span></button></span>';
        li.querySelector(".lab-orden__nombre").textContent = nombrePorId(r.a) + " y " + nombrePorId(r.b) + ": relación " + TIPO[r.t];
        rels.appendChild(li);
      });
      sels.forEach(function (s, k) {
        var previo = s.value;
        s.innerHTML = personas.map(function (x) { return '<option value="' + x.id + '"></option>'; }).join("");
        s.querySelectorAll("option").forEach(function (o, j) { o.textContent = personas[j].n; });
        if (previo && personas.some(function (x) { return String(x.id) === previo; })) s.value = previo;
        else if (personas[k]) s.value = personas[k].id;
      });
    };
    var actualizar = function () { dibujarGen(); pintarListas(); };
    gen.querySelector("[data-gen-persona]").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.currentTarget, n = f.querySelector("#gen-nombre").value.trim();
      if (!n) { f.querySelector("#gen-nombre").focus(); return; }
      var g = +f.querySelector("#gen-generacion").value;
      if (personas.filter(function (x) { return x.g === g; }).length >= 8) { est.textContent = "Esa generación ya tiene ocho personas: es el máximo de esta versión simplificada."; return; }
      personas.push({ id: sig++, n: n, g: g, s: f.querySelector("#gen-sexo").value, f: f.querySelector("#gen-fallecido").checked });
      est.textContent = "Agregaste a " + n + " en " + GEN[g].toLowerCase() + ".";
      f.querySelector("#gen-nombre").value = ""; f.querySelector("#gen-fallecido").checked = false; f.querySelector("#gen-nombre").focus();
      actualizar();
    });
    gen.querySelector("[data-gen-relacion]").addEventListener("submit", function (e) {
      e.preventDefault();
      var a = +sels[0].value, b = +sels[1].value, t = gen.querySelector("#gen-rtipo").value;
      if (!a || !b || a === b) { est.textContent = "Elegí dos personas distintas."; return; }
      relaciones = relaciones.filter(function (r) { return !((r.a === a && r.b === b) || (r.a === b && r.b === a)); });
      relaciones.push({ a: a, b: b, t: t });
      est.textContent = "Marcaste una relación " + TIPO[t] + " entre " + nombrePorId(a) + " y " + nombrePorId(b) + ".";
      actualizar();
    });
    gen.addEventListener("click", function (e) {
      var bp = e.target.closest("[data-quitar-p]"), br = e.target.closest("[data-quitar-r]");
      if (bp) {
        var id = +bp.getAttribute("data-quitar-p");
        est.textContent = "Quitaste a " + nombrePorId(id) + ".";
        personas = personas.filter(function (x) { return x.id !== id; });
        relaciones = relaciones.filter(function (r) { return r.a !== id && r.b !== id; });
        actualizar();
      } else if (br) { relaciones.splice(+br.getAttribute("data-quitar-r"), 1); est.textContent = "Quitaste la relación."; actualizar(); }
    });
    gen.querySelector("[data-gen-bajar]").addEventListener("click", function () {
      if (!personas.length) { est.textContent = "Todavía no agregaste a nadie."; return; }
      var l = ["Mi genograma", ""];
      [1, 2, 3, 4].forEach(function (g) {
        var f = personas.filter(function (x) { return x.g === g; });
        if (!f.length) return;
        l.push(GEN[g] + ":"); f.forEach(function (x) { l.push("- " + x.n + " (" + SEXO[x.s] + (x.f ? ", falleció" : "") + ")"); }); l.push("");
      });
      if (relaciones.length) { l.push("Relaciones:"); relaciones.forEach(function (r) { l.push("- " + nombrePorId(r.a) + " y " + nombrePorId(r.b) + ": " + TIPO[r.t]); }); l.push(""); }
      var pat = gen.querySelector("#gen-patrones").value.trim();
      if (pat) l.push("Patrones que veo:", pat);
      LAB.guardarTexto("mi-genograma.txt", l.join("\n") + "\n");
      est.textContent = "Listo: se descargó en tu dispositivo.";
    });
    gen.querySelector("[data-gen-reiniciar]").addEventListener("click", function () { personas = []; relaciones = []; est.textContent = "Genograma borrado."; actualizar(); });
    actualizar();
  }

  /* ---------- Preguntas circulares ---------- */
  var pc = document.querySelector("[data-gen-preguntas]");
  if (pc) {
    var PREG = [
      "¿Quién en tu familia se preocupa más por {x}? ¿Y quién menos?",
      "Cuando aparece {x}, ¿qué hace tu mamá? ¿Y qué hace tu papá cuando ella hace eso?",
      "¿Quién fue el primero en darse cuenta de {x}?",
      "Si {x} desapareciera mañana, ¿quién lo notaría primero? ¿Qué cambiaría en la familia?",
      "¿Quién está más de acuerdo con vos sobre {x}? ¿Y quién menos?",
      "Antes de {x}, ¿cómo eran las cosas entre ustedes? ¿Qué cambió?",
      "¿Qué cree tu hermano o hermana que pensás vos sobre {x}?",
      "Si le preguntáramos a tu abuela o abuelo por {x}, ¿qué diría?",
      "¿A quién le sirve, aunque sea un poco, que {x} siga como está?",
      "Dentro de cinco años, si las cosas mejoraran, ¿qué estarían haciendo distinto con {x}?"
    ];
    var tema = pc.querySelector("#pc-tema"), out = pc.querySelector("[data-pc-pregunta]"), actual = PREG[0];
    var pintar = function () { out.textContent = actual.replace(/\{x\}/g, tema.value.trim() || "el tema que te preocupa"); };
    pc.querySelector("[data-pc-otra]").addEventListener("click", function () { actual = LAB.azar(PREG, actual); LAB.poner(out, actual.replace(/\{x\}/g, tema.value.trim() || "el tema que te preocupa")); });
    tema.addEventListener("input", pintar);
    pintar();
  }

  /* ---------- Secuencias circulares ---------- */
  var sc = document.querySelector("[data-secuencia]");
  if (sc) {
    var ssvg = sc.querySelector("[data-sc-svg]"), stxt = sc.querySelector("[data-sc-texto]");
    var corta = function (t) { return t.length > 30 ? t.slice(0, 29) + "…" : t; };
    var partir = function (t) {
      var w = t.split(" "), l1 = "", l2 = "";
      w.forEach(function (p) { if ((l1 + " " + p).trim().length <= 16 && !l2) l1 = (l1 + " " + p).trim(); else l2 = (l2 + " " + p).trim(); });
      return [l1, corta(l2)];
    };
    var dibujarSec = function () {
      while (ssvg.childNodes.length > 1) ssvg.removeChild(ssvg.lastChild);
      var v = [1, 2, 3, 4].map(function (k) { return sc.querySelector("#sc-" + k).value.trim(); });
      var otro = sc.querySelector("#sc-otro").value.trim() || "el otro";
      ssvg.appendChild(el("circle", { cx: 180, cy: 180, r: 110, class: "sc-circulo" }));
      var P = [[180, 70], [290, 180], [180, 290], [70, 180]], quien = ["Yo", otro, "Yo", otro];
      P.forEach(function (p, k) {
        var ang = (k * 90 + 45) * Math.PI / 180 - Math.PI / 2;
        var ax = 180 + Math.cos(ang) * 110, ay = 180 + Math.sin(ang) * 110;
        ssvg.appendChild(el("polygon", { points: [ax, ay - 7, ax + 7, ay, ax, ay + 7].join(","), class: "sc-flecha", transform: "rotate(" + (k * 90 + 45) + " " + ax + " " + ay + ")" }));
        ssvg.appendChild(el("circle", { cx: p[0], cy: p[1], r: 48, class: "sc-nodo" + (k % 2 ? " sc-nodo--otro" : "") }));
        ssvg.appendChild(el("text", { x: p[0], y: p[1] - 14, "text-anchor": "middle", class: "sc-quien" }, corta(quien[k])));
        var lin = partir(v[k] || "…");
        ssvg.appendChild(el("text", { x: p[0], y: p[1] + 4, "text-anchor": "middle", class: "sc-texto" }, lin[0]));
        if (lin[1]) ssvg.appendChild(el("text", { x: p[0], y: p[1] + 18, "text-anchor": "middle", class: "sc-texto" }, lin[1]));
      });
      if (v.every(Boolean)) {
        stxt.textContent = "Cuando " + v[0] + ", " + otro + " " + v[1] + "; entonces " + v[2] + ", y " + otro + " " + v[3] + ". Y vuelve a empezar. Nadie «empezó»: cada uno responde al otro. Lo que sí podés elegir es cortar el círculo en tu parte: ¿qué podrías hacer distinto en lugar de «" + v[2] + "»?";
      } else stxt.textContent = "Completá los cuatro pasos para ver el círculo completo.";
    };
    sc.addEventListener("input", dibujarSec);
    sc.querySelector("form").addEventListener("submit", function (e) { e.preventDefault(); });
    dibujarSec();
  }
})();
