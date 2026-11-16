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
    { t: "«El grito significa que van a pelear.»", r: "b", e: "Es una predicción a partir de un sonido. Separarla ayuda a no reaccionar a lo que no pasó." },
    { t: "«Vi fotos de las vacaciones de una amiga.»", r: "a", e: "Es lo que viste. La comparación viene después, si la hacés." },
    { t: "«Todos tienen una vida mejor que la mía.»", r: "b", e: "Una conclusión a partir de lo que otros eligen mostrar. Las redes son un recorte, no la vida entera." }
  ]);

  /* Contrapesos para el sesgo de negatividad. */
  LAB.azarLista("contrapeso", [
    "Anotá tres cosas buenas que pasaron hoy, por chicas que sean.",
    "Después de leer una mala noticia, buscá una que muestre a alguien ayudando.",
    "Pasá diez minutos al aire libre mirando algo vivo: árboles, pájaros, el cielo.",
    "Escuchá una canción que elegís vos, de principio a fin, sin hacer otra cosa.",
    "Llamá a alguien con quien siempre te reís.",
    "Silenciá por una semana una cuenta o un grupo que te deja peor.",
    "Antes de dormir, recordá un momento agradable del día con todos sus detalles."
  ]);
})();
