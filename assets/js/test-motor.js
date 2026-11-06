/* Motor de tests y escalas: páginas /escala-de-… y /test-de-… (salvo eneagrama y tipos, que tienen su propio script).
   Lee la configuración de <script type="application/json" id="test-config">. Todo ocurre en el navegador:
   las respuestas se guardan solo en este dispositivo (localStorage) para poder retomar y se pueden borrar.
   No se envía nada a ningún servidor. */
(function () {
  "use strict";
  var raiz = document.querySelector("[data-test-motor]"), fuente = document.getElementById("test-config");
  if (!raiz || !fuente) return;
  var C = JSON.parse(fuente.textContent);
  var OPS = C.opciones, POR = C.porPagina || 8, CLAVE = "test-" + C.id + "-v1";
  var vals = OPS.map(function (o) { return o.v; });
  var VMIN = Math.min.apply(null, vals), VMAX = Math.max.apply(null, vals);
  var preguntas = C.items.map(function (it, i) { return { id: "q" + i, i: i, txt: it.t, d: it.d, inv: !!it.inv }; });
  var paginas = [];
  for (var p = 0; p < preguntas.length; p += POR) paginas.push(preguntas.slice(p, p + POR));

  var leer = function () { try { return JSON.parse(localStorage.getItem(CLAVE) || "{}"); } catch (e) { return {}; } };
  var guardar = function () { try { localStorage.setItem(CLAVE, JSON.stringify(resp)); } catch (e) { /* sin almacenamiento */ } };
  var resp = leer(), pag = 0;
  var tiene = function (id) { return Object.prototype.hasOwnProperty.call(resp, id); };

  var cuerpo = raiz.querySelector("[data-test-cuerpo]"), barra = raiz.querySelector("[data-test-barra]"), progreso = raiz.querySelector("[data-test-progreso]");
  var bAnt = raiz.querySelector("[data-test-anterior]"), bSig = raiz.querySelector("[data-test-siguiente]"), aviso = raiz.querySelector("[data-test-aviso]");
  var resultado = document.querySelector("[data-test-resultado]"), inicio = document.querySelector("[data-test-inicio]");
  var esc = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  var total = preguntas.length;
  var respondidas = function () { return preguntas.filter(function (q) { return tiene(q.id); }).length; };
  var estado = function () {
    var n = respondidas();
    barra.style.width = Math.round(n * 100 / total) + "%";
    progreso.textContent = (paginas.length > 1 ? "Página " + (pag + 1) + " de " + paginas.length + " · " : "") + n + " de " + total + " respuestas";
  };

  var pintar = function () {
    var html = C.consigna && pag === 0 ? '<p class="test-subtitulo">' + esc(C.consigna) + "</p>" : "";
    paginas[pag].forEach(function (q) {
      html += '<fieldset class="test-item"><legend><span class="test-item__num">' + (q.i + 1) + ".</span> " + esc(q.txt) + '</legend><div class="test-escala" style="grid-template-columns:repeat(' + OPS.length + ',minmax(0,1fr))">';
      OPS.forEach(function (o, k) {
        var id = q.id + "-" + k;
        html += '<input type="radio" name="' + q.id + '" id="' + id + '" value="' + o.v + '"' + (tiene(q.id) && resp[q.id] === o.v ? " checked" : "") + '><label for="' + id + '">' + esc(o.t) + "</label>";
      });
      html += "</div></fieldset>";
    });
    cuerpo.innerHTML = html;
    estado();
    bAnt.disabled = pag === 0;
    bAnt.hidden = paginas.length === 1;
    bSig.textContent = pag === paginas.length - 1 ? "Ver mi resultado" : "Siguiente";
    aviso.textContent = "";
  };
  cuerpo.addEventListener("change", function (e) {
    if (e.target.type !== "radio") return;
    resp[e.target.name] = +e.target.value; guardar(); estado();
  });
  var completa = function () { return paginas[pag].every(function (q) { return tiene(q.id); }); };
  bSig.addEventListener("click", function () {
    if (!completa()) {
      aviso.textContent = "Respondé todas las preguntas" + (paginas.length > 1 ? " de esta página" : "") + " para seguir.";
      var falta = paginas[pag].filter(function (q) { return !tiene(q.id); })[0];
      var r = cuerpo.querySelector('input[name="' + falta.id + '"]'); if (r) r.focus();
      return;
    }
    if (pag < paginas.length - 1) { pag++; pintar(); raiz.scrollIntoView({ behavior: "smooth", block: "start" }); cuerpo.querySelector("input").focus({ preventScroll: true }); }
    else mostrar();
  });
  bAnt.addEventListener("click", function () { if (pag > 0) { pag--; pintar(); raiz.scrollIntoView({ block: "start" }); } });
  var reiniciar = function () {
    resp = {}; guardar(); pag = 0; resultado.hidden = true; resultado.innerHTML = ""; raiz.hidden = false; if (inicio) inicio.hidden = false; pintar();
  };
  raiz.querySelector("[data-test-borrar]").addEventListener("click", reiniciar);

  var valor = function (q) { var v = resp[q.id]; return q.inv ? VMIN + VMAX - v : v; };

  /* Cálculo: «suma» devuelve el puntaje total; «dimensiones» devuelve 0–100 por dimensión. */
  var calcular = function () {
    if (C.modo === "suma") {
      var s = 0; preguntas.forEach(function (q) { s += valor(q); });
      return { total: s };
    }
    var acc = {};
    preguntas.forEach(function (q) { var a = acc[q.d] || (acc[q.d] = { s: 0, n: 0 }); a.s += valor(q); a.n++; });
    var dims = {};
    Object.keys(acc).forEach(function (d) { dims[d] = Math.round((acc[d].s - acc[d].n * VMIN) * 100 / (acc[d].n * (VMAX - VMIN))); });
    return { dims: dims };
  };
  var enlaces = function (lista) { return lista.map(function (x) { return '<li><a href="' + esc(x[1]) + '">' + esc(x[0]) + "</a></li>"; }).join(""); };

  var mostrar = function () {
    var r = calcular(), html = '<p class="antetitulo">Tu resultado</p>', lineas = [C.nombre, ""];
    if (C.modo === "suma") {
      var banda = (C.bandas || []).filter(function (b) { return r.total <= b.hasta; })[0];
      html += '<h2 class="test-resultado__titulo">' + r.total + ' <em>de ' + C.max + "</em></h2>";
      if (banda) html += '<p class="test-resultado__codigo">' + esc(banda.nombre) + "</p>";
      var pct = Math.round((r.total - C.min) * 100 / (C.max - C.min));
      html += '<div class="test-medidor" aria-hidden="true"><span style="width:' + Math.max(pct, 2) + '%"></span></div>';
      html += '<div class="prosa"><p>' + (banda ? banda.texto : C.lectura) + "</p></div>";
      lineas.push("Puntaje: " + r.total + " de " + C.max + (banda ? " (" + banda.nombre + ")" : ""));
      if (C.alerta && tiene("q" + C.alerta.item) && resp["q" + C.alerta.item] >= C.alerta.min) {
        html = '<div class="destacado destacado--aviso test-alerta" role="alert">' + C.alerta.html + "</div>" + html;
      }
    } else {
      var orden = Object.keys(C.dims).sort(function (a, b) { return r.dims[b] - r.dims[a]; });
      var titulo, sub = "", explica = "";
      if (C.cuadrantes) {
        var q = C.cuadrantes, x = r.dims[q.x], y = r.dims[q.y];
        var k = (y >= 50 ? "a" : "b") + (x >= 50 ? "a" : "b"), cu = q.lista[k];
        titulo = cu.n; sub = esc(C.dims[q.y].n) + " " + y + "% · " + esc(C.dims[q.x].n) + " " + x + "%";
        explica = '<div class="prosa"><p>' + cu.texto + "</p></div>" +
          '<figure class="test-plano"><svg viewBox="0 0 220 220" role="img" aria-label="Tu ubicación: ' + esc(C.dims[q.y].n) + " " + y + " por ciento, " + esc(C.dims[q.x].n) + " " + x + ' por ciento, en el cuadrante ' + esc(cu.n) + '">' +
          '<rect x="10" y="10" width="200" height="200" class="test-plano__fondo"/><line x1="110" y1="10" x2="110" y2="210" class="test-plano__eje"/><line x1="10" y1="110" x2="210" y2="110" class="test-plano__eje"/>' +
          '<text x="60" y="190" class="test-plano__txt">' + esc(q.lista.bb.n) + '</text><text x="160" y="190" class="test-plano__txt">' + esc(q.lista.ba.n) + "</text>" +
          '<text x="60" y="34" class="test-plano__txt">' + esc(q.lista.ab.n) + '</text><text x="160" y="34" class="test-plano__txt">' + esc(q.lista.aa.n) + "</text>" +
          '<circle cx="' + (10 + x * 2) + '" cy="' + (210 - y * 2) + '" r="8" class="test-plano__punto"/></svg>' +
          '<figcaption>Eje horizontal: ' + esc(C.dims[q.x].n.toLowerCase()) + ". Eje vertical: " + esc(C.dims[q.y].n.toLowerCase()) + ".</figcaption></figure>";
        lineas.push("Resultado: " + cu.n);
      } else {
        var top = orden.slice(0, C.destacar || 1);
        titulo = top.map(function (d) { return C.dims[d].n; }).join(", ");
        sub = C.subtitulo || "";
        explica = '<div class="prosa">' + top.map(function (d) { return "<p><strong>" + esc(C.dims[d].n) + ".</strong> " + C.dims[d].txt + "</p>"; }).join("") + "</div>";
        lineas.push((C.destacar > 1 ? "Lo que más aparece: " : "Lo que más aparece: ") + titulo);
      }
      html += '<h2 class="test-resultado__titulo">' + esc(titulo) + "</h2>" + (sub ? '<p class="test-resultado__codigo">' + sub + "</p>" : "");
      var grupos = C.grupos || [{ n: C.tituloBarras || "Tu perfil", dims: Object.keys(C.dims) }];
      var barras = grupos.map(function (g) {
        return (grupos.length > 1 ? '<h4 class="test-grupo">' + esc(g.n) + "</h4>" : "") + '<ol class="test-barras">' + g.dims.map(function (d) {
          return '<li class="test-barra' + (d === orden[0] ? " es-principal" : "") + '"><span class="test-barra__nombre">' + esc(C.dims[d].n) + '</span><span class="test-barra__pista" aria-hidden="true"><span style="width:' + Math.max(r.dims[d], 2) + '%"></span></span><span class="test-barra__valor">' + r.dims[d] + "%</span></li>";
        }).join("") + "</ol>";
      }).join("");
      html += '<div class="test-resultado__grid"><section><h3>Lo que significa</h3>' + explica + "</section><section><h3>" + esc(C.tituloBarras || "Tu perfil") + "</h3>" + barras + "</section></div>";
      lineas.push("");
      Object.keys(C.dims).forEach(function (d) { lineas.push(C.dims[d].n + ": " + r.dims[d] + "%"); });
    }
    if (C.enlaces) html += '<div class="test-resultado__leer"><h3>Para seguir</h3><ul>' + enlaces(C.enlaces) + "</ul></div>";
    html += '<p class="test-resultado__nota">' + C.nota + "</p>";
    html += '<div class="lab-acciones"><button class="boton boton--chico" type="button" data-test-bajar>Guardar mi resultado</button><button class="boton boton--secundario boton--chico" type="button" data-test-rehacer>Volver a empezar</button></div>';
    resultado.innerHTML = html; resultado.hidden = false; raiz.hidden = true;
    if (inicio) inicio.hidden = true;
    resultado.setAttribute("tabindex", "-1"); resultado.focus(); resultado.scrollIntoView({ block: "start" });
    resultado.querySelector("[data-test-bajar]").addEventListener("click", function () {
      lineas.push("", "Es orientativo y no es un diagnóstico.", location.origin + location.pathname);
      var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([lineas.join("\n") + "\n"], { type: "text/plain;charset=utf-8" }));
      a.download = "mi-resultado-" + C.id + ".txt"; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    });
    resultado.querySelector("[data-test-rehacer]").addEventListener("click", function () { reiniciar(); raiz.scrollIntoView({ block: "start" }); });
  };

  window.TEST_MOTOR = { calcular: calcular };
  if (respondidas()) { for (var k = 0; k < paginas.length; k++) { pag = k; if (!paginas[k].every(function (x) { return tiene(x.id); })) break; } }
  pintar();
  if (respondidas() === total) mostrar();
})();
