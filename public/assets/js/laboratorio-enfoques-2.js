/* Laboratorios de enfoques (2): esquemas, compasión, mentalización, psicodrama, sistémica, narrativa y focalizada en las emociones.
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Terapia de esquemas (Young): qué esquema se activa. */
  LAB.quiz("esquemas", [
    { sinComillas: true, t: "Cuando su pareja sale con amigos, no puede dejar de pensar que en cualquier momento la va a dejar.", ops: ["Abandono", "Desconfianza y abuso", "Autosacrificio"], r: 0, e: "El esquema de abandono: la sensación de que los vínculos importantes no van a durar." },
    { sinComillas: true, t: "Está convencido de que, si alguien es amable, es porque quiere sacarle algo.", ops: ["Privación emocional", "Desconfianza y abuso", "Grandiosidad"], r: 1, e: "El esquema de desconfianza y abuso: esperar que los demás lastimen, mientan o se aprovechen." },
    { sinComillas: true, t: "Cree que, si los demás la conocieran de verdad, nadie la querría.", ops: ["Defectuosidad y vergüenza", "Fracaso", "Aislamiento social"], r: 0, e: "El esquema de defectuosidad y vergüenza: sentirse fallado por dentro, indigno de amor." },
    { sinComillas: true, t: "Nunca se le ocurre pedir nada: siente que nadie le va a dar cariño ni comprensión.", ops: ["Subyugación", "Privación emocional", "Inhibición emocional"], r: 1, e: "El esquema de privación emocional: la expectativa de que las necesidades de afecto, empatía o protección no van a ser cubiertas." },
    { sinComillas: true, t: "Siempre termina cuidando a todos y postergándose, aunque nadie se lo pida.", ops: ["Autosacrificio", "Búsqueda de aprobación", "Dependencia"], r: 0, e: "El esquema de autosacrificio: poner las necesidades ajenas primero, a menudo para evitar la culpa o el sufrimiento del otro." },
    { sinComillas: true, t: "Se exige tanto que nada de lo que hace le parece suficiente, aunque los demás lo feliciten.", ops: ["Fracaso", "Metas inalcanzables", "Castigo"], r: 1, e: "El esquema de metas inalcanzables o hipercriticismo: estándares tan altos que no dejan disfrutar ni descansar." },
    { sinComillas: true, t: "No puede tomar una decisión cotidiana sin consultar antes con su madre.", ops: ["Dependencia e incompetencia", "Subyugación", "Vulnerabilidad al daño"], r: 0, e: "El esquema de dependencia e incompetencia: sentirse incapaz de manejarse solo en la vida diaria." },
    { sinComillas: true, t: "Cree que tiene derecho a hacer lo que quiere, aunque eso perjudique a otros.", ops: ["Grandiosidad", "Autocontrol insuficiente", "Búsqueda de aprobación"], r: 0, e: "El esquema de grandiosidad: sentirse superior o con derechos especiales." },
    { sinComillas: true, t: "Siempre hace lo que los demás quieren, porque teme que se enojen si no.", ops: ["Autosacrificio", "Subyugación", "Abandono"], r: 1, e: "El esquema de subyugación: someterse al control de otros por miedo a las consecuencias." }
  ]);

  /* Compasión (Gilbert): autocrítica que ataca (a) o autocorrección compasiva (b). */
  LAB.quiz("autocorreccion", [
    { t: "Sos un desastre, siempre arruinás todo.", r: "a", e: "Ataca a la persona, generaliza y mira hacia atrás. Nace del miedo y del desprecio." },
    { t: "Me equivoqué en ese informe. ¿Qué puedo aprender para la próxima?", r: "b", e: "Reconoce el error y mira hacia adelante, con ganas de mejorar." },
    { t: "No merecés descansar hasta que lo hagas perfecto.", r: "a", e: "Castiga y exige. El miedo empuja, pero agota." },
    { t: "Esto me salió mal y me duele. Es entendible, estaba cansado. Mañana lo reviso.", r: "b", e: "Valida el malestar, entiende el contexto y propone un paso concreto." },
    { t: "¿Cómo pudiste ser tan estúpido otra vez?", r: "a", e: "Es un ataque con desprecio. Suele dejar vergüenza, no aprendizaje." },
    { t: "Quiero hacerlo mejor porque me importa. ¿Qué me ayudaría?", r: "b", e: "El motor es el deseo de crecer, no el miedo al castigo." }
  ]);

  /* Compasión: los tres círculos. */
  var bal = document.querySelector("[data-cf-balance]");
  if (bal) {
    var ids = [["cf-amenaza", "Amenaza", "#c0605a"], ["cf-logro", "Logro", "#c79a3a"], ["cf-calma", "Calma", "#5f8f7a"]];
    var circ = bal.querySelector("[data-cf-circulos]"), sal = bal.querySelector("[data-cf-salida]");
    var dibujar = function () {
      var v = ids.map(function (d) { return +bal.querySelector("#" + d[0]).value; });
      circ.innerHTML = "";
      ids.forEach(function (d, i) {
        var tam = 2.2 + v[i] * 0.6;
        var c = document.createElement("div");
        c.style.cssText = "width:" + tam + "rem;height:" + tam + "rem;border-radius:50%;background:" + d[2] + ";opacity:.85;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.8rem;font-weight:600;text-align:center";
        c.textContent = d[1];
        circ.appendChild(c);
      });
      var a = v[0], l = v[1], k = v[2], txt;
      if (k < a && k < l) txt = "El sistema de calma es el más chico. Es lo más frecuente hoy, y es justamente lo que la terapia focalizada en la compasión busca fortalecer: no para eliminar los otros, sino para equilibrarlos.";
      else if (a >= l && a >= k && a >= 7) txt = "La amenaza ocupa mucho lugar. Vale la pena mirar qué la alimenta y entrenar el sistema de calma, que es el que la regula.";
      else if (l >= a && l >= k && l >= 7) txt = "El logro ocupa mucho lugar. Cuando el impulso de hacer no tiene descanso, a menudo esconde un miedo a no valer si uno se detiene.";
      else txt = "Tus tres sistemas parecen bastante equilibrados. La idea no es eliminar ninguno: los tres cumplen una función.";
      sal.textContent = txt;
    };
    ids.forEach(function (d) { bal.querySelector("#" + d[0]).addEventListener("input", dibujar); });
    dibujar();
  }

  /* Compasión: los tres flujos. */
  var flu = document.querySelector("[data-cf-flujos]");
  if (flu) {
    var ins = flu.querySelectorAll("[data-flujo]"), fsal = flu.querySelector("[data-cf-flujos-salida]");
    var calcular = function () {
      var min = null;
      ins.forEach(function (i) { if (!min || +i.value < +min.value) min = i; });
      var max = 0, minV = 10;
      ins.forEach(function (i) { max = Math.max(max, +i.value); minV = Math.min(minV, +i.value); });
      fsal.textContent = "";
      if (max - minV <= 1) { fsal.textContent = "Los tres flujos están parejos. Podés recorrer las tres estaciones en orden."; return; }
      fsal.appendChild(document.createTextNode("El flujo más bajo es la compasión " + min.getAttribute("data-flujo") + ". Puede ser un buen lugar para empezar. "));
      var a = document.createElement("a");
      a.href = min.getAttribute("data-ancla");
      a.textContent = "Empezá por esa estación.";
      fsal.appendChild(a);
    };
    ins.forEach(function (i) { i.addEventListener("input", calcular); });
    calcular();
  }

  /* Mentalización: mentaliza (a) o no (b). */
  LAB.quiz("mentaliza", [
    { t: "No me contestó porque no le importo.", r: "b", e: "Da por cierto lo que el otro siente, sin considerar otras posibilidades." },
    { t: "No me contestó. Quizás está ocupado, o quizás le molestó algo que dije. Le voy a preguntar.", r: "a", e: "Reconoce que no sabe lo que pasa en la mente del otro y busca averiguarlo." },
    { t: "Me enojé más de lo que la situación pedía. Creo que me tocó algo viejo.", r: "a", e: "Mira su propia mente con curiosidad y reconoce que la reacción tiene historia." },
    { t: "Es así, es una persona egoísta y punto.", r: "b", e: "Reduce al otro a un rasgo fijo, sin preguntarse por sus estados mentales." },
    { t: "Creo que mi hijo hace berrinche porque está cansado y no sabe decirlo.", r: "a", e: "Busca el estado mental detrás de la conducta." },
    { t: "Sé perfectamente lo que estás pensando de mí.", r: "b", e: "La certeza sobre la mente ajena es una señal de que la mentalización falla." }
  ]);

  /* Mentalización: modos prementalizantes. */
  var MZ = ["Equivalencia psíquica", "Modo simulado", "Modo teleológico"];
  LAB.quiz("modos-mz", [
    { t: "Siento que todos me miran mal, así que todos me miran mal.", ops: MZ, r: 0, e: "Lo que siente se vuelve la realidad, sin distancia." },
    { t: "Si de verdad le importara, me compraría ese regalo.", ops: MZ, r: 2, e: "El afecto solo vale si se demuestra con algo concreto y visible." },
    { sinComillas: true, t: "Pasa horas explicando con términos psicológicos por qué es como es, pero nada de eso lo conmueve ni cambia lo que hace.", ops: MZ, r: 1, e: "Es el modo simulado: reflexión desconectada de la experiencia." },
    { t: "Tengo miedo, entonces algo malo va a pasar.", ops: MZ, r: 0, e: "La emoción se toma como prueba de la realidad." },
    { t: "Si no vino ya mismo cuando lo llamé, es que no me quiere.", ops: MZ, r: 2, e: "Solo cuenta la acción física inmediata como prueba del estado mental." }
  ]);

  LAB.azarLista("mentes", [
    "Un amigo cancela por tercera vez un encuentro.",
    "Tu jefe pasa a tu lado y no te saluda.",
    "Tu pareja está callada durante la cena.",
    "Alguien en la calle te mira fijo.",
    "Tu hermana no comenta nada sobre una buena noticia tuya.",
    "Un compañero se ríe cuando entrás a la sala.",
    "Tu hijo adolescente se encierra en su cuarto apenas llega.",
    "Una amiga te responde el mensaje con un «ok».",
    "Tu madre te pregunta tres veces si comiste."
  ]);

  /* Sistémica (Bowen): diferenciado (a) o reactivo (b). */
  LAB.quiz("diferenciacion", [
    { t: "Escucho lo que piensa mi familia, y después decido lo que me parece a mí.", r: "a", e: "Puede estar en contacto sin perder su posición. Es diferenciación." },
    { t: "Cuando mi padre se enoja, me corto: dejo de hablarle por meses.", r: "b", e: "El corte emocional parece independencia, pero Bowen lo ve como otra forma de reactividad." },
    { t: "Si mi madre está mal, yo estoy mal. No puedo separarlo.", r: "b", e: "Es fusión: el clima emocional del otro se vuelve el propio." },
    { t: "Puedo decir que no estoy de acuerdo sin necesitar que el otro me dé la razón.", r: "a", e: "Sostiene su postura sin atacar ni pedir aprobación." },
    { t: "Cada vez que discuto con mi pareja, llamo a mi hermana para contarle lo mal que me trata.", r: "b", e: "Es un triángulo: la tensión de dos se descarga en un tercero." },
    { t: "Me doy cuenta de que me estoy angustiando. Respiro y elijo qué responder.", r: "a", e: "Distingue lo que siente de lo que hace. Para Bowen, es separar emoción de pensamiento." }
  ]);

  /* Sistémica (Watzlawick y Palo Alto): más de lo mismo (a) o cambio 2 (b). */
  LAB.quiz("cambio", [
    { sinComillas: true, t: "Su hijo no estudia. Cada día lo controla más y lo reta más fuerte, y cada día el hijo estudia menos.", r: "a", e: "Es más de lo mismo: la solución intentada alimenta el problema." },
    { sinComillas: true, t: "No puede dormir. Se acuesta temprano y se esfuerza por dormirse, y cada noche le cuesta más.", r: "a", e: "Intentar dormir a la fuerza es justamente lo que lo impide." },
    { sinComillas: true, t: "Después de años de insistir, deja de pedirle a su pareja que hable, y empieza a hablar ella de lo que le pasa.", r: "b", e: "Cambia la regla del juego, no solo la intensidad: es un cambio de segundo orden." },
    { sinComillas: true, t: "Para no ponerse nervioso al hablar en público, se prohíbe pensar en los nervios.", r: "a", e: "Intentar no pensar en algo suele hacer que se piense más." },
    { sinComillas: true, t: "En lugar de seguir tranquilizando a su madre cada vez que se preocupa, le pregunta qué haría ella si pasara lo peor.", r: "b", e: "Sale del circuito de tranquilizar, que mantenía la preocupación." }
  ]);

  /* Narrativa (White): paisaje de la acción (a) o de la identidad (b). */
  LAB.quiz("paisajes", [
    { t: "¿Qué hiciste ese día, cuando no le hiciste caso a la ansiedad?", r: "a", e: "Pregunta por los hechos, la secuencia, lo que pasó." },
    { t: "¿Qué dice de vos que hayas podido hacerlo?", r: "b", e: "Pregunta por el significado: valores, intenciones, lo que uno es." },
    { t: "¿Qué pasó antes, y qué pasó después?", r: "a", e: "Ordena los acontecimientos en el tiempo." },
    { t: "¿Qué es lo que valorás, que te llevó a actuar así?", r: "b", e: "Busca los valores y compromisos detrás de la acción." },
    { t: "¿Quién te vio hacerlo?", r: "a", e: "Pregunta por la escena y sus participantes." },
    { t: "¿Qué esperanzas para tu vida se reflejan en ese paso?", r: "b", e: "Une la acción a una identidad preferida." }
  ]);

  /* Focalizada en las emociones (Greenberg): tipos de emoción. */
  var EF = ["Primaria adaptativa", "Primaria desadaptativa", "Secundaria", "Instrumental"];
  LAB.quiz("tipos-ef", [
    { sinComillas: true, t: "Se muere su perro, que la acompañó quince años, y llora durante días.", ops: EF, r: 0, e: "Es la tristeza que corresponde a una pérdida. Ayuda a despedirse y a buscar consuelo." },
    { sinComillas: true, t: "Su pareja le dice que llegará tarde y él siente una vergüenza enorme, como si no valiera nada, igual que cuando era chico.", ops: EF, r: 1, e: "Es una emoción primaria, profunda, pero aprendida en otra época. Ya no responde a la situación." },
    { sinComillas: true, t: "Se enoja a los gritos cuando su amiga cancela, pero en realidad se siente triste y sola.", ops: EF, r: 2, e: "El enojo tapa la tristeza. Hay que explorar lo que está debajo." },
    { sinComillas: true, t: "Cada vez que le piden algo que no quiere hacer, se muestra muy ofendido, hasta que el otro desiste.", ops: EF, r: 3, e: "La emoción cumple una función con el otro: conseguir que ceda." },
    { sinComillas: true, t: "Alguien lo empuja en la fila para colarse y siente un enojo que le permite decir «estaba yo».", ops: EF, r: 0, e: "Es el enojo sano ante una transgresión: protege y pone límites." },
    { sinComillas: true, t: "Después de fallar en un examen siente desesperanza, pero debajo hay miedo a decepcionar a sus padres.", ops: EF, r: 2, e: "La desesperanza es secundaria: tapa un miedo más primario." }
  ]);
})();
