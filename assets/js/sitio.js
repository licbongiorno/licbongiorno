/* Lic. Nicolás Raúl Bongiorno — interacción del sitio. Sin dependencias.
   Todo es mejora progresiva: sin JavaScript el sitio se lee y se navega completo. */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cfg = {};
  try { cfg = JSON.parse(document.getElementById("config-sitio").textContent); } catch (err) { /* sin config */ }
  doc.classList.add("js");

  /* ---------- Cabecera que se compacta al desplazarse ---------- */
  var cabecera = document.querySelector(".cabecera");
  if (cabecera) {
    var marcarScroll = function () { cabecera.classList.toggle("con-scroll", window.scrollY > 12); };
    marcarScroll();
    window.addEventListener("scroll", marcarScroll, { passive: true });
  }

  /* ---------- Menú móvil ---------- */
  var botonMenu = document.querySelector(".menu-boton");
  var menu = document.getElementById("menu-movil");
  function cerrarMenu(devolverFoco) {
    if (!doc.classList.contains("menu-abierto")) return;
    doc.classList.remove("menu-abierto");
    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.querySelector(".menu-boton__texto").textContent = "Menú";
    menu.setAttribute("inert", "");
    if (devolverFoco) botonMenu.focus();
  }
  if (botonMenu && menu) {
    menu.setAttribute("inert", "");
    botonMenu.addEventListener("click", function () {
      var abrir = !doc.classList.contains("menu-abierto");
      if (!abrir) return cerrarMenu(false);
      doc.classList.add("menu-abierto");
      botonMenu.setAttribute("aria-expanded", "true");
      botonMenu.querySelector(".menu-boton__texto").textContent = "Cerrar";
      menu.removeAttribute("inert");
      var primero = menu.querySelector("a");
      if (primero) setTimeout(function () { primero.focus(); }, 60);
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) cerrarMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrarMenu(true); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1080) cerrarMenu(false); });
  }

  /* ---------- Submenú de escritorio (disclosure accesible) ---------- */
  document.querySelectorAll(".nav__desplegar").forEach(function (btn) {
    var sub = document.getElementById(btn.getAttribute("aria-controls"));
    if (!sub) return;
    var item = btn.parentElement;
    function abrir(v) { btn.setAttribute("aria-expanded", v ? "true" : "false"); sub.classList.toggle("abierto", v); }
    btn.addEventListener("click", function () { abrir(btn.getAttribute("aria-expanded") !== "true"); });
    item.addEventListener("mouseenter", function () { if (window.matchMedia("(hover: hover)").matches) abrir(true); });
    item.addEventListener("mouseleave", function () { if (window.matchMedia("(hover: hover)").matches) abrir(false); });
    item.addEventListener("focusout", function (e) { if (!item.contains(e.relatedTarget)) abrir(false); });
    item.addEventListener("keydown", function (e) { if (e.key === "Escape") { abrir(false); btn.focus(); } });
  });

  /* ---------- Entrada del hero ---------- */
  var hero = document.querySelector(".hero");
  if (hero) requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add("listo"); }); });

  /* ---------- Revelado al desplazarse ---------- */
  var revelables = document.querySelectorAll(".revelar");
  if ("IntersectionObserver" in window && !reducido) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revelables.forEach(function (el) { io.observe(el); });
  } else {
    revelables.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Parallax moderado (solo escritorio, sin movimiento reducido) ---------- */
  var capas = document.querySelectorAll("[data-parallax]");
  if (capas.length && !reducido && window.matchMedia("(min-width: 901px) and (pointer: fine)").matches) {
    var pendiente = false;
    var mover = function () {
      pendiente = false;
      var y = window.scrollY;
      capas.forEach(function (c) {
        var f = parseFloat(c.getAttribute("data-parallax")) || 0.1;
        if (y < window.innerHeight * 1.5) c.style.transform = "translate3d(0," + (y * f).toFixed(1) + "px,0)";
      });
    };
    window.addEventListener("scroll", function () { if (!pendiente) { pendiente = true; requestAnimationFrame(mover); } }, { passive: true });
  }

  /* ---------- Carrusel de reseñas ---------- */
  document.querySelectorAll(".carrusel").forEach(function (car) {
    var pista = car.querySelector(".carrusel__pista");
    var prev = car.querySelector("[data-carrusel='prev']");
    var next = car.querySelector("[data-carrusel='next']");
    if (!pista || !prev || !next) return;
    function paso() { var it = pista.firstElementChild; return it ? it.getBoundingClientRect().width + 20 : 300; }
    function estado() {
      var max = pista.scrollWidth - pista.clientWidth - 2;
      prev.disabled = pista.scrollLeft <= 2;
      next.disabled = pista.scrollLeft >= max;
      var controles = car.querySelector(".carrusel__controles");
      if (controles) controles.hidden = max <= 0;
    }
    prev.addEventListener("click", function () { pista.scrollBy({ left: -paso(), behavior: reducido ? "auto" : "smooth" }); });
    next.addEventListener("click", function () { pista.scrollBy({ left: paso(), behavior: reducido ? "auto" : "smooth" }); });
    pista.addEventListener("scroll", function () { requestAnimationFrame(estado); }, { passive: true });
    window.addEventListener("resize", estado);
    estado();
  });

  /* ---------- Formulario de contacto ---------- */
  var form = document.getElementById("form-contacto");
  if (form) {
    var estadoEl = form.querySelector(".formulario__estado");
    var inicio = Date.now();
    var mostrar = function (msg, tipo) { estadoEl.textContent = msg; estadoEl.className = "formulario__estado " + (tipo || ""); };
    var validar = function () {
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (campo) {
        var err = document.getElementById(campo.id + "-error");
        var valido = campo.type === "checkbox" ? campo.checked : campo.value.trim().length > 1;
        if (valido && campo.type === "email" && campo.value) valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value.trim());
        campo.setAttribute("aria-invalid", valido ? "false" : "true");
        if (err) err.textContent = valido ? "" : (campo.getAttribute("data-error") || "Revisá este campo.");
        if (!valido && ok) { ok = false; campo.focus(); }
      });
      return ok;
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.querySelector(".trampa input").value) return; // bot
      if (Date.now() - inicio < 2500) { mostrar("Un momento… volvé a intentarlo en unos segundos.", "error"); return; }
      if (!validar()) { mostrar("Faltan algunos datos. Revisá los campos marcados.", "error"); return; }

      var d = new FormData(form);
      var datos = {
        nombre: (d.get("nombre") || "").toString().trim(),
        contacto: (d.get("contacto") || "").toString().trim(),
        modalidad: (d.get("modalidad") || "").toString(),
        lugar: (d.get("lugar") || "").toString().trim(),
        mensaje: (d.get("mensaje") || "").toString().trim().slice(0, 600)
      };

      if (cfg.formEndpoint) {
        var boton = form.querySelector("[type=submit]");
        boton.disabled = true;
        mostrar("Enviando…");
        fetch(cfg.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(Object.assign({ _subject: "Consulta desde la web" }, datos))
        }).then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          mostrar("Gracias. Recibí tu mensaje y te respondo a la brevedad por el medio que indicaste.", "ok");
          evento("formulario_enviado", { modalidad: datos.modalidad });
        }).catch(function () {
          mostrar("No se pudo enviar. Podés escribirme directamente por WhatsApp.", "error");
        }).finally(function () { boton.disabled = false; });
        return;
      }

      // Sin servicio de formularios: se arma el mensaje y se abre WhatsApp. No se guarda nada en servidores propios.
      var texto = "Hola, Nicolás. Soy " + datos.nombre + ". Te escribo desde tu web." +
        (datos.modalidad ? " Me interesa la atención " + datos.modalidad + "." : "") +
        (datos.lugar ? " Escribo desde " + datos.lugar + "." : "") +
        (datos.mensaje ? " " + datos.mensaje : "") +
        " Mi contacto: " + datos.contacto;
      var url = "https://wa.me/" + cfg.whatsapp + "?text=" + encodeURIComponent(texto);
      evento("formulario_whatsapp", { modalidad: datos.modalidad });
      mostrar("Se abrió WhatsApp con tu mensaje listo para enviar. Si no se abrió, tocá el botón verde de WhatsApp.", "ok");
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- Medición de clics de contacto (si hay GA4 con consentimiento) ---------- */
  function evento(nombre, params) { if (typeof window.gtag === "function") window.gtag("event", nombre, params || {}); }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]");
    if (!a) return;
    var h = a.getAttribute("href");
    if (h.indexOf("wa.me") > -1) evento("clic_whatsapp", { ubicacion: a.getAttribute("data-ubicacion") || "otro" });
    else if (/instagram|facebook|linkedin|doctoralia/.test(h)) evento("clic_red", { destino: a.hostname });
    else if (h.indexOf("maps.") > -1) evento("clic_mapa", {});
  });

  /* ---------- Consentimiento y Google Analytics 4 ---------- */
  if (cfg.ga4) {
    var clave = "nb-consentimiento";
    var guardado = null;
    try { guardado = localStorage.getItem(clave); } catch (err) { /* modo privado */ }
    var cargarGA = function () {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.ga4);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", cfg.ga4, { anonymize_ip: true });
    };
    var banner = document.getElementById("consentimiento");
    if (guardado === "si") cargarGA();
    else if (guardado !== "no" && banner) {
      banner.hidden = false;
      banner.addEventListener("click", function (e) {
        var b = e.target.closest("[data-consentir]");
        if (!b) return;
        var v = b.getAttribute("data-consentir");
        try { localStorage.setItem(clave, v); } catch (err) { /* sin almacenamiento */ }
        banner.hidden = true;
        if (v === "si") cargarGA();
      });
    }
  }
})();
