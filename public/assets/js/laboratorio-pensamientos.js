/* Laboratorio de pensamientos que se repiten — /laboratorio-de-pensamientos-repetitivos/
   Requiere lab-base.js. Lo que se guarda queda solo en este dispositivo (localStorage). */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;
  var leer = function (k, def) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } };
  var escribir = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } };
  var hoy = function () { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); };

  /* 1. ¿Estoy en un bucle? */
  var bucle = document.querySelector("[data-bucle]");
  if (bucle) {
    var cajas = bucle.querySelectorAll("input[type=checkbox]");
    var marcas = bucle.querySelectorAll(".bucle__medidor span");
    var res = bucle.querySelector("[data-bucle-resultado]");
    var evaluar = function () {
      var n = Array.prototype.filter.call(cajas, function (c) { return c.checked; }).length;
      marcas.forEach(function (m, i) { m.classList.toggle("on", i < n); });
      bucle.setAttribute("data-nivel", n >= 4 ? "alto" : n >= 2 ? "medio" : "bajo");
      res.textContent = n === 0 ? "Marcá las señales que reconocés."
        : n === 1 ? "Puede que estés pensando un problema. Si ayuda, seguí, pero ponele un límite de tiempo."
        : n <= 3 ? "Hay señales de bucle. Probá ponerle nombre a la historia (estación 2) o tomar distancia (estación 3)."
        : "Parece un bucle. Pensar más no va a resolverlo: es un buen momento para salir (estaciones 5 a 9).";
    };
    cajas.forEach(function (c) { c.addEventListener("change", evaluar); });
  }

  /* 2. Ponerle nombre a la historia, con contador diario */
  var hist = document.querySelector("[data-historia]");
  if (hist) {
    var CLAVE_H = "lab-pensamientos-historia";
    var titulo = hist.querySelector("#hi-titulo"), frase = hist.querySelector("[data-historia-frase]"), cuenta = hist.querySelector("[data-historia-cuenta]");
    var dato = leer(CLAVE_H, { t: "", f: hoy(), n: 0 });
    if (dato.f !== hoy()) { dato.f = hoy(); dato.n = 0; }
    titulo.value = dato.t || "";
    var pintarH = function () {
      var t = titulo.value.trim();
      frase.textContent = t ? "«Ah, otra vez la historia de “" + t + "”»." : "";
      cuenta.textContent = dato.n ? "Hoy volvió " + dato.n + (dato.n === 1 ? " vez." : " veces.") : "";
    };
    titulo.addEventListener("input", function () { dato.t = titulo.value.trim(); escribir(CLAVE_H, dato); pintarH(); });
    hist.querySelector("[data-historia-volvio]").addEventListener("click", function () {
      if (!titulo.value.trim()) { cuenta.textContent = "Primero ponele un nombre a la historia."; titulo.focus(); return; }
      dato.n++; escribir(CLAVE_H, dato); pintarH();
      frase.classList.remove("historia__frase--pulso"); void frase.offsetWidth; frase.classList.add("historia__frase--pulso");
    });
    hist.querySelector("[data-historia-reiniciar]").addEventListener("click", function () { dato = { t: "", f: hoy(), n: 0 }; titulo.value = ""; escribir(CLAVE_H, dato); pintarH(); });
    pintarH();
  }

  /* 3. «Estoy teniendo el pensamiento de que…» en tres capas */
  var capas = document.querySelector("[data-capas]");
  if (capas) {
    var cpIn = capas.querySelector("#cp-texto"), vista = capas.querySelector("[data-capas-vista]"), cpTxt = capas.querySelector("[data-capas-texto]");
    var nivel = 0;
    var base = function () { return (cpIn.value.trim() || cpIn.getAttribute("placeholder")).replace(/[.]+$/, ""); };
    var formas = [
      function (t) { return t; },
      function (t) { return "Estoy teniendo el pensamiento de que " + t + "."; },
      function (t) { return "Noto que estoy teniendo el pensamiento de que " + t + "."; }
    ];
    var pintarC = function () { vista.setAttribute("data-nivel", String(nivel)); cpTxt.textContent = formas[nivel](base()); };
    capas.querySelector("[data-capas-mas]").addEventListener("click", function () { nivel = Math.min(2, nivel + 1); pintarC(); });
    capas.querySelector("[data-capas-volver]").addEventListener("click", function () { nivel = 0; pintarC(); });
    cpIn.addEventListener("input", pintarC);
  }

  /* 4. La palabra que se gasta: 30 segundos */
  var gastar = document.querySelector("[data-gastar]");
  if (gastar) {
    var gaIn = gastar.querySelector("#ga-palabra"), gaVista = gastar.querySelector("[data-gastar-vista]"), gaEst = gastar.querySelector("[data-gastar-estado]");
    var rep = null, i = 0;
    var parar = function () { if (rep) { clearInterval(rep); rep = null; } };
    var reloj = LAB.temporizador(30, gastar.querySelector("[data-gastar-reloj]"), function () {
      parar(); gastar.classList.add("gastar--fin");
      gaEst.textContent = "Listo. ¿Cómo suena ahora la palabra? ¿Pesa igual que al principio?";
    });
    var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gastar.querySelector("[data-gastar-empezar]").addEventListener("click", function () {
      var p = (gaIn.value.trim() || gaIn.getAttribute("placeholder")).split(/\s+/)[0];
      parar(); reloj.frenar(); gaVista.innerHTML = ""; i = 0; gastar.classList.remove("gastar--fin");
      gaEst.textContent = "Repetila en voz alta, rápido: " + p + ", " + p + ", " + p + "…";
      var poner = function () {
        var s = document.createElement("span");
        s.textContent = p; s.style.setProperty("--i", String(i++));
        gaVista.appendChild(s);
        if (i >= 40) parar();
      };
      if (reducido) { for (var k = 0; k < 20; k++) poner(); } else { poner(); rep = setInterval(poner, 700); }
      reloj.empezar();
    });
    gastar.querySelector("[data-gastar-frenar]").addEventListener("click", function () {
      parar(); reloj.frenar(); gaEst.textContent = "Frenaste. Podés volver a empezar cuando quieras.";
    });
  }

  /* 5. El pensamiento en pantalla */
  var pantalla = document.querySelector("[data-pantalla]");
  if (pantalla) {
    var pnIn = pantalla.querySelector("#pn-texto"), pnVista = pantalla.querySelector("[data-pantalla-vista]");
    var botones = pantalla.querySelectorAll("[data-modo]");
    var texto = function () { return pnIn.value.trim() || pnIn.getAttribute("placeholder"); };
    pnIn.addEventListener("input", function () { pnVista.textContent = texto(); });
    botones.forEach(function (b) {
      if (b === pnVista) return;
      b.addEventListener("click", function () {
        var m = b.getAttribute("data-modo");
        var activo = pnVista.getAttribute("data-modo") === m;
        pnVista.setAttribute("data-modo", activo ? "normal" : m);
        botones.forEach(function (o) { if (o !== pnVista) o.setAttribute("aria-pressed", String(!activo && o === b)); });
        pnVista.textContent = texto();
      });
    });
  }

  /* 9. Cambiar de canal */
  LAB.azarLista("canales", [
    "Ordená un cajón durante cinco minutos, con las manos ocupadas y la atención en lo que tocás.",
    "Salí a caminar cinco minutos y contá los colores que ves en la calle.",
    "Lavá los platos sintiendo la temperatura del agua.",
    "Mandale un mensaje a alguien para preguntarle cómo está, y leé su respuesta con atención.",
    "Poné una canción que te guste y escuchala entera, sin hacer otra cosa.",
    "Hacé diez sentadillas o subí y bajá una escalera.",
    "Resolvé un crucigrama, un sudoku o un acertijo.",
    "Regá las plantas o cuidá algo vivo durante unos minutos.",
    "Dibujá lo que tenés enfrente, aunque te salga mal.",
    "Prepará algo simple para comer prestando atención a cada paso.",
    "Hacé una tarea pendiente chiquita, de las que llevan menos de cinco minutos.",
    "Leé dos páginas de un libro en voz alta."
  ]);

  /* 10. Registro de bucles */
  var reg = document.querySelector("[data-registro-bucles]");
  if (reg) {
    var CLAVE_R = "lab-pensamientos-registro";
    var c = function (id) { return reg.querySelector("#" + id); };
    var tema = c("rb-tema"), disp = c("rb-disparo"), min = c("rb-min"), sal = c("rb-salida");
    var lista = reg.querySelector("[data-rb-lista]"), est = reg.querySelector("[data-rb-estado]"), resumen = reg.querySelector("[data-rb-resumen]");
    var datos = leer(CLAVE_R, []);
    var detalle = function (d) {
      var p = [];
      if (d.d) p.push("lo disparó: " + d.d);
      if (d.m !== null && d.m !== undefined) p.push(d.m + " min");
      if (d.s) p.push("me ayudó: " + d.s);
      return p.join(" · ");
    };
    var pintarR = function () {
      lista.innerHTML = "";
      if (!datos.length) {
        var v = document.createElement("li"); v.className = "calendario__vacio"; v.textContent = "Todavía no registraste bucles."; lista.appendChild(v);
        resumen.textContent = ""; return;
      }
      datos.forEach(function (d) {
        var li = document.createElement("li"); li.className = "calendario__item";
        var p1 = document.createElement("p"); var s = document.createElement("strong"); s.textContent = d.t; p1.appendChild(s); li.appendChild(p1);
        var det = detalle(d);
        if (det) { var p2 = document.createElement("p"); p2.className = "calendario__detalle"; p2.textContent = det; li.appendChild(p2); }
        lista.appendChild(li);
      });
      var conMin = datos.filter(function (d) { return typeof d.m === "number"; });
      var total = conMin.reduce(function (a, d) { return a + d.m; }, 0);
      var temas = {};
      datos.forEach(function (d) { var k = d.t.toLowerCase(); temas[k] = (temas[k] || 0) + 1; });
      var masFrec = Object.keys(temas).sort(function (a, b) { return temas[b] - temas[a]; })[0];
      resumen.textContent = datos.length + (datos.length === 1 ? " bucle registrado" : " bucles registrados") +
        (conMin.length ? ", unos " + total + " minutos en total" : "") +
        (temas[masFrec] > 1 ? ". El tema que más vuelve: «" + masFrec + "»." : ".");
    };
    reg.querySelector("[data-rb-agregar]").addEventListener("click", function () {
      var t = tema.value.trim();
      if (!t) { est.textContent = "Escribí el tema del bucle."; tema.focus(); return; }
      var m = parseInt(min.value, 10);
      datos.push({ t: t, d: disp.value.trim(), m: isNaN(m) ? null : Math.max(0, Math.min(600, m)), s: sal.value.trim() });
      escribir(CLAVE_R, datos); pintarR();
      tema.value = ""; disp.value = ""; min.value = ""; sal.value = ""; tema.focus();
      est.textContent = "Bucle agregado.";
    });
    reg.querySelector("[data-rb-bajar]").addEventListener("click", function () {
      if (!datos.length) { est.textContent = "Todavía no hay bucles para guardar."; return; }
      LAB.guardarTexto("registro-de-bucles.txt", "Registro de bucles\n\n" +
        datos.map(function (d) { var det = detalle(d); return "- " + d.t + (det ? "\n  " + det : ""); }).join("\n") + "\n\n" + resumen.textContent + "\n");
      est.textContent = "Listo: se descargó en tu dispositivo.";
    });
    reg.querySelector("[data-rb-borrar]").addEventListener("click", function () {
      if (datos.length && !window.confirm("¿Borrar todo el registro?")) return;
      datos = []; escribir(CLAVE_R, datos); pintarR(); est.textContent = "Registro borrado.";
    });
    pintarR();
  }
})();
