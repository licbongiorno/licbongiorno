/* Laboratorio de resolución de problemas: un resolvedor guiado en seis pasos, con evaluación de alternativas.
   Requiere lab-base.js. Todo queda solo en este navegador. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;
  var leer = function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  var guardar = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  var esc = function (t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };

  /* ================= Resolvedor guiado ================= */
  var rp = document.querySelector("[data-rp]");
  if (rp) {
    var CLAVE = "resolver-problemas";
    var vacio = function () { return { paso: 0, problemas: [], elegido: -1, def: {}, alternativas: [], puntajes: {}, plan: {}, revision: {} }; };
    var E = leer(CLAVE) || vacio();
    var pasos = rp.querySelectorAll("[data-rp-paso]"), barra = rp.querySelector("[data-rp-barra]"), estado = rp.querySelector("[data-rp-estado]");
    var ant = rp.querySelector("[data-rp-ant]"), sig = rp.querySelector("[data-rp-sig]");
    var NOMBRES = ["Mis problemas", "Definir", "Alternativas", "Decidir", "Plan", "Probar y revisar"];
    var CRIT = [["resuelve", "¿Cuánto resuelve el problema?"], ["puedo", "¿Qué tan capaz soy de hacerlo?"], ["mi", "¿Qué tan bueno es para mí, a corto y largo plazo?"], ["otros", "¿Qué tan bueno es para los demás?"]];
    var guardarE = function () { guardar(CLAVE, E); };

    /* Paso 1: lista de problemas */
    var listaP = rp.querySelector("[data-rp-problemas]"), inP = rp.querySelector("[data-rp-problema-texto]");
    var pintarProblemas = function () {
      listaP.innerHTML = "";
      if (!E.problemas.length) { listaP.innerHTML = '<li class="rp-vacio">Todavía no anotaste problemas.</li>'; return; }
      E.problemas.forEach(function (p, k) {
        var li = document.createElement("li");
        li.className = "rp-problema" + (k === E.elegido ? " rp-problema--elegido" : "");
        li.innerHTML = '<span class="rp-problema__texto">' + esc(p.t) + '</span>' +
          '<label class="visualmente-oculto" for="rp-tipo-' + k + '">Tipo de problema</label><select class="lab-campo rp-problema__tipo" id="rp-tipo-' + k + '" data-k="' + k + '">' +
          '<option value="">¿Qué tipo es?</option><option value="s"' + (p.c === "s" ? " selected" : "") + '>Solucionable</option>' +
          '<option value="n"' + (p.c === "n" ? " selected" : "") + '>No solucionable</option><option value="i"' + (p.c === "i" ? " selected" : "") + '>No tan importante</option></select>' +
          '<div class="rp-problema__acciones"><button type="button" class="boton boton--chico' + (k === E.elegido ? "" : " boton--secundario") + '" data-elegir="' + k + '" aria-pressed="' + (k === E.elegido) + '">' + (k === E.elegido ? "Elegido" : "Trabajar este") + '</button>' +
          '<button type="button" class="rp-quitar" data-quitar="' + k + '" aria-label="Quitar «' + esc(p.t) + '»">×</button></div>';
        listaP.appendChild(li);
      });
    };
    var agregarProblema = function () {
      var t = inP.value.trim();
      if (!t) return;
      E.problemas.push({ t: t, c: "" });
      inP.value = "";
      if (E.elegido < 0 && E.problemas.length === 1) E.elegido = 0;
      guardarE(); pintarProblemas();
      inP.focus();
    };
    rp.querySelector("[data-rp-agregar-problema]").addEventListener("click", agregarProblema);
    inP.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); agregarProblema(); } });
    listaP.addEventListener("change", function (e) { var s = e.target.closest("select[data-k]"); if (!s) return; E.problemas[+s.dataset.k].c = s.value; guardarE(); pintarProblemas(); mensajeTipo(+s.dataset.k); });
    listaP.addEventListener("click", function (e) {
      var b = e.target.closest("[data-elegir]"), q = e.target.closest("[data-quitar]");
      if (b) { E.elegido = +b.dataset.elegir; guardarE(); pintarProblemas(); mensajeTipo(E.elegido); }
      if (q) { var k = +q.dataset.quitar; E.problemas.splice(k, 1); if (E.elegido === k) E.elegido = -1; else if (E.elegido > k) E.elegido--; guardarE(); pintarProblemas(); }
    });
    var avisoTipo = rp.querySelector("[data-rp-aviso-tipo]");
    var mensajeTipo = function (k) {
      var p = E.problemas[k];
      if (!p || k !== E.elegido) { avisoTipo.textContent = ""; return; }
      avisoTipo.textContent = p.c === "n" ? "Elegiste un problema que hoy no se puede resolver. Podés trabajar una parte que sí dependa de vos, o ir a la estación de problemas que no se resuelven, más abajo." :
        p.c === "i" ? "Si no es tan importante, quizás convenga empezar por otro: la energía es limitada." : "";
    };

    /* Paso 2: definir (campos simples) */
    var camposSimples = rp.querySelectorAll("[data-rp-campo]");
    camposSimples.forEach(function (c) {
      var r = c.getAttribute("data-rp-campo").split(".");
      if (E[r[0]] && E[r[0]][r[1]] != null) c.value = E[r[0]][r[1]];
      c.addEventListener("input", function () { E[r[0]] = E[r[0]] || {}; E[r[0]][r[1]] = c.value; guardarE(); if (r[0] === "revision") revisar(); });
    });
    var tituloElegido = rp.querySelectorAll("[data-rp-elegido]");
    var pintarElegido = function () { var p = E.problemas[E.elegido]; tituloElegido.forEach(function (t) { t.textContent = p ? "«" + p.t + "»" : "(todavía no elegiste un problema en el paso 1)"; }); };

    /* Paso 3: alternativas */
    var listaA = rp.querySelector("[data-rp-alternativas]"), inA = rp.querySelector("[data-rp-alt-texto]"), cuentaA = rp.querySelector("[data-rp-alt-cuenta]");
    var pintarAlternativas = function () {
      listaA.innerHTML = "";
      E.alternativas.forEach(function (a, k) {
        var li = document.createElement("li");
        li.innerHTML = '<span>' + esc(a) + '</span><button type="button" class="rp-quitar" data-quitar-alt="' + k + '" aria-label="Quitar «' + esc(a) + '»">×</button>';
        listaA.appendChild(li);
      });
      var n = E.alternativas.length;
      cuentaA.textContent = n === 0 ? "Sin alternativas todavía." : n < 5 ? n + (n === 1 ? " alternativa" : " alternativas") + ". Seguí: la cantidad trae calidad. Intentá llegar a cinco o más." : n + " alternativas. Muy bien. Si querés, combiná algunas.";
    };
    var agregarAlt = function () { var t = inA.value.trim(); if (!t) return; E.alternativas.push(t); inA.value = ""; guardarE(); pintarAlternativas(); inA.focus(); };
    rp.querySelector("[data-rp-agregar-alt]").addEventListener("click", agregarAlt);
    inA.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); agregarAlt(); } });
    listaA.addEventListener("click", function (e) {
      var q = e.target.closest("[data-quitar-alt]"); if (!q) return;
      var k = +q.dataset.quitarAlt, t = E.alternativas[k];
      E.alternativas.splice(k, 1); delete E.puntajes[t]; guardarE(); pintarAlternativas();
    });
    var IDEAS = ["¿Qué harías si tuvieras el doble de tiempo?", "¿Qué le aconsejarías a un amigo con este mismo problema?", "¿A quién podrías pedirle ayuda o información?",
      "¿Qué harías si no tuvieras miedo?", "¿Cómo lo resolvería alguien que admirás?", "¿Qué podrías hacer en solo diez minutos?", "¿Y si dividieras el problema en partes más chicas?",
      "¿Qué recursos tenés que no estás usando?", "¿Qué pasa si hacés lo contrario de lo que venís haciendo?", "¿Qué solución absurda se te ocurre? A veces esconde una idea útil.",
      "¿Qué podrías dejar de hacer?", "¿Podrías cambiar el objetivo en lugar del camino?", "¿Hay alguna institución, servicio o grupo que se ocupe de esto?"];
    var idea = rp.querySelector("[data-rp-idea]");
    rp.querySelector("[data-rp-otra-idea]").addEventListener("click", function () { LAB.poner(idea, LAB.azar(IDEAS, idea.textContent)); });
    idea.textContent = LAB.azar(IDEAS);

    /* Paso 4: decidir */
    var tablaD = rp.querySelector("[data-rp-decidir]"), ranking = rp.querySelector("[data-rp-ranking]");
    var total = function (a) { var p = E.puntajes[a] || {}; return CRIT.reduce(function (s, c) { return s + (+p[c[0]] || 3); }, 0); };
    var pintarDecidir = function () {
      tablaD.innerHTML = "";
      if (!E.alternativas.length) { tablaD.innerHTML = '<p class="rp-vacio">Primero anotá alternativas en el paso 3.</p>'; ranking.innerHTML = ""; return; }
      E.alternativas.forEach(function (a, k) {
        var p = E.puntajes[a] || {};
        var div = document.createElement("fieldset");
        div.className = "rp-alt";
        div.innerHTML = "<legend>" + esc(a) + "</legend>" + CRIT.map(function (c) {
          var v = p[c[0]] || 3, id = "rp-" + k + "-" + c[0];
          return '<div class="rp-crit"><label for="' + id + '">' + c[1] + '</label><input type="range" min="1" max="5" value="' + v + '" id="' + id + '" data-alt="' + k + '" data-crit="' + c[0] + '"><output for="' + id + '">' + v + "</output></div>";
        }).join("");
        tablaD.appendChild(div);
      });
      pintarRanking();
    };
    var pintarRanking = function () {
      var orden = E.alternativas.slice().sort(function (x, y) { return total(y) - total(x); });
      ranking.innerHTML = "<p class=\"lab-tarjeta__titulo\">Cómo quedaron</p><ol>" + orden.map(function (a, i) {
        return "<li" + (i === 0 ? ' class="rp-ganadora"' : "") + "><strong>" + esc(a) + "</strong> · " + total(a) + " de 20</li>";
      }).join("") + "</ol><p class=\"lab-paso__ayuda\">El puntaje orienta, no decide por vos. A veces conviene combinar las dos mejores.</p>";
    };
    tablaD.addEventListener("input", function (e) {
      var i = e.target.closest("input[data-alt]"); if (!i) return;
      var a = E.alternativas[+i.dataset.alt];
      E.puntajes[a] = E.puntajes[a] || {};
      E.puntajes[a][i.dataset.crit] = +i.value;
      i.nextElementSibling.textContent = i.value;
      guardarE(); pintarRanking();
    });

    /* Paso 6: revisar */
    var salidaR = rp.querySelector("[data-rp-revision-salida]");
    var revisar = function () {
      var s = +((E.revision || {}).satisfaccion || 0), hecho = (E.revision || {}).hecho;
      if (!hecho) { salidaR.textContent = ""; return; }
      salidaR.textContent = s >= 7 ? "Buen resultado. Reconocete el esfuerzo: resolver problemas es una habilidad que se entrena, y la acabás de usar." :
        s >= 4 ? "Resultado parcial. Mirá qué funcionó y qué no, y ajustá el plan o probá la segunda alternativa." :
        "No salió como esperabas. No es un fracaso: es información. Volvé al paso 2 para revisar la definición, o al paso 3 para buscar otras alternativas.";
    };

    /* Navegación */
    var ir = function (n) {
      E.paso = Math.max(0, Math.min(pasos.length - 1, n));
      pasos.forEach(function (p, k) { p.hidden = k !== E.paso; });
      barra.style.width = ((E.paso + 1) / pasos.length * 100) + "%";
      estado.textContent = "Paso " + (E.paso + 1) + " de " + pasos.length + ": " + NOMBRES[E.paso];
      ant.disabled = E.paso === 0;
      sig.textContent = E.paso === pasos.length - 1 ? "Ver el resumen" : "Siguiente";
      pintarElegido();
      if (E.paso === 3) pintarDecidir();
      if (E.paso === 4) {
        var elegida = rp.querySelector('[data-rp-campo="plan.solucion"]');
        var mejor = E.alternativas.slice().sort(function (x, y) { return total(y) - total(x); })[0];
        if (elegida && !elegida.value && mejor) { elegida.value = mejor; E.plan = E.plan || {}; E.plan.solucion = mejor; }
      }
      guardarE();
    };
    ant.addEventListener("click", function () { ir(E.paso - 1); rp.scrollIntoView({ block: "start" }); });
    sig.addEventListener("click", function () {
      if (E.paso === pasos.length - 1) { resumen(); return; }
      ir(E.paso + 1); rp.scrollIntoView({ block: "start" });
    });
    rp.querySelectorAll("[data-rp-ir]").forEach(function (b) { b.addEventListener("click", function () { ir(+b.dataset.rpIr); }); });

    /* Resumen y descarga */
    var cajaRes = rp.querySelector("[data-rp-resumen]");
    var texto = function () {
      var p = E.problemas[E.elegido], L = [];
      L.push("RESOLVER UN PROBLEMA");
      L.push("Problema: " + (p ? p.t : "—"));
      var d = E.def || {};
      if (d.hechos) L.push("\nLos hechos: " + d.hechos);
      if (d.brecha) L.push("Lo que lo vuelve un problema: " + d.brecha);
      if (d.objetivo) L.push("Mi objetivo: " + d.objetivo);
      if (d.obstaculos) L.push("Los obstáculos: " + d.obstaculos);
      if (E.alternativas.length) L.push("\nAlternativas:\n" + E.alternativas.map(function (a) { return "- " + a + " (" + total(a) + "/20)"; }).join("\n"));
      var pl = E.plan || {};
      if (pl.solucion) L.push("\nLo que voy a hacer: " + pl.solucion);
      if (pl.pasos) L.push("Pasos: " + pl.pasos);
      if (pl.cuando) L.push("Cuándo: " + pl.cuando);
      if (pl.si) L.push("Si pasa esto: " + pl.si);
      if (pl.entonces) L.push("Entonces voy a: " + pl.entonces);
      if (pl.ayuda) L.push("Ayuda que voy a pedir: " + pl.ayuda);
      var r = E.revision || {};
      if (r.hecho) L.push("\nLo que pasó: " + r.hecho);
      if (r.satisfaccion) L.push("Satisfacción: " + r.satisfaccion + "/10");
      if (r.ajuste) L.push("Lo que ajusto: " + r.ajuste);
      return L.join("\n");
    };
    var resumen = function () {
      cajaRes.hidden = false;
      cajaRes.querySelector("pre").textContent = texto();
      cajaRes.scrollIntoView({ block: "nearest" });
    };
    rp.querySelector("[data-rp-bajar]").addEventListener("click", function () {
      var blob = new Blob([texto()], { type: "text/plain;charset=utf-8" }), a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "resolver-un-problema.txt"; document.body.appendChild(a); a.click(); a.remove();
    });
    rp.querySelector("[data-rp-copiar]").addEventListener("click", function () {
      var b = this;
      if (navigator.clipboard) navigator.clipboard.writeText(texto()).then(function () { b.textContent = "Copiado"; setTimeout(function () { b.textContent = "Copiar"; }, 1500); });
    });
    rp.querySelector("[data-rp-reiniciar]").addEventListener("click", function () {
      if (!window.confirm("¿Empezar de nuevo? Se borra lo que escribiste en el resolvedor.")) return;
      E = vacio(); guardarE();
      camposSimples.forEach(function (c) { c.value = ""; });
      cajaRes.hidden = true;
      pintarProblemas(); pintarAlternativas(); ir(0);
    });

    pintarProblemas(); pintarAlternativas(); revisar(); ir(E.paso || 0);
    rp.classList.add("rp--activo");
  }

  /* ================= Ejercicios de práctica ================= */
  LAB.azarLista("ideas-problemas", ["¿Qué harías si tuvieras el doble de tiempo?", "¿Qué le aconsejarías a un amigo con este mismo problema?", "¿A quién podrías pedirle ayuda o información?",
    "¿Qué harías si no tuvieras miedo?", "¿Cómo lo resolvería alguien que admirás?", "¿Qué podrías hacer en solo diez minutos?", "¿Y si dividieras el problema en partes más chicas?",
    "¿Qué recursos tenés que no estás usando?", "¿Qué pasa si hacés lo contrario de lo que venís haciendo?", "¿Qué solución absurda se te ocurre? A veces esconde una idea útil.",
    "¿Qué podrías dejar de hacer?", "¿Podrías cambiar el objetivo en lugar del camino?", "¿Hay alguna institución, servicio o grupo que se ocupe de esto?"]);
  var EST = ["Orientación positiva", "Orientación negativa", "Estilo racional", "Estilo impulsivo", "Estilo evitativo"];
  LAB.quiz("estilos-problemas", [
    { t: "Los problemas son parte de la vida. Si le dedico tiempo, seguramente encuentre una salida.", ops: EST, r: 0, e: "Ver los problemas como desafíos y confiar en poder resolverlos facilita todo lo demás." },
    { t: "Cuando aparece un problema me angustio tanto que siento que no voy a poder.", ops: EST, r: 1, e: "Ver los problemas como amenazas y dudar de la propia capacidad se asocia con más malestar." },
    { t: "Primero entiendo bien qué pasa, pienso varias opciones, elijo y después reviso cómo salió.", ops: EST, r: 2, e: "Es el estilo racional o planificado: los cuatro pasos de D'Zurilla y Nezu." },
    { t: "Hago lo primero que se me ocurre, para sacármelo de encima.", ops: EST, r: 3, e: "El estilo impulsivo o descuidado: rápido, pero con soluciones incompletas." },
    { t: "Lo dejo para después, a ver si se arregla solo.", ops: EST, r: 4, e: "El estilo evitativo: posterga, espera que otro lo resuelva o que se resuelva solo." },
    { t: "Me cuesta, pero sé que puedo aprender a manejarlo con tiempo y esfuerzo.", ops: EST, r: 0, e: "La orientación positiva no es optimismo ingenuo: incluye saber que va a costar." }
  ]);
  var TIP = ["Solucionable", "No solucionable", "No tan importante"];
  LAB.quiz("tipo-problema", [
    { sinComillas: true, t: "Tengo una deuda con la tarjeta que crece todos los meses.", ops: TIP, r: 0, e: "Es difícil, pero hay pasos posibles: averiguar opciones de refinanciación, ajustar gastos, pedir asesoramiento." },
    { sinComillas: true, t: "Mi papá tiene una enfermedad que no tiene cura.", ops: TIP, r: 1, e: "La enfermedad no se puede resolver, pero sí algunas partes: cómo organizar los cuidados, cómo acompañar, cómo cuidarme yo." },
    { sinComillas: true, t: "Un compañero de trabajo usa una taza que era mía.", ops: TIP, r: 2, e: "Quizás no valga la energía, sobre todo si hay otros problemas más importantes." },
    { sinComillas: true, t: "No sé cómo decirle a mi pareja que necesito más tiempo para mí.", ops: TIP, r: 0, e: "Es un problema interpersonal, y es solucionable: se puede planificar la conversación." },
    { sinComillas: true, t: "Hay una crisis económica en el país.", ops: TIP, r: 1, e: "La crisis no depende de vos, pero sí cómo organizás tus finanzas y a quién podés pedir ayuda." }
  ]);
  LAB.quiz("concreto-abstracto", [
    { t: "¿Por qué siempre me pasa esto a mí?", r: "a", e: "Pregunta abstracta: busca causas generales y alimenta la rumiación." },
    { t: "¿Qué pasó exactamente, y qué podría hacer distinto mañana a la mañana?", r: "b", e: "Pregunta concreta: se enfoca en el cómo, en lo específico y en el próximo paso." },
    { t: "Soy un desastre para organizarme.", r: "a", e: "Una conclusión general sobre uno mismo. Probá: «¿Qué parte de la organización me falló esta semana?»." },
    { t: "¿Qué hice la vez que esto me salió bien?", r: "b", e: "Mira una situación concreta y un recurso propio." },
    { t: "¿Qué significa sobre mí que me haya pasado esto?", r: "a", e: "Busca significados globales. Edward Watkins mostró que este estilo mantiene el malestar." },
    { t: "¿Cuál es el paso más chico que puedo dar hoy?", r: "b", e: "Concreto y orientado a la acción." }
  ]);
})();
