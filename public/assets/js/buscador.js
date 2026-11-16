/* Buscador del sitio — /buscar/
   Lee /buscar.json (generado en el build) y busca en el navegador. No se envía nada a ningún servidor. */
(function () {
  "use strict";
  var form = document.querySelector("[data-buscador]");
  if (!form) return;
  var campo = form.querySelector("#buscar-sitio"), estado = form.querySelector("#buscar-sitio-estado");
  var cont = document.querySelector("[data-buscador-resultados]"), sug = document.querySelector("[data-buscador-sugerencias]");
  var TIPOS = ["Artículo", "Laboratorio", "Test", "Ejercicio", "Voces", "Página", "Pregunta", "Glosario"];
  var ETIQUETA = { "Artículo": "Artículos", "Laboratorio": "Laboratorios", "Test": "Tests", "Ejercicio": "Ejercicios", "Voces": "Voces", "Página": "Páginas", "Pregunta": "Preguntas", "Glosario": "Glosario" };
  var SINGULAR = { "Artículo": "Artículo", "Laboratorio": "Laboratorio", "Test": "Test", "Ejercicio": "Ejercicio", "Voces": "Voces", "Página": "Página", "Pregunta": "Pregunta", "Glosario": "Glosario" };
  var LIMITE_TODOS = 60, LIMITE_TIPO = 200;
  var datos = null, tEspera = null, filtro = "Todos";
  var filtrosEl = document.querySelector("[data-buscador-filtros]");
  var TIPO_URL = { "articulos": "Artículo", "laboratorios": "Laboratorio", "tests": "Test", "ejercicios": "Ejercicio", "voces": "Voces", "paginas": "Página", "preguntas": "Pregunta", "glosario": "Glosario" };
  var URL_TIPO = {}; Object.keys(TIPO_URL).forEach(function (k) { URL_TIPO[TIPO_URL[k]] = k; });

  var normal = function (t) { return (t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
  var esc = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };

  /* Resalta los términos sin romper las tildes: se busca sobre el texto normalizado y se marca sobre el original. */
  var resaltar = function (texto, terminos) {
    var n = normal(texto), marcas = [];
    terminos.forEach(function (t) {
      if (t.length < 2) return;
      var i = 0;
      while ((i = n.indexOf(t, i)) >= 0) { marcas.push([i, i + t.length]); i += t.length; }
    });
    if (!marcas.length) return esc(texto);
    marcas.sort(function (a, b) { return a[0] - b[0]; });
    var out = "", pos = 0;
    marcas.forEach(function (m) {
      if (m[0] < pos) return;
      out += esc(texto.slice(pos, m[0])) + "<mark>" + esc(texto.slice(m[0], m[1])) + "</mark>";
      pos = m[1];
    });
    return out + esc(texto.slice(pos));
  };

  /* Fragmento del texto alrededor de la primera coincidencia. */
  var fragmento = function (it, terminos) {
    var base = it.d || "";
    var nd = normal(base);
    if (terminos.some(function (t) { return nd.indexOf(t) >= 0; }) || !it.x) return base;
    var nx = normal(it.x), i = -1;
    terminos.some(function (t) { i = nx.indexOf(t); return i >= 0; });
    if (i < 0) return base;
    var ini = Math.max(0, i - 80), fin = Math.min(it.x.length, i + 160);
    return (ini > 0 ? "…" : "") + it.x.slice(ini, fin).trim() + (fin < it.x.length ? "…" : "");
  };

  var puntuar = function (it, terminos) {
    var t = normal(it.t), c = normal(it.c), d = normal(it.d), x = normal(it.x), total = 0;
    for (var k = 0; k < terminos.length; k++) {
      var q = terminos[k], p = 0;
      if (t.indexOf(q) >= 0) p += t.indexOf(q) === 0 ? 14 : 10;
      if (c.indexOf(q) >= 0) p += 6;
      if (d.indexOf(q) >= 0) p += 4;
      if (x.indexOf(q) >= 0) p += 1 + Math.min(3, x.split(q).length - 2);
      if (!p) return 0; // todos los términos tienen que aparecer
      total += p;
    }
    if (it.k === "Artículo" || it.k === "Laboratorio") total += 1;
    return total;
  };

  var actualizarUrlBusqueda = function (q) {
    var partes = [];
    if (q) partes.push("q=" + encodeURIComponent(q));
    if (filtro !== "Todos") partes.push("tipo=" + URL_TIPO[filtro]);
    try { history.replaceState(null, "", "/buscar/" + (partes.length ? "?" + partes.join("&") : "")); } catch (e) { /* sin historial */ }
  };

  var pintarFiltros = function (conteos, total) {
    if (!filtrosEl) return;
    if (!total) { filtrosEl.innerHTML = ""; return; }
    var botones = [["Todos", total]].concat(TIPOS.filter(function (t) { return conteos[t]; }).map(function (t) { return [t, conteos[t]]; }));
    filtrosEl.innerHTML = botones.map(function (b) {
      var activo = b[0] === filtro;
      return '<button type="button" class="buscador-filtro' + (activo ? " buscador-filtro--activo" : "") + '" aria-pressed="' + activo + '" data-tipo="' + esc(b[0]) + '">' +
        (b[0] === "Todos" ? "Todos" : ETIQUETA[b[0]]) + ' <span>' + b[1] + "</span></button>";
    }).join("");
  };

  var buscar = function (q, actualizarUrl) {
    var limpio = q.trim();
    if (actualizarUrl) actualizarUrlBusqueda(limpio);
    if (!limpio) { cont.innerHTML = ""; sug.hidden = false; estado.textContent = ""; pintarFiltros({}, 0); return; }
    if (!datos) { estado.textContent = "Cargando…"; return; }
    var terminos = normal(limpio).split(/\s+/).filter(function (t) { return t.length > 1; });
    if (!terminos.length) { cont.innerHTML = ""; estado.textContent = "Escribí al menos dos letras."; return; }
    var res = datos.map(function (it) { return { it: it, p: puntuar(it, terminos) }; }).filter(function (r) { return r.p > 0; })
      .sort(function (a, b) { return b.p - a.p; });
    var conteos = {};
    res.forEach(function (r) { conteos[r.it.k] = (conteos[r.it.k] || 0) + 1; });
    if (filtro !== "Todos" && !conteos[filtro]) filtro = "Todos";
    pintarFiltros(conteos, res.length);
    sug.hidden = res.length > 0;
    var visibles = filtro === "Todos" ? res : res.filter(function (r) { return r.it.k === filtro; });
    var tope = filtro === "Todos" ? LIMITE_TODOS : LIMITE_TIPO;
    estado.textContent = res.length ? visibles.length + (visibles.length === 1 ? " resultado" : " resultados") + (filtro === "Todos" ? "" : " de " + ETIQUETA[filtro].toLowerCase()) + " para «" + limpio + "»." : "No encontré nada para «" + limpio + "». Probá con otra palabra.";
    var html = "";
    visibles.slice(0, tope).forEach(function (r) {
      html += '<li><a href="' + esc(r.it.u) + '"><span class="busqueda-tipo busqueda-tipo--' + esc(r.it.k.toLowerCase().replace(/[^a-z]/g, "")) + '">' + esc(SINGULAR[r.it.k]) + '</span> <strong>' + resaltar(r.it.t, terminos) + "</strong>" +
        '<span class="busqueda-resultado__texto">' + resaltar(fragmento(r.it, terminos), terminos) + "</span></a></li>";
    });
    cont.innerHTML = visibles.length ? '<section class="busqueda-grupo"><h2>' + (filtro === "Todos" ? "Más relevantes" : ETIQUETA[filtro]) + " <span>" + visibles.length + "</span></h2><ul>" + html + "</ul>" +
      (visibles.length > tope ? '<p class="busqueda-mas">Mostrando ' + tope + " de " + visibles.length + ". Para ver más, elegí un tipo arriba.</p>" : "") + "</section>" : "";
  };

  if (filtrosEl) filtrosEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-tipo]");
    if (!b) return;
    filtro = b.getAttribute("data-tipo");
    buscar(campo.value, true);
  });

  var params = new URLSearchParams(location.search);
  var q0 = params.get("q") || "";
  if (TIPO_URL[params.get("tipo") || ""]) filtro = TIPO_URL[params.get("tipo")];
  campo.value = q0;
  form.addEventListener("submit", function (e) { e.preventDefault(); buscar(campo.value, true); });
  campo.addEventListener("input", function () { clearTimeout(tEspera); tEspera = setTimeout(function () { buscar(campo.value, true); }, 140); });
  if (!q0) campo.focus();
  fetch("/buscar.json").then(function (r) { return r.json(); }).then(function (d) {
    datos = d;
    buscar(campo.value, false);
  }).catch(function () { estado.textContent = "No se pudo cargar el buscador. Probá recargar la página."; });
})();
