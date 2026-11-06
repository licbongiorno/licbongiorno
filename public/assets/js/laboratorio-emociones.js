/* Laboratorio de emociones — /laboratorio-de-emociones/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  var t = document.querySelector("[data-emo-termometro]");
  if (!t) return;
  var rango = t.querySelector("input[type=range]"), valor = t.querySelector("[data-emo-valor]"), texto = t.querySelector("[data-emo-texto]");
  var FRANJAS = [
    { hasta: 2, nivel: "Brisa", txt: "La emoción está presente, pero no te maneja. Es un buen momento para registrarla, ponerle nombre y preguntarte qué te dice." },
    { hasta: 4, nivel: "Viento", txt: "Se nota. Podés pensar con claridad. Probá decir lo que sentís o hacer algo con eso: una conversación, un pedido, un cambio." },
    { hasta: 6, nivel: "Tormenta", txt: "Empieza a costar pensar con claridad. Antes de decidir algo importante, tomate un rato: respirá, caminá, escribí lo que te pasa." },
    { hasta: 8, nivel: "Temporal", txt: "La emoción está muy alta. Es momento de frenar, no de resolver. Probá los cuatro pasos de STOP y bajá la activación del cuerpo (respiración lenta, agua fría en la cara)." },
    { hasta: 10, nivel: "Huracán", txt: "Es una crisis. No tomes decisiones ahora. Buscá a alguien de confianza o un lugar seguro, y usá tu kit de crisis. Si pensás en hacerte daño, pedí ayuda ya: 911, o 135 / 0800-345-1435." }
  ];
  var pintar = function () {
    var n = parseInt(rango.value, 10), f = FRANJAS.filter(function (x) { return n <= x.hasta; })[0];
    valor.textContent = n;
    t.setAttribute("data-nivel", f.nivel.toLowerCase());
    t.style.setProperty("--nivel", n / 10);
    texto.innerHTML = "<strong></strong> <span></span>";
    texto.querySelector("strong").textContent = f.nivel + ".";
    texto.querySelector("span").textContent = f.txt;
    if (n >= 7) {
      var p = document.createElement("span");
      p.innerHTML = ' <a href="/laboratorio-de-habilidades-dbt/#stop">Ver STOP y TIP</a> · <a href="/ayuda-urgente/">Ayuda urgente</a>';
      texto.appendChild(p);
    }
  };
  rango.addEventListener("input", pintar);
  pintar();
})();
