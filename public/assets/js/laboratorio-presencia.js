/* Laboratorio de presencia — /laboratorio-de-presencia/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;
  var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Respiración guiada ---------- */
  var r = document.querySelector("[data-respiracion]");
  if (r) {
    var circ = r.querySelector("[data-resp-circulo]"), cuenta = r.querySelector("[data-resp-cuenta]"), fase = r.querySelector("[data-resp-fase]");
    var bEmp = r.querySelector("[data-resp-empezar]"), bFre = r.querySelector("[data-resp-frenar]");
    var NOMBRES = ["Inhalá", "Sostené", "Exhalá", "Pausa"], ESCALA = [1, 1, 0.45, 0.45];
    var id = null, ciclos = 0;
    var ritmo = function () { return r.querySelector('input[name="resp-ritmo"]:checked').value.split(",").map(Number); };
    var frenar = function (msg) {
      clearTimeout(id); clearInterval(id); id = null;
      r.classList.remove("en-marcha");
      circ.style.transitionDuration = quieto ? "0s" : "1.2s"; circ.style.transform = "scale(.45)";
      cuenta.textContent = ""; fase.textContent = msg || "Listo. ¿Cómo te sentís ahora?";
      bEmp.disabled = false; bFre.disabled = true;
    };
    var paso = function (k) {
      var t = ritmo();
      while (t[k] === 0) k = (k + 1) % 4;
      if (k === 0) ciclos++;
      var seg = t[k];
      fase.textContent = NOMBRES[k] + " (" + seg + ")";
      circ.style.transitionDuration = quieto ? "0s" : seg + "s";
      circ.style.transform = "scale(" + ESCALA[k] + ")";
      var resto = seg; cuenta.textContent = resto;
      clearInterval(id);
      id = setInterval(function () {
        resto--;
        if (resto > 0) { cuenta.textContent = resto; return; }
        clearInterval(id);
        paso((k + 1) % 4);
      }, 1000);
    };
    bEmp.addEventListener("click", function () {
      ciclos = 0; r.classList.add("en-marcha"); bEmp.disabled = true; bFre.disabled = false; paso(0);
    });
    bFre.addEventListener("click", function () { frenar(); });
    r.addEventListener("change", function () { if (id) { frenar("Cambiaste el ritmo. Tocá «Empezar» para seguir."); } });
    circ.style.transform = "scale(.45)";
  }

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
