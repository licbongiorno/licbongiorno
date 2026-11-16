/* Gestalt, nivel 3: los experimentos — /laboratorio-gestalt-experimentos/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  var OPS = ["Lenguaje impersonal («uno», «se», «eso»)", "Pregunta que esconde una afirmación", "«No puedo» en lugar de «no quiero»", "Hablar sobre alguien en vez de hablarle", "Un «pero» que borra lo anterior"];
  LAB.quiz("lenguaje", [
    { t: "Uno se cansa de que nadie lo valore.", ops: OPS, r: 0, e: "«Uno» pone distancia. En primera persona: «yo me canso de que no me valoren», y se siente distinto." },
    { t: "¿No te parece que llegaste muy tarde?", ops: OPS, r: 1, e: "Es una opinión disfrazada de pregunta. Afirmación: «Llegaste tarde y me molestó»." },
    { t: "No puedo decirle que no a mi jefe.", ops: OPS, r: 2, e: "Muchas veces es «no quiero arriesgarme a decirle que no». Decirlo así devuelve la elección." },
    { sinComillas: true, t: "En una sesión de pareja: «Él nunca me escucha», mirando al terapeuta.", ops: OPS, r: 3, e: "Habla sobre su pareja, no a su pareja. La regla gestáltica: «Vos nunca me escuchás», mirándolo." },
    { t: "Te quiero, pero me molestó lo que hiciste.", ops: OPS, r: 4, e: "El «pero» resta valor al «te quiero». Con «y» las dos cosas quedan en pie." },
    { t: "Eso me pone nervioso.", ops: OPS, r: 0, e: "«Eso» ubica la causa afuera. «Yo me pongo nervioso cuando…» muestra tu parte." },
    { t: "¿Por qué siempre dejás todo tirado?", ops: OPS, r: 1, e: "No busca una respuesta: es un reproche. «Me molesta encontrar las cosas tiradas» es más honesto." },
    { t: "No puedo dejar de pensar en eso.", ops: OPS, r: 2, e: "A veces es literal. Probá decir «no quiero dejar de pensar en eso» y fijate si algo resuena." }
  ]);

  /* Traductor al lenguaje responsable: reemplazos simples, explicados. */
  var tr = document.querySelector("[data-gx-traductor]");
  if (tr) {
    var inp = tr.querySelector("#gx-frase"), sal = tr.querySelector("[data-gx-salida]"), lista = tr.querySelector("[data-gx-cambios]");
    var REGLAS = [
      { re: /\bno (puedo|se puede)\b/gi, f: function () { return "no quiero"; }, why: "«No puedo» → «no quiero»: revisar si es una elección." },
      { re: /\b(tengo que|hay que|debería|debo)\b/gi, f: function () { return "elijo"; }, why: "«Tengo que» o «debería» → «elijo»: notar si es un mandato o una elección." },
      { re: /,?\s+pero\s+/gi, f: function () { return " y "; }, why: "«Pero» → «y»: que las dos partes queden en pie." }
    ];
    var traducir = function () {
      var t = inp.value.trim().replace(/^[«"]|[»"]$/g, ""), cambios = [];
      lista.innerHTML = "";
      if (!t) { sal.textContent = "Escribí una frase y acá aparece la sugerencia."; return; }
      var nueva = t, pregunta = /^¿.*\?$/.test(t);
      REGLAS.forEach(function (r) {
        var antes = nueva;
        nueva = nueva.replace(r.re, r.f);
        if (nueva !== antes) cambios.push(r.why);
      });
      if (/(^|\s)(uno|una)\s/i.test(nueva) || /^se\s|\sse\s(puede|debe|sabe|dice)/i.test(nueva)) cambios.push("Además, probá decirla en primera persona: cambiá «uno» o «se» por «yo» y ajustá el verbo («uno se cansa» → «yo me canso»).");
      if (/(^|\s)(siempre|nunca)(\s|[.,]|$)/i.test(nueva)) cambios.push("Además, «siempre» y «nunca» generalizan: probá describir una vez concreta.");
      if (/(^|\s)eso me\s/i.test(nueva)) cambios.push("Además, «eso me…» ubica la causa afuera: probá «yo me… cuando…».");
      if (pregunta) {
        nueva = "Pienso que " + nueva.replace(/^¿(no te parece que |por qué )?/i, "").replace(/\?$/, "") + ".";
        cambios.push("Pregunta → afirmación: decir lo que pensás en lugar de preguntarlo.");
      }
      nueva = nueva.charAt(0).toUpperCase() + nueva.slice(1);
      sal.textContent = cambios.length ? "«" + nueva + "»" : "No encontré nada para cambiar. ¿Está en primera persona, sin «no puedo», sin «pero» y sin «siempre» ni «nunca»? Entonces ya es una frase responsable.";
      cambios.forEach(function (c) { var li = document.createElement("li"); li.textContent = c; lista.appendChild(li); });
    };
    inp.addEventListener("input", traducir);
    var EJ = ["Uno no puede decir lo que piensa, pero es lo que hay.", "¿No te parece que siempre llegás tarde?", "Tengo que ir a esa cena, pero no tengo ganas.", "Eso me pone triste y nunca nadie se da cuenta."];
    var k = 0;
    tr.querySelector("[data-gx-ejemplo]").addEventListener("click", function () { inp.value = EJ[k++ % EJ.length]; traducir(); inp.focus(); });
  }

  /* «…y me hago responsable de esto»: se agrega a lo que se escribe en la lista. */
  var caja = document.querySelector('[data-lab-lista-titulo="…y me hago responsable de esto"]');
  if (caja) {
    var ent = caja.querySelector("[data-lle-entrada]");
    var completar = function () {
      var v = ent.value.trim().replace(/^[«"]|[»"]$/g, "").replace(/[.]+$/, "");
      if (v && !/me hago responsable/i.test(v)) ent.value = v + "… y me hago responsable de esto.";
    };
    caja.querySelector("[data-lle-agregar]").addEventListener("click", completar, true);
    ent.addEventListener("keydown", function (e) { if (e.key === "Enter") completar(); }, true);
  }
})();
