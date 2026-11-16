/* DBT, módulo de efectividad interpersonal — /laboratorio-dbt-efectividad-interpersonal/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  var OPS = ["Conseguir lo que quiero", "Cuidar la relación", "Cuidar mi respeto propio"];

  /* Qué priorizar: índice de la opción. */
  LAB.quiz("prioridad", [
    { t: "El vendedor te cobró de más y querés que te devuelvan la diferencia.", ops: OPS, r: 0, e: "Con un desconocido, lo central es el objetivo: que te devuelvan el dinero. DEAR MAN es la herramienta." },
    { t: "Tu mejor amiga te pide que la acompañes a un lugar al que no tenés muchas ganas de ir, y está pasando un mal momento.", ops: OPS, r: 1, e: "El vínculo pesa más que tu preferencia en este caso. GIVE ayuda a decir sí o no cuidándola." },
    { t: "Un compañero te pide que le cubras una mentira al jefe.", ops: OPS, r: 2, e: "Lo que está en juego son tus valores. FAST: ser veraz y fiel a lo que creés." },
    { t: "Tu pareja quiere que pasen todas las fiestas con su familia y vos querés alternar.", ops: OPS, r: 1, e: "Hay un objetivo, pero el vínculo es de largo plazo. Conviene pedir con GIVE, buscando un acuerdo que los cuide a los dos." },
    { t: "En el trabajo te piden por tercera vez que te quedes después de hora sin pago.", ops: OPS, r: 2, e: "Ceder otra vez dañaría tu respeto propio. FAST, y si hace falta, DEAR MAN para negociar." },
    { t: "Necesitás que la obra social autorice un tratamiento.", ops: OPS, r: 0, e: "Lo central es conseguirlo. DEAR MAN, con el disco rayado si insisten en negarlo." }
  ]);

  /* Intensidad: preguntas de sí o no, inspiradas en las que propone Linehan. */
  var caja = document.querySelector("[data-ei-intensidad]");
  if (caja) {
    var PREG = {
      pedir: [
        "¿La otra persona puede darme lo que pido?",
        "¿Es algo muy importante para mí?",
        "¿Pedirlo cuida mi respeto propio?",
        "¿Tengo derecho a pedirlo (por ley, por un acuerdo o por lo que es justo)?",
        "¿Tengo autoridad o un rol que me permite pedirlo?",
        "¿Es buen momento para pedirlo?",
        "¿Sé con claridad qué quiero pedir?",
        "¿Di antes al menos tanto como pido ahora?"
      ],
      negar: [
        "¿No puedo darle lo que pide, aunque quisiera?",
        "¿Darle lo que pide me haría mal o iría contra mis valores?",
        "¿Decir que no cuida mi respeto propio?",
        "¿Lo que pide va contra la ley, un acuerdo o lo que es justo?",
        "¿No tiene autoridad para pedírmelo?",
        "¿Es un mal momento para ceder?",
        "¿Lo que pide es poco claro o desmedido?",
        "¿Ya di mucho en esta relación sin recibir?"
      ]
    };
    var lista = caja.querySelector("[data-ei-preguntas]"), sal = caja.querySelector("[data-ei-salida]");
    var modo = function () { return caja.querySelector('input[name="ei-modo"]:checked').value; };
    var pintar = function () {
      var m = modo();
      lista.innerHTML = PREG[m].map(function (p, k) {
        return '<li><fieldset style="border:0;padding:0;margin:0 0 .6rem"><legend>' + p + '</legend><div class="opciones">' +
          '<label class="opcion"><input type="radio" name="ei-p' + k + '" value="1"><span>Sí</span></label>' +
          '<label class="opcion"><input type="radio" name="ei-p' + k + '" value="0"><span>No</span></label></div></fieldset></li>';
      }).join("");
      calcular();
    };
    var calcular = function () {
      var n = PREG[modo()].length, resp = lista.querySelectorAll("input:checked"), si = 0;
      resp.forEach(function (r) { si += r.value === "1" ? 1 : 0; });
      if (resp.length < n) { sal.textContent = "Respondiste " + resp.length + " de " + n + " preguntas."; return; }
      var pedir = modo() === "pedir", t;
      if (si <= 2) t = pedir ? "Intensidad baja: quizás convenga no pedirlo ahora, o insinuarlo con suavidad." : "Intensidad baja: probablemente convenga ceder, o decir que no con mucha flexibilidad.";
      else if (si <= 5) t = pedir ? "Intensidad media: pedilo con claridad, abierto a negociar." : "Intensidad media: decí que no con firmeza, abierto a ofrecer una alternativa.";
      else t = pedir ? "Intensidad alta: pedilo con firmeza y sostené el pedido aunque haya resistencia." : "Intensidad alta: decí que no con firmeza y sostenelo aunque insistan.";
      sal.textContent = si + " de " + n + " respuestas a favor. " + t;
    };
    caja.addEventListener("change", function (e) { if (e.target.name === "ei-modo") pintar(); else calcular(); });
    pintar();
  }

  /* Validación (a) o invalidación (b) de uno mismo. */
  LAB.quiz("autovalidacion", [
    { t: "«Tiene sentido que me ponga nervioso: es la primera vez que hablo en público.»", r: "a", e: "Reconoce que la emoción encaja con la situación." },
    { t: "«Soy un exagerado, no debería sentirme así por una pavada.»", r: "b", e: "Descalifica la emoción y a uno mismo. Lo que sentís no desaparece por negarlo." },
    { t: "«Con lo que viví de chico, entiendo que me cueste confiar.»", r: "a", e: "Valida a partir de la propia historia: la reacción tiene sentido aunque hoy no ayude." },
    { t: "«Los demás lo hacen sin problema, a mí no me debería costar.»", r: "b", e: "Compararse borra tu contexto. Es invalidación." },
    { t: "«Estoy triste, y está bien estarlo. Igual voy a ir a trabajar.»", r: "a", e: "Valida la emoción y elige no actuar según ella. Es validación con efectividad." },
    { t: "«Ya debería haberlo superado.»", r: "b", e: "Le pone plazo a una emoción. Es una forma frecuente de invalidarse." }
  ]);

  /* Dialéctico (a) o extremo (b). */
  LAB.quiz("dialectica", [
    { t: "«Mi mamá me ayudó mucho y también me lastimó.»", r: "a", e: "Sostiene dos verdades a la vez sin anular ninguna." },
    { t: "«Si me criticó, es que no me quiere.»", r: "b", e: "Todo o nada: una crítica no anula el afecto." },
    { t: "«Estoy haciendo lo mejor que puedo y necesito mejorar.»", r: "a", e: "Es la frase dialéctica central de la DBT: aceptación y cambio a la vez." },
    { t: "«O me das la razón o no hablamos más.»", r: "b", e: "Deja solo dos salidas extremas. El camino del medio busca una tercera." },
    { t: "«Quiero estar cerca tuyo y necesito tiempo para mí.»", r: "a", e: "Dos necesidades legítimas que pueden convivir." },
    { t: "«Nunca hacés nada bien.»", r: "b", e: "«Nunca» borra todas las excepciones. Es pensamiento extremo." }
  ]);

  /* Frases para pasar del «pero» al «y». */
  LAB.azarLista("pero-y", [
    "«Te quiero, pero me molestó lo que dijiste.»",
    "«Me esforcé, pero no me salió.»",
    "«Entiendo que estés cansado, pero necesito que hablemos.»",
    "«Me gusta mi trabajo, pero estoy agotado.»",
    "«Sé que lo hiciste con buena intención, pero me dolió.»",
    "«Quiero ayudarte, pero hoy no puedo.»"
  ]);
})();
