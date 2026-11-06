/* Laboratorio de estrés y agotamiento — /laboratorio-de-estres/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  LAB.azarLista("pausas", [
    "Pará, apoyá los pies en el piso y hacé cinco respiraciones largas, exhalando despacio.",
    "Levantate, estirá los brazos hacia arriba y después dejalos caer. Repetí tres veces.",
    "Mirá por la ventana algo lejano durante un minuto. Tus ojos también descansan.",
    "Tomá un vaso de agua despacio, prestando atención a cada trago.",
    "Caminá hasta otra habitación y volvé, sin el celular.",
    "Aflojá la mandíbula, bajá los hombros y soltá las manos.",
    "Escuchá una canción que te guste, sin hacer otra cosa.",
    "Mandale un mensaje breve a alguien que te quiere.",
    "Salí al balcón o a la puerta y sentí el aire en la cara.",
    "Anotá en un papel lo que te está dando vueltas, y dejalo ahí.",
    "Hacé una lista de tres cosas que salieron bien hoy.",
    "Cerrá los ojos y contá diez respiraciones."
  ]);

  var s = document.querySelector("[data-semaforo]");
  if (!s) return;
  var res = s.querySelector("[data-semaforo-resultado]"), cajas = s.querySelectorAll("input[type=checkbox]");
  var pintar = function () {
    var n = Array.prototype.filter.call(cajas, function (c) { return c.checked; }).length;
    var color, titulo, txt;
    if (n <= 3) { color = "verde"; titulo = "Verde"; txt = "Hay algunas señales, como en cualquier etapa exigente. Buen momento para cuidar el descanso y las pausas antes de que crezcan."; }
    else if (n <= 7) { color = "amarillo"; titulo = "Amarillo"; txt = "Varias señales al mismo tiempo. Tu cuerpo y tu ánimo están pidiendo un ajuste: revisá tus cargas, pedí ayuda con algo y protegé tus horas de sueño."; }
    else { color = "rojo"; titulo = "Rojo"; txt = "Muchas señales a la vez. Es importante no seguir «aguantando»: conviene consultar con tu médico y con un profesional de la salud mental, y ver qué cargas se pueden aliviar ya."; }
    res.setAttribute("data-color", color);
    res.innerHTML = '<span class="lab-semaforo__luz" aria-hidden="true"></span><p><strong></strong> <span></span></p>';
    res.querySelector("strong").textContent = titulo + " · " + n + (n === 1 ? " señal." : " señales.");
    res.querySelector("p span").textContent = txt + " Es una orientación, no un diagnóstico.";
  };
  s.addEventListener("change", pintar);
  pintar();
})();
