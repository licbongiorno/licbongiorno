/* Laboratorio «Mi mapa de vínculos» — /laboratorio-mi-mapa-de-vinculos/
   Dos capas sobre los mismos datos: el universo vincular actual (círculos de cercanía) y la historia familiar (genograma).
   El mapa dibuja lo que la persona marca: no calcula cercanía, reciprocidad ni patrones, no puntúa y no interpreta.
   Nada se envía a ningún servidor. El progreso se guarda en este navegador solo mientras la casilla lo permita. */
(function () {
  "use strict";
  var LAB = window.LAB || {};
  var editor = document.querySelector("[data-mv-editor]");
  if (!editor) return;

  var NS = "http://www.w3.org/2000/svg";
  var CLAVE = "mapa-vinculos-v1", CLAVE_OK = "mapa-vinculos-guardar";
  var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Vocabulario ---------- */
  var CATS = [["origen", "Familia de origen"], ["actual", "Familia actual"], ["pareja", "Pareja"], ["expareja", "Exparejas"],
    ["hijos", "Hijos e hijas"], ["amistades", "Amistades"], ["trabajo", "Trabajo o estudio"], ["comunidad", "Comunidad"],
    ["otros", "Otros vínculos significativos"]];
  var CAT_N = {}; CATS.forEach(function (c) { CAT_N[c[0]] = c[1]; });
  var GEN_N = { "-3": "Bisabuelos", "-2": "Abuelos", "-1": "Padres, madres, tíos y tías", "0": "Mi generación", "1": "Hijos, hijas, sobrinos", "2": "Nietos" };
  var ANILLO_N = { 1: "muy cerca", 2: "cerca", 3: "a cierta distancia", 4: "lejos" };
  var LINEA_N = { estrecho: "estrecho", distante: "distante", conflictivo: "conflictivo", ambivalente: "ambivalente", intermitente: "intermitente", cambio: "en transformación", cortado: "cortado" };
  var FREC_N = { diaria: "casi todos los días", semanal: "semanal", mensual: "mensual", esporadica: "esporádica", "sin-contacto": "sin contacto actual" };
  var NIVEL_N = { mucha: "mucha", alguna: "alguna", poca: "poca", "no-se": "no lo sé" };
  var DIST_N = { cerca: "viven cerca", ciudad: "en la misma ciudad", lejos: "lejos", pais: "en otro país", "no-aplica": "no aplica" };
  var IMP_N = { central: "central", importante: "importante", presente: "presente, sin ser central", "no-se": "no sé cómo definirlo" };
  var INTER = [["escucha", "Escucha"], ["cuidado", "Cuidado"], ["apoyo", "Apoyo emocional"], ["disponibilidad", "Disponibilidad"], ["tiempo", "Tiempo compartido"],
    ["reconocimiento", "Reconocimiento"], ["responsabilidades", "Responsabilidades"], ["confianza", "Confianza"], ["afecto", "Afecto"], ["practica", "Ayuda práctica"]];
  var INTER_N = { ambos: "circula en ambos sentidos", doy: "va más de mí hacia la otra persona", recibo: "va más de la otra persona hacia mí", varia: "varía según el momento", falta: "lo siento insuficiente", "no-se": "difícil de definir" };
  var LIM = [["desacuerdo", "Expresar desacuerdo"], ["no", "Decir que no"], ["necesidades", "Expresar lo que necesito"], ["espacios", "Conservar espacios propios"], ["responsabilidades", "Repartir responsabilidades de un modo justo"]];
  var LIM_N = { facil: "me resulta posible", depende: "depende del momento", cuesta: "me cuesta", "no-se": "no lo sé" };
  var ROLES = ["Quien escucha", "Quien cuida", "Quien organiza", "Quien media", "Quien resuelve", "Quien necesita apoyo", "Quien busca reconocimiento", "Quien evita conflictos", "Quien toma distancia"];
  var CONFLICTO_N = { hablo: "lo hablo en el momento", espero: "espero y lo hablo después", evito: "evito el tema", discuto: "discuto con intensidad", silencio: "hago silencio", retiro: "me retiro o tomo distancia", cedo: "cedo para que termine", acuerdo: "busco un acuerdo", reparo: "intento reparar después", depende: "depende mucho del vínculo" };

  /* ---------- Estado ---------- */
  function nuevoEstado() {
    return { v: 1, sig: 1, cats: [], parejas: [], obs: [], roles: {}, resp: {}, chips: {}, familiaNo: false,
      personas: [{ id: "yo", yo: true, nombre: "Yo", capaFamilia: true, capaActual: false, gen: 0, simbolo: "", padres: ["", ""], inter: {}, lim: {} }] };
  }
  var S = nuevoEstado(), sel = null, editando = null, nuevos = {};

  var persona = function (id) { for (var i = 0; i < S.personas.length; i++) if (S.personas[i].id === id) return S.personas[i]; return null; };
  var actuales = function () { return S.personas.filter(function (p) { return !p.yo && p.capaActual; }); };
  var familia = function () { return S.personas.filter(function (p) { return p.capaFamilia; }); };
  var conAlgo = function () { return S.personas.filter(function (p) { return !p.yo; }); };
  var nombreCat = function (k) { return CAT_N[k] || (k && k.indexOf("c:") === 0 ? k.slice(2) : k || "Sin categoría"); };
  var colorCat = function (k) {
    for (var i = 0; i < CATS.length; i++) if (CATS[i][0] === k) return i + 1;
    return 10 + Math.max(0, S.cats.indexOf(k)) % 3;
  };
  var corto = function (t, n) { t = t || ""; return t.length > n ? t.slice(0, n - 1) + "…" : t; };

  /* ---------- Avisos para lectores de pantalla ---------- */
  var aviso = document.createElement("p");
  aviso.className = "visualmente-oculto"; aviso.setAttribute("role", "status");
  document.body.appendChild(aviso);
  var anunciar = function (t) { aviso.textContent = ""; setTimeout(function () { aviso.textContent = t; }, 30); };

  /* ---------- Guardado local ---------- */
  var recordar = $("[data-mv-recordar]"), memEstado = $("[data-mv-memoria-estado]");
  var ls = {
    leer: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    poner: function (k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    sacar: function (k) { try { localStorage.removeItem(k); } catch (e) { /* sin almacenamiento */ } }
  };
  var tGuardar = null;
  function guardar() {
    clearTimeout(tGuardar);
    tGuardar = setTimeout(function () {
      if (!recordar || !recordar.checked) return;
      if (!ls.poner(CLAVE, JSON.stringify(S)) && memEstado) memEstado.textContent = "Este navegador no permite guardar datos: tu mapa se va a perder al cerrar la página.";
    }, 250);
  }
  function cargar() {
    if (ls.leer(CLAVE_OK) === "0") { if (recordar) recordar.checked = false; return; }
    var d = null;
    try { d = JSON.parse(ls.leer(CLAVE) || "null"); } catch (e) { d = null; }
    if (!d || !d.personas) return;
    var base = nuevoEstado();
    for (var k in base) if (!(k in d)) d[k] = base[k];
    if (!d.personas.some(function (p) { return p.yo; })) d.personas.unshift(base.personas[0]);
    d.personas.forEach(function (p) { p.inter = p.inter || {}; p.lim = p.lim || {}; p.padres = p.padres || ["", ""]; });
    S = d;
    if (memEstado) memEstado.textContent = "Recuperamos el mapa que guardaste en este navegador.";
  }
  if (recordar) recordar.addEventListener("change", function () {
    if (recordar.checked) { ls.poner(CLAVE_OK, "1"); guardar(); if (memEstado) memEstado.textContent = "Tu progreso se guarda solo en este navegador."; }
    else { ls.poner(CLAVE_OK, "0"); ls.sacar(CLAVE); if (memEstado) memEstado.textContent = "Se borró lo guardado. Lo que ves sigue en la página hasta que la cierres."; }
  });

  /* ---------- Respuestas abiertas y casillas ---------- */
  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t.hasAttribute && t.hasAttribute("data-mv-resp")) { S.resp[t.id] = t.value; guardar(); }
  });
  document.addEventListener("change", function (e) {
    var fs = e.target.closest && e.target.closest("[data-mv-chips]");
    if (!fs) return;
    var n = fs.getAttribute("data-mv-chips");
    S.chips[n] = $$('input[type="checkbox"]:checked', fs).map(function (x) { return x.value; });
    guardar();
  });
  function volcarRespuestas() {
    $$("[data-mv-resp]").forEach(function (t) { t.value = S.resp[t.id] || ""; });
    $$("[data-mv-chips]").forEach(function (fs) {
      var v = S.chips[fs.getAttribute("data-mv-chips")] || [];
      $$('input[type="checkbox"]', fs).forEach(function (x) { x.checked = v.indexOf(x.value) >= 0; });
    });
    var fn = $("[data-mv-familia-no]"); if (fn) fn.checked = !!S.familiaNo;
  }

  /* ---------- Estación 1: editor de vínculos ---------- */
  var f = {
    nombre: $("#mv-nombre"), cat: $("#mv-cat"), catOtra: $("#mv-cat-otra"), catOtraCaja: $("[data-mv-cat-otra]"), estado: $("#mv-estado"),
    inicio: $("#mv-inicio"), importancia: $("#mv-importancia"), actual: $("#mv-capa-actual"), familia: $("#mv-capa-familia"),
    fallecio: $("#mv-fallecio"), nota: $("#mv-nota"), titulo: $("[data-mv-editor-titulo]"), aviso: $("[data-mv-editor-estado]"),
    guardar: $("[data-mv-guardar]"), cancelar: $("[data-mv-cancelar]"), quitar: $("[data-mv-quitar]")
  };
  function opcionesCat() {
    var v = f.cat.value;
    f.cat.innerHTML = "";
    CATS.concat(S.cats.map(function (k) { return [k, nombreCat(k)]; })).concat([["nueva", "Otra categoría (escribila)…"]]).forEach(function (c) {
      var o = document.createElement("option"); o.value = c[0]; o.textContent = c[1]; f.cat.appendChild(o);
    });
    f.cat.value = v && $$("option", f.cat).some(function (o) { return o.value === v; }) ? v : "origen";
  }
  f.cat.addEventListener("change", function () { f.catOtraCaja.hidden = f.cat.value !== "nueva"; if (!f.catOtraCaja.hidden) f.catOtra.focus(); });

  function limpiarEditor() {
    editando = null; editor.reset(); opcionesCat();
    f.catOtraCaja.hidden = true; f.actual.checked = true;
    f.titulo.textContent = "Agregar un vínculo"; f.guardar.textContent = "Agregar al mapa";
    f.cancelar.hidden = true; f.quitar.hidden = true;
  }
  function cargarEditor(id) {
    var p = persona(id); if (!p || p.yo) return;
    editando = id; opcionesCat();
    f.nombre.value = p.nombre; f.cat.value = p.cat; f.catOtraCaja.hidden = true;
    f.estado.value = p.estado || "actual"; f.inicio.value = p.inicio || ""; f.importancia.value = p.importancia || "";
    f.actual.checked = !!p.capaActual; f.familia.checked = !!p.capaFamilia; f.fallecio.checked = !!p.fallecio; f.nota.value = p.nota || "";
    f.titulo.textContent = "Editar: " + p.nombre; f.guardar.textContent = "Guardar cambios";
    f.cancelar.hidden = false; f.quitar.hidden = false; f.aviso.textContent = "";
    editor.scrollIntoView({ behavior: quieto ? "auto" : "smooth", block: "start" });
    f.nombre.focus({ preventScroll: true });
  }
  function genPorCat(c) { return c === "hijos" ? 1 : c === "origen" ? -1 : 0; }
  editor.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombre = f.nombre.value.trim();
    if (!nombre) { f.aviso.textContent = "Escribí un nombre, una inicial, un apodo o un rol."; f.nombre.focus(); return; }
    var cat = f.cat.value;
    if (cat === "nueva") {
      var et = f.catOtra.value.trim();
      if (!et) { f.aviso.textContent = "Escribí el nombre de la nueva categoría."; f.catOtra.focus(); return; }
      cat = "c:" + et;
      if (S.cats.indexOf(cat) < 0) S.cats.push(cat);
    }
    if (!f.actual.checked && !f.familia.checked) { f.aviso.textContent = "Elegí al menos una capa: universo actual o historia familiar."; f.actual.focus(); return; }
    var p = editando ? persona(editando) : null;
    if (!p) {
      p = { id: "p" + (S.sig++), anillo: 0, angulo: null, gen: genPorCat(cat), simbolo: "", padres: ["", ""], inter: {}, lim: {} };
      S.personas.push(p); nuevos[p.id] = 1;
    }
    p.nombre = nombre; p.cat = cat; p.estado = f.estado.value; p.inicio = f.inicio.value.trim(); p.importancia = f.importancia.value;
    p.capaActual = f.actual.checked; p.capaFamilia = f.familia.checked; p.fallecio = f.fallecio.checked; p.nota = f.nota.value.trim();
    var msj = editando ? "Guardaste los cambios de " + nombre + "." : "Agregaste a " + nombre + "." + (p.capaActual ? " Podés ubicarlo en la estación 2." : " Aparece en el genograma de la estación 5.");
    limpiarEditor(); f.aviso.textContent = msj; anunciar(msj);
    sel = p.id; guardar(); renderTodo(); f.nombre.focus();
  });
  f.cancelar.addEventListener("click", function () { limpiarEditor(); f.aviso.textContent = ""; });
  f.quitar.addEventListener("click", function () {
    var p = persona(editando); if (!p) return;
    if (!window.confirm("¿Quitar a " + p.nombre + " de todo el mapa?")) return;
    quitarPersona(p.id); limpiarEditor(); f.aviso.textContent = "Quitaste a " + p.nombre + "."; anunciar(f.aviso.textContent);
  });
  function quitarPersona(id) {
    S.personas = S.personas.filter(function (x) { return x.id !== id; });
    S.parejas = S.parejas.filter(function (r) { return r.a !== id && r.b !== id; });
    S.obs.forEach(function (o) { o.personas = (o.personas || []).filter(function (x) { return x !== id; }); });
    S.personas.forEach(function (x) { x.padres = (x.padres || ["", ""]).map(function (q) { return q === id ? "" : q; }); });
    if (sel === id) sel = null;
    cerrarFicha(); guardar(); renderTodo();
  }

  var lista = $("[data-mv-lista]");
  function renderLista() {
    lista.innerHTML = "";
    var ps = conAlgo();
    if (!ps.length) { var v = document.createElement("p"); v.className = "lab-nota"; v.textContent = "Todavía no agregaste vínculos."; lista.appendChild(v); return; }
    var grupos = {};
    ps.forEach(function (p) { (grupos[p.cat] = grupos[p.cat] || []).push(p); });
    Object.keys(grupos).forEach(function (k) {
      var g = document.createElement("div"); g.className = "mv-lista__grupo";
      var t = document.createElement("p"); t.className = "lab-tarjeta__titulo"; t.textContent = nombreCat(k); g.appendChild(t);
      var ul = document.createElement("ul");
      grupos[k].forEach(function (p) {
        var li = document.createElement("li"), b = document.createElement("button");
        b.type = "button"; b.className = "mv-chip mv-cat-" + colorCat(p.cat);
        b.textContent = p.nombre;
        var etiquetas = [];
        if (p.capaActual) etiquetas.push("actual"); if (p.capaFamilia) etiquetas.push("historia familiar");
        if (p.estado === "pasado") etiquetas.push("pasado"); if (p.fallecio) etiquetas.push("falleció");
        var s = document.createElement("small"); s.textContent = " · " + etiquetas.join(" · "); b.appendChild(s);
        b.setAttribute("aria-label", "Editar " + p.nombre + " (" + etiquetas.join(", ") + ")");
        b.addEventListener("click", function () { cargarEditor(p.id); });
        li.appendChild(b); ul.appendChild(li);
      });
      g.appendChild(ul); lista.appendChild(g);
    });
  }

  /* ---------- Selectores de persona y paneles (estaciones 2 a 5) ---------- */
  var PARA = { cercania: actuales, reciprocidad: actuales, limites: actuales, historia: familia };
  function renderSelectores() {
    $$("[data-mv-selector]").forEach(function (caja) {
      var est = caja.getAttribute("data-mv-selector"), ps = PARA[est](), vacio = caja.parentNode.querySelector("[data-mv-sin-personas]");
      caja.innerHTML = "";
      if (vacio) vacio.hidden = est === "historia" || ps.length > 0;
      ps.forEach(function (p) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "mv-chip mv-cat-" + (p.yo ? 0 : colorCat(p.cat));
        b.setAttribute("data-id", p.id); b.setAttribute("aria-pressed", String(p.id === sel));
        b.textContent = p.yo ? "Yo" : p.nombre;
        if (est === "cercania" && !p.anillo) { var s = document.createElement("small"); s.textContent = " · sin ubicar"; b.appendChild(s); }
        b.addEventListener("click", function () { seleccionar(p.id); });
        caja.appendChild(b);
      });
    });
  }
  function seleccionar(id) {
    sel = id;
    $$("[data-mv-selector] button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-id") === id)); });
    renderPaneles(); marcarSeleccion();
  }
  function opcionesPadres(selectEl, p) {
    selectEl.innerHTML = "";
    var o = document.createElement("option"); o.value = ""; o.textContent = "— sin indicar —"; selectEl.appendChild(o);
    familia().forEach(function (q) {
      if (q.id === p.id) return;
      var x = document.createElement("option"); x.value = q.id; x.textContent = (q.yo ? "Yo" : q.nombre) + " (" + (GEN_N[String(q.gen || 0)] || "") + ")"; selectEl.appendChild(x);
    });
  }
  function renderPaneles() {
    $$("[data-mv-panel]").forEach(function (panel) {
      var est = panel.getAttribute("data-mv-panel"), p = persona(sel);
      var ok = p && PARA[est]().indexOf(p) >= 0;
      panel.hidden = !ok;
      if (!ok) return;
      $$("[data-mv-nombre-sel]", panel).forEach(function (n) { n.textContent = p.yo ? "Vos" : p.nombre + " · " + nombreCat(p.cat); });
      $$("[data-mv-campo]", panel).forEach(function (c) {
        var k = c.getAttribute("data-mv-campo");
        if (c.type === "checkbox") c.checked = !!p[k];
        else c.value = p[k] == null ? "" : String(p[k]);
        if (k === "gen") c.disabled = !!p.yo;
      });
      $$('input[name="mv-anillo"]', panel).forEach(function (r) { r.checked = String(p.anillo || 0) === r.value; });
      $$("[data-mv-inter]", panel).forEach(function (c) { c.value = p.inter[c.getAttribute("data-mv-inter")] || ""; });
      $$("[data-mv-lim]", panel).forEach(function (c) { c.value = p.lim[c.getAttribute("data-mv-lim")] || ""; });
      $$("[data-mv-padre]", panel).forEach(function (c) { opcionesPadres(c, p); c.value = p.padres[+c.getAttribute("data-mv-padre")] || ""; });
    });
  }
  function enPanel(t) { return t.closest && t.closest("[data-mv-panel]"); }
  document.addEventListener("change", function (e) {
    var t = e.target, p = persona(sel);
    if (!p || !enPanel(t)) return;
    if (t.name === "mv-anillo") {
      p.anillo = +t.value; if (!p.anillo) p.angulo = null;
      anunciar(p.nombre + (p.anillo ? " quedó en el círculo «" + ANILLO_N[p.anillo] + "»." : " quedó sin ubicar."));
      renderSelectores();
    } else if (t.hasAttribute("data-mv-campo")) {
      var k = t.getAttribute("data-mv-campo");
      p[k] = t.type === "checkbox" ? t.checked : k === "gen" ? +t.value : t.value;
      if (k === "gen") renderPaneles();
    } else if (t.hasAttribute("data-mv-inter")) p.inter[t.getAttribute("data-mv-inter")] = t.value;
    else if (t.hasAttribute("data-mv-lim")) p.lim[t.getAttribute("data-mv-lim")] = t.value;
    else if (t.hasAttribute("data-mv-padre")) p.padres[+t.getAttribute("data-mv-padre")] = t.value;
    else return;
    guardar(); dibujarMapas(); refrescarFicha();
  });
  document.addEventListener("input", function (e) {
    var t = e.target, p = persona(sel);
    if (!p || !enPanel(t) || t.tagName !== "TEXTAREA" || !t.hasAttribute("data-mv-campo")) return;
    p[t.getAttribute("data-mv-campo")] = t.value; guardar();
  });

  /* ---------- Estación 5: historia familiar ---------- */
  var famNo = $("[data-mv-familia-no]"), famCuerpo = $("[data-mv-familia-cuerpo]"), famEstado = $("[data-mv-fam-estado]");
  if (famNo) famNo.addEventListener("change", function () { S.familiaNo = famNo.checked; famCuerpo.hidden = S.familiaNo; guardar(); dibujarMapas(); });
  var famForm = $("[data-mv-fam-agregar]");
  famForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var n = $("#mv-fam-nombre"), nombre = n.value.trim();
    if (!nombre) { famEstado.textContent = "Escribí un nombre o cómo nombrás a esa persona."; n.focus(); return; }
    var g = +$("#mv-fam-gen").value, act = $("#mv-fam-actual").checked;
    var p = { id: "p" + (S.sig++), nombre: nombre, cat: g >= 1 ? "actual" : "origen", estado: "actual", capaFamilia: true, capaActual: act,
      anillo: 0, angulo: null, gen: g, simbolo: "", padres: ["", ""], inter: {}, lim: {} };
    S.personas.push(p); nuevos[p.id] = 1; sel = p.id;
    famForm.reset(); $("#mv-fam-gen").value = String(g);
    famEstado.textContent = "Agregaste a " + nombre + " a tu historia familiar."; anunciar(famEstado.textContent);
    guardar(); renderTodo(); n.focus();
  });
  var parejaForm = $("[data-mv-pareja]"), parejasLista = $("[data-mv-parejas-lista]");
  function renderParejas() {
    $$("[data-mv-fam-sel]").forEach(function (s) {
      var v = s.value; s.innerHTML = "";
      familia().forEach(function (q) { var o = document.createElement("option"); o.value = q.id; o.textContent = q.yo ? "Yo" : q.nombre; s.appendChild(o); });
      if (v) s.value = v;
    });
    parejasLista.innerHTML = "";
    S.parejas.forEach(function (r, i) {
      var a = persona(r.a), b = persona(r.b); if (!a || !b) return;
      var li = document.createElement("li"); li.className = "lab-orden__item";
      var t = document.createElement("span"); t.className = "lab-orden__nombre";
      t.textContent = (a.yo ? "Yo" : a.nombre) + " y " + (b.yo ? "yo" : b.nombre) + ": " + (r.t === "separacion" ? "separación" : "pareja o unión");
      var x = document.createElement("button"); x.type = "button"; x.className = "lab-orden__btn";
      x.innerHTML = '<span aria-hidden="true">×</span><span class="visualmente-oculto"></span>';
      x.lastChild.textContent = "Quitar " + t.textContent;
      x.addEventListener("click", function () { S.parejas.splice(i, 1); guardar(); renderParejas(); dibujarMapas(); anunciar("Relación quitada."); });
      li.appendChild(t); var bs = document.createElement("span"); bs.className = "lab-orden__botones"; bs.appendChild(x); li.appendChild(bs);
      parejasLista.appendChild(li);
    });
  }
  parejaForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var a = $("#mv-pa-a").value, b = $("#mv-pa-b").value, t = $("#mv-pa-tipo").value;
    if (!a || !b || a === b) { famEstado.textContent = "Elegí dos personas distintas."; anunciar(famEstado.textContent); return; }
    var ya = S.parejas.filter(function (r) { return (r.a === a && r.b === b) || (r.a === b && r.b === a); })[0];
    if (ya) ya.t = t; else S.parejas.push({ a: a, b: b, t: t });
    famEstado.textContent = "Relación marcada."; anunciar(famEstado.textContent);
    guardar(); renderParejas(); dibujarMapas();
  });

  /* ---------- Estación 6: roles por ámbito ---------- */
  var rolesCaja = $("[data-mv-roles]"), rolesVacio = $("[data-mv-roles-vacio]");
  function ambitos() {
    var ks = [];
    conAlgo().forEach(function (p) { if (ks.indexOf(p.cat) < 0) ks.push(p.cat); });
    var orden = CATS.map(function (c) { return c[0]; }).concat(S.cats);
    return ks.sort(function (a, b) { return orden.indexOf(a) - orden.indexOf(b); });
  }
  function renderRoles() {
    $$(".mv-rol-grupo", rolesCaja).forEach(function (x) { x.remove(); });
    var ks = ambitos();
    rolesVacio.hidden = ks.length > 0;
    ks.forEach(function (k, i) {
      var fs = document.createElement("fieldset"); fs.className = "lab-paso mapa-campo mv-rol-grupo";
      var lg = document.createElement("legend"); lg.className = "lab-paso__titulo"; lg.textContent = "En " + nombreCat(k); fs.appendChild(lg);
      var ops = document.createElement("div"); ops.className = "opciones";
      var mios = S.roles[k] || [];
      ROLES.concat(mios.filter(function (r) { return ROLES.indexOf(r) < 0; })).forEach(function (r) {
        var l = document.createElement("label"); l.className = "opcion";
        var inp = document.createElement("input"); inp.type = "checkbox"; inp.value = r; inp.checked = mios.indexOf(r) >= 0;
        inp.addEventListener("change", function () {
          var arr = S.roles[k] = (S.roles[k] || []).filter(function (x) { return x !== r; });
          if (inp.checked) arr.push(r);
          guardar(); dibujarMapas();
        });
        var sp = document.createElement("span"); sp.textContent = r;
        l.appendChild(inp); l.appendChild(sp); ops.appendChild(l);
      });
      fs.appendChild(ops);
      var fila = document.createElement("div"); fila.className = "mv-rol-propio";
      var id = "mv-rol-" + i, lab = document.createElement("label"); lab.setAttribute("for", id); lab.className = "visualmente-oculto"; lab.textContent = "Otro lugar que ocupás en " + nombreCat(k);
      var tx = document.createElement("input"); tx.className = "lab-campo"; tx.id = id; tx.type = "text"; tx.maxLength = 40; tx.placeholder = "Otro lugar, con tus palabras"; tx.autocomplete = "off";
      var bt = document.createElement("button"); bt.type = "button"; bt.className = "boton boton--secundario boton--chico"; bt.textContent = "Agregar";
      var agregar = function () {
        var v = tx.value.trim(); if (!v) { tx.focus(); return; }
        S.roles[k] = (S.roles[k] || []).filter(function (x) { return x !== v; }).concat([v]);
        guardar(); renderRoles(); dibujarMapas(); anunciar("Agregaste «" + v + "» en " + nombreCat(k) + ".");
        var n = document.getElementById(id); if (n) n.focus();
      };
      bt.addEventListener("click", agregar);
      tx.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); agregar(); } });
      fila.appendChild(lab); fila.appendChild(tx); fila.appendChild(bt); fs.appendChild(fila);
      rolesCaja.appendChild(fs);
    });
  }

  /* ---------- Estación 8: observaciones propias ---------- */
  var obsForm = $("[data-mv-obs]"), obsPersonas = $("[data-mv-obs-personas]"), obsLista = $("[data-mv-obs-lista]"), obsEstado = $("[data-mv-obs-estado]");
  function renderObs() {
    obsPersonas.innerHTML = "";
    conAlgo().forEach(function (p) {
      var l = document.createElement("label"); l.className = "opcion";
      var i = document.createElement("input"); i.type = "checkbox"; i.value = p.id;
      var s = document.createElement("span"); s.textContent = p.nombre;
      l.appendChild(i); l.appendChild(s); obsPersonas.appendChild(l);
    });
    obsLista.innerHTML = "";
    S.obs.forEach(function (o, k) {
      var li = document.createElement("li"); li.className = "mv-obs mv-obs--" + o.tipo;
      var tipo = document.createElement("span"); tipo.className = "mv-obs__tipo"; tipo.textContent = o.tipo === "hipotesis" ? "Hipótesis personal" : "Repetición que observo";
      var tx = document.createElement("p"); tx.textContent = o.texto;
      li.appendChild(tipo); li.appendChild(tx);
      var ns = (o.personas || []).map(function (id) { var p = persona(id); return p ? p.nombre : null; }).filter(Boolean);
      if (ns.length) { var en = document.createElement("p"); en.className = "lab-nota"; en.textContent = "En: " + ns.join(", "); li.appendChild(en); }
      var x = document.createElement("button"); x.type = "button"; x.className = "boton boton--secundario boton--chico"; x.textContent = "Quitar";
      x.addEventListener("click", function () { S.obs.splice(k, 1); guardar(); renderObs(); anunciar("Registro quitado."); });
      li.appendChild(x); obsLista.appendChild(li);
    });
  }
  obsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var t = $("#mv-obs-texto"), v = t.value.trim();
    if (!v) { obsEstado.textContent = "Escribí lo que observás."; anunciar(obsEstado.textContent); t.focus(); return; }
    var tipo = ($('input[name="mv-obs-tipo"]:checked') || {}).value || "observo";
    S.obs.push({ texto: v, tipo: tipo, personas: $$("input:checked", obsPersonas).map(function (i) { return i.value; }) });
    t.value = ""; $$("input", obsPersonas).forEach(function (i) { i.checked = false; });
    obsEstado.textContent = "Registrado."; anunciar("Registrado como " + (tipo === "hipotesis" ? "hipótesis personal." : "repetición que observás."));
    guardar(); renderObs(); refrescarFicha();
  });

  /* ---------- Dibujo SVG ---------- */
  function s(tag, at, txt) {
    var e = document.createElementNS(NS, tag);
    for (var k in at) if (at[k] != null) e.setAttribute(k, at[k]);
    if (txt != null) e.textContent = txt;
    return e;
  }
  var C = 320, R = { 1: 88, 2: 148, 3: 208, 4: 264 }, cuenta = 0;

  function trazo(c, x, y) {
    var dx = x - C, dy = y - C, L = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / L, uy = dy / L, px = -uy, py = ux;
    var sx = C + ux * 40, sy = C + uy * 40, ex = x - ux * 22, ey = y - uy * 22, len = L - 62;
    var p = function (a, b) { return a.toFixed(1) + " " + b.toFixed(1); };
    if (len < 6) return { d: "M" + p(sx, sy) + " L" + p(ex, ey), deco: "" };
    if (c === "conflictivo") {
      var n = Math.max(4, Math.round(len / 11)), d = "M" + p(sx, sy);
      for (var i = 1; i < n; i++) { var t = i / n, o = (i % 2 ? 5 : -5); d += " L" + p(sx + ux * len * t + px * o, sy + uy * len * t + py * o); }
      return { d: d + " L" + p(ex, ey), deco: "" };
    }
    if (c === "cortado") {
      var m1 = len / 2 - 6, m2 = len / 2 + 6;
      var a = [sx + ux * m1, sy + uy * m1], b = [sx + ux * m2, sy + uy * m2];
      return { d: "M" + p(sx, sy) + " L" + p(a[0], a[1]) + " M" + p(b[0], b[1]) + " L" + p(ex, ey),
        deco: "M" + p(a[0] + px * 7, a[1] + py * 7) + " L" + p(a[0] - px * 7, a[1] - py * 7) + " M" + p(b[0] + px * 7, b[1] + py * 7) + " L" + p(b[0] - px * 7, b[1] - py * 7) };
    }
    if (c === "ambivalente") {
      return { d: "M" + p(sx + px * 2.5, sy + py * 2.5) + " L" + p(ex + px * 2.5, ey + py * 2.5), deco: "M" + p(sx - px * 2.5, sy - py * 2.5) + " L" + p(ex - px * 2.5, ey - py * 2.5) };
    }
    return { d: "M" + p(sx, sy) + " L" + p(ex, ey), deco: "" };
  }
  function arco(r, a0, a1) {
    var r0 = a0 * Math.PI / 180, r1 = a1 * Math.PI / 180;
    return "M" + (r * Math.cos(r0)).toFixed(1) + " " + (r * Math.sin(r0)).toFixed(1) + " A" + r + " " + r + " 0 0 1 " + (r * Math.cos(r1)).toFixed(1) + " " + (r * Math.sin(r1)).toFixed(1);
  }

  /* Mapa del universo vincular actual. mover: si se puede arrastrar. */
  function MapaActual(svg, opc) {
    var yo = this, n = ++cuenta, idFl = "mv-flecha-" + n;
    yo.svg = svg; yo.ver = opc.ver || {}; yo.nodos = {}; yo.pos = {}; yo.anim = null;
    svg.setAttribute("viewBox", "-90 -10 820 660");
    var defs = s("defs");
    var mk = s("marker", { id: idFl, viewBox: "0 0 10 10", refX: "8", refY: "5", markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" });
    mk.appendChild(s("path", { d: "M0 0 L10 5 L0 10 z", "class": "mv-flecha" }));
    defs.appendChild(mk); svg.appendChild(defs);
    [4, 3, 2, 1].forEach(function (k) {
      svg.appendChild(s("circle", { cx: C, cy: C, r: R[k], "class": "mv-anillo mv-anillo--" + k }));
      svg.appendChild(s("text", { x: C, y: C - R[k] + 15, "text-anchor": "middle", "class": "mv-anillo__txt" }, ANILLO_N[k]));
    });
    yo.gSect = s("g", { "class": "mv-sectores" }); yo.gLin = s("g"); yo.gNod = s("g");
    svg.appendChild(yo.gSect); svg.appendChild(yo.gLin);
    svg.appendChild(s("circle", { cx: C, cy: C, r: 36, "class": "mv-yo" }));
    svg.appendChild(s("text", { x: C, y: C + 6, "text-anchor": "middle", "class": "mv-yo__txt" }, "yo"));
    svg.appendChild(yo.gNod);
    yo.vacio = s("text", { x: C, y: C + 70, "text-anchor": "middle", "class": "mv-vacio" }, "Ubicá tus vínculos en la estación 2");
    svg.appendChild(yo.vacio);
    yo.idFl = idFl; yo.opc = opc;
  }
  MapaActual.prototype.objetivos = function () {
    var ps = actuales().filter(function (p) { return p.anillo > 0; }), cats = [];
    var orden = CATS.map(function (c) { return c[0]; }).concat(S.cats);
    ps.forEach(function (p) { if (cats.indexOf(p.cat) < 0) cats.push(p.cat); });
    cats.sort(function (a, b) { return orden.indexOf(a) - orden.indexOf(b); });
    var ancho = 2 * Math.PI / Math.max(1, cats.length), obj = {}, sect = [];
    cats.forEach(function (k, i) {
      var centro = -Math.PI / 2 + i * ancho, del = ps.filter(function (p) { return p.cat === k; });
      sect.push({ k: k, a: centro });
      del.forEach(function (p, j) {
        var a = p.angulo != null ? p.angulo : centro - ancho / 2 + (j + 1) * ancho / (del.length + 1);
        obj[p.id] = [C + R[p.anillo] * Math.cos(a), C + R[p.anillo] * Math.sin(a)];
      });
    });
    return { obj: obj, sect: sect, ps: ps };
  };
  MapaActual.prototype.actualizar = function (animar) {
    var yo = this, o = yo.objetivos();
    yo.vacio.style.display = o.ps.length ? "none" : "";
    // Ámbitos (y roles, si se muestran)
    yo.gSect.innerHTML = "";
    o.sect.forEach(function (x) {
      var cx = Math.cos(x.a), sy = Math.sin(x.a), tx = C + 302 * cx, ty = C + 302 * sy + (sy > 0.3 ? 14 : sy < -0.3 ? -4 : 5);
      var anc = cx > 0.3 ? "start" : cx < -0.3 ? "end" : "middle";
      var t = s("text", { x: tx.toFixed(1), y: ty.toFixed(1), "text-anchor": anc, "class": "mv-sector" }, corto(nombreCat(x.k), 26));
      yo.gSect.appendChild(t);
      var rs = S.roles[x.k] || [];
      if (yo.ver.roles && rs.length) {
        rs.slice(0, 3).forEach(function (r, i) {
          yo.gSect.appendChild(s("text", { x: tx.toFixed(1), y: (ty + 17 * (i + 1)).toFixed(1), "text-anchor": anc, "class": "mv-sector__rol" }, corto(r.toLowerCase(), 28)));
        });
        if (rs.length > 3) yo.gSect.appendChild(s("text", { x: tx.toFixed(1), y: (ty + 17 * 4).toFixed(1), "text-anchor": anc, "class": "mv-sector__rol" }, "y " + (rs.length - 3) + " más"));
      }
    });
    // Nodos: crear, actualizar y quitar
    Object.keys(yo.nodos).forEach(function (id) {
      if (!o.obj[id]) { var nd = yo.nodos[id]; nd.g.remove(); nd.l.remove(); nd.deco.remove(); delete yo.nodos[id]; delete yo.pos[id]; }
    });
    o.ps.forEach(function (p) {
      var nd = yo.nodos[p.id] || yo.crear(p);
      nd.g.setAttribute("class", "mv-nodo-g" + (p.id === sel ? " es-sel" : "") + (nuevos[p.id] ? " mv-entra" : "") + (yo.opc.mover ? " mv-movible" : ""));
      nd.c.setAttribute("class", "mv-nodo mv-cat-" + colorCat(p.cat) + (p.estado === "pasado" ? " mv-nodo--pasado" : ""));
      nd.ini.textContent = (p.nombre || "?").charAt(0).toUpperCase();
      nd.nom.textContent = corto(p.nombre, 16);
      nd.x.style.display = p.fallecio ? "" : "none";
      nd.g.setAttribute("aria-label", p.nombre + ", " + nombreCat(p.cat) + ", " + ANILLO_N[p.anillo] + (p.cualidad ? ", vínculo " + LINEA_N[p.cualidad] : "") + ". Ver ficha.");
      nd.l.setAttribute("class", "mv-linea mv-linea--" + (p.cualidad || "sin"));
      nd.deco.setAttribute("class", "mv-deco" + (p.cualidad === "ambivalente" ? " mv-deco--guiones" : ""));
      var sale = yo.ver.intercambios && INTER.some(function (d) { var v = p.inter[d[0]]; return v === "doy" || v === "ambos"; });
      var entra = yo.ver.intercambios && INTER.some(function (d) { var v = p.inter[d[0]]; return v === "recibo" || v === "ambos"; });
      if (sale) nd.l.setAttribute("marker-end", "url(#" + yo.idFl + ")"); else nd.l.removeAttribute("marker-end");
      if (entra) nd.l.setAttribute("marker-start", "url(#" + yo.idFl + ")"); else nd.l.removeAttribute("marker-start");
      nd.lim.innerHTML = "";
      if (yo.ver.limites) LIM.forEach(function (d, i) {
        var v = p.lim[d[0]];
        if (v === "facil" || v === "depende" || v === "cuesta") nd.lim.appendChild(s("path", { d: arco(27, -90 + i * 72 + 8, -90 + i * 72 + 64), "class": "mv-lim mv-lim--" + v }));
      });
    });
    yo.mover(o.obj, animar);
  };
  MapaActual.prototype.crear = function (p) {
    var yo = this, g = s("g", { tabindex: "0", role: "button", "data-id": p.id });
    var nd = { g: g, l: s("path", { "class": "mv-linea" }), deco: s("path", { "class": "mv-deco" }) };
    nd.lim = s("g", { "class": "mv-lims" });
    nd.c = s("circle", { r: 19, cx: 0, cy: 0 });
    nd.ini = s("text", { x: 0, y: 6, "text-anchor": "middle", "class": "mv-nodo__ini" });
    nd.nom = s("text", { x: 0, y: 38, "text-anchor": "middle", "class": "mv-nodo__nombre" });
    nd.x = s("path", { d: "M10 -22 L20 -12 M20 -22 L10 -12", "class": "mv-nodo__x" });
    g.appendChild(nd.lim); g.appendChild(nd.c); g.appendChild(nd.ini); g.appendChild(nd.nom); g.appendChild(nd.x);
    yo.gLin.appendChild(nd.l); yo.gLin.appendChild(nd.deco); yo.gNod.appendChild(g);
    var ignorar = false;
    g.addEventListener("click", function () { if (ignorar) { ignorar = false; return; } yo.opc.alElegir(p.id); });
    g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); yo.opc.alElegir(p.id); } });
    if (yo.opc.mover) {
      var arr = null;
      g.addEventListener("pointerdown", function (e) {
        if (e.button > 0) return;
        arr = { x: e.clientX, y: e.clientY, movido: false };
        try { g.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
      });
      g.addEventListener("pointermove", function (e) {
        if (!arr) return;
        if (!arr.movido && Math.abs(e.clientX - arr.x) + Math.abs(e.clientY - arr.y) < 5) return;
        arr.movido = true; g.classList.add("mv-arrastrando");
        var pt = yo.punto(e); yo.pos[p.id] = [pt.x, pt.y]; yo.dibujar(p.id);
      });
      var soltar = function (e) {
        if (!arr) return;
        var movido = arr.movido; arr = null; g.classList.remove("mv-arrastrando");
        if (!movido) return;
        ignorar = true; setTimeout(function () { ignorar = false; }, 0);
        var pt = yo.punto(e), q = persona(p.id), dx = pt.x - C, dy = pt.y - C, dist = Math.sqrt(dx * dx + dy * dy);
        q.anillo = dist < 118 ? 1 : dist < 178 ? 2 : dist < 236 ? 3 : 4;
        q.angulo = Math.atan2(dy, dx);
        anunciar(q.nombre + " quedó en el círculo «" + ANILLO_N[q.anillo] + "».");
        sel = q.id; guardar(); renderSelectores(); renderPaneles(); dibujarMapas(); refrescarFicha();
      };
      g.addEventListener("pointerup", soltar);
      g.addEventListener("pointercancel", function () { arr = null; g.classList.remove("mv-arrastrando"); dibujarMapas(); });
    }
    yo.nodos[p.id] = nd;
    return nd;
  };
  MapaActual.prototype.punto = function (e) {
    var pt = this.svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(this.svg.getScreenCTM().inverse());
  };
  MapaActual.prototype.dibujar = function (id) {
    var nd = this.nodos[id], q = this.pos[id], p = persona(id);
    if (!nd || !q || !p) return;
    nd.g.setAttribute("transform", "translate(" + q[0].toFixed(1) + " " + q[1].toFixed(1) + ")");
    var t = trazo(p.cualidad, q[0], q[1]);
    nd.l.setAttribute("d", t.d); nd.deco.setAttribute("d", t.deco || "M0 0");
    nd.deco.style.display = t.deco ? "" : "none";
  };
  MapaActual.prototype.mover = function (obj, animar) {
    var yo = this, ids = Object.keys(obj), desde = {};
    if (yo.anim) cancelAnimationFrame(yo.anim);
    ids.forEach(function (id) { desde[id] = yo.pos[id] || [C, C]; });
    if (quieto || !animar) { ids.forEach(function (id) { yo.pos[id] = obj[id]; yo.dibujar(id); }); return; }
    var t0 = null, dur = 480;
    var paso = function (ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      ids.forEach(function (id) {
        yo.pos[id] = [desde[id][0] + (obj[id][0] - desde[id][0]) * e, desde[id][1] + (obj[id][1] - desde[id][1]) * e];
        yo.dibujar(id);
      });
      if (k < 1) yo.anim = requestAnimationFrame(paso); else yo.anim = null;
    };
    yo.anim = requestAnimationFrame(paso);
  };

  /* Genograma: capas por generación, parejas, separaciones y filiación. */
  function Genograma(svg, opc) { this.svg = svg; this.opc = opc; }
  Genograma.prototype.dibujar = function () {
    var svg = this.svg, opc = this.opc;
    svg.innerHTML = "";
    if (S.familiaNo) {
      svg.setAttribute("viewBox", "0 0 640 120"); svg.style.minWidth = "";
      svg.appendChild(s("text", { x: 320, y: 64, "text-anchor": "middle", "class": "mv-vacio" }, "Elegiste no explorar tu historia familiar por ahora."));
      return;
    }
    var fam = familia(), gens = [];
    fam.forEach(function (p) { var g = p.yo ? 0 : (p.gen || 0); if (gens.indexOf(g) < 0) gens.push(g); });
    if (gens.indexOf(0) < 0) gens.push(0);
    gens.sort(function (a, b) { return a - b; });
    var paso = 118, x0 = 170, alto = 150, y0 = 62, pos = {}, maxN = 1;
    var filas = gens.map(function (g) { return fam.filter(function (p) { return (p.yo ? 0 : (p.gen || 0)) === g; }); });
    filas.forEach(function (f) { maxN = Math.max(maxN, f.length); });
    var W = Math.max(640, x0 + maxN * paso + 30), H = y0 + gens.length * alto - 20;
    var parejaDe = function (a, b) { return S.parejas.filter(function (r) { return (r.a === a && r.b === b) || (r.a === b && r.b === a); })[0]; };
    filas.forEach(function (fila, gi) {
      var clave = function (p) {
        var xs = (p.padres || []).map(function (q) { return pos[q] ? pos[q][0] : null; }).filter(function (v) { return v != null; });
        return xs.length ? xs.reduce(function (a, b) { return a + b; }, 0) / xs.length : null;
      };
      var con = fila.filter(function (p) { return clave(p) != null; }).sort(function (a, b) { return clave(a) - clave(b); });
      var sin = fila.filter(function (p) { return clave(p) == null; });
      var orden = con.slice();
      sin.forEach(function (p) {
        var socio = orden.filter(function (q) { return parejaDe(p.id, q.id); })[0];
        if (socio) orden.splice(orden.indexOf(socio) + 1, 0, p); else orden.push(p);
      });
      var ini = x0 + (W - x0 - 30 - orden.length * paso) / 2 + paso / 2, y = y0 + gi * alto;
      orden.forEach(function (p, k) { pos[p.id] = [ini + k * paso, y]; });
      svg.appendChild(s("text", { x: 12, y: y + 5, "class": "mv-g-fila" }, GEN_N[String(gens[gi])] || ""));
      if (gi > 0) svg.appendChild(s("line", { x1: 0, x2: W, y1: y - alto / 2 - 6, y2: y - alto / 2 - 6, "class": "mv-g-separador" }));
    });
    var gRel = s("g"), gPer = s("g");
    svg.appendChild(gRel); svg.appendChild(gPer);
    var medio = {};
    S.parejas.forEach(function (r) {
      var a = pos[r.a], b = pos[r.b];
      if (!a || !b) return;
      if (a[1] === b[1]) {
        var xa = Math.min(a[0], b[0]), xb = Math.max(a[0], b[0]), y = a[1], m = (xa + xb) / 2;
        gRel.appendChild(s("path", { d: "M" + xa + " " + (y + 22) + " L" + xa + " " + (y + 58) + " L" + xb + " " + (y + 58) + " L" + xb + " " + (y + 22), "class": "mv-g-rel" }));
        if (r.t === "separacion") gRel.appendChild(s("path", { d: "M" + (m - 7) + " " + (y + 67) + " L" + (m - 1) + " " + (y + 49) + " M" + (m + 1) + " " + (y + 67) + " L" + (m + 7) + " " + (y + 49), "class": "mv-g-rel" }));
        medio[[r.a, r.b].sort().join("|")] = [m, y + 58];
      } else gRel.appendChild(s("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], "class": "mv-g-rel mv-g-rel--otra" }));
    });
    fam.forEach(function (c) {
      var pc = pos[c.id], ps = (c.padres || []).filter(function (q) { return q && pos[q]; });
      if (!pc || !ps.length) return;
      var ini;
      if (ps.length === 2) {
        ini = medio[ps.slice().sort().join("|")];
        if (!ini) {
          var a = pos[ps[0]], b = pos[ps[1]], yy = Math.max(a[1], b[1]) + 58;
          gRel.appendChild(s("path", { d: "M" + a[0] + " " + (a[1] + 22) + " L" + a[0] + " " + yy + " L" + b[0] + " " + yy + " L" + b[0] + " " + (b[1] + 22), "class": "mv-g-rel mv-g-rel--padres" }));
          ini = [(a[0] + b[0]) / 2, yy];
        }
      } else ini = [pos[ps[0]][0], pos[ps[0]][1] + 22];
      var my = pc[1] - 46;
      gRel.appendChild(s("path", { d: "M" + ini[0] + " " + ini[1] + " L" + ini[0] + " " + my + " L" + pc[0] + " " + my + " L" + pc[0] + " " + (pc[1] - 22), "class": "mv-g-rel mv-g-hijo" }));
    });
    fam.forEach(function (p) {
      var q = pos[p.id]; if (!q) return;
      var g = s("g", { transform: "translate(" + q[0] + " " + q[1] + ")", tabindex: "0", role: "button", "data-id": p.id,
        "class": "mv-g-persona" + (p.id === sel ? " es-sel" : "") + (nuevos[p.id] ? " mv-entra" : ""),
        "aria-label": (p.yo ? "Vos" : p.nombre) + ", " + (GEN_N[String(p.yo ? 0 : p.gen || 0)] || "") + (p.fallecio ? ", falleció" : "") + ". Ver ficha." });
      var forma = function (k) {
        var t = p.simbolo || "";
        if (t === "circulo") return s("circle", { r: 20 * k, "class": "mv-g-simbolo" });
        if (t === "cuadrado") return s("rect", { x: -19 * k, y: -19 * k, width: 38 * k, height: 38 * k, "class": "mv-g-simbolo" });
        if (t === "rombo") { var r = 23 * k; return s("polygon", { points: [0, -r, r, 0, 0, r, -r, 0].join(","), "class": "mv-g-simbolo" }); }
        return s("rect", { x: -19 * k, y: -19 * k, width: 38 * k, height: 38 * k, rx: 11 * k, "class": "mv-g-simbolo mv-g-simbolo--sin" });
      };
      g.appendChild(forma(1));
      if (p.yo) g.appendChild(forma(0.68));
      if (p.fallecio) g.appendChild(s("path", { d: "M-15 -15 L15 15 M15 -15 L-15 15", "class": "mv-g-x" }));
      if (!p.yo && p.capaActual) g.appendChild(s("circle", { cx: 21, cy: -20, r: 5, "class": "mv-g-marca" }));
      g.appendChild(s("text", { x: 0, y: 42, "text-anchor": "middle", "class": "mv-g-nombre" }, p.yo ? "Yo" : corto(p.nombre, 15)));
      g.addEventListener("click", function () { opc.alElegir(p.id); });
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); opc.alElegir(p.id); } });
      gPer.appendChild(g);
    });
    if (fam.length < 2) svg.appendChild(s("text", { x: (x0 + W) / 2 - 15, y: y0 + gens.indexOf(0) * alto + 82, "text-anchor": "middle", "class": "mv-vacio" }, "Agregá a quienes quieras incluir de tu historia familiar"));
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.style.minWidth = W > 640 ? Math.round(W * 0.75) + "px" : "";
  };

  /* ---------- Instancias ---------- */
  var mapas = [], genos = [];
  var alElegirEdicion = function (id) { seleccionar(id); };
  var alElegirFinal = function (id) { seleccionar(id); mostrarFicha(id); };
  $$("[data-mv-mapa]").forEach(function (svg) {
    var final = svg.getAttribute("data-mv-mapa") === "final";
    mapas.push(new MapaActual(svg, { mover: true, alElegir: final ? alElegirFinal : alElegirEdicion, ver: final ? { roles: true } : {} }));
  });
  $$("[data-mv-gen]").forEach(function (svg) {
    var final = svg.getAttribute("data-mv-gen") === "final";
    genos.push(new Genograma(svg, { alElegir: final ? alElegirFinal : alElegirEdicion }));
  });
  var mapaFinal = mapas.filter(function (m) { return m.svg.getAttribute("data-mv-mapa") === "final"; })[0];
  var genFinal = genos.filter(function (g) { return g.svg.getAttribute("data-mv-gen") === "final"; })[0];
  var genEdicion = genos.filter(function (g) { return g.svg.getAttribute("data-mv-gen") === "edicion"; })[0];

  function dibujarMapas(animar) {
    mapas.forEach(function (m) { m.actualizar(animar !== false); });
    genos.forEach(function (g) { g.dibujar(); });
    setTimeout(function () { nuevos = {}; }, 900);
  }
  function marcarSeleccion() {
    $$(".mv-nodo-g, .mv-g-persona").forEach(function (g) { g.classList.toggle("es-sel", g.getAttribute("data-id") === sel); });
  }

  /* ---------- Vista final: capas, toggles y ficha ---------- */
  var final = $("[data-mv-final]"), verAyuda = $("[data-mv-ver-ayuda]");
  var AYUDA = {
    intercambios: "Intercambios: una flecha hacia la persona indica que marcaste algo que va de vos hacia ella o que circula en ambos sentidos; una flecha hacia vos, algo que va de ella hacia vos o en ambos sentidos. No es un balance.",
    limites: "Límites: cinco segmentos alrededor de cada vínculo, desde arriba y en el sentido de las agujas del reloj: desacuerdo, decir que no, necesidades, espacios propios y responsabilidades. Línea continua: me resulta posible; guiones: depende; puntos: me cuesta; sin segmento: sin marcar o no lo sé.",
    roles: "Roles: debajo del nombre de cada ámbito aparecen los lugares que marcaste en la estación 6."
  };
  function pintarAyuda() {
    if (!mapaFinal) return;
    verAyuda.textContent = Object.keys(AYUDA).filter(function (k) { return mapaFinal.ver[k]; }).map(function (k) { return AYUDA[k]; }).join(" ");
  }
  $$('input[name="mv-vista"]').forEach(function (r) { r.addEventListener("change", function () { final.setAttribute("data-mv-final", r.value); }); });
  $$("[data-mv-ver]").forEach(function (c) {
    c.addEventListener("change", function () { if (mapaFinal) { mapaFinal.ver[c.getAttribute("data-mv-ver")] = c.checked; mapaFinal.actualizar(false); pintarAyuda(); } });
    if (mapaFinal) mapaFinal.ver[c.getAttribute("data-mv-ver")] = c.checked;
  });

  var ficha = $("[data-mv-ficha]"), fichaId = null;
  function fila(dl, k, v) {
    if (!v) return;
    var dt = document.createElement("dt"), dd = document.createElement("dd");
    dt.textContent = k; dd.textContent = v; dl.appendChild(dt); dl.appendChild(dd);
  }
  function mostrarFicha(id) {
    var p = persona(id); if (!p || !ficha) return;
    fichaId = id; ficha.innerHTML = ""; ficha.hidden = false;
    var h = document.createElement("h3"); h.textContent = p.yo ? "Vos" : p.nombre; ficha.appendChild(h);
    var dl = document.createElement("dl"); dl.className = "mv-ficha__datos";
    if (p.yo) fila(dl, "Lugar", "El centro de tu mapa y la persona índice de tu genograma.");
    else {
      fila(dl, "Tipo de vínculo", nombreCat(p.cat));
      fila(dl, "Capas", [p.capaActual ? "universo vincular actual" : "", p.capaFamilia ? "historia familiar" : ""].filter(Boolean).join(" y "));
      fila(dl, "Estado", (p.estado === "pasado" ? "vínculo pasado" : "vínculo actual") + (p.fallecio ? "; falleció" : ""));
      fila(dl, "Desde", p.inicio);
      fila(dl, "Lugar en tu vida", IMP_N[p.importancia]);
      if (p.capaActual) fila(dl, "Cercanía emocional que percibís", p.anillo ? ANILLO_N[p.anillo] : "sin ubicar todavía");
      fila(dl, "Frecuencia de contacto", FREC_N[p.frecuencia]);
      fila(dl, "Confianza", NIVEL_N[p.confianza]);
      fila(dl, "Intimidad", NIVEL_N[p.intimidad]);
      fila(dl, "Distancia física", DIST_N[p.distancia]);
      fila(dl, "Cómo describís el vínculo", LINEA_N[p.cualidad]);
      fila(dl, "Intercambios", INTER.filter(function (d) { return p.inter[d[0]]; }).map(function (d) { return d[1] + ": " + INTER_N[p.inter[d[0]]]; }).join(" · "));
      fila(dl, "Lo que circula, con tus palabras", p.interNota);
      fila(dl, "Límites", LIM.filter(function (d) { return p.lim[d[0]]; }).map(function (d) { return d[1] + ": " + LIM_N[p.lim[d[0]]]; }).join(" · "));
      fila(dl, "Al marcar un límite", p.limNota);
      fila(dl, "Nota", p.nota);
    }
    if (p.capaFamilia) {
      fila(dl, "Generación", GEN_N[String(p.yo ? 0 : p.gen || 0)]);
      fila(dl, "Hijo o hija de", (p.padres || []).map(function (q) { var x = persona(q); return x ? (x.yo ? "vos" : x.nombre) : ""; }).filter(Boolean).join(" y "));
      fila(dl, "En tu historia", p.notaFamilia);
    }
    var obs = S.obs.filter(function (o) { return (o.personas || []).indexOf(id) >= 0; }).map(function (o) { return (o.tipo === "hipotesis" ? "Hipótesis: " : "Observación: ") + o.texto; });
    fila(dl, "Tus registros de repeticiones", obs.join(" · "));
    ficha.appendChild(dl);
    var acc = document.createElement("div"); acc.className = "lab-acciones";
    var boton = function (t, fn, sec) { var b = document.createElement("button"); b.type = "button"; b.className = "boton boton--chico" + (sec ? " boton--secundario" : ""); b.textContent = t; b.addEventListener("click", fn); acc.appendChild(b); };
    if (!p.yo) boton("Editar", function () { cargarEditor(id); });
    if (p.capaActual) boton("Ubicar en el mapa", function () { seleccionar(id); $("#cercania").scrollIntoView({ behavior: quieto ? "auto" : "smooth" }); }, true);
    if (p.capaFamilia) boton("Editar en el genograma", function () { seleccionar(id); $("#historia").scrollIntoView({ behavior: quieto ? "auto" : "smooth" }); }, true);
    if (!p.yo) boton("Quitar del mapa", function () { if (window.confirm("¿Quitar a " + p.nombre + " de todo el mapa?")) { quitarPersona(id); anunciar("Quitaste a " + p.nombre + "."); } }, true);
    boton("Cerrar", cerrarFicha, true);
    ficha.appendChild(acc);
    ficha.focus({ preventScroll: true });
  }
  function cerrarFicha() { if (ficha) { ficha.hidden = true; ficha.innerHTML = ""; } fichaId = null; }
  function refrescarFicha() { if (fichaId && persona(fichaId)) mostrarFicha(fichaId); }

  /* ---------- Síntesis ---------- */
  function respuestas() {
    return $$("[data-mv-resp]").filter(function (t) { return t.value.trim(); }).map(function (t) {
      var sec = t.closest(".lab-estacion"), num = sec ? $(".lab-estacion__num", sec) : null, lab = $('label[for="' + t.id + '"]');
      return { estacion: num ? num.textContent.replace(/^\d+\s·\s/, "") : "", pregunta: lab ? lab.textContent.trim() : "", respuesta: t.value.trim() };
    });
  }
  function describir(p) {
    var partes = [];
    if (p.capaActual) partes.push(p.anillo ? "vínculo ubicado en el círculo «" + ANILLO_N[p.anillo] + "»" : "vínculo todavía sin ubicar en el mapa");
    if (p.cualidad) partes.push("lo describís como «" + LINEA_N[p.cualidad] + "»");
    var dims = [["frecuencia", "frecuencia", FREC_N], ["confianza", "confianza", NIVEL_N], ["intimidad", "intimidad", NIVEL_N], ["distancia", "distancia física", DIST_N]];
    var d = dims.filter(function (x) { return p[x[0]]; }).map(function (x) { return x[1] + ": " + x[2][p[x[0]]]; });
    if (d.length) partes.push(d.join(", "));
    var it = INTER.filter(function (x) { return p.inter[x[0]]; }).map(function (x) { return x[1].toLowerCase() + " (" + INTER_N[p.inter[x[0]]] + ")"; });
    if (it.length) partes.push("intercambios: " + it.join(", "));
    var li = LIM.filter(function (x) { return p.lim[x[0]]; }).map(function (x) { return x[1].toLowerCase() + " (" + LIM_N[p.lim[x[0]]] + ")"; });
    if (li.length) partes.push("límites: " + li.join(", "));
    return partes;
  }
  var algunaInter = function (v) { return actuales().some(function (p) { return INTER.some(function (d) { return p.inter[d[0]] === v; }); }); };
  var REGLAS = [
    { si: function () { return actuales().some(function (p) { return (p.frecuencia === "diaria" || p.frecuencia === "semanal") && p.intimidad === "poca"; }); },
      q: "Ubicaste vínculos con contacto frecuente y poca intimidad. ¿Qué hace que ese contacto no se traduzca en cercanía, y es algo que te gustaría que fuera distinto?",
      por: "marcaste contacto diario o semanal y poca intimidad en al menos un vínculo." },
    { si: function () { return actuales().some(function (p) { return (p.anillo === 1 || p.anillo === 2) && (p.distancia === "lejos" || p.distancia === "pais"); }); },
      q: "Hay vínculos que sentís cercanos aunque haya distancia física. ¿Qué sostiene esa cercanía?",
      por: "ubicaste cerca a alguien que vive lejos o en otro país." },
    { si: function () { return algunaInter("doy"); },
      q: "Marcaste intercambios que van más de vos hacia la otra persona. Sin hacer cuentas: ¿ese lugar lo elegís, forma parte de una etapa, o es algo que te gustaría conversar?",
      por: "marcaste «va más de mí hacia la otra persona» en al menos un intercambio." },
    { si: function () { return algunaInter("falta"); },
      q: "Señalaste intercambios que sentís insuficientes. ¿Qué esperás en esos momentos, y la otra persona conoce esa expectativa?",
      por: "marcaste «lo siento insuficiente» en al menos un intercambio." },
    { si: function () { return actuales().some(function (p) { return ["desacuerdo", "no", "necesidades"].some(function (k) { return p.lim[k] === "cuesta"; }); }); },
      q: "Marcaste relaciones en las que te cuesta expresar desacuerdo, decir que no o pedir lo que necesitás. ¿Qué anticipás que pasaría si lo hicieras? ¿Hay algún vínculo en el que sí te resulte posible, y qué lo diferencia?",
      por: "marcaste «me cuesta» en desacuerdo, decir que no o necesidades." },
    { si: function () { return actuales().some(function (p) { return p.cualidad === "cortado"; }); },
      q: "Describiste algún vínculo como cortado. Una distancia puede ser una decisión legítima; si te interesa, podrías pensar qué te permitió y qué te costó, sin necesidad de cambiarla.",
      por: "describiste al menos un vínculo como «cortado»." },
    { si: function () { return actuales().some(function (p) { return p.cualidad === "ambivalente"; }); },
      q: "Describiste algún vínculo como ambivalente. ¿Qué lugar pueden tener en vos los dos sentimientos a la vez?",
      por: "describiste al menos un vínculo como «ambivalente»." },
    { si: function () { return Object.keys(S.roles).some(function (k) { return (S.roles[k] || []).length; }); },
      q: "Identificaste lugares que ocupás en distintos ámbitos. ¿Qué sucede, en vos y en los demás, cuando dejás de ocuparlos por un momento?",
      por: "marcaste roles en la estación 6." },
    { si: function () { return (S.chips["mv-conflicto"] || []).some(function (v) { return ["evito", "silencio", "retiro", "cedo"].indexOf(v) >= 0; }); },
      q: "Marcaste que ante un desacuerdo a veces evitás el tema, hacés silencio, te retirás o cedés. ¿Qué te permite esa respuesta en el momento, y qué pasa después en el vínculo?",
      por: "elegiste evitar, hacer silencio, retirarte o ceder en la estación 7." },
    { si: function () { return S.obs.some(function (o) { return o.tipo === "observo"; }); },
      q: "Registraste repeticiones que observás. Además de lo que se repite, ¿qué es distinto entre esas situaciones?",
      por: "registraste al menos una repetición que observás." },
    { si: function () { return S.obs.some(function (o) { return o.tipo === "hipotesis"; }); },
      q: "Registraste hipótesis propias. ¿Qué observaciones concretas podrían confirmarlas, matizarlas o descartarlas?",
      por: "registraste al menos una hipótesis personal." },
    { si: function () { return actuales().some(function (p) { return p.estado === "pasado" || p.fallecio; }); },
      q: "Incluiste en tu universo actual vínculos pasados o personas que ya no están. ¿Qué lugar ocupan hoy en tu vida?",
      por: "agregaste a tu universo actual un vínculo pasado o una persona que falleció." },
    { si: function () { return actuales().some(function (p) { return p.anillo === 1 && ["origen", "actual", "hijos"].indexOf(p.cat) < 0 && !p.capaFamilia; }); },
      q: "Algunos de los vínculos que ubicaste más cerca no forman parte de tu familia. ¿Qué encontrás en ellos?",
      por: "ubicaste en «muy cerca» a alguien que no marcaste como familia." },
    { si: function () { return actuales().some(function (p) { return !p.anillo; }); },
      q: "Hay vínculos que todavía no ubicaste en el mapa. ¿Qué hace difícil decidir dónde van?",
      por: "quedan vínculos sin ubicar en la estación 2." }
  ];
  var GENERALES = [
    "¿Qué te gustaría conservar de tu universo vincular tal como está hoy?",
    "¿En qué vínculo te gustaría comprender mejor el lugar que ocupás?",
    "¿Qué parte del mapa te sorprendió al verla dibujada?",
    "Si miraras este mapa dentro de un año, ¿qué te gustaría que fuera distinto, y qué igual?"
  ];
  function preguntas() {
    var out = REGLAS.filter(function (r) { return r.si(); }).slice(0, 8).map(function (r) { return { q: r.q, por: "Aparece porque " + r.por }; });
    for (var i = 0; out.length < 5 && i < GENERALES.length; i++) out.push({ q: GENERALES[i], por: "Pregunta general de cierre." });
    return out;
  }
  function sintesis() {
    var ps = conAlgo(), fam = familia().filter(function (p) { return !p.yo; });
    var hay = ps.length || respuestas().length || S.obs.length;
    var gensUsadas = [];
    fam.slice().sort(function (a, b) { return (a.gen || 0) - (b.gen || 0); }).forEach(function (p) { var g = GEN_N[String(p.gen || 0)]; if (gensUsadas.indexOf(g) < 0) gensUsadas.push(g); });
    return {
      hay: hay,
      expreso: respuestas(),
      vinculos: ps.filter(function (p) { return p.capaActual; }).map(function (p) { return { nombre: p.nombre, cat: nombreCat(p.cat), detalle: describir(p), nota: p.nota }; }),
      familia: S.familiaNo ? { no: true } : { n: fam.length, gens: gensUsadas, parejas: S.parejas.length },
      roles: Object.keys(S.roles).filter(function (k) { return (S.roles[k] || []).length; }).map(function (k) { return nombreCat(k) + ": " + S.roles[k].join(", ").toLowerCase(); }),
      conflicto: (S.chips["mv-conflicto"] || []).map(function (v) { return CONFLICTO_N[v]; }).filter(Boolean),
      obs: S.obs.map(function (o) {
        var ns = (o.personas || []).map(function (id) { var p = persona(id); return p ? p.nombre : null; }).filter(Boolean);
        return { tipo: o.tipo === "hipotesis" ? "Hipótesis personal" : "Repetición que observás", texto: o.texto, en: ns.join(", ") };
      }),
      preguntas: hay ? preguntas() : []
    };
  }
  function nodo(tag, clase, texto) { var x = document.createElement(tag); if (clase) x.className = clase; if (texto != null) x.textContent = texto; return x; }
  function pintarSintesis(caja) {
    var r = sintesis(); caja.innerHTML = "";
    if (!r.hay) { caja.appendChild(nodo("p", null, "Todavía no hay nada registrado. Podés empezar por cualquier estación.")); return r; }
    var sec = function (t, nota) { var x = nodo("section", "mapa-dev__seccion"); x.appendChild(nodo("h4", null, t)); if (nota) x.appendChild(nodo("p", "lab-nota", nota)); caja.appendChild(x); return x; };
    if (r.expreso.length) {
      var a = sec("1. Lo que expresaste");
      var dl = nodo("dl", "mapa-dev__lista");
      r.expreso.forEach(function (e) {
        var dt = nodo("dt"); dt.appendChild(nodo("span", "mapa-dev__estacion", e.estacion)); dt.appendChild(document.createTextNode(" " + e.pregunta));
        dl.appendChild(dt); dl.appendChild(nodo("dd", null, e.respuesta));
      });
      a.appendChild(dl);
    }
    var b = sec("2. Las relaciones y modalidades que identificaste", "Descripción de lo que marcaste. No dice nada sobre cómo son esas personas.");
    if (r.vinculos.length) {
      var ul = nodo("ul", "mv-sint-vinculos");
      r.vinculos.forEach(function (v) {
        var li = nodo("li"); li.appendChild(nodo("strong", null, v.nombre)); li.appendChild(document.createTextNode(" · " + v.cat + (v.detalle.length ? ": " + v.detalle.join("; ") + "." : ".")));
        if (v.nota) li.appendChild(nodo("p", "lab-nota", "Tu nota: " + v.nota));
        ul.appendChild(li);
      });
      b.appendChild(ul);
    }
    if (r.familia.no) b.appendChild(nodo("p", null, "Elegiste no explorar tu historia familiar por ahora. Esa decisión también forma parte del mapa."));
    else if (r.familia.n) b.appendChild(nodo("p", null, "En tu historia familiar incluiste " + r.familia.n + (r.familia.n === 1 ? " persona" : " personas") + ", en: " + r.familia.gens.join(", ") + (r.familia.parejas ? ", y marcaste " + r.familia.parejas + (r.familia.parejas === 1 ? " relación de pareja o separación." : " relaciones de pareja o separación.") : ".")));
    if (r.roles.length) b.appendChild(nodo("p", null, "Lugares que reconocés: " + r.roles.join(" · ") + "."));
    if (r.conflicto.length) b.appendChild(nodo("p", null, "Ante un desacuerdo: " + r.conflicto.join(", ") + "."));
    var c = sec("3. Tus observaciones sobre repeticiones", "Solo lo que vos registraste. El laboratorio no detecta patrones.");
    if (r.obs.length) {
      var uo = nodo("ul");
      r.obs.forEach(function (o) { var li = nodo("li"); li.appendChild(nodo("strong", null, o.tipo + ": ")); li.appendChild(document.createTextNode(o.texto + (o.en ? " (en: " + o.en + ")" : ""))); uo.appendChild(li); });
      c.appendChild(uo);
    } else c.appendChild(nodo("p", null, "No registraste observaciones sobre repeticiones."));
    var d = sec("4. Preguntas para seguir explorando", "Se eligen con reglas a la vista: cada una dice por qué aparece.");
    var up = nodo("ul", "mv-sint-preguntas");
    r.preguntas.forEach(function (q) { var li = nodo("li"); li.appendChild(nodo("p", null, q.q)); li.appendChild(nodo("p", "mv-sint-porque", q.por)); up.appendChild(li); });
    d.appendChild(up);
    return r;
  }
  function comoTexto() {
    var r = sintesis(), l = ["MI MAPA DE VÍNCULOS", "Síntesis de exploración · " + new Date().toLocaleDateString("es-AR"), "",
      "Representa cómo experimentás tus vínculos. No es un diagnóstico ni describe a las personas que aparecen.", ""];
    if (!r.hay) return l.concat(["Todavía no hay nada registrado."]).join("\n") + "\n";
    if (r.expreso.length) { l.push("1. LO QUE EXPRESASTE"); r.expreso.forEach(function (e) { l.push("[" + e.estacion + "] " + e.pregunta, e.respuesta, ""); }); }
    l.push("2. LAS RELACIONES Y MODALIDADES QUE IDENTIFICASTE");
    r.vinculos.forEach(function (v) { l.push("- " + v.nombre + " · " + v.cat + (v.detalle.length ? ": " + v.detalle.join("; ") : "") + (v.nota ? " | Tu nota: " + v.nota : "")); });
    if (r.familia.no) l.push("Elegiste no explorar tu historia familiar por ahora.");
    else if (r.familia.n) l.push("Historia familiar: " + r.familia.n + " personas, en " + r.familia.gens.join(", ") + ".");
    if (r.roles.length) l.push("Lugares que reconocés: " + r.roles.join(" · "));
    if (r.conflicto.length) l.push("Ante un desacuerdo: " + r.conflicto.join(", "));
    l.push("", "3. TUS OBSERVACIONES SOBRE REPETICIONES");
    if (r.obs.length) r.obs.forEach(function (o) { l.push("- " + o.tipo + ": " + o.texto + (o.en ? " (en: " + o.en + ")" : "")); });
    else l.push("No registraste observaciones.");
    l.push("", "4. PREGUNTAS PARA SEGUIR EXPLORANDO");
    r.preguntas.forEach(function (q) { l.push("- " + q.q, "  (" + q.por + ")"); });
    l.push("", "Generado en el laboratorio «Mi mapa de vínculos». Nada de esto se envió a ningún servidor.");
    return l.join("\n") + "\n";
  }
  var salida = $("[data-mv-salida]"), sintCaja = $("[data-mv-sintesis]");
  $("[data-mv-devolucion]").addEventListener("click", function () { pintarSintesis(sintCaja); salida.hidden = false; salida.focus(); });

  /* ---------- Exportaciones ---------- */
  var expEstado = $("[data-mv-exportar-estado]");
  var PROPS = ["fill", "fill-opacity", "stroke", "stroke-width", "stroke-dasharray", "stroke-linecap", "stroke-linejoin", "stroke-opacity", "opacity",
    "font-family", "font-size", "font-weight", "font-style", "letter-spacing", "display", "visibility", "paint-order"];
  function svgClaro(svg) {
    var raiz = document.documentElement, antes = raiz.getAttribute("data-tema");
    raiz.setAttribute("data-tema", "claro"); svg.classList.add("mv-quieto");
    var marcados = $$(".es-sel", svg); marcados.forEach(function (x) { x.classList.remove("es-sel"); });
    var clon = svg.cloneNode(true), o = [svg].concat($$("*", svg)), c = [clon].concat($$("*", clon));
    o.forEach(function (el, i) {
      var cs = getComputedStyle(el), st = "";
      PROPS.forEach(function (k) { var v = cs.getPropertyValue(k); if (v) st += k + ":" + v + ";"; });
      c[i].setAttribute("style", st + (i === 0 ? "min-width:0;" : ""));
      c[i].removeAttribute("tabindex"); c[i].removeAttribute("class");
    });
    if (antes === null) raiz.removeAttribute("data-tema"); else raiz.setAttribute("data-tema", antes);
    svg.classList.remove("mv-quieto");
    marcados.forEach(function (x) { x.classList.add("es-sel"); });
    var vb = svg.getAttribute("viewBox").split(/\s+/).map(Number);
    clon.setAttribute("xmlns", NS); clon.setAttribute("width", vb[2]); clon.setAttribute("height", vb[3]);
    var fondo = document.createElementNS(NS, "rect");
    fondo.setAttribute("x", vb[0]); fondo.setAttribute("y", vb[1]); fondo.setAttribute("width", vb[2]); fondo.setAttribute("height", vb[3]); fondo.setAttribute("fill", "#F6F1EB");
    clon.insertBefore(fondo, clon.firstChild);
    return { nodo: clon, str: new XMLSerializer().serializeToString(clon), w: vb[2], h: vb[3] };
  }
  function aPNG(partes, nombre) {
    var esc = 2, gap = 30, W = Math.max.apply(null, partes.map(function (p) { return p.w; })), H = partes.reduce(function (a, p) { return a + p.h; }, 0) + gap * (partes.length - 1);
    var cv = document.createElement("canvas"); cv.width = W * esc; cv.height = H * esc;
    var cx = cv.getContext("2d"); cx.fillStyle = "#F6F1EB"; cx.fillRect(0, 0, cv.width, cv.height);
    var y = 0;
    var cargar = function (p) {
      return new Promise(function (ok, mal) {
        var im = new Image();
        im.onload = function () { ok(im); }; im.onerror = mal;
        im.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(p.str);
      });
    };
    return Promise.all(partes.map(cargar)).then(function (ims) {
      ims.forEach(function (im, i) { cx.drawImage(im, ((W - partes[i].w) / 2) * esc, y * esc, partes[i].w * esc, partes[i].h * esc); y += partes[i].h + gap; });
      return new Promise(function (ok) { cv.toBlob(ok, "image/png"); });
    }).then(function (blob) {
      if (!blob) throw new Error("sin imagen");
      LAB.guardarArchivo(nombre, blob);
    });
  }
  var vista = function () { return final.getAttribute("data-mv-final"); };
  var hayFamilia = function () { return !S.familiaNo && familia().length > 1; };
  function informe() {
    var inf = $("[data-mv-informe]");
    inf.innerHTML = "";
    inf.appendChild(nodo("h1", null, "Mi mapa de vínculos"));
    inf.appendChild(nodo("p", "lab-nota", "Síntesis de exploración · " + new Date().toLocaleDateString("es-AR") + ". Representa cómo experimentás tus vínculos; no es un diagnóstico ni describe a las personas que aparecen."));
    if (actuales().some(function (p) { return p.anillo; })) { inf.appendChild(nodo("h2", null, "Universo vincular actual")); var a = svgClaro(mapaFinal.svg); inf.appendChild(a.nodo); }
    if (hayFamilia()) { inf.appendChild(nodo("h2", null, "Historia familiar")); var g = svgClaro(genFinal.svg); inf.appendChild(g.nodo); }
    var cj = nodo("div"); pintarSintesis(cj); inf.appendChild(cj);
    if (inf.parentNode !== document.body) document.body.appendChild(inf);
  }
  $$("[data-mv-exportar]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = b.getAttribute("data-mv-exportar");
      expEstado.textContent = "";
      try {
        if (t === "txt") { LAB.guardarTexto("mi-mapa-de-vinculos.txt", comoTexto()); expEstado.textContent = "Listo: se descargó la síntesis."; return; }
        if (t === "gen-svg" || t === "gen-png") {
          if (!hayFamilia()) { expEstado.textContent = "Tu genograma todavía no tiene personas además de vos."; return; }
          var g = svgClaro(genFinal.svg);
          if (t === "gen-svg") { LAB.guardarArchivo("mi-genograma.svg", new Blob([g.str], { type: "image/svg+xml" })); expEstado.textContent = "Listo: se descargó el genograma."; return; }
          aPNG([g], "mi-genograma.png").then(function () { expEstado.textContent = "Listo: se descargó el genograma."; }, function () { expEstado.textContent = "No se pudo generar la imagen en este navegador. Probá con el SVG."; });
          return;
        }
        if (t === "mapa-png") {
          var partes = [], v = vista();
          var hayActual = actuales().some(function (p) { return p.anillo; });
          if (v !== "familia" && hayActual) partes.push(svgClaro(mapaFinal.svg));
          if (v !== "actual" && hayFamilia()) partes.push(svgClaro(genFinal.svg));
          if (!partes.length) { expEstado.textContent = "Todavía no hay vínculos ubicados en la capa que estás viendo."; return; }
          aPNG(partes, "mi-mapa-de-vinculos.png").then(function () { expEstado.textContent = "Listo: se descargó el mapa."; }, function () { expEstado.textContent = "No se pudo generar la imagen en este navegador."; });
          return;
        }
        if (t === "pdf") {
          informe();
          document.body.classList.add("mv-imprimiendo");
          var fin = function () { document.body.classList.remove("mv-imprimiendo"); window.removeEventListener("afterprint", fin); };
          window.addEventListener("afterprint", fin);
          window.print();
          setTimeout(fin, 1500);
          expEstado.textContent = "Se abrió el diálogo de impresión: elegí «Guardar como PDF» si querés un archivo.";
        }
      } catch (e) { expEstado.textContent = "No se pudo exportar en este navegador."; }
    });
  });

  /* ---------- Borrar todo ---------- */
  $("[data-mv-borrar]").addEventListener("click", function () {
    if (!window.confirm("¿Borrar todo tu mapa, tus respuestas y lo guardado en este navegador? No se puede deshacer.")) return;
    S = nuevoEstado(); sel = null; ls.sacar(CLAVE);
    volcarRespuestas(); limpiarEditor(); cerrarFicha();
    if (famCuerpo) famCuerpo.hidden = false;
    salida.hidden = true; sintCaja.innerHTML = "";
    renderTodo(); if (memEstado) memEstado.textContent = "Se borró toda la información."; anunciar("Se borró toda la información.");
  });

  /* ---------- Arranque ---------- */
  function renderTodo() {
    opcionesCat(); renderLista(); renderSelectores(); renderPaneles(); renderParejas(); renderRoles(); renderObs(); dibujarMapas(true); refrescarFicha();
  }
  cargar();
  volcarRespuestas();
  if (famCuerpo) famCuerpo.hidden = !!S.familiaNo;
  limpiarEditor();
  renderTodo();
  pintarAyuda();
  void genEdicion;
})();
