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
    var total = casillas.length;
    var leer = function () { try { return JSON.parse(localStorage.getItem(clave) || "[]"); } catch (e) { return []; } };
    var escribir = function (v) { try { localStorage.setItem(clave, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } };
    var actualizar = function () {
      var hechos = Array.prototype.filter.call(casillas, function (c) { return c.checked; }).map(function (c) { return c.value; });
      if (prog) prog.textContent = hechos.length === total ? "¡" + total + " de " + total + "! Completaste el plan." : hechos.length + " de " + total + " días";
      plan.classList.toggle("completo", hechos.length === total);
      escribir(hechos);
    };
    var guardados = leer();
    casillas.forEach(function (c) { c.checked = guardados.indexOf(c.value) >= 0; c.addEventListener("change", actualizar); });
    var reiniciar = plan.querySelector("[data-lab-plan-reiniciar]");
    if (reiniciar) reiniciar.addEventListener("click", function () { casillas.forEach(function (c) { c.checked = false; }); actualizar(); });
    actualizar();
  });

  /* Quizzes de dos opciones: <div data-lab-quiz="nombreDelBanco"> con [data-lab-quiz-frase], botones [data-lab-quiz-opcion="a|b"],
     [data-lab-quiz-resultado] y [data-lab-quiz-siguiente]. El banco se registra con LAB.quiz(nombre, items),
     donde cada item es { t: "frase", r: "a"|"b", e: "explicación" }. */
  var BANCOS = {};
  LAB.quiz = function (nombre, items) {
    BANCOS[nombre] = items;
    document.querySelectorAll('[data-lab-quiz="' + nombre + '"]').forEach(function (caja) {
      var orden = LAB.mezclar(items), i = 0, aciertos = 0, respondidas = 0;
      var frase = caja.querySelector("[data-lab-quiz-frase]"), res = caja.querySelector("[data-lab-quiz-resultado]");
      var opciones = caja.querySelectorAll("[data-lab-quiz-opcion]"), sig = caja.querySelector("[data-lab-quiz-siguiente]");
      var marcador = caja.querySelector("[data-lab-quiz-marcador]");
      var mostrar = function () {
        var it = orden[i % orden.length];
        LAB.poner(frase, "«" + it.t + "»");
        res.textContent = ""; res.className = "lab-quiz__resultado";
        opciones.forEach(function (o) { o.disabled = false; o.setAttribute("aria-pressed", "false"); o.classList.remove("es-correcta", "es-incorrecta"); });
        sig.hidden = true;
      };
      opciones.forEach(function (o) {
        o.addEventListener("click", function () {
          var it = orden[i % orden.length], elegida = o.getAttribute("data-lab-quiz-opcion"), bien = elegida === it.r;
          respondidas++; if (bien) aciertos++;
          opciones.forEach(function (x) {
            x.disabled = true;
            x.setAttribute("aria-pressed", x === o ? "true" : "false");
            if (x.getAttribute("data-lab-quiz-opcion") === it.r) x.classList.add("es-correcta");
            else if (x === o) x.classList.add("es-incorrecta");
          });
          res.className = "lab-quiz__resultado " + (bien ? "bien" : "revisar");
          res.textContent = (bien ? "Bien. " : "Mirala de nuevo. ") + it.e;
          if (marcador) marcador.textContent = aciertos + " de " + respondidas;
          sig.hidden = false; sig.focus();
        });
      });
      sig.addEventListener("click", function () { i++; mostrar(); });
      mostrar();
    });
  };

  window.LAB = LAB;
})();
