/* Laboratorio del perdón y el cierre — /laboratorio-del-perdon/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Es perdonar (a) o es otra cosa (b). */
  LAB.quiz("que-es", [
    { t: "Ya no le deseo mal, aunque lo que hizo sigue estando mal.", r: "a", e: "Suelta el resentimiento sin negar el daño. Eso es perdonar." },
    { t: "Lo perdono, así que hago como si nada hubiera pasado.", r: "b", e: "Es olvidar o negar. Perdonar no borra lo que pasó ni obliga a hacer de cuenta." },
    { t: "Lo perdoné, y aun así sigo adelante con la denuncia.", r: "a", e: "Perdonar no es renunciar a la justicia. Se pueden sostener las dos cosas." },
    { t: "Lo perdono porque en realidad no fue para tanto.", r: "b", e: "Es minimizar. Si no fue para tanto, no habría nada que perdonar; el perdón empieza por reconocer el daño." },
    { t: "Lo perdoné, pero no voy a volver a la relación.", r: "a", e: "Perdón no es reconciliación. Se puede perdonar y mantener distancia." },
    { t: "Tengo que perdonarlo porque es mi padre.", r: "b", e: "Un perdón por obligación suele tapar el dolor. El perdón genuino es una elección." },
    { t: "Entiendo lo que lo llevó a hacerlo, y eso no lo justifica.", r: "a", e: "Comprender sin justificar es parte del trabajo del perdón." }
  ]);
})();
