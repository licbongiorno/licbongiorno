/* «Voces que nos habitan»: azar sin repetición inmediata, idea del día, filtros, copiar, compartir,
   tarjeta descargable y favoritas (solo en este navegador). Datos: window.VOCES (voces-datos.js). */
(function () {
  "use strict";
  var V = window.VOCES;
  if (!V) return;
  var LAB = window.LAB || {};
  var CITAS = {}, AUTORES = {};
  V.citas.forEach(function (c) { CITAS[c.i] = c; });
  V.autores.forEach(function (a) { AUTORES[a.s] = a; });
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var BASE = location.origin;

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function sinTildes(t) { return String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function azarEntero(n) {
    if (window.crypto && crypto.getRandomValues) {
      var b = new Uint32Array(1), limite = Math.floor(4294967296 / n) * n;
      do { crypto.getRandomValues(b); } while (b[0] >= limite);
      return b[0] % n;
    }
    return Math.floor(Math.random() * n);
  }
  function enlace(c) { return BASE + AUTORES[c.a].r + "#cita-" + c.i; }
  function atribucion(c) { return AUTORES[c.a].n + ", " + c.ob + " (" + c.an + ")" + (c.u ? ", " + c.u : ""); }
  function textoCopia(c) {
    return "«" + c.t + "»\n— " + atribucion(c) + ".\nTraducción propia de Lo que te habita.\n" + enlace(c);
  }

  /* ---------- Favoritas ---------- */
  var CLAVE = "voces-favoritas";
  function favoritas() { try { return JSON.parse(localStorage.getItem(CLAVE) || "[]").filter(function (i) { return CITAS[i]; }); } catch (e) { return []; } }
  function guardarFavoritas(l) { try { localStorage.setItem(CLAVE, JSON.stringify(l)); } catch (e) { /* sin almacenamiento */ } }
  function esFavorita(id) { return favoritas().indexOf(id) >= 0; }

  /* ---------- Tarjeta de cita (misma estructura que la generada por build.py) ---------- */
  function htmlCita(c) {
    var a = AUTORES[c.a];
    var temas = c.te.map(function (t) {
      var d = V.temas[t] || [t, false];
      return d[1] ? '<li><a href="' + V.temasRuta + t + '/">' + esc(d[0]) + "</a></li>" : "<li><span>" + esc(d[0]) + "</span></li>";
    }).join("");
    return '<figure class="vo-cita" data-vo-cita="' + c.i + '">' +
      "<blockquote><p>«" + esc(c.t) + "»</p></blockquote>" +
      '<figcaption class="vo-cita__pie">— <a href="' + a.r + '">' + esc(a.n) + "</a>, <cite>" + esc(c.ob) + "</cite> (" + esc(c.an) + ")" + (c.u ? ", " + esc(c.u) : "") + "</figcaption>" +
      '<details class="vo-cita__original"><summary>Texto original y fuente</summary><p lang="' + c.l + '">«' + esc(c.o) + "»</p>" +
      '<p class="vo-cita__fuente"><a href="' + a.r + "#cita-" + c.i + '">Ver la fuente completa en la ficha de ' + esc(a.n) + "</a></p></details>" +
      '<ul class="vo-temas" aria-label="Temas">' + temas + "</ul>" +
      '<div class="vo-acciones" data-vo-acciones></div></figure>';
  }
  function poner(caja, html) {
    if (reducido) { caja.innerHTML = html; prepararAcciones(caja); return; }
    caja.classList.add("vo-cambia");
    setTimeout(function () { caja.innerHTML = html; prepararAcciones(caja); caja.classList.remove("vo-cambia"); }, 160);
  }

  /* ---------- Botones de cada cita ---------- */
  var ICO = {
    copiar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>',
    compartir: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/></svg>',
    imagen: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5"/></svg>',
    favorita: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>'
  };
  function boton(accion, texto) {
    return '<button type="button" class="vo-accion" data-vo-accion="' + accion + '">' + ICO[accion] + "<span>" + texto + "</span></button>";
  }
  function prepararAcciones(raiz) {
    (raiz || document).querySelectorAll("[data-vo-acciones]").forEach(function (caja) {
      if (caja.childElementCount) return;
      var id = caja.closest("[data-vo-cita]").getAttribute("data-vo-cita");
      caja.innerHTML = boton("copiar", "Copiar") + boton("compartir", "Compartir") + boton("imagen", "Imagen") + boton("favorita", "Guardar");
      var fav = caja.querySelector('[data-vo-accion="favorita"]');
      fav.setAttribute("aria-pressed", esFavorita(id) ? "true" : "false");
      fav.querySelector("span").textContent = esFavorita(id) ? "Guardada" : "Guardar";
    });
  }
  function avisar(btn, texto) {
    var span = btn.querySelector("span"), o = span.getAttribute("data-o") || span.textContent;
    span.setAttribute("data-o", o);
    span.textContent = texto;
    setTimeout(function () { span.textContent = o; }, 1800);
  }
  function copiarTexto(texto, btn, aviso) {
    var listo = function () { avisar(btn, aviso); };
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(texto).then(listo, function () { respaldo(); }); return; }
    respaldo();
    function respaldo() {
      var t = document.createElement("textarea");
      t.value = texto; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); listo(); } catch (e) { /* sin portapapeles */ }
      t.remove();
    }
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-vo-accion]");
    if (!btn) return;
    var fig = btn.closest("[data-vo-cita]"), id = fig.getAttribute("data-vo-cita"), c = CITAS[id];
    if (!c) return;
    var accion = btn.getAttribute("data-vo-accion");
    if (accion === "copiar") copiarTexto(textoCopia(c), btn, "Copiada");
    if (accion === "compartir") {
      if (navigator.share) {
        navigator.share({ title: "Voces que nos habitan · " + AUTORES[c.a].n, text: "«" + c.t + "» — " + AUTORES[c.a].n, url: enlace(c) }).catch(function () {});
      } else copiarTexto(enlace(c), btn, "Enlace copiado");
    }
    if (accion === "favorita") {
      var l = favoritas(), k = l.indexOf(id);
      if (k >= 0) l.splice(k, 1); else l.unshift(id);
      guardarFavoritas(l);
      document.querySelectorAll('[data-vo-cita="' + id + '"] [data-vo-accion="favorita"]').forEach(function (b) {
        b.setAttribute("aria-pressed", k < 0 ? "true" : "false");
        b.querySelector("span").textContent = k < 0 ? "Guardada" : "Guardar";
      });
      pintarFavoritas();
    }
    if (accion === "imagen") abrirTarjeta(fig, c);
  });

  /* ---------- Tarjeta descargable (sin foto del autor) ---------- */
  function partir(ctx, texto, ancho) {
    var palabras = texto.split(/\s+/), lineas = [], linea = "";
    palabras.forEach(function (p) {
      var prueba = linea ? linea + " " + p : p;
      if (ctx.measureText(prueba).width > ancho && linea) { lineas.push(linea); linea = p; } else linea = prueba;
    });
    if (linea) lineas.push(linea);
    return lineas;
  }
  function dibujar(canvas, c, formato, tema) {
    var W = 1080, H = formato === "vertical" ? 1350 : 1080, ctx = canvas.getContext("2d");
    canvas.width = W; canvas.height = H;
    var P = tema === "oscuro" ? { fondo: "#1B1A17", tinta: "#ECE6DC", suave: "#C9C2B6", acento: "#A3B18A", calido: "#F0A46B" }
                               : { fondo: "#F6F1EB", tinta: "#2B2A26", suave: "#5E5A52", acento: "#4A5A3C", calido: "#C0663A" };
    ctx.fillStyle = P.fondo; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = P.acento; ctx.globalAlpha = 0.18; ctx.lineWidth = 26; ctx.lineCap = "round";
    ctx.beginPath(); ctx.arc(W - 150, 170, 250, Math.PI * 0.62, Math.PI * 2.38); ctx.stroke(); ctx.globalAlpha = 1;
    ctx.fillStyle = P.calido; ctx.font = '400 150px "Playfair Display", Georgia, serif'; ctx.fillText("«", 96, 250);
    var margen = 110, ancho = W - margen * 2, tam = 64, lineas;
    do {
      ctx.font = "italic 400 " + tam + 'px "Playfair Display", Georgia, serif';
      lineas = partir(ctx, c.t, ancho); tam -= 2;
    } while (lineas.length * tam * 1.32 > H - 560 && tam > 30);
    tam += 2;
    var alto = lineas.length * tam * 1.32, y = Math.max(300, (H - alto) / 2 - 40);
    ctx.fillStyle = P.tinta;
    lineas.forEach(function (l, i) { ctx.fillText(l, margen, y + i * tam * 1.32); });
    y += alto + 40;
    ctx.fillStyle = P.acento; ctx.fillRect(margen, y, 80, 4);
    ctx.fillStyle = P.tinta; ctx.font = '600 40px "Montserrat", system-ui, sans-serif'; ctx.fillText(AUTORES[c.a].n, margen, y + 70);
    ctx.fillStyle = P.suave; ctx.font = '400 30px "Lora", Georgia, serif';
    partir(ctx, c.ob + " (" + c.an + ")" + (c.u ? ", " + c.u : ""), ancho).slice(0, 2).forEach(function (l, i) { ctx.fillText(l, margen, y + 120 + i * 40); });
    ctx.font = '400 24px "Montserrat", system-ui, sans-serif';
    ctx.fillText("Traducción propia · Voces que nos habitan · loquetehabita.com", margen, H - 80);
  }
  function abrirTarjeta(fig, c) {
    var panel = fig.querySelector(".vo-tarjeta");
    if (panel) { panel.remove(); return; }
    panel = document.createElement("div");
    panel.className = "vo-tarjeta";
    panel.innerHTML = '<div class="vo-tarjeta__opciones" role="group" aria-label="Formato de la imagen">' +
      '<label><input type="radio" name="f-' + c.i + '" value="cuadrada" checked> Cuadrada</label>' +
      '<label><input type="radio" name="f-' + c.i + '" value="vertical"> Vertical</label>' +
      '<label><input type="radio" name="t-' + c.i + '" value="claro" checked> Clara</label>' +
      '<label><input type="radio" name="t-' + c.i + '" value="oscuro"> Oscura</label></div>' +
      '<canvas aria-label="Vista previa de la imagen con la cita"></canvas>' +
      '<div class="vo-tarjeta__botones"><button type="button" class="boton boton--chico" data-vo-bajar>Descargar imagen</button>' +
      '<button type="button" class="boton boton--secundario boton--chico" data-vo-cerrar>Cerrar</button></div>';
    fig.appendChild(panel);
    var canvas = panel.querySelector("canvas");
    var valor = function (n) { return panel.querySelector('input[name="' + n + "-" + c.i + '"]:checked').value; };
    var redibujar = function () { dibujar(canvas, c, valor("f"), valor("t")); };
    (document.fonts && document.fonts.load ? Promise.all([
      document.fonts.load('italic 40px "Playfair Display"'), document.fonts.load('600 40px "Montserrat"'), document.fonts.load('40px "Lora"')
    ]) : Promise.resolve()).then(redibujar, redibujar);
    panel.addEventListener("change", redibujar);
    panel.querySelector("[data-vo-cerrar]").addEventListener("click", function () { panel.remove(); });
    panel.querySelector("[data-vo-bajar]").addEventListener("click", function () {
      canvas.toBlob(function (blob) {
        var nombre = "voces-" + c.i + ".png";
        if (LAB.guardarArchivo) LAB.guardarArchivo(nombre, blob);
      }, "image/png");
    });
  }

  /* ---------- Azar sin repetición inmediata ---------- */
  function grupo(origen) {
    if (!origen) return V.citas;
    var tipo = origen.slice(0, 1), val = origen.slice(2);
    return V.citas.filter(function (c) {
      var a = AUTORES[c.a];
      return (tipo === "a" && c.a === val) || (tipo === "t" && c.te.indexOf(val) >= 0) ||
        (tipo === "e" && a.e === val) || (tipo === "p" && a.p === val);
    });
  }
  var historial = {};
  function sortear(origen) {
    var pool = grupo(origen);
    if (!pool.length) return null;
    var vistos = historial[origen] || (historial[origen] = []);
    var memoria = Math.min(vistos.length, Math.max(0, Math.min(12, pool.length - 1)));
    var recientes = vistos.slice(-memoria);
    var libres = pool.filter(function (c) { return recientes.indexOf(c.i) < 0; });
    var elegida = (libres.length ? libres : pool)[azarEntero((libres.length ? libres : pool).length)];
    vistos.push(elegida.i);
    if (vistos.length > 50) vistos.shift();
    return elegida;
  }
  document.querySelectorAll("[data-vo-azar]").forEach(function (caja) {
    var btn = caja.querySelector("[data-vo-sorprender]"), destino = caja.querySelector("[data-vo-azar-cita]");
    var select = caja.querySelector("[data-vo-origen]"), fijo = caja.getAttribute("data-vo-fijo") || "";
    var mostrar = function () {
      var c = sortear(select ? select.value : fijo);
      poner(destino, c ? htmlCita(c) : '<p class="vo-vacio">Todavía no hay citas para esa elección.</p>');
    };
    btn.addEventListener("click", mostrar);
    if (select) select.addEventListener("change", mostrar);
  });

  /* ---------- Una idea para hoy (misma regla que build.py: FNV-1a sobre la fecha local) ---------- */
  var hoyCaja = document.querySelector("[data-vo-hoy]");
  if (hoyCaja) {
    var d = new Date(), iso = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    var h = 2166136261;
    for (var k = 0; k < iso.length; k++) h = Math.imul(h ^ iso.charCodeAt(k), 16777619) >>> 0;
    var orden = V.citas.slice().sort(function (x, y) { return x.i < y.i ? -1 : x.i > y.i ? 1 : 0; });
    var cHoy = orden[h % orden.length], actual = hoyCaja.querySelector("[data-vo-cita]");
    if (!actual || actual.getAttribute("data-vo-cita") !== cHoy.i) { hoyCaja.innerHTML = htmlCita(cHoy); }
    var t = document.querySelector("[data-vo-hoy-fecha]");
    if (t) { t.setAttribute("datetime", iso); t.textContent = d.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" }); }
  }

  /* ---------- Un tema, distintas miradas ---------- */
  var miradasSel = document.querySelector("[data-vo-miradas-tema]"), miradas = document.querySelector("[data-vo-miradas]");
  if (miradasSel && miradas) {
    miradasSel.addEventListener("change", function () {
      var tema = miradasSel.value;
      var html = V.autores.map(function (a) {
        var propias = V.citas.filter(function (c) { return c.a === a.s && c.te.indexOf(tema) >= 0; });
        return propias.length ? htmlCita(propias[azarEntero(propias.length)]) : "";
      }).join("");
      poner(miradas, html);
    });
  }

  /* ---------- Favoritas ---------- */
  function pintarFavoritas() {
    var sec = document.querySelector("[data-vo-favoritas-seccion]"), lista = document.querySelector("[data-vo-favoritas]");
    if (!sec || !lista) return;
    var l = favoritas();
    sec.hidden = !l.length;
    lista.innerHTML = l.map(function (i) { return htmlCita(CITAS[i]); }).join("");
    prepararAcciones(lista);
  }

  /* ---------- Índice de autores: búsqueda y orden ---------- */
  var indice = document.querySelector("[data-vo-indice]");
  if (indice) {
    var cont = document.querySelector("[data-vo-autores]"), tarjetas = Array.prototype.slice.call(cont.querySelectorAll("[data-vo-autor]"));
    var buscar = indice.querySelector("[data-vo-buscar]"), disc = indice.querySelector("[data-vo-disciplina]"), ord = indice.querySelector("[data-vo-orden]");
    var estado = indice.querySelector("[data-vo-estado]");
    var aplicar = function () {
      var q = sinTildes(buscar.value.trim()), dsel = disc.value, n = 0;
      var orden = tarjetas.slice().sort(function (x, y) {
        var o = ord.value, a = x.dataset, b = y.dataset;
        if (o === "alfa") return a.nombre.localeCompare(b.nombre, "es");
        if (o === "disciplina") return a.disciplina.localeCompare(b.disciplina, "es") || a.nombre.localeCompare(b.nombre, "es");
        if (o === "n") return b.n - a.n;
        if (o === "fecha") return (b.fecha || "").localeCompare(a.fecha || "");
        return (b.destacado - a.destacado) || tarjetas.indexOf(x) - tarjetas.indexOf(y);
      });
      orden.forEach(function (el) {
        var ok = (!q || sinTildes(el.textContent).indexOf(q) >= 0) && (!dsel || el.dataset.disciplina.indexOf(dsel) >= 0);
        el.hidden = !ok; if (ok) n++;
        cont.appendChild(el);
      });
      estado.textContent = n === tarjetas.length ? "" : (n ? n + " de " + tarjetas.length + " autores" : "Ningún autor coincide con la búsqueda.");
    };
    [buscar, disc, ord].forEach(function (el) { el.addEventListener("input", aplicar); el.addEventListener("change", aplicar); });
  }

  /* ---------- Ficha de autor: búsqueda, tema, obra y orden ---------- */
  var filtros = document.querySelector("[data-vo-filtros]");
  if (filtros) {
    var lista = document.querySelector("[data-vo-lista]"), figs = Array.prototype.slice.call(lista.querySelectorAll("[data-vo-cita]"));
    var fb = filtros.querySelector("[data-vo-buscar]"), ft = filtros.querySelector("[data-vo-tema]"), fo = filtros.querySelector("[data-vo-obra]");
    var fr = filtros.querySelector("[data-vo-orden]"), fe = filtros.querySelector("[data-vo-estado]");
    var aleatorio = null;
    var filtrar = function (e) {
      var q = sinTildes(fb.value.trim()), tema = ft.value, obra = fo.value, n = 0, modo = fr.value;
      if (modo === "azar" && (!aleatorio || (e && e.target === fr))) aleatorio = figs.map(function () { return Math.random(); });
      var orden = figs.slice().sort(function (x, y) {
        var ix = figs.indexOf(x), iy = figs.indexOf(y);
        if (modo === "breve") return CITAS[x.dataset.voCita].t.length - CITAS[y.dataset.voCita].t.length;
        if (modo === "larga") return CITAS[y.dataset.voCita].t.length - CITAS[x.dataset.voCita].t.length;
        if (modo === "azar") return aleatorio[ix] - aleatorio[iy];
        return ix - iy;
      });
      orden.forEach(function (el) {
        var c = CITAS[el.dataset.voCita];
        var ok = (!tema || c.te.indexOf(tema) >= 0) && (!obra || el.dataset.fuente === obra) &&
          (!q || sinTildes(c.t + " " + c.o + " " + c.ob).indexOf(q) >= 0);
        el.hidden = !ok; if (ok) n++;
        lista.appendChild(el);
      });
      fe.textContent = n === figs.length ? figs.length + " citas" : (n ? "Mostrando " + n + " de " + figs.length + " citas" : "Ninguna cita coincide. Probá con otra palabra o quitá un filtro.");
    };
    [fb, ft, fo, fr].forEach(function (el) { el.addEventListener("input", filtrar); el.addEventListener("change", filtrar); });
    filtrar();
    // Enlace directo a una cita: si estaba oculta por un filtro, se muestra.
    var irA = function () {
      var m = location.hash.match(/^#cita-(.+)$/);
      if (!m) return;
      var el = document.getElementById("cita-" + m[1]);
      if (el && el.hidden) { fb.value = ""; ft.value = ""; fo.value = ""; filtrar(); }
      if (el) el.scrollIntoView({ block: "center", behavior: reducido ? "auto" : "smooth" });
    };
    window.addEventListener("hashchange", irA);
    if (location.hash) setTimeout(irA, 50);
  }

  prepararAcciones(document);
  pintarFavoritas();
})();
