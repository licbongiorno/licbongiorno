/* El hilo de la portada: un trazo fino que baja por el margen izquierdo en escritorio y avanza con el scroll.
   Aparece al salir del primer bloque y revela cada sección al alcanzarla. Con movimiento reducido queda estático
   y todo el contenido se ve completo. En tablet y móvil no se muestra. Sin servidor. */
(function () {
  "use strict";
  var hero = document.querySelector(".hero");
  if (!hero) return;
  if (window.matchMedia("(max-width: 1080px)").matches) return;
  var reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var css = ".hilo{position:fixed;left:4px;top:0;width:48px;height:calc(100vh - 120px);pointer-events:none;z-index:2;opacity:0;transition:opacity .6s ease}" +
    ".hilo.activo{opacity:1}" +
    ".hilo__trazo{fill:none;stroke:var(--salvia-profunda,#4A5A3C);stroke-width:2.4;stroke-linecap:round;opacity:.8}" +
    ".hilo__punta{fill:#F4A261;filter:drop-shadow(0 0 6px rgba(244,162,97,.55))}" +
    ".hilo__punta--pulso{animation:hilo-pulso 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}" +
    "@keyframes hilo-pulso{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.35);opacity:.5}}" +
    ".hilo-pendiente{opacity:.6;transition:opacity .9s ease}" +
    ".hilo-visto{opacity:1}" +
    "@media (max-width:1080px){.hilo{display:none}}" +
    "@media (prefers-reduced-motion:reduce){.hilo__punta--pulso{animation:none}.hilo{transition:none}.hilo-pendiente{opacity:1;transition:none}}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var NS = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "hilo"); svg.setAttribute("viewBox", "0 0 64 1000");
  svg.setAttribute("preserveAspectRatio", "none"); svg.setAttribute("aria-hidden", "true");
  var trazo = document.createElementNS(NS, "path");
  trazo.setAttribute("d", "M32 0 C 58 60, 6 120, 32 180 S 60 260, 30 330 S 4 420, 34 500 S 60 580, 30 660 S 6 740, 34 820 S 58 900, 32 1000");
  trazo.setAttribute("class", "hilo__trazo");
  var punta = document.createElementNS(NS, "circle");
  punta.setAttribute("r", "6"); punta.setAttribute("class", "hilo__punta hilo__punta--pulso");
  svg.appendChild(trazo); svg.appendChild(punta); document.body.appendChild(svg);

  var largo = trazo.getTotalLength();
  trazo.style.strokeDasharray = largo; trazo.style.strokeDashoffset = largo;

  var secciones = Array.prototype.slice.call(document.querySelectorAll("main section, main article"));
  if (!reducir) secciones.forEach(function (s) { s.classList.add("hilo-pendiente"); });

  var alto = 1000;
  function actualizar() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    svg.classList.toggle("activo", window.scrollY > window.innerHeight * 0.25);
    trazo.style.strokeDashoffset = (largo * (1 - p)).toFixed(1);
    var pt = trazo.getPointAtLength(Math.max(largo * p, 0.01));
    var sy = (window.innerHeight - 120) / alto;
    punta.setAttribute("cx", pt.x.toFixed(1));
    punta.setAttribute("cy", (pt.y * sy).toFixed(1));
    secciones.forEach(function (s) {
      if (s.getBoundingClientRect().top < window.innerHeight * 0.8) {
        s.classList.remove("hilo-pendiente"); s.classList.add("hilo-visto");
      }
    });
  }
  var pendiente = false;
  window.addEventListener("scroll", function () {
    if (!pendiente) { pendiente = true; requestAnimationFrame(function () { pendiente = false; actualizar(); }); }
  }, { passive: true });
  window.addEventListener("resize", actualizar);
  actualizar();
})();
