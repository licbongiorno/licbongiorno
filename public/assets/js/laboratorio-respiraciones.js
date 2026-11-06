/* Laboratorio de respiraciones — /laboratorio-de-respiraciones/
   Requiere lab-base.js (la respiración guiada vive en [data-lab-respiracion]). Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var ad = document.querySelector("[data-resp-antes-despues]");
  if (!ad) return;
  var a = ad.querySelector("#ad-antes"), d = ad.querySelector("#ad-despues");
  var av = ad.querySelector("[data-ad-antes-v]"), dv = ad.querySelector("[data-ad-despues-v]"), res = ad.querySelector("[data-ad-resultado]");
  var tocado = false;
  var pintar = function () {
    av.textContent = a.value; dv.textContent = d.value;
    if (!tocado) { res.textContent = "Mové los dos controles para ver la diferencia."; return; }
    var dif = a.value - d.value;
    res.textContent = dif > 0 ? "Bajó " + dif + (dif === 1 ? " punto" : " puntos") + ". Esta técnica parece servirte: anotala." :
      dif === 0 ? "Quedó igual. A veces hace falta más tiempo de práctica, o probar otra técnica." :
      "Subió " + (-dif) + (dif === -1 ? " punto" : " puntos") + ". No es la técnica para vos en este momento: probá una con exhalación más larga o volvé a tu respiración natural.";
  };
  [a, d].forEach(function (x) { x.addEventListener("input", function () { tocado = true; pintar(); }); });
  pintar();
})();
