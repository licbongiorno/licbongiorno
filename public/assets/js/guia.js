/* Guía «¿Por dónde empiezo?» — /por-donde-empezar/
   Arma un recorrido con los temas elegidos. No se guarda ni se envía nada. */
(function () {
  "use strict";
  var caja = document.querySelector("[data-guia]"), out = document.querySelector("[data-guia-resultado]"), fuente = document.getElementById("guia-datos");
  if (!caja || !out || !fuente) return;
  var datos = JSON.parse(fuente.textContent);
  var esc = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  var lista = function (items) { return "<ul>" + items.map(function (x) { return '<li><a href="' + esc(x[1]) + '">' + esc(x[0]) + "</a></li>"; }).join("") + "</ul>"; };
  var pintar = function () {
    var elegidos = Array.prototype.map.call(caja.querySelectorAll("input:checked"), function (i) { return i.value; });
    if (!elegidos.length) { out.innerHTML = ""; return; }
    var arts = [], labs = [], tests = [], motivos = [], vistos = {};
    var sumar = function (dest, x) { if (!vistos[x[1]]) { vistos[x[1]] = 1; dest.push(x); } };
    elegidos.forEach(function (k) {
      var d = datos[k]; if (!d) return;
      d.a.forEach(function (x) { sumar(arts, x); });
      d.l.forEach(function (x) { sumar(labs, x); });
      (d.t || []).forEach(function (x) { sumar(tests, x); });
      if (d.m && !vistos[d.m]) { vistos[d.m] = 1; motivos.push([d.mn, d.m]); }
    });
    var nombres = elegidos.map(function (k) { return datos[k].n.toLowerCase(); });
    var titulo = nombres.length > 1 ? nombres.slice(0, -1).join(", ") + " y " + nombres[nombres.length - 1] : nombres[0];
    var html = '<h2 class="guia-resultado__titulo">Tu recorrido para <em>' + esc(titulo) + "</em></h2>";
    html += '<div class="guia-pasos">';
    html += '<section class="guia-paso"><p class="guia-paso__num">1 · Leer</p>' + lista(arts.slice(0, 6)) + "</section>";
    html += '<section class="guia-paso"><p class="guia-paso__num">2 · Practicar</p>' + lista(labs.slice(0, 5)) + (tests.length ? '<p>Y para explorarte:</p>' + lista(tests.slice(0, 4)) : "") + "</section>";
    html += '<section class="guia-paso"><p class="guia-paso__num">3 · Entender más</p><p>Cómo lo trabajo en terapia:</p>' + lista(motivos.slice(0, 3)) + "</section>";
    html += "</div>";
    html += '<p class="guia-cierre">Si lo que marcaste te pesa desde hace un tiempo, también podés <a href="/contacto/">escribirme</a> para conversarlo en una primera entrevista.</p>';
    out.innerHTML = html;
  };
  caja.addEventListener("change", pintar);
  pintar();
})();
