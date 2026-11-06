/* Laboratorio de comunicación no violenta — /laboratorio-de-comunicacion-no-violenta/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB || !document.querySelector("[data-lab-armador]")) return;

  /* ---------- Quiz 1: observación (a) o juicio (b) ---------- */
  LAB.quiz("observacion", [
    { t: "Llegaste a las diez y habíamos quedado a las ocho.", r: "a", e: "Describe un hecho que una cámara podría registrar: la hora acordada y la hora real." },
    { t: "Sos un impuntual.", r: "b", e: "Es una etiqueta sobre la persona. Probá con el hecho: «llegaste a las diez y habíamos quedado a las ocho»." },
    { t: "Nunca me ayudás con nada.", r: "b", e: "«Nunca» y «nada» generalizan, y el otro va a buscar la excepción para defenderse. Mejor un hecho concreto de esta semana." },
    { t: "Esta semana lavé los platos los cinco días.", r: "a", e: "Es concreto y verificable. Desde ahí se puede conversar sin acusar." },
    { t: "Mi jefe me ignoró en la reunión.", r: "b", e: "«Ignorar» es una interpretación de lo que hizo. La observación sería: «hice dos preguntas y no me respondió»." },
    { t: "En la reunión hice dos preguntas y no recibí respuesta.", r: "a", e: "Describe lo que pasó sin suponer intenciones." },
    { t: "Mi hijo es un desordenado.", r: "b", e: "Es una etiqueta. La observación sería algo como «hay tres remeras en el piso de su cuarto»." },
    { t: "Hay tres remeras en el piso del cuarto.", r: "a", e: "Cualquiera que entre al cuarto puede verlo. Es un hecho." },
    { t: "Te pasás el día con el celular.", r: "b", e: "Es una exageración que suena a reproche. Probá contar: «durante la cena miraste el celular cuatro veces»." },
    { t: "Durante la cena miraste el celular cuatro veces.", r: "a", e: "Es concreto y acotado a un momento." },
    { t: "Ella es muy egoísta.", r: "b", e: "Es un juicio sobre la persona. ¿Qué hizo, concretamente, que te llevó a pensar eso?" },
    { t: "Me dijiste que ibas a llamar y no llamaste.", r: "a", e: "Describe lo acordado y lo que pasó, sin adjetivos." },
    { t: "Siempre llegás tarde a todo.", r: "b", e: "«Siempre» y «todo» generalizan. Elegí una situación puntual." },
    { t: "Ayer no me saludaste cuando entraste.", r: "a", e: "Es un hecho puntual. (Otra cosa sería «no me registrás», que ya es una interpretación)." },
    { t: "Sos demasiado sensible.", r: "b", e: "Es una evaluación de la persona, y suele cerrar la conversación." },
    { t: "Mi pareja no me valora.", r: "b", e: "Es una interpretación. La observación podría ser: «no comentó nada de la cena que preparé»." },
    { t: "Hace dos semanas que no hablamos por teléfono.", r: "a", e: "Es verificable y no acusa a nadie." },
    { t: "Mi compañero trabaja mal.", r: "b", e: "Es un juicio. ¿Qué pasó concretamente con su trabajo?" },
    { t: "Entregaste el informe el viernes en vez del miércoles.", r: "a", e: "Describe la diferencia entre lo acordado y lo que pasó." },
    { t: "Mi mamá se mete en todo.", r: "b", e: "Generaliza y juzga. La observación sería algo como «en el almuerzo me preguntó tres veces por mi novio»." },
    { t: "En el almuerzo mi mamá me preguntó tres veces por mi novio.", r: "a", e: "Es concreto: cuándo, quién y qué pasó." }
  ]);

  /* ---------- Quiz 2: sentimiento (a) o interpretación (b) ---------- */
  LAB.quiz("sentimiento", [
    { t: "Me siento ignorado.", r: "b", e: "Habla de lo que creemos que el otro nos hace. Debajo puede haber tristeza, soledad o enojo." },
    { t: "Me siento triste.", r: "a", e: "Nombra lo que pasa adentro, sin culpar a nadie." },
    { t: "Me siento manipulada.", r: "b", e: "Supone una intención del otro. ¿Qué sentís cuando pensás eso? ¿Desconfianza, enojo, miedo?" },
    { t: "Siento miedo.", r: "a", e: "Es un sentimiento claro." },
    { t: "Me siento usado.", r: "b", e: "Es una interpretación sobre lo que el otro hace. Detrás puede haber enojo o decepción." },
    { t: "Me siento frustrado.", r: "a", e: "Nombra una emoción propia." },
    { t: "Siento que no te importo.", r: "b", e: "«Siento que» seguido de una idea suele ser un pensamiento, no un sentimiento. ¿Qué sentís cuando lo pensás? Quizás tristeza." },
    { t: "Estoy preocupada.", r: "a", e: "Es un sentimiento, dicho sin acusar." },
    { t: "Me siento rechazado.", r: "b", e: "Implica algo que el otro hizo. Debajo puede haber dolor, vergüenza o tristeza." },
    { t: "Me siento cansado.", r: "a", e: "Es un estado propio, aunque tenga mucho de cuerpo." },
    { t: "Me siento atacada.", r: "b", e: "Describe lo que creemos que hace el otro. Debajo suele haber miedo o enojo." },
    { t: "Siento vergüenza.", r: "a", e: "Es un sentimiento, y nombrarlo ya alivia." },
    { t: "Me siento abandonado.", r: "b", e: "Es una interpretación muy cargada. Debajo puede haber soledad, angustia o miedo." },
    { t: "Estoy aliviada.", r: "a", e: "Es un sentimiento, de los que aparecen cuando una necesidad se cubre." },
    { t: "Me siento incomprendido.", r: "b", e: "Habla de lo que el otro no hace. Debajo puede haber tristeza o frustración." },
    { t: "Me siento agradecido.", r: "a", e: "Es un sentimiento, y vale la pena decirlo más seguido." },
    { t: "Me siento traicionada.", r: "b", e: "Es una interpretación de lo que hizo el otro. Debajo puede haber dolor, enojo o desconfianza." },
    { t: "Siento angustia.", r: "a", e: "Es un sentimiento, aunque cueste ponerle más palabras." }
  ]);

  /* ---------- Quiz 3: pedido claro (a) o exigencia / pedido vago (b) ---------- */
  LAB.quiz("pedido", [
    { t: "¿Podrías avisarme si vas a llegar tarde?", r: "a", e: "Es concreto, posible y deja lugar al no." },
    { t: "Más te vale que llegues temprano.", r: "b", e: "Es una amenaza. El otro puede obedecer, pero no por ganas de cuidarte." },
    { t: "Tenés que ayudarme más.", r: "b", e: "Impone y es vago: ¿ayudarte en qué, cuándo? Probá con algo concreto." },
    { t: "¿Te parece que el sábado ordenemos juntos el garaje?", r: "a", e: "Dice qué, cuándo y cómo, y pregunta." },
    { t: "Quiero que me respetes.", r: "b", e: "Es un pedido vago: el otro no sabe qué hacer distinto. ¿Qué acción concreta te haría sentir respetado o respetada?" },
    { t: "No me hables así.", r: "b", e: "Dice lo que no querés. Probá en positivo: «¿podemos seguir hablando cuando estemos más tranquilos?»." },
    { t: "¿Me contarías cómo te fue antes de prender la tele?", r: "a", e: "Es concreto y realizable." },
    { t: "Si me quisieras, lo harías.", r: "b", e: "Condiciona el afecto y genera culpa. Es una exigencia disfrazada." },
    { t: "¿Podemos hablar diez minutos esta noche sobre las vacaciones?", r: "a", e: "Tiene tiempo, tema y deja lugar a proponer otro momento." },
    { t: "Deberías ser más ordenado.", r: "b", e: "«Deberías» suena a mandato, y «ser más ordenado» es vago." },
    { t: "¿Estarías dispuesta a dejar el celular fuera de la mesa durante la cena?", r: "a", e: "Pregunta por la disposición del otro y propone algo concreto." },
    { t: "Hacé lo que quieras, total nunca me escuchás.", r: "b", e: "No pide nada concreto y carga un reproche." },
    { t: "¿Podrías llevar a los chicos a la escuela el martes y el jueves? ¿Te queda bien?", r: "a", e: "Es concreto y abre la conversación." }
  ]);

  /* ---------- Necesidades: situaciones para practicar ---------- */
  var SITUACIONES = [
    ["Te enojaste porque tu pareja llegó tarde. ¿Qué necesidad tuya puede haber detrás?", "Previsibilidad, poder confiar en lo acordado, cuidado, que tu tiempo sea tenido en cuenta."],
    ["Te molesta que en la reunión nadie comente tu propuesta. ¿Qué podrías necesitar?", "Reconocimiento, aportar, ser tenido en cuenta, saber si tu trabajo suma."],
    ["Te irrita el ruido de los vecinos a la noche. ¿Qué necesidad hay detrás?", "Descanso, tranquilidad, consideración."],
    ["Te angustia que tu hijo adolescente no te cuente nada. ¿Qué necesitás?", "Cercanía, confianza, saber que está bien, conexión."],
    ["Te frustra tener que repetir tres veces lo mismo en tu casa. ¿Qué necesitás?", "Colaboración, ser escuchado o escuchada, equidad en las tareas, descanso."],
    ["Te duele que una amiga cancele a último momento. ¿Qué podrías necesitar?", "Previsibilidad, importar, compañía, confianza."],
    ["Te enoja que tu madre opine sobre cómo criás a tus hijos. ¿Qué necesidad aparece?", "Autonomía, respeto por tus decisiones, confianza en tu criterio."],
    ["Te pone mal que tu pareja mire el celular mientras le contás algo. ¿Qué necesitás?", "Atención, cercanía, ser escuchado o escuchada, sentir que importa lo que contás."],
    ["Te sentís mal cuando te piden algo y decís que sí aunque no quieras. ¿Qué necesidad tuya queda afuera?", "Autonomía, cuidado propio, descanso, honestidad con vos."]
  ];
  var nec = document.querySelector("[data-lab-necesidad]");
  if (nec) {
    var nTexto = nec.querySelector("[data-lab-necesidad-texto]"), nPista = nec.querySelector("[data-lab-necesidad-pista]");
    var nActual = SITUACIONES[0];
    nec.querySelector("[data-lab-necesidad-ver]").addEventListener("click", function () {
      nPista.textContent = "Algunas posibles: " + nActual[1] + " Puede haber otras: la tuya es la que te resuena.";
      nPista.className = "lab-quiz__resultado bien"; nPista.hidden = false;
    });
    nec.querySelector("[data-lab-necesidad-otra]").addEventListener("click", function () {
      var otras = SITUACIONES.filter(function (s) { return s !== nActual; });
      nActual = LAB.azar(otras); nPista.hidden = true; LAB.poner(nTexto, nActual[0]);
    });
  }

  /* ---------- Armador de mensaje en 4 pasos ---------- */
  var SENT_FALTA = ["tristeza", "preocupación", "frustración", "enojo", "cansancio", "angustia", "soledad", "confusión", "decepción", "miedo", "vergüenza", "impaciencia"];
  var SENT_LLENA = ["alivio", "gratitud", "alegría", "calma", "ternura", "entusiasmo", "confianza", "orgullo"];
  var NECESIDADES = ["descanso", "ayuda", "colaboración", "respeto", "cuidado", "cercanía", "comprensión", "confianza", "previsibilidad",
    "reconocimiento", "autonomía", "un espacio propio", "tranquilidad", "que me escuchen", "que me tengan en cuenta", "poder contar con lo que acordamos"];
  var form = document.querySelector("[data-lab-armador]");
  var chips = function (cont, lista, nombre) {
    cont.innerHTML = lista.map(function (v) {
      return '<label class="opcion"><input type="checkbox" name="' + nombre + '" value="' + v + '"><span>' + v + "</span></label>";
    }).join("");
  };
  form.querySelectorAll("[data-lab-sentimientos]").forEach(function (c) {
    chips(c, c.getAttribute("data-lab-sentimientos") === "llena" ? SENT_LLENA : SENT_FALTA, "cnv-sent");
  });
  chips(form.querySelector("[data-lab-necesidades]"), NECESIDADES, "cnv-nec");

  var obs = form.querySelector("[data-lab-obs]"), ped = form.querySelector("[data-lab-pedido]");
  var obsAviso = form.querySelector("[data-lab-obs-aviso]"), pedAviso = form.querySelector("[data-lab-pedido-aviso]");
  var salida = form.querySelector("[data-lab-mensaje]");
  var unir = function (l) { return l.length > 1 ? l.slice(0, -1).join(", ") + " y " + l[l.length - 1] : l[0]; };
  var marcados = function (n) { return Array.prototype.map.call(form.querySelectorAll('input[name="' + n + '"]:checked'), function (e) { return e.value; }); };
  var minuscula = function (t) { return t ? t.charAt(0).toLowerCase() + t.slice(1) : t; };
  var limpiar = function (t) { return t.trim().replace(/^[«"“]+|[»"”.]+$/g, "").trim(); };

  /* Busca palabras completas (los \b de JavaScript no reconocen tildes). */
  var buscar = function (t, palabras) {
    return t.match(new RegExp("(?:^|[^a-záéíóúüñ])(" + palabras + ")(?=$|[^a-záéíóúüñ])", "i"));
  };
  var revisarObs = function (t) {
    var m = buscar(t, "siempre|nunca|jamás|todo el tiempo|nada|nadie|todos|sos una|sos un|sos");
    if (m) return "Ojo: «" + m[1].toLowerCase() + "» suele sonar a juicio o generalización. Probá describir una situación concreta: cuándo y qué pasó.";
    return "";
  };
  var revisarPedido = function (t) {
    if (/^(no|nunca|dejá de|deja de)(?=$|[^a-záéíóúüñ])/i.test(t)) return "Probá decir lo que sí querés, en lugar de lo que no.";
    if (buscar(t, "tenés que|tienes que|deberías|debés|más te vale|si me quisieras")) return "Suena más a exigencia que a pedido. ¿Cómo lo dirías dejando lugar a un no?";
    if (buscar(t, "respetes|valores|cambies|entiendas|seas más")) return "Es un poco vago. ¿Qué acción concreta te gustaría que haga?";
    return "";
  };

  var armar = function () {
    var o = limpiar(obs.value), p = limpiar(ped.value).replace(/^¿|\?$/g, "");
    var s = marcados("cnv-sent"), n = marcados("cnv-nec");
    obsAviso.textContent = o ? revisarObs(o) : "";
    pedAviso.textContent = p ? revisarPedido(p) : "";
    if (!o && !s.length && !n.length && !p) { salida.textContent = "Completá los pasos y acá aparece tu mensaje."; return; }
    var partes = [];
    if (o) partes.push("cuando " + minuscula(o));
    if (s.length) partes.push("sentí " + unir(s));
    if (n.length) partes.push((s.length ? "porque " : "") + "necesito " + unir(n));
    var t = partes.join(", ");
    t = t ? t.charAt(0).toUpperCase() + t.slice(1) + "." : "";
    if (p) t += (t ? " " : "") + "¿" + p.charAt(0).toUpperCase() + p.slice(1) + "?";
    salida.textContent = t;
  };
  form.addEventListener("input", armar);
  form.addEventListener("change", armar);
  form.addEventListener("reset", function () { setTimeout(armar, 0); });
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  armar();

  /* ---------- Escucha empática ---------- */
  var FRASES = [
    ["¡Siempre hago todo yo en esta casa!", "«¿Estás con mucho cansancio y necesitás más colaboración en casa?»"],
    ["No me entendés nunca.", "«¿Te frustra que no llegue lo que querés decirme, y necesitás que te escuche con más atención?»"],
    ["¡Dejame en paz!", "«¿Necesitás un rato a solas para calmarte? Si querés, hablamos después.»"],
    ["Hacé lo que quieras, total da lo mismo.", "«¿Te desanima sentir que tu opinión no cuenta, y necesitás que la tengamos en cuenta?»"],
    ["Ya no te importo.", "«¿Sentís tristeza y necesitás más cercanía entre nosotros?»"],
    ["Este trabajo es una porquería.", "«¿Estás con mucha frustración y necesitás reconocimiento por lo que hacés?»"],
    ["¡Nadie me ayuda!", "«¿Tenés mucho peso encima y necesitás ayuda con algo en particular?»"],
    ["Mamá, sos una pesada.", "«¿Te molesta que te pregunte tanto y necesitás más espacio propio?»"],
    ["Siempre llegás tarde.", "«¿Te preocupa esperar y necesitás poder contar con lo que acordamos?»"],
    ["¡Otra vez con lo mismo!", "«¿Te cansa esta discusión y necesitás que encontremos otra forma de resolverla?»"],
    ["Vos no tenés idea de lo que es mi vida.", "«¿Sentís soledad con lo que estás viviendo y necesitás que alguien lo comprenda?»"],
    ["No me sale nada bien.", "«¿Estás con mucha desilusión y necesitás que alguien vea todo lo que te estás esforzando?»"]
  ];
  var esc = document.querySelector("[data-lab-escucha]");
  if (esc) {
    var eFrase = esc.querySelector("[data-lab-escucha-frase]"), eResp = esc.querySelector("[data-lab-escucha-respuesta]");
    var eActual = FRASES[0];
    esc.querySelector("[data-lab-escucha-ver]").addEventListener("click", function () {
      eResp.textContent = "Una posible respuesta: " + eActual[1] + " Si no acertás, el otro te va a corregir, y eso también es conversar.";
      eResp.hidden = false;
    });
    esc.querySelector("[data-lab-escucha-otra]").addEventListener("click", function () {
      eActual = LAB.azar(FRASES.filter(function (f) { return f !== eActual; }));
      eResp.hidden = true; LAB.poner(eFrase, "«" + eActual[0] + "»");
    });
  }
})();
