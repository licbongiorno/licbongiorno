/* Test de eneagrama — /test-de-eneagrama/
   Preguntas originales. Todo ocurre en el navegador: las respuestas se guardan solo en este dispositivo
   (localStorage) para poder retomar el test, y se pueden borrar. No se envía nada a ningún servidor. */
(function () {
  "use strict";
  var raiz = document.querySelector("[data-test-eneagrama]");
  if (!raiz) return;

  var ITEMS = {
    1: ["Noto enseguida lo que está mal o lo que se podría hacer mejor.", "Me cuesta relajarme si algo quedó a medio hacer o mal hecho.", "Tengo una voz interna que me corrige y me exige mucho.", "Me molesta mucho que otros no respeten las reglas o hagan las cosas de cualquier manera.", "Siento que tengo que ser una persona correcta y responsable.", "Me cuesta mostrar mi enojo, aunque por dentro me irrite.", "Prefiero hacer las cosas yo antes que aceptar que queden imperfectas.", "Me guío por lo que está bien, aunque me cueste.", "Me critico cuando cometo errores, incluso pequeños.", "Me cuesta disfrutar sin sentir que antes tengo que cumplir con mis obligaciones."],
    2: ["Me doy cuenta rápido de lo que necesitan los demás.", "Me cuesta pedir ayuda, pero me encanta darla.", "Me siento valioso cuando soy importante para alguien.", "A veces doy esperando, sin decirlo, que me lo reconozcan.", "Me cuesta decir que no cuando alguien me necesita.", "Me duele mucho sentir que no me valoran después de todo lo que hago.", "Sé cómo hacer sentir bien a las personas.", "Pongo las necesidades de los otros antes que las mías.", "Me cuesta saber qué necesito yo.", "Me gusta sentirme cerca y querido por la gente."],
    3: ["Me importa mucho alcanzar mis metas y que se note.", "Me adapto fácilmente a lo que se espera de mí en cada lugar.", "Me cuesta parar: siempre tengo un objetivo en marcha.", "Siento que valgo por lo que logro.", "Cuido mucho la imagen que doy.", "Fracasar es una de las cosas que más temo.", "Soy eficiente: voy al grano y hago que las cosas pasen.", "A veces dejo de lado lo que siento para seguir rindiendo.", "Me motivan la competencia y la posibilidad de destacar.", "Me cuesta mostrarme vulnerable o sin éxito."],
    4: ["Siento que soy diferente a los demás.", "Mis emociones son intensas y profundas.", "A menudo siento que me falta algo que otros tienen.", "Me atraen lo auténtico, lo bello y lo que tiene significado.", "Me cuesta sentirme comprendido.", "La melancolía me resulta familiar, casi cómoda.", "Necesito expresar quién soy de una forma propia.", "Me comparo con otros y a veces siento envidia.", "Lo común o lo superficial me aburre.", "Le doy muchas vueltas a lo que siento."],
    5: ["Necesito tiempo a solas para recargar energía.", "Prefiero observar y entender antes de participar.", "Me gusta saber mucho sobre los temas que me interesan.", "Cuido mucho mi tiempo, mi energía y mi espacio.", "Me cuesta expresar lo que siento en el momento.", "Las demandas emocionales de otros pueden agotarme.", "Me siento más seguro cuando entiendo cómo funciona algo.", "Prefiero arreglarme con poco antes que depender de otros.", "Pienso mucho antes de actuar.", "Guardo para mí lo que sé o lo que me pasa."],
    6: ["Suelo anticipar lo que podría salir mal.", "Me cuesta confiar del todo en las personas, aunque soy muy leal.", "Busco seguridad y apoyo antes de tomar decisiones importantes.", "Dudo mucho, incluso de mis propias decisiones.", "Soy responsable y comprometido con los grupos a los que pertenezco.", "La incertidumbre me pone nervioso.", "A veces desconfío de la autoridad y otras veces la necesito.", "Me preparo para lo peor, por si acaso.", "Pido opinión a otros antes de decidir.", "Cuando algo me da miedo, a veces lo enfrento de golpe para sacármelo de encima."],
    7: ["Me entusiasman las ideas nuevas y los planes.", "Me aburro rápido cuando algo se vuelve rutinario.", "Prefiero ver el lado positivo y evitar lo doloroso.", "Tengo muchos proyectos al mismo tiempo.", "Me cuesta comprometerme con una sola opción.", "Busco experiencias que me hagan sentir vivo.", "Cuando algo me pone triste, enseguida busco distraerme.", "Soy optimista, a veces demasiado.", "Me gusta tener siempre alternativas abiertas.", "La gente me ve como alguien divertido y con energía."],
    8: ["Digo lo que pienso de forma directa.", "Me gusta tener el control de las situaciones.", "Defiendo a quienes considero más débiles.", "Me cuesta mostrar mi lado vulnerable.", "Me enojo rápido frente a una injusticia.", "No me gusta que me digan qué hacer.", "Tengo mucha energía y voy al frente.", "Pongo a prueba a las personas para saber si puedo confiar.", "Prefiero un conflicto abierto antes que la falsedad.", "Me cuesta reconocer que necesito ayuda."],
    9: ["Evito los conflictos siempre que puedo.", "Me adapto con facilidad a lo que quieren los demás.", "Me cuesta saber qué quiero de verdad.", "Postergo las cosas importantes y me distraigo con otras.", "La gente dice que soy tranquilo y fácil de llevar.", "Puedo ver el punto de vista de todos.", "Me cuesta enojarme, o me doy cuenta tarde.", "Prefiero la armonía, aunque tenga que ceder.", "A veces siento que mi presencia no cuenta tanto.", "Me resulta difícil empezar algo nuevo si nadie me empuja."]
  };
  var INSTINTOS = {
    con: ["Me preocupa tener cubiertas mis necesidades materiales y mi salud.", "Mi casa y mi rutina son muy importantes para mi bienestar.", "Me pongo ansioso si falta dinero, comida o descanso.", "Prefiero la seguridad a la aventura.", "Cuido mucho mis recursos y mi energía."],
    soc: ["Me importa mucho mi lugar en los grupos.", "Presto atención a las dinámicas y jerarquías de un grupo.", "Me interesa contribuir a una causa o a una comunidad.", "Me preocupa cómo me ven los demás en conjunto.", "Me siento bien cuando pertenezco y participo."],
    sex: ["Busco vínculos intensos, de a dos.", "Me atraen la química y la conexión profunda con alguien.", "Cuando algo me interesa, pongo toda mi energía en eso.", "Me aburren los vínculos tibios o superficiales.", "Necesito sentir que alguien está muy conectado conmigo."]
  };
  var NOMBRE = { 1: "El perfeccionista", 2: "El ayudador", 3: "El triunfador", 4: "El individualista", 5: "El observador", 6: "El leal", 7: "El entusiasta", 8: "El protector", 9: "El pacificador" };
  var SLUG = { 1: "eneatipo-1-perfeccionista", 2: "eneatipo-2-ayudador", 3: "eneatipo-3-triunfador", 4: "eneatipo-4-individualista", 5: "eneatipo-5-observador", 6: "eneatipo-6-leal", 7: "eneatipo-7-entusiasta", 8: "eneatipo-8-protector", 9: "eneatipo-9-pacificador" };
  var CRECE = { 1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3 }, ESTRES = { 1: 4, 2: 8, 3: 9, 4: 2, 5: 7, 6: 3, 7: 1, 8: 5, 9: 6 };
  var ALAS = { 1: [9, 2], 2: [1, 3], 3: [2, 4], 4: [3, 5], 5: [4, 6], 6: [5, 7], 7: [6, 8], 8: [7, 9], 9: [8, 1] };
  var CENTRO = { 1: "instintivo", 2: "emocional", 3: "emocional", 4: "emocional", 5: "mental", 6: "mental", 7: "mental", 8: "instintivo", 9: "instintivo" };
  var CENTRO_TXT = { instintivo: "relacionado con el cuerpo, la acción y el enojo", emocional: "relacionado con la imagen, los vínculos y la vergüenza", mental: "relacionado con el pensamiento, la seguridad y el miedo" };
  var INST_TXT = { con: ["Conservación", "tu energía se orienta a la seguridad, el bienestar material, el cuerpo y el hogar."], soc: ["Social", "tu energía se orienta a la pertenencia, los grupos y tu lugar en la comunidad."], sex: ["Uno a uno", "tu energía se orienta a los vínculos intensos y la conexión profunda con alguien."] };
  var ESCALA = ["Nada", "Poco", "A veces", "Bastante", "Mucho"];
  var POR_PAGINA = 9, CLAVE = "test-eneagrama-v1";

  // Preguntas intercaladas: 1, 2, … 9, 1, 2, … para que no queden agrupadas por tipo.
  var preguntas = [];
  for (var k = 0; k < 10; k++) for (var t = 1; t <= 9; t++) preguntas.push({ id: "e" + t + "-" + k, t: t, txt: ITEMS[t][k] });
  var preguntasInst = [];
  for (var j = 0; j < 5; j++) ["con", "soc", "sex"].forEach(function (i) { preguntasInst.push({ id: "i" + i + "-" + j, t: i, txt: INSTINTOS[i][j] }); });
  var paginas = [];
  for (var p = 0; p < preguntas.length; p += POR_PAGINA) paginas.push(preguntas.slice(p, p + POR_PAGINA));
  paginas.push(preguntasInst);

  var leer = function () { try { return JSON.parse(localStorage.getItem(CLAVE) || "{}"); } catch (e) { return {}; } };
  var guardar = function () { try { localStorage.setItem(CLAVE, JSON.stringify(resp)); } catch (e) { /* sin almacenamiento */ } };
  var resp = leer(), pag = 0;

  var cuerpo = raiz.querySelector("[data-test-cuerpo]"), barra = raiz.querySelector("[data-test-barra]"), progreso = raiz.querySelector("[data-test-progreso]");
  var bAnt = raiz.querySelector("[data-test-anterior]"), bSig = raiz.querySelector("[data-test-siguiente]"), aviso = raiz.querySelector("[data-test-aviso]");
  var resultado = document.querySelector("[data-test-resultado]"), inicio = document.querySelector("[data-test-inicio]");
  var esc = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  var total = preguntas.length + preguntasInst.length;
  var respondidas = function () { return Object.keys(resp).length; };

  var pintar = function () {
    var lista = paginas[pag], esInst = pag === paginas.length - 1;
    var html = esInst ? '<p class="test-subtitulo">Última parte: tus instintos. Estas 15 afirmaciones definen tu subtipo.</p>' : "";
    lista.forEach(function (q, i) {
      html += '<fieldset class="test-item"><legend><span class="test-item__num">' + (pag * POR_PAGINA + i + 1) + ".</span> " + esc(q.txt) + '</legend><div class="test-escala">';
      ESCALA.forEach(function (e, v) {
        var id = q.id + "-" + v;
        html += '<input type="radio" name="' + q.id + '" id="' + id + '" value="' + (v + 1) + '"' + (resp[q.id] === v + 1 ? " checked" : "") + '><label for="' + id + '">' + e + "</label>";
      });
      html += "</div></fieldset>";
    });
    cuerpo.innerHTML = html;
    var n = respondidas();
    barra.style.width = Math.round(n * 100 / total) + "%";
    progreso.textContent = "Página " + (pag + 1) + " de " + paginas.length + " · " + n + " de " + total + " respuestas";
    bAnt.disabled = pag === 0;
    bSig.textContent = pag === paginas.length - 1 ? "Ver mi resultado" : "Siguiente";
    aviso.textContent = "";
  };
  cuerpo.addEventListener("change", function (e) {
    if (e.target.type !== "radio") return;
    resp[e.target.name] = +e.target.value; guardar();
    var n = respondidas();
    barra.style.width = Math.round(n * 100 / total) + "%";
    progreso.textContent = "Página " + (pag + 1) + " de " + paginas.length + " · " + n + " de " + total + " respuestas";
  });
  var completa = function () { return paginas[pag].every(function (q) { return resp[q.id]; }); };
  bSig.addEventListener("click", function () {
    if (!completa()) {
      aviso.textContent = "Respondé todas las afirmaciones de esta página para seguir.";
      var faltante = paginas[pag].filter(function (q) { return !resp[q.id]; })[0];
      var r = cuerpo.querySelector('input[name="' + faltante.id + '"]'); if (r) r.focus();
      return;
    }
    if (pag < paginas.length - 1) { pag++; pintar(); raiz.scrollIntoView({ behavior: "smooth", block: "start" }); cuerpo.querySelector("input").focus({ preventScroll: true }); }
    else mostrarResultado();
  });
  bAnt.addEventListener("click", function () { if (pag > 0) { pag--; pintar(); raiz.scrollIntoView({ block: "start" }); } });
  raiz.querySelector("[data-test-borrar]").addEventListener("click", function () {
    resp = {}; guardar(); pag = 0; resultado.hidden = true; resultado.innerHTML = ""; raiz.hidden = false; pintar();
  });

  var calcular = function () {
    var p = {};
    for (var t = 1; t <= 9; t++) {
      var s = 0; for (var k = 0; k < 10; k++) s += resp["e" + t + "-" + k] || 0;
      p[t] = Math.round((s - 10) * 100 / 40);
    }
    var ins = {};
    ["con", "soc", "sex"].forEach(function (i) { var s = 0; for (var j = 0; j < 5; j++) s += resp["i" + i + "-" + j] || 0; ins[i] = Math.round((s - 5) * 100 / 20); });
    return { p: p, ins: ins };
  };
  var enlace = function (n) { return '<a href="/recursos/' + SLUG[n] + '/">eneatipo ' + n + ", " + NOMBRE[n].toLowerCase() + "</a>"; };

  var mostrarResultado = function () {
    var r = calcular(), orden = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(function (a, b) { return r.p[b] - r.p[a]; });
    var tipo = orden[0], ala = r.p[ALAS[tipo][0]] >= r.p[ALAS[tipo][1]] ? ALAS[tipo][0] : ALAS[tipo][1];
    var inst = ["con", "soc", "sex"].sort(function (a, b) { return r.ins[b] - r.ins[a]; })[0];
    var cercanos = orden.slice(1, 3).filter(function (n) { return r.p[tipo] - r.p[n] <= 6; });
    var barras = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (n) {
      return '<li class="test-barra' + (n === tipo ? " es-principal" : "") + '"><span class="test-barra__nombre">' + n + ". " + NOMBRE[n] + '</span><span class="test-barra__pista" aria-hidden="true"><span style="width:' + Math.max(r.p[n], 2) + '%"></span></span><span class="test-barra__valor">' + r.p[n] + "%</span></li>";
    }).join("");
    var html = '<p class="antetitulo">Tu resultado</p>' +
      '<h2 class="test-resultado__titulo">Eneatipo ' + tipo + ': <em>' + NOMBRE[tipo].toLowerCase() + "</em></h2>" +
      '<p class="test-resultado__codigo">' + tipo + "w" + ala + " · centro " + CENTRO[tipo] + " · subtipo " + INST_TXT[inst][0].toLowerCase() + "</p>" +
      '<div class="test-resultado__grid">' +
      '<section><h3>Lo que significa</h3><ul class="test-resultado__lista">' +
      "<li><strong>Tu eneatipo:</strong> " + enlace(tipo) + ". Es el que más resonó con tus respuestas.</li>" +
      "<li><strong>Tu ala:</strong> " + enlace(ala) + ", el vecino que más te influye.</li>" +
      "<li><strong>Tu centro:</strong> " + CENTRO[tipo] + ", " + CENTRO_TXT[CENTRO[tipo]] + ".</li>" +
      "<li><strong>En crecimiento</strong> podés tomar rasgos sanos del " + enlace(CRECE[tipo]) + "; <strong>en estrés</strong>, rasgos menos sanos del " + enlace(ESTRES[tipo]) + ".</li>" +
      "<li><strong>Tu subtipo:</strong> " + INST_TXT[inst][0].toLowerCase() + ": " + INST_TXT[inst][1] + "</li>" +
      "</ul>" +
      (cercanos.length ? '<p class="test-resultado__nota">Tus puntajes en ' + cercanos.map(enlace).join(" y ") + " quedaron muy cerca. Leé esos artículos también: a veces el eneatipo propio es el que menos esperábamos.</p>" : "") +
      '</section><section><h3>Tus nueve puntajes</h3><ol class="test-barras">' + barras + "</ol></section></div>" +
      '<div class="test-resultado__leer"><h3>Para seguir</h3><ul>' +
      '<li><a href="/recursos/' + SLUG[tipo] + '/">Leer sobre tu eneatipo: ' + NOMBRE[tipo].toLowerCase() + "</a></li>" +
      '<li><a href="/recursos/que-es-el-eneagrama/">Qué es el eneagrama, sus alas, centros y subtipos</a></li>' +
      '<li><a href="/test-de-tipos-psicologicos/">Hacer el test de tipos psicológicos de Jung</a></li>' +
      '<li><a href="/laboratorio-de-sombra-y-arquetipos/">Explorar tu sombra en el laboratorio de sombra y arquetipos</a></li></ul></div>' +
      '<p class="test-resultado__nota">Recordá: es una herramienta de autoconocimiento con respaldo científico limitado, no un diagnóstico. Si algo te resuena o te inquieta, es un buen tema para conversar en terapia.</p>' +
      '<div class="lab-acciones"><button class="boton boton--chico" type="button" data-test-bajar>Guardar mi resultado</button><button class="boton boton--secundario boton--chico" type="button" data-test-rehacer>Volver a hacer el test</button></div>';
    resultado.innerHTML = html; resultado.hidden = false; raiz.hidden = true;
    if (inicio) inicio.hidden = true;
    resultado.setAttribute("tabindex", "-1"); resultado.focus(); resultado.scrollIntoView({ block: "start" });
    resultado.querySelector("[data-test-bajar]").addEventListener("click", function () {
      var l = ["Mi resultado en el test de eneagrama", "", "Eneatipo " + tipo + ": " + NOMBRE[tipo] + " (" + tipo + "w" + ala + ")", "Centro: " + CENTRO[tipo], "Subtipo: " + INST_TXT[inst][0], "Crecimiento hacia el " + CRECE[tipo] + "; estrés hacia el " + ESTRES[tipo] + ".", "", "Puntajes:"];
      orden.forEach(function (n) { l.push(n + ". " + NOMBRE[n] + ": " + r.p[n] + "%"); });
      l.push("", "Instintos: conservación " + r.ins.con + "%, social " + r.ins.soc + "%, uno a uno " + r.ins.sex + "%.", "", "Leer más: " + location.origin + "/recursos/" + SLUG[tipo] + "/");
      var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([l.join("\n") + "\n"], { type: "text/plain;charset=utf-8" }));
      a.download = "mi-resultado-eneagrama.txt"; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    });
    resultado.querySelector("[data-test-rehacer]").addEventListener("click", function () {
      resp = {}; guardar(); pag = 0; resultado.hidden = true; resultado.innerHTML = ""; raiz.hidden = false; if (inicio) inicio.hidden = false; pintar(); raiz.scrollIntoView({ block: "start" });
    });
  };

  // Retomar donde se dejó.
  if (respondidas()) {
    for (var q = 0; q < paginas.length; q++) { pag = q; if (!paginas[q].every(function (x) { return resp[x.id]; })) break; }
  }
  pintar();
  if (respondidas() === total) mostrarResultado();
})();
