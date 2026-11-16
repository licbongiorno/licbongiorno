/* DBT, módulo de tolerancia al malestar — /laboratorio-dbt-tolerancia-al-malestar/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Habilidades de crisis (a) o resolver el problema (b). */
  LAB.quiz("crisis", [
    { t: "Son las tres de la mañana, discutiste con tu pareja, que se fue a dormir, y tenés ganas de romper algo.", r: "a", e: "Mucho malestar, un impulso que empeoraría todo y nada que se pueda resolver a esa hora: es momento de habilidades de crisis." },
    { t: "Te diste cuenta de que mañana vence una factura y tenés el dinero.", r: "b", e: "Es un problema con solución inmediata. Lo mejor es resolverlo: pagarla." },
    { t: "Recibiste una mala noticia en el trabajo y tenés ganas de tomar alcohol para no sentir.", r: "a", e: "El impulso aliviaría un rato y agregaría daño. Primero sobrevivir al momento; después pensar qué hacer con la noticia." },
    { t: "Te molesta que tu compañero de casa deje la cocina sucia.", r: "b", e: "Es un problema que se puede conversar y resolver. No hace falta «aguantar»." },
    { t: "Estás en el velorio de un ser querido y sentís que vas a desbordarte.", r: "a", e: "No hay nada que resolver: hay que atravesar el dolor. Las habilidades de crisis y de aceptación ayudan." },
    { t: "Te sentís mal porque te olvidaste del cumpleaños de una amiga ayer.", r: "b", e: "Se puede reparar: escribile hoy. No es una crisis." }
  ]);

  /* Ideas para distraerse. */
  LAB.azarLista("distracciones", [
    "Ordená un cajón o una repisa durante diez minutos.",
    "Escribile a alguien para preguntarle cómo está.",
    "Mirá un video de humor que sepas que te hace reír.",
    "Contá hacia atrás desde 100 de a siete.",
    "Lavate la cara con agua bien fría.",
    "Salí a caminar alrededor de la manzana.",
    "Cociná algo sencillo, siguiendo una receta paso a paso.",
    "Escribí el problema en un papel, guardalo en un sobre y cerralo hasta mañana.",
    "Armá una lista de diez canciones que te gusten.",
    "Hacé un rompecabezas, un crucigrama o un sudoku."
  ]);

  /* Aceptación (a) o rechazo o resignación (b). */
  LAB.quiz("aceptacion", [
    { t: "«Me despidieron. Me duele y me parece injusto. Es lo que pasó; mañana empiezo a buscar.»", r: "a", e: "Reconoce el dolor y la injusticia, no pelea con el hecho y se mueve hacia lo que sigue." },
    { t: "«Esto no puede estar pasando. No es justo. No lo acepto.»", r: "b", e: "Es comprensible, pero pelear contra lo que ya pasó suma sufrimiento al dolor." },
    { t: "«Bueno, ya fue, nada importa, para qué intentar.»", r: "b", e: "Es resignación, no aceptación. Aceptar deja la puerta abierta para actuar." },
    { t: "«Mi hijo tiene esta enfermedad. No la elegí, y voy a acompañarlo lo mejor que pueda.»", r: "a", e: "Acepta la realidad tal como es y desde ahí decide cómo estar." },
    { t: "«Si hubiera hecho otra cosa, esto no habría pasado», repetido cada noche.", r: "b", e: "Volver una y otra vez sobre el pasado es una forma de no aceptarlo. Girar la mente ayuda." },
    { t: "«La relación terminó. Lo extraño, y está terminada.»", r: "a", e: "Aceptar no quita la tristeza: la deja estar sin pelear con el hecho." }
  ]);
})();
