/* Laboratorio de hábitos y pequeños cambios — /laboratorio-de-habitos/
   Requiere lab-base.js. Lo único que se guarda (en localStorage) es la racha. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* a = verdad, b = mito */
  LAB.quiz("habitos", [
    { t: "Un hábito se forma en 21 días.", r: "b", e: "En el estudio de Lally y colaboradores (2010), la mediana fue de 66 días, con mucha variación: de 18 a más de 250 según la persona y el hábito." },
    { t: "Saltearse un día no arruina la formación de un hábito.", r: "a", e: "En ese mismo estudio, fallar una vez no afectó de forma importante el proceso. Lo que importa es volver." },
    { t: "Atar un hábito nuevo a algo que ya hacés todos los días ayuda a sostenerlo.", r: "a", e: "Un disparador estable (después del café, al llegar a casa) automatiza la conducta." },
    { t: "Para cambiar, lo más importante es la fuerza de voluntad.", r: "b", e: "La voluntad fluctúa. Diseñar el entorno y empezar pequeño suele ser más eficaz que depender del ánimo." },
    { t: "Los hábitos simples se automatizan más rápido que los complejos.", r: "a", e: "Tomar un vaso de agua se automatiza antes que hacer cincuenta abdominales." },
    { t: "Contarle a todo el mundo tu meta siempre te ayuda a cumplirla.", r: "b", e: "Depende. Hay estudios que sugieren que anunciar una meta puede dar una satisfacción anticipada. Lo que sí ayuda es tener a alguien con quien rendir cuentas de los avances." },
    { t: "Decidir de antemano cuándo y dónde vas a hacer algo aumenta la probabilidad de hacerlo.", r: "a", e: "Son las intenciones de implementación de Peter Gollwitzer, con mucho respaldo." },
    { t: "Si un hábito no te sale perfecto desde el principio, mejor no hacerlo.", r: "b", e: "Una versión imperfecta y sostenida vale más que una perfecta que dura tres días." }
  ]);

  LAB.azarLista("minimos", [
    "En lugar de «hacer ejercicio»: ponerte las zapatillas y salir a la puerta.",
    "En lugar de «meditar media hora»: tres respiraciones conscientes después de lavarte los dientes.",
    "En lugar de «leer más»: una página antes de dormir.",
    "En lugar de «ordenar la casa»: guardar una sola cosa cada vez que pasás por el living.",
    "En lugar de «comer sano»: sumar una fruta al desayuno.",
    "En lugar de «escribir un diario»: una línea sobre cómo fue tu día.",
    "En lugar de «tomar más agua»: un vaso apenas te levantás.",
    "En lugar de «estudiar inglés»: una palabra nueva por día.",
    "En lugar de «llamar más a mi familia»: un mensaje de audio de un minuto.",
    "En lugar de «usar menos el celular»: dejarlo en otra habitación durante la cena.",
    "En lugar de «estirarme»: tocar la punta de los pies una vez al levantarte."
  ]);

  /* Intención de implementación */
  var hi = document.querySelector("[data-hab-intencion]");
  if (hi) {
    var sal = hi.querySelector("[data-hi-salida]");
    var v = function (id) { return hi.querySelector("#" + id).value.trim().replace(/[.]+$/, ""); };
    var armar = function () {
      var c = v("hi-cuando"), q = v("hi-voy"), d = v("hi-donde"), s = v("hi-si"), t = "";
      if (c || q) t = "Cuando " + (c || "…") + ", voy a " + (q || "…") + (d ? " en " + d : "") + ".";
      if (s) t += (t ? " " : "") + "Si algo me lo impide, entonces " + s + ".";
      sal.textContent = t || "Completá los pasos y acá aparece tu plan.";
    };
    hi.addEventListener("input", armar);
    hi.addEventListener("reset", function () { setTimeout(armar, 0); });
    hi.addEventListener("submit", function (e) { e.preventDefault(); });
  }

  /* Racha de 30 días */
  var ra = document.querySelector("[data-racha]");
  if (!ra) return;
  var CLAVE = "lab-racha-habito", grilla = ra.querySelector("[data-racha-grilla]"), est = ra.querySelector("[data-racha-estado]"), hab = ra.querySelector("[data-racha-habito]");
  var leer = function () { try { return JSON.parse(localStorage.getItem(CLAVE) || "{}"); } catch (e) { return {}; } };
  var escribir = function (d) { try { localStorage.setItem(CLAVE, JSON.stringify(d)); } catch (e) { /* sin almacenamiento */ } };
  var datos = leer(); datos.dias = datos.dias || []; hab.value = datos.habito || "";
  var html = "";
  for (var i = 1; i <= 30; i++) html += '<label class="lab-racha__dia"><input type="checkbox" value="' + i + '"><span>' + i + '</span><span class="visualmente-oculto"> día</span></label>';
  grilla.innerHTML = html;
  var cajas = grilla.querySelectorAll("input");
  var actualizar = function (guardar) {
    var hechos = [], racha = 0, mejor = 0, alerta = false, ultimo = 0;
    cajas.forEach(function (c) { if (c.checked) hechos.push(+c.value); });
    hechos.forEach(function (d) { if (d > ultimo) ultimo = d; });
    for (var k = 1; k <= 30; k++) {
      var c = cajas[k - 1];
      if (c.checked) { racha++; if (racha > mejor) mejor = racha; }
      else racha = 0;
      var faltaDoble = k > 1 && k <= ultimo && !c.checked && !cajas[k - 2].checked;
      if (faltaDoble) alerta = true;
      c.parentNode.classList.toggle("es-hueco-doble", faltaDoble);
    }
    var t = hechos.length + " de 30 días. Mejor racha: " + mejor + (mejor === 1 ? " día." : " días.");
    if (alerta) t += " Hubo dos días seguidos sin hacerlo: no pasa nada, volvé hoy.";
    if (hechos.length === 30) t = "¡30 de 30! El hábito está en marcha. Seguí, que todavía se está afianzando.";
    est.textContent = t;
    if (guardar) { datos.dias = hechos; datos.habito = hab.value; escribir(datos); }
  };
  cajas.forEach(function (c) { c.checked = datos.dias.indexOf(+c.value) >= 0; });
  grilla.addEventListener("change", function () { actualizar(true); });
  hab.addEventListener("input", function () { actualizar(true); });
  ra.querySelector("[data-racha-reiniciar]").addEventListener("click", function () {
    cajas.forEach(function (c) { c.checked = false; }); hab.value = ""; actualizar(true);
  });
  actualizar(false);
})();
