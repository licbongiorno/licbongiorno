/* Laboratorio ACT — /laboratorio-act/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var caja = document.querySelector("[data-defusion]");
  if (!caja) return;
  var entrada = caja.querySelector("[data-defusion-entrada]"), salida = caja.querySelector("[data-defusion-salida]");
  var pintar = function () {
    var p = entrada.value.trim().replace(/[.!¡¿?]+$/, "");
    salida.innerHTML = "";
    if (!p) return;
    var min = p.charAt(0).toLowerCase() + p.slice(1);
    [
      ["Fusionado", p + "."],
      ["Un pensamiento", "Estoy teniendo el pensamiento de que " + min + "."],
      ["Un pensamiento que noto", "Me doy cuenta de que estoy teniendo el pensamiento de que " + min + "."],
      ["Una historia conocida", "Ah, otra vez la historia de «" + min + "». Gracias, mente."]
    ].forEach(function (par) {
      var li = document.createElement("li");
      li.innerHTML = "<span></span><strong></strong>";
      li.querySelector("span").textContent = par[0];
      li.querySelector("strong").textContent = par[1];
      salida.appendChild(li);
    });
  };
  entrada.addEventListener("input", pintar);
  pintar();
})();
