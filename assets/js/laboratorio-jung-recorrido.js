/* Recorrido junguiano y laboratorio de complejos y tipos:
   /laboratorio-recorrido-junguiano/, /laboratorio-de-complejos-y-tipos/
   Requiere lab-base.js. Nada se envía a ningún servidor ni se guarda. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  var OPS = ["Persona", "Sombra", "Complejo", "Arquetipo", "Individuación"];
  LAB.quiz("conceptos-jung", [
    { sinComillas: true, t: "En el trabajo siempre muestra una sonrisa y una eficiencia impecable, aunque por dentro esté agotada.", ops: OPS, r: 0, e: "Es la persona: la máscara que mostramos para adaptarnos al mundo. No es falsa, pero no es todo lo que somos." },
    { sinComillas: true, t: "Le irrita profundamente la gente que se luce, y no ve su propio deseo de ser reconocido.", ops: OPS, r: 1, e: "La sombra: lo propio que no aceptamos y vemos con fuerza en otros." },
    { sinComillas: true, t: "Cada vez que alguien le marca un error, reacciona como si lo acusaran de algo grave.", ops: OPS, r: 2, e: "Un complejo: un núcleo de recuerdos y emociones que se activa con fuerza desproporcionada." },
    { sinComillas: true, t: "En sueños, mitos y cuentos de distintas culturas aparece la figura del sabio anciano que guía al héroe.", ops: OPS, r: 3, e: "Un arquetipo: una forma universal que se expresa en imágenes de muchas culturas." },
    { sinComillas: true, t: "A los cincuenta, empieza a dejar de vivir según lo que se esperaba de él y a desarrollar partes que había postergado.", ops: OPS, r: 4, e: "La individuación: el proceso de llegar a ser quien uno es, integrando lo que quedó afuera." },
    { sinComillas: true, t: "Descubre que admira en otros una creatividad que también tiene, pero nunca se animó a mostrar.", ops: OPS, r: 1, e: "Es la sombra dorada: no solo escondemos lo que rechazamos, también lo valioso que no nos permitimos." }
  ]);

  /* Experimento de asociación: mide el tiempo hasta Enter. */
  var as = document.querySelector("[data-jg-asociacion]");
  if (as) {
    var PAL = ["casa", "madre", "agua", "dinero", "miedo", "padre", "noche", "amigo", "trabajo", "cuerpo", "beso", "enfermo", "hermano", "orgullo", "dormir", "pelea", "niño", "culpa", "fiesta", "solo"];
    var est = as.querySelector("[data-jg-estado]"), pal = as.querySelector("[data-jg-palabra]"), inp = as.querySelector("#jg-respuesta"),
      btn = as.querySelector("[data-jg-empezar]"), res = as.querySelector("[data-jg-resultado]"), lista = as.querySelector("[data-jg-lista]");
    var orden = [], i = 0, t0 = 0, datos = [];
    var mostrar = function () {
      pal.textContent = orden[i];
      est.textContent = "Palabra " + (i + 1) + " de " + orden.length;
      inp.value = ""; inp.focus(); t0 = performance.now();
    };
    var terminar = function () {
      inp.disabled = true; btn.hidden = false; btn.textContent = "Repetir";
      pal.textContent = "—"; est.textContent = "Listo.";
      var top = datos.slice().sort(function (a, b) { return b.ms - a.ms; }).slice(0, 5);
      lista.innerHTML = "";
      top.forEach(function (d) {
        var li = document.createElement("li");
        li.textContent = d.p + " → " + (d.r || "(sin respuesta)") + " · " + (d.ms / 1000).toFixed(1) + " s" + (d.r && d.r.toLowerCase() === d.p ? " (repitió la palabra)" : "");
        lista.appendChild(li);
      });
      res.hidden = false;
    };
    btn.addEventListener("click", function () {
      orden = LAB.unos(PAL, 12); i = 0; datos = []; res.hidden = true; btn.hidden = true; inp.disabled = false; mostrar();
    });
    inp.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" || inp.disabled) return;
      e.preventDefault();
      datos.push({ p: orden[i], r: inp.value.trim(), ms: performance.now() - t0 });
      i++;
      if (i < orden.length) mostrar(); else terminar();
    });
  }

  /* Tipos: función dominante, inferior y actitud. */
  var tp = document.querySelector("[data-jg-tipos]");
  if (tp) {
    var sal = tp.querySelector("[data-jg-tipos-salida]");
    var OPUESTA = { "pensamiento": "sentimiento", "sentimiento": "pensamiento", "sensación": "intuición", "intuición": "sensación" };
    var calc = function () {
      var f = Array.prototype.map.call(tp.querySelectorAll("[data-fn]"), function (b) { return { n: b.getAttribute("data-fn"), v: +b.value }; }).sort(function (a, b) { return b.v - a.v; });
      var act = +tp.querySelector("[data-actitud]").value;
      var actitud = act < 4 ? "introvertida" : act > 6 ? "extravertida" : "más bien equilibrada entre introversión y extraversión";
      if (f[0].v === f[1].v) { sal.textContent = "Tus funciones " + f[0].n + " y " + f[1].n + " están parejas. Probá pensar en cómo resolvés un problema difícil: ¿qué usás primero? Tu actitud parece " + actitud + "."; return; }
      sal.textContent = "Tu función preferida parece ser " + f[0].n + ", con una actitud " + actitud + ". Según Jung, tu función inferior sería " + OPUESTA[f[0].n] + ": la menos desarrollada, y la que suele aparecer de forma torpe bajo estrés.";
    };
    tp.addEventListener("input", calc); calc();
  }
})();
