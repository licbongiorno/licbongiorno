/* Test de fortalezas personales (/test-de-fortalezas/).
   Lee la configuración de <script type="application/json" id="test-config">: 24 fortalezas (Peterson y Seligman, 2004),
   seis virtudes y 48 ítems originales, dos por fortaleza.
   Todo ocurre en el navegador y solo en memoria: no se guarda nada (ni en localStorage) ni se envía a ningún servidor.
   Si se recarga la página, las respuestas se pierden. */
(function () {
  "use strict";
  var raiz = document.querySelector("[data-test-fortalezas]"), fuente = document.getElementById("test-config");
  if (!raiz || !fuente) return;
  var C = JSON.parse(fuente.textContent);
  var OPS = C.opciones, POR = C.porPagina || 8, DESTACAR = 5;
  var preguntas = C.items.map(function (it, i) { return { id: "q" + i, i: i, txt: it.t, f: it.f }; });
  var paginas = [];
  for (var p = 0; p < preguntas.length; p += POR) paginas.push(preguntas.slice(p, p + POR));
  var F = {}, V = {};
  C.fortalezas.forEach(function (f) { F[f.id] = f; });
  C.virtudes.forEach(function (v) { V[v.id] = v; });

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

  /* Cálculo: el puntaje de cada fortaleza es el promedio de sus dos ítems (de 1 a 5).
     El promedio de cada virtud es el promedio de los puntajes de sus fortalezas. */
  var calcular = function () {
    var acc = {};
    preguntas.forEach(function (q) { var a = acc[q.f] || (acc[q.f] = { s: 0, n: 0 }); a.s += resp[q.id]; a.n++; });
    var fort = {}, virt = {};
    C.fortalezas.forEach(function (f) { fort[f.id] = acc[f.id].s / acc[f.id].n; });
    C.virtudes.forEach(function (v) {
      var lista = C.fortalezas.filter(function (f) { return f.v === v.id; });
      virt[v.id] = lista.reduce(function (s, f) { return s + fort[f.id]; }, 0) / lista.length;
    });
    /* Orden estable: a igual puntaje, se respeta el orden de la clasificación. */
    var orden = C.fortalezas.map(function (f, i) { return { id: f.id, p: fort[f.id], i: i }; });
    var desc = orden.slice().sort(function (a, b) { return b.p - a.p || a.i - b.i; });
    var asc = orden.slice().sort(function (a, b) { return a.p - b.p || a.i - b.i; });
    /* Empates: se incluyen todas las que tienen el mismo puntaje que la quinta. */
    var corteA = desc[DESTACAR - 1].p, corteB = asc[DESTACAR - 1].p;
    var altas = desc.filter(function (x) { return x.p >= corteA; });
    var enAltas = {}; altas.forEach(function (x) { enAltas[x.id] = true; });
    var bajas = asc.filter(function (x) { return x.p <= corteB && !enAltas[x.id]; });
    return { fort: fort, virt: virt, altas: altas, bajas: bajas, corteA: corteA, corteB: corteB,
      plano: desc[0].p === desc[desc.length - 1].p,
      solapan: asc.some(function (x) { return x.p <= corteB && enAltas[x.id]; }) };
  };

  var ancho = function (p) { return Math.max(Math.round((p - 1) * 100 / 4), 2); };
  var barraHtml = function (nombre, p, marca) {
    return '<li class="test-barra' + (marca ? " es-principal" : "") + '"><span class="test-barra__nombre">' + esc(nombre) + '</span><span class="test-barra__pista" aria-hidden="true"><span style="width:' + ancho(p) + '%"></span></span><span class="test-barra__valor">' + num(p) + "</span></li>";
  };
  var ficha = function (x) {
    var f = F[x.id];
    return "<li><p><strong>" + esc(f.n) + "</strong> · " + num(x.p) + " de 5 · <a href=\"" + esc(V[f.v].url) + "\">" + esc(V[f.v].n) + "</a></p><p>" + esc(f.txt) + "</p><p><em>Para pensar:</em> " + esc(f.q) + "</p></li>";
  };

  var mostrar = function () {
    var r = calcular(), html = '<p class="antetitulo">Tu resultado</p>';
    html += '<h2 class="test-resultado__titulo">Tu perfil de <em>fortalezas</em></h2>';
    if (r.plano) {
      html += '<p class="test-resultado__codigo">Todas tus fortalezas dieron ' + num(r.corteA) + " de 5</p>";
      html += '<div class="prosa"><p>Respondiste lo mismo en todas las afirmaciones, así que el test no puede ordenar tus fortalezas. Puede que te cueste diferenciarte en estas descripciones, o que hayas respondido rápido. Si querés, volvé a hacerlo con más calma, pensando en ejemplos concretos de las últimas semanas.</p></div>';
    } else {
      html += '<p class="test-resultado__codigo">Las que más aparecen en tus respuestas: ' + esc(r.altas.map(function (x) { return F[x.id].n; }).join(", ")) + "</p>";
      var notaA = r.altas.length > DESTACAR ? '<p class="test-resultado__nota">Hay un empate en el quinto lugar: ' + r.altas.length + " fortalezas tienen " + num(r.corteA) + (r.corteA < 5 ? " o más" : "") + ", así que se muestran todas.</p>" : "";
      var notaB = "";
      if (r.bajas.length > DESTACAR) notaB = '<p class="test-resultado__nota">Hay un empate en el quinto lugar: ' + r.bajas.length + " fortalezas tienen " + num(r.corteB) + (r.corteB > 1 ? " o menos" : "") + ", así que se muestran todas.</p>";
      if (r.solapan) notaB += '<p class="test-resultado__nota">Algunas fortalezas con ' + num(r.corteB) + " empatan con las más desarrolladas y ya aparecen en esa lista, por eso acá hay menos de cinco.</p>";
      html += '<div class="test-resultado__grid">' +
        '<section><h3>Tus fortalezas más desarrolladas</h3><p>Según cómo te describiste, son las que más usás o más reconocés en vos.</p><ol class="test-resultado__lista">' + r.altas.map(ficha).join("") + "</ol>" + notaA + "</section>" +
        '<section><h3>Tus fortalezas menos desarrolladas</h3><p>No son defectos: son las que menos reconocés en vos hoy. Pueden estar presentes en otros contextos o tener lugar para crecer, si te importan.</p>' +
        (r.bajas.length ? '<ol class="test-resultado__lista">' + r.bajas.map(ficha).join("") + "</ol>" : "<p>Tus puntajes están tan parejos que no hay un grupo de fortalezas claramente más bajo.</p>") + notaB + "</section></div>";
    }
    html += '<div class="test-resultado__grid"><section><h3>Promedio por virtud</h3><p>Cada virtud es el promedio de sus fortalezas, de 1 a 5.</p><ol class="test-barras">' +
      C.virtudes.map(function (v) { return barraHtml(v.n, r.virt[v.id], false); }).join("") + "</ol></section>";
    var marcadas = {}; if (!r.plano) r.altas.forEach(function (x) { marcadas[x.id] = true; });
    html += "<section><h3>Tus 24 fortalezas</h3><p>Puntaje de 1 a 5, agrupadas por virtud." + (r.plano ? "" : " Las resaltadas son las más desarrolladas.") + "</p>" + C.virtudes.map(function (v) {
      return '<h4 class="test-grupo">' + esc(v.n) + '</h4><ol class="test-barras">' + C.fortalezas.filter(function (f) { return f.v === v.id; }).map(function (f) {
        return barraHtml(f.n, r.fort[f.id], marcadas[f.id]);
      }).join("") + "</ol>";
    }).join("") + "</section></div>";
    html += '<div class="test-resultado__leer"><h3>Para seguir</h3><ul>' + C.virtudes.map(function (v) {
      return '<li><a href="' + esc(v.url) + '">Las fortalezas de ' + esc(v.n.toLowerCase()) + "</a></li>";
    }).join("") + '<li><a href="/laboratorio-de-fortalezas-y-virtudes/">Laboratorio de fortalezas y virtudes</a></li></ul></div>';
    html += '<p class="test-resultado__nota">Es un autorreporte con afirmaciones originales y <strong>no está validado psicométricamente</strong>. El puntaje refleja cómo te describiste hoy, no cuánto valés ni cuánto podés lograr. Tomalo como un punto de partida para pensar, no como una evaluación profesional. Tus respuestas no se guardan ni se envían: si recargás la página, se borran.</p>';
    html += '<div class="lab-acciones"><button class="boton boton--secundario boton--chico" type="button" data-test-rehacer>Volver a empezar</button></div>';
    resultado.innerHTML = html; resultado.hidden = false; raiz.hidden = true;
    if (inicio) inicio.hidden = true;
    resultado.setAttribute("tabindex", "-1"); resultado.focus(); resultado.scrollIntoView({ block: "start" });
    resultado.querySelector("[data-test-rehacer]").addEventListener("click", function () { reiniciar(); raiz.scrollIntoView({ block: "start" }); });
  };

  window.TEST_FORTALEZAS = { calcular: calcular };
  pintar();
})();
