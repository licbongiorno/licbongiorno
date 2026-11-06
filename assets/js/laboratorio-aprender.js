/* Laboratorio de aprender a aprender — /laboratorio-de-aprender-a-aprender/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* ---------- Mitos y evidencia (a = evidencia, b = mito) ---------- */
  LAB.quiz("mitos", [
    { t: "Cada persona aprende mejor si le enseñan según su estilo: visual, auditivo o kinestésico.", r: "b", e: "Es uno de los mitos más difundidos. Las revisiones no encontraron que adaptar la enseñanza al «estilo» mejore el aprendizaje." },
    { t: "Tratar de recordar sin mirar fortalece más la memoria que volver a leer.", r: "a", e: "Es el «efecto de la evocación» o práctica de recuperación, una de las técnicas con más respaldo." },
    { t: "Releer y subrayar es la forma más eficaz de estudiar.", r: "b", e: "Se siente productivo, pero en la revisión de Dunlosky y colaboradores quedó entre las técnicas de menor utilidad." },
    { t: "Repartir el estudio en varios días rinde más que estudiar todo junto la noche anterior.", r: "a", e: "Es la práctica espaciada. Estudiar todo junto puede servir para el examen de mañana, pero se olvida rápido." },
    { t: "Solo usamos el 10 % del cerebro.", r: "b", e: "Es falso. Usamos todo el cerebro, aunque no todas las áreas a la vez." },
    { t: "Equivocarse al intentar responder, y después ver la respuesta correcta, ayuda a aprender.", r: "a", e: "Intentar antes de saber, aunque se falle, prepara la memoria para la información correcta." },
    { t: "Escuchar música de Mozart hace a los chicos más inteligentes.", r: "b", e: "El llamado «efecto Mozart» se basó en un efecto muy pequeño y pasajero, que además no se replicó de forma consistente." },
    { t: "Mezclar distintos tipos de problemas en una misma sesión mejora el aprendizaje.", r: "a", e: "Es la práctica intercalada: obliga a reconocer qué estrategia usar en cada caso." },
    { t: "Hacer varias cosas a la vez no afecta el estudio si uno está acostumbrado.", r: "b", e: "Cambiar de tarea tiene un costo. Las notificaciones y el celular a mano disminuyen la concentración y el aprendizaje." },
    { t: "Dormir bien después de estudiar ayuda a consolidar lo aprendido.", r: "a", e: "Durante el sueño se consolidan los recuerdos. Trasnochar antes de un examen suele jugar en contra." },
    { t: "Si algo se siente fácil mientras lo estudio, es porque lo estoy aprendiendo bien.", r: "b", e: "La sensación de fluidez engaña. Las «dificultades deseables», como evocar o espaciar, cuestan más y rinden más." }
  ]);

  /* ---------- Evocación activa ---------- */
  var ev = document.querySelector("[data-evocar]");
  if (ev) {
    var fuente = ev.querySelector("#evo-fuente"), fuenteCaja = ev.querySelector("[data-evo-fuente-caja]"), acc1 = ev.querySelector("[data-evo-acciones1]");
    var recCaja = ev.querySelector("[data-evo-recuerdo]"), rec = ev.querySelector("#evo-recuerdo"), cuenta = ev.querySelector("[data-evo-cuenta]");
    var est = ev.querySelector("[data-evo-estado]"), res = ev.querySelector("[data-evo-resultado]"), resumen = ev.querySelector("[data-evo-resumen]");
    var palabras = function (t) { return t.toLowerCase().match(/[a-záéíóúüñ0-9]{4,}/g) || []; };
    var reloj = LAB.temporizador(180, ev.querySelector("[data-evo-reloj]"), function () { est.textContent = "Terminaron los tres minutos. Cuando quieras, compará."; });
    rec.addEventListener("input", function () { var n = rec.value.trim() ? rec.value.trim().split(/\s+/).length : 0; cuenta.textContent = n + (n === 1 ? " palabra" : " palabras"); });
    ev.querySelector("[data-evo-ocultar]").addEventListener("click", function () {
      if (!fuente.value.trim()) { fuente.focus(); fuente.setAttribute("placeholder", "Primero pegá o escribí algo para estudiar"); return; }
      fuenteCaja.hidden = true; acc1.hidden = true; recCaja.hidden = false; res.hidden = true;
      reloj.empezar(); est.textContent = "El texto quedó oculto. Tenés tres minutos."; rec.focus();
    });
    ev.querySelector("[data-evo-comparar]").addEventListener("click", function () {
      reloj.frenar();
      var clave = palabras(fuente.value).filter(function (w, i, a) { return a.indexOf(w) === i; });
      var mias = palabras(rec.value), set = {};
      mias.forEach(function (w) { set[w] = 1; });
      var acertadas = clave.filter(function (w) { return set[w]; });
      var pct = clave.length ? Math.round(acertadas.length * 100 / clave.length) : 0;
      resumen.textContent = "Recuperaste aproximadamente " + pct + " % de las palabras clave del original (" + acertadas.length + " de " + clave.length + "). Es una medida aproximada: lo importante es qué ideas aparecieron y cuáles no.";
      fuenteCaja.hidden = false; res.hidden = false; res.focus && res.setAttribute("tabindex", "-1"); res.focus();
    });
    ev.querySelector("[data-evo-reiniciar]").addEventListener("click", function () {
      reloj.frenar(); rec.value = ""; cuenta.textContent = "0 palabras"; recCaja.hidden = true; res.hidden = true; acc1.hidden = false; fuenteCaja.hidden = false; fuente.focus();
    });
  }

  /* ---------- Repasos espaciados ---------- */
  var esp = document.querySelector("[data-espaciar]");
  if (esp) {
    var tema = esp.querySelector("#esp-tema"), fecha = esp.querySelector("#esp-fecha"), examen = esp.querySelector("#esp-examen");
    var lista = esp.querySelector("[data-esp-lista]"), eEst = esp.querySelector("[data-esp-estado]");
    var DIAS = [1, 3, 7, 14, 30], repasos = [];
    var hoy = new Date();
    var iso = function (d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); };
    var leer = function (v) { var p = v.split("-"); return p.length === 3 ? new Date(+p[0], +p[1] - 1, +p[2]) : null; };
    var bonita = function (d) { return d.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" }); };
    fecha.value = iso(hoy);
    var calcular = function () {
      var base = leer(fecha.value) || hoy, ex = examen.value ? leer(examen.value) : null;
      repasos = DIAS.map(function (n) { var d = new Date(base); d.setDate(d.getDate() + n); return { n: n, d: d }; });
      if (ex) repasos = repasos.filter(function (r) { return r.d < ex; });
      lista.innerHTML = "";
      repasos.forEach(function (r) {
        var li = document.createElement("li");
        li.textContent = "Repaso a los " + r.n + (r.n === 1 ? " día" : " días") + ": " + bonita(r.d);
        lista.appendChild(li);
      });
      if (ex) {
        var li = document.createElement("li"); li.className = "es-examen";
        li.textContent = "Examen: " + bonita(ex) + (repasos.length < DIAS.length ? ". Algunos repasos quedaron después del examen y no se incluyen." : "");
        lista.appendChild(li);
      }
      if (!repasos.length) eEst.textContent = "No entran repasos antes del examen: probá estudiar antes o repasar día por medio.";
      else eEst.textContent = "";
    };
    esp.addEventListener("input", calcular);
    esp.addEventListener("change", calcular);
    esp.addEventListener("submit", function (e) { e.preventDefault(); });
    esp.querySelector("[data-esp-ics]").addEventListener("click", function () {
      if (!repasos.length) { eEst.textContent = "No hay repasos para agregar."; return; }
      var t = tema.value.trim() || "mi tema de estudio";
      LAB.descargarICS("repasos-" + t.toLowerCase().replace(/[^a-z0-9áéíóúñ]+/g, "-").replace(/^-|-$/g, "") + ".ics", repasos.map(function (r) {
        return { fecha: r.d, titulo: "Repaso: " + t, descripcion: "Repaso espaciado (día " + r.n + "). Cerrá el material y tratá de recordar antes de releer." };
      }));
      eEst.textContent = "Listo: abrí el archivo descargado para agregar los repasos a tu calendario.";
    });
    calcular();
  }

  /* ---------- Autoevaluación metacognitiva ---------- */
  var au = document.querySelector("[data-auto]");
  if (au) {
    var PREG = [
      ["Antes de estudiar, me fijo qué es lo que tengo que aprender y para cuándo.", "Antes de empezar, definí qué querés saber al terminar la sesión. Una meta concreta orienta la atención."],
      ["Después de leer, cierro el material y trato de recordar o explicar lo leído.", "Probá la evocación: cerrar el libro y escribir lo que recordás. Es de las técnicas con más evidencia."],
      ["Reparto el estudio en varios días en lugar de dejar todo para el final.", "Usá el planificador de repasos espaciados: rinde más que el atracón de la última noche."],
      ["Me doy cuenta cuando no entiendo algo y cambio de estrategia.", "Cuando algo no entra, probá otra vía: un ejemplo, un dibujo, explicárselo a alguien, otro material."],
      ["Estudio sin el celular a mano ni notificaciones.", "Probá sesiones de 25 minutos con el celular en otra habitación. La concentración cambia mucho."],
      ["Me pongo a prueba con preguntas o ejercicios antes del examen.", "Armá tus propias preguntas de examen y respondelas sin mirar: es entrenar lo mismo que te van a pedir."]
    ];
    var ESCALA = ["Casi nunca", "A veces", "Casi siempre"];
    var cont = au.querySelector("[data-auto-preguntas]");
    cont.innerHTML = PREG.map(function (p, k) {
      return '<fieldset class="lab-auto__pregunta"><legend></legend><div class="opciones">' + ESCALA.map(function (e, j) {
        return '<label class="opcion"><input type="radio" name="au' + k + '" value="' + j + '"><span>' + e + "</span></label>";
      }).join("") + "</div></fieldset>";
    }).join("");
    cont.querySelectorAll("legend").forEach(function (l, k) { l.textContent = (k + 1) + ". " + PREG[k][0]; });
    au.addEventListener("submit", function (e) { e.preventDefault(); });
    au.querySelector("[data-auto-ver]").addEventListener("click", function () {
      var ul = au.querySelector("[data-auto-lista]"), res = au.querySelector("[data-auto-resultado]"), fuertes = 0, sin = 0;
      ul.innerHTML = "";
      PREG.forEach(function (p, k) {
        var m = au.querySelector('input[name="au' + k + '"]:checked');
        if (!m) { sin++; return; }
        if (+m.value === 2) { fuertes++; return; }
        var li = document.createElement("li"); li.textContent = p[1]; ul.appendChild(li);
      });
      var intro = document.createElement("li");
      intro.className = "lab-auto__intro";
      intro.textContent = sin === PREG.length ? "Respondé al menos una pregunta para ver tu devolución." :
        (fuertes ? "Ya tenés " + fuertes + (fuertes === 1 ? " hábito sólido" : " hábitos sólidos") + ". " : "") +
        (ul.children.length ? "Para mejorar, probá esto:" : "¡Muy bien! Tus hábitos de estudio están muy alineados con lo que dice la investigación.");
      ul.prepend(intro);
      res.hidden = false; res.focus();
    });
  }
})();
