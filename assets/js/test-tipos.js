/* Test de tipos psicológicos — /test-de-tipos-psicologicos/
   Preguntas originales inspiradas en la tipología de Jung (no es el MBTI®). Las respuestas se guardan solo en este
   dispositivo (localStorage) para poder retomar, y se pueden borrar. No se envía nada a ningún servidor. */
(function () {
  "use strict";
  var raiz = document.querySelector("[data-test-tipos]");
  if (!raiz) return;

  // [dimensión, afirmación del polo A, afirmación del polo B]. Polos: E/I, S/N, T/F, J/P.
  var PARES = {
    EI: [["Pienso mejor hablando con otros.", "Pienso mejor en silencio, antes de hablar."], ["En una reunión, conozco a mucha gente nueva.", "En una reunión, prefiero hablar a fondo con pocas personas."], ["Me recargo estando con gente.", "Me recargo estando a solas."], ["Actúo primero y reflexiono después.", "Reflexiono primero y actúo después."], ["Me resulta fácil iniciar conversaciones.", "Prefiero que otros inicien la conversación."], ["Me interesan muchas cosas del mundo exterior.", "Me interesan pocas cosas, pero en profundidad."], ["Cuento lo que me pasa con facilidad.", "Me guardo lo que me pasa hasta procesarlo."], ["Un fin de semana ideal tiene planes con otros.", "Un fin de semana ideal tiene tiempo para mí."], ["Me aburro si paso mucho tiempo solo.", "Me agoto si paso mucho tiempo con gente."], ["Me oriento por lo que pasa afuera.", "Me oriento por lo que pasa adentro mío."]],
    SN: [["Confío en los hechos y en la experiencia.", "Confío en las corazonadas y en las posibilidades."], ["Me fijo en los detalles concretos.", "Me fijo en el panorama general y en los patrones."], ["Prefiero instrucciones claras, paso a paso.", "Prefiero entender la idea y armar mi propio camino."], ["Me interesa lo que es.", "Me interesa lo que podría ser."], ["Disfruto del presente y de lo que puedo tocar.", "Vivo pensando en el futuro y en lo que vendrá."], ["Recuerdo bien datos y detalles.", "Recuerdo más impresiones y significados."], ["Me gusta lo práctico y probado.", "Me gusta lo nuevo y lo original."], ["Describo las cosas de forma literal.", "Describo las cosas con metáforas e imágenes."], ["Aprendo haciendo.", "Aprendo entendiendo la teoría."], ["Me cuesta la vaguedad.", "Me cuesta la rutina."]],
    TF: [["Decido con la lógica y los argumentos.", "Decido según lo que es importante para las personas."], ["Prefiero ser justo antes que complaciente.", "Prefiero ser amable antes que tener razón."], ["Doy críticas de forma directa.", "Cuido mucho cómo digo una crítica."], ["Me convencen los datos.", "Me convencen los valores."], ["En un conflicto, busco quién tiene razón.", "En un conflicto, busco que nadie salga lastimado."], ["Analizo los problemas desde afuera.", "Me involucro emocionalmente en los problemas."], ["Valoro mucho la coherencia.", "Valoro mucho la armonía."], ["Me cuesta entender decisiones poco lógicas.", "Me cuesta entender decisiones poco humanas."], ["Me describen como una persona objetiva.", "Me describen como una persona cálida."], ["Primero pienso si algo funciona.", "Primero pienso a quién afecta."]],
    JP: [["Me gusta planificar con anticipación.", "Me gusta improvisar sobre la marcha."], ["Termino una cosa antes de empezar otra.", "Empiezo muchas cosas a la vez."], ["Me tranquiliza tener las cosas decididas.", "Me gusta dejar las opciones abiertas."], ["Trabajo mejor con plazos claros.", "Trabajo mejor con libertad, aunque sea a último momento."], ["Mi espacio suele estar ordenado.", "Mi espacio suele tener un desorden creativo."], ["Hago listas y las cumplo.", "Hago listas y las cambio."], ["Me molestan los cambios de último momento.", "Los cambios de último momento me estimulan."], ["Prefiero cerrar un tema.", "Prefiero seguir explorando un tema."], ["Me organizo con una agenda.", "Me organizo según cómo viene el día."], ["Llego temprano a las citas.", "Llego justo, o un poco tarde."]]
  };
  var POLOS = { EI: ["E", "I"], SN: ["S", "N"], TF: ["T", "F"], JP: ["J", "P"] };
  var NOMBRE_POLO = { E: "Extraversión", I: "Introversión", S: "Sensación", N: "Intuición", T: "Pensamiento", F: "Sentimiento", J: "Juicio (estructura)", P: "Percepción (apertura)" };
  var FUN = { T: "pensamiento", F: "sentimiento", S: "sensación", N: "intuición" };
  var ACT = { e: "extravertido", i: "introvertido" };
  var nombreFun = function (f, a) { var adj = ACT[a]; if (f === "S" || f === "N") adj = adj.slice(0, -1) + "a"; return FUN[f] + " " + adj; };
  var slugFun = function (f, a) { return "tipo-" + nombreFun(f, a).replace("ó", "o").replace(" ", "-"); };
  var OPUESTA = { T: "F", F: "T", S: "N", N: "S" };
  var ESCALA = ["Mucho más la primera", "Más la primera", "Las dos por igual", "Más la segunda", "Mucho más la segunda"];
  var POR_PAGINA = 8, CLAVE = "test-tipos-v1";

  var preguntas = [];
  for (var k = 0; k < 10; k++) ["EI", "SN", "TF", "JP"].forEach(function (d) { preguntas.push({ id: d + "-" + k, d: d, a: PARES[d][k][0], b: PARES[d][k][1] }); });
  var paginas = [];
  for (var p = 0; p < preguntas.length; p += POR_PAGINA) paginas.push(preguntas.slice(p, p + POR_PAGINA));

  var leer = function () { try { return JSON.parse(localStorage.getItem(CLAVE) || "{}"); } catch (e) { return {}; } };
  var guardar = function () { try { localStorage.setItem(CLAVE, JSON.stringify(resp)); } catch (e) { /* sin almacenamiento */ } };
  var resp = leer(), pag = 0;
  var cuerpo = raiz.querySelector("[data-test-cuerpo]"), barra = raiz.querySelector("[data-test-barra]"), progreso = raiz.querySelector("[data-test-progreso]");
  var bAnt = raiz.querySelector("[data-test-anterior]"), bSig = raiz.querySelector("[data-test-siguiente]"), aviso = raiz.querySelector("[data-test-aviso]");
  var resultado = document.querySelector("[data-test-resultado]"), inicio = document.querySelector("[data-test-inicio]");
  var esc = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  var total = preguntas.length;
  var respondidas = function () { return Object.keys(resp).length; };
  var actualizarProgreso = function () {
    var n = respondidas();
    barra.style.width = Math.round(n * 100 / total) + "%";
    progreso.textContent = "Página " + (pag + 1) + " de " + paginas.length + " · " + n + " de " + total + " respuestas";
  };

  var pintar = function () {
    var html = "";
    paginas[pag].forEach(function (q, i) {
      html += '<fieldset class="test-item test-item--par"><legend><span class="test-item__num">' + (pag * POR_PAGINA + i + 1) + '.</span> ¿Con cuál te identificás más?</legend>' +
        '<div class="test-par"><p class="test-par__a">' + esc(q.a) + '</p><p class="test-par__b">' + esc(q.b) + '</p></div><div class="test-escala test-escala--par">';
      ESCALA.forEach(function (e, v) {
        var id = q.id + "-" + v;
        html += '<input type="radio" name="' + q.id + '" id="' + id + '" value="' + (v + 1) + '"' + (resp[q.id] === v + 1 ? " checked" : "") + '><label for="' + id + '" title="' + e + '"><span class="visualmente-oculto">' + e + "</span></label>";
      });
      html += '</div><div class="test-par__extremos" aria-hidden="true"><span>Primera</span><span>Segunda</span></div></fieldset>';
    });
    cuerpo.innerHTML = html;
    actualizarProgreso();
    bAnt.disabled = pag === 0;
    bSig.textContent = pag === paginas.length - 1 ? "Ver mi resultado" : "Siguiente";
    aviso.textContent = "";
  };
  cuerpo.addEventListener("change", function (e) { if (e.target.type === "radio") { resp[e.target.name] = +e.target.value; guardar(); actualizarProgreso(); } });
  bSig.addEventListener("click", function () {
    var falta = paginas[pag].filter(function (q) { return !resp[q.id]; })[0];
    if (falta) { aviso.textContent = "Respondé todas las preguntas de esta página para seguir."; var r = cuerpo.querySelector('input[name="' + falta.id + '"]'); if (r) r.focus(); return; }
    if (pag < paginas.length - 1) { pag++; pintar(); raiz.scrollIntoView({ behavior: "smooth", block: "start" }); cuerpo.querySelector("input").focus({ preventScroll: true }); }
    else mostrar();
  });
  bAnt.addEventListener("click", function () { if (pag > 0) { pag--; pintar(); raiz.scrollIntoView({ block: "start" }); } });
  raiz.querySelector("[data-test-borrar]").addEventListener("click", function () { resp = {}; guardar(); pag = 0; pintar(); });

  var mostrar = function () {
    // Puntaje: 1 (mucho más A) = +2 … 5 (mucho más B) = −2. Suma por dimensión entre −20 y +20.
    var dim = {};
    ["EI", "SN", "TF", "JP"].forEach(function (d) {
      var s = 0; for (var k = 0; k < 10; k++) s += 3 - (resp[d + "-" + k] || 3);
      var polo = s >= 0 ? POLOS[d][0] : POLOS[d][1];
      dim[d] = { s: s, polo: polo, claridad: Math.round(Math.abs(s) * 100 / 20) };
    });
    var codigo = dim.EI.polo + dim.SN.polo + dim.TF.polo + dim.JP.polo;
    var ext = dim.EI.polo === "E", juzga = dim.TF.polo, percibe = dim.SN.polo;
    // Dinámica de tipos (modelo de Myers-Briggs): en E, J/P indica la función dominante extravertida;
    // en I, indica la auxiliar extravertida y la dominante es la otra, introvertida.
    var dom, aux;
    if (ext) { dom = dim.JP.polo === "J" ? [juzga, "e"] : [percibe, "e"]; aux = dim.JP.polo === "J" ? [percibe, "i"] : [juzga, "i"]; }
    else { dom = dim.JP.polo === "J" ? [percibe, "i"] : [juzga, "i"]; aux = dim.JP.polo === "J" ? [juzga, "e"] : [percibe, "e"]; }
    var inf = [OPUESTA[dom[0]], dom[1] === "e" ? "i" : "e"];
    var ajustadas = ["EI", "SN", "TF", "JP"].filter(function (d) { return dim[d].claridad <= 15; });
    var barras = ["EI", "SN", "TF", "JP"].map(function (d) {
      var a = POLOS[d][0], b = POLOS[d][1], pctA = Math.round((dim[d].s + 20) * 100 / 40);
      return '<li class="test-dim"><span class="test-dim__polo' + (dim[d].polo === a ? " es-elegido" : "") + '">' + NOMBRE_POLO[a] + " (" + a + ")</span>" +
        '<span class="test-dim__pista" aria-hidden="true"><span style="width:' + pctA + '%"></span></span>' +
        '<span class="test-dim__polo' + (dim[d].polo === b ? " es-elegido" : "") + '">' + NOMBRE_POLO[b] + " (" + b + ")</span>" +
        '<span class="visualmente-oculto">' + NOMBRE_POLO[dim[d].polo] + ", con una claridad del " + dim[d].claridad + " %.</span></li>";
    }).join("");
    var nomDom = nombreFun(dom[0], dom[1]);
    var html = '<p class="antetitulo">Tu resultado</p>' +
      '<h2 class="test-resultado__titulo">Tipo <em>' + nomDom + "</em></h2>" +
      '<p class="test-resultado__codigo">Código de referencia: ' + codigo + " · no es el MBTI® oficial</p>" +
      '<div class="test-resultado__grid"><section><h3>Lo que significa</h3><ul class="test-resultado__lista">' +
      "<li><strong>Tu función principal:</strong> <a href=\"/recursos/" + slugFun(dom[0], dom[1]) + "/\">" + nomDom + "</a>. Es la forma de percibir o decidir que más usás.</li>" +
      "<li><strong>Tu función auxiliar:</strong> <a href=\"/recursos/" + slugFun(aux[0], aux[1]) + "/\">" + nombreFun(aux[0], aux[1]) + "</a>, que equilibra a la principal.</li>" +
      "<li><strong>Tu función inferior:</strong> <a href=\"/recursos/" + slugFun(inf[0], inf[1]) + "/\">" + nombreFun(inf[0], inf[1]) + "</a>. Para Jung, la menos desarrollada: por ahí te desbordás y por ahí también podés crecer.</li>" +
      "<li><strong>Tu actitud:</strong> " + (ext ? "extravertida: tu energía se orienta más hacia afuera" : "introvertida: tu energía se orienta más hacia adentro") + ".</li></ul>" +
      (ajustadas.length ? '<p class="test-resultado__nota">En ' + ajustadas.map(function (d) { return NOMBRE_POLO[POLOS[d][0]].toLowerCase() + " / " + NOMBRE_POLO[POLOS[d][1]].toLowerCase(); }).join(" y ") + " tus respuestas quedaron muy parejas. Leé los dos tipos posibles: puede que el otro te describa mejor.</p>" : "") +
      '</section><section><h3>Tus cuatro preferencias</h3><ol class="test-dims">' + barras + "</ol></section></div>" +
      '<div class="test-resultado__leer"><h3>Para seguir</h3><ul>' +
      '<li><a href="/recursos/' + slugFun(dom[0], dom[1]) + '/">Leer sobre tu tipo: ' + nomDom + "</a></li>" +
      '<li><a href="/recursos/tipos-psicologicos-jung/">Los tipos psicológicos de Jung: actitudes, funciones y función inferior</a></li>' +
      '<li><a href="/test-de-eneagrama/">Hacer el test de eneagrama</a></li>' +
      '<li><a href="/laboratorio-de-flexibilidad-yoica/">Trabajar tu función inferior en el laboratorio de flexibilidad yoica</a></li></ul></div>' +
      '<p class="test-resultado__nota">Recordá: es una herramienta de autoconocimiento con preguntas originales, inspirada en Jung. El código de cuatro letras sigue el modelo de Myers-Briggs y es solo una referencia. No es un diagnóstico ni define quién sos.</p>' +
      '<div class="lab-acciones"><button class="boton boton--chico" type="button" data-test-bajar>Guardar mi resultado</button><button class="boton boton--secundario boton--chico" type="button" data-test-rehacer>Volver a hacer el test</button></div>';
    resultado.innerHTML = html; resultado.hidden = false; raiz.hidden = true; if (inicio) inicio.hidden = true;
    resultado.setAttribute("tabindex", "-1"); resultado.focus(); resultado.scrollIntoView({ block: "start" });
    resultado.querySelector("[data-test-bajar]").addEventListener("click", function () {
      var l = ["Mi resultado en el test de tipos psicológicos", "", "Tipo: " + nomDom + " (código de referencia " + codigo + ")", "Función auxiliar: " + nombreFun(aux[0], aux[1]), "Función inferior: " + nombreFun(inf[0], inf[1]), ""];
      ["EI", "SN", "TF", "JP"].forEach(function (d) { l.push(NOMBRE_POLO[dim[d].polo] + " (claridad " + dim[d].claridad + " %)"); });
      l.push("", "Leer más: " + location.origin + "/recursos/" + slugFun(dom[0], dom[1]) + "/");
      var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([l.join("\n") + "\n"], { type: "text/plain;charset=utf-8" }));
      a.download = "mi-resultado-tipos.txt"; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    });
    resultado.querySelector("[data-test-rehacer]").addEventListener("click", function () {
      resp = {}; guardar(); pag = 0; resultado.hidden = true; resultado.innerHTML = ""; raiz.hidden = false; if (inicio) inicio.hidden = false; pintar(); raiz.scrollIntoView({ block: "start" });
    });
  };

  if (respondidas()) for (var q = 0; q < paginas.length; q++) { pag = q; if (!paginas[q].every(function (x) { return resp[x.id]; })) break; }
  pintar();
  if (respondidas() === total) mostrar();
})();
