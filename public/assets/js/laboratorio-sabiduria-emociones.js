/* Laboratorio de la sabiduría de las emociones — /laboratorio-de-la-sabiduria-de-las-emociones/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* La balanza del miedo: amenaza frente a recursos. */
  var bal = document.querySelector("[data-se-balanza]");
  if (bal) {
    var am = bal.querySelector("#se-amenaza"), re = bal.querySelector("#se-recursos"), sal = bal.querySelector("[data-se-balanza-salida]");
    var calcular = function () {
      var a = +am.value, r = +re.value, d = a - r, t = "Amenaza " + a + ", recursos " + r + ". ";
      if (d >= 4) t += "La balanza está muy inclinada: es lógico que el miedo sea intenso. Dos caminos a la vez: revisar si la amenaza es tan grande, y sumar algún recurso, empezando por pedir ayuda.";
      else if (d >= 1) t += "Hay una desproporción. El miedo está avisando que conviene sumar un recurso: prepararte, informarte, practicar o buscar compañía.";
      else if (d === 0) t += "La balanza está pareja. Un poco de miedo es esperable y hasta útil: te mantiene atento.";
      else t += "Tus recursos superan la amenaza. Si el miedo sigue alto, quizás la señal viene de otro lado: ¿hay algo más que te preocupa?";
      sal.textContent = t;
    };
    am.addEventListener("input", calcular);
    re.addEventListener("input", calcular);
    calcular();
  }

  var OPS = ["Miedo: falta un recurso ante una amenaza", "Enojo: un deseo frustrado por un obstáculo", "Culpa: transgredí una norma propia", "Envidia: otro tiene algo que deseo", "Vergüenza: me expongo ante una mirada que me desvaloriza"];
  LAB.quiz("tablero", [
    { sinComillas: true, t: "Mañana tenés que exponer en una reunión importante y no preparaste nada.", ops: OPS, r: 0, e: "La amenaza es real y los recursos, por ahora, pocos. El miedo avisa: prepararte es la respuesta." },
    { sinComillas: true, t: "Querías descansar el domingo y tu familia organizó un almuerzo sin preguntarte.", ops: OPS, r: 1, e: "Tu deseo de descanso chocó con un obstáculo. El enojo trae energía para decir lo que necesitás." },
    { sinComillas: true, t: "Le prometiste a tu amiga que irías a su cumpleaños y no fuiste.", ops: OPS, r: 2, e: "Transgrediste una norma tuya: cumplir lo que prometés. Toca reparar." },
    { sinComillas: true, t: "Un compañero consiguió el ascenso que vos querías y sentís una punzada al felicitarlo.", ops: OPS, r: 3, e: "La envidia señala un deseo propio: crecer en tu trabajo. Escucharlo puede orientar tu próximo paso." },
    { sinComillas: true, t: "Te equivocaste delante de todos en una reunión y querías desaparecer.", ops: OPS, r: 4, e: "Algo tuyo quedó expuesto ante miradas que te importan. Conviene revisar con qué vara te estás midiendo." },
    { sinComillas: true, t: "Tenés que pedirle un aumento a tu jefe y sentís que no sabés cómo hacerlo.", ops: OPS, r: 0, e: "La amenaza (que te diga que no) supera los recursos que sentís tener. Sumar uno, como ensayar el pedido, equilibra la balanza." },
    { sinComillas: true, t: "Sentís culpa cada vez que te tomás un rato para vos, porque «hay que estar siempre disponible».", ops: OPS, r: 2, e: "Es culpa, pero la norma parece excesiva. Acá el camino no es reparar sino revisar la norma." },
    { sinComillas: true, t: "Le pediste tres veces a tu pareja que no deje la ropa tirada y sigue igual.", ops: OPS, r: 1, e: "Tu deseo se repite frustrado. El enojo pide resolver, no atacar: un pedido claro y un acuerdo." }
  ]);
})();
