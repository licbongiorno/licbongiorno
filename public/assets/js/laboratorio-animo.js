/* Laboratorio de ánimo — /laboratorio-de-animo/
   Requiere lab-base.js. El registro se guarda solo en este dispositivo (localStorage). */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  LAB.azarLista("actividades", [
    "Abrí la ventana y mirá afuera dos minutos.", "Tomá una ducha sin apuro.", "Caminá diez minutos, aunque sea alrededor de la manzana.",
    "Mandale un mensaje corto a alguien que quieras.", "Escuchá una canción que te gustaba antes.", "Ordená un solo cajón.",
    "Prepará algo simple para comer y comelo sentado.", "Salí a comprar una sola cosa.", "Regá una planta o cuidá algo vivo.",
    "Leé dos páginas de un libro.", "Estirá el cuerpo cinco minutos.", "Tendé la cama.", "Sentate al sol un rato.",
    "Escribí tres cosas que hiciste hoy, por chicas que sean.", "Cambiá la ropa de entrecasa por algo que te guste.",
    "Llamá a alguien por teléfono en lugar de escribirle.", "Lavá los platos que quedaron.", "Mirá fotos de un buen momento."
  ]);

  var q = function (t, r, e) { return { t: t, ops: ["Ayuda", "Mantiene el círculo"], r: r, e: e }; };
  LAB.quiz("ganas", [
    q("Hoy no tengo ganas, lo hago cuando me sienta mejor.", 1, "Con el ánimo bajo, las ganas suelen llegar después de empezar. Esperarlas puede alargar la espera."),
    q("No tengo ganas, pero voy a caminar diez minutos.", 0, "Actuar según un plan y no según el humor del momento es el corazón de la activación conductual."),
    q("Si no puedo hacer una hora de gimnasio, no hago nada.", 1, "El todo o nada deja afuera los pasos chicos, que son los que más ayudan al principio."),
    q("Hoy solo pude ducharme, y eso cuenta.", 0, "Reconocer los logros pequeños ayuda a que el ánimo tenga de dónde agarrarse."),
    q("No le escribo a nadie porque no quiero molestar.", 1, "El aislamiento alimenta el desánimo. Muchas veces los otros agradecen el mensaje."),
    q("Anoto en la agenda lo que voy a hacer mañana a la tarde.", 0, "Planificar saca la decisión del momento en que no hay ganas.")
  ]);

  var caja = document.querySelector("[data-registro-animo]");
  if (!caja) return;
  var CLAVE = "lab-animo-registro";
  var act = caja.querySelector("#ra-actividad"), pla = caja.querySelector("#ra-placer"), log = caja.querySelector("#ra-logro");
  var filas = caja.querySelector("[data-ra-filas]"), resumen = caja.querySelector("[data-ra-resumen]"), estado = caja.querySelector("[data-ra-estado]");
  var leer = function () { try { return JSON.parse(localStorage.getItem(CLAVE) || "[]"); } catch (e) { return []; } };
  var guardar = function () { try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch (e) { /* sin almacenamiento */ } };
  var datos = leer();
  var acotar = function (v) { var n = parseInt(v, 10); return isNaN(n) ? null : Math.max(0, Math.min(10, n)); };
  var pintar = function () {
    filas.innerHTML = "";
    if (!datos.length) {
      filas.innerHTML = '<tr class="registro-animo__vacio"><td colspan="4">Todavía no registraste actividades.</td></tr>';
      resumen.textContent = ""; return;
    }
    datos.forEach(function (d, i) {
      var tr = document.createElement("tr");
      tr.innerHTML = "<td></td><td></td><td></td><td></td>";
      tr.children[0].textContent = d.a; tr.children[1].textContent = d.p; tr.children[2].textContent = d.l;
      var b = document.createElement("button");
      b.type = "button"; b.className = "lab-orden__btn"; b.textContent = "×"; b.setAttribute("aria-label", "Quitar " + d.a);
      b.addEventListener("click", function () { datos.splice(i, 1); guardar(); pintar(); estado.textContent = "Actividad quitada."; });
      tr.children[3].appendChild(b);
      filas.appendChild(tr);
    });
    var mejores = datos.slice().sort(function (x, y) { return (y.p + y.l) - (x.p + x.l); }).slice(0, 3);
    var prom = function (k) { return (datos.reduce(function (s, d) { return s + d[k]; }, 0) / datos.length).toFixed(1).replace(".", ","); };
    resumen.textContent = datos.length + (datos.length === 1 ? " actividad" : " actividades") + " · placer promedio " + prom("p") + " · logro promedio " + prom("l") +
      ". Las que más te ayudaron: " + mejores.map(function (d) { return d.a; }).join(", ") + ".";
  };
  caja.querySelector("[data-ra-agregar]").addEventListener("click", function () {
    var a = act.value.trim(), p = acotar(pla.value), l = acotar(log.value);
    if (!a) { estado.textContent = "Escribí la actividad."; act.focus(); return; }
    if (p === null || l === null) { estado.textContent = "Puntuá placer y logro del 0 al 10."; (p === null ? pla : log).focus(); return; }
    datos.push({ a: a, p: p, l: l }); guardar(); pintar();
    act.value = ""; pla.value = ""; log.value = ""; act.focus();
    estado.textContent = "Actividad agregada.";
  });
  caja.querySelector("[data-ra-bajar]").addEventListener("click", function () {
    if (!datos.length) { estado.textContent = "Todavía no hay actividades para guardar."; return; }
    LAB.guardarTexto("registro-de-placer-y-logro.txt", "Registro de placer y logro\n\n" + datos.map(function (d) { return "- " + d.a + " · placer " + d.p + " · logro " + d.l; }).join("\n") + "\n\n" + resumen.textContent + "\n");
    estado.textContent = "Listo: se descargó en tu dispositivo.";
  });
  caja.querySelector("[data-ra-borrar]").addEventListener("click", function () {
    if (datos.length && !window.confirm("¿Borrar todo el registro?")) return;
    datos = []; guardar(); pintar(); estado.textContent = "Registro borrado.";
  });
  pintar();
})();
