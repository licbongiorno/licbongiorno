/* Laboratorio «Respirar, volver al presente» — /laboratorio-respirar-volver-al-presente/
   Visualizador de respiración: el ciclo se calcula con el reloj real (no se acumula error), se puede pausar en cualquier punto
   y respeta prefers-reduced-motion. El sonido es opcional, sintetizado en el navegador y nunca arranca solo.
   Solo se guardan preferencias (técnica, tiempos, estilo) en este navegador. */
(function () {
  "use strict";
  var raiz = document.querySelector("[data-rp]"), datos = document.getElementById("rp-datos");
  if (!raiz || !datos) return;
  var TEC = JSON.parse(datos.textContent);
  var CLAVE = "respirar-v1";
  var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s) { return raiz.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(raiz.querySelectorAll(s)); };
  var mmss = function (s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); };
  var FASE = [{ k: "inhala", t: "Inspirá" }, { k: "pausa1", t: "Pausa" }, { k: "exhala", t: "Exhalá" }, { k: "pausa2", t: "Pausa" }];
  var MIN = 0.42, MAX = 1;

  /* ---------- Preferencias ---------- */
  var pref = { tec: "prolongada", tiempos: {}, dur: "3", min: 4, estilo: "esfera", sonido: "no", vol: 0.5, anunciar: false };
  try { var g = JSON.parse(localStorage.getItem(CLAVE) || "null"); if (g) for (var k in g) pref[k] = g[k]; } catch (e) { /* sin almacenamiento */ }
  var guardarPref = function () { try { localStorage.setItem(CLAVE, JSON.stringify(pref)); } catch (e) { /* sin almacenamiento */ } };
  var tiempos = function (t) { return (pref.tiempos[t] || TEC[t].fases || []).slice(); };

  function marcar(name, v) { var r = raiz.querySelector('input[name="' + name + '"][value="' + v + '"]'); if (r) r.checked = true; }
  marcar("rp-tec", pref.tec); marcar("rp-dur", pref.dur); marcar("rp-estilo", pref.estilo); marcar("rp-sonido", pref.sonido);
  $("#rp-min").value = pref.min; $("[data-rp-vol]").value = pref.vol; $("[data-rp-anunciar]").checked = pref.anunciar;

  /* ---------- Elementos ---------- */
  var esc = $("[data-rp-escenario]"), faseTxt = $("[data-rp-fase-txt]"), cuenta = $("[data-rp-cuenta]"), barra = $("[data-rp-barra]");
  var dTec = $("[data-rp-d-tec]"), dFase = $("[data-rp-d-fase]"), dResta = $("[data-rp-d-resta]"), dTrans = $("[data-rp-d-trans]"), dTotal = $("[data-rp-d-total]"), dCic = $("[data-rp-d-ciclos]");
  var bIni = $("[data-rp-iniciar]"), bRei = $("[data-rp-reiniciar]"), bFin = $("[data-rp-finalizar]"), bMarcar = $("[data-rp-marcar]");
  var antes = $("[data-rp-antes]"), fin = $("[data-rp-fin]");
  var anillo = $("[data-rp-anillo]"), marcador = $("[data-rp-marcador]"), cuadrado = $("[data-rp-cuadrado]");
  var esfera = $("[data-rp-esfera]"), blob = $("[data-rp-blob]"), petalos = $$("[data-rp-petalo]"), ondas = $$("[data-rp-onda]");
  var NS = "http://www.w3.org/2000/svg";

  /* ---------- Configuración ---------- */
  function fasesActivas() { var t = tiempos(pref.tec); return t.length ? FASE.map(function (f, i) { return { k: f.k, t: f.t, s: +t[i] || 0 }; }).filter(function (f) { return f.s > 0; }) : null; }
  function duracionTotal() { return (pref.dur === "otra" ? Math.max(1, Math.min(60, +pref.min || 1)) : +pref.dur) * 60; }
  function pintarConfig() {
    var t = tiempos(pref.tec), libre = !TEC[pref.tec].fases;
    $("[data-rp-fases-caja]").hidden = libre;
    $$("[data-rp-fase]").forEach(function (inp) { inp.value = t[+inp.getAttribute("data-rp-fase")] || 0; });
    $("[data-rp-retencion]").hidden = libre || !(t[1] > 0 || t[3] > 0);
    $("[data-rp-otra]").hidden = pref.dur !== "otra";
    esc.setAttribute("data-estilo", pref.estilo);
    // En SVG la propiedad «hidden» no existe: se usa el atributo.
    $$("[data-rp-fig]").forEach(function (g) { g.toggleAttribute("hidden", g.getAttribute("data-rp-fig") !== pref.estilo); });
    dTec.textContent = TEC[pref.tec].nombre;
    dTotal.textContent = mmss(duracionTotal());
    faseTxt.setAttribute("aria-live", pref.anunciar ? "polite" : "off");
    bMarcar.hidden = !libre || !S.corriendo;
    dibujarGuia();
    if (!S.corriendo) dibujarFigura(0.55);
  }
  // Guía alrededor de la figura: un anillo con un tramo por fase (o un cuadrado para la respiración cuadrada).
  function dibujarGuia() {
    anillo.innerHTML = "";
    var f = fasesActivas(), esCuad = pref.tec === "cuadrada";
    cuadrado.toggleAttribute("hidden", !esCuad || !f);
    marcador.style.display = f ? "" : "none";
    if (!f || esCuad) return;
    var total = f.reduce(function (s, x) { return s + x.s; }, 0), ang = -Math.PI / 2, r = 185;
    f.forEach(function (x) {
      var a1 = ang + 2 * Math.PI * x.s / total, gap = 0.04;
      var p0 = [200 + r * Math.cos(ang + gap), 200 + r * Math.sin(ang + gap)], p1 = [200 + r * Math.cos(a1 - gap), 200 + r * Math.sin(a1 - gap)];
      var path = document.createElementNS(NS, "path");
      path.setAttribute("d", "M" + p0[0].toFixed(1) + " " + p0[1].toFixed(1) + " A" + r + " " + r + " 0 " + (a1 - ang > Math.PI ? 1 : 0) + " 1 " + p1[0].toFixed(1) + " " + p1[1].toFixed(1));
      path.setAttribute("class", "rp-tramo rp-tramo--" + x.k);
      anillo.appendChild(path); ang = a1;
    });
  }
  function posMarcador(fraccion) {
    if (pref.tec === "cuadrada") {
      var d = fraccion * 4, lado = Math.floor(d) % 4, t = d - Math.floor(d), L = 70, H = 330;
      // La respiración cuadrada empieza en la esquina inferior izquierda y sube: inspirar es el lado izquierdo.
      var p = [[L, H - (H - L) * t], [L + (H - L) * t, L], [H, L + (H - L) * t], [H - (H - L) * t, H]][lado];
      marcador.setAttribute("cx", p[0].toFixed(1)); marcador.setAttribute("cy", p[1].toFixed(1)); return;
    }
    var a = -Math.PI / 2 + 2 * Math.PI * fraccion;
    marcador.setAttribute("cx", (200 + 185 * Math.cos(a)).toFixed(1)); marcador.setAttribute("cy", (200 + 185 * Math.sin(a)).toFixed(1));
  }

  /* ---------- Figura ---------- */
  function dibujarFigura(k) { // k: 0 (recogida) a 1 (expandida)
    var s = quieto ? 0.78 : MIN + (MAX - MIN) * k;
    if (pref.estilo === "esfera") {
      esfera.setAttribute("r", (150 * s).toFixed(1));
      blob.setAttribute("transform", "translate(200 200) scale(" + (s * 0.95).toFixed(3) + ") translate(-200 -200)");
    } else if (pref.estilo === "flor") {
      var abre = quieto ? 0.6 : k;
      petalos.forEach(function (p, i) { p.setAttribute("transform", "rotate(" + (i * 45 + abre * 12).toFixed(1) + " 200 200) translate(0 " + (-(30 + 60 * abre)).toFixed(1) + ") scale(" + (0.75 + 0.35 * abre).toFixed(3) + ")"); });
    } else {
      ondas.forEach(function (o, i) {
        var r = (30 + 140 * s * (i + 1) / ondas.length);
        o.setAttribute("r", r.toFixed(1)); o.style.opacity = String((1 - i / ondas.length) * (0.35 + 0.5 * (quieto ? 0.6 : k)));
      });
    }
  }
  var suave = function (p) { return (1 - Math.cos(Math.PI * p)) / 2; };

  /* ---------- Sonido (opcional) ---------- */
  var audio = null, mar = null;
  function prepararAudio() {
    if (pref.sonido === "no") return;
    try { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); if (audio.state === "suspended") audio.resume(); } catch (e) { audio = null; }
    if (audio && pref.sonido === "mar" && !mar) {
      var n = audio.sampleRate * 4, buf = audio.createBuffer(1, n, audio.sampleRate), d = buf.getChannelData(0), ult = 0;
      for (var i = 0; i < n; i++) { var w = Math.random() * 2 - 1; ult = (ult + 0.02 * w) / 1.02; d[i] = ult * 3.2; }
      var src = audio.createBufferSource(); src.buffer = buf; src.loop = true;
      var filtro = audio.createBiquadFilter(); filtro.type = "lowpass"; filtro.frequency.value = 500;
      var gan = audio.createGain(); gan.gain.value = 0;
      src.connect(filtro); filtro.connect(gan); gan.connect(audio.destination); src.start();
      mar = { src: src, filtro: filtro, gan: gan };
    }
  }
  function silenciarMar() { if (mar) { try { mar.src.stop(); } catch (e) { /* ya detenido */ } mar = null; } }
  function campana(fase) {
    if (!audio || pref.sonido !== "campana") return;
    var t = audio.currentTime, o = audio.createOscillator(), gn = audio.createGain();
    o.type = "sine"; o.frequency.value = { inhala: 432, exhala: 324, pausa1: 384, pausa2: 384 }[fase] || 384;
    gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(0.09 * pref.vol + 0.0001, t + 0.04); gn.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
    o.connect(gn); gn.connect(audio.destination); o.start(t); o.stop(t + 1.9);
  }

  /* ---------- Bloqueo de pantalla ---------- */
  var bloqueo = null;
  function mantenerPantalla(on) {
    if (on && navigator.wakeLock && !bloqueo) navigator.wakeLock.request("screen").then(function (b) { bloqueo = b; }, function () { /* sin permiso */ });
    if (!on && bloqueo) { bloqueo.release().catch(function () {}); bloqueo = null; }
  }

  /* ---------- Motor ---------- */
  var S = { corriendo: false, pausado: false, acum: 0, desde: 0, fase: null, raf: null, marcadas: 0, ultimoInfo: 0, fases: null, total: 0, finAt: 0 };
  function transcurrido(ahora) { return S.acum + (S.pausado || !S.corriendo ? 0 : ahora - S.desde); }
  function arrancar() {
    S.fases = fasesActivas(); S.total = duracionTotal(); S.marcadas = 0;
    var ciclo = S.fases ? S.fases.reduce(function (s, f) { return s + f.s; }, 0) : 0;
    S.finAt = S.fases ? Math.ceil(S.total / ciclo) * ciclo : S.total; // termina al completar el ciclo en curso
    S.corriendo = true; S.pausado = false; S.acum = 0; S.desde = performance.now(); S.fase = null;
    fin.hidden = true; esc.classList.add("en-marcha"); raiz.classList.add("rp--activo");
    $$(".rp-panel input").forEach(function (i) { i.disabled = true; });
    $("[data-rp-restablecer]").disabled = true;
    bIni.textContent = "Pausar"; bRei.disabled = false; bFin.disabled = false;
    bMarcar.hidden = !!S.fases;
    prepararAudio(); mantenerPantalla(true);
    if (!S.fases) { faseTxt.textContent = "Observá tu respiración"; cuenta.textContent = ""; dFase.textContent = "Libre"; dResta.textContent = "—"; }
    S.raf = requestAnimationFrame(cuadro);
  }
  function pausar() {
    if (!S.corriendo) return;
    if (S.pausado) { S.pausado = false; S.desde = performance.now(); bIni.textContent = "Pausar"; prepararAudio(); faseTxt.textContent = S.fases ? (S.fase ? S.fase.t : "") : "Observá tu respiración"; S.raf = requestAnimationFrame(cuadro); }
    else { S.acum = transcurrido(performance.now()); S.pausado = true; bIni.textContent = "Reanudar"; cancelAnimationFrame(S.raf); faseTxt.textContent = "En pausa"; if (mar) mar.gan.gain.value = 0; }
    esc.classList.toggle("en-pausa", S.pausado);
  }
  function detener(completo) {
    cancelAnimationFrame(S.raf);
    var t = transcurrido(performance.now()) / 1000, ciclos = contarCiclos(t);
    S.corriendo = false; S.pausado = false;
    esc.classList.remove("en-marcha", "en-pausa"); raiz.classList.remove("rp--activo");
    $$(".rp-panel input").forEach(function (i) { i.disabled = false; });
    $("[data-rp-restablecer]").disabled = false;
    bIni.textContent = "Iniciar"; bRei.disabled = true; bFin.disabled = true; bMarcar.hidden = true;
    silenciarMar(); mantenerPantalla(false);
    faseTxt.textContent = "Listo para empezar"; cuenta.textContent = ""; barra.style.transform = "scaleX(0)";
    dibujarFigura(0.55); posMarcador(0);
    if (completo !== null) {
      $("[data-rp-fin-txt]").textContent = "Practicaste " + mmss(t) + " con «" + TEC[pref.tec].nombre + "»" + (ciclos ? ", " + ciclos + (ciclos === 1 ? " ciclo." : " ciclos.") : ".");
      fin.hidden = false; fin.focus({ preventScroll: true });
    }
    pintarConfig();
  }
  function contarCiclos(t) {
    if (!S.fases) return S.marcadas;
    var c = S.fases.reduce(function (s, f) { return s + f.s; }, 0);
    return Math.floor(t / c);
  }
  function cuadro(ahora) {
    var t = transcurrido(ahora) / 1000;
    if (t >= S.finAt) { detener(true); return; }
    var k = 0.55, fase = null, resta = 0, fracCiclo = 0;
    if (S.fases) {
      var ciclo = S.fases.reduce(function (s, f) { return s + f.s; }, 0), pos = t % ciclo, acc = 0;
      for (var i = 0; i < S.fases.length; i++) {
        var f = S.fases[i];
        if (pos < acc + f.s) {
          var p = (pos - acc) / f.s; fase = f; resta = f.s - (pos - acc);
          k = f.k === "inhala" ? suave(p) : f.k === "exhala" ? 1 - suave(p) : f.k === "pausa1" ? 1 : 0;
          break;
        }
        acc += f.s;
      }
      fracCiclo = pos / ciclo;
      if (fase && fase !== S.fase) {
        S.fase = fase; faseTxt.textContent = fase.t; dFase.textContent = fase.t === "Pausa" ? (fase.k === "pausa1" ? "Pausa con aire" : "Pausa sin aire") : fase.t;
        esc.setAttribute("data-fase", fase.k); campana(fase.k);
      }
      posMarcador(fracCiclo);
    } else {
      k = 0.5 + 0.06 * Math.sin(t / 3); // apenas un brillo: no marca un ritmo
    }
    dibujarFigura(k);
    if (mar) { var v = pref.vol * (0.12 + 0.28 * k); mar.gan.gain.setTargetAtTime(v, audio.currentTime, 0.25); mar.filtro.frequency.setTargetAtTime(350 + 900 * k, audio.currentTime, 0.25); }
    if (ahora - S.ultimoInfo > 200) {
      S.ultimoInfo = ahora;
      if (S.fases) { cuenta.textContent = Math.max(1, Math.ceil(resta)); dResta.textContent = Math.max(1, Math.ceil(resta)) + " s"; }
      dTrans.textContent = mmss(t); dTotal.textContent = mmss(S.finAt);
      dCic.textContent = String(contarCiclos(t));
      barra.style.transform = "scaleX(" + Math.min(1, t / S.finAt).toFixed(4) + ")";
    }
    S.raf = requestAnimationFrame(cuadro);
  }

  /* ---------- Controles ---------- */
  var aceptado = false;
  try { aceptado = sessionStorage.getItem("rp-aviso") === "1"; } catch (e) { /* sin almacenamiento */ }
  bIni.addEventListener("click", function () {
    if (S.corriendo) return pausar();
    if (!aceptado) { antes.hidden = false; antes.focus(); return; }
    arrancar();
  });
  $("[data-rp-acepto]").addEventListener("click", function () { aceptado = true; try { sessionStorage.setItem("rp-aviso", "1"); } catch (e) { /* sin almacenamiento */ } antes.hidden = true; arrancar(); bIni.focus(); });
  $("[data-rp-cancelo]").addEventListener("click", function () { antes.hidden = true; bIni.focus(); });
  bRei.addEventListener("click", function () { detener(null); arrancar(); });
  bFin.addEventListener("click", function () { detener(true); });
  $("[data-rp-otra]").addEventListener("click", function () { fin.hidden = true; arrancar(); });
  bMarcar.addEventListener("click", function () { S.marcadas++; dCic.textContent = String(S.marcadas); esc.classList.remove("rp-pulso"); void esc.offsetWidth; esc.classList.add("rp-pulso"); });
  raiz.addEventListener("keydown", function (e) {
    if (e.key !== " " || !S.corriendo) return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "button") return;
    e.preventDefault(); pausar();
  });
  raiz.addEventListener("change", function (e) {
    var t = e.target;
    if (t.name === "rp-tec") pref.tec = t.value;
    else if (t.name === "rp-dur") pref.dur = t.value;
    else if (t.name === "rp-estilo") pref.estilo = t.value;
    else if (t.name === "rp-sonido") pref.sonido = t.value;
    else if (t.id === "rp-min") pref.min = Math.max(1, Math.min(60, +t.value || 1));
    else if (t.hasAttribute("data-rp-anunciar")) pref.anunciar = t.checked;
    else if (t.hasAttribute("data-rp-vol")) pref.vol = +t.value;
    else if (t.hasAttribute("data-rp-fase")) {
      var arr = tiempos(pref.tec), i = +t.getAttribute("data-rp-fase"), mn = +t.min, mx = +t.max;
      arr[i] = Math.max(mn, Math.min(mx, Math.round(+t.value || 0))); t.value = arr[i];
      pref.tiempos[pref.tec] = arr;
    } else return;
    guardarPref(); pintarConfig();
  });
  $("[data-rp-vol]").addEventListener("input", function (e) { pref.vol = +e.target.value; });
  $("[data-rp-restablecer]").addEventListener("click", function () { delete pref.tiempos[pref.tec]; guardarPref(); pintarConfig(); });
  document.addEventListener("visibilitychange", function () { if (!document.hidden && S.corriendo && bloqueo === null) mantenerPantalla(true); });

  pintarConfig();
  posMarcador(0);
})();
