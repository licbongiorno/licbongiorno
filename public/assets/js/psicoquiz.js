/* PsicoQuiz — /recursos/psicoquiz/
   Motor del juego. El banco de preguntas se carga aparte (psicoquiz-banco.js, generado desde contenido/psicoquiz.json),
   así se pueden sumar preguntas, categorías o niveles sin tocar este archivo.
   El progreso se guarda solo en este navegador (localStorage). Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var B = window.PSICOQUIZ, raiz = document.querySelector("[data-pq]");
  if (!B || !raiz) return;

  var CLAVE = "psicoquiz-v1";
  var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || raiz).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || raiz).querySelectorAll(s)); };
  var el = function (tag, cls, txt) { var x = document.createElement(tag); if (cls) x.className = cls; if (txt != null) x.textContent = txt; return x; };
  var mezclar = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };

  var PORID = {}; B.preguntas.forEach(function (q) { PORID[q.id] = q; });
  var CAT = {}; B.categorias.forEach(function (c) { CAT[c.id] = c; });
  var TEMA = {}; B.temas.forEach(function (t) { TEMA[t.id] = t; });
  var NIVEL = {}; B.niveles.forEach(function (n) { NIVEL[n.n] = n; });
  var LOGRO = {}; B.logros.forEach(function (l) { LOGRO[l.id] = l; });
  var MODO_N = { rapida: "Partida rápida", categoria: "Por categorías", escalera: "Escalera de conocimiento", reloj: "Contra el reloj",
    quien: "¿Quién lo dijo?", error: "Detectá el error", caso: "Casos y situaciones", duelo: "Duelo de escuelas" };
  var ESCALERA = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5], LARGO = 10, MAX_ERR_ESC = 3, MAX_PREG_ESC = 16;

  /* ---------- Progreso guardado ---------- */
  function progresoVacio() {
    return { v: 1, partidas: 0, puntos: 0, mejor: 0, nivelMax: 0, respondidas: 0, categorias: {}, temas: {}, niveles: {},
      vistas: {}, logros: {}, controversias: {}, enCurso: null };
  }
  var PR = progresoVacio();
  try { var d = JSON.parse(localStorage.getItem(CLAVE) || "null"); if (d && d.v === 1) { for (var k in PR) if (!(k in d)) d[k] = PR[k]; PR = d; } } catch (e) { /* sin almacenamiento */ }
  var guardar = function () { try { localStorage.setItem(CLAVE, JSON.stringify(PR)); } catch (e) { /* sin almacenamiento */ } };

  var anuncio = $("[data-pq-anuncio]");
  var anunciar = function (t) { anuncio.textContent = ""; setTimeout(function () { anuncio.textContent = t; }, 40); };

  /* ---------- Pantallas ---------- */
  function mostrar(nombre, foco, sinScroll) {
    $$("[data-pq-pantalla]").forEach(function (p) { p.hidden = p.getAttribute("data-pq-pantalla") !== nombre; });
    raiz.setAttribute("data-pq-actual", nombre);
    if (sinScroll) return;
    var top = raiz.getBoundingClientRect().top + window.pageYOffset - 90;
    if (Math.abs(window.pageYOffset - top) > 40) window.scrollTo({ top: top, behavior: quieto ? "auto" : "smooth" });
    if (foco) setTimeout(function () { foco.focus({ preventScroll: true }); }, 60);
  }

  /* ---------- Inicio ---------- */
  var nivelElegido = function () { var r = $('input[name="pq-nivel"]:checked'); return r ? +r.value : 0; };
  function pintarProgreso() {
    var caja = $("[data-pq-progreso]"); caja.innerHTML = "";
    if (!PR.partidas && !PR.respondidas && !Object.keys(PR.controversias).length) {
      caja.appendChild(el("p", null, "Todavía no jugaste. Tu primera partida aparecerá acá.")); return;
    }
    var cifras = el("dl", "pq-stats");
    var dato = function (k, v) { var d1 = el("div"); d1.appendChild(el("dt", null, k)); d1.appendChild(el("dd", null, v)); cifras.appendChild(d1); };
    dato("Partidas", String(PR.partidas));
    dato("Puntos acumulados", PR.puntos.toLocaleString("es-AR"));
    dato("Mejor partida", PR.mejor.toLocaleString("es-AR") + " pts");
    dato("Nivel alcanzado", PR.nivelMax ? PR.nivelMax + ". " + NIVEL[PR.nivelMax].nombre : "Todavía sin nivel");
    dato("Preguntas respondidas", String(PR.respondidas));
    dato("Categorías jugadas", Object.keys(PR.categorias).length + " de " + B.categorias.length);
    caja.appendChild(cifras);
    var ids = Object.keys(PR.logros);
    var t = el("p", "lab-paso__titulo", ids.length ? "Tus logros" : "Logros"); caja.appendChild(t);
    if (ids.length) {
      var ul = el("ul", "pq-logros");
      ids.forEach(function (id) { if (!LOGRO[id]) return; var li = el("li", "pq-logro"); li.appendChild(el("strong", null, LOGRO[id].nombre)); li.appendChild(el("span", null, LOGRO[id].descripcion)); ul.appendChild(li); });
      caja.appendChild(ul);
    }
    caja.appendChild(el("p", "lab-nota", ids.length < B.logros.length ? "Hay más logros por descubrir." : "Conseguiste todos los logros."));
  }
  function pintarContinuar() {
    var c = $("[data-pq-continuar]"), g = PR.enCurso;
    c.hidden = !g;
    if (g) c.querySelector("p").textContent = "Tenés una partida de «" + MODO_N[g.config.modo] + "» sin terminar: respondiste " + g.respuestas.length + (g.config.modo === "escalera" ? " preguntas." : " de " + g.ids.length + ".");
  }
  function irInicio(sinScroll) { detenerReloj(); pintarProgreso(); pintarContinuar(); mostrar("inicio", null, sinScroll); }

  $("[data-pq-comenzar]").addEventListener("click", function () { empezar({ modo: "rapida", nivel: nivelElegido() }); });
  $$("[data-pq-modo]").forEach(function (b) {
    b.addEventListener("click", function () {
      var m = b.getAttribute("data-pq-modo");
      if (m === "controversias") return abrirControversias();
      if (m === "categoria") { var t = $("#pq-categorias", document); t.scrollIntoView({ behavior: quieto ? "auto" : "smooth", block: "start" }); var p = $(".pq-cat"); if (p) p.focus({ preventScroll: true }); return; }
      empezar({ modo: m, nivel: m === "escalera" ? 0 : nivelElegido(), sinTiempo: m === "reloj" && $("[data-pq-sin-tiempo]").checked });
    });
  });
  $$("[data-pq-cat]").forEach(function (b) { b.addEventListener("click", function () { empezar({ modo: "categoria", cat: b.getAttribute("data-pq-cat"), nivel: nivelElegido() }); }); });
  $$("[data-pq-tema]").forEach(function (b) { b.addEventListener("click", function () { empezar({ modo: "categoria", tema: b.getAttribute("data-pq-tema"), nivel: nivelElegido() }); }); });
  $("[data-pq-retomar]").addEventListener("click", function () {
    if (!PR.enCurso) return;
    G = PR.enCurso; mostrar("juego");
    // Si se pausó después de responder, se sigue desde la próxima pregunta.
    if (G.respuestas.length > G.i) { if (esFinal()) return terminar(); G.i++; if (G.config.modo === "escalera") G.ids.push(siguienteEscalon()); }
    pintarPregunta();
  });
  $("[data-pq-descartar]").addEventListener("click", function () { PR.enCurso = null; guardar(); pintarContinuar(); });
  $("[data-pq-borrar]").addEventListener("click", function () {
    if (!window.confirm("¿Borrar todo tu progreso, logros y la partida en curso? No se puede deshacer.")) return;
    PR = progresoVacio(); guardar(); pintarProgreso(); pintarContinuar(); anunciar("Se borró tu progreso.");
  });

  /* ---------- Selección de preguntas ---------- */
  function poolDe(cfg) {
    var p = B.preguntas;
    if (cfg.cat) p = p.filter(function (q) { return q.categoria === cfg.cat; });
    if (cfg.tema) p = p.filter(function (q) { return (q.temas || []).indexOf(cfg.tema) >= 0; });
    if (["quien", "error", "caso", "duelo"].indexOf(cfg.modo) >= 0) p = p.filter(function (q) { return (q.modos || []).indexOf(cfg.modo) >= 0; });
    return p;
  }
  // Primero las preguntas que la persona todavía no vio, después el resto, siempre al azar.
  function priorizar(lista) {
    var nuevas = mezclar(lista.filter(function (q) { return !(q.id in PR.vistas); }));
    var vistas = mezclar(lista.filter(function (q) { return q.id in PR.vistas; }));
    return nuevas.concat(vistas);
  }
  function elegir(cfg) {
    var pool = poolDe(cfg), aviso = "";
    if (cfg.nivel) {
      var delNivel = pool.filter(function (q) { return q.nivel === cfg.nivel; });
      if (delNivel.length >= 5) pool = delNivel;
      else { aviso = "No hay suficientes preguntas de ese nivel para esta elección: se mezclan niveles."; cfg.nivelIgnorado = true; }
    }
    var ids;
    if (cfg.modo === "rapida" && !cfg.nivel) {
      ids = [];
      [1, 2, 3, 4, 5].forEach(function (n) { priorizar(pool.filter(function (q) { return q.nivel === n; })).slice(0, 2).forEach(function (q) { ids.push(q.id); }); });
    } else ids = priorizar(pool).slice(0, LARGO).map(function (q) { return q.id; });
    if (!cfg.nivel || cfg.nivelIgnorado) ids.sort(function (a, b) { return PORID[a].nivel - PORID[b].nivel; });
    return { ids: ids, aviso: aviso };
  }
  function siguienteEscalon() {
    var nv = ESCALERA[Math.min(G.escalon, ESCALERA.length - 1)], usadas = G.ids;
    var cand = priorizar(B.preguntas.filter(function (q) { return q.nivel === nv && usadas.indexOf(q.id) < 0; }));
    if (!cand.length) cand = priorizar(B.preguntas.filter(function (q) { return usadas.indexOf(q.id) < 0; }));
    return cand[0].id;
  }

  /* ---------- Partida ---------- */
  var G = null;
  function empezar(cfg) {
    detenerReloj();
    var g = { config: cfg, ids: [], i: 0, respuestas: [], puntos: 0, racha: 0, maxRacha: 0, escalon: 0, errores: 0, tiempo: 0, inicio: Date.now() };
    if (cfg.modo === "escalera") g.ids = [];
    else {
      var r = elegir(cfg);
      if (r.ids.length < 5) { window.alert("Todavía no hay suficientes preguntas para esta combinación. Probá con otra."); return; }
      g.ids = r.ids; g.aviso = r.aviso;
    }
    G = g;
    if (cfg.modo === "escalera") G.ids.push(siguienteEscalon());
    PR.enCurso = G; guardar();
    mostrar("juego");
    pintarPregunta();
    if (G.aviso) anunciar(G.aviso);
  }

  var carta = $("[data-pq-carta]"), opcionesCaja = $("[data-pq-opciones]"), explica = $("[data-pq-explica]");
  var bResp = $("[data-pq-responder]"), bPista = $("[data-pq-pista]"), pistaTxt = $("[data-pq-pista-texto]");
  var estado = null; // estado de la pregunta actual

  function nombreConfig(c) {
    if (c.modo === "categoria") return c.cat ? CAT[c.cat].nombre : c.tema ? TEMA[c.tema].nombre : "Por categorías";
    return MODO_N[c.modo];
  }
  function pintarBarra() {
    var c = G.config;
    $("[data-pq-modo-nombre]").textContent = nombreConfig(c);
    var badge = $("[data-pq-nivel-badge]");
    var q = PORID[G.ids[G.i]];
    badge.textContent = "Nivel " + q.nivel + " · " + NIVEL[q.nivel].badge;
    badge.setAttribute("data-nivel", q.nivel);
    $("[data-pq-puntos]").textContent = G.puntos.toLocaleString("es-AR");
    var racha = $("[data-pq-racha]");
    racha.hidden = G.racha < 3;
    racha.textContent = "Racha de " + G.racha + " · ×" + mult(G.racha).toFixed(1);
    var av = $("[data-pq-avance]"); av.innerHTML = "";
    var total = c.modo === "escalera" ? ESCALERA.length : G.ids.length;
    for (var i = 0; i < total; i++) {
      var s = el("span");
      if (c.modo === "escalera") s.className = i < G.escalon ? "ok" : i === G.escalon ? "actual" : "";
      else { var r = G.respuestas[i]; s.className = r ? (r.ok ? "ok" : "mal") : i === G.i ? "actual" : ""; }
      av.appendChild(s);
    }
    var esc = $("[data-pq-escalera]");
    esc.hidden = c.modo !== "escalera";
    if (c.modo === "escalera") {
      esc.innerHTML = "";
      for (var k = ESCALERA.length - 1; k >= 0; k--) {
        var li = el("li", "pq-peldano" + (k < G.escalon ? " hecho" : k === G.escalon ? " actual" : ""));
        li.appendChild(el("span", "pq-peldano__n", String(k + 1)));
        li.appendChild(el("span", "pq-peldano__nivel", NIVEL[ESCALERA[k]].nombre));
        if (k === G.escalon) li.setAttribute("aria-current", "step");
        esc.appendChild(li);
      }
      esc.appendChild(el("li", "pq-escalera__vidas", "Errores: " + G.errores + " de " + MAX_ERR_ESC));
    }
  }

  var CONSIGNA = { unica: "Elegí una opción.", completar: "Elegí la opción que completa la frase.", vf: "¿Verdadero o falso?",
    multiple: "Marcá todas las opciones correctas y tocá «Responder».", relacionar: "Elegí la pareja de cada elemento y tocá «Responder».",
    ordenar: "Usá las flechas para ordenar y tocá «Responder»." };

  function pintarPregunta() {
    var q = PORID[G.ids[G.i]];
    estado = { q: q, respondida: false, pista: false, sel: [], orden: null, mapa: null, t0: Date.now() };
    explica.hidden = true; explica.innerHTML = "";
    carta.classList.remove("pq-carta--entra"); void carta.offsetWidth; carta.classList.add("pq-carta--entra");
    pintarBarra();
    $("[data-pq-numero]").textContent = G.config.modo === "escalera" ? "Peldaño " + (G.escalon + 1) + " de " + ESCALERA.length : "Pregunta " + (G.i + 1) + " de " + G.ids.length;
    $("[data-pq-categoria]").textContent = CAT[q.categoria].nombre + (q.subcategoria ? " · " + q.subcategoria : "");
    var cita = $("[data-pq-cita]");
    cita.hidden = !q.cita;
    if (q.cita) cita.textContent = q.cita.tipo === "textual" ? "Cita textual · " + q.cita.fuente : "Paráfrasis, no cita textual · " + q.cita.fuente;
    var enun = $("[data-pq-enunciado]"); enun.innerHTML = "";
    var partes = q.enunciado.split("____");
    partes.forEach(function (t, i) { enun.appendChild(document.createTextNode(t)); if (i < partes.length - 1) enun.appendChild(el("span", "pq-hueco", "______")); });
    $("[data-pq-consigna]").textContent = CONSIGNA[q.tipo];
    pistaTxt.hidden = true; pistaTxt.textContent = "";
    bPista.hidden = !q.pista; bPista.disabled = false;
    opcionesCaja.innerHTML = "";
    bResp.hidden = ["multiple", "relacionar", "ordenar"].indexOf(q.tipo) < 0; bResp.disabled = false;
    if (q.tipo === "relacionar") pintarRelacionar(q);
    else if (q.tipo === "ordenar") pintarOrdenar(q);
    else pintarOpciones(q);
    enun.focus({ preventScroll: true });
    iniciarReloj(q);
  }
  function pintarOpciones(q) {
    var idx = q.opciones.map(function (_, i) { return i; });
    if (q.tipo !== "vf") idx = mezclar(idx);
    estado.orden = idx;
    var multiple = q.tipo === "multiple";
    opcionesCaja.setAttribute("role", "group");
    opcionesCaja.setAttribute("aria-label", "Opciones");
    idx.forEach(function (orig, pos) {
      var b = el("button", "pq-op"); b.type = "button"; b.setAttribute("data-orig", orig);
      b.appendChild(el("span", "pq-op__letra", String.fromCharCode(65 + pos)));
      b.appendChild(el("span", "pq-op__texto", q.opciones[orig]));
      if (multiple) b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () {
        if (estado.respondida) return;
        if (multiple) {
          var on = b.getAttribute("aria-pressed") !== "true";
          b.setAttribute("aria-pressed", String(on));
          estado.sel = $$(".pq-op[aria-pressed=true]", opcionesCaja).map(function (x) { return +x.getAttribute("data-orig"); });
        } else responder(orig);
      });
      opcionesCaja.appendChild(b);
    });
  }
  function pintarRelacionar(q) {
    var der = mezclar(q.pares.map(function (p) { return p[1]; }));
    opcionesCaja.removeAttribute("role");
    q.pares.forEach(function (p, i) {
      var fila = el("div", "pq-par");
      var id = "pq-par-" + i, lab = el("label", "pq-par__izq", p[0]); lab.setAttribute("for", id);
      var s = el("select", "lab-campo"); s.id = id;
      var o0 = el("option", null, "Elegí…"); o0.value = ""; s.appendChild(o0);
      der.forEach(function (d) { var o = el("option", null, d); o.value = d; s.appendChild(o); });
      fila.appendChild(lab); fila.appendChild(s); opcionesCaja.appendChild(fila);
    });
  }
  function pintarOrdenar(q) {
    var items = q.orden.slice();
    do { items = mezclar(items); } while (items.join("|") === q.orden.join("|"));
    opcionesCaja.removeAttribute("role");
    var ol = el("ol", "lab-orden pq-ordenar");
    var pintar = function (foco) {
      ol.innerHTML = "";
      items.forEach(function (t, k) {
        var li = el("li", "lab-orden__item");
        li.appendChild(el("span", "lab-orden__nombre", t));
        var bs = el("span", "lab-orden__botones");
        [["-1", "↑", "Subir"], ["1", "↓", "Bajar"]].forEach(function (d) {
          var b = el("button", "lab-orden__btn"); b.type = "button"; b.disabled = (d[0] === "-1" && k === 0) || (d[0] === "1" && k === items.length - 1);
          b.innerHTML = '<span aria-hidden="true"></span><span class="visualmente-oculto"></span>';
          b.firstChild.textContent = d[1]; b.lastChild.textContent = d[2] + " «" + t + "»";
          b.addEventListener("click", function () {
            if (estado.respondida) return;
            var j = k + +d[0]; var tmp = items[k]; items[k] = items[j]; items[j] = tmp;
            estado.items = items; pintar([t, d[0]]);
            anunciar("«" + t + "» quedó en el lugar " + (j + 1) + ".");
          });
          bs.appendChild(b);
        });
        li.appendChild(bs); ol.appendChild(li);
        if (foco && foco[0] === t) setTimeout(function () { var b = li.querySelector('button:not(:disabled)'); if (b) b.focus(); }, 0);
      });
    };
    estado.items = items; pintar();
    opcionesCaja.appendChild(ol);
  }
  bResp.addEventListener("click", function () {
    if (!estado || estado.respondida) return;
    var q = estado.q;
    if (q.tipo === "multiple" && !estado.sel.length) { anunciar("Marcá al menos una opción."); return; }
    if (q.tipo === "relacionar") estado.mapa = $$(".pq-par select", opcionesCaja).map(function (s) { return s.value; });
    responder(null);
  });
  bPista.addEventListener("click", function () {
    if (!estado || estado.respondida || !estado.q.pista) return;
    estado.pista = true; pistaTxt.hidden = false; pistaTxt.textContent = "Pista: " + estado.q.pista; bPista.disabled = true;
  });
  $("[data-pq-salir]").addEventListener("click", function () { detenerReloj(); PR.enCurso = G; guardar(); irInicio(); anunciar("Partida guardada. Podés continuarla cuando quieras."); });

  /* ---------- Reloj ---------- */
  var reloj = { id: null, total: 0, fin: 0 }, relojCaja = $("[data-pq-reloj]"), relojN = $("[data-pq-reloj-n]"), relojArco = $("[data-pq-reloj-arco]");
  function iniciarReloj(q) {
    detenerReloj();
    var activo = G.config.modo === "reloj" && !G.config.sinTiempo;
    relojCaja.hidden = !activo;
    if (!activo) return;
    reloj.total = ["multiple", "relacionar", "ordenar"].indexOf(q.tipo) >= 0 ? 45 : 30;
    reloj.fin = Date.now() + reloj.total * 1000;
    var avisado = false;
    var tic = function () {
      var resto = Math.max(0, reloj.fin - Date.now()), s = Math.ceil(resto / 1000);
      relojN.textContent = s;
      relojArco.style.strokeDashoffset = String(1 - resto / (reloj.total * 1000));
      relojCaja.classList.toggle("pq-reloj--poco", s <= 10);
      if (s <= 10 && !avisado) { avisado = true; anunciar("Quedan 10 segundos."); }
      if (resto <= 0) { detenerReloj(); if (!estado.respondida) responder(null, true); }
    };
    tic(); reloj.id = setInterval(tic, 200);
  }
  function detenerReloj() { if (reloj.id) clearInterval(reloj.id); reloj.id = null; }

  /* ---------- Corrección y puntaje ---------- */
  function mult(r) { return r >= 3 ? Math.min(1.5, 1 + 0.1 * (r - 2)) : 1; }
  function evaluar(q, eleccion) {
    if (q.tipo === "multiple") { var a = estado.sel.slice().sort().join(","), b = q.correcta.slice().sort().join(","); return a === b; }
    if (q.tipo === "relacionar") return q.pares.every(function (p, i) { return estado.mapa[i] === p[1]; });
    if (q.tipo === "ordenar") return estado.items.join("|") === q.orden.join("|");
    return eleccion === q.correcta;
  }
  function responder(eleccion, porTiempo) {
    if (estado.respondida) return;
    estado.respondida = true;
    var q = estado.q, ok = !porTiempo && evaluar(q, eleccion), segundos = Math.round((Date.now() - estado.t0) / 1000);
    var restante = reloj.id ? Math.max(0, reloj.fin - Date.now()) / 1000 : 0, conReloj = G.config.modo === "reloj" && !G.config.sinTiempo;
    detenerReloj();
    G.racha = ok ? G.racha + 1 : 0; G.maxRacha = Math.max(G.maxRacha, G.racha);
    var base = ok ? (estado.pista ? 50 : 100) : 0, extra = ok && conReloj ? Math.round(50 * restante / reloj.total) : 0;
    var pts = ok ? Math.round(base * mult(G.racha)) + extra : 0;
    G.puntos += pts; G.tiempo += segundos;
    G.respuestas.push({ id: q.id, ok: ok, pts: pts, pista: estado.pista, tiempo: porTiempo, eleccion: eleccionTexto(q, eleccion) });
    PR.vistas[q.id] = ok ? 1 : 0; PR.respondidas++;
    PR.niveles[q.nivel] = (PR.niveles[q.nivel] || 0) + 1;
    if (G.config.modo === "escalera") { if (ok) G.escalon++; else G.errores++; }
    marcarOpciones(q, eleccion);
    $$("button, select", opcionesCaja).forEach(function (x) { x.disabled = true; });
    bResp.hidden = true; bPista.hidden = true;
    carta.classList.add(ok ? "pq-carta--bien" : "pq-carta--mal");
    setTimeout(function () { carta.classList.remove("pq-carta--bien", "pq-carta--mal"); }, 700);
    if (pts) sumar(pts);
    pintarBarra();
    pintarExplicacion(q, ok, eleccion, porTiempo, pts, extra);
    PR.enCurso = G; guardar();
  }
  function eleccionTexto(q, e) {
    if (q.tipo === "multiple") return estado.sel.map(function (i) { return q.opciones[i]; }).join(" · ") || "—";
    if (q.tipo === "relacionar") return q.pares.map(function (p, i) { return p[0] + " → " + (estado.mapa[i] || "sin elegir"); }).join(" · ");
    if (q.tipo === "ordenar") return estado.items.join(" → ");
    return e == null ? "Sin respuesta" : q.opciones[e];
  }
  function correctaTexto(q) {
    if (q.tipo === "multiple") return q.correcta.map(function (i) { return q.opciones[i]; }).join(" · ");
    if (q.tipo === "relacionar") return q.pares.map(function (p) { return p[0] + " → " + p[1]; }).join(" · ");
    if (q.tipo === "ordenar") return q.orden.join(" → ");
    return q.opciones[q.correcta];
  }
  function marcarOpciones(q, e) {
    if (q.tipo === "relacionar") {
      $$(".pq-par", opcionesCaja).forEach(function (f, i) {
        var bien = estado.mapa[i] === q.pares[i][1];
        f.classList.add(bien ? "es-correcta" : "es-incorrecta");
        if (!bien) f.appendChild(el("span", "pq-par__ok", "Correcto: " + q.pares[i][1]));
      });
      return;
    }
    if (q.tipo === "ordenar") return;
    var correctas = q.tipo === "multiple" ? q.correcta : [q.correcta];
    $$(".pq-op", opcionesCaja).forEach(function (b) {
      var o = +b.getAttribute("data-orig"), elegida = q.tipo === "multiple" ? estado.sel.indexOf(o) >= 0 : o === e;
      if (correctas.indexOf(o) >= 0) { b.classList.add("es-correcta"); b.appendChild(el("span", "visualmente-oculto", " (respuesta correcta)")); if (q.tipo === "multiple" && !elegida) b.classList.add("es-faltante"); }
      else if (elegida) { b.classList.add("es-incorrecta"); b.appendChild(el("span", "visualmente-oculto", " (tu respuesta, incorrecta)")); }
    });
  }
  function sumar(n) {
    var s = $("[data-pq-suma]");
    s.textContent = "+" + n; s.classList.remove("sube"); void s.offsetWidth; s.classList.add("sube");
    animarNumero($("[data-pq-puntos]"), G.puntos - n, G.puntos, 600);
  }
  function animarNumero(nodo, desde, hasta, ms) {
    if (quieto) { nodo.textContent = hasta.toLocaleString("es-AR"); return; }
    var t0 = null;
    var paso = function (t) { if (t0 === null) t0 = t; var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3); nodo.textContent = Math.round(desde + (hasta - desde) * e).toLocaleString("es-AR"); if (k < 1) requestAnimationFrame(paso); };
    requestAnimationFrame(paso);
  }

  /* ---------- Explicación ---------- */
  function bloque(caja, titulo, texto, cls) {
    if (!texto) return;
    var d = el("div", "pq-explica__bloque" + (cls ? " " + cls : ""));
    d.appendChild(el("h3", null, titulo)); d.appendChild(el("p", null, texto)); caja.appendChild(d);
  }
  function pintarExplicacion(q, ok, e, porTiempo, pts, extra) {
    explica.innerHTML = ""; explica.hidden = false;
    explica.className = "pq-explica " + (ok ? "pq-explica--bien" : "pq-explica--mal");
    var h = el("p", "pq-explica__veredicto", porTiempo ? "Se terminó el tiempo" : ok ? "¡Correcto!" : "No es la respuesta correcta");
    explica.appendChild(h);
    if (ok) explica.appendChild(el("p", "pq-explica__pts", "+" + pts + " puntos" + (estado.pista ? " (con pista)" : "") + (G.racha >= 3 ? " · racha de " + G.racha : "") + (extra ? " · " + extra + " por rapidez" : "")));
    bloque(explica, "Respuesta correcta", correctaTexto(q), "pq-explica__correcta");
    if (!ok && e != null && q.alternativas && q.alternativas[e]) bloque(explica, "Sobre la opción que elegiste", q.alternativas[e]);
    if (!ok && q.tipo === "multiple" && q.alternativas) {
      var malas = estado.sel.filter(function (i) { return q.correcta.indexOf(i) < 0 && q.alternativas[i]; });
      if (malas.length) bloque(explica, "Sobre las opciones que marcaste", malas.map(function (i) { return q.opciones[i] + ": " + q.alternativas[i]; }).join(" "));
    }
    bloque(explica, "La idea detrás de la respuesta", q.explicacion);
    bloque(explica, "Para profundizar", q.profundizar);
    bloque(explica, "Contexto", q.contexto);
    var corriente = q.autor || (q.temas || []).map(function (t) { return TEMA[t] ? TEMA[t].nombre : ""; }).filter(Boolean).join(", ");
    bloque(explica, "Autor o corriente", corriente);
    bloque(explica, "Dato curioso", q.curiosidad, "pq-explica__dato");
    var f = el("p", "pq-explica__fuente"); f.appendChild(el("strong", null, "Fuente: ")); f.appendChild(document.createTextNode(q.fuente)); explica.appendChild(f);
    var acc = el("div", "lab-acciones");
    if (q.enlace) { var a = el("a", "boton boton--secundario boton--chico", "Explorar este concepto: " + q.enlace.texto); a.href = q.enlace.url; a.target = "_blank"; a.rel = "noopener"; acc.appendChild(a); }
    var fin = esFinal(), sig = el("button", "boton boton--chico", fin ? "Ver resultados" : "Siguiente pregunta"); sig.type = "button";
    sig.setAttribute("data-pq-siguiente", "");
    sig.addEventListener("click", avanzar);
    acc.appendChild(sig); explica.appendChild(acc);
    anunciar(h.textContent + ". Respuesta correcta: " + correctaTexto(q));
    setTimeout(function () { explica.focus({ preventScroll: true }); explica.scrollIntoView({ behavior: quieto ? "auto" : "smooth", block: "nearest" }); }, 80);
  }
  function esFinal() {
    if (G.config.modo === "escalera") return G.escalon >= ESCALERA.length || G.errores >= MAX_ERR_ESC || G.respuestas.length >= MAX_PREG_ESC;
    return G.i >= G.ids.length - 1;
  }
  function avanzar() {
    if (esFinal()) return terminar();
    G.i++;
    if (G.config.modo === "escalera") G.ids.push(siguienteEscalon());
    PR.enCurso = G; guardar();
    pintarPregunta();
  }

  /* Teclado: 1 a 6 eligen opción; Enter pasa a la siguiente. */
  document.addEventListener("keydown", function (e) {
    if (raiz.getAttribute("data-pq-actual") !== "juego" || !estado || e.altKey || e.ctrlKey || e.metaKey) return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "select" || tag === "input" || tag === "textarea") return;
    if (!estado.respondida && /^[1-6]$/.test(e.key)) {
      var b = $$(".pq-op", opcionesCaja)[+e.key - 1];
      if (b) { e.preventDefault(); b.click(); }
    }
  });

  /* ---------- Fin de partida ---------- */
  function terminar() {
    detenerReloj();
    var c = G.config, n = G.respuestas.length, bien = G.respuestas.filter(function (r) { return r.ok; }).length;
    var perfecta = n >= 8 && bien === n, cumbre = c.modo === "escalera" && G.escalon >= ESCALERA.length, bono = 0;
    if (perfecta) bono += 300;
    if (cumbre) bono += 200;
    G.puntos += bono;
    PR.partidas++; PR.puntos += G.puntos; PR.mejor = Math.max(PR.mejor, G.puntos);
    if (c.modo === "categoria" && c.cat) PR.categorias[c.cat] = (PR.categorias[c.cat] || 0) + 1;
    if (c.modo === "categoria" && c.tema) PR.temas[c.tema] = (PR.temas[c.tema] || 0) + 1;
    if (c.nivel && !c.nivelIgnorado && n >= 8 && bien / n >= 0.7) PR.nivelMax = Math.max(PR.nivelMax, c.nivel);
    if (cumbre) PR.nivelMax = Math.max(PR.nivelMax, 5);
    var nuevos = [];
    var dar = function (id, cond) { if (cond && !PR.logros[id]) { PR.logros[id] = new Date().toISOString().slice(0, 10); nuevos.push(id); } };
    dar("primeros-pasos", true);
    dar("curioso", Object.keys(PR.categorias).length >= 3);
    dar("polimata", Object.keys(PR.categorias).length >= 5);
    dar("freudiano", c.tema === "psicoanalisis" && bien >= 8);
    dar("junguiano", c.tema === "jung");
    dar("historiador", c.cat === "historia");
    dar("mente-inquieta", [1, 2, 3, 4, 5].every(function (k) { return PR.niveles[k]; }));
    dar("sin-errores", perfecta);
    dar("maestro", c.nivel === 5 && !c.nivelIgnorado && bien >= 7);
    dar("cumbre", cumbre);
    dar("detective", c.modo === "error" && bien >= 8);
    dar("contrarreloj", c.modo === "reloj" && !c.sinTiempo);
    PR.enCurso = null; guardar();
    pintarResultado(n, bien, bono, nuevos, cumbre);
  }
  function titular(p, c, cumbre) {
    if (c.modo === "escalera") return cumbre ? "¡Llegaste a la cumbre!" : "La escalera te espera";
    if (p >= 0.9) return "¡Excelente partida!";
    if (p >= 0.7) return "¡Muy buena partida!";
    if (p >= 0.5) return "Buena partida";
    return "Cada error también enseña";
  }
  function proximoDesafio(c, p) {
    var malas = G.respuestas.filter(function (r) { return !r.ok; }).map(function (r) { return PORID[r.id]; });
    if (malas.some(function (q) { return (q.temas || []).some(function (t) { return t === "psicoanalisis" || t === "jung"; }); }) && c.modo !== "duelo")
      return { t: "Explorar las diferencias entre Freud, Jung, Adler y sus continuadores en el «Duelo de escuelas».", cfg: { modo: "duelo", nivel: 0 } };
    if (p >= 0.8 && c.nivel && c.nivel < 5 && (c.modo === "rapida" || c.modo === "reloj" || c.modo === "categoria"))
      return { t: "Subir al nivel " + (c.nivel + 1) + ": " + NIVEL[c.nivel + 1].nombre + ".", cfg: { modo: c.modo, nivel: c.nivel + 1, cat: c.cat, tema: c.tema, sinTiempo: c.sinTiempo } };
    if (malas.length) {
      var cuenta = {};
      malas.forEach(function (q) { cuenta[q.categoria] = (cuenta[q.categoria] || 0) + 1; });
      var cat = Object.keys(cuenta).sort(function (a, b) { return cuenta[b] - cuenta[a]; })[0];
      return { t: "Volver a «" + CAT[cat].nombre + "»: ahí están varias de las preguntas que conviene revisar.", cfg: { modo: "categoria", cat: cat, nivel: 0 } };
    }
    if (c.modo !== "escalera") return { t: "Probar la escalera de conocimiento, del nivel Curioso al Maestro.", cfg: { modo: "escalera", nivel: 0 } };
    return { t: "Pensar sin puntaje: las grandes controversias de la psicología.", cfg: null };
  }
  var ultimaCfg = null;
  function pintarResultado(n, bien, bono, nuevos, cumbre) {
    var c = G.config, p = n ? bien / n : 0;
    ultimaCfg = c;
    mostrar("resultado", $("[data-pq-res-titulo]"));
    $("[data-pq-res-titulo]").textContent = titular(p, c, cumbre);
    $("[data-pq-res-frase]").textContent = c.modo === "escalera"
      ? "Subiste " + G.escalon + " de " + ESCALERA.length + " peldaños y respondiste bien " + bien + " de " + n + " preguntas."
      : "Respondiste correctamente " + bien + " de " + n + " preguntas.";
    var cif = $("[data-pq-cifras]"); cif.innerHTML = "";
    var cifra = function (v, t) { var d1 = el("div", "pq-cifra"); var num = el("strong", null, "0"); d1.appendChild(num); d1.appendChild(el("span", null, t)); cif.appendChild(d1); animarNumero(num, 0, v, 900); return num; };
    cifra(G.puntos, "puntos");
    cifra(bien, "correctas");
    cifra(n - bien, "incorrectas");
    cifra(Math.round(p * 100), "% de aciertos");
    if (G.maxRacha >= 3) cifra(G.maxRacha, "racha máxima");
    var min = Math.floor(G.tiempo / 60), seg = G.tiempo % 60;
    var tt = el("div", "pq-cifra"); tt.appendChild(el("strong", null, min + ":" + ("0" + seg).slice(-2))); tt.appendChild(el("span", null, "tiempo de juego")); cif.appendChild(tt);
    var det = $("[data-pq-res-detalle]"); det.innerHTML = "";
    var sec = function (t) { var s = el("section", "pq-res__sec"); s.appendChild(el("h3", null, t)); det.appendChild(s); return s; };
    if (bono) sec("Bonificaciones").appendChild(el("p", null, [bono >= 300 ? "Partida perfecta: +300." : "", cumbre ? "Cumbre de la escalera: +200." : ""].filter(Boolean).join(" ")));
    var cats = []; G.respuestas.forEach(function (r) { var nm = CAT[PORID[r.id].categoria].nombre; if (cats.indexOf(nm) < 0) cats.push(nm); });
    var s1 = sec("Hoy exploraste"); var ul1 = el("ul"); cats.forEach(function (x) { ul1.appendChild(el("li", null, x)); }); s1.appendChild(ul1);
    if (nuevos.length) {
      var s2 = sec("Logros desbloqueados"); var ul2 = el("ul", "pq-logros pq-logros--nuevos");
      nuevos.forEach(function (id, k) { var li = el("li", "pq-logro pq-logro--nuevo"); li.style.animationDelay = (0.25 + k * 0.15) + "s"; li.appendChild(el("strong", null, LOGRO[id].nombre)); li.appendChild(el("span", null, LOGRO[id].descripcion)); ul2.appendChild(li); });
      s2.appendChild(ul2);
    }
    var conceptos = []; G.respuestas.forEach(function (r) { (PORID[r.id].conceptos || []).forEach(function (x) { if (conceptos.indexOf(x) < 0) conceptos.push(x); }); });
    var s3 = sec("Conceptos que recorriste"); var ch = el("p", "pq-conceptos"); conceptos.slice(0, 16).forEach(function (x) { ch.appendChild(el("span", null, x)); }); s3.appendChild(ch);
    var malas = G.respuestas.filter(function (r) { return !r.ok; });
    if (malas.length) { var s4 = sec("Preguntas que conviene revisar"); var ul4 = el("ul"); malas.forEach(function (r) { ul4.appendChild(el("li", null, PORID[r.id].enunciado)); }); s4.appendChild(ul4); }
    var pd = proximoDesafio(c, p), s5 = sec("Tu próximo desafío"); s5.appendChild(el("p", null, pd.t));
    var bd = el("button", "boton boton--chico", pd.cfg ? "Aceptar el desafío" : "Ir a las controversias"); bd.type = "button";
    bd.addEventListener("click", function () { if (pd.cfg) empezar(pd.cfg); else abrirControversias(); });
    s5.appendChild(bd);
    var subir = $("[data-pq-subir]");
    subir.hidden = !(c.nivel && c.nivel < 5 && c.modo !== "escalera");
    $("[data-pq-revision]").hidden = true;
    var cel = $("[data-pq-celebra]"); cel.classList.remove("activa");
    if (p >= 0.7 || cumbre) { void cel.offsetWidth; cel.classList.add("activa"); }
    anunciar($("[data-pq-res-titulo]").textContent + ". " + $("[data-pq-res-frase]").textContent);
  }
  $("[data-pq-otra]").addEventListener("click", function () { if (ultimaCfg) empezar(JSON.parse(JSON.stringify({ modo: ultimaCfg.modo, nivel: ultimaCfg.nivel, cat: ultimaCfg.cat, tema: ultimaCfg.tema, sinTiempo: ultimaCfg.sinTiempo }))); });
  $("[data-pq-cambiar]").addEventListener("click", function () { irInicio(); setTimeout(function () { document.getElementById("pq-categorias").scrollIntoView({ behavior: quieto ? "auto" : "smooth" }); var b = $(".pq-cat"); if (b) b.focus({ preventScroll: true }); }, 120); });
  $("[data-pq-subir]").addEventListener("click", function () { if (ultimaCfg && ultimaCfg.nivel < 5) empezar({ modo: ultimaCfg.modo, nivel: ultimaCfg.nivel + 1, cat: ultimaCfg.cat, tema: ultimaCfg.tema, sinTiempo: ultimaCfg.sinTiempo }); });
  $("[data-pq-revisar]").addEventListener("click", function () {
    var caja = $("[data-pq-revision]"); caja.innerHTML = ""; caja.hidden = false;
    caja.appendChild(el("h3", null, "Tus respuestas"));
    var ol = el("ol", "pq-revision__lista");
    G.respuestas.forEach(function (r) {
      var q = PORID[r.id], li = el("li", r.ok ? "ok" : "mal");
      li.appendChild(el("p", "pq-revision__enun", q.enunciado));
      li.appendChild(el("p", null, (r.ok ? "✓ " : "✗ ") + "Tu respuesta: " + r.eleccion));
      if (!r.ok) li.appendChild(el("p", null, "Correcta: " + correctaTexto(q)));
      var det = el("details"); det.appendChild(el("summary", null, "Ver la explicación")); det.appendChild(el("p", null, q.explicacion));
      if (q.profundizar) det.appendChild(el("p", null, q.profundizar));
      var fu = el("p", "pq-explica__fuente", "Fuente: " + q.fuente); det.appendChild(fu);
      if (q.enlace) { var a = el("a", null, "Explorar este concepto: " + q.enlace.texto); a.href = q.enlace.url; det.appendChild(a); }
      li.appendChild(det); ol.appendChild(li);
    });
    caja.appendChild(ol);
    caja.querySelector("h3").setAttribute("tabindex", "-1"); caja.querySelector("h3").focus();
  });

  /* ---------- Grandes controversias ---------- */
  function abrirControversias() {
    detenerReloj();
    var caja = $("[data-pq-contro]"); caja.innerHTML = "";
    var lista = el("div", "pq-contro-lista");
    B.controversias.forEach(function (d) {
      var b = el("button", "pq-cat pq-contro-item" + (PR.controversias[d.id] ? " vista" : "")); b.type = "button";
      b.appendChild(el("strong", null, d.titulo)); b.appendChild(el("span", null, d.pregunta));
      if (PR.controversias[d.id]) b.appendChild(el("span", "pq-cat__n", "Explorada"));
      b.addEventListener("click", function () { abrirDebate(d); });
      lista.appendChild(b);
    });
    caja.appendChild(lista);
    mostrar("controversias", $("#pq-t-contro"));
  }
  function abrirDebate(d) {
    var caja = $("[data-pq-contro]"); caja.innerHTML = "";
    var art = el("article", "lab-tarjeta pq-debate");
    var h = el("h3", "pq-enunciado", d.pregunta); h.setAttribute("tabindex", "-1"); art.appendChild(h);
    var fs = el("fieldset", "pq-debate__elegir"); fs.appendChild(el("legend", "lab-paso__titulo", "Por ahora, ¿qué posición te resulta más convincente?"));
    var ops = el("div", "opciones");
    d.posiciones.concat([{ nombre: "Todavía no lo sé" }]).forEach(function (p, i) {
      var l = el("label", "opcion"), r = el("input"); r.type = "radio"; r.name = "pq-debate"; r.value = String(i);
      l.appendChild(r); l.appendChild(el("span", null, p.nombre)); ops.appendChild(l);
    });
    fs.appendChild(ops); art.appendChild(fs);
    var ver = el("button", "boton boton--chico", "Ver los argumentos"); ver.type = "button";
    var res = el("div", "pq-debate__res"); res.hidden = true;
    ver.addEventListener("click", function () {
      var m = art.querySelector('input[name="pq-debate"]:checked'), elegida = m ? +m.value : -1;
      res.innerHTML = ""; res.hidden = false; ver.hidden = true;
      d.posiciones.forEach(function (p, i) {
        var b = el("div", "pq-posicion" + (i === elegida ? " elegida" : ""));
        b.appendChild(el("h4", null, p.nombre + (i === elegida ? " · tu elección" : "")));
        b.appendChild(el("p", "pq-posicion__autores", p.autores));
        b.appendChild(el("p", null, p.argumento));
        res.appendChild(b);
      });
      bloque(res, "Lo que sigue abierto", d.abierto, "pq-explica__dato");
      var fu = el("div", "pq-explica__bloque"); fu.appendChild(el("h3", null, "Fuentes")); var ul = el("ul"); d.fuentes.forEach(function (x) { ul.appendChild(el("li", null, x)); }); fu.appendChild(ul); res.appendChild(fu);
      res.appendChild(el("p", "lab-nota", "No hay una respuesta correcta. Elegir una posición es un punto de partida para seguir pensando, no un resultado."));
      PR.controversias[d.id] = 1;
      var nuevo = Object.keys(PR.controversias).length >= 3 && !PR.logros["pensamiento-critico"];
      if (nuevo) { PR.logros["pensamiento-critico"] = new Date().toISOString().slice(0, 10); var lg = el("p", "pq-logro pq-logro--nuevo"); lg.appendChild(el("strong", null, "Logro desbloqueado: " + LOGRO["pensamiento-critico"].nombre)); lg.appendChild(el("span", null, LOGRO["pensamiento-critico"].descripcion)); res.appendChild(lg); }
      guardar();
      var otra = el("button", "boton boton--secundario boton--chico", "Ver otra controversia"); otra.type = "button"; otra.addEventListener("click", abrirControversias); res.appendChild(otra);
      anunciar("Se muestran las posiciones y los argumentos.");
      res.querySelector("h4").setAttribute("tabindex", "-1"); res.querySelector("h4").focus();
    });
    art.appendChild(ver); art.appendChild(res); caja.appendChild(art);
    h.focus();
  }
  $("[data-pq-volver]").addEventListener("click", irInicio);

  irInicio(true);
})();
