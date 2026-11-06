/* Laboratorio de presencia — /laboratorio-de-presencia/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* La respiración guiada la maneja lab-base.js ([data-lab-respiracion]). */

  /* ---------- Temporizador con campana ---------- */
  var tz = document.querySelector("[data-pres-temporizador]");
  if (tz) {
    var reloj = tz.querySelector("[data-pres-reloj]"), est = tz.querySelector("[data-pres-estado]");
    var be = tz.querySelector("[data-pres-empezar]"), bf = tz.querySelector("[data-pres-frenar]"), tm = null;
    var minutos = function () { return parseInt(tz.querySelector('input[name="pres-min"]:checked').value, 10); };
    var preparar = function () {
      if (tm && tm.activo()) return;
      tm = LAB.temporizador(minutos() * 60, reloj, function () {
        LAB.campana(); est.textContent = "Terminó la práctica."; be.disabled = false; bf.disabled = true;
      });
      reloj.textContent = LAB.mmss(minutos() * 60);
    };
    tz.addEventListener("change", preparar);
    be.addEventListener("click", function () {
      preparar(); LAB.campana(); tm.empezar();
      est.textContent = "Empezó la práctica de " + minutos() + (minutos() === 1 ? " minuto." : " minutos.");
      be.disabled = true; bf.disabled = false;
    });
    bf.addEventListener("click", function () { tm.frenar(); est.textContent = "Práctica detenida."; be.disabled = false; bf.disabled = true; });
    preparar();
  }
})();
