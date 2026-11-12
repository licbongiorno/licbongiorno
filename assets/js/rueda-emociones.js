/* Laboratorio «La rueda de las emociones» — /laboratorio-rueda-de-las-emociones/
   Modelo organizador: Plutchik (ocho emociones, tres intensidades, díadas). Complemento: plano de Russell.
   No interpreta ni diagnostica. Nada se envía a ningún servidor ni se guarda en el navegador. */
(function () {
  "use strict";
  var LAB = window.LAB || {};
  var datosEl = document.getElementById("re-datos");
  if (!datosEl) return;
  var D = JSON.parse(datosEl.textContent);
  var POR = {}; D.emo.forEach(function (e, i) { e.i = i; POR[e.id] = e; });
  var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var el = function (t, c, x) { var n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; };
  var palabra = function (e, nivel) { return nivel === 1 ? e.leve : nivel === 3 ? e.intensa : e.nombre; };
  var NIVEL_N = { 1: "intensidad baja", 2: "intensidad media", 3: "intensidad alta" };

  var aviso = el("p", "visualmente-oculto"); aviso.setAttribute("role", "status"); document.body.appendChild(aviso);
  var anunciar = function (t) { aviso.textContent = ""; setTimeout(function () { aviso.textContent = t; }, 40); };

  /* ---------- Combinaciones (díadas de Plutchik) ---------- */
  function combinacion(a, b) {
    var i = POR[a].i, j = POR[b].i, d = Math.min((j - i + 8) % 8, (i - j + 8) % 8);
    var k1 = i + "," + j, k2 = j + "," + i;
    if (d === 1) return { tipo: "primaria", nombre: D.prim[k1] || D.prim[k2] };
    if (d === 2) return { tipo: "secundaria", nombre: D.sec[k1] || D.sec[k2] };
    if (d === 3) return { tipo: "terciaria", nombre: D.ter[k1] || D.ter[k2] };
    return { tipo: "opuestas" };
  }
  function pintarCombinacion(caja, a, b) {
    caja.innerHTML = "";
    if (!a || !b || a === b) return;
    var c = combinacion(a, b), A = POR[a].nombre, B = POR[b].nombre.toLowerCase();
    var t = el("div", "re-comb");
    if (c.tipo === "opuestas") {
      t.appendChild(el("p", "re-comb__titulo", A + " y " + B + ": emociones opuestas"));
      t.appendChild(el("p", null, "Plutchik las ubica en lados opuestos de la rueda y considera que no se combinan en una emoción nueva: cuando aparecen juntas, suelen vivirse como conflicto o ambivalencia. Sentir dos cosas opuestas a la vez es más frecuente de lo que parece."));
      t.appendChild(el("p", "re-comb__pregunta", "¿Qué lugar pueden tener en vos las dos al mismo tiempo?"));
    } else {
      t.appendChild(el("p", "re-comb__titulo", A + " y " + B + ": «" + c.nombre + "»"));
      t.appendChild(el("p", null, "En el modelo de Plutchik, esta combinación se llama «" + c.nombre.toLowerCase() + "» (díada " + c.tipo + "). Es una propuesta teórica, no una fórmula: solo vos podés decir si representa lo que estás viviendo."));
      var acc = el("div", "lab-acciones"), res = el("p", "lab-nota");
      [["Sí, se parece", "Si esa palabra te sirve, podés quedarte con ella."], ["No del todo", "Está bien: las combinaciones del modelo son propuestas, no explicaciones. Quizás otra palabra lo nombre mejor, o ninguna todavía."]].forEach(function (x) {
        var bt = el("button", "boton boton--secundario boton--chico", x[0]); bt.type = "button";
        bt.addEventListener("click", function () { res.textContent = x[1]; });
        acc.appendChild(bt);
      });
      t.appendChild(acc); t.appendChild(res);
    }
    caja.appendChild(t);
  }

  /* ---------- Rueda ---------- */
  var rueda = $("[data-re-rueda]");
  var sel = []; // [{id, nivel}]
  var detalle = $("[data-re-detalle]"), selTxt = $("[data-re-seleccion]"), combCaja = $("[data-re-comb]");
  function elegir(id, nivel) {
    var ya = sel.filter(function (s) { return s.id === id; })[0];
    if (ya && ya.nivel === nivel) sel = sel.filter(function (s) { return s.id !== id; });
    else if (ya) ya.nivel = nivel;
    else { sel.push({ id: id, nivel: nivel }); if (sel.length > 2) sel.shift(); }
    pintarSeleccion(true);
  }
  function pintarSeleccion(mover) {
    $$(".re-celda", rueda).forEach(function (c) {
      var s = sel.filter(function (x) { return x.id === c.getAttribute("data-re-emo"); })[0];
      var on = !!s && +c.getAttribute("data-re-nivel") === s.nivel;
      c.setAttribute("aria-pressed", String(on)); c.classList.toggle("es-sel", on);
    });
    $$(".re-sector", rueda).forEach(function (g) { g.classList.toggle("es-elegido", sel.some(function (s) { return s.id === g.getAttribute("data-re-emo"); })); });
    rueda.classList.toggle("con-seleccion", sel.length > 0);
    $$("[data-re-elegir]").forEach(function (b) { b.setAttribute("aria-pressed", String(sel.some(function (s) { return s.id === b.getAttribute("data-re-elegir"); }))); });
    selTxt.textContent = sel.length ? "Elegiste: " + sel.map(function (s) { var e = POR[s.id]; return e.nombre + " (" + (s.nivel === 2 ? "" : palabra(e, s.nivel).toLowerCase() + ", ") + NIVEL_N[s.nivel] + ")"; }).join(" y ") + "." : "Todavía no elegiste ninguna emoción.";
    pintarCombinacion(combCaja, sel[0] && sel[0].id, sel[1] && sel[1].id);
    pintarDetalle(mover);
    if (sel.length) anunciar(selTxt.textContent);
  }
  function cuerpoFicha(id) { var f = $('[data-re-ficha="' + id + '"] .mapa-detalle__cuerpo'); return f ? f.cloneNode(true) : el("div"); }
  function pintarDetalle(mover) {
    detalle.innerHTML = "";
    if (!sel.length) { detalle.hidden = true; return; }
    detalle.hidden = false;
    detalle.classList.toggle("re-detalle--doble", sel.length === 2);
    sel.forEach(function (s) {
      var e = POR[s.id], col = el("article", "re-detalle__col"); col.style.setProperty("--re-c", e.color);
      var h = el("h3", "re-detalle__titulo"); h.appendChild(el("span", "re-punto")); h.appendChild(document.createTextNode(e.nombre));
      col.appendChild(h);
      col.appendChild(el("p", "re-detalle__nivel", "Elegiste: " + palabra(e, s.nivel) + " · " + NIVEL_N[s.nivel]));
      var c = cuerpoFicha(s.id);
      $$(".re-escala span", c).forEach(function (sp, k) { sp.classList.toggle("es-actual", k + 1 === s.nivel); });
      if (sel.length === 2) $$(".re-ficha__bloque", c).forEach(function (b) { var t = (b.querySelector("h3") || {}).textContent || ""; if (/Matices|Para ir más hondo|Preguntas/.test(t)) b.remove(); });
      col.appendChild(c);
      var ver = el("a", "re-detalle__mas", "Ver la ficha completa de " + e.nombre.toLowerCase()); ver.href = "#ficha-" + e.id;
      ver.addEventListener("click", function () { var d = document.getElementById("ficha-" + e.id); if (d) d.open = true; });
      col.appendChild(ver);
      detalle.appendChild(col);
    });
    if (mover) setTimeout(function () { detalle.scrollIntoView({ behavior: quieto ? "auto" : "smooth", block: "nearest" }); }, 60);
  }
  $$(".re-celda", rueda).forEach(function (c) {
    var go = function () { elegir(c.getAttribute("data-re-emo"), +c.getAttribute("data-re-nivel")); };
    c.addEventListener("click", go);
    c.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); go(); } });
  });
  $$(".re-diada", rueda).forEach(function (t) {
    var go = function () { var p = t.getAttribute("data-re-diada").split(","); sel = [{ id: p[0], nivel: 2 }, { id: p[1], nivel: 2 }]; pintarSeleccion(true); };
    t.addEventListener("click", go);
    t.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); go(); } });
  });
  $$("[data-re-elegir]").forEach(function (b) {
    b.addEventListener("click", function () {
      var id = b.getAttribute("data-re-elegir");
      if (sel.some(function (s) { return s.id === id; })) sel = sel.filter(function (s) { return s.id !== id; });
      else { sel.push({ id: id, nivel: 2 }); if (sel.length > 2) sel.shift(); }
      pintarSeleccion(true);
    });
  });
  $("[data-re-limpiar]").addEventListener("click", function () { sel = []; pintarSeleccion(false); anunciar("Selección borrada."); });

  /* ---------- Plano de valencia y activación (Russell) ---------- */
  var PALABRAS = [["Alerta", -0.1, 0.92], ["Tensión", -0.3, 0.85], ["Miedo", -0.2, 0.78], ["Enojo", -0.45, 0.75], ["Fastidio", -0.55, 0.62], ["Angustia", -0.72, 0.52], ["Frustración", -0.65, 0.4],
    ["Entusiasmo", 0.65, 0.7], ["Asombro", 0.35, 0.88], ["Euforia", 0.55, 0.85], ["Alegría", 0.85, 0.42], ["Felicidad", 0.9, 0.2], ["Gusto", 0.88, 0.05],
    ["Satisfacción", 0.82, -0.45], ["Serenidad", 0.75, -0.62], ["Relajación", 0.65, -0.75], ["Calma", 0.55, -0.82], ["Somnolencia", 0.05, -0.92], ["Cansancio", -0.15, -0.88],
    ["Desgano", -0.35, -0.8], ["Aburrimiento", -0.6, -0.68], ["Abatimiento", -0.78, -0.5], ["Tristeza", -0.85, -0.28], ["Desdicha", -0.9, -0.08]];
  var plano = $("[data-re-plano]"), punto = $("[data-re-punto]"), desc = $("[data-re-plano-desc]"), cerca = $("[data-re-plano-cerca]"), gp = $("[data-re-palabras]");
  var P = null; // {v, a} en [-1, 1]
  var NS = "http://www.w3.org/2000/svg";
  var aXY = function (v, a) { return [200 + v * 175, 200 - a * 175]; };
  PALABRAS.forEach(function (w) {
    var xy = aXY(w[1], w[2]), t = document.createElementNS(NS, "text");
    t.setAttribute("x", xy[0].toFixed(1)); t.setAttribute("y", (xy[1] + 4).toFixed(1)); t.setAttribute("text-anchor", "middle"); t.setAttribute("class", "re-palabra");
    t.textContent = w[0]; gp.appendChild(t); w.push(t);
  });
  function nivelTexto(x, pos, neg) {
    var m = Math.abs(x);
    if (m < 0.15) return null;
    return (m > 0.65 ? "muy " : m < 0.35 ? "algo " : "") + (x > 0 ? pos : neg);
  }
  function pintarPlano() {
    if (!P) return;
    var xy = aXY(P.v, P.a);
    punto.setAttribute("cx", xy[0].toFixed(1)); punto.setAttribute("cy", xy[1].toFixed(1));
    plano.classList.add("con-punto");
    var v = nivelTexto(P.v, "agradable", "desagradable") || "ni agradable ni desagradable";
    var a = Math.abs(P.a) < 0.15 ? "activación media" : (Math.abs(P.a) > 0.65 ? "activación muy " : Math.abs(P.a) < 0.35 ? "activación algo " : "activación ") + (P.a > 0 ? "alta" : "baja");
    desc.textContent = "Se siente " + v + ", con " + a + ".";
    var orden = PALABRAS.slice().sort(function (x, y) { return Math.hypot(x[1] - P.v, x[2] - P.a) - Math.hypot(y[1] - P.v, y[2] - P.a); });
    var tres = orden.slice(0, 3);
    PALABRAS.forEach(function (w) { w[3].classList.toggle("es-cercana", tres.indexOf(w) >= 0); });
    cerca.textContent = tres.map(function (w) { return w[0]; }).join(" · ");
  }
  function moverA(ev) {
    var pt = plano.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
    var q = pt.matrixTransform(plano.getScreenCTM().inverse());
    P = { v: Math.max(-1, Math.min(1, (q.x - 200) / 175)), a: Math.max(-1, Math.min(1, (200 - q.y) / 175)) };
    pintarPlano();
  }
  var arrastrando = false;
  plano.addEventListener("pointerdown", function (ev) { arrastrando = true; try { plano.setPointerCapture(ev.pointerId); } catch (e) { /* sin captura */ } moverA(ev); });
  plano.addEventListener("pointermove", function (ev) { if (arrastrando) moverA(ev); });
  plano.addEventListener("pointerup", function () { if (arrastrando) { arrastrando = false; anunciar(desc.textContent + " Palabras cercanas: " + cerca.textContent + "."); } });
  plano.addEventListener("keydown", function (ev) {
    var d = { ArrowLeft: [-0.05, 0], ArrowRight: [0.05, 0], ArrowUp: [0, 0.05], ArrowDown: [0, -0.05] }[ev.key];
    if (!d) return;
    ev.preventDefault();
    P = P || { v: 0, a: 0 };
    P.v = Math.max(-1, Math.min(1, P.v + d[0])); P.a = Math.max(-1, Math.min(1, P.a + d[1]));
    pintarPlano(); anunciar(desc.textContent);
  });

  /* ---------- Recorrido guiado ---------- */
  var guia = $("[data-re-guia]"), pasos = $$(".re-paso", guia), paso = 0;
  var bAnt = $("[data-re-g-ant]"), bSig = $("[data-re-g-sig]"), avance = $("[data-re-guia-avance]");
  pasos.forEach(function () { avance.appendChild(el("span")); });
  var valor = function (n) { var r = $('input[name="' + n + '"]:checked', guia); return r ? r.value : ""; };
  var valores = function (n) { return $$('input[name="' + n + '"]:checked', guia).map(function (x) { return x.value; }); };
  var etiquetas = function (n) { return $$('input[name="' + n + '"]:checked', guia).map(function (x) { return x.parentNode.textContent.trim(); }); };
  function irPaso(k, inicial) {
    paso = Math.max(0, Math.min(pasos.length - 1, k));
    pasos.forEach(function (p, i) { p.hidden = i !== paso; });
    $$("span", avance).forEach(function (s, i) { s.className = i < paso ? "hecho" : i === paso ? "actual" : ""; });
    bAnt.disabled = paso === 0;
    bSig.hidden = paso === pasos.length - 1;
    if (paso === 1) pintarIntensidad();
    if (paso === 2) pintarCombinacion($("[data-re-g-comb]"), valor("re-g-emo1"), valor("re-g-emo2"));
    if (paso === pasos.length - 1) pintarMapa();
    if (inicial) return;
    var h = pasos[paso].querySelector("h3"); h.focus({ preventScroll: true });
    guia.scrollIntoView({ behavior: quieto ? "auto" : "smooth", block: "start" });
  }
  bAnt.addEventListener("click", function () { irPaso(paso - 1); });
  bSig.addEventListener("click", function () { irPaso(paso + 1); });
  $("[data-re-g-reiniciar]").addEventListener("click", function () {
    $$("input, textarea", guia).forEach(function (x) { if (x.type === "checkbox" || x.type === "radio") x.checked = false; else if (x.type === "range") x.value = 2; else x.value = ""; });
    $$(".re-zona", guia).forEach(function (z) { z.setAttribute("aria-pressed", "false"); });
    $("[data-re-g-matices]").innerHTML = ""; irPaso(0); anunciar("Recorrido reiniciado.");
  });
  guia.addEventListener("change", function (ev) {
    if (ev.target.name === "re-g-emo1") {
      var caja = $("[data-re-g-matices]"); caja.innerHTML = "";
      var e = POR[ev.target.value];
      if (!e) { caja.appendChild(el("p", "lab-nota", "Podés ubicarte en el plano de valencia y activación de la estación 2: a veces el cuerpo sabe algo antes que las palabras.")); return; }
      var fs = el("fieldset", "lab-paso mapa-campo"); fs.appendChild(el("legend", "lab-paso__titulo", "¿Alguna de estas palabras se acerca más? (opcional)"));
      var ops = el("div", "opciones");
      [e.leve, e.nombre, e.intensa].concat(e.matices).filter(function (w, i, arr) { return arr.indexOf(w) === i; }).forEach(function (w) {
        var l = el("label", "opcion"), i = el("input"); i.type = "checkbox"; i.name = "re-g-mat"; i.value = w; l.appendChild(i); l.appendChild(el("span", null, w)); ops.appendChild(l);
      });
      fs.appendChild(ops); caja.appendChild(fs);
    }
    if (ev.target.name === "re-g-emo2" || ev.target.name === "re-g-emo1") pintarCombinacion($("[data-re-g-comb]"), valor("re-g-emo1"), valor("re-g-emo2"));
    if (ev.target.id === "re-g-int" || ev.target.hasAttribute("data-re-g-int-nose")) pintarIntensidad();
  });
  $("#re-g-int").addEventListener("input", pintarIntensidad);
  function pintarIntensidad() {
    var e = POR[valor("re-g-emo1")], n = +$("#re-g-int").value, t = $("[data-re-g-int-t]");
    var nose = $("[data-re-g-int-nose]").checked;
    $("#re-g-int").disabled = nose;
    t.textContent = nose ? "Sin precisar." : e ? palabra(e, n) + " · " + NIVEL_N[n] : ["", "Baja", "Media", "Alta"][n];
  }
  $$(".re-zona", guia).forEach(function (z) {
    var go = function () { var on = z.getAttribute("aria-pressed") !== "true"; z.setAttribute("aria-pressed", String(on)); anunciar(z.getAttribute("aria-label") + (on ? " marcada" : " desmarcada")); };
    z.addEventListener("click", go);
    z.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); go(); } });
  });

  function resumen() {
    var e1 = POR[valor("re-g-emo1")], e2 = POR[valor("re-g-emo2")], n = +$("#re-g-int").value, nose = $("[data-re-g-int-nose]").checked;
    var r = { fecha: new Date().toLocaleDateString("es-AR"), emociones: [], color: e1 ? e1.color : "#A3B18A", palabras: valores("re-g-mat") };
    if (e1) r.emociones.push(e1.nombre + (nose ? "" : " (" + (n === 2 ? "" : palabra(e1, n).toLowerCase() + ", ") + NIVEL_N[n] + ")"));
    else if (valor("re-g-emo1") === "no-se") r.emociones.push("Todavía sin nombre");
    if (e2) r.emociones.push(e2.nombre);
    else if (valor("re-g-emo2") === "no-claro") r.emociones.push("Otra emoción, sin claridad todavía");
    if (e1 && e2 && e1 !== e2) { var c = combinacion(e1.id, e2.id); r.combinacion = c.tipo === "opuestas" ? "Emociones opuestas: pueden vivirse como ambivalencia" : "«" + c.nombre + "», según el modelo de Plutchik"; }
    if (P) r.plano = desc.textContent + " Palabras cercanas: " + cerca.textContent + ".";
    r.cuerpo = $$(".re-zona[aria-pressed=true]", guia).map(function (z) { return z.getAttribute("aria-label"); }).concat(etiquetas("re-g-cuerpo-extra"));
    r.sensacion = $("#re-g-sens").value.trim();
    r.contexto = $("#re-g-ctx").value.trim();
    r.valoracion = etiquetas("re-g-val");
    r.necesidades = etiquetas("re-g-nec").concat($("#re-g-nec-t").value.trim() ? [$("#re-g-nec-t").value.trim()] : []);
    r.hacer = etiquetas("re-g-hacer");
    r.reflexion = $("#re-g-refl").value.trim();
    r.pregunta = e1 ? e1.seguir : "¿Qué palabra, aunque sea aproximada, se acerca a lo que estás sintiendo?";
    return r;
  }
  function filas(r, completo) {
    var f = [];
    f.push(["Lo que siento", r.emociones.join(" · ") || "Sin elegir"]);
    if (r.combinacion) f.push(["Combinación", r.combinacion]);
    if (r.palabras.length) f.push(["Palabras que elegí", r.palabras.join(", ")]);
    if (r.plano) f.push(["Cómo se siente", r.plano]);
    if (r.cuerpo.length) f.push(["En el cuerpo", r.cuerpo.join(", ") + (r.sensacion && completo ? ". " + r.sensacion : "")]);
    if (completo && r.contexto) f.push(["Contexto", r.contexto]);
    if (completo && r.valoracion.length) f.push(["Lo que más me afecta", r.valoracion.join("; ")]);
    if (r.necesidades.length) f.push(["Lo que podría necesitar", r.necesidades.join(", ")]);
    if (r.hacer.length) f.push(["Lo que quiero hacer", r.hacer.join(", ")]);
    if (completo && r.reflexion) f.push(["Mi reflexión", r.reflexion]);
    f.push(["Para seguir explorando", r.pregunta]);
    return f;
  }
  function pintarMapa() {
    var r = resumen(), caja = $("[data-re-mapa]"); caja.innerHTML = "";
    var card = el("div", "re-tarjeta"); card.style.setProperty("--re-c", r.color);
    card.appendChild(el("p", "re-tarjeta__marca", "Mi mapa emocional · " + r.fecha));
    var dl = el("dl");
    filas(r, true).forEach(function (x) { dl.appendChild(el("dt", null, x[0])); dl.appendChild(el("dd", null, x[1])); });
    card.appendChild(dl);
    caja.appendChild(card);
  }
  var gEstado = $("[data-re-g-estado]");
  var incluir = function () { return $("[data-re-g-incluir]").checked; };
  function texto() {
    var r = resumen();
    return "MI MAPA EMOCIONAL · " + r.fecha + "\n\n" + filas(r, incluir()).map(function (x) { return x[0].toUpperCase() + "\n" + x[1]; }).join("\n\n") +
      "\n\nHecho en «La rueda de las emociones» (loquetehabita.com). No es un diagnóstico.\n";
  }
  $("[data-re-g-txt]").addEventListener("click", function () { LAB.guardarTexto && LAB.guardarTexto("mi-mapa-emocional.txt", texto()); gEstado.textContent = "Listo: se descargó en tu dispositivo."; });
  $("[data-re-g-compartir]").addEventListener("click", function () {
    var t = texto();
    if (navigator.share) navigator.share({ title: "Mi mapa emocional", text: t }).then(function () { gEstado.textContent = "Compartido."; }, function () { gEstado.textContent = "No se compartió."; });
    else if (LAB.copiar) { LAB.copiar(t); gEstado.textContent = "Tu navegador no permite compartir directamente: copiamos el texto para que lo pegues donde quieras."; }
  });
  $("[data-re-g-png]").addEventListener("click", function () {
    var r = resumen(), W = 1080, pad = 90, cv = document.createElement("canvas"), cx = cv.getContext("2d");
    var lineas = function (txt, max, font) { cx.font = font; var out = [], linea = ""; txt.split(/\s+/).forEach(function (w) { var p = linea ? linea + " " + w : w; if (cx.measureText(p).width > max && linea) { out.push(linea); linea = w; } else linea = p; }); if (linea) out.push(linea); return out; };
    var FT = "600 26px Montserrat, system-ui, sans-serif", FV = "400 36px Lora, Georgia, serif";
    var bloques = filas(r, incluir()).map(function (x) { return { t: x[0].toUpperCase(), l: lineas(x[1], W - pad * 2, FV) }; });
    var H = 300 + bloques.reduce(function (s, b) { return s + 46 + b.l.length * 50 + 30; }, 0) + 120;
    cv.width = W; cv.height = H; cx = cv.getContext("2d");
    cx.fillStyle = "#F6F1EB"; cx.fillRect(0, 0, W, H);
    cx.fillStyle = r.color; cx.fillRect(0, 0, W, 22);
    cx.beginPath(); cx.arc(W - 140, 170, 70, 0, Math.PI * 2); cx.fillStyle = r.color; cx.globalAlpha = 0.35; cx.fill(); cx.globalAlpha = 1;
    cx.fillStyle = "#4A5A3C"; cx.font = FT; cx.fillText("MI MAPA EMOCIONAL · " + r.fecha, pad, 120);
    cx.fillStyle = "#26241F"; cx.font = "400 64px 'Playfair Display', Georgia, serif"; cx.fillText(r.emociones[0] ? r.emociones[0].split(" (")[0] : "Mi mapa emocional", pad, 210);
    var y = 300;
    bloques.forEach(function (b) {
      cx.fillStyle = "#4A5A3C"; cx.font = FT; cx.fillText(b.t, pad, y); y += 46;
      cx.fillStyle = "#26241F"; cx.font = FV; b.l.forEach(function (l) { cx.fillText(l, pad, y); y += 50; }); y += 30;
    });
    cx.fillStyle = "#6B6862"; cx.font = "400 24px Montserrat, system-ui, sans-serif"; cx.fillText("La rueda de las emociones · loquetehabita.com · No es un diagnóstico", pad, H - 70);
    cv.toBlob(function (bl) { if (bl && LAB.guardarArchivo) { LAB.guardarArchivo("mi-mapa-emocional.png", bl); gEstado.textContent = "Listo: se descargó la tarjeta."; } else gEstado.textContent = "No se pudo generar la imagen en este navegador."; }, "image/png");
  });
  irPaso(0, true);
})();
