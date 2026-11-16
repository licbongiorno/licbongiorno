/* Logoterapia, niveles 1 a 3:
   /laboratorio-logoterapia-voluntad-de-sentido/, /laboratorio-logoterapia-tecnicas/, /laboratorio-logoterapia-optimismo-tragico/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Nivel 1: vacío (a) o sentido (b). */
  LAB.quiz("vacio", [
    { t: "Hago lo que hacen todos; no sé bien qué quiero, pero así no me equivoco.", r: "a", e: "Es el conformismo que Frankl describía: llenar el vacío haciendo lo que hacen los demás." },
    { t: "Los domingos no sé qué hacer y me agarra una angustia rara.", r: "a", e: "Frankl hablaba de una «neurosis del domingo»: cuando se detiene la rutina, aparece el vacío." },
    { t: "Mi trabajo es duro, pero sé para qué lo hago: mis hijos pueden estudiar.", r: "b", e: "Hay un para qué que sostiene, aun en lo difícil." },
    { t: "Necesito algo nuevo todo el tiempo: otra serie, otra compra, otra salida.", r: "a", e: "La búsqueda constante de estímulos puede ser una forma de no escuchar el vacío." },
    { t: "Cuido a mi madre enferma. Es agotador, y es lo que hoy me toca hacer con amor.", r: "b", e: "Encuentra sentido en una tarea que no eligió, pero asume." },
    { t: "Hago lo que me dicen; que otros decidan.", r: "a", e: "Es la otra salida falsa que describía Frankl: hacer lo que otros quieren." }
  ]);

  /* Nivel 2: las tres trampas. */
  var OPS = ["Ansiedad anticipatoria", "Hiperintención", "Hiperreflexión"];
  LAB.quiz("trampas", [
    { sinComillas: true, t: "Le tiene tanto miedo a quedarse en blanco en el examen que, cuando llega, se queda en blanco.", ops: OPS, r: 0, e: "El miedo a que pase provoca lo que se temía. Es ansiedad anticipatoria." },
    { sinComillas: true, t: "Se esfuerza tanto por dormirse que cada noche está más despierto.", ops: OPS, r: 1, e: "Querer dormir con tanta fuerza lo vuelve imposible. Es hiperintención." },
    { sinComillas: true, t: "En una cita, está tan pendiente de si está disfrutando que no logra disfrutar.", ops: OPS, r: 2, e: "Observarse tanto arruina la experiencia. Es hiperreflexión." },
    { sinComillas: true, t: "Teme que le tiemble la mano al firmar en el banco, y le tiembla.", ops: OPS, r: 0, e: "El temor anticipado produce el síntoma. Es ansiedad anticipatoria." },
    { sinComillas: true, t: "Quiere ser feliz a toda costa y cada día se siente más frustrada.", ops: OPS, r: 1, e: "Para Frankl, la felicidad es un efecto, no un objetivo. Perseguirla directamente es hiperintención." },
    { sinComillas: true, t: "Mientras habla en una reunión, analiza cada palabra que dice y pierde el hilo.", ops: OPS, r: 2, e: "La atención puesta en sí mismo en lugar de en lo que quiere comunicar. Es hiperreflexión." }
  ]);

  /* Nivel 2: armar una frase paradójica. */
  var pa = document.querySelector("[data-lt-paradoja]");
  if (pa) {
    var inp = pa.querySelector("#lt-temo"), sal = pa.querySelector("[data-lt-salida]"), k = 0;
    var MOLDES = [
      function (t) { return "Hoy me propongo " + t + " como nunca antes. Que quede en la historia: el mejor " + t + " del que se tenga memoria."; },
      function (t) { return "Bueno, si va a pasar, que pase a lo grande: voy a " + t + " tres veces seguidas, para que valga la pena."; },
      function (t) { return "Hoy entreno para el campeonato mundial de " + t + ". Voy a dar lo mejor de mí."; }
    ];
    var armar = function () {
      var t = inp.value.trim().replace(/^[«"]|[»".]$/g, "").replace(/^(que )?(me )?/i, "");
      sal.textContent = t ? "«" + MOLDES[k % MOLDES.length](t.charAt(0).toLowerCase() + t.slice(1)) + "»" : "Escribí lo que temés.";
    };
    inp.addEventListener("input", armar);
    pa.querySelector("[data-lt-otra]").addEventListener("click", function () { k++; armar(); });
  }
})();
