/* Laboratorio de habilidades inspiradas en DBT — /laboratorio-de-habilidades-dbt/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Verificar los hechos: a = la intensidad encaja, b = conviene revisar la interpretación. */
  LAB.quiz("hechos", [
    { t: "Mi pareja no contestó un mensaje en dos horas y siento pánico de que me deje.", r: "b", e: "Que no conteste no es un hecho que indique abandono. ¿Qué otras explicaciones hay? Está trabajando, se quedó sin batería, no lo vio." },
    { t: "Un auto pasó en rojo y casi me atropella: me tiemblan las piernas.", r: "a", e: "Hubo un peligro real. El miedo cumplió su función: protegerte." },
    { t: "Mi jefe me pidió que pase por su oficina y ya estoy seguro de que me van a echar.", r: "b", e: "El hecho es una citación, nada más. Conviene esperar a saber de qué se trata antes de que la angustia decida por vos." },
    { t: "Murió mi perro, que me acompañó doce años, y estoy muy triste.", r: "a", e: "Es una pérdida real e importante. La tristeza encaja: es parte del duelo." },
    { t: "Me equivoqué en un dato en una reunión y siento que todos piensan que soy un inútil.", r: "b", e: "Equivocarse en un dato es un hecho menor. «Todos piensan que soy un inútil» es una lectura de mentes que agranda la vergüenza." },
    { t: "Una amiga contó algo muy íntimo que le confié, y me enojé.", r: "a", e: "Se rompió un acuerdo de confianza. El enojo encaja; la cuestión es qué hacer con él." },
    { t: "Una persona en la calle me miró y siento que se estaba burlando de mí.", r: "b", e: "Una mirada puede tener mil motivos. Es una interpretación que conviene chequear antes de que arruine el día." },
    { t: "Llevo tres semanas trabajando doce horas por día y estoy irritable y agotada.", r: "a", e: "Es una reacción esperable a una sobrecarga real. Más que regular la emoción, toca cambiar la situación." },
    { t: "Mi hijo adolescente quiere ir a dormir a lo de un amigo y siento que lo estoy perdiendo.", r: "b", e: "Querer más autonomía es parte de crecer, no una pérdida del vínculo. La emoción puede ser real, pero la lectura conviene revisarla." },
    { t: "Me olvidé del cumpleaños de mi hermana y siento culpa.", r: "a", e: "Algo de culpa encaja: sirve para reparar. Si se vuelve castigo durante días, ya no encaja con el tamaño del hecho." }
  ]);

  /* Pedir con claridad (describir, expresar, afirmar, reforzar). */
  var dm = document.querySelector("[data-lab-dearman]");
  if (dm) {
    var sal = dm.querySelector("[data-dm-salida]");
    var v = function (id) { return dm.querySelector("#" + id).value.trim().replace(/[.]+$/, ""); };
    var min = function (t) { return t ? t.charAt(0).toLowerCase() + t.slice(1) : t; };
    var may = function (t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : t; };
    var armar = function () {
      var d = v("dm-d"), e = v("dm-e"), a = v("dm-a"), r = v("dm-r"), partes = [];
      if (d) partes.push(may(d) + ".");
      if (e) partes.push("Me pasa que " + min(e) + ".");
      if (a) partes.push("Por eso, " + min(a) + ".");
      if (r) partes.push("Creo que eso también te sirve a vos: " + min(r) + ".");
      if (a) partes.push("¿Qué te parece? Si no es posible así, podemos buscar otra forma.");
      sal.textContent = partes.length ? partes.join(" ") : "Completá los pasos y acá aparece tu pedido.";
    };
    dm.addEventListener("input", armar);
    dm.addEventListener("reset", function () { setTimeout(armar, 0); });
    dm.addEventListener("submit", function (ev) { ev.preventDefault(); });
  }
})();
