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

  /* ---------- Escalonado automático en grillas y listas ---------- */
  document.querySelectorAll(".motivos, .rasgos, .articulos, .opiniones, .pasos, .otras-corrientes, .modalidades, .canales, .glosario, .relacionados ul").forEach(function (grupo) {
    Array.prototype.forEach.call(grupo.children, function (hijo, i) {
      if (!hijo.classList.contains("revelar") && !grupo.closest(".revelar:not(.visible)")) hijo.classList.add("revelar");
      if (!hijo.style.getPropertyValue("--retraso")) hijo.style.setProperty("--retraso", ((i % 6) * 0.07).toFixed(2) + "s");
    });
  });

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
    var CHECK = '<svg class="check-ok" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle pathLength="1" cx="13" cy="13" r="11.5"/><path pathLength="1" d="m8 13.5 3.4 3.3L18.5 9.5"/></svg>';
    var mostrar = function (msg, tipo) {
      estadoEl.className = "formulario__estado " + (tipo || "");
      estadoEl.textContent = "";
      if (tipo === "ok") estadoEl.insertAdjacentHTML("afterbegin", CHECK);
      var sp = document.createElement("span"); sp.textContent = msg; estadoEl.appendChild(sp);
    };
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
        mensaje: (d.get("mensaje") || "").toString().trim().slice(0, 600),
        horario: (d.get("horario") || "").toString(),
        origen: (d.get("origen") || "").toString()
      };

      if (cfg.formEndpoint) {
        var boton = form.querySelector("[type=submit]");
        boton.disabled = true;
        boton.classList.add("cargando");
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
        }).finally(function () { boton.disabled = false; boton.classList.remove("cargando"); });
        return;
      }

      // Sin servicio de formularios: se arma el mensaje y se abre WhatsApp. No se guarda nada en servidores propios.
      var texto = "Hola, Nicolás. Soy " + datos.nombre + ". Te escribo desde tu web." +
        (datos.modalidad ? " Me interesa la atención " + datos.modalidad + "." : "") +
        (datos.lugar ? " Escribo desde " + datos.lugar + "." : "") +
        (datos.horario ? " Me queda mejor a la " + datos.horario.toLowerCase() + "." : "") +
        (datos.mensaje ? " " + datos.mensaje : "") +
        (datos.origen ? " (Te conocí por: " + datos.origen + ".)" : "") +
        " Mi contacto: " + datos.contacto;
      var url = "https://wa.me/" + cfg.whatsapp + "?text=" + encodeURIComponent(texto);
      evento("formulario_whatsapp", { modalidad: datos.modalidad });
      mostrar("Se abrió WhatsApp con tu mensaje listo para enviar. Si no se abrió, tocá el botón verde de WhatsApp.", "ok");
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- Números que cuentan al aparecer ---------- */
  var contadores = document.querySelectorAll("[data-contar]");
  if (contadores.length && "IntersectionObserver" in window && !reducido) {
    var ioN = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        ioN.unobserve(en.target);
        var el = en.target, fin = parseInt(el.getAttribute("data-contar"), 10), pre = el.getAttribute("data-prefijo") || "";
        if (!fin) return;
        var t0 = null, dur = 1400;
        var paso = function (t) {
          if (!t0) t0 = t;
          var k = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3);
          el.textContent = pre + Math.round(fin * e);
          if (k < 1) requestAnimationFrame(paso);
        };
        el.textContent = pre + "0";
        requestAnimationFrame(paso);
      });
    }, { threshold: 0.6 });
    contadores.forEach(function (el) { ioN.observe(el); });
  }

  /* ---------- Barra de progreso de lectura ---------- */
  var barra = document.querySelector(".progreso-lectura span");
  var articulo = document.querySelector("article");
  if (barra && articulo) {
    var pendienteP = false;
    var actualizar = function () {
      pendienteP = false;
      var r = articulo.getBoundingClientRect();
      var total = r.height - window.innerHeight;
      var k = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 1;
      barra.style.transform = "scaleX(" + k.toFixed(4) + ")";
    };
    window.addEventListener("scroll", function () { if (!pendienteP) { pendienteP = true; requestAnimationFrame(actualizar); } }, { passive: true });
    actualizar();
  }

  /* ---------- Carrusel: puntos de posición y arrastre con mouse ---------- */
  document.querySelectorAll(".carrusel").forEach(function (car) {
    var pista = car.querySelector(".carrusel__pista");
    var puntos = car.querySelector(".carrusel__puntos");
    if (!pista) return;
    var items = pista.children;
    if (puntos) {
      for (var i = 0; i < items.length; i++) puntos.appendChild(document.createElement("i"));
      var marcar = function () {
        var w = items[0] ? items[0].getBoundingClientRect().width + 20 : 1;
        var idx = Math.round(pista.scrollLeft / w);
        if (pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 4) idx = items.length - 1;
        Array.prototype.forEach.call(puntos.children, function (p, n) { p.classList.toggle("activo", n === idx); });
      };
      pista.addEventListener("scroll", function () { requestAnimationFrame(marcar); }, { passive: true });
      marcar();
    }
    var x0 = 0, s0 = 0, activo = false, movio = false;
    pista.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      activo = true; movio = false; x0 = e.clientX; s0 = pista.scrollLeft;
    });
    window.addEventListener("pointermove", function (e) {
      if (!activo) return;
      var dx = e.clientX - x0;
      if (Math.abs(dx) > 4) { movio = true; pista.classList.add("arrastrando"); }
      pista.scrollLeft = s0 - dx;
    });
    window.addEventListener("pointerup", function () {
      if (!activo) return;
      activo = false;
      pista.classList.remove("arrastrando");
      if (movio) {
        var w = items[0] ? items[0].getBoundingClientRect().width + 20 : 300;
        pista.scrollTo({ left: Math.round(pista.scrollLeft / w) * w, behavior: reducido ? "auto" : "smooth" });
      }
    });
    pista.addEventListener("click", function (e) { if (movio) { e.preventDefault(); movio = false; } }, true);
  });

  /* ---------- Indicador deslizante en el menú de escritorio ---------- */
  var lista = document.querySelector(".nav__lista");
  if (lista && !reducido && window.matchMedia("(hover: hover)").matches) {
    var ind = document.createElement("span");
    ind.className = "nav__indicador";
    var navEl = lista.parentElement;
    navEl.appendChild(ind);
    navEl.classList.add("nav--con-indicador");
    var ir = function (el) {
      if (!el) { ind.style.opacity = "0"; return; }
      var lr = navEl.getBoundingClientRect(), r = el.getBoundingClientRect();
      ind.style.width = (r.width - 24) + "px";
      ind.style.transform = "translateX(" + (r.left - lr.left + 12) + "px)";
      ind.style.opacity = "1";
    };
    var actual = function () {
      return lista.querySelector('.nav__enlace[aria-current="page"]') || lista.querySelector(".nav__desplegar[data-actual]");
    };
    lista.querySelectorAll(".nav__enlace, .nav__desplegar").forEach(function (el) {
      el.addEventListener("mouseenter", function () { ir(el); });
      el.addEventListener("focus", function () { ir(el); });
    });
    lista.addEventListener("mouseleave", function () { ir(actual()); });
    window.addEventListener("resize", function () { ir(actual()); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ir(actual()); }); else ir(actual());
  }

  /* ---------- Asistente «Empezar en 3 pasos» ---------- */
  var asis = document.getElementById("asistente");
  if (asis) {
    var texto = asis.querySelector(".asistente__texto");
    var enviar = asis.querySelector(".asistente__enviar");
    var pasos = asis.querySelectorAll(".asistente__paso");
    var armar = function () {
      var v = function (n) { var el = asis.querySelector('input[name="' + n + '"]:checked'); return el ? el.value : ""; };
      var motivo = v("motivo"), modalidad = v("modalidad"), horario = v("horario");
      var t = "Hola, Nicolás. Te escribo desde tu web.";
      if (motivo && motivo !== "Todavía no lo sé") t += " Quería consultarte por: " + motivo.toLowerCase() + ".";
      else if (motivo) t += " Quería hacer una consulta, aunque todavía no sé bien por dónde empezar.";
      if (modalidad === "Presencial en Alta Gracia") t += " Prefiero atención presencial en Alta Gracia.";
      else if (modalidad === "Online") t += " Prefiero atención online.";
      if (horario && horario !== "Cualquiera") t += " Me queda mejor a la " + horario.toLowerCase() + ".";
      t += " ¿Tenés disponibilidad?";
      if (texto.textContent !== t) {
        texto.classList.add("cambiando");
        setTimeout(function () { texto.textContent = t; texto.classList.remove("cambiando"); }, 160);
      }
      enviar.href = "https://wa.me/" + cfg.whatsapp + "?text=" + encodeURIComponent(t);
      var completos = 0;
      pasos.forEach(function (p) {
        var lleno = !!p.querySelector("input:checked");
        p.classList.toggle("completo", lleno);
        if (lleno) completos++;
      });
      asis.setAttribute("data-completos", completos);
      var actual = null;
      pasos.forEach(function (p) { p.classList.remove("actual"); if (!actual && !p.classList.contains("completo")) actual = p; });
      if (actual && completos > 0) actual.classList.add("actual");
      enviar.classList.toggle("listo", completos === pasos.length);
    };
    asis.addEventListener("change", armar);
    asis.addEventListener("submit", function (e) { e.preventDefault(); });
    enviar.addEventListener("click", function () { evento("asistente_enviado", {}); });
    armar();
  }

  /* ---------- Barra de contacto en celular: aparece al bajar ---------- */
  var barraM = document.querySelector(".barra-movil");
  if (barraM) {
    var pendienteB = false;
    var verBarra = function () {
      pendienteB = false;
      var fin = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160;
      barraM.classList.toggle("visible", window.scrollY > window.innerHeight * 0.6 && !fin);
    };
    window.addEventListener("scroll", function () { if (!pendienteB) { pendienteB = true; requestAnimationFrame(verBarra); } }, { passive: true });
    verBarra();
  }

  var punteroFino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Cabecera inteligente: se oculta al bajar y vuelve al subir ---------- */
  if (cabecera && !reducido) {
    var ultimoY = window.scrollY, pendienteC = false;
    var cabeceraScroll = function () {
      pendienteC = false;
      var y = window.scrollY, delta = y - ultimoY;
      var ocultar = y > 240 && delta > 6 && !doc.classList.contains("menu-abierto") && !cabecera.contains(document.activeElement);
      if (ocultar) cabecera.classList.add("oculta");
      else if (delta < -6 || y < 240) cabecera.classList.remove("oculta");
      if (Math.abs(delta) > 6) ultimoY = y;
    };
    window.addEventListener("scroll", function () { if (!pendienteC) { pendienteC = true; requestAnimationFrame(cabeceraScroll); } }, { passive: true });
    cabecera.addEventListener("focusin", function () { cabecera.classList.remove("oculta"); });
  }

  /* ---------- Manifiesto: las palabras se encienden al desplazarse ---------- */
  var frase = document.querySelector(".manifiesto__frase");
  if (frase && !reducido && "IntersectionObserver" in window) {
    var palabras = [];
    var envolver = function (nodo) {
      Array.prototype.slice.call(nodo.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(t)); return; }
            var s = document.createElement("span"); s.className = "palabra"; s.textContent = t; frag.appendChild(s); palabras.push(s);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) envolver(n);
      });
    };
    envolver(frase);
    frase.classList.add("frase-viva");
    var pendienteF = false, activaF = false;
    var encender = function () {
      pendienteF = false;
      var r = frase.getBoundingClientRect(), h = window.innerHeight;
      var p = Math.min(Math.max((h * 0.88 - r.top) / (h * 0.88 - h * 0.3), 0), 1);
      var n = Math.round(p * palabras.length);
      palabras.forEach(function (w, i) { w.classList.toggle("encendida", i < n); });
    };
    new IntersectionObserver(function (es) { activaF = es[0].isIntersecting; if (activaF) encender(); }).observe(frase);
    window.addEventListener("scroll", function () { if (activaF && !pendienteF) { pendienteF = true; requestAnimationFrame(encender); } }, { passive: true });
  }

  /* ---------- Luz que sigue al cursor en tarjetas ---------- */
  if (punteroFino && !reducido) {
    document.querySelectorAll(".motivo, .articulo-tarjeta, .modalidad, .opinion, .rasgo, .canal").forEach(function (t) {
      t.classList.add("con-foco");
      t.addEventListener("pointermove", function (e) {
        var r = t.getBoundingClientRect();
        t.style.setProperty("--mx", (e.clientX - r.left) + "px");
        t.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- Botones principales con atracción magnética sutil ---------- */
  if (punteroFino && !reducido) {
    document.querySelectorAll(".hero .boton, .cta .boton, .cabecera__cta, .asistente__enviar").forEach(function (bt) {
      bt.addEventListener("pointermove", function (e) {
        var r = bt.getBoundingClientRect();
        var dx = (e.clientX - r.left - r.width / 2) / (r.width / 2), dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        bt.style.setProperty("--magx", (dx * 5).toFixed(1) + "px");
        bt.style.setProperty("--magy", (dy * 4).toFixed(1) + "px");
      });
      bt.addEventListener("pointerleave", function () { bt.style.setProperty("--magx", "0px"); bt.style.setProperty("--magy", "0px"); });
    });
  }

  /* ---------- Hero: profundidad que responde al puntero ---------- */
  if (hero && punteroFino && !reducido) {
    var pendienteH = false, ex = 0, ey = 0;
    hero.addEventListener("pointermove", function (e) {
      ex = (e.clientX / window.innerWidth - 0.5) * 2; ey = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!pendienteH) { pendienteH = true; requestAnimationFrame(function () {
        pendienteH = false; hero.style.setProperty("--px", ex.toFixed(3)); hero.style.setProperty("--py", ey.toFixed(3));
      }); }
    });
    hero.addEventListener("pointerleave", function () { hero.style.setProperty("--px", 0); hero.style.setProperty("--py", 0); });
  }

  /* ---------- Pausar animaciones continuas fuera de pantalla o con la pestaña oculta ---------- */
  if ("IntersectionObserver" in window) {
    var ioPausa = new IntersectionObserver(function (es) {
      es.forEach(function (en) { en.target.classList.toggle("en-pausa", !en.isIntersecting); });
    });
    document.querySelectorAll(".umbral, .orbitas, .hero__fondo, .modalidad__deco").forEach(function (el) { ioPausa.observe(el); });
  }
  document.addEventListener("visibilitychange", function () { doc.classList.toggle("pestana-oculta", document.hidden); });

  /* ---------- Saludo de WhatsApp (escritorio, una vez por visita) ---------- */
  var flot = document.querySelector(".wa-flotante");
  if (flot && window.matchMedia("(min-width: 641px)").matches && location.pathname.indexOf("/contacto") !== 0) {
    var visto = false;
    try { visto = sessionStorage.getItem("nb-saludo") === "1"; } catch (err) { /* sin almacenamiento */ }
    if (!visto) {
      setTimeout(function () {
        if (doc.classList.contains("menu-abierto")) return;
        var bur = document.createElement("div");
        bur.className = "wa-burbuja";
        bur.innerHTML = '<a href="' + flot.getAttribute("href") + '" target="_blank" rel="noopener" data-ubicacion="burbuja">¿Querés coordinar una primera entrevista? Escribime y lo vemos.</a><button type="button" aria-label="Cerrar mensaje">×</button>';
        flot.parentNode.insertBefore(bur, flot);
        requestAnimationFrame(function () { bur.classList.add("visible"); });
        var cerrar = function () { bur.classList.remove("visible"); setTimeout(function () { bur.remove(); }, 400); };
        bur.querySelector("button").addEventListener("click", cerrar);
        setTimeout(cerrar, 14000);
        try { sessionStorage.setItem("nb-saludo", "1"); } catch (err) { /* sin almacenamiento */ }
      }, 9000);
    }
  }

  /* ---------- Compartir: copiar enlace y menú nativo ---------- */
  document.querySelectorAll(".compartir").forEach(function (bloque) {
    var est = bloque.querySelector(".compartir__estado");
    var copiar = bloque.querySelector("[data-copiar]");
    var nativo = bloque.querySelector("[data-compartir]");
    if (copiar) copiar.addEventListener("click", function () {
      var url = copiar.getAttribute("data-copiar");
      var listo = function () { copiar.classList.add("copiado"); est.textContent = "Enlace copiado"; setTimeout(function () { copiar.classList.remove("copiado"); est.textContent = ""; }, 2400); evento("compartir", { metodo: "copiar" }); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(listo, function () { window.prompt("Copiá el enlace:", url); });
      else window.prompt("Copiá el enlace:", url);
    });
    if (nativo && navigator.share) {
      nativo.hidden = false;
      nativo.addEventListener("click", function () {
        navigator.share({ title: nativo.getAttribute("data-titulo"), url: nativo.getAttribute("data-compartir") }).then(function () { evento("compartir", { metodo: "nativo" }); }, function () {});
      });
    }
  });

  /* ---------- Buscador de artículos (Recursos) ---------- */
  var buscador = document.getElementById("buscar-articulos");
  if (buscador) {
    var tarjetas = document.querySelectorAll(".articulos .articulo-tarjeta");
    var estadoB = document.getElementById("buscar-estado");
    var normal = function (t) { return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); };
    var textos = Array.prototype.map.call(tarjetas, function (t) { return normal(t.textContent); });
    var filtrar = function () {
      var q = normal(buscador.value.trim()), n = 0;
      tarjetas.forEach(function (t, i) {
        var ve = !q || q.split(/\s+/).every(function (p) { return textos[i].indexOf(p) > -1; });
        t.hidden = !ve; if (ve) n++;
      });
      estadoB.textContent = q ? (n ? n + (n === 1 ? " artículo" : " artículos") : "Sin resultados. Probá con otra palabra.") : "";
    };
    buscador.addEventListener("input", filtrar);
    var qInicial = new URLSearchParams(location.search).get("q");
    if (qInicial) { buscador.value = qInicial; filtrar(); }
  }

  /* ---------- Índice del artículo: resalta la sección en lectura ---------- */
  var indice = document.querySelector(".indice-articulo");
  if (indice && "IntersectionObserver" in window) {
    var enlacesI = indice.querySelectorAll("a");
    var ioI = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        enlacesI.forEach(function (a) { a.classList.toggle("activo", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    enlacesI.forEach(function (a) { var h = document.getElementById(a.getAttribute("href").slice(1)); if (h) ioI.observe(h); });
  }

  /* ---------- Modo claro / oscuro ---------- */
  var oscuroSistema = window.matchMedia("(prefers-color-scheme: dark)");
  var temaActual = function () { return doc.getAttribute("data-tema") || (oscuroSistema.matches ? "oscuro" : "claro"); };
  var marcarBotones = function () {
    var t = temaActual();
    document.querySelectorAll(".tema-boton").forEach(function (b) {
      b.setAttribute("aria-label", t === "oscuro" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      b.setAttribute("aria-pressed", t === "oscuro" ? "true" : "false");
    });
  };
  document.querySelectorAll(".tema-boton").forEach(function (b) {
    b.addEventListener("click", function () {
      var nuevo = temaActual() === "oscuro" ? "claro" : "oscuro";
      if (!reducido) { doc.classList.add("cambiando-tema"); setTimeout(function () { doc.classList.remove("cambiando-tema"); }, 600); }
      doc.setAttribute("data-tema", nuevo);
      try { localStorage.setItem("nb-tema", nuevo); } catch (err) { /* sin almacenamiento */ }
      marcarBotones();
      evento("cambio_tema", { tema: nuevo });
    });
  });
  if (oscuroSistema.addEventListener) oscuroSistema.addEventListener("change", marcarBotones);
  marcarBotones();

  /* ---------- Enlaces directos a preguntas frecuentes: abrir y resaltar ---------- */
  var abrirDestino = function () {
    if (!location.hash) return;
    var el; try { el = document.querySelector(location.hash); } catch (err) { return; }
    var det = el && (el.tagName === "DETAILS" ? el : el.closest("details"));
    if (det && !det.classList.contains("indice-articulo")) {
      det.open = true;
      det.classList.remove("destacada"); void det.offsetWidth; det.classList.add("destacada");
      setTimeout(function () { det.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "center" }); }, 60);
    }
  };
  abrirDestino();
  window.addEventListener("hashchange", abrirDestino);

  /* ---------- Fotos diferidas que se funden al cargar ---------- */
  document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
    if (img.complete && img.naturalWidth) return;
    img.classList.add("por-cargar");
    var listo = function () { img.classList.add("cargada"); };
    img.addEventListener("load", listo, { once: true });
    img.addEventListener("error", listo, { once: true });
  });

  /* ---------- Volver arriba con anillo de progreso ---------- */
  var arriba = document.querySelector(".volver-arriba");
  if (arriba) {
    var pendienteA = false;
    var medir = function () {
      pendienteA = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var k = max > 0 ? window.scrollY / max : 0;
      arriba.style.setProperty("--avance", (1 - k).toFixed(3));
      arriba.classList.toggle("visible", window.scrollY > window.innerHeight * 1.5);
    };
    window.addEventListener("scroll", function () { if (!pendienteA) { pendienteA = true; requestAnimationFrame(medir); } }, { passive: true });
    arriba.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reducido ? "auto" : "smooth" });
      var destino = document.getElementById("contenido");
      if (destino) { destino.setAttribute("tabindex", "-1"); destino.focus({ preventScroll: true }); }
    });
    medir();
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
