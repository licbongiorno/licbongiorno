/* Inmersión en la portada: partículas que responden al cursor y una leve inclinación del umbral.
   Solo escritorio con puntero fino; con movimiento reducido o pantallas chicas no hace nada.
   Se pausa cuando el hero no está en pantalla. No envía nada a ningún servidor. */
(function () {
  "use strict";
  var hero = document.querySelector(".hero");
  if (!hero) return;
  var reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var puntero = window.matchMedia && window.matchMedia("(min-width: 901px) and (pointer: fine)").matches;
  if (reducir || !puntero) return;

  // Estilo mínimo del lienzo, inyectado aquí para no tocar la hoja principal.
  var css = ".hero__motas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}" +
            ".hero__texto-col,.hero__visual{position:relative;z-index:1}" +
            ".umbral{transition:transform .6s cubic-bezier(.2,.7,.2,1);will-change:transform}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // ---------- Partículas ----------
  var lienzo = document.createElement("canvas");
  lienzo.className = "hero__motas"; lienzo.setAttribute("aria-hidden", "true");
  hero.insertBefore(lienzo, hero.firstChild);
  var ctx = lienzo.getContext("2d");
  var motas = [], w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var raton = { x: -9999, y: -9999 }, visible = true, rafId = 0;
  var COLORES = ["163,177,138", "244,162,97", "179,194,154"];

  function ajustar() {
    var r = hero.getBoundingClientRect();
    w = r.width; h = r.height;
    lienzo.width = Math.round(w * dpr); lienzo.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.min(70, Math.round((w * h) / 16000));
    motas = [];
    for (var i = 0; i < n; i++) {
      motas.push({ x: Math.random() * w, y: Math.random() * h,
                   vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
                   r: 0.8 + Math.random() * 2.2, a: 0.25 + Math.random() * 0.4,
                   c: COLORES[i % COLORES.length] });
    }
  }

  function cuadro() {
    rafId = 0;
    if (!visible) return;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < motas.length; i++) {
      var m = motas[i];
      var dx = m.x - raton.x, dy = m.y - raton.y, d2 = dx * dx + dy * dy;
      if (d2 < 140 * 140) {               // el cursor las aparta suavemente
        var d = Math.sqrt(d2) || 1, f = (140 - d) / 140 * 0.9;
        m.vx += (dx / d) * f * 0.12; m.vy += (dy / d) * f * 0.12;
      }
      m.vx *= 0.97; m.vy *= 0.97;
      m.vx += (Math.random() - 0.5) * 0.02; m.vy += (Math.random() - 0.5) * 0.02;
      m.x += m.vx; m.y += m.vy;
      if (m.x < -10) m.x = w + 10; if (m.x > w + 10) m.x = -10;
      if (m.y < -10) m.y = h + 10; if (m.y > h + 10) m.y = -10;
      ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + m.c + "," + m.a + ")"; ctx.fill();
    }
    rafId = requestAnimationFrame(cuadro);
  }
  function pedirCuadro() { if (!rafId && visible) rafId = requestAnimationFrame(cuadro); }

  hero.addEventListener("pointermove", function (e) {
    var r = hero.getBoundingClientRect();
    raton.x = e.clientX - r.left; raton.y = e.clientY - r.top;
    // Inclinación del umbral hacia el cursor.
    var u = hero.querySelector(".umbral");
    if (u) {
      var cx = (raton.x / w - 0.5), cy = (raton.y / h - 0.5);
      u.style.transform = "perspective(900px) rotateY(" + (cx * 6).toFixed(2) + "deg) rotateX(" + (-cy * 5).toFixed(2) + "deg)";
    }
    pedirCuadro();
  });
  hero.addEventListener("pointerleave", function () {
    raton.x = -9999; raton.y = -9999;
    var u = hero.querySelector(".umbral"); if (u) u.style.transform = "";
  });

  window.addEventListener("resize", function () { ajustar(); });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting; if (visible) pedirCuadro();
    }).observe(hero);
  }
  ajustar(); pedirCuadro();
})();
