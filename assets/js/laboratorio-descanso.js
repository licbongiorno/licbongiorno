/* Laboratorio de descanso y sueño — /laboratorio-de-descanso/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* a = verdad, b = mito */
  LAB.quiz("dormir", [
    { t: "Si no me duermo, lo mejor es quedarme en la cama hasta que llegue el sueño.", r: "b", e: "Quedarse dando vueltas asocia la cama con la vigilia y la frustración. Mejor levantarse y volver cuando aparezca el sueño." },
    { t: "Levantarse siempre a la misma hora, incluso el fin de semana, ayuda a dormir mejor.", r: "a", e: "Un horario fijo para despertar ordena el reloj biológico más que la hora de acostarse." },
    { t: "Una copa de vino a la noche ayuda a dormir mejor.", r: "b", e: "El alcohol ayuda a dormirse, pero fragmenta el sueño y lo vuelve menos reparador." },
    { t: "Mirar el reloj durante la noche empeora el insomnio.", r: "a", e: "Hacer cuentas de las horas que quedan aumenta la ansiedad y aleja el sueño." },
    { t: "Si dormí mal, a la noche siguiente conviene acostarme mucho más temprano para recuperar.", r: "b", e: "Acostarse sin sueño suele llevar a más tiempo despierto en la cama. Mejor mantener el horario." },
    { t: "La luz natural de la mañana ayuda a dormir mejor a la noche.", r: "a", e: "La luz de la mañana sincroniza el reloj interno." },
    { t: "Hacer ejercicio en cualquier momento del día empeora el sueño.", r: "b", e: "El ejercicio regular mejora el sueño. Solo conviene evitar el ejercicio intenso justo antes de acostarse." },
    { t: "Todos necesitamos exactamente ocho horas de sueño.", r: "b", e: "La mayoría de los adultos necesita entre siete y nueve horas, pero hay variación entre personas y edades." },
    { t: "El café de la tarde puede afectar el sueño de la noche.", r: "a", e: "El efecto de la cafeína dura varias horas. El mate también tiene cafeína." },
    { t: "Una siesta larga a la tarde puede hacer que me cueste dormir a la noche.", r: "a", e: "Las siestas cortas, de 20 o 30 minutos y temprano, suelen no afectar. Las largas o tardías, sí." }
  ]);

  /* Diario de sueño: horas en la cama y tiempo dormido estimado. */
  var f = document.querySelector("[data-sueno]");
  if (!f) return;
  var out = f.querySelector("[data-ds-resultado]"), oculto = f.querySelector("[data-ds-oculto]");
  var min = function (v) { if (!v) return null; var p = v.split(":"); return +p[0] * 60 + +p[1]; };
  var hm = function (m) { var h = Math.floor(m / 60), r = m % 60; return h + " h" + (r ? " " + r + " min" : ""); };
  var calcular = function () {
    var a = min(f.querySelector("#ds-acoste").value), l = min(f.querySelector("#ds-levante").value);
    if (a === null || l === null) { out.textContent = "Completá los horarios para ver el cálculo."; oculto.value = ""; return; }
    var cama = l - a; if (cama <= 0) cama += 24 * 60;
    var tarde = +f.querySelector("#ds-tarde").value || 0, desp = +f.querySelector("#ds-despierto").value || 0;
    var dormido = Math.max(cama - tarde - desp, 0), ef = Math.round(dormido * 100 / cama);
    var t = "Tiempo en la cama: " + hm(cama) + ". Tiempo dormido estimado: " + hm(dormido) + ". Eficiencia del sueño: " + ef + " %.";
    t += ef >= 85 ? " Es un buen valor." : " Por debajo de 85 % suele indicar mucho tiempo despierto en la cama: levantarse cuando no llega el sueño y mantener un horario fijo pueden ayudar.";
    out.textContent = t; oculto.value = t;
  };
  f.addEventListener("input", calcular);
  f.addEventListener("change", calcular);
  f.addEventListener("reset", function () { setTimeout(calcular, 0); });
})();
