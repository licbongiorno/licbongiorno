/* Laboratorio de vínculos y límites — /laboratorio-de-vinculos/
   Requiere lab-base.js. Nada se envía a ningún servidor ni se guarda en el navegador. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* ---------- ¿Sano o alarma? (a = sano, b = alarma) ---------- */
  LAB.quiz("senales", [
    { t: "Mi pareja me pide la contraseña del celular «para estar tranquila».", r: "b", e: "Revisar o pedir acceso al celular es una forma de control, aunque se presente como cuidado." },
    { t: "Cuando le digo que no a un plan, lo acepta aunque se desilusione.", r: "a", e: "Respetar el «no» del otro, aun con desilusión, es señal de un vínculo sano." },
    { t: "Se enoja si salgo con mis amigas sin él.", r: "b", e: "Aislar de los afectos es una de las señales más frecuentes de un vínculo violento." },
    { t: "Discutimos, pero después podemos hablarlo y pedirnos disculpas.", r: "a", e: "Todos los vínculos tienen conflictos. Lo sano es poder repararlos." },
    { t: "Me dice qué ropa me queda bien y qué no puedo ponerme.", r: "b", e: "Decidir sobre el cuerpo o la apariencia del otro es control." },
    { t: "Cuando estoy mal, me pregunta qué necesito.", r: "a", e: "Interesarse por lo que el otro necesita es cuidado." },
    { t: "Siento que tengo que medir cada palabra para que no se enoje.", r: "b", e: "Vivir con miedo a la reacción del otro es una señal importante. No es exageración." },
    { t: "Cada uno tiene sus espacios, y también compartimos cosas.", r: "a", e: "Combinar autonomía y encuentro es parte de un vínculo sano." },
    { t: "Delante de otros hace chistes que me humillan, y si me quejo dice que no tengo humor.", r: "b", e: "La humillación disfrazada de broma es una forma de violencia psicológica." },
    { t: "Me controla los gastos y tengo que pedirle permiso para comprar algo.", r: "b", e: "El control del dinero es una forma de violencia económica." },
    { t: "Podemos estar en desacuerdo sin que eso ponga en riesgo la relación.", r: "a", e: "El desacuerdo no es una amenaza en un vínculo seguro." }
  ]);

  /* ---------- Decir que no ---------- */
  var lim = document.querySelector("[data-vin-limite]");
  if (lim) {
    var sal = lim.querySelector("[data-li-salida]");
    var v = function (id) { return lim.querySelector("#" + id).value.trim().replace(/[.]+$/, ""); };
    var may = function (t) { return t.charAt(0).toUpperCase() + t.slice(1); };
    var armar = function () {
      var no = v("li-no"), por = v("li-por"), si = v("li-si"), t = "";
      if (no) t = may(no) + (por ? ", porque " + por : "") + ".";
      else if (por) t = may(por) + ".";
      if (si) t += (t ? " " : "") + "Lo que sí puedo es esto: " + si + ".";
      sal.textContent = t || "Completá los pasos y acá aparece tu frase.";
    };
    lim.addEventListener("input", armar);
    lim.addEventListener("reset", function () { setTimeout(armar, 0); });
    lim.addEventListener("submit", function (e) { e.preventDefault(); });
  }

  /* ---------- Mapa de vínculos ---------- */
  var caja = document.querySelector("[data-vinculos]");
  if (!caja) return;
  var form = caja.querySelector("[data-vin-form]"), svg = caja.querySelector("[data-vin-svg]"), lista = caja.querySelector("[data-vin-lista]");
  var vacio = caja.querySelector("[data-vin-vacio]"), est = caja.querySelector("[data-vin-estado]");
  var refl = caja.querySelector("[data-vin-reflexion]"), resumen = caja.querySelector("[data-vin-resumen]");
  var personas = [];
  var NS = "http://www.w3.org/2000/svg", C = 180, RADIOS = [0, 60, 112, 164];
  var ANILLO = { 1: "Muy cerca", 2: "Cerca", 3: "Más lejos" }, TONO = { nutre: "me nutre", neutro: "neutro", desgasta: "me desgasta" };
  var el = function (tag, at) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); return e; };

  var dibujar = function () {
    while (svg.childNodes.length > 1) svg.removeChild(svg.lastChild);
    [3, 2, 1].forEach(function (n) { svg.appendChild(el("circle", { cx: C, cy: C, r: RADIOS[n], class: "vin-anillo vin-anillo--" + n })); });
    var yo = el("text", { x: C, y: C, class: "vin-yo", "text-anchor": "middle", "dominant-baseline": "middle" }); yo.textContent = "Yo"; svg.appendChild(yo);
    [1, 2, 3].forEach(function (n) {
      var grupo = personas.filter(function (p) { return p.anillo === n; });
      var radio = (RADIOS[n - 1] + RADIOS[n]) / 2 + (n === 1 ? 6 : 0);
      grupo.forEach(function (p, k) {
        var ang = -Math.PI / 2 + (k * 2 * Math.PI / Math.max(grupo.length, 1)) + n * 0.35;
        var x = C + Math.cos(ang) * radio, y = C + Math.sin(ang) * radio;
        var g = el("g", { class: "vin-p vin-p--" + p.tono });
        if (p.tono === "nutre") g.appendChild(el("circle", { cx: x, cy: y, r: 7 }));
        else if (p.tono === "neutro") g.appendChild(el("rect", { x: x - 6.5, y: y - 6.5, width: 13, height: 13 }));
        else g.appendChild(el("polygon", { points: [x, y - 8, x + 8, y + 6, x - 8, y + 6].join(",") }));
        var t = el("text", { x: x, y: y + 20, "text-anchor": "middle", class: "vin-nombre" }); t.textContent = p.nombre;
        g.appendChild(t); svg.appendChild(g);
      });
    });
  };
  var pintarLista = function () {
    lista.innerHTML = "";
    personas.forEach(function (p, k) {
      var li = document.createElement("li"); li.className = "lab-orden__item";
      li.innerHTML = '<span class="lab-orden__nombre"></span><span class="lab-orden__botones"><button type="button" class="lab-orden__btn" data-quitar="' + k + '"><span aria-hidden="true">×</span><span class="visualmente-oculto"></span></button></span>';
      li.querySelector(".lab-orden__nombre").textContent = p.nombre + " — " + ANILLO[p.anillo].toLowerCase() + ", " + TONO[p.tono];
      li.querySelector(".visualmente-oculto").textContent = "Quitar a " + p.nombre;
      lista.appendChild(li);
    });
    vacio.hidden = personas.length > 0;
    var cerca = personas.filter(function (p) { return p.anillo === 1; }), desg = cerca.filter(function (p) { return p.tono === "desgasta"; });
    var nutren = personas.filter(function (p) { return p.tono === "nutre"; });
    refl.hidden = personas.length < 3;
    if (personas.length >= 3) {
      var t = "Tenés " + personas.length + " personas en tu mapa; " + nutren.length + (nutren.length === 1 ? " te nutre" : " te nutren") + ". ";
      if (desg.length) t += "En el círculo más cercano hay " + desg.length + (desg.length === 1 ? " vínculo que te desgasta" : " vínculos que te desgastan") + ": ¿qué límite o qué conversación podría ayudar? ";
      if (!nutren.length) t += "Ningún vínculo aparece como nutritivo hoy: vale la pena pensar dónde podrías encontrar apoyo. ";
      t += "¿Hay alguien que te hace bien y está más lejos de lo que te gustaría?";
      resumen.textContent = t;
    }
  };
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var inp = form.querySelector("#vin-nombre"), nombre = inp.value.trim();
    if (!nombre) { inp.focus(); return; }
    var p = { nombre: nombre, anillo: +form.querySelector('input[name="vin-anillo"]:checked').value, tono: form.querySelector('input[name="vin-tono"]:checked').value };
    personas.push(p);
    est.textContent = "Agregaste a " + nombre + ": " + ANILLO[p.anillo].toLowerCase() + ", " + TONO[p.tono] + ".";
    inp.value = ""; inp.focus();
    dibujar(); pintarLista();
  });
  lista.addEventListener("click", function (e) {
    var b = e.target.closest("[data-quitar]");
    if (!b) return;
    var p = personas.splice(+b.getAttribute("data-quitar"), 1)[0];
    est.textContent = "Quitaste a " + p.nombre + ".";
    dibujar(); pintarLista();
    var otro = lista.querySelector("[data-quitar]"); if (otro) otro.focus(); else form.querySelector("#vin-nombre").focus();
  });
  var bEst = caja.querySelector("[data-vin-bajar-estado]");
  caja.querySelector("[data-vin-bajar]").addEventListener("click", function () {
    if (!personas.length) { bEst.textContent = "Todavía no agregaste a nadie."; return; }
    var l = ["Mi mapa de vínculos", ""];
    [1, 2, 3].forEach(function (n) {
      var g = personas.filter(function (p) { return p.anillo === n; });
      if (!g.length) return;
      l.push(ANILLO[n] + ":");
      g.forEach(function (p) { l.push("- " + p.nombre + " (" + TONO[p.tono] + ")"); });
      l.push("");
    });
    if (!refl.hidden) l.push(resumen.textContent);
    LAB.guardarTexto("mi-mapa-de-vinculos.txt", l.join("\n") + "\n");
    bEst.textContent = "Listo: se descargó en tu dispositivo.";
  });
  dibujar(); pintarLista();
})();
