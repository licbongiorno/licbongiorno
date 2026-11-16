/* Laboratorio de no violencia hacia uno mismo — /laboratorio-de-no-violencia-interior/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Autocrítica que ayuda (a) o autoagresión (b). */
  LAB.quiz("autocritica", [
    { t: "Me olvidé de devolver el llamado. Le escribo ahora y me disculpo.", r: "a", e: "Reconocer el error y reparar es autocrítica que ayuda: deja un paso concreto." },
    { t: "Soy un inútil, nunca hago nada bien.", r: "b", e: "Es una generalización que no abre ningún camino. Solo castiga." },
    { t: "Me equivoqué en el informe. Lo reviso antes de entregarlo.", r: "a", e: "Se responsabiliza y propone una corrección. Eso es lo que la autocrítica útil tiene de bueno." },
    { t: "Todo lo que toco se arruina, no sé para qué me esfuerzo.", r: "b", e: "«Todo» y «siempre» son palabras de la autoagresión: borran cualquier intento de mejorar." },
    { t: "Esto me cuesta. Probablemente necesito pedir ayuda.", r: "a", e: "Nombra la dificultad sin insultarse y deja abierta una salida." },
    { t: "Sos un desastre, así nunca vas a llegar a nada.", r: "b", e: "Un insulto con pronóstico. Lo que sigue es rendirse, no mejorar." }
  ]);

  /* Trato firme y respetuoso (a) o complacencia (b). */
  LAB.quiz("reemplazo", [
    { t: "«Es lógico que estés enojado con vos mismo. Ahora pensemos qué sigue.»", r: "a", e: "Valida la reacción y mueve hacia un paso. Eso es firmeza con respeto." },
    { t: "«No pasa nada, no te preocupes, no fue tan grave.»", r: "b", e: "Minimizar sin reconocer el hecho es complacencia. Tranquiliza un rato, pero no ayuda a reparar." },
    { t: "«Me equivoqué. Puedo corregirlo y aprender algo.»", r: "a", e: "Sostiene la responsabilidad sin castigo: la forma de hablarte que mejor cambia lo que sigue." },
    { t: "«Siempre hago lo mismo. Ya sé cómo termina esto.»", r: "b", e: "Anticipa un final de fracaso y convierte el error en identidad. No es firme: es fatalista." }
  ]);
})();
