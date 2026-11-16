/* Laboratorio de psicotanatología — /laboratorio-de-psicotanatologia/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Mito (a) o realidad (b). */
  LAB.quiz("mitos", [
    { t: "El duelo pasa por cinco etapas, siempre en el mismo orden.", r: "a", e: "Las etapas de Kübler-Ross surgieron con personas que iban a morir, y ella misma aclaró que no son una secuencia fija. El duelo va y viene." },
    { t: "Para hacer bien el duelo hay que soltar y olvidar a quien murió.", r: "a", e: "Muchas personas sanas mantienen un vínculo interno con quien murió. No se trata de olvidar, sino de darle otro lugar." },
    { t: "Se puede sentir alivio cuando muere alguien que sufría mucho, y eso no quita el amor.", r: "b", e: "El alivio es frecuente después de una enfermedad larga. Convive con la tristeza y no habla mal de quien lo siente." },
    { t: "Al año, el duelo tiene que estar terminado.", r: "a", e: "No hay plazos universales. Lo que importa no es cuánto dura, sino si con el tiempo el dolor se vuelve más llevadero." },
    { t: "Los chicos también hacen duelo, a su manera.", r: "b", e: "Los chicos hacen duelo, a veces de forma intermitente o a través del juego. Necesitan información clara y adultos que los acompañen." },
    { t: "Hablar de la muerte con un enfermo grave lo deprime y le quita esperanza.", r: "a", e: "Muchas personas que van a morir agradecen poder hablar. El silencio suele dejarlas más solas." },
    { t: "Se puede empezar a hacer el duelo antes de que la persona muera.", r: "b", e: "Es el duelo anticipado: frecuente ante enfermedades largas o demencias." }
  ]);
})();
