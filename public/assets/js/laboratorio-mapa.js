/* El mapa de lo que me habita.
   Organiza lo que la persona escribió en las nueve estaciones, sin interpretarlo:
   1) lo que expresó con sus palabras, 2) lo que ella misma marcó como patrón, 3) preguntas para seguir pensando.
   No calcula puntajes, perfiles ni diagnósticos. Nada se envía a ningún servidor; solo se guarda en este
   navegador si la persona lo pide de manera explícita. */
(function () {
  "use strict";
  var LAB = window.LAB || {};
  var CLAVE = "mapa-habita-respuestas", CLAVE_OK = "mapa-habita-recordar";
  var estaciones = Array.prototype.slice.call(document.querySelectorAll("[data-mapa-estacion]"));
  if (!estaciones.length) return;

  var limpio = function (t) { return (t || "").replace(/\s+/g, " ").trim(); };
  var textoDe = function (el) { return el ? limpio(el.textContent) : ""; };

  /* ---------- Lectura de respuestas ---------- */
  function etiqueta(campo) {
    var est = campo.closest("form"), lab = est.querySelector('label[for="' + campo.id + '"]');
    var grupo = campo.getAttribute("data-mapa-grupo");
    return grupo ? limpio(grupo) + " " + textoDe(lab) : textoDe(lab);
  }

  function leerEstacion(form) {
    var items = [];
    // Textos y casillas en el mismo orden en que aparecen las preguntas.
    form.querySelectorAll("textarea[data-mapa-campo], [data-mapa-chips]").forEach(function (c) {
      if (c.hasAttribute("data-mapa-chips")) return leerChips(c);
      var v = c.value.trim();
      if (!v) return;
      var rep = form.querySelector('[data-mapa-repite="' + c.id + '"]');
      items.push({ id: c.id, cat: c.getAttribute("data-mapa-cat"), pregunta: etiqueta(c), respuesta: v,
        repite: !!(rep && rep.checked), transversal: !!c.closest(".mapa-campo--transversal") });
    });
    function leerChips(fs) {
      var id = fs.getAttribute("data-mapa-chips"), valores = [], textos = [];
      fs.querySelectorAll('input[type="checkbox"]:checked').forEach(function (x) { valores.push(x.value); textos.push(textoDe(x.parentNode)); });
      var otro = fs.querySelector("[data-mapa-otro]");
      if (otro && otro.value.trim()) textos.push(otro.value.trim());
      if (!textos.length) return;
      items.push({ id: id, cat: fs.getAttribute("data-mapa-cat"), pregunta: textoDe(fs.querySelector("legend")),
        respuesta: textos.join(" · "), valores: valores, chips: true });
    }
    return { id: form.getAttribute("data-mapa-estacion"), nombre: form.getAttribute("data-mapa-nombre"),
      titulo: form.getAttribute("data-mapa-titulo"), items: items };
  }

  function leerTodo() { return estaciones.map(leerEstacion); }

  /* ---------- Mapa ---------- */
  var lista = document.querySelector("[data-mapa-exploradas]");
  var anillo = document.querySelector(".mapa-anillo");
  function pintarMapa() {
    var datos = leerTodo(), nombres = [], transversal = false;
    datos.forEach(function (e) {
      var region = document.querySelector('[data-mapa-region="' + e.id + '"]');
      var hay = e.items.length > 0;
      if (region) region.classList.toggle("explorada", hay);
      var enlace = document.querySelector('.lab-estaciones a[href="#' + e.id + '"]');
      if (enlace) enlace.classList.toggle("mapa-con-respuestas", hay);
      if (hay) nombres.push(e.nombre);
      e.items.forEach(function (it) { if (it.transversal) transversal = true; });
    });
    if (anillo) anillo.classList.toggle("explorada", transversal);
    if (lista) {
      lista.textContent = nombres.length
        ? nombres.join(" · ") + (transversal ? " · y la dimensión de cuerpo y contexto" : "")
        : "Todavía no escribiste nada. Cuando respondas alguna pregunta, la región correspondiente se va a colorear.";
    }
    return datos;
  }

  /* ---------- Preguntas abiertas ----------
     Se eligen según qué respondió o marcó la persona, nunca según una lectura del contenido. */
  var POR_CHIP = {
    "clima-estados": {
      "sin-nombre": "Marcaste que aparece algo que todavía no sabés nombrar. Podrías observar en qué situaciones aparece y qué sensaciones lo acompañan, sin apurarte a ponerle un nombre.",
      "culpa": "Entre los estados que marcaste está la culpa. ¿Frente a quién o frente a qué norma aparece, y qué te dice sobre lo que considerás importante?",
      "verguenza": "Marcaste la vergüenza. ¿En presencia de quién aparece más, y qué imaginás que esa mirada ve?"
    },
    "clima-primero": {
      "despues": "Señalaste que a veces notás lo que sentías recién después, al recordarlo. ¿Qué cambia entre el momento vivido y el momento en que lo podés pensar?",
      "sensacion": "Indicaste que lo primero que notás es una sensación en el cuerpo. Podrías prestar atención a cómo esa sensación va tomando forma antes de convertirse en una emoción con nombre."
    },
    "temor-respuesta": {
      "evito": "Señalaste que, ante ese temor, a veces evitás o postergás. Podría ser útil observar qué te permite esa respuesta en el momento y qué efectos tiene con el tiempo, sin juzgarla de antemano.",
      "reaseguro": "Mencionaste que buscás información o que alguien te tranquilice. ¿Cuánto dura el alivio que eso te da, y qué pasa después?",
      "no-pensar": "Indicaste que intentás no pensar en eso. ¿Qué sucede con ese pensamiento cuando intentás apartarlo?",
      "controlo": "Marcaste que tratás de controlar los detalles. ¿Qué parte de la situación sí está en tus manos y cuál no?",
      "consumo": "Mencionaste que a veces usás algo para calmarte. ¿Qué necesidad atiende eso en ese momento, y hay otras maneras de atenderla que tengas a mano?",
      "enfrento": "Señalaste que a veces lo enfrentás aunque te cueste. ¿Qué hace posible esa respuesta cuando aparece?"
    },
    "necesidad-recorrido": {
      "notar": "Marcaste que te cuesta darte cuenta de lo que necesitás. ¿Qué señales, del cuerpo o del ánimo, suelen aparecer antes de que lo notes?",
      "pedir": "Señalaste que la mayor dificultad está en pedir o buscar lo que necesitás. ¿Qué anticipás que podría pasar si lo pidieras, y con quién sería más posible empezar?",
      "recibir": "Marcaste que te cuesta recibir lo que necesitás cuando llega. ¿Qué pasa en vos en ese momento?",
      "cerrar": "Señalaste que te cuesta dar algo por terminado y descansar. ¿Qué haría falta para que algo quede suficientemente hecho?",
      "importancia": "Marcaste que te cuesta darle importancia a lo que necesitás. ¿A qué otras cosas o personas les das prioridad, y de dónde viene ese orden?"
    },
    "mandatos-frases": {},
    "tension-modo": {
      "rapido": "Marcaste que a veces decidís rápido para salir de la duda. ¿Qué sentís que pasaría si sostuvieras la duda un poco más?",
      "una-parte": "Señalaste que a veces te quedás con una parte y dejás de escuchar la otra. ¿Qué diría la parte que queda en silencio, si tuviera lugar?",
      "otro-decide": "Marcaste que a veces buscás que otra persona decida. ¿Qué te alivia de eso y qué te quita?",
      "oscilo": "Indicaste que vas y volvés entre una opción y otra. ¿Qué te acerca a cada opción y qué te aleja de ella?"
    },
    "recursos-lista": {
      "personas": "Mencionaste personas de confianza entre tus recursos. ¿A quién podrías acudir en un momento difícil, y qué necesitarías para hacerlo?"
    }
  };

  var POR_CAMPO = {
    "clima-expresion": "Describiste condiciones que facilitan o dificultan expresar lo que sentís. ¿Qué cambia entre las situaciones en las que podés hacerlo y aquellas en las que no?",
    "deseo-propio": "Pensaste en qué parte de tus decisiones responde a deseos propios y qué parte a expectativas de otras personas. ¿Hay una decisión en la que te gustaría que esa proporción fuera distinta?",
    "deseo-espera": "Nombraste algo que todavía no tiene lugar en tu vida. ¿Qué tendría que pasar, en vos o en tus condiciones, para que pueda tenerlo, aunque sea en pequeña escala?",
    "temor-difuso": "Describiste momentos en que el temor no tiene un objeto claro. Podrías registrar cuándo aparecen y qué estaba pasando antes, sin buscar todavía una explicación.",
    "necesidad-lugar": "Distinguiste ámbitos en los que hay lugar para lo que necesitás y otros en los que no tanto. ¿Qué diferencia a unos de otros?",
    "mandatos-propias": "Identificaste algunas expectativas que te acompañan. Podrías preguntarte cuáles reconocés hoy como propias, cuáles asociás con otras personas y cuáles todavía no sabés ubicar.",
    "mandatos-incumplir": "Describiste lo que aparece cuando no cumplís con un ideal. ¿Ese modo de tratarte es igual en todos los ámbitos, o cambia según quién esté presente?",
    "mandatos-papel": "Describiste un papel que solés ocupar. ¿En qué situaciones lo elegís y en cuáles sentís que te toca sin haberlo elegido?",
    "tension-situacion": "Nombraste una tensión entre dos posiciones. Más que resolverla rápido, podrías observar qué cuida cada una y qué pasaría si las dos tuvieran lugar en la decisión.",
    "tension-ajeno": "Mencionaste rasgos que te cuesta reconocer o que te molestan en otras personas. Podría ser interesante distinguir qué de esa reacción responde a la situación y qué podría hablar de algo tuyo, sin dar por hecha ninguna de las dos cosas.",
    "vinculos-medio": "Describiste lo que hacés cuando hay tensión entre dos personas cercanas. ¿Qué lugar te gustaría ocupar en esas situaciones, y qué haría falta para eso?",
    "vinculos-distancia": "Pensaste en cómo se combinan la cercanía y la distancia en tus vínculos. ¿En qué condiciones podés estar en desacuerdo con alguien querido sin sentir que el vínculo se pone en riesgo?",
    "vinculos-antes": "Encontraste parecidos entre vínculos actuales y anteriores. Tan importante como lo que se repite es lo que cambió: ¿qué diferencias reconocés?",
    "recursos-situacion": "Recordaste una situación difícil que pudiste atravesar. ¿Cuáles de los recursos que aparecieron entonces están disponibles hoy, y cuáles necesitarían condiciones que ahora no tenés?",
    "recursos-valores": "Escribiste algo de lo que te importa en la manera de vivir. ¿Qué pequeña acción de esta semana podría ir en esa dirección, aunque no cambie nada de fondo?",
    "elecciones-depende-circ": "Distinguiste lo que depende de vos, de otras personas y de las circunstancias. ¿Qué te pasa con la parte que no depende de vos?",
    "elecciones-alternativas": "Pensaste en lo que abre y lo que cierra cada alternativa. ¿Qué información o qué experiencia te ayudaría a elegir con más claridad?"
  };

  function preguntasAbiertas(datos) {
    var desdeChips = [], desdeCampos = [], hayRepite = false, hayCuerpo = false;
    datos.forEach(function (e) {
      e.items.forEach(function (it) {
        if (it.chips && POR_CHIP[it.id]) {
          (it.valores || []).forEach(function (v) { if (POR_CHIP[it.id][v]) desdeChips.push(POR_CHIP[it.id][v]); });
        }
        if (!it.chips && POR_CAMPO[it.id]) desdeCampos.push(POR_CAMPO[it.id]);
        if (it.repite) hayRepite = true;
        if (it.cat === "cuerpo") hayCuerpo = true;
      });
    });
    var out = [];
    if (hayRepite) out.push("Reconociste algo que se repite. Un patrón no es un destino ni una definición de quién sos: podrías observar en qué condiciones aparece, en cuáles no, y qué cambia entre unas y otras.");
    out = out.concat(desdeChips.slice(0, 4), desdeCampos);
    if (hayCuerpo) out.push("Registraste sensaciones corporales o condiciones de tu vida cotidiana. Podrías observar, a lo largo de una semana, cómo se relacionan el descanso, la actividad y el estado de ánimo.");
    return out.slice(0, 9);
  }

  /* ---------- Devolución ---------- */
  var SECCIONES = [
    { t: "Experiencias que identificaste", f: function (it) { return (it.cat === "experiencia" || (it.cat === "patron" && !it.chips && !it.repite)); } },
    { t: "Tensiones y ambivalencias que expresaste", f: function (it) { return it.cat === "tension" && !it.repite; } },
    { t: "Patrones que vos reconociste", nota: "Solo aparece acá lo que marcaste como algo que se repite o lo que señalaste como una respuesta habitual.", f: function (it) { return it.repite || (it.cat === "patron" && it.chips); } },
    { t: "Recursos y apoyos que identificaste", f: function (it) { return it.cat === "recurso"; } },
    { t: "Elecciones y posibilidades que consideraste", f: function (it) { return it.cat === "eleccion"; } },
    { t: "Cuerpo y contexto", f: function (it) { return it.cat === "cuerpo"; } }
  ];

  function armar(datos) {
    var exploradas = datos.filter(function (e) { return e.items.length; });
    var sinExplorar = datos.filter(function (e) { return !e.items.length; });
    var res = { exploradas: exploradas, sinExplorar: sinExplorar, secciones: [], preguntas: preguntasAbiertas(datos) };
    SECCIONES.forEach(function (s) {
      var grupos = [];
      datos.forEach(function (e) {
        var its = e.items.filter(s.f);
        if (its.length) grupos.push({ estacion: e, items: its });
      });
      if (grupos.length) res.secciones.push({ titulo: s.t, nota: s.nota, grupos: grupos });
    });
    return res;
  }

  var salida = document.querySelector("[data-mapa-salida]"), contenido = document.querySelector("[data-mapa-contenido]");
  var estado = document.querySelector("[data-mapa-estado]");
  function el(tag, clase, texto) {
    var x = document.createElement(tag);
    if (clase) x.className = clase;
    if (texto != null) x.textContent = texto;
    return x;
  }

  function pintarDevolucion() {
    var r = armar(pintarMapa());
    contenido.innerHTML = "";
    salida.hidden = false;
    if (!r.exploradas.length) {
      contenido.appendChild(el("p", null, "Todavía no hay respuestas para organizar. Podés empezar por cualquier estación, en el orden que quieras."));
      salida.focus();
      return r;
    }
    var dim = el("section", "mapa-dev__seccion");
    dim.appendChild(el("h4", null, "Dimensiones exploradas"));
    dim.appendChild(el("p", null, r.exploradas.map(function (e) { return e.nombre + " (" + e.titulo.toLowerCase() + ")"; }).join(" · ")));
    if (r.sinExplorar.length) dim.appendChild(el("p", "lab-nota", "Sin explorar, por ahora o por elección: " + r.sinExplorar.map(function (e) { return e.nombre; }).join(" · ") + ". No indica ninguna falta."));
    contenido.appendChild(dim);

    r.secciones.forEach(function (s) {
      var sec = el("section", "mapa-dev__seccion");
      sec.appendChild(el("h4", null, s.titulo));
      if (s.nota) sec.appendChild(el("p", "lab-nota", s.nota));
      s.grupos.forEach(function (g) {
        var dl = el("dl", "mapa-dev__lista");
        g.items.forEach(function (it) {
          var dt = el("dt");
          dt.appendChild(el("span", "mapa-dev__estacion", g.estacion.nombre));
          dt.appendChild(document.createTextNode(" " + it.pregunta));
          dl.appendChild(dt);
          dl.appendChild(el("dd", null, it.respuesta));
        });
        sec.appendChild(dl);
      });
      contenido.appendChild(sec);
    });

    if (r.preguntas.length) {
      var pq = el("section", "mapa-dev__seccion mapa-dev__preguntas");
      pq.appendChild(el("h4", null, "Preguntas abiertas para seguir pensando"));
      var ul = el("ul");
      r.preguntas.forEach(function (p) { ul.appendChild(el("li", null, p)); });
      pq.appendChild(ul);
      pq.appendChild(el("p", "lab-nota", "Son preguntas, no conclusiones. Podés tomarlas, cambiarlas o dejarlas de lado."));
      contenido.appendChild(pq);
    }
    salida.focus();
    return r;
  }

  function comoTexto() {
    var r = armar(leerTodo()), l = [];
    l.push("EL MAPA DE LO QUE ME HABITA", "Registro de exploración · " + new Date().toLocaleDateString("es-AR"), "",
      "Este registro organiza lo que escribiste. No es un diagnóstico, un perfil ni un resultado de test.", "");
    if (!r.exploradas.length) { l.push("Todavía no hay respuestas."); return l.join("\n") + "\n"; }
    l.push("DIMENSIONES EXPLORADAS", r.exploradas.map(function (e) { return e.nombre; }).join(" · "), "");
    r.secciones.forEach(function (s) {
      l.push(s.titulo.toUpperCase());
      s.grupos.forEach(function (g) {
        g.items.forEach(function (it) { l.push("[" + g.estacion.nombre + "] " + it.pregunta, it.respuesta, ""); });
      });
    });
    if (r.preguntas.length) {
      l.push("PREGUNTAS ABIERTAS PARA SEGUIR PENSANDO");
      r.preguntas.forEach(function (p) { l.push("- " + p); });
      l.push("");
    }
    l.push("Generado en el laboratorio «El mapa de lo que me habita». Nada de esto se envió a ningún servidor.");
    return l.join("\n") + "\n";
  }

  /* ---------- Memoria opcional en este navegador ---------- */
  var recordar = document.querySelector("[data-mapa-recordar]"), estadoMem = document.querySelector("[data-mapa-memoria-estado]");
  var store = {
    leer: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    poner: function (k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    sacar: function (k) { try { localStorage.removeItem(k); } catch (e) { /* sin almacenamiento */ } }
  };
  function campos() {
    return Array.prototype.slice.call(document.querySelectorAll(".mapa-estacion textarea, .mapa-estacion input"));
  }
  function guardar() {
    if (!recordar || !recordar.checked) return;
    var d = {};
    campos().forEach(function (c) {
      var k = c.type === "checkbox" ? (c.name || c.getAttribute("data-mapa-repite")) + "=" + c.value : c.id;
      if (c.type === "checkbox") { if (c.checked) d[k] = 1; } else if (c.value) d[k] = c.value;
    });
    if (!store.poner(CLAVE, JSON.stringify(d)) && estadoMem) estadoMem.textContent = "Este navegador no permite guardar datos; tus respuestas se van a perder al cerrar la página.";
  }
  function restaurar() {
    var d = null;
    try { d = JSON.parse(store.leer(CLAVE) || "null"); } catch (e) { d = null; }
    if (!d) return false;
    campos().forEach(function (c) {
      var k = c.type === "checkbox" ? (c.name || c.getAttribute("data-mapa-repite")) + "=" + c.value : c.id;
      if (c.type === "checkbox") c.checked = !!d[k]; else if (d[k] != null) c.value = d[k];
    });
    return true;
  }
  if (recordar) {
    if (store.leer(CLAVE_OK) === "1") {
      recordar.checked = true;
      if (restaurar() && estadoMem) estadoMem.textContent = "Recuperamos las respuestas que guardaste en este navegador.";
    }
    recordar.addEventListener("change", function () {
      if (recordar.checked) {
        store.poner(CLAVE_OK, "1"); guardar();
        if (estadoMem) estadoMem.textContent = "Tus respuestas se guardan solo en este navegador.";
      } else {
        store.sacar(CLAVE_OK); store.sacar(CLAVE);
        if (estadoMem) estadoMem.textContent = "Listo: se borró lo guardado en este navegador. Lo que está escrito en la página sigue visible hasta que la cierres.";
      }
    });
  }

  var demora = null;
  document.addEventListener("input", function (ev) {
    if (!ev.target.closest || !ev.target.closest(".mapa-estacion")) return;
    clearTimeout(demora);
    demora = setTimeout(function () { pintarMapa(); guardar(); }, 250);
  });
  document.addEventListener("change", function (ev) {
    if (!ev.target.closest || !ev.target.closest(".mapa-estacion")) return;
    pintarMapa(); guardar();
  });
  estaciones.forEach(function (f) { f.addEventListener("submit", function (e) { e.preventDefault(); }); });

  /* ---------- Botones ---------- */
  var bDev = document.querySelector("[data-mapa-devolucion]");
  if (bDev) bDev.addEventListener("click", pintarDevolucion);
  var hayAlgo = function () { return leerTodo().some(function (e) { return e.items.length; }); };
  var bBajar = document.querySelector("[data-mapa-bajar]");
  if (bBajar) bBajar.addEventListener("click", function () {
    if (!hayAlgo()) { estado.textContent = "Todavía no hay nada escrito para guardar."; return; }
    if (LAB.guardarTexto) LAB.guardarTexto("el-mapa-de-lo-que-me-habita.txt", comoTexto());
    estado.textContent = "Listo: se descargó en tu dispositivo.";
  });
  var bCopiar = document.querySelector("[data-mapa-copiar]");
  if (bCopiar) bCopiar.addEventListener("click", function () {
    if (!hayAlgo()) { estado.textContent = "Todavía no hay nada escrito para copiar."; return; }
    if (LAB.copiar) LAB.copiar(comoTexto(), bCopiar);
  });
  var bBorrar = document.querySelector("[data-mapa-borrar]");
  if (bBorrar) bBorrar.addEventListener("click", function () {
    if (!window.confirm("¿Borrar todas tus respuestas de esta página y de este navegador? No se puede deshacer.")) return;
    campos().forEach(function (c) { if (c.type === "checkbox") c.checked = false; else c.value = ""; });
    store.sacar(CLAVE);
    pintarMapa();
    contenido.innerHTML = "";
    estado.textContent = "Se borraron todas las respuestas.";
  });

  pintarMapa();
})();
