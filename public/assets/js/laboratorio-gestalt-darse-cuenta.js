/* Gestalt, nivel 1: el darse cuenta — /laboratorio-gestalt-darse-cuenta/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Aquí y ahora (a), pasado (b), futuro (c). */
  LAB.quiz("aqui-ahora", [
    { t: "Siento el peso de mi cuerpo sobre la silla.", r: "a", e: "Es una sensación presente. Estás aquí y ahora." },
    { t: "Si no hubiera dicho eso en la reunión, todo sería distinto.", r: "b", e: "La atención está en el pasado. El darse cuenta sería: «ahora estoy recordando la reunión y siento culpa»." },
    { t: "Seguro mañana me va a ir mal en la entrevista.", r: "c", e: "Es una anticipación. Darse cuenta sería: «ahora estoy imaginando la entrevista y siento miedo»." },
    { t: "Ahora estoy recordando a mi abuela y me emociono.", r: "a", e: "El recuerdo aparece, pero vos te das cuenta de que estás recordando, ahora. Es aquí y ahora." },
    { t: "Cuando me jubile voy a poder descansar.", r: "c", e: "La vida se posterga hacia el futuro. ¿Qué descanso es posible hoy?" },
    { t: "Escucho la lluvia y noto que me tranquiliza.", r: "a", e: "Un estímulo presente y su efecto en vos. Aquí y ahora." },
    { t: "Siempre fui así, desde chico.", r: "b", e: "Explica el presente con el pasado. La Gestalt preguntaría: «¿cómo lo hacés ahora?»." }
  ]);

  /* Cambio paradójico (a) o forzado (b). */
  LAB.quiz("paradoja", [
    { t: "Me doy cuenta de lo tímido que soy en las reuniones. Me quedo un rato sintiéndolo, sin pelearme con eso.", r: "a", e: "Reconoce lo que es, sin forzar. Desde ahí, algo puede moverse." },
    { t: "Tengo que dejar de ser tan ansioso. Me obligo a estar tranquilo.", r: "b", e: "Pelear contra la ansiedad suele aumentarla. Beisser diría: primero, ser plenamente ansioso, darte cuenta de cómo lo sos." },
    { t: "Estoy triste. Me doy permiso para estarlo hoy.", r: "a", e: "Aceptar la tristeza le permite seguir su curso." },
    { t: "No quiero sentir celos, así que hago de cuenta que no me importa.", r: "b", e: "Negar una parte la deja trabajando desde el fondo. Darse cuenta de los celos es el primer paso para que cambien." },
    { t: "Me doy cuenta de que me exijo mucho. Quiero conocer cómo lo hago antes de cambiarlo.", r: "a", e: "Explorar el «cómo» con curiosidad es la actitud gestáltica." },
    { t: "Voy a ser otra persona a partir del lunes.", r: "b", e: "Intentar ser lo que no se es suele terminar en frustración. El cambio empieza por quien sos hoy." }
  ]);
})();
