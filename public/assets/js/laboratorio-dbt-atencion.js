/* DBT, módulo de atención plena — /laboratorio-dbt-atencion-plena/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Mente emocional (a), razonable (b), sabia (c). */
  LAB.quiz("estados", [
    { t: "«Estoy furioso y voy a renunciar hoy mismo.»", r: "a", e: "La emoción decide sola y empuja a actuar ya. Es la mente emocional." },
    { t: "«Llorar no sirve para nada, así que sigo trabajando.»", r: "b", e: "La lógica deja afuera lo que sentís. Es la mente razonable." },
    { t: "«Estoy muy enojado. Voy a esperar a mañana para decidir si renuncio.»", r: "c", e: "Reconoce la emoción y elige un momento mejor para decidir. Es la mente sabia." },
    { t: "«Hice una planilla con pros y contras de dejar a mi pareja, y lo que siento no entra en la cuenta.»", r: "b", e: "Analizar está bien, pero sin la emoción falta información. Es la mente razonable." },
    { t: "«Me da miedo, y aun así sé que quiero intentarlo.»", r: "c", e: "Integra el miedo con lo que importa. Es la mente sabia." },
    { t: "«Si no me llama ya, es porque me odia.»", r: "a", e: "Los hechos se acomodan a la emoción. Es la mente emocional." }
  ]);

  /* Descripción (a) o interpretación (b). */
  LAB.quiz("describir", [
    { t: "«Siento el corazón acelerado y las manos frías.»", r: "a", e: "Son sensaciones observables. Es una descripción." },
    { t: "«Mi compañera me miró con desprecio.»", r: "b", e: "«Desprecio» es lo que creés que hay en la mirada. Describir sería: «me miró y no me saludó»." },
    { t: "«Hay un pensamiento que dice que me va a ir mal.»", r: "a", e: "Describe el pensamiento como pensamiento, sin tomarlo como un hecho. Es una descripción muy útil." },
    { t: "«Me va a ir mal.»", r: "b", e: "Es una predicción tomada como verdad. Es una interpretación." },
    { t: "«Mi hijo dejó la ropa en el piso tres días seguidos.»", r: "a", e: "Un hecho concreto y verificable. Es una descripción." },
    { t: "«Mi hijo es un desconsiderado.»", r: "b", e: "Es un juicio sobre la persona. Describir sería decir qué hizo." }
  ]);
})();
