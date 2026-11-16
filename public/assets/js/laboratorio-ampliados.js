/* Estaciones ampliadas de duelo, pareja, sueños, desarrollo y apego, y estrés.
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* ---------- Duelo ---------- */
  LAB.quiz("duelo-mitos", [
    { t: "El duelo pasa por cinco etapas, siempre en el mismo orden.", r: "a", e: "Es un mito. Elisabeth Kübler-Ross describió esas etapas en personas que iban a morir, y ella misma aclaró que no son una secuencia fija. El duelo va y viene." },
    { t: "Para hacer bien el duelo hay que soltar y dejar atrás a quien murió.", r: "a", e: "La investigación sobre vínculos continuos muestra que mantener un lazo con quien murió, transformado, es frecuente y puede ser sano." },
    { t: "Al año ya debería estar mejor.", r: "a", e: "No hay un plazo universal. Lo que importa es si, con el tiempo, el dolor deja lugar a la vida." },
    { t: "Algunos días voy a estar bien y otros muy mal, aunque haya pasado tiempo.", r: "b", e: "Es así. El modelo de doble proceso describe justamente esa oscilación entre el dolor y la vida que sigue." },
    { t: "Si no lloro, es que no lo quería.", r: "a", e: "Cada persona tiene su forma de doler. Hay quien llora mucho y quien canaliza el duelo haciendo cosas." },
    { t: "Es mejor no hablarles a los chicos de la muerte, para protegerlos.", r: "a", e: "Los chicos se dan cuenta. Una verdad dicha con palabras simples y compañía los protege más que el silencio." },
    { t: "Distraerme a veces también es parte del duelo.", r: "b", e: "Sí. Tomar distancia del dolor por momentos es parte del proceso, no una forma de negarlo." }
  ]);
  LAB.quiz("duelo-acompanar", [
    { t: "Todo pasa por algo.", r: "b", e: "Aunque se diga con cariño, puede sentirse como si el dolor no tuviera lugar." },
    { t: "No sé qué decirte. Estoy acá.", r: "a", e: "Reconocer que no hay palabras y quedarse cerca suele ayudar más que cualquier frase." },
    { t: "Ya está en un lugar mejor.", r: "b", e: "Puede servir si la persona lo cree, pero muchas veces cierra la conversación." },
    { t: "¿Querés contarme cómo era?", r: "a", e: "Invitar a hablar de quien murió suele ser un regalo: muchos dejan de nombrarlo por miedo a hacer doler." },
    { t: "Tenés que ser fuerte por tus hijos.", r: "b", e: "Agrega una exigencia. Mostrar el dolor también enseña a los hijos que se puede sentir y seguir." },
    { t: "El jueves te llevo la comida, ¿te parece?", r: "a", e: "Las ayudas concretas, con día y hora, suelen valer más que el «avisame si necesitás algo»." }
  ]);

  /* ---------- Pareja ---------- */
  var JIN = ["Crítica", "Desprecio", "Actitud defensiva", "Evasión"];
  LAB.quiz("jinetes", [
    { t: "Nunca pensás en nadie más que en vos. Sos un egoísta.", ops: JIN, r: 0, e: "Ataca a la persona en lugar de la conducta. El antídoto es un planteo suave: hablar de lo que siento y necesito." },
    { sinComillas: true, t: "Pone los ojos en blanco y dice con sarcasmo: «Ah, claro, vos sí que hacés todo perfecto».", ops: JIN, r: 1, e: "El desprecio, con burla o superioridad, fue el mejor predictor de separación en la investigación de Gottman. El antídoto es cultivar el aprecio." },
    { t: "Yo no llegué tarde, el que me hizo salir tarde fuiste vos.", ops: JIN, r: 2, e: "Se defiende devolviendo la culpa. El antídoto es asumir aunque sea una parte de la responsabilidad." },
    { sinComillas: true, t: "En medio de la discusión, se queda callado, mira el celular y no responde.", ops: JIN, r: 3, e: "La evasión suele aparecer cuando la persona está desbordada. El antídoto es pedir una pausa y calmarse, para volver a hablar." },
    { t: "Siempre dejás todo tirado, sos un desastre.", ops: JIN, r: 0, e: "«Siempre» y «sos» convierten un hecho en un defecto de carácter." },
    { t: "Bueno, qué querés que haga, si yo trabajo todo el día.", ops: JIN, r: 2, e: "Una excusa que no escucha el reclamo. Probá: «Tenés razón en que se me pasó; ¿cómo lo resolvemos?»." }
  ]);
  var OFE = ["Hacia", "Lejos", "En contra"];
  LAB.quiz("ofertas", [
    { sinComillas: true, t: "Ella dice: «Mirá ese pájaro». Él levanta la vista y dice: «Uh, qué lindo».", ops: OFE, r: 0, e: "Responde a la oferta de conexión, aunque sea con un gesto mínimo." },
    { sinComillas: true, t: "Él dice: «Hoy tuve un día raro». Ella sigue mirando la tele sin contestar.", ops: OFE, r: 1, e: "La oferta queda sin respuesta. Muchas veces no es mala intención: es distracción. Pero se acumula." },
    { sinComillas: true, t: "Ella dice: «¿Viste que llegó la boleta de la luz?». Él contesta: «¿Y qué querés, que la pague yo como siempre?».", ops: OFE, r: 2, e: "Responde con hostilidad a una oferta neutra." },
    { sinComillas: true, t: "Él le muestra una foto en el celular. Ella dice: «Ahora no puedo, pero a la noche me contás».", ops: OFE, r: 0, e: "Aunque no pueda en ese momento, reconoce la oferta y propone volver. Eso también es girar hacia el otro." }
  ]);
  LAB.azarLista("mapas-del-amor", [
    "¿Qué es lo que más le preocupa a tu pareja en este momento?",
    "¿Cuál fue el mejor momento de la infancia de tu pareja?",
    "¿Qué sueño tiene tu pareja que todavía no cumplió?",
    "¿Quién es la persona que más le molesta en el trabajo a tu pareja, y por qué?",
    "¿Qué gesto le hace bien a tu pareja cuando tiene un mal día?",
    "¿Qué haría tu pareja con un mes libre?",
    "¿Cuál es la comida que más reconforta a tu pareja?",
    "¿Qué le da miedo del futuro a tu pareja?",
    "¿De qué está orgullosa tu pareja que casi nunca cuenta?",
    "¿Qué amistad es hoy la más importante para tu pareja?",
    "¿Qué canción emociona a tu pareja?",
    "¿Qué le gustaría a tu pareja que cambiara en la relación?"
  ]);

  /* ---------- Sueños ---------- */
  LAB.quiz("freud-jung-suenos", [
    { t: "El sueño es la realización disfrazada de un deseo reprimido.", r: "a", e: "Es la tesis central de La interpretación de los sueños (1900)." },
    { t: "El sueño no oculta: muestra la situación del inconsciente tal como es.", r: "b", e: "Jung pensaba que el sueño se expresa en imágenes porque ese es su lenguaje, no para engañar a la conciencia." },
    { t: "Detrás del contenido manifiesto hay un contenido latente que hay que descifrar.", r: "a", e: "Para Freud, el trabajo del sueño (condensación, desplazamiento) disfraza el contenido latente." },
    { t: "El sueño compensa la actitud unilateral de la conciencia.", r: "b", e: "La función compensatoria es una de las ideas centrales de Jung sobre los sueños." },
    { t: "Hay que amplificar la imagen con mitos, cuentos y paralelos culturales.", r: "b", e: "La amplificación es el método junguiano. Freud prefería la asociación libre de la persona." },
    { t: "Lo más importante son las asociaciones libres de quien soñó, a partir de cada elemento.", r: "a", e: "Es el método freudiano. Jung también usaba las asociaciones personales, pero se quedaba cerca de la imagen." }
  ]);

  /* ---------- Desarrollo y apego ---------- */
  var cajaApego = document.querySelector("[data-apego-ejes]");
  if (cajaApego) {
    var ans = cajaApego.querySelector("#ap-ansiedad"), evi = cajaApego.querySelector("#ap-evitacion"), sal = cajaApego.querySelector("[data-apego-salida]"), punto = cajaApego.querySelector("[data-apego-punto]");
    var TEXTOS = {
      seguro: ["Baja ansiedad y baja evitación", "Se parece a lo que Bartholomew y Horowitz llamaron apego seguro: comodidad con la cercanía y con la autonomía, confianza en que el otro va a estar."],
      preocupado: ["Alta ansiedad y baja evitación", "Se parece al patrón preocupado: búsqueda de cercanía con miedo a no ser querido, mucha atención a las señales del otro."],
      rechazante: ["Baja ansiedad y alta evitación", "Se parece al patrón evitativo o rechazante: valoración fuerte de la independencia y cierta incomodidad con la dependencia mutua."],
      temeroso: ["Alta ansiedad y alta evitación", "Se parece al patrón temeroso: deseo de cercanía y, al mismo tiempo, miedo a ser lastimado, que lleva a acercarse y alejarse."]
    };
    var calc = function () {
      var a = +ans.value, e = +evi.value;
      var k = a < 5 ? (e < 5 ? "seguro" : "rechazante") : (e < 5 ? "preocupado" : "temeroso");
      sal.innerHTML = "<strong>" + TEXTOS[k][0] + ".</strong> " + TEXTOS[k][1] + " Es una orientación para pensarte, no un diagnóstico, y el apego cambia con los vínculos.";
      punto.style.left = (e * 10) + "%";
      punto.style.bottom = (a * 10) + "%";
    };
    ans.addEventListener("input", calc);
    evi.addEventListener("input", calc);
    calc();
  }
  LAB.quiz("funcion-reflexiva", [
    { t: "Llora porque es un caprichoso.", r: "b", e: "Le atribuye un rasgo fijo, sin preguntarse qué le pasa." },
    { t: "Creo que llora porque está cansado y no sabe cómo decirlo.", r: "a", e: "Busca el estado mental detrás de la conducta. Arietta Slade llama a esto función reflexiva parental." },
    { t: "Lo hace para provocarme.", r: "b", e: "Interpreta la conducta del chico solo en relación con uno, y con mala intención." },
    { t: "Me enojé con ella porque me hizo acordar a cuando mi mamá me retaba.", r: "a", e: "Reconoce cómo la propia historia influye en la reacción. También es función reflexiva." },
    { t: "Quizás se portó así en el cumpleaños porque había mucha gente y se asustó.", r: "a", e: "Considera el contexto y una emoción posible, sin dar nada por seguro." }
  ]);

  /* ---------- Estrés ---------- */
  var AF = ["Centrado en el problema", "Centrado en la emoción", "Evitación"];
  LAB.quiz("afrontamiento", [
    { sinComillas: true, t: "Tiene mucho trabajo atrasado. Arma una lista, prioriza y le pide ayuda a un compañero.", ops: AF, r: 0, e: "Actúa sobre la situación que genera el estrés." },
    { sinComillas: true, t: "Le diagnosticaron una enfermedad crónica. Va a un grupo de pacientes para hablar de cómo se siente.", ops: AF, r: 1, e: "Cuando la situación no se puede cambiar, regular la emoción es lo más útil." },
    { sinComillas: true, t: "Se le acumulan las deudas. No abre los sobres del banco y se queda hasta tarde con series.", ops: AF, r: 2, e: "Alivia un rato, pero el problema crece. La evitación sostenida suele empeorar el estrés." },
    { sinComillas: true, t: "Discutió con su jefe. Sale a caminar para calmarse y después escribe qué quiere decirle.", ops: AF, r: 1, e: "Primero regula la emoción; después puede pasar al problema. Las dos formas se combinan." },
    { sinComillas: true, t: "Se mudó y no conoce a nadie. Se anota en un taller del barrio.", ops: AF, r: 0, e: "Busca resolver la falta de vínculos con una acción concreta." }
  ]);
})();
