/* Visualizaciones que responden a lo que hace la persona en los laboratorios.
   Cada bloque se activa solo si su elemento está en la página. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lleno = function (el) { return el && el.value && el.value.trim().length > 0; };
  var crear = function (html, clase, etiqueta) {
    var fig = document.createElement("figure");
    fig.className = "viz " + (clase || "");
    fig.innerHTML = html;
    var svg = fig.querySelector("svg");
    if (svg) { svg.setAttribute("role", "img"); if (etiqueta) svg.setAttribute("aria-label", etiqueta); }
    return fig;
  };

  /* Viaje del héroe y tres vías del sentido: lo que escribís enciende la etapa o llena la corriente. */
  [["[data-heroe] .etapa[data-campo]", "hecha"], ["[data-vias] .esc-via[data-campo]", "llena"]].forEach(function (par) {
    document.querySelectorAll(par[0]).forEach(function (el) {
      var campo = document.getElementById(el.getAttribute("data-campo"));
      if (!campo) return;
      var ver = function () { el.classList.toggle(par[1], lleno(campo)); };
      campo.addEventListener("input", ver); ver();
    });
  });

  /* Humanista: yo real y yo ideal como dos círculos; el deslizador de distancia los acerca o los aleja. */
  var yr = document.querySelector("[data-yo-real] #yr-distancia");
  if (yr) {
    var figY = crear('<svg viewBox="0 0 600 200"><circle class="viz-real" cx="300" cy="100" r="70"/><circle class="viz-ideal" cx="300" cy="100" r="70"/>' +
      '<text class="viz-t" data-t="real" x="300" y="190" text-anchor="middle">yo real</text><text class="viz-t" data-t="ideal" x="300" y="22" text-anchor="middle">yo ideal</text>' +
      '<text class="viz-t viz-acento" data-t="cong" x="300" y="106" text-anchor="middle">congruencia</text></svg>', "viz--congruencia", "");
    yr.closest(".lab-paso").appendChild(figY);
    var cR = figY.querySelector(".viz-real"), cI = figY.querySelector(".viz-ideal");
    var tR = figY.querySelector('[data-t="real"]'), tI = figY.querySelector('[data-t="ideal"]'), tC = figY.querySelector('[data-t="cong"]');
    var pintarY = function () {
      var d = (+yr.value) * 22; // 0 a 220 unidades entre centros
      cR.style.transform = "translateX(" + (-d / 2) + "px)"; cI.style.transform = "translateX(" + (d / 2) + "px)";
      tR.setAttribute("x", 300 - d / 2); tI.setAttribute("x", 300 + d / 2);
      tC.style.opacity = d <= 70 ? "1" : "0";
      figY.querySelector("svg").setAttribute("aria-label", "Dos círculos, yo real y yo ideal, " + (d <= 70 ? "muy superpuestos: hay congruencia." : d <= 140 ? "parcialmente superpuestos." : "separados: hay mucha distancia."));
    };
    yr.addEventListener("input", pintarY); pintarY();
  }

  /* ACT · hojas en el río: escribís un pensamiento, aparece en una hoja y el río se la lleva. */
  var hojas = document.getElementById("hojas");
  if (hojas) {
    var caja = document.createElement("div");
    caja.className = "lab-tarjeta viz-rio";
    caja.innerHTML = '<div class="lab-lle__fila"><label class="visualmente-oculto" for="rio-pensamiento">Un pensamiento</label>' +
      '<input class="lab-campo" id="rio-pensamiento" type="text" placeholder="Escribí un pensamiento" autocomplete="off" maxlength="60">' +
      '<button class="boton boton--chico" type="button" data-rio-soltar>Ponerlo en una hoja</button></div>' +
      '<div class="viz-rio__agua" aria-hidden="true"><svg viewBox="0 0 600 140" preserveAspectRatio="none"><path class="viz-rio__onda" d="M0 40 C 100 25, 200 55, 300 40 S 500 25, 600 40"/><path class="viz-rio__onda viz-rio__onda--2" d="M0 100 C 100 85, 200 115, 300 100 S 500 85, 600 100"/></svg><div class="viz-rio__hojas"></div></div>' +
      '<p class="lab-paso__ayuda" role="status" data-rio-estado></p>';
    var ancla = hojas.querySelector("[data-lab-pasos]");
    hojas.insertBefore(caja, ancla);
    var inp = caja.querySelector("#rio-pensamiento"), cont = caja.querySelector(".viz-rio__hojas"), est = caja.querySelector("[data-rio-estado]");
    var soltar = function () {
      var t = inp.value.trim();
      if (!t) { est.textContent = "Escribí un pensamiento para ponerlo en una hoja."; inp.focus(); return; }
      var hoja = document.createElement("div");
      hoja.className = "viz-hoja";
      hoja.style.top = (18 + Math.random() * 46) + "%";
      hoja.innerHTML = '<svg viewBox="0 0 40 24" aria-hidden="true"><path d="M2 12 C 10 0, 30 0, 38 12 C 30 24, 10 24, 2 12 Z"/><path class="viz-hoja__nervio" d="M4 12 L 36 12"/></svg><span></span>';
      hoja.querySelector("span").textContent = t;
      cont.appendChild(hoja);
      inp.value = "";
      est.textContent = "«" + t + "» va en una hoja. Miralo pasar, sin empujarlo ni retenerlo.";
      var fin = function () { hoja.remove(); };
      if (reducir) setTimeout(fin, 3500); else hoja.addEventListener("animationend", fin);
    };
    caja.querySelector("[data-rio-soltar]").addEventListener("click", soltar);
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); soltar(); } });
  }

  /* Emociones · termómetro que se llena según la intensidad. */
  var emo = document.querySelector("[data-emo-termometro] #emo-nivel");
  if (emo) {
    var figT = crear('<svg viewBox="0 0 60 200"><rect x="22" y="10" width="16" height="150" rx="8" class="viz-tubo"/><rect x="25" y="13" width="10" height="144" rx="5" class="viz-mercurio"/><circle cx="30" cy="172" r="18" class="viz-bulbo"/></svg>', "viz--termometro", "");
    emo.closest("[data-emo-termometro]").classList.add("con-viz");
    emo.closest("[data-emo-termometro]").prepend(figT);
    var merc = figT.querySelector(".viz-mercurio"), bulbo = figT.querySelector(".viz-bulbo");
    var pintarT = function () {
      var v = +emo.value, k = v / 10;
      merc.style.transform = "scaleY(" + Math.max(k, .04) + ")";
      var col = v <= 3 ? "var(--salvia-profunda)" : v <= 6 ? "#C08A2E" : "var(--terracota-profunda)";
      merc.style.fill = col; bulbo.style.fill = col;
      figT.querySelector("svg").setAttribute("aria-label", "Termómetro emocional en " + v + " de 10");
    };
    emo.addEventListener("input", pintarT); pintarT();
  }

  /* Estrés · semáforo de tres luces. */
  var sem = document.querySelector("[data-semaforo-resultado]");
  if (sem) {
    var figS = crear('<svg viewBox="0 0 60 150"><rect x="5" y="5" width="50" height="140" rx="22" class="viz-semaforo"/><circle cx="30" cy="35" r="15" data-luz="rojo"/><circle cx="30" cy="75" r="15" data-luz="amarillo"/><circle cx="30" cy="115" r="15" data-luz="verde"/></svg>', "viz--semaforo", "");
    sem.parentNode.insertBefore(figS, sem);
    sem.parentNode.classList.add("con-semaforo");
    var pintarS = function () {
      var c = sem.getAttribute("data-color");
      figS.querySelectorAll("[data-luz]").forEach(function (l) { l.classList.toggle("encendida", l.getAttribute("data-luz") === c); });
      figS.querySelector("svg").setAttribute("aria-label", "Semáforo en " + (c || "verde"));
    };
    new MutationObserver(pintarS).observe(sem, { attributes: true, attributeFilter: ["data-color"] }); pintarS();
  }

  /* Ánimo · cada actividad como un punto según su placer y su logro. */
  var filas = document.querySelector("[data-ra-filas]");
  if (filas) {
    var figA = crear('<svg viewBox="0 0 320 240"><line x1="40" y1="200" x2="300" y2="200" class="viz-eje"/><line x1="40" y1="200" x2="40" y2="20" class="viz-eje"/>' +
      '<text x="300" y="228" text-anchor="end" class="viz-eje-t">placer →</text><text x="12" y="20" class="viz-eje-t" transform="rotate(-90 12 20)" text-anchor="end">logro →</text>' +
      '<rect x="170" y="20" width="130" height="90" class="viz-mejor"/><g class="viz-puntos"></g></svg>', "viz--animo", "Gráfico de placer y logro sin actividades todavía");
    filas.closest(".tabla-desplazable").after(figA);
    var gP = figA.querySelector(".viz-puntos");
    var pintarA = function () {
      var datos = Array.prototype.filter.call(filas.querySelectorAll("tr"), function (tr) { return tr.children.length === 4; }).map(function (tr) {
        return { a: tr.children[0].textContent, p: +tr.children[1].textContent, l: +tr.children[2].textContent };
      });
      gP.innerHTML = "";
      datos.forEach(function (d, i) {
        var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute("cx", 40 + d.p * 26); c.setAttribute("cy", 200 - d.l * 18); c.setAttribute("r", 7);
        c.setAttribute("class", "viz-punto" + (d.p + d.l >= 14 ? " viz-punto--alto" : ""));
        c.style.animationDelay = (i * 40) + "ms";
        var t = document.createElementNS("http://www.w3.org/2000/svg", "title"); t.textContent = d.a + ": placer " + d.p + ", logro " + d.l; c.appendChild(t);
        gP.appendChild(c);
      });
      figA.hidden = !datos.length;
      figA.querySelector("svg").setAttribute("aria-label", "Gráfico de placer y logro con " + datos.length + " actividades");
    };
    new MutationObserver(pintarA).observe(filas, { childList: true }); pintarA();
  }

  /* Diálogo socrático · cuánto lo creés, antes y después. */
  var antes = document.getElementById("ds-antes"), despues = document.getElementById("ds-despues");
  if (antes && despues) {
    var figD = crear('<svg viewBox="0 0 320 90"><text x="0" y="28" class="viz-eje-t">antes</text><rect x="70" y="14" width="240" height="20" rx="10" class="viz-pista"/><rect x="70" y="14" width="240" height="20" rx="10" class="viz-barra viz-barra--antes"/>' +
      '<text x="0" y="70" class="viz-eje-t">ahora</text><rect x="70" y="56" width="240" height="20" rx="10" class="viz-pista"/><rect x="70" y="56" width="240" height="20" rx="10" class="viz-barra viz-barra--ahora"/></svg>', "viz--creencia", "");
    despues.closest(".lab-paso").appendChild(figD);
    var bA = figD.querySelector(".viz-barra--antes"), bD = figD.querySelector(".viz-barra--ahora");
    var num = function (el) { var n = parseInt(el.value, 10); return isNaN(n) ? 0 : Math.max(0, Math.min(100, n)); };
    var pintarD = function () {
      bA.style.transform = "scaleX(" + (num(antes) / 100) + ")"; bD.style.transform = "scaleX(" + (num(despues) / 100) + ")";
      figD.hidden = !lleno(antes) && !lleno(despues);
      figD.querySelector("svg").setAttribute("aria-label", "Antes lo creías " + num(antes) + " sobre 100; ahora " + num(despues) + ".");
    };
    [antes, despues].forEach(function (el) { el.addEventListener("input", pintarD); }); pintarD();
  }

  /* Ansiedad · la escalera de exposición dibujada con tus escalones. */
  var esc = document.querySelector("#escalera [data-lle-lista]");
  if (esc) {
    var figE = crear('<svg viewBox="0 0 600 220"><g class="viz-escalones"></g></svg>', "viz--escalera", "");
    esc.after(figE);
    var gE = figE.querySelector(".viz-escalones");
    var pintarE = function () {
      var items = Array.prototype.map.call(esc.querySelectorAll("[data-lle-texto]"), function (x) { return x.textContent; });
      var n = items.length, ancho = n ? Math.min(150, 560 / n) : 0;
      gE.innerHTML = "";
      items.forEach(function (t, i) {
        var h = 30 + i * (160 / Math.max(n, 1)), x = 20 + i * ancho, y = 210 - h;
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "viz-escalon"); g.style.animationDelay = (i * 70) + "ms";
        g.innerHTML = '<rect x="' + x + '" y="' + y + '" width="' + (ancho - 4) + '" height="' + h + '" rx="6"/><text x="' + (x + 8) + '" y="' + (y + 22) + '">' + (i + 1) + "</text>";
        var tt = document.createElementNS("http://www.w3.org/2000/svg", "title"); tt.textContent = (i + 1) + ". " + t; g.appendChild(tt);
        gE.appendChild(g);
      });
      figE.hidden = !n;
      figE.querySelector("svg").setAttribute("aria-label", "Escalera de " + n + " escalones, de menor a mayor ansiedad");
    };
    new MutationObserver(pintarE).observe(esc, { childList: true, subtree: true }); pintarE();
  }

  /* Aprender · la curva del olvido y cómo cada repaso la levanta. */
  var rep = document.querySelector("[data-esp-lista]");
  if (rep) {
    var dias = [0, 1, 3, 7, 14, 30], X = function (d) { return 30 + Math.sqrt(d) * 100; };
    var tramos = "", y0 = 30;
    for (var k = 0; k < dias.length; k++) {
      var d0 = dias[k], d1 = k < dias.length - 1 ? dias[k + 1] : 31, caida = 110 / (k + 1);
      tramos += '<path class="viz-curva" d="M' + X(d0) + " " + y0 + " C " + (X(d0) + 12) + " " + (y0 + caida * .8) + ", " + (X(d1) - 20) + " " + (y0 + caida) + ", " + X(d1) + " " + (y0 + caida) + '"/>';
      if (k < dias.length - 1) tramos += '<line class="viz-repaso" x1="' + X(d1) + '" y1="' + (y0 + caida) + '" x2="' + X(d1) + '" y2="' + y0 + '"/><circle class="viz-punto" cx="' + X(d1) + '" cy="' + y0 + '" r="5"/>';
    }
    var figR = crear('<svg viewBox="0 0 600 190"><line x1="30" y1="170" x2="590" y2="170" class="viz-eje"/><text x="590" y="186" text-anchor="end" class="viz-eje-t">días</text><text x="34" y="22" class="viz-eje-t">lo que recordás</text>' + tramos + "</svg>",
      "viz--olvido", "Curva del olvido: lo que recordás cae con el tiempo y cada repaso lo vuelve a subir; las caídas son cada vez más suaves.");
    rep.closest(".lab-resultado").before(figR);
  }

  /* Narrativo · dos historias: la alternativa se engrosa a medida que se cuenta. */
  var alt = document.getElementById("hi-alt");
  if (alt) {
    var figH = crear('<svg viewBox="0 0 600 150"><path class="viz-hilo viz-hilo--dom" d="M20 55 C 140 25, 220 85, 330 55 S 500 25, 580 55"/>' +
      '<path class="viz-hilo viz-hilo--alt punteado" d="M20 105 C 140 75, 220 135, 330 105 S 500 75, 580 105"/>' +
      '<text x="20" y="22" class="viz-eje-t">historia dominante</text><text x="20" y="145" class="viz-eje-t">historia alternativa</text></svg>', "viz--historias", "");
    alt.closest(".lab-tabla2").after(figH);
    var hDom = figH.querySelector(".viz-hilo--dom"), hAlt = figH.querySelector(".viz-hilo--alt");
    var pintarH = function () {
      var n = (alt.value.trim().match(/\S+/g) || []).length;
      var w = n === 0 ? 1.5 : n <= 20 ? 3 : n <= 60 ? 5 : 8;
      hAlt.style.strokeWidth = w; hAlt.classList.toggle("punteado", n <= 20);
      hDom.style.strokeWidth = Math.max(2.5, 10 - w);
      figH.querySelector("svg").setAttribute("aria-label", n === 0 ? "La historia dominante es un hilo grueso; la alternativa, un hilo fino y punteado." :
        "La historia alternativa tiene " + n + " palabras y su hilo se está engrosando.");
    };
    alt.addEventListener("input", pintarH); pintarH();
  }

  /* Mito personal · la línea de vida como un camino con tus capítulos. */
  var cap = document.querySelector("#linea [data-lle-lista]"), prox = document.getElementById("lv-proximo");
  if (cap) {
    var NS = "http://www.w3.org/2000/svg";
    var figL = crear('<svg viewBox="0 0 600 200"><path class="viz-camino" d="M20 100 C 90 50, 150 150, 220 100 S 360 50, 430 100 S 540 150, 590 100"/><g class="viz-caps"></g></svg>', "viz--linea", "");
    cap.closest("[data-lab-lista-editable]").after(figL);
    var gC = figL.querySelector(".viz-caps"), camino = figL.querySelector(".viz-camino");
    var corto = function (t) { return t.length > 16 ? t.slice(0, 15) + "…" : t; };
    var pintarL = function () {
      var titulos = Array.prototype.map.call(cap.querySelectorAll("[data-lle-texto]"), function (x) { return x.textContent; });
      var hayProx = lleno(prox), total = titulos.length + (hayProx ? 1 : 0);
      figL.hidden = !total; // visible antes de medir el camino
      var largo = camino.getTotalLength();
      gC.innerHTML = "";
      var nodos = titulos.map(function (t, i) { return { t: t, cl: i === titulos.length - 1 ? "ahora" : "" }; });
      if (hayProx) nodos.push({ t: prox.value.trim(), cl: "proximo" });
      nodos.forEach(function (nd, i) {
        var pt = camino.getPointAtLength(largo * (total === 1 ? .5 : .06 + .88 * i / (total - 1)));
        var g = document.createElementNS(NS, "g"); g.setAttribute("class", "viz-capitulo " + nd.cl); g.style.animationDelay = (i * 60) + "ms";
        var c = document.createElementNS(NS, "circle"); c.setAttribute("cx", pt.x); c.setAttribute("cy", pt.y); c.setAttribute("r", nd.cl ? 9 : 7);
        var tx = document.createElementNS(NS, "text"); tx.setAttribute("x", pt.x); tx.setAttribute("y", i % 2 ? pt.y + 34 : pt.y - 20); tx.setAttribute("text-anchor", pt.x < 110 ? "start" : pt.x > 490 ? "end" : "middle");
        tx.textContent = nd.cl === "proximo" ? "próximo" : corto(nd.t);
        var ti = document.createElementNS(NS, "title"); ti.textContent = (nd.cl === "proximo" ? "Próximo capítulo: " : (i + 1) + ". ") + nd.t;
        g.appendChild(ti); g.appendChild(c); g.appendChild(tx); gC.appendChild(g);
      });
      figL.hidden = !total;
      figL.querySelector("svg").setAttribute("aria-label", "Línea de vida con " + titulos.length + " capítulos" + (hayProx ? " y un próximo capítulo" : ""));
    };
    new MutationObserver(pintarL).observe(cap, { childList: true, subtree: true, characterData: true });
    if (prox) prox.addEventListener("input", pintarL);
    pintarL();
  }

  /* Sistémico · preguntas circulares: cada pregunta mira una relación entre otros. */
  var pc = document.querySelector("[data-gen-preguntas]");
  if (pc) {
    var P4 = { vos: [180, 220], a: [60, 110], b: [180, 30], c: [300, 110] };
    var pares = [["a", "b"], ["b", "c"], ["a", "c"]];
    var arcos = pares.map(function (p) { var x1 = P4[p[0]], x2 = P4[p[1]]; return '<line class="viz-arco on" data-par="' + p.join("") + '" x1="' + x1[0] + '" y1="' + x1[1] + '" x2="' + x2[0] + '" y2="' + x2[1] + '"/>'; }).join("") +
      ["a", "b", "c"].map(function (k) { return '<line class="viz-arco viz-arco--vos" x1="180" y1="220" x2="' + P4[k][0] + '" y2="' + P4[k][1] + '"/>'; }).join("");
    var personas = Object.keys(P4).map(function (k) { return '<circle class="viz-persona' + (k === "vos" ? " viz-persona--vos" : "") + '" data-persona="' + k + '" cx="' + P4[k][0] + '" cy="' + P4[k][1] + '" r="' + (k === "vos" ? 22 : 18) + '"/>'; }).join("");
    var figC = crear('<svg viewBox="0 0 360 260">' + arcos + personas + '<text x="180" y="226" text-anchor="middle">vos</text></svg>', "viz--circular",
      "Una red de cuatro personas: las preguntas circulares miran las relaciones entre los otros, no solo a vos.");
    pc.insertBefore(figC, pc.querySelector("[data-pc-pregunta]"));
    var ultimo = -1;
    var mostrarRel = function () {
      var k; do { k = Math.floor(Math.random() * pares.length); } while (k === ultimo && pares.length > 1);
      ultimo = k;
      figC.querySelectorAll(".viz-arco[data-par]").forEach(function (l, i) { l.classList.toggle("on", i === k); });
      figC.querySelectorAll(".viz-persona").forEach(function (c) { c.classList.toggle("on", pares[k].indexOf(c.getAttribute("data-persona")) >= 0); });
    };
    var otra = pc.querySelector("[data-pc-otra]");
    if (otra) otra.addEventListener("click", mostrarRel);
  }
})();
