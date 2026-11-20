/* Test de conciencia corporal (/test-de-conciencia-corporal/).
   Lee la configuración de <script type="application/json" id="test-config">: ocho dimensiones inspiradas en las
   escalas del MAIA (Mehling y colaboradores, 2012 y 2018) y 24 ítems originales de este sitio, tres por dimensión.
   Algunos ítems están redactados al revés (r: true) y se puntúan 6 − respuesta.
   Todo ocurre en el navegador y solo en memoria: no se guarda nada (ni en localStorage) ni se envía a ningún servidor. */
(function () {
  "use strict";
  var raiz = document.querySelector("[data-test-corporal]"), fuente = document.getElementById("test-config");
  if (!raiz || !fuente) return;
  var C = JSON.parse(fuente.textContent);
  /* Textos del resultado: se pueden cambiar desde la configuración para reutilizar este script en otros tests de perfil. */
  var T = C.textos || {};
  var OPS = C.opciones, POR = C.porPagina || 8;
  var D = {}; C.dimensiones.forEach(function (d) { D[d.id] = d; });
  var preguntas = C.items.map(function (it, i) { return { id: "q" + i, i: i, txt: it.t, d: it.d, r: !!it.r }; });
  var paginas = [];
  for (var p = 0; p < preguntas.length; p += POR) paginas.push(preguntas.slice(p, p + POR));

  var resp = {}, pag = 0;
  var tiene = function (id) { return Object.prototype.hasOwnProperty.call(resp, id); };
  var cuerpo = raiz.querySelector("[data-test-cuerpo]"), barra = raiz.querySelector("[data-test-barra]"), progreso = raiz.querySelector("[data-test-progreso]");
  var bAnt = raiz.querySelector("[data-test-anterior]"), bSig = raiz.querySelector("[data-test-siguiente]"), aviso = raiz.querySelector("[data-test-aviso]");
  var resultado = document.querySelector("[data-test-resultado]"), inicio = document.querySelector("[data-test-inicio]");
  var esc = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  var num = function (x) { return x.toFixed(1).replace(".", ","); };
  var total = preguntas.length;
  var respondidas = function () { return preguntas.filter(function (q) { return tiene(q.id); }).length; };
  var estado = function () {
    var n = respondidas();
    barra.style.width = Math.round(n * 100 / total) + "%";
    progreso.textContent = "Página " + (pag + 1) + " de " + paginas.length + " · " + n + " de " + total + " respuestas";
  };

  var pintar = function () {
    var html = "";
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
    bSig.textContent = pag === paginas.length - 1 ? "Ver mi resultado" : "Siguiente";
    aviso.textContent = "";
  };
  cuerpo.addEventListener("change", function (e) {
    if (e.target.type !== "radio") return;
    resp[e.target.name] = +e.target.value; estado();
  });
  var completa = function () { return paginas[pag].every(function (q) { return tiene(q.id); }); };
  bSig.addEventListener("click", function () {
    if (!completa()) {
      aviso.textContent = "Respondé todas las afirmaciones de esta página para seguir.";
      var falta = paginas[pag].filter(function (q) { return !tiene(q.id); })[0];
      var r = cuerpo.querySelector('input[name="' + falta.id + '"]'); if (r) r.focus();
      return;
    }
    if (pag < paginas.length - 1) { pag++; pintar(); raiz.scrollIntoView({ behavior: "smooth", block: "start" }); cuerpo.querySelector("input").focus({ preventScroll: true }); }
    else mostrar();
  });
  bAnt.addEventListener("click", function () { if (pag > 0) { pag--; pintar(); raiz.scrollIntoView({ block: "start" }); } });
  var reiniciar = function () {
    resp = {}; pag = 0; resultado.hidden = true; resultado.innerHTML = ""; raiz.hidden = false; if (inicio) inicio.hidden = false; pintar();
  };
  raiz.querySelector("[data-test-borrar]").addEventListener("click", reiniciar);

  /* Cálculo: cada dimensión es el promedio de sus tres ítems, de 1 a 5, con los ítems invertidos puntuados 6 − respuesta. */
  var calcular = function () {
    var acc = {};
    preguntas.forEach(function (q) {
      var v = q.r ? 6 - resp[q.id] : resp[q.id];
      var a = acc[q.d] || (acc[q.d] = { s: 0, n: 0 }); a.s += v; a.n++;
    });
    var dim = {};
    C.dimensiones.forEach(function (d) { dim[d.id] = acc[d.id].s / acc[d.id].n; });
    var orden = C.dimensiones.map(function (d, i) { return { id: d.id, p: dim[d.id], i: i }; });
    var desc = orden.slice().sort(function (a, b) { return b.p - a.p || a.i - b.i; });
    var plano = desc[0].p === desc[desc.length - 1].p;
    /* Las dos más altas y las dos más bajas, sin repetir; con empates se incluyen todas las del mismo puntaje. */
    var corteA = desc[1].p, altas = desc.filter(function (x) { return x.p >= corteA; });
    var enAltas = {}; altas.forEach(function (x) { enAltas[x.id] = true; });
    var asc = desc.slice().reverse(), corteB = asc[1].p;
    var bajas = asc.filter(function (x) { return x.p <= corteB && !enAltas[x.id]; });
    return { dim: dim, altas: altas, bajas: bajas, plano: plano };
  };

  var ancho = function (p) { return Math.max(Math.round((p - 1) * 100 / 4), 2); };
  var barraHtml = function (d, p, marca) {
    return '<li class="test-barra' + (marca ? " es-principal" : "") + '"><span class="test-barra__nombre">' + esc(d.n) + '</span><span class="test-barra__pista" aria-hidden="true"><span style="width:' + ancho(p) + '%"></span></span><span class="test-barra__valor">' + num(p) + "</span></li>";
  };
  var ficha = function (x, alta) {
    var d = D[x.id];
    return "<li><p><strong>" + esc(d.n) + "</strong> · " + num(x.p) + " de 5</p><p>" + esc(d.txt) + "</p><p>" + esc(alta ? d.alta : d.baja) + "</p></li>";
  };

  var mostrar = function () {
    var r = calcular(), html = '<p class="antetitulo">Tu resultado</p>';
    html += '<h2 class="test-resultado__titulo">' + (T.titulo || "Tu perfil de <em>conciencia corporal</em>") + "</h2>";
    if (r.plano) {
      html += '<div class="prosa"><p>Todas las dimensiones dieron el mismo puntaje, así que el test no puede mostrar diferencias. Puede que hayas respondido rápido o que te cueste diferenciarte en estas descripciones. Si querés, volvé a hacerlo con calma, pensando en situaciones concretas de las últimas semanas.</p></div>';
    } else {
      html += '<div class="test-resultado__grid">' +
        '<section><h3>Lo que más aparece</h3><p>Las dimensiones con puntaje más alto en tus respuestas.</p><ol class="test-resultado__lista">' + r.altas.map(function (x) { return ficha(x, true); }).join("") + "</ol></section>" +
        '<section><h3>Lo que menos aparece</h3><p>' + (T.bajas || "No son defectos: muestran por dónde podría ser más difícil, hoy, la relación con tu cuerpo.") + "</p>" +
        (r.bajas.length ? '<ol class="test-resultado__lista">' + r.bajas.map(function (x) { return ficha(x, false); }).join("") + "</ol>" : "<p>Tus puntajes están tan parejos que no hay un grupo claramente más bajo.</p>") + "</section></div>";
    }
    var marcadas = {}; if (!r.plano) r.altas.forEach(function (x) { marcadas[x.id] = true; });
    html += '<section style="margin-top:2rem"><h3>' + (T.dimensiones || "Las ocho dimensiones") + '</h3><p>' + (T.barras || "Puntaje de 1 a 5. Más alto no es siempre mejor: mirá la nota de abajo.") + '</p><ol class="test-barras">' +
      C.dimensiones.map(function (d) { return barraHtml(d, r.dim[d.id], marcadas[d.id]); }).join("") + "</ol></section>";
    html += '<p class="test-resultado__nota">' + (T.aclaracion || "<strong>Una aclaración.</strong> Notar mucho el cuerpo no siempre ayuda. Si una sensación te alarma enseguida, atenderla más puede aumentar la angustia, como pasa en los ataques de pánico. Lo que suele ayudar es la combinación: poder notar, sin alarmarte, y usar eso para cuidarte.") + "</p>";
    html += '<div class="test-resultado__leer"><h3>Para seguir</h3><ul>' + C.lecturas.map(function (l) {
      return '<li><a href="' + esc(l.url) + '">' + esc(l.t) + "</a></li>";
    }).join("") + "</ul></div>";
    html += '<p class="test-resultado__nota">' + (T.nota || "Es un autorreporte con afirmaciones originales y <strong>no está validado psicométricamente</strong>; no es el MAIA. Refleja cómo te describiste hoy. Si algo de lo que aparece te inquieta, en especial si te sentís insegura o inseguro en tu cuerpo después de experiencias difíciles, es un buen tema para hablar con un profesional.") + " Tus respuestas no se guardan ni se envían: si recargás la página, se borran.</p>";
    html += '<div class="lab-acciones"><button class="boton boton--secundario boton--chico" type="button" data-test-rehacer>Volver a empezar</button></div>';
    resultado.innerHTML = html; resultado.hidden = false; raiz.hidden = true;
    if (inicio) inicio.hidden = true;
    resultado.setAttribute("tabindex", "-1"); resultado.focus(); resultado.scrollIntoView({ block: "start" });
    resultado.querySelector("[data-test-rehacer]").addEventListener("click", function () { reiniciar(); raiz.scrollIntoView({ block: "start" }); });
  };

  window.TEST_CORPORAL = { calcular: calcular, _resp: function (o) { resp = o; } };
  pintar();
})();
