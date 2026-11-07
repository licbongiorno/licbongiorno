/* Laboratorio de mindfulness — /laboratorio-de-mindfulness/
   Requiere lab-base.js. El calendario se guarda solo en este dispositivo (localStorage). */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  LAB.azarLista("tareas", [
    "Lavá los platos sintiendo la temperatura del agua, el peso de cada plato y el olor del detergente.",
    "Prepará el mate o el café mirando cada paso: el agua que se calienta, el ruido, el vapor.",
    "Tendé la cama despacio, notando la textura de las sábanas y el movimiento de los brazos.",
    "Cepillate los dientes con la otra mano y prestá atención a cada movimiento.",
    "Caminá hasta la parada del colectivo sintiendo cómo apoya cada pie.",
    "Doblá la ropa limpia notando el olor, el peso y la forma de cada prenda.",
    "Regá las plantas mirando cómo el agua entra en la tierra.",
    "Cortá una fruta o una verdura y observá sus colores, su olor y su sonido al cortarla.",
    "Barré una habitación siguiendo el ritmo de la escoba y de tu respiración.",
    "Duchate sin pensar en el día: solo el agua sobre la piel, la temperatura y el sonido.",
    "Ordená un cajón tocando cada objeto como si lo vieras por primera vez.",
    "Subí una escalera notando el esfuerzo de las piernas y cómo cambia la respiración."
  ]);

  var caja = document.querySelector("[data-calendario]");
  if (!caja) return;
  var CLAVE = "lab-mindfulness-calendario";
  var campo = function (id) { return caja.querySelector("#" + id); };
  var tipo = campo("ca-tipo"), que = campo("ca-que"), cuerpo = campo("ca-cuerpo"), pensa = campo("ca-pensa"), emo = campo("ca-emo");
  var lista = caja.querySelector("[data-ca-lista]"), estado = caja.querySelector("[data-ca-estado]");
  var leer = function () { try { return JSON.parse(localStorage.getItem(CLAVE) || "[]"); } catch (e) { return []; } };
  var guardar = function () { try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch (e) { /* sin almacenamiento */ } };
  var datos = leer();
  var linea = function (d) {
    var partes = [];
    if (d.c) partes.push("cuerpo: " + d.c);
    if (d.p) partes.push("pensamientos: " + d.p);
    if (d.e) partes.push("emociones: " + d.e);
    return partes.join(" · ");
  };
  var pintar = function () {
    lista.innerHTML = "";
    if (!datos.length) {
      var v = document.createElement("li");
      v.className = "calendario__vacio";
      v.textContent = "Todavía no registraste momentos.";
      lista.appendChild(v);
      return;
    }
    datos.forEach(function (d) {
      var li = document.createElement("li");
      li.className = "calendario__item calendario__item--" + d.t;
      var cab = document.createElement("p");
      var marca = document.createElement("span");
      marca.className = "calendario__tipo";
      marca.textContent = d.t;
      var txt = document.createElement("strong");
      txt.textContent = d.q;
      cab.appendChild(marca); cab.appendChild(document.createTextNode(" ")); cab.appendChild(txt);
      li.appendChild(cab);
      var det = linea(d);
      if (det) { var p = document.createElement("p"); p.className = "calendario__detalle"; p.textContent = det; li.appendChild(p); }
      lista.appendChild(li);
    });
  };
  caja.querySelector("[data-ca-agregar]").addEventListener("click", function () {
    var q = que.value.trim();
    if (!q) { estado.textContent = "Escribí qué pasó."; que.focus(); return; }
    datos.push({ t: tipo.value === "desagradable" ? "desagradable" : "agradable", q: q, c: cuerpo.value.trim(), p: pensa.value.trim(), e: emo.value.trim() });
    guardar(); pintar();
    que.value = ""; cuerpo.value = ""; pensa.value = ""; emo.value = ""; que.focus();
    estado.textContent = "Momento agregado.";
  });
  caja.querySelector("[data-ca-bajar]").addEventListener("click", function () {
    if (!datos.length) { estado.textContent = "Todavía no hay momentos para guardar."; return; }
    LAB.guardarTexto("calendario-de-experiencias.txt", "Calendario de experiencias agradables y desagradables\n\n" +
      datos.map(function (d) { var det = linea(d); return "- (" + d.t + ") " + d.q + (det ? "\n  " + det : ""); }).join("\n") + "\n");
    estado.textContent = "Listo: se descargó en tu dispositivo.";
  });
  caja.querySelector("[data-ca-borrar]").addEventListener("click", function () {
    if (datos.length && !window.confirm("¿Borrar todo el calendario?")) return;
    datos = []; guardar(); pintar(); estado.textContent = "Calendario borrado.";
  });
  pintar();
})();
