/* Laboratorio de asertividad — /laboratorio-de-asertividad/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Pasiva (a), asertiva (b), agresiva (c). */
  LAB.quiz("estilos", [
    { t: "«Ah, bueno, lo que digas. No pasa nada, aunque en realidad me molestó.»", r: "a", e: "Cede para evitar el conflicto y oculta lo que siente. Es pasividad." },
    { t: "«Me molestó que llegaras tarde. ¿Podemos acordar avisar cuando pase algo?»", r: "b", e: "Describe, nombra lo que sintió y pide algo concreto, sin atacar. Es asertiva." },
    { t: "«¡Siempre llegás tarde, sos un desconsiderado!»", r: "c", e: "Ataca a la persona y generaliza. Es agresiva, aunque tenga razón en el reclamo." },
    { t: "«No me sirve que me interrumpas. Termino y después te escucho.»", r: "b", e: "Pone un límite claro y deja la puerta abierta. Es asertiva." },
    { t: "«Está bien, lo que sea, no importa.»", r: "a", e: "Renuncia a lo que necesita y deja al otro sin saber qué pasa. Es pasividad." },
    { t: "«Lo hiciste mal y lo sabés, así que no me vengas con excusas.»", r: "c", e: "Juzga y cierra la conversación. Es agresiva: impone sin dejar lugar al otro." }
  ]);

  /* Situaciones para ensayar. */
  LAB.azarLista("situaciones", [
    "Decirle a un compañero que hoy no podés hacer una tarea extra.",
    "Pedirle a tu familia que respete tu tiempo de descanso.",
    "Decirle a un amigo que te incomodó un comentario que hizo.",
    "Pedir que te devuelvan un favor que te quedó pendiente.",
    "Decirle a tu pareja que necesitás un rato a solas.",
    "Pedirle a un cliente que respete el horario acordado."
  ]);
})();
