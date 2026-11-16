/* Laboratorio de asertividad — /laboratorio-de-asertividad/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Pasiva (a), asertiva (b), agresiva (c), pasivo-agresiva (d). */
  LAB.quiz("estilos", [
    { t: "«Ah, bueno, lo que digas. No pasa nada, aunque en realidad me molestó.»", r: "a", e: "Cede para evitar el conflicto y oculta lo que siente. Es pasividad." },
    { t: "«Me molestó que llegaras tarde. ¿Podemos acordar avisar cuando pase algo?»", r: "b", e: "Describe, nombra lo que sintió y pide algo concreto, sin atacar. Es asertiva." },
    { t: "«¡Siempre llegás tarde, sos un desconsiderado!»", r: "c", e: "Ataca a la persona y generaliza. Es agresiva, aunque tenga razón en el reclamo." },
    { t: "«No, no me molesta… Total, como siempre, lo hago yo.»", r: "d", e: "Dice que no le molesta y castiga con una indirecta. Es pasivo-agresiva: el enojo sale, pero de costado." },
    { t: "«No me sirve que me interrumpas. Termino y después te escucho.»", r: "b", e: "Pone un límite claro y deja la puerta abierta. Es asertiva." },
    { t: "«Está bien, lo que sea, no importa.»", r: "a", e: "Renuncia a lo que necesita y deja al otro sin saber qué pasa. Es pasividad." },
    { t: "«Lo hiciste mal y lo sabés, así que no me vengas con excusas.»", r: "c", e: "Juzga y cierra la conversación. Es agresiva: impone sin dejar lugar al otro." },
    { t: "«Sí, sí, ahora lo hago», y después no lo hace a propósito.", r: "d", e: "Acepta de palabra y resiste con la acción. Es pasivo-agresiva: evita el conflicto abierto, pero lo traslada." },
    { t: "«Prefiero no ir a la cena. Gracias por invitarme.»", r: "b", e: "Dice lo que quiere sin justificarse de más y con amabilidad. Es asertiva." }
  ]);

  /* Guion de tres partes: arma la frase a medida que se escribe. */
  var g = document.querySelector("[data-as-guion]");
  if (g) {
    var sal = g.querySelector("[data-as-salida]");
    var v = function (id) { return g.querySelector("#" + id).value.trim().replace(/^[«"]|[»"]$/g, "").replace(/[.]+$/, ""); };
    var may = function (t) { return t.replace(/^([¿¡«"\s]*)(\S)/, function (m, a, b) { return a + b.toUpperCase(); }); };
    var armar = function () {
      var p = v("as-paso"), s = v("as-siento"), d = v("as-pido"), partes = [];
      if (p) partes.push(may(p) + ".");
      if (s) partes.push(may(s) + ".");
      if (d) partes.push(may(d) + (/[?!]$/.test(d) ? "" : "."));
      sal.textContent = partes.length ? "«" + partes.join(" ") + "»" : "Completá los pasos y acá aparece tu mensaje.";
    };
    g.addEventListener("input", armar);
  }

  /* Situaciones para ensayar. */
  LAB.azarLista("situaciones", [
    "Decirle a un compañero que hoy no podés hacer una tarea extra.",
    "Pedirle a tu familia que respete tu tiempo de descanso.",
    "Decirle a un amigo que te incomodó un comentario que hizo.",
    "Pedir que te devuelvan un dinero que prestaste.",
    "Decirle a tu pareja que necesitás un rato a solas.",
    "Pedirle a un cliente que respete el horario acordado.",
    "Devolver un producto que vino fallado.",
    "Pedirle a tu jefe que aclare una tarea que no entendiste.",
    "Decirle a un familiar que no vas a hablar de un tema en la mesa.",
    "Responder a una crítica injusta sin atacar ni callarte."
  ]);
})();
