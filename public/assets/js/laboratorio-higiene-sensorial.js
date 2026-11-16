/* Laboratorio de higiene sensorial — /laboratorio-de-higiene-sensorial/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Estímulo (a) o interpretación (b). */
  LAB.quiz("estimulo", [
    { t: "«Llegó un mensaje corto y sin saludo.»", r: "a", e: "Lo que llegó es el mensaje. Qué significa es otra cosa." },
    { t: "«Me escribió sin saludar: seguro está enojado conmigo.»", r: "b", e: "La conclusión sobre el enojo es una interpretación. Puede ser cierta o no: conviene chequearla." },
    { t: "«La noticia dice que hubo un accidente en la ruta.»", r: "a", e: "Es un dato informado. Lo que sigue depende de lo que concluyas." },
    { t: "«Siempre pasan cosas malas: el mundo es un desastre.»", r: "b", e: "Una generalización sobre el mundo a partir de algunos titulares: interpretación." },
    { t: "«En el video se escucha un grito fuerte.»", r: "a", e: "Es lo que se oye. Todavía no sabemos qué lo provocó." },
    { t: "«El grito significa que van a pelear.»", r: "b", e: "Es una predicción a partir de un sonido. Separarla ayuda a no reaccionar a lo que no pasó." }
  ]);
})();
