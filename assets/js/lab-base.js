/* Utilidades compartidas por los laboratorios (creatividad, comunicación no violenta, etc.).
   Todo ocurre en el navegador: no se envía nada a ningún servidor.
   Lo único que se guarda (en localStorage, si está disponible) es el avance de los planes de 7 días. */
(function () {
  "use strict";
  var LAB = {};

  LAB.azar = function (lista, evitar) {
    if (lista.length < 2) return lista[0];
    var x;
    do { x = lista[Math.floor(Math.random() * lista.length)]; } while (x === evitar);
    return x;
  };

  LAB.unos = function (lista, n) {
    var copia = lista.slice(), out = [];
    while (out.length < n && copia.length) out.push(copia.splice(Math.floor(Math.random() * copia.length), 1)[0]);
    return out;
  };

  LAB.mezclar = function (lista) { return LAB.unos(lista, lista.length); };

  /* Cambia un texto con un pequeño fundido (desactivado por CSS si se prefiere menos movimiento). */
  LAB.poner = function (el, texto) {
    if (!el) return;
    el.classList.add("lab-cambia");
    setTimeout(function () { el.textContent = texto; el.classList.remove("lab-cambia"); }, 140);
  };

  LAB.mmss = function (s) { return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); };

  LAB.guardarArchivo = function (nombre, blob) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };

  LAB.guardarTexto = function (nombre, texto) {
    LAB.guardarArchivo(nombre, new Blob([texto], { type: "text/plain;charset=utf-8" }));
  };

  LAB.temporizador = function (segundos, reloj, alTerminar) {
    var resto = segundos, id = null;
    return {
      activo: function () { return id !== null; },
      empezar: function () {
        if (id) return;
        resto = segundos; reloj.textContent = LAB.mmss(resto); reloj.classList.add("en-marcha");
        id = setInterval(function () {
          resto--; reloj.textContent = LAB.mmss(Math.max(resto, 0));
          if (resto <= 0) { clearInterval(id); id = null; reloj.classList.remove("en-marcha"); alTerminar(); }
        }, 1000);
      },
      frenar: function () { if (id) { clearInterval(id); id = null; } reloj.classList.remove("en-marcha"); reloj.textContent = LAB.mmss(segundos); }
    };
  };

  LAB.copiar = function (texto, boton) {
    var listo = function () {
      if (!boton) return;
      var o = boton.textContent; boton.textContent = "Copiado";
      setTimeout(function () { boton.textContent = o; }, 1600);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(texto).then(listo, function () {});
  };

  /* Botones «Copiar»: data-lab-copiar="selector del elemento con el texto". */
  document.querySelectorAll("[data-lab-copiar]").forEach(function (b) {
    b.addEventListener("click", function () {
      var el = document.querySelector(b.getAttribute("data-lab-copiar"));
      if (el) LAB.copiar(el.textContent.trim(), b);
    });
  });

  /* Planes de 7 días: <div data-lab-plan="clave-de-guardado"> con casillas, [data-lab-plan-progreso] y [data-lab-plan-reiniciar]. */
  document.querySelectorAll("[data-lab-plan]").forEach(function (plan) {
    var clave = "lab-plan-" + (plan.getAttribute("data-lab-plan") || "creatividad");
    var casillas = plan.querySelectorAll('input[type="checkbox"]'), prog = plan.querySelector("[data-lab-plan-progreso]");
    var total = casillas.length, unidad = plan.hasAttribute("data-lab-plan-unidad") ? plan.getAttribute("data-lab-plan-unidad") : " días";
    var leer = function () { try { return JSON.parse(localStorage.getItem(clave) || "[]"); } catch (e) { return []; } };
    var escribir = function (v) { try { localStorage.setItem(clave, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } };
    var actualizar = function () {
      var hechos = Array.prototype.filter.call(casillas, function (c) { return c.checked; }).map(function (c) { return c.value; });
      if (prog) prog.textContent = hechos.length === total ? "¡" + total + " de " + total + "! Completaste el plan." : hechos.length + " de " + total + unidad;
      plan.classList.toggle("completo", hechos.length === total);
      escribir(hechos);
    };
    var guardados = leer();
    casillas.forEach(function (c) { c.checked = guardados.indexOf(c.value) >= 0; c.addEventListener("change", actualizar); });
    var reiniciar = plan.querySelector("[data-lab-plan-reiniciar]");
    if (reiniciar) reiniciar.addEventListener("click", function () { casillas.forEach(function (c) { c.checked = false; }); actualizar(); });
    actualizar();
  });

  /* Quizzes: <div data-lab-quiz="nombre"> con [data-lab-quiz-frase], [data-lab-quiz-opciones] (botones [data-lab-quiz-opcion]),
     [data-lab-quiz-resultado], [data-lab-quiz-marcador] y [data-lab-quiz-siguiente]. Se registra con LAB.quiz(nombre, items).
     Cada item: { t: "frase", r: "a"|"b" (o el índice de la opción correcta), e: "explicación", ops: ["opción 1", ...] (opcional) }.
     Si el item trae ops, los botones se arman desde los datos. */
  LAB.quiz = function (nombre, items) {
    document.querySelectorAll('[data-lab-quiz="' + nombre + '"]').forEach(function (caja) {
      var orden = LAB.mezclar(items), i = 0, aciertos = 0, respondidas = 0, respondida = false;
      var frase = caja.querySelector("[data-lab-quiz-frase]"), res = caja.querySelector("[data-lab-quiz-resultado]");
      var grupo = caja.querySelector("[data-lab-quiz-opciones]") || caja.querySelector(".lab-quiz__opciones");
      var sig = caja.querySelector("[data-lab-quiz-siguiente]"), marcador = caja.querySelector("[data-lab-quiz-marcador]");
      var actual = function () { return orden[i % orden.length]; };
      var mostrar = function () {
        var it = actual();
        respondida = false;
        LAB.poner(frase, it.sinComillas ? it.t : "«" + it.t + "»");
        if (it.ops) {
          grupo.innerHTML = it.ops.map(function (o, k) {
            return '<button class="lab-quiz__opcion" type="button" data-lab-quiz-opcion="' + k + '" aria-pressed="false"></button>';
          }).join("");
          grupo.querySelectorAll("[data-lab-quiz-opcion]").forEach(function (bt, k) { bt.textContent = it.ops[k]; });
        }
        res.textContent = ""; res.className = "lab-quiz__resultado";
        grupo.querySelectorAll("[data-lab-quiz-opcion]").forEach(function (o) { o.disabled = false; o.setAttribute("aria-pressed", "false"); o.classList.remove("es-correcta", "es-incorrecta"); });
        sig.hidden = true;
      };
      grupo.addEventListener("click", function (ev) {
        var o = ev.target.closest("[data-lab-quiz-opcion]");
        if (!o || respondida) return;
        respondida = true;
        var it = actual(), bien = o.getAttribute("data-lab-quiz-opcion") === String(it.r);
        respondidas++; if (bien) aciertos++;
        grupo.querySelectorAll("[data-lab-quiz-opcion]").forEach(function (x) {
          x.disabled = true;
          x.setAttribute("aria-pressed", x === o ? "true" : "false");
          if (x.getAttribute("data-lab-quiz-opcion") === String(it.r)) x.classList.add("es-correcta");
          else if (x === o) x.classList.add("es-incorrecta");
        });
        res.className = "lab-quiz__resultado " + (bien ? "bien" : "revisar");
        res.textContent = (bien ? "Bien. " : "Mirala de nuevo. ") + it.e;
        if (marcador) marcador.textContent = aciertos + " de " + respondidas;
        sig.hidden = false; sig.focus();
      });
      sig.addEventListener("click", function () { i++; mostrar(); });
      mostrar();
    });
  };

  /* Tarjetas al azar: <div data-lab-azar="nombre"> con [data-lab-azar-texto] y [data-lab-azar-otra]. LAB.azarLista(nombre, items). */
  LAB.azarLista = function (nombre, items) {
    document.querySelectorAll('[data-lab-azar="' + nombre + '"]').forEach(function (caja) {
      var t = caja.querySelector("[data-lab-azar-texto]");
      t.textContent = LAB.azar(items);
      caja.querySelector("[data-lab-azar-otra]").addEventListener("click", function () { LAB.poner(t, LAB.azar(items, t.textContent)); });
    });
  };

  /* Pasos guiados: <div data-lab-pasos [data-lab-pasos-segundos="60"]> con un <ol> de pasos. Sin JS se ven todos. */
  document.querySelectorAll("[data-lab-pasos]").forEach(function (caja) {
    var pasos = caja.querySelectorAll("ol > li"), n = pasos.length, i = 0, seg = parseInt(caja.getAttribute("data-lab-pasos-segundos") || "0", 10);
    if (!n) return;
    var barra = document.createElement("div");
    barra.className = "lab-pasos__barra";
    barra.innerHTML = '<p class="lab-pasos__estado" role="status"></p>' + (seg ? '<span class="lab-reloj" aria-hidden="true"></span>' : "") +
      '<div class="lab-acciones"><button class="boton boton--secundario boton--chico" type="button" data-ant>Anterior</button>' +
      '<button class="boton boton--chico" type="button" data-sig>Siguiente</button></div>';
    caja.appendChild(barra);
    caja.classList.add("lab-pasos--activo");
    var estado = barra.querySelector(".lab-pasos__estado"), ant = barra.querySelector("[data-ant]"), sig = barra.querySelector("[data-sig]");
    var reloj = seg ? LAB.temporizador(seg, barra.querySelector(".lab-reloj"), function () { estado.textContent = "Paso " + (i + 1) + " de " + n + ". Tiempo cumplido: cuando quieras, seguí."; LAB.campana(); }) : null;
    var conReloj = false;
    var mostrar = function () {
      pasos.forEach(function (p, k) { p.hidden = k !== i; });
      estado.textContent = "Paso " + (i + 1) + " de " + n;
      ant.disabled = i === 0;
      sig.textContent = i === n - 1 ? "Empezar de nuevo" : "Siguiente";
      if (reloj && conReloj) { reloj.frenar(); reloj.empezar(); }
    };
    ant.addEventListener("click", function () { if (i > 0) { i--; mostrar(); } });
    sig.addEventListener("click", function () { i = i === n - 1 ? 0 : i + 1; mostrar(); });
    pasos.forEach(function (p, k) { p.hidden = k !== 0; });
    estado.textContent = "Paso 1 de " + n;
    ant.disabled = true;
    if (reloj) barra.querySelector(".lab-reloj").textContent = LAB.mmss(seg);
    // El reloj arranca recién cuando la persona avanza o toca «Empezar».
    if (reloj) {
      var empezar = document.createElement("button");
      empezar.className = "boton boton--chico"; empezar.type = "button"; empezar.textContent = "Empezar con el reloj";
      barra.querySelector(".lab-acciones").prepend(empezar);
      empezar.addEventListener("click", function () { conReloj = true; reloj.frenar(); reloj.empezar(); empezar.remove(); sig.focus(); });
    }
  });

  /* Selector con paneles: radios name=X dentro de [data-lab-selector] y paneles [data-lab-panel="valor"]. */
  document.querySelectorAll("[data-lab-selector]").forEach(function (caja) {
    var paneles = caja.querySelectorAll("[data-lab-panel]");
    var ver = function () {
      var m = caja.querySelector('input[type="radio"]:checked');
      paneles.forEach(function (p) { p.hidden = !m || p.getAttribute("data-lab-panel") !== m.value; });
    };
    caja.addEventListener("change", ver);
    ver();
  });

  /* Formularios descargables: <form data-lab-form="nombre-de-archivo" data-lab-form-titulo="Título">.
     Cada campo con su <label>. Botones [data-lab-form-bajar] y [data-lab-form-copiar]. */
  LAB.textoFormulario = function (form) {
    var lineas = [form.getAttribute("data-lab-form-titulo") || document.title, ""];
    form.querySelectorAll("input, textarea, select").forEach(function (c) {
      if (c.type === "button" || c.type === "submit" || c.type === "reset" || c.hasAttribute("data-lle-entrada")) return;
      if ((c.type === "checkbox" || c.type === "radio") && !c.checked) return;
      var v = (c.type === "checkbox" || c.type === "radio") ? (c.closest("label") ? c.closest("label").textContent.trim() : c.value) : c.value.trim();
      if (!v) return;
      var lab = c.id ? form.querySelector('label[for="' + c.id + '"]') : null;
      var nombre = lab ? lab.textContent.trim() : (c.closest("fieldset") && c.closest("fieldset").querySelector("legend") ? c.closest("fieldset").querySelector("legend").textContent.trim() : "");
      lineas.push((nombre && !(c.type === "checkbox" || c.type === "radio") ? nombre + "\n" : "") + (c.type === "checkbox" ? "✓ " : "") + v);
      if (!(c.type === "checkbox")) lineas.push("");
    });
    form.querySelectorAll("[data-lab-lista-editable]").forEach(function (l) {
      var items = l.querySelectorAll("[data-lle-texto]");
      if (!items.length) return;
      lineas.push("", l.getAttribute("data-lab-lista-titulo") || "Lista");
      items.forEach(function (it, k) { lineas.push((k + 1) + ". " + it.textContent); });
    });
    return lineas.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  };
  document.querySelectorAll("[data-lab-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    var aviso = form.querySelector("[data-lab-form-estado]");
    var vacio = function () { return LAB.textoFormulario(form).split("\n").filter(function (l) { return l.trim(); }).length <= 1; };
    var bajar = form.querySelector("[data-lab-form-bajar]"), copiar = form.querySelector("[data-lab-form-copiar]");
    if (bajar) bajar.addEventListener("click", function () {
      if (vacio()) { if (aviso) aviso.textContent = "Todavía no hay nada escrito para guardar."; return; }
      LAB.guardarTexto(form.getAttribute("data-lab-form") + ".txt", LAB.textoFormulario(form));
      if (aviso) aviso.textContent = "Listo: se descargó en tu dispositivo.";
    });
    if (copiar) copiar.addEventListener("click", function () {
      if (vacio()) { if (aviso) aviso.textContent = "Todavía no hay nada escrito para copiar."; return; }
      LAB.copiar(LAB.textoFormulario(form), copiar);
    });
  });

  /* Listas editables: <div data-lab-lista-editable data-lab-lista-titulo="…"> con un input [data-lle-entrada] (con su label),
     un botón [data-lle-agregar] y un <ol data-lle-lista>. Cada ítem se puede subir, bajar o quitar. */
  document.querySelectorAll("[data-lab-lista-editable]").forEach(function (caja) {
    var entrada = caja.querySelector("[data-lle-entrada]"), lista = caja.querySelector("[data-lle-lista]");
    var estado = document.createElement("p");
    estado.className = "visualmente-oculto"; estado.setAttribute("role", "status");
    caja.appendChild(estado);
    var pintar = function (foco) {
      var items = lista.querySelectorAll("li");
      items.forEach(function (li, k) {
        li.querySelector('[data-lle="-1"]').disabled = k === 0;
        li.querySelector('[data-lle="1"]').disabled = k === items.length - 1;
      });
      caja.classList.toggle("tiene-items", items.length > 0);
      if (foco) { var b = foco.querySelector('[data-lle]:not(:disabled)'); if (b) b.focus(); }
    };
    var crear = function (texto) {
      var li = document.createElement("li");
      li.className = "lab-orden__item";
      li.innerHTML = '<span class="lab-orden__nombre" data-lle-texto></span><span class="lab-orden__botones">' +
        '<button type="button" class="lab-orden__btn" data-lle="-1"><span aria-hidden="true">↑</span><span class="visualmente-oculto">Subir</span></button>' +
        '<button type="button" class="lab-orden__btn" data-lle="1"><span aria-hidden="true">↓</span><span class="visualmente-oculto">Bajar</span></button>' +
        '<button type="button" class="lab-orden__btn" data-lle="x"><span aria-hidden="true">×</span><span class="visualmente-oculto">Quitar</span></button></span>';
      li.querySelector("[data-lle-texto]").textContent = texto;
      li.querySelectorAll(".visualmente-oculto").forEach(function (v) { v.textContent += " «" + texto + "»"; });
      return li;
    };
    var agregar = function () {
      var t = entrada.value.trim();
      if (!t) { entrada.focus(); return; }
      lista.appendChild(crear(t)); entrada.value = ""; entrada.focus();
      estado.textContent = "Agregado: " + t + ".";
      pintar();
    };
    caja.querySelector("[data-lle-agregar]").addEventListener("click", agregar);
    entrada.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); agregar(); } });
    lista.addEventListener("click", function (e) {
      var b = e.target.closest("[data-lle]");
      if (!b) return;
      var li = b.closest("li"), accion = b.getAttribute("data-lle"), t = li.querySelector("[data-lle-texto]").textContent;
      if (accion === "x") {
        var vecino = li.nextElementSibling || li.previousElementSibling;
        li.remove(); estado.textContent = "Quitado: " + t + ".";
        pintar(); if (vecino) { var bb = vecino.querySelector('[data-lle="x"]'); if (bb) bb.focus(); } else entrada.focus();
        return;
      }
      if (accion === "-1" && li.previousElementSibling) lista.insertBefore(li, li.previousElementSibling);
      if (accion === "1" && li.nextElementSibling) lista.insertBefore(li.nextElementSibling, li);
      var pos = Array.prototype.indexOf.call(lista.children, li) + 1;
      estado.textContent = t + " quedó en el puesto " + pos + ".";
      pintar(); var mismo = li.querySelector('[data-lle="' + accion + '"]'); if (mismo && !mismo.disabled) mismo.focus(); else pintar(li);
    });
    var form = caja.closest("form");
    if (form) form.addEventListener("reset", function () { lista.innerHTML = ""; pintar(); });
    pintar();
  });

  /* Respiración guiada: <div data-lab-respiracion [data-ciclos="20"]> con [data-resp-circulo], [data-resp-cuenta],
     [data-resp-fase], [data-resp-empezar], [data-resp-frenar], opcional [data-resp-lado] y [data-resp-confirmar] (casilla).
     El patrón sale del radio marcado dentro del componente (atributo data-patron o value "4,0,6,0") o de data-patron del componente.
     data-patron es JSON: [{ "f": "Inhalá", "s": 4, "e": 1, "l": "izq"|"der" }, …]. */
  var NOMBRES_RESP = ["Inhalá", "Sostené", "Exhalá", "Pausa"], ESCALA_RESP = [1, 1, 0.45, 0.45];
  LAB.patronRespiracion = function (valor) {
    if (!valor) return [];
    if (/^[\d.,\s]+$/.test(valor)) {
      return valor.split(",").map(Number).map(function (seg, k) { return { f: NOMBRES_RESP[k], s: seg, e: ESCALA_RESP[k] }; })
        .filter(function (x) { return x.s > 0; });
    }
    try { return JSON.parse(valor); } catch (e) { return []; }
  };
  document.querySelectorAll("[data-lab-respiracion]").forEach(function (r) {
    var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var circ = r.querySelector("[data-resp-circulo]"), cuenta = r.querySelector("[data-resp-cuenta]"), fase = r.querySelector("[data-resp-fase]");
    var bEmp = r.querySelector("[data-resp-empezar]"), bFre = r.querySelector("[data-resp-frenar]"), lado = r.querySelector("[data-resp-lado]");
    var confirmar = r.querySelector("[data-resp-confirmar]");
    var tFase = null, tTic = null, ciclos = 0, activo = false;
    var patron = function () {
      var m = r.querySelector("input[type=radio]:checked");
      return LAB.patronRespiracion(m ? (m.getAttribute("data-patron") || m.value) : r.getAttribute("data-patron"));
    };
    var maxCiclos = function () {
      var m = r.querySelector("input[type=radio]:checked");
      return parseInt((m && m.getAttribute("data-ciclos")) || r.getAttribute("data-ciclos") || "0", 10);
    };
    var limpiar = function () { clearTimeout(tFase); clearInterval(tTic); tFase = tTic = null; };
    var frenar = function (msg) {
      limpiar(); activo = false;
      r.classList.remove("en-marcha"); r.removeAttribute("data-lado");
      circ.style.transitionDuration = quieto ? "0s" : "1.2s"; circ.style.transform = "scale(.45)";
      cuenta.textContent = ""; if (lado) lado.textContent = "";
      fase.textContent = msg || "Listo. ¿Cómo te sentís ahora?";
      bEmp.disabled = !puede(); bFre.disabled = true;
    };
    var paso = function (k) {
      var p = patron();
      if (!p.length) return frenar("Elegí una técnica.");
      if (k >= p.length) {
        k = 0; ciclos++;
        var max = maxCiclos();
        if (max && ciclos >= max) { LAB.campana(); return frenar("Terminaste " + max + (max === 1 ? " ciclo" : " ciclos") + ". Volvé a respirar a tu ritmo natural."); }
      }
      var x = p[k], seg = x.s, fin = Date.now() + seg * 1000;
      fase.textContent = x.f + " (" + (seg % 1 ? String(seg).replace(".", ",") : seg) + ")";
      circ.style.transitionDuration = quieto ? "0s" : seg + "s";
      circ.style.transform = "scale(" + (x.e != null ? x.e : 1) + ")";
      if (x.l) { r.setAttribute("data-lado", x.l); if (lado) lado.textContent = x.l === "izq" ? "Tapá la fosa derecha · aire por la izquierda" : "Tapá la fosa izquierda · aire por la derecha"; }
      else { r.removeAttribute("data-lado"); if (lado) lado.textContent = ""; }
      var tic = function () { cuenta.textContent = Math.max(1, Math.ceil((fin - Date.now()) / 1000)); };
      tic(); clearInterval(tTic); tTic = setInterval(tic, 250);
      clearTimeout(tFase); tFase = setTimeout(function () { paso(k + 1); }, seg * 1000);
    };
    /* La confirmación se exige solo si la técnica elegida tiene data-confirmar (o el componente, si no hay radios). */
    var pideConfirmar = function () {
      var m = r.querySelector("input[type=radio]:checked");
      return m ? m.hasAttribute("data-confirmar") : r.hasAttribute("data-confirmar");
    };
    var puede = function () { return !pideConfirmar() || (confirmar && confirmar.checked); };
    var sync = function () { if (!activo) bEmp.disabled = !puede(); };
    if (confirmar) confirmar.addEventListener("change", sync);
    r.addEventListener("change", sync);
    sync();
    bEmp.addEventListener("click", function () {
      if (!puede()) { fase.textContent = "Antes de empezar, leé y confirmá las precauciones."; return; }
      ciclos = 0; activo = true; r.classList.add("en-marcha"); bEmp.disabled = true; bFre.disabled = false; paso(0);
    });
    bFre.addEventListener("click", function () { frenar(); });
    r.addEventListener("change", function (e) {
      if (e.target === confirmar) return;
      if (activo) frenar("Cambiaste la técnica. Tocá «Empezar» para seguir.");
    });
    circ.style.transform = "scale(.45)";
  });

  /* Campana suave con Web Audio (solo suena después de un toque de la persona). */
  var audio = null;
  LAB.campana = function () {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      var t = audio.currentTime;
      [528, 792].forEach(function (f, k) {
        var o = audio.createOscillator(), g = audio.createGain();
        o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(k ? 0.05 : 0.12, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 3.5);
        o.connect(g); g.connect(audio.destination); o.start(t); o.stop(t + 3.6);
      });
    } catch (e) { /* sin audio */ }
  };

  /* Calendario: eventos [{ fecha: Date, titulo, descripcion }] → archivo .ics de día completo. */
  LAB.descargarICS = function (nombre, eventos) {
    var f = function (d) { return d.getFullYear() + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2); };
    var esc = function (t) { return String(t).replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n"); };
    var ahora = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    var l = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Nicolas Bongiorno//Laboratorios//ES", "CALSCALE:GREGORIAN"];
    eventos.forEach(function (ev, k) {
      var fin = new Date(ev.fecha); fin.setDate(fin.getDate() + 1);
      l.push("BEGIN:VEVENT", "UID:" + ahora + "-" + k + "@laboratorios", "DTSTAMP:" + ahora, "DTSTART;VALUE=DATE:" + f(ev.fecha),
        "DTEND;VALUE=DATE:" + f(fin), "SUMMARY:" + esc(ev.titulo), "DESCRIPTION:" + esc(ev.descripcion || ""), "END:VEVENT");
    });
    l.push("END:VCALENDAR");
    LAB.guardarArchivo(nombre, new Blob([l.join("\r\n")], { type: "text/calendar;charset=utf-8" }));
  };

  window.LAB = LAB;
})();
