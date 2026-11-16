/* Laboratorio de psicosíntesis — /laboratorio-de-psicosintesis/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  var OPS = ["Voluntad fuerte: la energía para sostener", "Voluntad hábil: la estrategia para facilitar", "Voluntad buena: que sea bueno para mí y para otros"];
  LAB.quiz("voluntad", [
    { sinComillas: true, t: "Sabe que quiere estudiar, tiene el plan armado, pero a los diez minutos abandona.", ops: OPS, r: 0, e: "Hay claridad y estrategia, pero falta energía para sostener. Se entrena con actos pequeños y repetidos." },
    { sinComillas: true, t: "Se obliga a ir al gimnasio a las seis de la mañana, odiándolo, y a la semana deja.", ops: OPS, r: 1, e: "Hay fuerza, pero falta habilidad: buscar un horario, una actividad o una compañía que lo haga más llevadero." },
    { sinComillas: true, t: "Consigue todo lo que se propone, aunque tenga que pasar por encima de los demás.", ops: OPS, r: 2, e: "Hay fuerza y habilidad, pero falta la voluntad buena: que lo que se quiere tenga en cuenta a otros." },
    { sinComillas: true, t: "Tiene mucha energía y buenas intenciones, pero se lanza a hacer todo sin ningún plan y se frustra.", ops: OPS, r: 1, e: "Hay fuerza y bondad, pero falta habilidad: ordenar, priorizar, preparar el terreno." },
    { sinComillas: true, t: "Tiene buenas intenciones con su familia, pero nunca encuentra la forma de concretarlas.", ops: OPS, r: 1, e: "Hay voluntad buena, pero falta la hábil: transformar la intención en pasos concretos." }
  ]);

  LAB.azarLista("palabras", ["Serenidad", "Coraje", "Gratitud", "Paciencia", "Alegría", "Confianza", "Compasión", "Claridad", "Libertad", "Ternura", "Entusiasmo", "Armonía", "Humor", "Generosidad", "Calma", "Belleza"]);
})();
