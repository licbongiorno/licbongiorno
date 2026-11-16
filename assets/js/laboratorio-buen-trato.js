/* Laboratorio de buen trato y paz — /laboratorio-de-buen-trato/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* GIVE (la relación) = a; FAST (el respeto propio) = b. */
  LAB.quiz("give-fast", [
    { t: "«Escucho sin interrumpir y reconozco lo que te pasa, aunque no esté de acuerdo.»", r: "a", e: "Es validación e interés: GIVE. Cuida el vínculo sin renunciar a tu opinión." },
    { t: "«No voy a pedirte perdón de nuevo por algo que ya aclaramos.»", r: "b", e: "Mantenerse fiel a lo que es justo y evitar disculpas excesivas: FAST." },
    { t: "«No me voy a sumar a esa crítica, y no es algo que comparta.»", r: "b", e: "Decir la verdad y sostener tus valores: FAST, sin atacar, eso sí." },
    { t: "«Vamos a hablarlo sin levantar la voz. Me importa lo que pensás.»", r: "a", e: "Tono gentil y buen ánimo: GIVE. Cuidar la forma es cuidar el vínculo." },
    { t: "«¿Te parece si lo hablamos después de cenar, con más calma?»", r: "a", e: "Propone un espacio sin atacar ni presionar: GIVE, cuidando el tono y el vínculo." }
  ]);

  /* Decir que no en paz (a) o evasión (b). */
  LAB.quiz("decir-no", [
    { t: "«Hoy no puedo ir. Te aviso si cambia algo.»", r: "a", e: "Un no claro, sin excusas largas, con una salida honesta." },
    { t: "«Hoy no sé, después veo… capaz, no sé, ya te digo.»", r: "b", e: "La ambigüedad no es amabilidad: deja al otro esperando y a vos sin decir lo que querés." },
    { t: "«No me sirve, pero gracias por pensar en mí.»", r: "a", e: "Agradece y deja el límite sin ataque ni rodeos." },
    { t: "«Sí, claro, aunque no quiero, así no te enojás.»", r: "b", e: "Ceder para evitar el enojo ajeno es lo contrario de FAST: no te respeta a vos." }
  ]);
})();
