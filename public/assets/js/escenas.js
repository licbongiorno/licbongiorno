/* Escenas conceptuales — diagramas SVG que avanzan por pasos.
   <figure class="escena" data-escena> con un <svg> cuyos elementos llevan data-paso="N" (se muestran desde el paso N)
   y un <ol class="escena__textos"> con un <li> por paso (cuatro palabras como máximo).
   Opcional: data-escena-auto="2600" (ms por paso al reproducirse solo), data-escena-sync="selector de [data-lab-pasos]"
   para avanzar junto con unos pasos guiados, y data-escena-radios="name" para que una elección del usuario elija el paso.
   Sin JS o con movimiento reducido se ve la composición final. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-escena]").forEach(function (fig, nFig) {
    var svg = fig.querySelector("svg"), lista = fig.querySelector(".escena__textos");
    if (!svg || !lista) return;
    var textos = Array.prototype.map.call(lista.querySelectorAll("li"), function (li) { return li.textContent.trim(); });
    var n = textos.length, paso = n, timer = null, visto = false, enPantalla = false, manual = false;
    var piezas = svg.querySelectorAll("[data-paso]");
    var ms = parseInt(fig.getAttribute("data-escena-auto") || "2600", 10);

    // Controles y rótulo del paso actual.
    var barra = document.createElement("div");
    barra.className = "escena__barra";
    barra.innerHTML = '<p class="escena__rotulo" aria-live="polite"></p>' +
      '<div class="escena__puntos" aria-hidden="true">' + textos.map(function () { return "<span></span>"; }).join("") + "</div>" +
      '<div class="escena__controles">' +
      '<button type="button" class="escena__btn" data-escena-ant aria-label="Paso anterior">‹</button>' +
      '<button type="button" class="escena__btn" data-escena-sig aria-label="Paso siguiente">›</button>' +
      '<button type="button" class="escena__btn escena__btn--texto" data-escena-otra>Ver de nuevo</button></div>';
    fig.appendChild(barra);
    var rotulo = barra.querySelector(".escena__rotulo"), puntos = barra.querySelectorAll(".escena__puntos span");
    var bAnt = barra.querySelector("[data-escena-ant]"), bSig = barra.querySelector("[data-escena-sig]");
    lista.classList.add("visualmente-oculto");
    fig.classList.add("escena--js");

    var pintar = function () {
      fig.setAttribute("data-actual", String(paso));
      fig.classList.toggle("escena--final", paso === n);
      piezas.forEach(function (p) {
        var desde = parseInt(p.getAttribute("data-paso"), 10), hasta = parseInt(p.getAttribute("data-hasta") || "99", 10);
        var on = paso >= desde && paso <= hasta;
        p.classList.toggle("on", on);
        p.classList.toggle("actual", desde === paso);
      });
      puntos.forEach(function (s, k) { s.classList.toggle("on", k < paso); });
      rotulo.textContent = textos[paso - 1] || "";
      bAnt.disabled = paso <= 1;
      bSig.disabled = paso >= n;
      fig.dispatchEvent(new CustomEvent("escena:paso", { detail: { paso: paso, total: n } }));
    };
    var parar = function () { if (timer) { clearInterval(timer); timer = null; } fig.classList.remove("escena--reproduciendo"); };
    var reproducir = function () {
      parar();
      if (reducir) { paso = n; pintar(); return; }
      paso = 1; pintar();
      fig.classList.add("escena--reproduciendo");
      timer = setInterval(function () {
        if (!enPantalla) return; // se pausa fuera de pantalla
        if (paso >= n) { parar(); return; }
        paso++; pintar();
      }, ms);
    };
    bAnt.addEventListener("click", function () { manual = true; parar(); if (paso > 1) { paso--; pintar(); } });
    bSig.addEventListener("click", function () { manual = true; parar(); if (paso < n) { paso++; pintar(); } });
    barra.querySelector("[data-escena-otra]").addEventListener("click", function () { manual = false; reproducir(); });

    // Sincronía con pasos guiados (por ejemplo, la pendulación).
    var sync = fig.getAttribute("data-escena-sync");
    if (sync) {
      var guia = document.querySelector(sync);
      if (guia) guia.addEventListener("lab:paso", function (e) { manual = true; parar(); paso = Math.min(n, (e.detail.i || 0) + 1); pintar(); });
    }
    // Una elección del usuario lleva a un paso (por ejemplo, la zona de la ventana de tolerancia).
    var radios = fig.getAttribute("data-escena-radios");
    if (radios) {
      document.addEventListener("change", function (e) {
        var t = e.target;
        if (t.name !== radios || !t.checked) return;
        var destino = parseInt(t.getAttribute("data-escena-paso") || "0", 10);
        if (destino) { manual = true; parar(); fig.classList.add("escena--eleccion"); paso = destino; pintar(); }
      });
    }

    // Estado inicial: composición final (también es la alternativa sin JS). Al entrar en pantalla por primera vez, se reproduce.
    pintar();
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          enPantalla = en.isIntersecting;
          if (enPantalla && !visto && !manual) { visto = true; reproducir(); }
        });
      }, { threshold: 0.45 }).observe(fig);
    } else enPantalla = true;
    fig.setAttribute("data-escena-n", String(nFig));
  });
})();
