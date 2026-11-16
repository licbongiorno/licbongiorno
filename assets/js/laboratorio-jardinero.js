/* Laboratorio del jardinero interior — /laboratorio-del-jardinero-interior/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Darse cuenta (a) o juicio (b). */
  LAB.quiz("darse-cuenta", [
    { t: "Noto que tengo los hombros tensos cuando hablo con mi jefe.", r: "a", e: "Describe una sensación presente, sin sentencia: eso es darse cuenta. Es el punto de partida." },
    { t: "Soy una persona tensa e incapaz de relajarme.", r: "b", e: "Convierte una sensación en una etiqueta sobre la persona. Lo que sigue suele ser más juicio." },
    { t: "Estoy respirando más rápido y tengo calor en la cara.", r: "a", e: "Observa el cuerpo en tiempo presente. Ahí se puede actuar." },
    { t: "Nunca cuido nada de mí.", r: "b", e: "«Nunca» borra los momentos en que sí lo hiciste. Conviene describir un hecho concreto." },
    { t: "Hoy me sentí cansado después de la reunión.", r: "a", e: "Un hecho del día, sin generalizar. Permite pensar qué lo causó." },
    { t: "Soy un fracaso en todo lo que hago.", r: "b", e: "Una sentencia global que deja poco lugar para cambiar algo concreto." }
  ]);

  /* Práctica de constancia (lo suficientemente bueno). */
  LAB.azarLista("cuidado", [
    "Regá una sola cosa que te nutra hoy, aunque sea cinco minutos.",
    "Elegí un hábito que te desgasta y reducilo a la mitad durante tres días.",
    "Hacé una pausa de un minuto antes de responder un mensaje que te altera.",
    "Anotá una cosa que hiciste bien esta semana, aunque haya sido chica.",
    "Pedí ayuda para una tarea que hoy te pesa y no tendrías que cargar sola o solo.",
    "Dormí una hora más si podés, aunque el resto del día no salga como querías."
  ]);

  /* Malezas y semillas: las listas editables las maneja lab-base.js. */
})();
