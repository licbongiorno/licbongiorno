/* Meditaciones del corazón: amor bondadoso, compasión y tonglen, alegría empática y ecuanimidad.
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Frases guiadas: arma las frases para un destinatario y las muestra de a una, al ritmo elegido ---------- */
  // Cada frase tiene tres formas: hacia uno, hacia otra persona (con su nombre) y hacia todos.
  var FRASES = {
    metta: [
      ["Que pueda estar a salvo.", "Que {n} esté a salvo.", "Que todos los seres estén a salvo."],
      ["Que pueda estar en paz.", "Que {n} esté en paz.", "Que todos los seres estén en paz."],
      ["Que pueda tener salud.", "Que {n} tenga salud.", "Que todos los seres tengan salud."],
      ["Que pueda vivir con tranquilidad.", "Que {n} viva con tranquilidad.", "Que todos los seres vivan con tranquilidad."],
      ["Que pueda tratarme con amabilidad.", "Que {n} pueda tratarse con amabilidad.", "Que todos los seres puedan tratarse con amabilidad."],
      ["Que pueda aceptarme tal como soy.", "Que {n} pueda aceptarse tal como es.", "Que todos los seres puedan aceptarse tal como son."]
    ],
    karuna: [
      ["Que pueda liberarme de este sufrimiento.", "Que {n} pueda liberarse de este sufrimiento.", "Que todos los seres puedan liberarse del sufrimiento."],
      ["Que pueda sostener este dolor con ternura.", "Que {n} pueda sostener su dolor con ternura.", "Que todos los que sufren encuentren ternura."],
      ["Que no atraviese esto en soledad.", "Que {n} no atraviese esto en soledad.", "Que nadie atraviese su dolor en soledad."],
      ["Que pueda encontrar alivio.", "Que {n} encuentre alivio.", "Que todos los seres encuentren alivio."],
      ["Que pueda darme lo que necesito.", "Que {n} reciba lo que necesita.", "Que todos los seres reciban lo que necesitan."]
    ],
    mudita: [
      ["Que mi alegría crezca.", "Que la alegría de {n} crezca.", "Que la alegría de todos los seres crezca."],
      ["Me alegro de lo bueno que me pasa.", "Me alegro de lo bueno que le pasa a {n}.", "Me alegro de lo bueno que les pasa a los demás."],
      ["Que esta buena fortuna dure.", "Que la buena fortuna de {n} dure.", "Que la buena fortuna de todos dure."],
      ["Que pueda disfrutar sin culpa.", "Que {n} disfrute sin culpa.", "Que todos los seres disfruten sin culpa."]
    ],
    upekkha: [
      ["Que pueda aceptar las cosas como son.", "Que {n} pueda aceptar las cosas como son.", "Que todos los seres acepten las cosas como son."],
      ["Que pueda estar en calma ante lo que no depende de mí.", "Le deseo lo mejor a {n}, y sé que su vida no depende de mí.", "Cada ser recorre su propio camino."],
      ["Que pueda mantenerme estable con el elogio y la crítica.", "Que {n} se mantenga estable con el elogio y la crítica.", "Que todos encuentren estabilidad en los cambios."],
      ["Que pueda cuidar sin perderme.", "Puedo cuidar a {n} sin cargar con todo.", "Que quienes cuidan no se pierdan en el cuidado."]
    ]
  };
  var DEST = {
    "yo": { forma: 0, ayuda: "Hacia vos. Si cuesta, empezá por alguien querido y volvé después." },
    "querido": { forma: 1, ayuda: "Alguien que te despierta cariño sin esfuerzo: un amigo, un chico, una mascota." },
    "benefactor": { forma: 1, ayuda: "Alguien que te cuidó o te ayudó: un maestro, una abuela, un terapeuta." },
    "neutro": { forma: 1, ayuda: "Alguien que ves seguido pero no conocés: el vecino, la cajera del súper." },
    "dificil": { forma: 1, ayuda: "Alguien con quien tenés un conflicto. Empezá por alguien levemente difícil, nunca por quien te dañó gravemente." },
    "todos": { forma: 2, ayuda: "Todos los seres, sin excepción: los que conocés y los que no." }
  };

  document.querySelectorAll("[data-cor-frases]").forEach(function (caja) {
    var tipo = caja.getAttribute("data-cor-frases"), lista = FRASES[tipo];
    if (!lista) return;
    var selDest = caja.querySelector("[data-cor-dest]"), nombre = caja.querySelector("[data-cor-nombre]"), ayuda = caja.querySelector("[data-cor-ayuda]");
    var opciones = caja.querySelector("[data-cor-opciones]"), propia = caja.querySelector("[data-cor-propia]");
    var ritmo = caja.querySelector("[data-cor-ritmo]"), pantalla = caja.querySelector("[data-cor-pantalla]"), texto = caja.querySelector("[data-cor-texto]");
    var boton = caja.querySelector("[data-cor-empezar]"), estado = caja.querySelector("[data-cor-estado]");
    var campoNombre = caja.querySelector("[data-cor-campo-nombre]");
    lista.forEach(function (f, k) {
      var l = document.createElement("label");
      l.className = "opcion";
      l.innerHTML = '<input type="checkbox" value="' + k + '"' + (k < 4 ? " checked" : "") + "><span></span>";
      opciones.appendChild(l);
    });
    var forma = function () { return DEST[selDest.value].forma; };
    var armar = function (k) {
      var f = lista[k][forma()], n = (nombre.value || "").trim() || "esta persona";
      return f.replace("{n}", n);
    };
    var refrescar = function () {
      opciones.querySelectorAll("label").forEach(function (l, k) { l.querySelector("span").textContent = armar(k); });
      ayuda.textContent = DEST[selDest.value].ayuda;
      campoNombre.hidden = forma() !== 1;
    };
    var frases = function () {
      var r = [];
      opciones.querySelectorAll("input:checked").forEach(function (i) { r.push(armar(+i.value)); });
      var p = (propia.value || "").trim();
      if (p) r.push(p.charAt(0).toUpperCase() + p.slice(1).replace(/[.]?$/, "."));
      return r;
    };
    var timer = null, k = 0, vuelta = 0, actuales = [];
    var mostrar = function () {
      var t = actuales[k];
      if (reducido) { texto.textContent = t; }
      else {
        texto.classList.remove("cor-texto--entra");
        void texto.offsetWidth;
        texto.textContent = t;
        texto.classList.add("cor-texto--entra");
      }
      estado.textContent = "Frase " + (k + 1) + " de " + actuales.length + " · vuelta " + (vuelta + 1) + ". Repetila en silencio, sin apuro.";
    };
    var parar = function (fin) {
      clearInterval(timer); timer = null;
      boton.textContent = "Empezar";
      pantalla.classList.remove("cor-pantalla--activa");
      if (fin) { texto.textContent = "Quedate un momento con lo que haya. No hace falta sentir nada especial."; estado.textContent = "Terminaste tres vueltas."; LAB.campana(); }
    };
    boton.addEventListener("click", function () {
      if (timer) { parar(false); estado.textContent = "En pausa."; return; }
      actuales = frases();
      if (!actuales.length) { estado.textContent = "Elegí al menos una frase."; return; }
      k = 0; vuelta = 0;
      pantalla.classList.add("cor-pantalla--activa");
      boton.textContent = "Pausar";
      mostrar();
      timer = setInterval(function () {
        k++;
        if (k >= actuales.length) { k = 0; vuelta++; }
        if (vuelta >= 3) { parar(true); return; }
        mostrar();
      }, (parseInt(ritmo.value, 10) || 10) * 1000);
    });
    [selDest, nombre].forEach(function (el) { el.addEventListener("input", refrescar); el.addEventListener("change", refrescar); });
    refrescar();
  });

  /* ---------- Tonglen: respiración guiada que recibe el dolor al inhalar y envía alivio al exhalar ---------- */
  var ETAPAS = {
    "abrir": ["Inhalá algo pesado, oscuro, caliente.", "Exhalá algo liviano, claro, fresco."],
    "yo": ["Inhalá tu propio malestar, tal como está.", "Exhalá espacio, alivio, amabilidad hacia vos."],
    "alguien": ["Inhalá el dolor de esa persona.", "Exhalá lo que le haría bien: alivio, compañía, descanso."],
    "todos": ["Inhalá el dolor de todos los que sienten esto mismo.", "Exhalá alivio hacia todos ellos, y hacia vos."]
  };
  document.querySelectorAll("[data-cor-tonglen]").forEach(function (caja) {
    var circulo = caja.querySelector("[data-cor-circulo]"), texto = caja.querySelector("[data-cor-tonglen-texto]");
    var boton = caja.querySelector("[data-cor-tonglen-empezar]"), etapa = caja.querySelector("[data-cor-etapa]"), estado = caja.querySelector("[data-cor-tonglen-estado]");
    var duracion = caja.querySelector("[data-cor-duracion]");
    var timer = null, fase = 0, ciclos = 0, total = 10;
    var paso = function () {
      var e = ETAPAS[etapa.value], inhalar = fase === 0;
      texto.textContent = e[fase];
      circulo.classList.toggle("cor-circulo--inhala", inhalar);
      circulo.classList.toggle("cor-circulo--exhala", !inhalar);
      estado.textContent = (inhalar ? "Inhalar" : "Exhalar") + " · respiración " + (ciclos + 1) + " de " + total;
    };
    var parar = function (fin) {
      clearTimeout(timer); timer = null;
      boton.textContent = "Empezar";
      circulo.classList.remove("cor-circulo--inhala", "cor-circulo--exhala");
      if (fin) { texto.textContent = "Soltá la práctica. Respirá normal y notá cómo quedaste."; estado.textContent = "Terminaste."; LAB.campana(); }
    };
    var seg = function () { return (parseInt(caja.querySelector("[data-cor-ritmo-tonglen]").value, 10) || 5) * 1000; };
    var ciclo = function () {
      paso();
      timer = setTimeout(function () {
        fase = 1 - fase;
        if (fase === 0) ciclos++;
        if (ciclos >= total) { parar(true); return; }
        ciclo();
      }, seg());
    };
    boton.addEventListener("click", function () {
      if (timer) { parar(false); estado.textContent = "En pausa."; return; }
      total = parseInt(duracion.value, 10) || 10;
      fase = 0; ciclos = 0;
      circulo.style.setProperty("--cor-seg", seg() / 1000 + "s");
      boton.textContent = "Pausar";
      ciclo();
    });
    etapa.addEventListener("change", function () { if (!timer) texto.textContent = ETAPAS[etapa.value][0]; });
    texto.textContent = ETAPAS[etapa.value][0];
  });

  /* ---------- Ejercicios de práctica ---------- */
  LAB.quiz("enemigos-metta", [
    { sinComillas: true, t: "Le desea a su hijo que sea feliz, siempre y cuando haga lo que ella espera.", ops: ["Amor bondadoso", "Apego", "Mala voluntad"], r: 1, e: "Es el enemigo cercano del amor bondadoso: se parece, pero es condicional y busca algo para uno." },
    { sinComillas: true, t: "Le desea bienestar a un compañero de trabajo, aunque no le cae especialmente bien.", ops: ["Amor bondadoso", "Apego", "Mala voluntad"], r: 0, e: "El amor bondadoso no depende de que el otro nos guste ni de que nos devuelva algo." },
    { sinComillas: true, t: "Piensa: «Ojalá le vaya mal, se lo merece».", ops: ["Amor bondadoso", "Apego", "Mala voluntad"], r: 2, e: "Es el enemigo lejano: el opuesto directo del deseo de bienestar." },
    { sinComillas: true, t: "Necesita que su pareja esté bien para poder estar bien él, y se angustia si ella tiene un mal día.", ops: ["Amor bondadoso", "Apego", "Mala voluntad"], r: 1, e: "Cuando el bienestar del otro es una necesidad propia, se acerca más al apego que a la benevolencia." },
    { sinComillas: true, t: "Mira a un desconocido en el colectivo y piensa: «Que tengas un buen día».", ops: ["Amor bondadoso", "Apego", "Mala voluntad"], r: 0, e: "Desear el bien sin esperar nada a cambio, incluso a quien no conocemos." }
  ]);

  LAB.quiz("compasion-o-no", [
    { sinComillas: true, t: "Ve a una persona en situación de calle y piensa: «Pobre, qué vida triste, por suerte yo no soy así».", ops: ["Compasión", "Lástima", "Compasión idiota", "Crueldad"], r: 1, e: "La lástima mira desde arriba y separa. La compasión reconoce que el sufrimiento es común a todos." },
    { sinComillas: true, t: "Su hermano le pide plata por décima vez para apostar, y se la da para no verlo mal.", ops: ["Compasión", "Lástima", "Compasión idiota", "Crueldad"], r: 2, e: "Chögyam Trungpa llamó «compasión idiota» a evitar el malestar del otro, o el propio, aun cuando eso alimenta el problema." },
    { sinComillas: true, t: "Su amiga le cuenta que la dejaron. Se sienta a su lado, la escucha y le pregunta qué necesita.", ops: ["Compasión", "Lástima", "Compasión idiota", "Crueldad"], r: 0, e: "Reconoce el sufrimiento, se queda cerca y se orienta a aliviarlo." },
    { sinComillas: true, t: "Se burla de un compañero que se puso nervioso al exponer.", ops: ["Compasión", "Lástima", "Compasión idiota", "Crueldad"], r: 3, e: "Es el enemigo lejano de la compasión: disfrutar o agravar el sufrimiento ajeno." },
    { sinComillas: true, t: "Le dice que no a su hijo adolescente que quiere salir a la noche sin avisar dónde, aunque él se enoje y sufra.", ops: ["Compasión", "Lástima", "Compasión idiota", "Crueldad"], r: 0, e: "A veces la compasión incluye un límite que genera malestar ahora para cuidar a largo plazo." },
    { sinComillas: true, t: "Ante el dolor de un paciente se angustia tanto que no puede pensar, y después le cuesta dormir.", ops: ["Compasión", "Lástima", "Compasión idiota", "Crueldad"], r: 1, e: "Más precisamente, es malestar empático: sentir el dolor ajeno como propio hasta desbordarse. En la tradición, la tristeza que abruma es el enemigo cercano de la compasión." }
  ]);

  LAB.quiz("empatia-compasion", [
    { t: "Me duele tanto verlo así que prefiero no ir a visitarlo.", r: "a", e: "El malestar empático lleva a alejarse para protegerse. Singer y Klimecki lo asocian con el desgaste." },
    { t: "Me duele verlo así, y quiero acompañarlo. ¿Qué puedo hacer?", r: "b", e: "La compasión reconoce el dolor y se orienta al cuidado. Se vive con calidez, no solo con angustia." },
    { t: "Escucho a mis pacientes todo el día y llego a casa vacío, como si cargara con todo.", r: "a", e: "Es el cuadro que suele llamarse fatiga por compasión, aunque las investigaciones de Singer sugieren que es más bien fatiga empática." },
    { t: "Siento su tristeza, y al mismo tiempo siento ternura y ganas de cuidarla.", r: "b", e: "La compasión agrega al registro del dolor un sentimiento de calidez y de cuidado." },
    { t: "Cuando alguien llora cerca mío, me angustio tanto que cambio de tema.", r: "a", e: "Cambiar de tema alivia al que escucha, no al que sufre: es una salida del malestar empático." }
  ]);

  LAB.quiz("buenas-noticias", [
    { sinComillas: true, t: "Tu amiga te cuenta que consiguió el trabajo que quería. Le decís: «¡Qué bueno! Contame todo: ¿cómo fue la entrevista? ¿Cuándo empezás?».", ops: ["Activa y constructiva", "Pasiva y constructiva", "Activa y destructiva", "Pasiva y destructiva"], r: 0, e: "Es la respuesta que Shelly Gable asoció con mejores vínculos: entusiasmo genuino y curiosidad que amplifica la buena noticia." },
    { sinComillas: true, t: "Le decís: «Ah, qué bien», y seguís mirando el celular.", ops: ["Activa y constructiva", "Pasiva y constructiva", "Activa y destructiva", "Pasiva y destructiva"], r: 1, e: "Es positiva, pero apagada. Para quien cuenta, suele sentirse casi como indiferencia." },
    { sinComillas: true, t: "Le decís: «¿Y vas a poder con tanta responsabilidad? Mirá que ahí explotan a la gente».", ops: ["Activa y constructiva", "Pasiva y constructiva", "Activa y destructiva", "Pasiva y destructiva"], r: 2, e: "Le busca el lado negativo. A veces nace de la preocupación, a veces de la envidia." },
    { sinComillas: true, t: "Le decís: «Ah. Che, ¿viste lo que me pasó a mí hoy?».", ops: ["Activa y constructiva", "Pasiva y constructiva", "Activa y destructiva", "Pasiva y destructiva"], r: 3, e: "Ignora la noticia y vuelve el foco hacia uno." }
  ]);

  LAB.quiz("ecuanimidad", [
    { t: "Le deseo lo mejor y voy a ayudar en lo que pueda; lo que elija hacer con su vida no depende de mí.", r: 0, ops: ["Ecuanimidad", "Indiferencia", "Reactividad"], e: "Combina cuidado con aceptación de los límites propios." },
    { t: "Que haga lo que quiera, a mí no me importa.", r: 1, ops: ["Ecuanimidad", "Indiferencia", "Reactividad"], e: "Es el enemigo cercano de la ecuanimidad: parece calma, pero es desconexión." },
    { t: "Me criticaron en la reunión y ya no pude pensar en otra cosa en todo el día.", r: 2, ops: ["Ecuanimidad", "Indiferencia", "Reactividad"], e: "Uno de los ocho vientos, la crítica, se llevó toda la atención." },
    { t: "Me elogiaron mucho y me puse contento; también sé que mañana pueden criticarme.", r: 0, ops: ["Ecuanimidad", "Indiferencia", "Reactividad"], e: "Disfruta el elogio sin aferrarse: sabe que los vientos cambian." },
    { t: "Ya no siento nada por nadie, así no sufro.", r: 1, ops: ["Ecuanimidad", "Indiferencia", "Reactividad"], e: "Apagar el afecto para no sufrir no es ecuanimidad. La ecuanimidad sostiene el afecto sin dejarse arrastrar." }
  ]);

  /* Hub: ¿qué morada necesito hoy? */
  LAB.azarLista("corazon-recordatorios", [
    "Pensá en alguien que te hizo sonreír esta semana y deseale, en silencio, que esté bien.",
    "La próxima vez que veas a alguien cansado en la calle, decí por dentro: «Que encuentres descanso».",
    "Cuando alguien te cuente algo bueno, hacele una pregunta más sobre eso.",
    "Ante algo que no podés cambiar, probá decirte: «Esto es así ahora».",
    "Poné una mano en el pecho y respirá tres veces, como si respiraras hacia esa mano.",
    "Recordá un momento en que alguien fue amable con vos sin motivo.",
    "Si te descubrís envidiando a alguien, preguntate qué te muestra esa envidia de lo que deseás.",
    "Antes de dormir, deseale bienestar a una persona difícil. Una sola frase alcanza.",
    "Notá un sufrimiento cercano hoy, y preguntate: «¿Qué ayudaría, aunque sea un poco?».",
    "Cuando te equivoques, probá hablarte como le hablarías a un amigo."
  ]);
})();
