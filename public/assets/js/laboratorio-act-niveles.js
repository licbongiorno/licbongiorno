/* Laboratorio ACT, niveles 1 a 3:
   /laboratorio-act-abierto/, /laboratorio-act-consciente/, /laboratorio-act-comprometido/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Nivel 1: lucha (a) o aceptación (b). */
  LAB.quiz("aceptacion-act", [
    { t: "No puedo estar ansioso en la entrevista. Tengo que calmarme sí o sí.", r: "a", e: "Pelear contra la ansiedad suele aumentarla. Es patalear en la arena." },
    { t: "Estoy ansioso, y voy a ir igual. La ansiedad puede venir conmigo.", r: "b", e: "Hace lugar a la emoción y sigue con lo que importa. Es aceptación." },
    { t: "Me tomo algo para no sentir nada esta noche.", r: "a", e: "Es una forma de evitar. Alivia un rato y deja el malestar intacto, o más grande." },
    { t: "Esta tristeza duele. Le doy un rato, sin pelear, y después salgo a caminar.", r: "b", e: "Permite la emoción y no se queda atrapado en ella." },
    { t: "No voy a pensar más en eso.", r: "a", e: "Intentar no pensar en algo suele traerlo más. Lo paradójico de la supresión." },
    { t: "Ahí está otra vez el miedo. Lo dejo estar mientras termino esto.", r: "b", e: "Nota la emoción, la deja estar y sigue. Es aceptación en acción." }
  ]);

  /* Nivel 1: escala de disposición. */
  var dis = document.querySelector("[data-act-disposicion]");
  if (dis) {
    var r = dis.querySelector("input"), s = dis.querySelector("[data-act-disposicion-salida]");
    var f = function () {
      var v = +r.value;
      s.textContent = v + " de 10. " + (v <= 3 ? "Todavía cuesta mucho. Está bien: probá con una molestia más chica, y volvé a medir." : v <= 6 ? "Hay algo de disposición. Es suficiente para dar un paso pequeño con la emoción a bordo." : "Hay mucha disposición. Aprovechala para hacer algo que venías evitando.");
    };
    r.addEventListener("input", f); f();
  }

  /* Nivel 2: yo como contenido (a) o como contexto (b). */
  LAB.quiz("yo-act", [
    { t: "Soy una persona ansiosa.", r: "a", e: "La ansiedad se vuelve identidad. Desde el contexto: «estoy notando ansiedad»." },
    { t: "Estoy notando que aparece ansiedad.", r: "b", e: "Hay ansiedad, y hay alguien que la nota. Es el yo observador." },
    { t: "Tengo el pensamiento de que soy un fracaso.", r: "b", e: "Ve el pensamiento como pensamiento. Toma distancia sin negarlo." },
    { t: "Soy un fracaso.", r: "a", e: "El pensamiento se presenta como un hecho sobre quién sos." },
    { t: "En este momento siento mucha tristeza, y la estoy observando.", r: "b", e: "Describe la experiencia desde el lugar que la contiene." },
    { t: "Yo siempre fui el tímido de la familia.", r: "a", e: "Una etiqueta del pasado define el presente. Es el yo como contenido." }
  ]);

  /* Nivel 3: áreas de valores. */
  var ar = document.querySelector("[data-act-areas]");
  if (ar) {
    var sal = ar.querySelector("[data-act-areas-salida]");
    var calc = function () {
      var m = {};
      ar.querySelectorAll("input[type=range]").forEach(function (b) {
        var a = b.getAttribute("data-area"); m[a] = m[a] || {}; m[a][b.getAttribute("data-tipo")] = +b.value;
      });
      var lista = Object.keys(m).map(function (a) { return { a: a, d: m[a].i - m[a].v, i: m[a].i }; }).sort(function (x, y) { return y.d - x.d || y.i - x.i; });
      var top = lista[0];
      if (top.d <= 0) { sal.textContent = "No hay distancia en ninguna área: estás viviendo de acuerdo con lo que te importa. Mantenelo, y revisá de nuevo en un tiempo."; return; }
      var seg = lista[1] && lista[1].d > 0 ? " Le sigue " + lista[1].a + " (distancia " + lista[1].d + ")." : "";
      sal.textContent = "La mayor distancia está en " + top.a + " (importancia " + top.i + ", distancia " + top.d + ")." + seg + " Ahí puede estar tu próxima acción comprometida.";
    };
    ar.addEventListener("input", calc); calc();
  }
})();
