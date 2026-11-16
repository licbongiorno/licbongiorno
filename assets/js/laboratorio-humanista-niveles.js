/* Laboratorio humanista, niveles 1 a 3:
   /laboratorio-humanista-rogers/, /laboratorio-humanista-necesidades/, /laboratorio-humanista-existencial/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Nivel 1: congruente (a) o incongruente (b). */
  LAB.quiz("congruencia", [
    { sinComillas: true, t: "Le dice a su amiga «estoy bien, no pasa nada» mientras siente un nudo en la garganta.", r: "b", e: "Lo que vive por dentro y lo que muestra no coinciden. Es incongruencia." },
    { sinComillas: true, t: "Le dice a su pareja: «Hoy estoy cansado y un poco triste, no sé bien por qué».", r: "a", e: "Nombra lo que siente, aunque no lo entienda del todo. Es congruente." },
    { sinComillas: true, t: "Se ríe de un chiste sobre él que en realidad le dolió.", r: "b", e: "La risa tapa el dolor. Es incongruencia, muchas veces aprendida para ser aceptado." },
    { sinComillas: true, t: "Dice que no quiere ir a la fiesta, y no va.", r: "a", e: "Lo que siente, lo que dice y lo que hace van en la misma dirección." },
    { sinComillas: true, t: "Asegura que le da igual el resultado del examen, pero no puede dormir de los nervios.", r: "b", e: "El cuerpo dice otra cosa que las palabras. Darse cuenta es el primer paso hacia la congruencia." },
    { sinComillas: true, t: "Le dice a su jefe: «Me cuesta decirle esto, pero no estoy de acuerdo con la decisión».", r: "a", e: "Muestra incluso la incomodidad de decirlo. Es una congruencia valiente." }
  ]);

  /* Nivel 2: mapa de necesidades. */
  var mapa = document.querySelector("[data-hn-mapa]");
  if (mapa) {
    var sal = mapa.querySelector("[data-hn-salida]");
    var pintar = function () {
      var l = Array.prototype.map.call(mapa.querySelectorAll("input[type=range]"), function (b) { return { n: b.getAttribute("data-hn"), v: +b.value }; });
      var min = l.slice().sort(function (a, b) { return a.v - b.v; })[0], basicas = l[0].v <= 3 || l[1].v <= 3, t;
      if (basicas) t = "Tus necesidades más básicas están poco cubiertas. Cuando falta lo fisiológico o la seguridad, es lógico que todo lo demás quede en segundo plano: atender eso no es egoísmo, es la base.";
      else if (min.v <= 4) t = "La necesidad que más pide atención es la " + min.n + ". No hace falta tener todo resuelto para trabajarla: elegí un paso pequeño.";
      else t = "Tus necesidades están razonablemente cubiertas. Puede ser un buen momento para darle lugar a lo que te hace crecer, más allá de lo que te falta.";
      sal.textContent = t;
    };
    mapa.addEventListener("input", pintar);
    pintar();
  }

  /* Nivel 2: motivación por déficit (a) o por crecimiento (b). */
  LAB.quiz("motivacion", [
    { t: "Estudio para que nadie piense que soy menos que los demás.", r: "a", e: "Busca llenar una falta de estima. Cuando se logra, no da satisfacción duradera: aparece otra falta." },
    { t: "Estudio porque me apasiona entender cómo funciona esto.", r: "b", e: "La curiosidad no se apaga al satisfacerse: pide más. Es motivación por crecimiento." },
    { t: "Necesito que mi pareja me diga todo el tiempo que me quiere.", r: "a", e: "El amor busca llenar un vacío. Maslow hablaba de amor por déficit." },
    { t: "Me gusta acompañar a mi pareja a crecer en lo que le importa.", r: "b", e: "El amor no busca llenar, sino dar y ver crecer al otro. Maslow lo llamaba amor del ser." },
    { t: "Trabajo horas extra porque tengo miedo de quedarme sin trabajo.", r: "a", e: "Es una necesidad de seguridad. Es legítima, y no es lo mismo que trabajar por vocación." },
    { t: "Pinto los domingos porque pierdo la noción del tiempo y me siento vivo.", r: "b", e: "La actividad vale por sí misma. Es motivación por crecimiento." }
  ]);

  /* Nivel 3: asume (a) o esquiva (b) la elección. */
  LAB.quiz("libertad", [
    { t: "No tengo opción: tengo que seguir en este trabajo.", r: "b", e: "Quizás las opciones son difíciles, pero existen. «Elijo quedarme por ahora porque necesito el ingreso» asume la elección." },
    { t: "Elijo quedarme en este trabajo por ahora, aunque no me guste, porque priorizo la estabilidad.", r: "a", e: "Reconoce que es una elección y qué la motiva. Desde ahí, se puede revisar." },
    { t: "Es culpa de mis padres que yo sea así.", r: "b", e: "El pasado influye, pero ubicar toda la responsabilidad afuera deja sin poder para cambiar." },
    { t: "Mis padres me marcaron, y hoy me toca a mí decidir qué hago con eso.", r: "a", e: "Reconoce la historia y asume la autoría del presente." },
    { t: "Las cosas me pasan, yo no tengo nada que ver.", r: "b", e: "A veces es así, pero muchas veces hay algo nuestro en las situaciones en que nos encontramos." },
    { t: "No sé qué hacer, pero sé que decidir es mío.", r: "a", e: "La incertidumbre no quita la libertad. Asumirla es el primer paso." }
  ]);
})();
