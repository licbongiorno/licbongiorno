/* Buscador del sitio — /buscar/
   Lee /buscar.json (generado en el build) y busca en el navegador. No se envía nada a ningún servidor. */
(function () {
  "use strict";
  var form = document.querySelector("[data-buscador]");
  if (!form) return;
  var campo = form.querySelector("#buscar-sitio"), estado = form.querySelector("#buscar-sitio-estado");
  var cont = document.querySelector("[data-buscador-resultados]"), sug = document.querySelector("[data-buscador-sugerencias]");
  var GRUPOS = ["Artículo", "Laboratorio", "Página", "Pregunta", "Glosario"];
  var PLURAL = { "Artículo": "Artículos", "Laboratorio": "Laboratorios", "Página": "Páginas", "Pregunta": "Preguntas frecuentes", "Glosario": "Glosario junguiano" };
  var datos = null, tEspera = null;

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

  var buscar = function (q, actualizarUrl) {
    var limpio = q.trim();
    if (actualizarUrl) {
      var url = limpio ? "/buscar/?q=" + encodeURIComponent(limpio) : "/buscar/";
      try { history.replaceState(null, "", url); } catch (e) { /* sin historial */ }
    }
    if (!limpio) { cont.innerHTML = ""; sug.hidden = false; estado.textContent = ""; return; }
    if (!datos) { estado.textContent = "Cargando…"; return; }
    var terminos = normal(limpio).split(/\s+/).filter(function (t) { return t.length > 1; });
    if (!terminos.length) { cont.innerHTML = ""; estado.textContent = "Escribí al menos dos letras."; return; }
    var res = datos.map(function (it) { return { it: it, p: puntuar(it, terminos) }; }).filter(function (r) { return r.p > 0; })
      .sort(function (a, b) { return b.p - a.p; });
    sug.hidden = res.length > 0;
    estado.textContent = res.length ? res.length + (res.length === 1 ? " resultado" : " resultados") + " para «" + limpio + "»." : "No encontré nada para «" + limpio + "». Probá con otra palabra.";
    var html = "";
    GRUPOS.forEach(function (g) {
      var del = res.filter(function (r) { return r.it.k === g; });
      if (!del.length) return;
      html += '<section class="busqueda-grupo"><h2>' + PLURAL[g] + ' <span>' + del.length + "</span></h2><ul>";
      del.slice(0, g === "Artículo" ? 30 : 12).forEach(function (r) {
        html += '<li><a href="' + esc(r.it.u) + '"><strong>' + resaltar(r.it.t, terminos) + "</strong>" +
          '<span class="busqueda-resultado__texto">' + resaltar(fragmento(r.it, terminos), terminos) + "</span></a></li>";
      });
      html += "</ul></section>";
    });
    cont.innerHTML = html;
  };

  var q0 = new URLSearchParams(location.search).get("q") || "";
  campo.value = q0;
  form.addEventListener("submit", function (e) { e.preventDefault(); buscar(campo.value, true); });
  campo.addEventListener("input", function () { clearTimeout(tEspera); tEspera = setTimeout(function () { buscar(campo.value, true); }, 140); });
  if (!q0) campo.focus();
  fetch("/buscar.json").then(function (r) { return r.json(); }).then(function (d) {
    datos = d;
    buscar(campo.value, false);
  }).catch(function () { estado.textContent = "No se pudo cargar el buscador. Probá recargar la página."; });
})();
