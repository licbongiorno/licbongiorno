/* Laboratorio de creatividad — /laboratorio-de-creatividad/
   Todo ocurre en el navegador: no se envía nada a ningún servidor.
   Lo único que se guarda (en localStorage, si está disponible) es el avance del plan de 7 días. */
(function () {
  "use strict";
  var raiz = document.querySelector("[data-lab-dia]");
  if (!raiz) return;

  /* ---------- Bancos de consignas ---------- */
  var DESAFIOS = [
    "Escribí tres cosas que viste hoy y que nadie más notó.",
    "Inventá un nombre nuevo para un objeto de tu casa y explicá por qué le queda mejor.",
    "Pensá cinco maneras distintas de decir «te quiero» sin usar palabras.",
    "Dibujá tu estado de ánimo de hoy usando solo líneas, sin figuras.",
    "Escribí la primera frase de una novela que nunca vas a escribir.",
    "Mirá por la ventana un minuto e inventá la historia de alguien que pase.",
    "Hacé una lista de diez preguntas que nadie te hizo nunca.",
    "Elegí una canción y escribí lo que pasa en una película imaginaria donde suena.",
    "Contá un recuerdo de la infancia en exactamente cincuenta palabras.",
    "Diseñá un día perfecto que cueste cero pesos.",
    "Inventá una fiesta nueva para el calendario: qué se celebra y cómo.",
    "Escribí un mensaje para la persona que eras hace diez años.",
    "Buscá en tu casa un objeto que no usás y pensá tres usos nuevos para él.",
    "Escribí una receta para un día difícil: ingredientes y pasos.",
    "Elegí una palabra que te guste y escribí todo lo que te hace sentir.",
    "Imaginá que tu barrio es un país: ¿cómo se llama, qué idioma habla, cuál es su comida típica?",
    "Hacé un dibujo con la mano que no usás para escribir.",
    "Describí el olor de tu casa a alguien que nunca estuvo ahí.",
    "Inventá un superpoder inútil y contá un día con él.",
    "Escribí un diálogo entre tu cansancio y tus ganas.",
    "Pensá un problema chiquito de tu semana y buscale tres soluciones absurdas.",
    "Escribí una carta de agradecimiento a algo que normalmente das por sentado.",
    "Elegí un color y hacé una lista de todo lo que encontrás de ese color en diez minutos.",
    "Contá tu día al revés, desde la noche hasta la mañana.",
    "Inventá un refrán nuevo y explicá qué enseña.",
    "Hacé un mapa de un lugar que solo existe en tus sueños.",
    "Escribí cinco títulos posibles para la película de tu vida.",
    "Describí una emoción como si fuera un clima: ¿qué tiempo hace adentro tuyo hoy?",
    "Escuchá un sonido de tu entorno y escribí la historia de dónde viene.",
    "Pensá qué te diría tu yo de dentro de veinte años sobre lo que te preocupa hoy."
  ];
  var OBJETOS = ["una lámpara", "un paraguas", "una tetera", "un reloj de pared", "una bicicleta", "un piano", "una escalera",
    "un sombrero", "una pava", "un mate", "una valija", "un espejo", "una caja de música", "un ventilador", "un colchón",
    "una regadera", "un telescopio", "una mochila", "un globo", "una hamaca", "un buzón", "una brújula", "un acordeón",
    "una linterna", "un cuaderno", "una llave", "un cohete de juguete", "una heladera", "una silla", "un barrilete",
    "una tijera", "un termo", "una alfombra", "una ventana", "un tambor", "una red de pescar", "una vela", "un candado"];
  var LUGARES = ["una estación de tren", "el fondo del mar", "una escuela rural", "la luna", "un hospital", "una plaza de pueblo",
    "un barco pesquero", "una biblioteca", "un desierto", "la cocina de una abuela", "un estadio", "una isla desierta",
    "un ascensor", "una montaña de Córdoba", "un circo", "una oficina", "un colectivo de larga distancia", "un jardín de infantes"];
  var USOS = ["un ladrillo", "un clip", "una cuchara", "una media", "un diario viejo", "una botella vacía", "un balde",
    "una sábana", "un corcho", "una lata", "un cordón", "una toalla", "un tenedor", "una caja de cartón", "un broche de ropa"];
  var PALABRAS = ["llave", "invierno", "abuela", "tren", "naranja", "silencio", "puerta", "carta", "río", "sombrero", "luna",
    "perro", "secreto", "pan", "lluvia", "espejo", "bicicleta", "foto", "mar", "escalera", "violín", "nube", "piedra", "mapa",
    "jardín", "reloj", "zapato", "fuego", "ventana", "pájaro", "valija", "noche", "té", "bosque", "radio", "hilo", "farol",
    "isla", "camino", "pañuelo", "faro", "domingo", "semilla", "barco", "techo", "cartel", "cuaderno", "abrazo", "plaza"];
  var FRASES = [
    "Nadie en el pueblo sabía por qué la ventana del tercer piso siempre estaba abierta.",
    "Ese día me desperté sabiendo que algo iba a cambiar.",
    "La carta llegó con veinte años de atraso.",
    "Lo que nunca le conté a nadie es que…",
    "Si pudiera volver a una tarde de mi vida, volvería a…",
    "El objeto más importante que tengo no vale nada.",
    "Cuando era chico creía que…",
    "El último colectivo de la noche paró donde nunca para.",
    "Lo que más me gusta de mí es algo que casi nadie conoce.",
    "Había una vez una casa que se acordaba de todos los que habían vivido en ella.",
    "La primera vez que me animé a…",
    "Hoy quiero escribir sobre algo que me da un poco de miedo."
  ];
  var LISTAS = {
    perspectivas: [
      "Contá tu mañana de hoy como si la narrara tu perro, tu gato o tu planta.",
      "Describí tu trabajo como se lo explicarías a un chico de cinco años.",
      "Imaginá que sos un turista en tu propia ciudad: ¿qué te llamaría la atención?",
      "Contá una discusión reciente desde el punto de vista de la otra persona.",
      "Describí tu habitación como si fueras un arqueólogo del año 3000.",
      "Escribí sobre un problema tuyo como si le pasara a un personaje de novela.",
      "Mirá tu mano durante un minuto como si nunca la hubieras visto.",
      "Contá tu historia familiar como si fuera un cuento de hadas.",
      "Describí la ciudad de noche como la vería un murciélago.",
      "Escribí sobre tu día desde lo que escuchaste, no desde lo que viste."
    ],
    restricciones: [
      "Describí tu casa sin usar la letra «a».",
      "Contá una historia completa en seis palabras.",
      "Escribí sobre el amor sin usar la palabra «amor».",
      "Describí tu comida favorita usando solo verbos.",
      "Escribí un texto donde cada frase empiece con la letra siguiente del abecedario.",
      "Contá tu semana usando solo preguntas.",
      "Inventá un cuento donde el protagonista nunca hable.",
      "Describí a alguien que querés sin mencionar cómo es físicamente.",
      "Escribí un poema de cuatro líneas que rime con «mate».",
      "Contá un recuerdo en tiempo presente, como si estuviera pasando ahora."
    ],
    cuerpo: [
      "Caminá un minuto por tu casa como si fuera la primera vez que entrás. ¿Qué descubrís?",
      "Poné una canción y movete como se mueve el clima de hoy.",
      "Hacé una pose que represente cómo te sentís. Ahora una que represente cómo te gustaría sentirte.",
      "Tocá tres texturas distintas con los ojos cerrados y ponele un nombre inventado a cada una.",
      "Respirá lento tres veces e imaginá que el aire tiene un color. ¿Cuál es?",
      "Caminá a la mitad de tu velocidad habitual durante dos minutos.",
      "Dibujá en el aire, con todo el brazo, la forma de tu día.",
      "Elegí un animal y movete un minuto como él.",
      "Estirate como si te despertaras de un sueño de cien años.",
      "Escuchá tu cuerpo un minuto: ¿qué parte pide atención hoy?"
    ]
  };
  var SIMBOLOS = ["Una puerta", "Un árbol", "Un río", "Una llave", "Un puente", "Una casa", "Una escalera", "El mar", "Una montaña",
    "Un camino que se bifurca", "Una máscara", "Un espejo", "Un pájaro", "Una semilla", "Un fuego", "Una cueva", "Un barco",
    "Un jardín", "Una torre", "Un círculo", "Una serpiente", "La luna", "Un pozo", "Un niño", "Un anciano", "Una isla"];

  /* ---------- Utilidades ---------- */
  var azar = function (lista, evitar) {
    if (lista.length < 2) return lista[0];
    var x;
    do { x = lista[Math.floor(Math.random() * lista.length)]; } while (x === evitar);
    return x;
  };
  var unos = function (lista, n) {
    var copia = lista.slice(), out = [];
    while (out.length < n && copia.length) out.push(copia.splice(Math.floor(Math.random() * copia.length), 1)[0]);
    return out;
  };
  var poner = function (el, texto) {
    if (!el) return;
    el.classList.add("lab-cambia");
    setTimeout(function () { el.textContent = texto; el.classList.remove("lab-cambia"); }, 140);
  };
  var mmss = function (s) { return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); };
  var guardarArchivo = function (nombre, blob) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };
  var temporizador = function (segundos, reloj, alTerminar) {
    var resto = segundos, id = null;
    return {
      activo: function () { return id !== null; },
      empezar: function () {
        if (id) return;
        resto = segundos; reloj.textContent = mmss(resto); reloj.classList.add("en-marcha");
        id = setInterval(function () {
          resto--; reloj.textContent = mmss(Math.max(resto, 0));
          if (resto <= 0) { clearInterval(id); id = null; reloj.classList.remove("en-marcha"); alTerminar(); }
        }, 1000);
      },
      frenar: function () { if (id) { clearInterval(id); id = null; } reloj.classList.remove("en-marcha"); reloj.textContent = mmss(segundos); }
    };
  };

  /* ---------- Desafío del día ---------- */
  var diaTexto = raiz.querySelector("[data-lab-dia-texto]");
  var hoy = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
  diaTexto.textContent = DESAFIOS[hoy % DESAFIOS.length];
  raiz.querySelector("[data-lab-dia-otra]").addEventListener("click", function () { poner(diaTexto, azar(DESAFIOS, diaTexto.textContent)); });

  document.querySelectorAll("[data-lab-copiar]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = document.querySelector(b.getAttribute("data-lab-copiar")).textContent;
      var listo = function () { var o = b.textContent; b.textContent = "Copiado"; setTimeout(function () { b.textContent = o; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(listo, function () {});
    });
  });

  /* ---------- Combinar ---------- */
  var comb = document.querySelector("[data-lab-combinar]");
  if (comb) {
    var mezclar = function () {
      var par = unos(OBJETOS, 2);
      poner(comb.querySelector("[data-lab-a]"), par[0]);
      poner(comb.querySelector("[data-lab-b]"), par[1]);
      poner(comb.querySelector("[data-lab-lugar]"), azar(LUGARES));
    };
    comb.querySelector("[data-lab-mezclar]").addEventListener("click", mezclar);
    mezclar();
  }

  /* ---------- Usos imposibles ---------- */
  var usos = document.querySelector("[data-lab-usos]");
  if (usos) {
    var uTexto = usos.querySelector("[data-lab-usos-texto]"), uCont = usos.querySelector("[data-lab-usos-contador]");
    var uObj = usos.querySelector("[data-lab-usos-objeto]"), uEstado = usos.querySelector("[data-lab-usos-estado]");
    var uRefl = usos.querySelector("[data-lab-usos-reflexion]"), uBtn = usos.querySelector("[data-lab-usos-empezar]");
    var contarIdeas = function () {
      var n = uTexto.value.split("\n").filter(function (l) { return l.trim(); }).length;
      uCont.textContent = n + (n === 1 ? " idea" : " ideas");
      return n;
    };
    var uReloj = temporizador(120, usos.querySelector("[data-lab-reloj]"), function () {
      var n = contarIdeas();
      usos.querySelector("[data-lab-usos-total]").textContent = n;
      uRefl.hidden = false;
      uBtn.textContent = "Empezar de nuevo";
      uEstado.textContent = "Terminó el tiempo. Escribiste " + n + (n === 1 ? " idea." : " ideas.");
    });
    uTexto.addEventListener("input", contarIdeas);
    uBtn.addEventListener("click", function () {
      if (uReloj.activo()) return;
      uRefl.hidden = true; uEstado.textContent = "Empezaron los dos minutos.";
      uReloj.empezar(); uTexto.focus();
    });
    usos.querySelector("[data-lab-usos-otro]").addEventListener("click", function () {
      uReloj.frenar(); uRefl.hidden = true; uTexto.value = ""; contarIdeas();
      uBtn.textContent = "Empezar los 2 minutos";
      poner(uObj, azar(USOS, uObj.textContent));
    });
  }

  /* ---------- Escribir ---------- */
  var esc = document.querySelector("[data-lab-escribir]");
  if (esc) {
    var eCons = esc.querySelector("[data-lab-escribir-consigna]"), eTexto = esc.querySelector("[data-lab-escribir-texto]");
    var eCont = esc.querySelector("[data-lab-escribir-contador]"), eEstado = esc.querySelector("[data-lab-escribir-estado]");
    var eBtnReloj = esc.querySelector("[data-lab-escribir-reloj-btn]");
    var modo = function () { var m = esc.querySelector('input[name="lab-modo"]:checked'); return m ? m.value : "palabras"; };
    var consigna = function () {
      var m = modo();
      if (m === "palabras") {
        var p = unos(PALABRAS, 3);
        eCons.innerHTML = "Escribí una historia breve que incluya estas tres palabras: <strong></strong>.";
        eCons.querySelector("strong").textContent = p.join(", ");
      } else if (m === "frase") {
        eCons.innerHTML = "Empezá tu texto con esta frase y seguí sin frenar: <strong></strong>";
        eCons.querySelector("strong").textContent = "«" + azar(FRASES) + "»";
      } else {
        eCons.textContent = "Escribí lo que se te pase por la cabeza durante cinco minutos, sin corregir ni borrar. Si no sabés qué poner, escribí «no sé qué poner» hasta que aparezca otra cosa.";
      }
    };
    var contarPalabras = function () {
      var n = eTexto.value.trim() ? eTexto.value.trim().split(/\s+/).length : 0;
      eCont.textContent = n + (n === 1 ? " palabra" : " palabras");
      return n;
    };
    var eReloj = temporizador(300, esc.querySelector("[data-lab-escribir-reloj]"), function () {
      eBtnReloj.textContent = "Escribir 5 minutos";
      eEstado.textContent = "Terminaron los cinco minutos. Escribiste " + contarPalabras() + " palabras. Podés seguir si querés.";
    });
    esc.querySelectorAll('input[name="lab-modo"]').forEach(function (r) { r.addEventListener("change", consigna); });
    esc.querySelector("[data-lab-escribir-otro]").addEventListener("click", consigna);
    eTexto.addEventListener("input", contarPalabras);
    eBtnReloj.addEventListener("click", function () {
      if (eReloj.activo()) { eReloj.frenar(); eBtnReloj.textContent = "Escribir 5 minutos"; eEstado.textContent = "Reloj detenido."; return; }
      eReloj.empezar(); eBtnReloj.textContent = "Frenar el reloj"; eEstado.textContent = "Empezaron los cinco minutos."; eTexto.focus();
    });
    esc.querySelector("[data-lab-escribir-bajar]").addEventListener("click", function () {
      if (!eTexto.value.trim()) { eEstado.textContent = "Todavía no hay texto para guardar."; return; }
      guardarArchivo("laboratorio-de-creatividad.txt", new Blob([eCons.textContent + "\n\n" + eTexto.value], { type: "text/plain;charset=utf-8" }));
    });
    consigna();
  }

  /* ---------- Listas: perspectivas, restricciones, cuerpo ---------- */
  document.querySelectorAll("[data-lab-lista]").forEach(function (caja) {
    var lista = LISTAS[caja.getAttribute("data-lab-lista")] || [];
    var t = caja.querySelector("[data-lab-lista-texto]");
    caja.querySelector("[data-lab-lista-otra]").addEventListener("click", function () { poner(t, azar(lista, t.textContent)); });
  });

  /* ---------- Símbolos ---------- */
  var sim = document.querySelector("[data-lab-simbolo]");
  if (sim) {
    var sNom = sim.querySelector("[data-lab-simbolo-nombre]");
    sim.querySelector("[data-lab-simbolo-otro]").addEventListener("click", function () { poner(sNom, azar(SIMBOLOS, sNom.textContent)); });
    sNom.textContent = azar(SIMBOLOS);
  }

  /* ---------- El juego del garabato ---------- */
  var gar = document.querySelector("[data-lab-garabato]");
  if (gar) {
    var lienzo = gar.querySelector("[data-lab-lienzo]"), ctx = lienzo.getContext("2d");
    var W = lienzo.width, H = lienzo.height, trazos = [], garabato = [], actual = null;
    var css = function (v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); };
    var colorTrazo = function () {
      var c = gar.querySelector('input[name="lab-color"]:checked');
      return !c || c.value === "tinta" ? null : c.value;
    };
    var nuevoGarabato = function () {
      garabato = [];
      var x = W * (0.3 + Math.random() * 0.4), y = H * (0.3 + Math.random() * 0.4), ang = Math.random() * Math.PI * 2;
      var pasos = 5 + Math.floor(Math.random() * 4);
      garabato.push([x, y]);
      for (var i = 0; i < pasos; i++) {
        ang += (Math.random() - 0.5) * 2.4;
        var largo = 60 + Math.random() * 120;
        x = Math.min(W * 0.9, Math.max(W * 0.1, x + Math.cos(ang) * largo));
        y = Math.min(H * 0.9, Math.max(H * 0.1, y + Math.sin(ang) * largo));
        garabato.push([x, y]);
      }
    };
    var dibujarCurva = function (c, pts) {
      if (pts.length < 2) return;
      c.beginPath(); c.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < pts.length - 1; i++) {
        var mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
        c.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
      }
      var u = pts[pts.length - 1]; c.lineTo(u[0], u[1]); c.stroke();
    };
    var pintar = function (c, fondo) {
      c.clearRect(0, 0, W, H);
      if (fondo) { c.fillStyle = fondo; c.fillRect(0, 0, W, H); }
      c.lineCap = "round"; c.lineJoin = "round";
      c.strokeStyle = css("--terracota") || "#F4A261"; c.lineWidth = 7; dibujarCurva(c, garabato);
      var tinta = css("--tinta") || "#26241F";
      trazos.forEach(function (t) {
        c.strokeStyle = t.color || tinta; c.lineWidth = 4;
        if (t.pts.length === 1) { c.beginPath(); c.arc(t.pts[0][0], t.pts[0][1], 2, 0, Math.PI * 2); c.fillStyle = c.strokeStyle; c.fill(); }
        else dibujarCurva(c, t.pts);
      });
    };
    var punto = function (e) {
      var r = lienzo.getBoundingClientRect();
      return [(e.clientX - r.left) * (W / r.width), (e.clientY - r.top) * (H / r.height)];
    };
    lienzo.addEventListener("pointerdown", function (e) {
      e.preventDefault(); lienzo.setPointerCapture(e.pointerId);
      actual = { color: colorTrazo(), pts: [punto(e)] }; trazos.push(actual); pintar(ctx);
    });
    lienzo.addEventListener("pointermove", function (e) { if (!actual) return; actual.pts.push(punto(e)); pintar(ctx); });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) { lienzo.addEventListener(ev, function () { actual = null; }); });
    gar.querySelector("[data-lab-garabato-nuevo]").addEventListener("click", function () { trazos = []; nuevoGarabato(); pintar(ctx); });
    gar.querySelector("[data-lab-garabato-borrar]").addEventListener("click", function () { trazos = []; pintar(ctx); });
    gar.querySelector("[data-lab-garabato-bajar]").addEventListener("click", function () {
      var c2 = document.createElement("canvas"); c2.width = W; c2.height = H;
      pintar(c2.getContext("2d"), css("--papel") || "#FBF8F3");
      c2.toBlob(function (b) { if (b) guardarArchivo("mi-garabato.png", b); }, "image/png");
    });
    // Repintar si cambia el tema (claro/oscuro) para que la tinta siga siendo legible.
    new MutationObserver(function () { pintar(ctx); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-tema"] });
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", function () { pintar(ctx); });
    }
    nuevoGarabato(); pintar(ctx);
  }

  /* ---------- Plan de 7 días ---------- */
  var plan = document.querySelector("[data-lab-plan]");
  if (plan) {
    var CLAVE = "lab-creatividad-plan";
    var casillas = plan.querySelectorAll('input[type="checkbox"]'), prog = plan.querySelector("[data-lab-plan-progreso]");
    var leer = function () { try { return JSON.parse(localStorage.getItem(CLAVE) || "[]"); } catch (e) { return []; } };
    var escribir = function (v) { try { localStorage.setItem(CLAVE, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } };
    var actualizar = function () {
      var hechos = Array.prototype.filter.call(casillas, function (c) { return c.checked; }).map(function (c) { return c.value; });
      prog.textContent = hechos.length === 7 ? "¡7 de 7! Completaste el plan." : hechos.length + " de 7 días";
      plan.classList.toggle("completo", hechos.length === 7);
      escribir(hechos);
    };
    var guardados = leer();
    casillas.forEach(function (c) { c.checked = guardados.indexOf(c.value) >= 0; c.addEventListener("change", actualizar); });
    plan.querySelector("[data-lab-plan-reiniciar]").addEventListener("click", function () {
      casillas.forEach(function (c) { c.checked = false; }); actualizar();
    });
    actualizar();
  }
})();
