/* Laboratorio humanista — /laboratorio-humanista/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  var q = function (t, ops, r, e) { return { t: t, ops: ops, r: r, e: e }; };
  LAB.quiz("empatica", [
    q("Estoy agotada, siento que nadie en casa me ayuda.", ["Tenés que poner límites, hacé una lista de tareas.", "Parece que estás muy cansada y sola con todo lo de la casa.", "Bueno, a todos nos pasa, es normal."], 1, "Devuelve lo que la persona siente sin aconsejar ni minimizar. El consejo puede venir después, si lo pide."),
    q("No sé si seguir en este trabajo.", ["Sentís que estás en una encrucijada y no tenés claro qué querés.", "Yo que vos me quedo, está difícil conseguir trabajo.", "¿Otra vez con eso? Siempre dudás."], 0, "Refleja la duda sin empujar hacia una decisión ni juzgar."),
    q("Me fue mal en el examen, soy un desastre.", ["No digas eso, sos re inteligente.", "La próxima estudiá más.", "Te pegó fuerte el resultado y te estás tratando con mucha dureza."], 2, "Reconoce el dolor y la autocrítica sin taparlos con elogios ni sermones."),
    q("Extraño mucho a mi papá desde que murió.", ["Ya va a pasar, el tiempo cura todo.", "Lo extrañás mucho; se nota cuánto lo querías.", "Tendrías que salir más para distraerte."], 1, "Acompaña la tristeza en lugar de apurarla."),
    q("Mi mejor amiga no me invitó a su cumpleaños.", ["Seguro fue un error, no te hagas problema.", "Qué mala amiga, yo no le hablaría más.", "Te dolió quedar afuera, sobre todo viniendo de ella."], 2, "Nombra la emoción y su contexto, sin juzgar a la amiga ni minimizar lo que pasó."),
    q("Tengo miedo de no ser un buen padre.", ["Te preocupa mucho hacerlo bien por tu hijo.", "Todos los padres se equivocan, relajate.", "Leé tal libro de crianza, te va a ayudar."], 0, "Refleja el miedo y el cuidado que hay detrás.")
  ]);

  var f = document.querySelector("[data-yo-real]");
  if (f) {
    var r = f.querySelector("#yr-distancia"), v = f.querySelector("[data-yr-valor]"), t = f.querySelector("[data-yr-texto]");
    var pintar = function () {
      var n = +r.value; v.textContent = n;
      t.textContent = n <= 3 ? "Bastante cerca: hay congruencia entre cómo sos y cómo te gustaría ser." :
        n <= 6 ? "Una distancia intermedia: vale la pena revisar qué «debería» son tuyos y cuáles heredaste." :
        "Mucha distancia: es posible que estés exigiéndote ser alguien que no sos. Ahí suele estar buena parte del malestar.";
    };
    r.addEventListener("input", pintar); pintar();
  }
})();
