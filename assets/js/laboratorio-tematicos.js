/* Laboratorios temáticos: ansiedad social, procrastinación, crianza, trauma, dolor crónico y conductas compulsivas.
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Ansiedad social: piezas del modelo de Clark y Wells. */
  var SOC = ["Atención puesta en uno mismo", "Conducta de seguridad", "Predicción negativa", "Repaso posterior"];
  LAB.quiz("social", [
    { sinComillas: true, t: "Mientras habla en la reunión, solo piensa en si se le nota el temblor de las manos.", ops: SOC, r: 0, e: "La atención está puesta en sí mismo, no en la conversación. Eso aumenta la ansiedad y le quita recursos para hablar." },
    { sinComillas: true, t: "Sostiene el vaso con las dos manos para que nadie vea que tiemblan.", ops: SOC, r: 1, e: "Es una conducta de seguridad: alivia un poco, pero impide comprobar que nadie lo nota o que no importa." },
    { sinComillas: true, t: "Antes de la fiesta piensa: «no voy a saber qué decir y todos van a pensar que soy raro».", ops: SOC, r: 2, e: "Es una predicción negativa que se toma como un hecho. Se puede poner a prueba con un experimento." },
    { sinComillas: true, t: "Esa noche repasa cada cosa que dijo en la cena, buscando qué hizo mal.", ops: SOC, r: 3, e: "Es el repaso posterior: suele terminar en conclusiones más negativas que lo que pasó." },
    { sinComillas: true, t: "Ensaya mentalmente cada frase antes de decirla, y pierde el hilo de lo que dicen los demás.", ops: SOC, r: 1, e: "Ensayar es una conducta de seguridad. Además, lleva la atención hacia adentro." },
    { sinComillas: true, t: "Se imagina a sí mismo desde afuera, rojo y torpe, como si fuera una película.", ops: SOC, r: 0, e: "Es la imagen de uno mismo vista desde afuera, típica de la atención autofocalizada. Suele ser mucho peor que lo que los demás perciben." }
  ]);

  /* Procrastinación: la emoción que se evita. */
  var PRO = ["Aburrimiento", "Miedo a hacerlo mal", "Sentirse desbordado", "Resentimiento"];
  LAB.quiz("procrastinacion", [
    { sinComillas: true, t: "Posterga ordenar los papeles de la casa: es una tarea repetitiva y sin ningún interés.", ops: PRO, r: 0, e: "La tarea es tediosa. Ayuda acompañarla de algo agradable, como música, o hacerla en tandas cortas." },
    { sinComillas: true, t: "Tiene que mandar su currículum y lo revisa tanto que nunca lo envía.", ops: PRO, r: 1, e: "El perfeccionismo y el miedo a ser evaluado. «Hecho» es mejor que «perfecto»." },
    { sinComillas: true, t: "Tiene que escribir la tesis y cada vez que lo piensa no sabe ni por dónde empezar.", ops: PRO, r: 2, e: "La tarea es tan grande que paraliza. Hace falta partirla en pasos muy chicos." },
    { sinComillas: true, t: "Posterga un informe que le encargó un jefe que la trata mal.", ops: PRO, r: 3, e: "A veces postergar es una forma silenciosa de protesta. Conviene mirar el conflicto de fondo." },
    { sinComillas: true, t: "No llama al médico para pedir el turno, aunque sabe que lo necesita.", ops: PRO, r: 1, e: "Muchas veces se evita el miedo a lo que el médico pueda decir. Nombrarlo ayuda a dar el paso." },
    { sinComillas: true, t: "Hace semanas que tiene pendiente responder decenas de correos.", ops: PRO, r: 2, e: "La pila crece y desborda. Un primer paso mínimo: responder solo tres." }
  ]);

  /* Procrastinación: primer paso mínimo. */
  var mi = document.querySelector("[data-pr-minimo]");
  if (mi) {
    var inp = mi.querySelector("#pr-grande"), sal = mi.querySelector("[data-pr-salida]"), k = 0;
    var IDEAS = [
      function (t) { return "Abrí lo que necesitás para " + t + " y dejalo a la vista. Nada más."; },
      function (t) { return "Escribí en un papel los tres primeros pasos para " + t + ", sin hacer ninguno."; },
      function (t) { return "Poné un temporizador de cinco minutos y dedicalos a " + t + ". Cuando suene, podés parar."; },
      function (t) { return "Buscá el primer dato o documento que te pide " + t + " y guardalo en un lugar visible."; },
      function (t) { return "Contale a alguien que hoy vas a dedicarle cinco minutos a " + t + "."; }
    ];
    var armar = function () {
      var t = inp.value.trim().replace(/[.]+$/, "");
      sal.textContent = t ? IDEAS[k % IDEAS.length](t.charAt(0).toLowerCase() + t.slice(1)) : "Escribí la tarea.";
    };
    inp.addEventListener("input", armar);
    mi.querySelector("[data-pr-otro]").addEventListener("click", function () { k++; armar(); });
  }

  /* Crianza: respuestas a las emociones de los hijos. */
  LAB.quiz("crianza", [
    { sinComillas: true, t: "Tu hija llora porque no la invitaron a un cumpleaños.", ops: ["«No llores, no es para tanto.»", "«Qué feo que te dejen afuera. Contame qué pasó.»", "«Bueno, vos tampoco la invitaste a ella.»"], r: 1, e: "Valida la tristeza e invita a contar. Minimizar o explicar enseguida suele cortar la conexión." },
    { sinComillas: true, t: "Tu hijo de cuatro años tira los juguetes porque no puede armar la torre.", ops: ["«¡Basta! Si seguís, te quedás sin juguetes.»", "«Te frustra que se caiga. No vale tirar cosas. ¿Probamos juntos?»", "«Dejá, la armo yo.»"], r: 1, e: "Nombra la emoción, pone un límite a la conducta y ofrece ayuda. Así aprende a tolerar la frustración." },
    { sinComillas: true, t: "Tu hijo tiene miedo de dormir solo porque hay monstruos.", ops: ["«Los monstruos no existen, dormite.»", "«Tenés miedo. Vamos a revisar juntos el cuarto y dejamos una luz chiquita.»", "«Si no te dormís, mañana no hay tele.»"], r: 1, e: "Toma en serio el miedo, aunque su causa no sea real, y ofrece seguridad." },
    { sinComillas: true, t: "Tu hija adolescente dice: «Me odio, soy horrible».", ops: ["«No digas pavadas, sos hermosa.»", "«Parece que te estás sintiendo muy mal con vos. ¿Querés contarme?»", "«Ya se te va a pasar.»"], r: 1, e: "Escucha antes de corregir. Si estas frases se repiten o van acompañadas de aislamiento, conviene consultar." }
  ]);

  /* Dolor crónico: lucha (a) o aceptación (b). */
  LAB.quiz("dolor", [
    { t: "No voy a hacer nada hasta que se me pase el dolor.", r: "a", e: "Esperar a que el dolor desaparezca para vivir puede dejar la vida en pausa indefinidamente." },
    { t: "Hoy me duele. Voy a hacer una versión más corta de mi caminata.", r: "b", e: "Reconoce el dolor y sigue haciendo lo que importa, adaptado." },
    { t: "Tengo que encontrar la forma de que nunca más me duela.", r: "a", e: "Buscar tratamiento está bien; organizar toda la vida alrededor de eliminar el dolor suele agotar." },
    { t: "El dolor está, y también está mi nieta, que quiere jugar conmigo.", r: "b", e: "Hace lugar al dolor sin que ocupe todo. Así la vida sigue teniendo espacio." },
    { t: "No le cuento a nadie cómo estoy, no quiero ser una carga.", r: "a", e: "Esconder el dolor es otra forma de pelear con él. Compartirlo puede aliviar." },
    { t: "No me gusta este dolor, y puedo respirar con él un rato.", r: "b", e: "Es aceptación: no es aprobar el dolor, es dejar de luchar contra él a cada momento." }
  ]);

  /* Conductas compulsivas: la necesidad detrás. */
  var NEC = ["Descansar o desconectar", "Sentirse acompañado", "Calmar una emoción", "Sentir algo, salir del aburrimiento"];
  LAB.quiz("compulsivas", [
    { sinComillas: true, t: "Después de un día agotador, mira videos cortos durante dos horas.", ops: NEC, r: 0, e: "Busca desconectar. Una alternativa: un descanso de verdad, como acostarse sin pantalla o darse una ducha." },
    { sinComillas: true, t: "Cada vez que se pelea con su pareja, compra algo por internet.", ops: NEC, r: 2, e: "La compra calma la angustia un rato. Conviene buscar otra forma de regularla, o hablar del conflicto." },
    { sinComillas: true, t: "Vive solo y revisa las redes sociales apenas se despierta.", ops: NEC, r: 1, e: "Busca sentirse conectado. Una llamada o un encuentro real suelen cubrirlo mejor." },
    { sinComillas: true, t: "Los domingos, sin planes, apuesta en línea «para que pase algo».", ops: NEC, r: 3, e: "Busca emoción ante el vacío. Planear algo que lo entusiasme puede ocupar ese lugar." },
    { sinComillas: true, t: "Come aunque no tenga hambre cuando está nerviosa por el trabajo.", ops: NEC, r: 2, e: "La comida calma la ansiedad. Surfear el impulso o respirar unos minutos puede ayudar." }
  ]);

  /* Conductas compulsivas: señales (no se guarda nada). */
  var cc = document.querySelector("[data-cc-senales]");
  if (cc) {
    var out = cc.querySelector("[data-cc-resultado]");
    cc.addEventListener("change", function () {
      var n = cc.querySelectorAll("input:checked").length;
      out.textContent = !n ? "" : n <= 2
        ? "Marcaste " + n + ". Hay algo para mirar con atención, aunque todavía ocupa un lugar acotado. Los ejercicios de este laboratorio pueden ayudarte."
        : n <= 5
          ? "Marcaste " + n + ". Esta conducta está ocupando bastante espacio en tu vida. Vale la pena trabajarla con constancia, y considerar hablarlo con un profesional."
          : "Marcaste " + n + ". Esta conducta parece estar fuera de tu control. No es falta de voluntad: conviene buscar ayuda. La línea 141 de SEDRONAR orienta las 24 horas, gratis y de forma anónima.";
    });
  }
})();
