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

  /* ---------- Psicoterapia breve focalizada (Fiorini): intervenciones del terapeuta ---------- */
  var INT = ["Preguntar", "Clarificar", "Señalar", "Interpretar", "Sugerir"];
  LAB.quiz("intervenciones-fiorini", [
    { t: "¿Qué pasó exactamente la noche en que empezó el insomnio?", ops: INT, r: 0, e: "Una pregunta que busca datos concretos de la situación." },
    { t: "Entonces, si entiendo bien, lo que más te angustia no es el trabajo nuevo, sino dejar a tu equipo de antes.", ops: INT, r: 1, e: "Reformula lo dicho para ordenarlo y volverlo más claro." },
    { t: "Noto que cada vez que hablás de tu padre bajás la voz.", ops: INT, r: 2, e: "Llama la atención sobre algo observable, sin explicarlo, y deja que la persona lo piense." },
    { t: "Quizás el insomnio aparece porque crecer en el trabajo se te vive como traicionar a tu viejo grupo, como cuando dejaste el barrio.", ops: INT, r: 3, e: "Propone un sentido no evidente, que conecta el síntoma con un conflicto y con la historia." },
    { t: "¿Y si esta semana probás hablar con tu jefe antes de que se acumule la tensión?", ops: INT, r: 4, e: "Propone una actitud o una acción concreta, algo frecuente en las terapias breves, con un terapeuta activo." }
  ]);

  var MOT = ["Un síntoma", "Una crisis", "Un fracaso adaptativo"];
  LAB.quiz("motivo-fiorini", [
    { t: "Hace dos meses empecé a tener taquicardia y miedo a salir sola a la calle.", ops: MOT, r: 0, e: "Un síntoma que perturba y que aparece en primer plano." },
    { t: "Mi pareja se fue de casa el viernes y no sé cómo seguir.", ops: MOT, r: 1, e: "Algo se rompió de golpe: una crisis." },
    { t: "Me jubilé hace un año y no encuentro qué hacer con mis días.", ops: MOT, r: 2, e: "Dificultad para acomodarse a un cambio de etapa." },
    { t: "Desde hace semanas no puedo concentrarme para estudiar.", ops: MOT, r: 0, e: "Una inhibición, un síntoma que traba una función." },
    { t: "Me mudé por trabajo a otra ciudad y no logro armar una vida acá.", ops: MOT, r: 2, e: "No poder adaptarse a una nueva exigencia." },
    { t: "Ayer murió mi padre de manera inesperada.", ops: MOT, r: 1, e: "Un acontecimiento que irrumpe: una crisis, y el comienzo de un duelo." }
  ]);
  var PLA = ["Grupal", "Caracterológico", "Contexto social"];
  LAB.quiz("situacion-fiorini", [
    { t: "En mi familia siempre fui la que resuelve los problemas de todos.", ops: PLA, r: 0, e: "Un rol en el grupo de pertenencia." },
    { t: "Me cuesta muchísimo decir que no; prefiero cargar con todo.", ops: PLA, r: 1, e: "Un rasgo propio, una manera estable de estar." },
    { t: "Con la inflación, tuve que tomar un segundo trabajo.", ops: PLA, r: 2, e: "Un determinante económico, más allá de la persona." },
    { t: "En la oficina me ubicaron como el que nunca se queja.", ops: PLA, r: 0, e: "El lugar asignado en un grupo." },
    { t: "Necesito que todo esté bajo control antes de relajarme.", ops: PLA, r: 1, e: "Un rasgo de carácter que se pone en juego." },
    { t: "En mi pueblo se espera que las mujeres se casen antes de los treinta.", ops: PLA, r: 2, e: "Un mandato cultural del contexto." }
  ]);
  var FUN = ["Básica", "Defensiva", "Integradora"];
  LAB.quiz("funciones-fiorini", [
    { t: "Antes de la entrevista de trabajo, imagina qué le pueden preguntar.", ops: FUN, r: 0, e: "Anticipación, una función básica." },
    { t: "Dice que no le afecta la separación y cambia rápido de tema.", ops: FUN, r: 1, e: "Una forma de neutralizar la angustia: algo cercano a la negación." },
    { t: "Puede contar su historia de vida y encontrarle un hilo.", ops: FUN, r: 2, e: "Sintetizar y dar coherencia: una función integradora." },
    { t: "Recuerda con detalle lo que le dijo el médico.", ops: FUN, r: 0, e: "Memoria y atención, funciones básicas." },
    { t: "Explica con argumentos impecables por qué no le importa no haber sido invitado.", ops: FUN, r: 1, e: "Una racionalización, al servicio de no sentir." },
    { t: "Sostiene un proyecto a cinco años, aunque hoy esté cansada.", ops: FUN, r: 2, e: "Organizar la vida en torno a un proyecto: una función integradora." }
  ]);
  var ONCE = ["Interrogar", "Proporcionar información", "Confirmar o rectificar", "Clarificar", "Recapitular", "Señalar", "Interpretar", "Sugerir", "Intervención directiva", "Operación de encuadre", "Metaintervención"];
  LAB.quiz("intervenciones-fiorini-11", [
    { t: "¿Qué te dijo exactamente tu hermano esa noche?", ops: ONCE, r: 0, e: "Pide datos precisos del relato." },
    { t: "Los ataques de pánico son muy frecuentes y no producen un infarto, aunque se sientan así.", ops: ONCE, r: 1, e: "Da información que la persona no tenía." },
    { t: "No es cierto que nunca hayas podido terminar nada: terminaste la carrera trabajando.", ops: ONCE, r: 2, e: "Rectifica una idea de la persona sobre sí misma y muestra un punto ciego." },
    { t: "O sea: lo que te angustia no es la mudanza en sí, sino dejar sola a tu madre.", ops: ONCE, r: 3, e: "Despeja el relato y recorta lo significativo." },
    { t: "En estas cuatro sesiones vimos tu relación con tu jefe, con tu padre y con tu pareja, y en las tres aparece el miedo a decepcionar.", ops: ONCE, r: 4, e: "Resume de manera sintética lo trabajado a lo largo del tiempo." },
    { t: "Te reíste justo cuando nombraste a tu ex.", ops: ONCE, r: 5, e: "Muestra algo sin explicarlo y deja que la persona lo piense." },
    { t: "Tal vez llegás tarde a todo lo que te importa porque llegar a tiempo sería admitir cuánto lo deseás.", ops: ONCE, r: 6, e: "Propone un sentido no evidente, ligado a un conflicto." },
    { t: "¿Qué te parece si probás contarle a tu amiga lo que te pasó?", ops: ONCE, r: 7, e: "Propone una acción posible, sin imponerla." },
    { t: "Esta semana, antes de dormir, anotá tres cosas que te preocupan y dejá el celular fuera del cuarto.", ops: ONCE, r: 8, e: "Indica una tarea concreta de manera explícita." },
    { t: "Como acordamos, vamos a trabajar unas veinte sesiones sobre el tema de tu separación.", ops: ONCE, r: 9, e: "Recuerda las condiciones del trabajo: tiempo y foco." },
    { t: "Te hago tantas preguntas sobre los detalles porque ahí suele esconderse lo importante.", ops: ONCE, r: 10, e: "Explica el sentido de las intervenciones anteriores." }
  ]);
  var TOP = ["Lo dado", "El límite", "El caos creador", "Lo posible"];
  LAB.quiz("topica-fiorini", [
    { t: "Hace quince años que trabaja en lo mismo, de la misma manera, y le sale de memoria.", ops: TOP, r: 0, e: "Formas constituidas, conocidas: lo dado." },
    { t: "Quiere renunciar; cada vez que lo piensa siente vértigo y, a la vez, una extraña alegría.", ops: TOP, r: 1, e: "El borde de lo dado: ansiedad y placer al mismo tiempo." },
    { t: "Después de la separación, nada tiene su lugar: horarios, amigos, ideas sobre sí mismo.", ops: TOP, r: 2, e: "Las formas se desarman: un espacio abierto en muchas direcciones." },
    { t: "Empieza a imaginar una forma de vivir que antes no se le había ocurrido.", ops: TOP, r: 3, e: "Emerge una forma nueva: lo posible." },
    { t: "La novela que escribió hace años hoy le parece algo ajeno, una parte de su pasado.", ops: TOP, r: 0, e: "Lo creado se vuelve, con el tiempo, algo dado." },
    { t: "En el taller de pintura rompe todas sus reglas y no sabe qué va a salir.", ops: TOP, r: 2, e: "Desarmar las formas: el caos creador." }
  ]);
  var FM = ["Forma sin movimiento", "Movimiento sin forma", "Oscilar en el límite"];
  LAB.quiz("forma-movimiento-fiorini", [
    { t: "Revisa tres veces que la puerta esté cerrada y no puede salir sin su rutina.", ops: FM, r: 0, e: "Orden y repetición: forma rígida." },
    { t: "Empieza un proyecto nuevo cada mes, con entusiasmo, y ninguno llega a término.", ops: FM, r: 1, e: "Mucha intensidad, sin que algo tome forma." },
    { t: "Quiere viajar sola; arma la valija, se acerca al aeropuerto y vuelve a casa.", ops: FM, r: 2, e: "Acercarse al borde y retroceder." },
    { t: "Tiene todo planificado al detalle y siente que su vida está quieta.", ops: FM, r: 0, e: "Forma sin movimiento." },
    { t: "Pasa de un vínculo intenso a otro, sin poder quedarse.", ops: FM, r: 1, e: "Movimiento sin forma." }
  ]);

  var FAM = ["Psicométrica", "Proyectiva"];
  LAB.quiz("familias-psicodiagnostico", [
    { t: "Una escala de inteligencia con subpruebas cronometradas y puntajes comparados con baremos.", ops: FAM, r: 0, e: "Estandarizada y comparada con una población de referencia: psicométrica." },
    { t: "Una serie de manchas de tinta sobre las que se pregunta qué podría ser.", ops: FAM, r: 1, e: "Es el Rorschach: un estímulo ambiguo, sin respuestas correctas." },
    { t: "Un cuestionario de personalidad con cientos de afirmaciones para responder verdadero o falso.", ops: FAM, r: 0, e: "Consignas fijas y puntuación estandarizada: psicométrico." },
    { t: "Dibujar una casa, un árbol y una persona.", ops: FAM, r: 1, e: "El HTP es una técnica proyectiva gráfica." },
    { t: "Láminas con escenas ambiguas, sobre las que se pide contar una historia.", ops: FAM, r: 1, e: "El TAT: la historia que se arma habla de quien la cuenta." },
    { t: "Una prueba de matrices en la que hay que completar la figura que falta.", ops: FAM, r: 0, e: "Las matrices progresivas miden razonamiento y tienen respuestas correctas." },
    { t: "Completar frases que empiezan, por ejemplo, con «Mi mayor miedo…».", ops: FAM, r: 1, e: "Las frases incompletas son una técnica proyectiva verbal." }
  ]);
  LAB.quiz("mitos-psicodiagnostico", [
    { t: "Con un solo test se puede saber cómo es una persona.", r: "a", e: "Mito. Se usa una batería, y las conclusiones salen de integrar varias técnicas con la entrevista." },
    { t: "En las técnicas proyectivas no hay respuestas correctas ni incorrectas.", r: "b", e: "Verdad. Lo que importa es cómo responde cada persona, no si acierta." },
    { t: "Conviene buscar en internet las láminas y practicar los dibujos antes de ir.", r: "a", e: "Mito. Prepararse así no ayuda y puede invalidar los resultados. Es mejor responder con naturalidad." },
    { t: "Dibujar mal es una mala señal.", r: "a", e: "Mito. En las técnicas gráficas no se evalúa la habilidad artística." },
    { t: "En una evaluación clínica, tenés derecho a una devolución comprensible.", r: "b", e: "Verdad. La entrevista de devolución es parte del proceso." },
    { t: "Estar nervioso arruina la evaluación.", r: "a", e: "Mito. Los nervios son esperables, y el profesional los tiene en cuenta al interpretar." },
    { t: "Las técnicas psicométricas comparan tus resultados con los de una población de referencia.", r: "b", e: "Verdad. Para eso se usan los baremos." },
    { t: "Lo que digas en la evaluación puede contarse libremente a cualquiera.", r: "a", e: "Mito. Está protegido por el secreto profesional, con los límites que fija la ley." }
  ]);
  var ALMA = ["Razón", "Ánimo (thymós)", "Deseo"];
  LAB.quiz("alma-tripartita-platon", [
    { t: "Sabe que tiene que rendir un examen, arma un plan de repasos y lo sigue.", ops: ALMA, r: 0, e: "Planificar y buscar lo conveniente: la parte racional, el auriga." },
    { t: "Se indigna ante una injusticia en el trabajo y quiere decir algo ya.", ops: ALMA, r: 1, e: "La indignación y el coraje son del ánimo, el caballo noble." },
    { t: "A las tres de la mañana siente ganas de comerse el postre.", ops: ALMA, r: 2, e: "Un apetito: el caballo que tira para su lado." },
    { t: "Antes de contestar un mensaje enojado, se pregunta qué le conviene de verdad.", ops: ALMA, r: 0, e: "Detenerse a evaluar es función de la razón." },
    { t: "Siente el orgullo herido cuando lo critican delante de otros.", ops: ALMA, r: 1, e: "El honor y el orgullo se asocian con el thymós." },
    { t: "Tiene sed después de caminar y quiere agua.", ops: ALMA, r: 2, e: "Un apetito corporal, es decir, el deseo." }
  ]);
  var W_PRES = ["Solo está presente", "La atención lo toma"];
  LAB.quiz("apercepcion-wundt", [
    { t: "Mientras leés, el ruido del tránsito suena de fondo y no registrás nada de él.", r: "a", e: "Está en el campo de la conciencia, pero la atención no lo toma." },
    { t: "De pronto decidís seguir la conversación de la mesa de al lado y entender lo que dicen.", r: "b", e: "La atención lo toma y lo organiza: es apercepción." },
    { t: "Comparás dos sonidos con cuidado para decidir cuál es más agudo.", r: "b", e: "Una atención activa que organiza lo percibido." },
    { t: "En el borde de tu campo visual hay colores que no mirás directamente.", r: "a", e: "Están presentes, pero no en el foco de la atención." },
    { t: "Te concentrás en cómo se siente el contacto de la silla con la espalda.", r: "b", e: "Antes estaba presente; ahora la atención lo toma." }
  ]);
  var W_DOS = ["Se estudia en el laboratorio", "Se estudia a través de la cultura"];
  LAB.quiz("dos-psicologias-wundt", [
    { t: "Cuánto tarda alguien en apretar un botón al oír un sonido.", ops: W_DOS, r: 0, e: "Un proceso simple, medible con aparatos." },
    { t: "El origen y la evolución del lenguaje.", ops: W_DOS, r: 1, e: "Wundt lo estudió en la Psicología de los pueblos." },
    { t: "Los mitos de una comunidad.", ops: W_DOS, r: 1, e: "Los mitos son parte de la psicología de los pueblos." },
    { t: "Qué intensidad tiene una luz para un observador.", ops: W_DOS, r: 0, e: "Una sensación simple, estudiable con un estímulo controlado." },
    { t: "Las costumbres y el arte de un pueblo.", ops: W_DOS, r: 1, e: "Procesos superiores que se entienden por la cultura." },
    { t: "Cómo cambia el tiempo de reacción según la tarea.", ops: W_DOS, r: 0, e: "Una medida de laboratorio." }
  ]);
  var IM8 = ["Lingüística", "Lógico-matemática", "Espacial", "Musical", "Corporal-cinestésica", "Interpersonal", "Intrapersonal", "Naturalista"];
  LAB.quiz("ocho-inteligencias-gardner", [
    { t: "Escribir un cuento que emociona a quien lo lee.", ops: IM8, r: 0, e: "Manejo de las palabras." },
    { t: "Encontrar el patrón en una serie de números.", ops: IM8, r: 1, e: "Razonamiento y patrones." },
    { t: "Imaginar cómo quedaría un mueble en un cuarto antes de comprarlo.", ops: IM8, r: 2, e: "Pensar en imágenes y en el espacio." },
    { t: "Escuchar una canción y reconocer cuándo una nota desafina.", ops: IM8, r: 3, e: "Percibir tonos y melodías." },
    { t: "Bailar siguiendo un ritmo con precisión.", ops: IM8, r: 4, e: "Usar el cuerpo con habilidad." },
    { t: "Notar que un amigo está mal aunque diga que no.", ops: IM8, r: 5, e: "Comprender a los demás." },
    { t: "Reconocer qué te motiva y qué límites tenés.", ops: IM8, r: 6, e: "Conocerse a uno mismo." },
    { t: "Identificar especies de aves por su canto y su forma.", ops: IM8, r: 7, e: "Reconocer y clasificar elementos de la naturaleza." }
  ]);
  LAB.quiz("mitos-inteligencias", [
    { t: "Gardner publicó su teoría en 1983 y, con el tiempo, su lista llegó a ocho inteligencias.", r: "b", e: "Verdad. Las ocho son las que se mencionan habitualmente." },
    { t: "La teoría de las inteligencias múltiples está comprobada empíricamente.", r: "a", e: "Mito. Tiene poco respaldo empírico y es muy criticada." },
    { t: "Enseñar a cada alumno según su estilo de aprendizaje (visual, auditivo, kinestésico) mejora el aprendizaje.", r: "a", e: "Mito. Las revisiones no encontraron evidencia sólida de eso." },
    { t: "Gardner aclaró que las inteligencias múltiples no son estilos de aprendizaje.", r: "b", e: "Verdad. Son capacidades en distintos dominios, no maneras de aprender." },
    { t: "Un cuestionario online puede decirte qué tipo de inteligencia tenés.", r: "a", e: "Mito. Esos cuestionarios no están validados para eso." },
    { t: "Reconocer talentos variados en los alumnos es un aporte valioso de la teoría.", r: "b", e: "Verdad. Es su aporte más reconocido, aun con las críticas." },
    { t: "Las capacidades cognitivas suelen estar relacionadas entre sí.", r: "b", e: "Verdad. Es uno de los hallazgos que dificulta pensarlas como independientes." }
  ]);
  var VIA = ["Eclecticismo técnico", "Integración teórica", "Factores comunes", "Integración asimilativa"];
  LAB.quiz("vias-integracion", [
    { t: "Un terapeuta elige, para cada problema, la técnica con mejor respaldo, sin importar de qué escuela venga.", ops: VIA, r: 0, e: "Elegir técnicas según la evidencia, sin una teoría que las una." },
    { t: "Un equipo construye un marco nuevo que articula dos teorías a nivel conceptual.", ops: VIA, r: 1, e: "Combinar teorías en un marco unificado." },
    { t: "Un profesional prioriza construir una buena alianza, dar esperanza y mostrar empatía, que se dan en todas las terapias.", ops: VIA, r: 2, e: "Trabajar sobre los ingredientes compartidos." },
    { t: "Una terapeuta trabaja desde su enfoque de base y suma con criterio una técnica de regulación de otro enfoque.", ops: VIA, r: 3, e: "Asimilar técnicas de otros desde un eje propio." },
    { t: "Alguien usa un poco de cada cosa según el día, sin eje ni criterio.", ops: VIA.concat(["Ninguna: es mezclar sin criterio"]), r: 4, e: "Eso no es integrar: falta eje teórico y criterio clínico." }
  ]);
  var ETA = ["Precontemplación", "Contemplación", "Preparación", "Acción", "Mantenimiento"];
  LAB.quiz("etapas-cambio-prochaska", [
    { t: "Dice que no tiene problema con el alcohol y que su familia exagera.", ops: ETA, r: 0, e: "No considera un cambio." },
    { t: "Sabe que fumar le hace mal, piensa en dejarlo, pero cada vez se convence de que todavía no es momento.", ops: ETA, r: 1, e: "Ambivalencia: ve razones a favor y en contra." },
    { t: "Eligió una fecha, pidió un turno y avisó en su casa que va a empezar.", ops: ETA, r: 2, e: "Decisión y planificación." },
    { t: "Hace tres semanas que dejó el cigarrillo y cambió sus rutinas.", ops: ETA, r: 3, e: "Cambios visibles en la conducta y el entorno." },
    { t: "Hace un año que sostiene el cambio y se prepara para las situaciones de riesgo.", ops: ETA, r: 4, e: "Sostener el cambio y prevenir recaídas." },
    { t: "Tuvo una recaída y se pregunta qué aprender para la próxima vez.", ops: ETA, r: 4, e: "En el modelo, las recaídas son parte del proceso de mantenimiento." }
  ]);
  LAB.quiz("naturaleza-mitos", [
    { t: "Estar en la naturaleza cura la depresión.", r: "a", e: "Los estudios sugieren beneficios sobre la rumiación y el ánimo, sobre todo a corto plazo y en personas sanas (Bratman y colaboradores, 2015). No curan trastornos ni reemplazan un tratamiento." },
    { t: "Ver un paisaje desde la ventana se asoció con una recuperación más rápida en pacientes operados.", r: "b", e: "Es lo que encontró Ulrich en 1984, con registros de un hospital. Como no fue un ensayo al azar, hay que tomarlo como una pista." },
    { t: "Hay una dosis comprobada de 120 minutos semanales de naturaleza que todos deberían cumplir.", r: "a", e: "White y colaboradores (2019) encontraron esa asociación en una encuesta de casi 20.000 personas, pero es un estudio observacional y los propios autores advierten que no es un umbral ni una indicación." },
    { t: "Según la teoría de los Kaplan, la naturaleza ayuda a que descanse la atención que exige esfuerzo.", r: "b", e: "Es la teoría de la restauración de la atención (1989). Una revisión de 2016 (Ohly y colaboradores) le encontró apoyo en algunas medidas de atención y no en otras." },
    { t: "La biofilia es un hecho demostrado de nuestra biología.", r: "a", e: "Wilson la propuso en 1984 como hipótesis. Kellert y Wilson reunieron en 1993 ensayos a favor y en contra. Sigue siendo debatida y difícil de probar." },
    { t: "El «trastorno por déficit de naturaleza» es un diagnóstico clínico.", r: "a", e: "Richard Louv popularizó la expresión en 2005 y él mismo aclaró que no es un diagnóstico médico. No figura en los manuales clínicos." },
    { t: "La jardinería se asoció con menos síntomas de depresión y ansiedad en un metaanálisis.", r: "b", e: "Soga, Gaston y Yamaura (2017) reunieron 22 estudios y encontraron esa asociación. Detectaron sesgo de publicación, aunque el efecto se sostuvo al corregirlo." },
    { t: "Ver u oír pájaros en la vida diaria se asoció con mejor bienestar momentáneo.", r: "b", e: "Hammoud y colaboradores (2022) lo encontraron con una aplicación de celular en 1.292 personas. La muestra era autoseleccionada: es una asociación, no una prueba de causa." },
    { t: "Tener un animal de compañía mejora la salud mental de cualquier persona.", r: "a", e: "Herzog (2011) sostuvo que el «efecto mascota» general es todavía una hipótesis. Brooks y colaboradoras (2018) encontraron beneficios para algunas personas y también la carga del cuidado y el dolor de la pérdida." },
    { t: "Los experimentos de Harlow mostraron que las crías buscaban consuelo además de comida.", r: "b", e: "Las crías de macaco preferían la madre de tela a la de alambre que daba leche, sobre todo ante la amenaza (1958). Hoy esos métodos no serían éticamente aceptables." },
    { t: "Llorar la muerte de un animal es exagerado.", r: "a", e: "El duelo por un animal puede ser profundo. Kenneth Doka llamó duelo no reconocido a las pérdidas que el entorno no habilita a llorar." },
    { t: "Duelo ecológico, solastalgia y ecoansiedad son lo mismo.", r: "a", e: "El duelo ecológico mira lo perdido (Cunsolo y Ellis, 2018); la solastalgia, el cambio del propio lugar mientras uno sigue ahí (Albrecht y colaboradores, 2007); la ecoansiedad, la preocupación por el futuro. Ninguno es un diagnóstico." },
    { t: "Preocuparse por el clima siempre es un síntoma.", r: "a", e: "Clayton (2020) señala que puede ser una respuesta proporcionada a una amenaza real. Conviene consultar cuando paraliza o afecta el sueño, el trabajo o los vínculos." },
    { t: "La esperanza que reconoce la gravedad del problema se asoció con más acción ambiental que la esperanza basada en la negación.", r: "b", e: "Es lo que encontró Maria Ojala (2012) en jóvenes: la esperanza constructiva se asoció con más conducta proambiental." }
  ]);
  LAB.quiz("separacion-mitos", [
    { t: "Si estoy en desacuerdo con la cuota alimentaria, no me queda más que aceptarla.", r: "a", e: "En general existen vías legales para pedir que se revise, sobre todo si cambian las circunstancias. Cómo y cuándo depende de cada caso y lo orienta un abogado o abogada. Lo que depende de vos es usar esos canales y no otros." },
    { t: "Perdonar significa reconciliarse.", r: "a", e: "Worthington distingue las dos cosas: el perdón depende de uno; la reconciliación, de los dos. Se puede perdonar sin volver a confiar, y sin dejar de reclamar lo que corresponde." },
    { t: "La culpa a veces informa algo, y a veces sólo castiga.", r: "b", e: "La culpa por un acto concreto puede llevar a reparar. Cuando se vuelve un juicio sobre uno mismo («soy malo»), Tangney y Dearing la describen como vergüenza, que suele llevar a esconderse más que a reparar." },
    { t: "Sentir bronca durante una separación quiere decir que algo anda mal en mí.", r: "a", e: "El enojo es una respuesta esperable ante lo que se vive como un agravio (Lazarus, 1991). La dificultad aparece cuando decide por uno lo que se hace o se dice." },
    { t: "Extrañar una casa o unos animales es un duelo menor que no debería doler tanto.", r: "a", e: "Pauline Boss describió cómo las pérdidas sin cierre ni reconocimiento social pueden doler mucho y prolongarse. El tamaño de un duelo no lo fija una regla externa." },
    { t: "Que los hijos queden en medio del conflicto entre los padres suele afectarlos.", r: "b", e: "La investigación sobre divorcio, como la de Robert Emery, señala el conflicto entre los padres, sobre todo cuando los hijos quedan en el medio, como uno de los riesgos más estudiados para ellos." },
    { t: "En la terapia de aceptación y compromiso, aceptar el malestar es resignarse.", r: "a", e: "Aceptar, en ACT, es dejar de pelear con lo que se siente para poder actuar según lo que importa. No implica dejar de reclamar ni de cambiar lo que se puede cambiar." }
  ]);
  LAB.quiz("conflicto-mitos", [
    { t: "Si no respondo nunca, el conflicto se apaga.", r: "a", e: "Depende. A veces el silencio total hace que la otra parte escale para obtener una respuesta, y hay temas (los chicos, los horarios) que necesitan contestación. Por eso se recomiendan respuestas breves y concretas, sin entrar en la pelea." },
    { t: "Si hay violencia, lo mejor es confrontar para que se termine.", r: "a", e: "La seguridad va primero. Confrontar en el momento puede aumentar el riesgo. Lo prudente es alejarse, pedir ayuda (911 si hay peligro) y canalizar el reclamo por la vía legal, con un abogado o abogada." },
    { t: "Documentar lo que pasa puede ayudar en un proceso legal.", r: "b", e: "Un registro con fechas, hechos, testigos y mensajes originales puede ser útil. Qué sirve como prueba y cómo presentarla lo orienta tu abogado o abogada." },
    { t: "Los hijos tienen que ver el conflicto para que entiendan lo que pasa.", r: "a", e: "La investigación sobre divorcio, como la de Robert Emery, señala que quedar en medio del conflicto entre los padres es uno de los riesgos más estudiados para los hijos. Pueden recibir una explicación según su edad sin ser testigos ni mensajeros." },
    { t: "La violencia en la pareja puede venir de cualquiera de las partes.", r: "b", e: "Puede ejercerla una mujer o un varón, y puede sufrirla una mujer o un varón. Lo que la define es el uso del miedo, el daño o el control para imponerse, no el género de quien la ejerce." }
  ]);
  LAB.quiz("fortalezas-mitos", [
    { t: "Las fortalezas son rasgos fijos que no cambian.", r: "a", e: "Peterson y Seligman (2004) las definieron como relativamente estables, no inmutables: disposiciones que se pueden cultivar. Cuánto cambian con ejercicios es otra pregunta, y los efectos de las intervenciones fueron más modestos de lo que se anunció al principio (Mongrain y Anselmo-Matthews, 2012)." },
    { t: "Usar más una fortaleza siempre mejora la vida.", r: "a", e: "Depende del contexto y de la dosis. Grant y Schwartz (2011) propusieron que muchas cualidades positivas tienen un punto a partir del cual sus efectos se vuelven negativos. La bondad sin límites puede terminar en desgaste; la prudencia, en evitación." },
    { t: "Un test mide de forma definitiva cuáles son tus fortalezas.", r: "a", e: "Mito a medias. Hay cuestionarios publicados, como el VIA-IS, pero son autorreportes: registran cómo se describe una persona, no lo que hace. El test de este sitio, además, es de elaboración propia y no está validado. Sirve para pensar, no para medir." },
    { t: "Los análisis estadísticos confirman que las 24 fortalezas se agrupan en seis virtudes.", r: "a", e: "Las seis virtudes son una propuesta teórica basada en tradiciones culturales. Con más de un millón de respuestas, McGrath (2015) encontró que los datos se ordenan mejor en tres grandes factores. La clasificación sigue siendo útil como mapa, no como estructura demostrada." },
    { t: "La esperanza, la vitalidad, la gratitud, el amor y la curiosidad estuvieron entre las fortalezas más asociadas con la satisfacción vital.", r: "b", e: "Es lo que encontraron Park, Peterson y Seligman (2004) con más de cinco mil adultos que respondieron por internet. Es una correlación de autorreporte: no prueba que esas fortalezas causen la satisfacción." },
    { t: "Hacer actos de bondad se asoció con más bienestar en quien los hace.", r: "b", e: "Curry y colaboradores (2018) reunieron 27 estudios y encontraron ese efecto, de tamaño pequeño a mediano. Ayudar a otros hace bien, pero no es un tratamiento." }
  ]);
  LAB.quiz("terapias-corporales-mitos", [
    { t: "Reich explicó la coraza muscular con una energía orgónica comprobada.", r: "a", e: "Wilhelm Reich (1933) describió la coraza muscular como una defensa corporal, y ese es un aporte clínico. Su hipótesis posterior de una «energía orgónica» no tiene respaldo científico." },
    { t: "El cuerpo guarda los recuerdos traumáticos como un archivo que se abre con un masaje.", r: "a", e: "El cuerpo participa de la experiencia traumática, por ejemplo en la activación y en los patrones defensivos que describen Ogden, Minton y Pain (2006). Eso no significa que almacene recuerdos como un archivo que se pueda abrir tocándolo." },
    { t: "Hacer temblar el cuerpo libera el trauma, como propone el TRE.", r: "a", e: "La liberación por temblores neurogénicos es una hipótesis de David Berceli, sin consenso sobre su mecanismo. Los estudios disponibles son pequeños y exploratorios: no permiten afirmar que el temblor trate el trauma." },
    { t: "La sensación corporal puede dar información que todavía no tiene palabras.", r: "b", e: "Verdad, con cautela. Eugene Gendlin (1978) la llamó sensación sentida (felt sense) y creó el focusing para escucharla. Es una de las líneas del campo con investigación propia, aunque no todo lo que se siente es una verdad sobre uno." },
    { t: "El método Feldenkrais es una psicoterapia.", r: "a", e: "Moshe Feldenkrais (1972) propuso una práctica de movimiento y aprendizaje, sin interpretar conflictos ni historia personal. Se usa como complemento; la revisión de Hillier y Worley (2015) encontró resultados prometedores con evidencia de calidad limitada." },
    { t: "Si hay trauma o desborde emocional, conviene trabajar con un profesional formado.", r: "b", e: "El trabajo corporal puede activar recuerdos y emociones intensas. Ogden y Fisher (2015) insisten en regular la activación y en poder pausar, algo que requiere formación específica." },
    { t: "Una buena terapia corporal puede prometer descargas o curaciones rápidas.", r: "a", e: "Una buena práctica no promete eso. Incluso en métodos más estudiados, como Feldenkrais, la revisión de Hillier y Worley (2015) pidió leer los resultados con cautela por el riesgo de sesgo de muchos estudios." }
  ]);
  LAB.quiz("focusing-mitos", [
    { t: "Para hacer focusing hay que seguir los seis pasos en un orden estricto.", r: "a", e: "Gendlin describió los seis pasos en Focusing (1978), pero los presentaba como un andamiaje: se usan mientras ayudan, y se pueden saltear o repetir." },
    { t: "La sensación sentida es lo mismo que una emoción.", r: "a", e: "Es más amplia y más difusa: la impresión corporal de toda una situación, todavía sin palabras. Una emoción precisa, como el miedo o la bronca, puede ser parte de ella." },
    { t: "Gendlin desarrolló el focusing a partir de investigar qué pasaba en las terapias que producían cambios.", r: "b", e: "Gendlin trabajó con Carl Rogers y estudió las sesiones de psicoterapia. Observó que el cambio se asociaba con la manera en que las personas se referían a lo que sentían, y de ahí salió el focusing." },
    { t: "Si no aparece ninguna sensación, el ejercicio fracasó.", r: "a", e: "Muchas veces la sensación tarda en formarse, o aparece apenas. Notar que no aparece nada también es una experiencia, y se puede volver a intentar otro día." },
    { t: "Existe una escala para estudiar cuánto se refiere una persona a su experiencia sentida.", r: "b", e: "Es la Escala de Experiencing, desarrollada por Klein, Gendlin y colaboradores. Se usó para investigar los procesos de cambio en la psicoterapia (Hendricks, 2002)." },
    { t: "El focusing reemplaza el tratamiento de un trauma.", r: "a", e: "Puede ser un recurso dentro de una terapia, pero escuchar una sensación ligada a un trauma puede desbordar. En ese caso conviene trabajar con un profesional formado." }
  ]);
  LAB.quiz("tono-mitos", [
    { t: "La teoría polivagal es un hecho establecido de la neurofisiología.", r: "a", e: "Stephen Porges la propuso en 1995 y se usa mucho en psicoterapias corporales y del trauma. Su base neurofisiológica está fuertemente cuestionada: Grossman (2023) sostiene que sus cinco premisas básicas son insostenibles o muy improbables. El debate sigue abierto." },
    { t: "El EMDR tiene respaldo en guías de tratamiento para el estrés postraumático.", r: "b", e: "La Organización Mundial de la Salud (2013) lo recomienda, junto con la terapia cognitivo-conductual centrada en el trauma, para el TEPT en adultos. Se hace con un terapeuta formado." },
    { t: "En el EMDR, el movimiento de los ojos es lo único que produce el efecto.", r: "a", e: "Lee y Cuijpers (2013) encontraron un efecto adicional moderado de los movimientos oculares, pero advirtieron que la calidad de los estudios no era óptima. Un metaanálisis de 2020 no pudo confirmarlo. Si el movimiento ocular es un ingrediente activo sigue en discusión, aunque el tratamiento completo tiene respaldo." },
    { t: "La técnica Alexander se probó en un ensayo grande en dolor de espalda.", r: "b", e: "Little y colaboradores (2008) estudiaron a 579 pacientes con dolor de espalda crónico o recurrente, de 64 consultorios de Inglaterra. Seis lecciones seguidas de ejercicio fueron casi tan eficaces como 24 lecciones." },
    { t: "La eutonía es una psicoterapia.", r: "a", e: "Es una educación corporal: trabaja el tono, el contacto y la conciencia de la piel y del apoyo. No hay ensayos controlados conocidos; su respaldo es pedagógico y de práctica." },
    { t: "Gerda Alexander, creadora de la eutonía, y F. M. Alexander, de la técnica Alexander, eran parientes.", r: "a", e: "No tenían parentesco. Comparten el apellido y el interés por el cuerpo, pero son dos propuestas distintas: Gerda Alexander (1908-1994) era una docente alemana-danesa de rítmica; F. M. Alexander (1869-1955), un actor australiano." },
    { t: "La psicomotricidad nació en la medicina francesa a comienzos del siglo XX.", r: "b", e: "El neurólogo Ernest Dupré introdujo el término en el discurso médico en 1905, según Calmels (2003), al estudiar las relaciones entre motricidad y psiquismo." }
  ]);
  LAB.quiz("espiritualidad-mitos", [
    { t: "Espiritualidad y religión son lo mismo.", r: "a", e: "Se superponen, pero no son idénticas: hay quienes viven la espiritualidad dentro de una religión, otros por fuera y otros no la viven. La psicología de la religión estudia estas formas sin jerarquizarlas." },
    { t: "Toda experiencia mística es un síntoma.", r: "a", e: "William James (1902) las describió como experiencias humanas con rasgos propios. Una categoría como «Problema religioso o espiritual» (V62.89 del DSM-IV) no es un trastorno: es un motivo de atención clínica." },
    { t: "Toda experiencia extraordinaria es evolución espiritual.", r: "a", e: "No necesariamente. Ante una experiencia que desorganiza conviene descartar episodios maníacos, psicóticos o disociativos, y causas médicas o por sustancias." },
    { t: "El afrontamiento religioso puede ayudar o pesar.", r: "b", e: "Pargament y colaboradores (1998) distinguieron un afrontamiento positivo y uno negativo, y cada uno se asoció de forma distinta con la salud y la adaptación." },
    { t: "En estudios rigurosos predominó una relación inversa entre religiosidad o espiritualidad y depresión.", r: "b", e: "Bonelli y colaboradores (2012) encontraron esa relación en 119 de los 178 estudios más rigurosos (67 %). Los autores advierten que no está resuelto si para cada persona funciona como recurso o como carga." },
    { t: "Fowler propuso que todas las personas llegan a la sexta etapa de la fe.", r: "a", e: "James Fowler (1981) describió seis etapas, pero no todos las atraviesan todas, y las edades son aproximadas. Tampoco son un ranking de personas." },
    { t: "Usar la meditación para no sentir nunca bronca o tristeza es lo que Welwood llamó bypass espiritual.", r: "b", e: "John Welwood acuñó el término en 1984 para describir el uso de ideas y prácticas espirituales para esquivar asuntos emocionales y personales pendientes." },
    { t: "Las constelaciones familiares demostraron que los representantes perciben lo que sienten personas que no conocen.", r: "a", e: "No hay respaldo científico para esa idea. Un ensayo de Weinhold y colaboradores (2013) encontró mejoras con seminarios conducidos por psicoterapeutas formados, lo que no prueba el mecanismo que propuso Hellinger." },
    { t: "En un ensayo publicado en 2021, la psilocibina no fue mejor que un antidepresivo en el resultado principal.", r: "b", e: "Carhart-Harris y colaboradores compararon psilocibina con escitalopram en depresión, ambos con apoyo psicoterapéutico, y no hubo diferencia en la medida principal. La investigación es prometedora pero más modesta de lo que se difunde." }
  ]);
  LAB.quiz("corporal-mitos", [
    { t: "Wilhelm Reich describió la coraza muscular como una defensa frente a ciertas emociones.", r: "b", e: "Es su aporte clínico en Análisis del carácter (1933): tensiones crónicas que protegen de sentir y limitan la respiración." },
    { t: "La energía orgónica de Reich es un hallazgo comprobado.", r: "a", e: "Fue una hipótesis posterior de Reich que no tiene respaldo científico. Conviene separarla de su aporte sobre la defensa corporal." },
    { t: "En la bioenergética de Alexander Lowen, el apoyo en los pies tiene un lugar central.", r: "b", e: "Lowen (Bioenergetics, 1975) trabaja con la respiración, la expresión emocional y el arraigo o apoyo en el suelo (grounding)." },
    { t: "La sensación sentida de Gendlin es una emoción ya definida, como el miedo o la bronca.", r: "a", e: "Gendlin (Focusing, 1978) la describió como una impresión corporal global de una situación, todavía sin palabras. Una emoción puede ser parte de ella." },
    { t: "Aflojar una tensión muscular libera siempre un recuerdo traumático guardado ahí.", r: "a", e: "El cuerpo participa de la experiencia emocional, pero no guarda recuerdos como un archivo que se abre al tocarlo." },
    { t: "Si una práctica corporal te desborda, conviene parar y volver al apoyo y a lo que te rodea.", r: "b", e: "Trabajar con el cuerpo puede movilizar emociones fuertes. Detenerse es parte del trabajo, y si se repite, conviene hacerlo con un profesional formado." }
  ]);
  LAB.quiz("transpersonal-mitos", [
    { t: "Stanislav y Christina Grof llamaron emergencia espiritual a una crisis en la que el crecimiento se vuelve caótico y abrumador.", r: "b", e: "Es la idea central de Spiritual Emergency (1989), una compilación que editaron con aportes de varios autores." },
    { t: "El DSM-IV incluyó el «problema religioso o espiritual» como un trastorno mental.", r: "a", e: "Desde 1994 es un motivo de atención clínica, no un trastorno. Lo propusieron Lukoff, Lu y Turner (1992)." },
    { t: "Toda experiencia extraordinaria es una señal de evolución espiritual.", r: "a", e: "No necesariamente. Conviene descartar episodios maníacos, psicóticos o disociativos y causas médicas o por sustancias, sin patologizar tampoco de entrada." },
    { t: "La respiración holotrópica es adecuada para cualquier persona.", r: "a", e: "Se desaconseja con embarazo, enfermedad cardiovascular, epilepsia o antecedentes de psicosis, trastorno bipolar o crisis de pánico, entre otros. Puede movilizar material intenso." },
    { t: "Para Assagioli, la desidentificación consiste en reconocer que tenés partes sin reducirte a ninguna de ellas.", r: "b", e: "Es uno de los ejercicios centrales de la psicosíntesis: «tengo emociones, pero no soy solo mis emociones»." },
    { t: "Usar ideas espirituales para no sentir el dolor o la bronca es una forma de crecimiento.", r: "a", e: "John Welwood llamó a eso bypass espiritual (1984): esquivar con lo espiritual asuntos emocionales pendientes." }
  ]);
  LAB.quiz("mejor-version-mitos", [
    { t: "Tu mejor versión es la que nunca se equivoca.", r: "a", e: "No. Una mejor versión es una dirección más fiel a lo que te importa, con errores incluidos. Pensarla como una versión sin fallas es la puerta al perfeccionismo." },
    { t: "Escribir sobre tu mejor yo posible se asoció con más bienestar.", r: "b", e: "King (2001) lo halló en estudiantes. La revisión de Carrillo y colaboradores (2019) mostró efectos pequeños a moderados: ayuda, pero no transforma la vida." },
    { t: "El perfeccionismo socialmente prescrito aumentó entre 1989 y 2016.", r: "b", e: "Curran y Hill (2019) encontraron un aumento del 33 % en estudiantes universitarios de Estados Unidos, Canadá y Reino Unido. El mecanismo cultural no fue probado." },
    { t: "Un valor se cumple y se tacha como una meta.", r: "a", e: "En ACT (Hayes, Strosahl y Wilson, 1999), un valor es una dirección que nunca se cumple del todo, como ir hacia el oeste. Las metas sí se alcanzan y se tachan." },
    { t: "Ser más exigente con uno mismo es el mejor camino para mejorar.", r: "a", e: "Neff (2003) propuso la autocompasión, es decir, amabilidad con uno mismo ante el error, como una actitud sana hacia uno mismo, sin que exigirse más sea el camino." },
    { t: "Los yo posibles incluyen también el yo que tememos ser.", r: "b", e: "Markus y Nurius (1986) los describieron como versiones imaginadas que expresan esperanzas y también miedos." },
    { t: "La distancia con el «debería» se asocia con ansiedad.", r: "b", e: "Higgins (1987) la asoció con agitación y ansiedad; la distancia con el ideal, con desánimo y tristeza." }
  ]);
  LAB.quiz("afrontamiento-mitos", [
    { t: "Hay una estrategia de afrontamiento que sirve para todo.", r: "a", e: "Bonanno y Burton (2013) criticaron esa idea, la «falacia de la eficacia uniforme». Lo que ayuda depende de la situación, y por eso proponen la flexibilidad." },
    { t: "Cuando algo no se puede cambiar, regular lo que sentís también es afrontar.", r: "b", e: "Lazarus y Folkman (1984) distinguieron el afrontamiento centrado en el problema del centrado en la emoción. Los dos son necesarios, y el segundo cobra peso cuando la situación no se puede cambiar." },
    { t: "Rumiar un problema ayuda a resolverlo.", r: "a", e: "En el metaanálisis de Aldao, Nolen-Hoeksema y Schweizer (2010), la rumiación se asoció con más síntomas. Es una asociación, no una causa, y según Bonanno y Burton depende del contexto." },
    { t: "El alcohol alivia al principio y suele empeorar las cosas después.", r: "b", e: "Es una de las trampas frecuentes del afrontamiento: tapar con sustancias da un alivio rápido y suele costar más adelante." },
    { t: "Evitar todo lo que te angustia es la forma más segura de cuidarte.", r: "a", e: "Evitar alivia en el momento, pero en la investigación de Aldao y colaboradores (2010) se asoció con más síntomas. Conviene mirar qué te cuesta después." },
    { t: "Darte cuenta de si una estrategia funciona y cambiarla es parte de afrontar bien.", r: "b", e: "Es el tercer componente de la flexibilidad según Bonanno y Burton (2013): la respuesta a la retroalimentación." },
    { t: "El estrés depende solo de lo que pasa, no de cómo lo evaluamos.", r: "a", e: "Para Lazarus y Folkman (1984), el estrés depende de la evaluación que hace la persona: qué está en juego y qué recursos cree tener." }
  ]);
  LAB.quiz("ikigai-mitos", [
    { t: "El diagrama de los cuatro círculos es el concepto japonés original de ikigai.", r: "a", e: "No: viene del diagrama del propósito del astrólogo español Andrés Zuzunaga, y Marc Winn lo rebautizó «ikigai» en un blog de 2014. Sirve para reflexionar, pero no representa el concepto japonés." },
    { t: "En Japón, el ikigai suele estar en lo cotidiano: vínculos, roles y pequeñas alegrías.", r: "b", e: "Así lo entiende la tradición que popularizó Mieko Kamiya: lo que hace que la vida valga la pena, no necesariamente una gran misión." },
    { t: "Tu ikigai tiene que ser tu trabajo.", r: "a", e: "No necesariamente. Puede estar en el trabajo, pero también en la familia, la comunidad o una actividad por gusto." },
    { t: "Mieko Kamiya popularizó el concepto a partir de su trabajo con pacientes en un sanatorio.", r: "b", e: "En Ikigai ni tsuite (1966) partió de su experiencia con pacientes con lepra en Nagashima Aiseien, donde notó en muchos una sensación de falta de sentido." },
    { t: "Un estudio con 43.391 adultos japoneses (Ohsaki) demostró que tener ikigai alarga la vida.", r: "a", e: "Sone y colaboradores (2008) hallaron que quienes dijeron no tener ikigai tuvieron un riesgo de muerte 1,5 veces mayor, pero es una asociación medida con una sola pregunta, no una prueba de causa." },
    { t: "Sin una gran misión, no se puede tener ikigai.", r: "a", e: "Es justo lo contrario de lo que sugiere el concepto: las pequeñas cosas que dan vida cuentan, y pueden cambiar a lo largo de las etapas." }
  ]);
  LAB.quiz("fobias-mitos", [
    { t: "Evitar lo que te da miedo es la mejor manera de superarlo.", r: "a", e: "Evitar alivia enseguida, pero mantiene el miedo: nunca comprobás que podías tolerarlo. La exposición gradual es lo que tiene respaldo." },
    { t: "La exposición es un tratamiento con respaldo para las fobias específicas.", r: "b", e: "En el metaanálisis de Wolitzky-Taylor y colaboradores (2008), con 33 ensayos aleatorizados, la exposición tuvo efectos grandes frente a no tratar y superó al placebo y a otras psicoterapias." },
    { t: "La exposición consiste en enfrentar de golpe lo que más miedo da.", r: "a", e: "Suele hacerse de forma gradual y voluntaria, con una jerarquía de situaciones de menor a mayor, empezando por la que menos miedo da." },
    { t: "Una sola sesión intensiva de exposición, con un terapeuta, puede ayudar en algunas fobias.", r: "b", e: "Öst (1989) describió un tratamiento de una sesión intensiva de exposición para fobias específicas." },
    { t: "Tener una fobia significa ser débil o exagerado.", r: "a", e: "Es una forma de ansiedad frecuente que no depende de la voluntad ni del carácter, y tiene tratamiento." },
    { t: "En la fobia a la sangre conviene consultar antes de practicar, porque puede producir desmayo.", r: "b", e: "A diferencia de otras fobias, puede bajar la presión y provocar un desmayo. Conviene consultar a un profesional antes de exponerte." },
    { t: "Si la ansiedad sube durante la práctica, hay que irse enseguida.", r: "a", e: "Irse en el pico alivia pero refuerza la evitación. La ansiedad sube, llega a un máximo y baja; quedarse un rato más ayuda a aprenderlo, siempre dentro de lo tolerable." }
  ]);
  LAB.quiz("decisiones-mitos", [
    { t: "Buscar siempre la mejor opción posible hace que quedes más conforme con lo que elegís.", r: "a", e: "Schwartz y colaboradores (2002) encontraron lo contrario: quienes maximizan informaron más arrepentimiento y menos satisfacción que quienes eligen una opción suficientemente buena." },
    { t: "Tener muchas opciones siempre paraliza.", r: "a", e: "Un metaanálisis de Scheibehenne, Greifeneder y Todd (2010) encontró que, en promedio, el efecto de la sobrecarga de opciones fue cercano a cero, con mucha variación según las condiciones." },
    { t: "Pensamos de dos maneras: una rápida e intuitiva y otra lenta y deliberada.", r: "b", e: "Es la distinción que Daniel Kahneman difundió en Pensar rápido, pensar despacio (2011). Las dos son útiles, según el tipo de decisión." },
    { t: "Para decidir bien hace falta tener toda la información.", r: "a", e: "Casi nunca se tiene toda. Alcanza con información suficiente para el tipo de decisión, sobre todo si es reversible y se puede revisar." },
    { t: "Tus valores pueden servir como criterio cuando las opciones parecen empatadas.", r: "b", e: "La terapia de aceptación y compromiso propone usar los valores como dirección: preguntarte qué opción te acerca a lo que te importa." },
    { t: "Si una decisión sale mal, significa que la decidiste mal.", r: "a", e: "Una buena decisión puede tener un mal resultado por factores que no dependían de vos. Conviene evaluar cómo decidiste con lo que sabías en ese momento." }
  ]);
  LAB.quiz("pantallas-mitos", [
    { t: "Está demostrado que el uso de tecnología es la causa principal del malestar adolescente.", r: "a", e: "Orben y Przybylski (2019) encontraron una asociación negativa pero chica: el uso de tecnología explicó como máximo el 0,4 % de la variación en el bienestar de más de 355.000 adolescentes." },
    { t: "Limitar las redes sociales durante unas semanas se asoció con menos soledad en un experimento.", r: "b", e: "Hunt y colaboradores (2018): estudiantes que limitaron las redes a unos 30 minutos por día durante tres semanas informaron menos soledad y depresión que el grupo control." },
    { t: "El debate sobre redes y salud mental adolescente está cerrado.", r: "a", e: "Jonathan Haidt (2024) sostiene que los smartphones causaron un aumento de problemas en adolescentes; Candice Odgers (2024), en Nature, objetó que confunde correlación con causa. Sigue abierto." },
    { t: "Importa más cómo y para qué usás las pantallas que solo la cantidad de horas.", r: "b", e: "La comparación, lo que se desplaza (sueño, movimiento, encuentros) y el para qué suelen decir más que el número de horas." },
    { t: "Usar el celular antes de dormir no tiene ninguna relación con el descanso.", r: "a", e: "Lo que se desplaza importa: el tiempo de pantalla nocturno puede quitarle tiempo al sueño. Más en el laboratorio de insomnio." },
    { t: "Notar tu uso sin culparte es un buen primer paso para cambiarlo.", r: "b", e: "La autoobservación sin juicio permite ver patrones. La culpa suele llevar a esconder el uso más que a cambiarlo." }
  ]);
  LAB.quiz("apuestas-mitos", [
    { t: "Si venís perdiendo, es más probable que la próxima apuesta salga ganadora.", r: "a", e: "En los juegos de azar cada resultado es independiente del anterior. «Perseguir» las pérdidas es justamente una de las señales del trastorno por juego." },
    { t: "El DSM-5 (2013) incluyó el juego como un trastorno adictivo, el primero sin sustancia.", r: "b", e: "Lo trasladó a la categoría de trastornos relacionados con sustancias y trastornos adictivos, como «trastorno por juego»." },
    { t: "Con suficiente análisis y experiencia se puede controlar el resultado de un juego de azar.", r: "a", e: "Es la ilusión de control: la sensación de influir en algo que depende del azar. La publicidad suele alimentarla." },
    { t: "Ganar de vez en cuando, sin saber cuándo, es lo que más hace que se siga jugando.", r: "b", e: "Es el refuerzo intermitente: los premios impredecibles mantienen la conducta más que los premios fijos." },
    { t: "Las encuestas sobre adolescentes y apuestas online miden adicción.", r: "a", e: "Miden uso (haber apostado o conocer a alguien que lo hizo), no adicción, y no son comparables entre sí." },
    { t: "Se puede tener un problema con el juego aunque no se apueste todos los días.", r: "b", e: "Lo que cuenta es la pérdida de control y el daño, como no poder dejar, mentir para ocultarlo o endeudarse, no solo la frecuencia." },
    { t: "Dar plata a un hijo para saldar una deuda de juego, sin hablar, resuelve el problema.", r: "a", e: "Alivia el momento pero deja intacto lo que sostiene el juego. Conviene hablar sin humillar, poner límites con los medios de pago y consultar." }
  ]);
  LAB.quiz("cuidar-mitos", [
    { t: "Quien cuida bien no se siente cansado ni enojado.", r: "a", e: "La sobrecarga, la culpa, el enojo y la ambivalencia son esperables y no hablan de cuidar mal." },
    { t: "Quienes cuidan muestran, en promedio, más estrés y depresión que quienes no cuidan.", r: "b", e: "Pinquart y Sörensen (2003), 84 artículos: la diferencia fue mayor en lo psicológico que en la salud física." },
    { t: "Pedir ayuda es una señal de que no se quiere a la persona.", r: "a", e: "Repartir tareas y aceptar ayuda hace sostenible el cuidado, y suele mejorar también la calidad de lo que se da." },
    { t: "Se puede sentir duelo por alguien que todavía está vivo.", r: "b", e: "Es el duelo anticipado: tristeza por lo que ya cambió o se va perdiendo. Es habitual y no es traición." },
    { t: "Descansar es egoísta cuando la otra persona te necesita.", r: "a", e: "Los descansos, aunque sean breves, permiten seguir cuidando sin enfermarte. Cuidarte es parte del cuidado." },
    { t: "El estudio de la «carga» del cuidador tiene su origen en trabajos como el de Zarit (1980).", r: "b", e: "Zarit, Reever y Bach-Peterson (1980) estudiaron los sentimientos de carga en familiares de adultos mayores con deterioro." }
  ]);
  LAB.quiz("act-mitos", [
    { t: "Para la ACT, el objetivo es que los pensamientos difíciles desaparezcan.", r: "a", e: "No hace falta que los pensamientos se vayan. La ACT propone hacerles lugar y, con eso a cuestas, moverte hacia lo que te importa." },
    { t: "La defusión no discute si un pensamiento es cierto: cambia la relación con él.", r: "b", e: "Cuando estamos fusionados con un pensamiento lo vivimos como una verdad. La defusión cambia esa relación." },
    { t: "Aceptar significa resignarse a cualquier sufrimiento.", r: "a", e: "Aceptar no significa tolerar situaciones de maltrato ni resignarse a un sufrimiento que tiene solución. Si algo te daña, la prioridad es cuidarte y pedir ayuda." },
    { t: "Los valores son direcciones que se viven, no metas que se cumplen.", r: "b", e: "Los valores no se «cumplen»: se viven. Por eso se trabajan con acciones pequeñas que vayan en esa dirección." },
    { t: "En la metáfora de la cuerda, hay que ganarle la pelea al monstruo.", r: "a", e: "Soltar la cuerda no es ganar: el monstruo sigue ahí, pero tus manos quedan libres para hacer otra cosa." },
    { t: "Hay que esperar a que se vaya el miedo para dar un paso hacia lo que te importa.", r: "a", e: "El ejercicio propone hacer una acción pequeña aunque aparezca el miedo, llevando esos pensamientos y emociones con vos." }
  ]);
  LAB.quiz("autocompasion-lab-mitos", [
    { t: "Tratarte con amabilidad te vuelve más vago y complaciente.", r: "a", e: "Según las investigaciones de Kristin Neff, la autocompasión no vuelve a las personas más vagas ni complacientes: se asocia con más motivación para mejorar y menos miedo al fracaso." },
    { t: "La autocompasión es tenerse lástima o conformarse con poco.", r: "a", e: "Es acortar la distancia entre cómo te hablás y cómo le hablarías a un amigo, sin tenerse lástima ni conformarse con poco." },
    { t: "Para Neff, la autocompasión reúne amabilidad con uno mismo, humanidad compartida y atención plena.", r: "b", e: "Por separado ayudan; cuando se superponen, aparece la autocompasión." },
    { t: "Pensar «a nadie más le pasa esto» es una muestra de humanidad compartida.", r: "a", e: "Es lo contrario: la humanidad compartida recuerda que equivocarse y sufrir es parte de la experiencia humana. No estás solo." },
    { t: "La autoestima que depende de ser siempre el mejor es frágil.", r: "b", e: "La que se apoya en tratarse bien es mucho más estable." },
    { t: "Si al tratarte con amabilidad aparece una tristeza vieja, el ejercicio salió mal.", r: "a", e: "No es que salga mal: es que algo se está aflojando. Si te pasa con intensidad, conviene trabajarlo acompañado." }
  ]);
  LAB.quiz("trauma-mitos", [
    { t: "Todo lo doloroso es trauma, y todas las personas que atraviesan algo terrible desarrollan síntomas.", r: "a", e: "No todo lo doloroso es trauma, y no todas las personas que atraviesan algo terrible desarrollan síntomas." },
    { t: "Para Judith Herman, las reacciones al trauma son respuestas comprensibles a situaciones anormales.", r: "b", e: "No son signos de debilidad. Entenderlas suele ser un primer alivio." },
    { t: "Si después de algo muy difícil seguís con reacciones intensas, es debilidad o exageración.", r: "a", e: "No es debilidad ni exageración: es una reacción que tiene tratamiento. Podés pedir ayuda cuando lo necesites." },
    { t: "Sin seguridad, no conviene avanzar sobre los recuerdos.", r: "b", e: "Para Herman, la seguridad es la etapa más importante de la recuperación y muchas veces es la más larga." },
    { t: "Las etapas de la recuperación se recorren en línea recta, sin volver atrás.", r: "a", e: "No son lineales: se vuelve a las anteriores muchas veces, cada vez con más recursos." },
    { t: "Estar siempre en guardia o sobresaltarse con facilidad puede ser una reacción al trauma.", r: "b", e: "El cuerpo sigue preparado para un peligro que ya no está. Es una de las familias de reacciones, y tiene tratamiento." }
  ]);
  LAB.quiz("regulacion-mitos", [
    { t: "Regularse es calmarse a fuerza de voluntad o respirar hondo hasta que se pase.", r: "a", e: "Es, en buena parte, aprender a reconocer las señales del cuerpo y acompañarlas de a poco, para que recupere la sensación de estar a salvo en el presente." },
    { t: "Daniel Siegel llamó ventana de tolerancia a la franja en la que podemos sentir sin desbordarnos.", r: "b", e: "Dentro de la ventana hay emoción, pero también podemos pensar y elegir." },
    { t: "Sentirse apagado, entumecido o desconectado es una forma de salirse de la ventana.", r: "b", e: "Es la hipoactivación, por debajo de la ventana. La hiperactivación, por encima, es sentirse acelerado." },
    { t: "En la pendulación conviene ir directo a la incomodidad más intensa.", r: "a", e: "Se elige una incomodidad leve, no la más intensa. Levine habla de titulación: acercarse de a gotas, y terminar siempre en el recurso." },
    { t: "Practicar cuando estás tranquilo hace más fácil usar los recursos cuando los necesitás.", r: "b", e: "Así, cuando salgas de la ventana, vas a tener a mano por dónde volver." },
    { t: "Los recursos son solo ejercicios del cuerpo.", r: "a", e: "Pat Ogden habla de recursos del cuerpo, de los vínculos, del entorno o internos: todo lo que te ayuda a volver a tu ventana." }
  ]);
  LAB.quiz("emociones-mitos", [
    { t: "Hay emociones buenas y emociones malas.", r: "a", e: "Las emociones no son buenas ni malas: son información. Hay formas de expresarlas que lastiman, pero ninguna emoción está prohibida." },
    { t: "Ponerle nombre a una emoción ya la vuelve un poco más manejable.", r: "b", e: "Por eso este laboratorio empieza por encontrar la palabra justa." },
    { t: "Según Ekman, hay un grupo de emociones básicas que se reconocen en culturas muy distintas.", r: "b", e: "De cada una se desprenden muchas emociones más finas, con sus matices." },
    { t: "El enojo solo sirve para lastimar.", r: "a", e: "Avisa que algo es injusto o que se cruzó un límite, y da energía para defenderse. Suele pedir poner un límite o ser escuchado." },
    { t: "Si la tristeza dura semanas y nada interesa, alcanza con esperar.", r: "a", e: "Puede ser depresión: vale la pena consultar." },
    { t: "Para Jung, las emociones son energía y una puerta para darse cuenta.", r: "b", e: "Mirarlas con curiosidad es una forma de acercarse a eso." }
  ]);
  LAB.quiz("meditacion-mitos", [
    { t: "Para meditar hace falta un almohadón especial, incienso y una hora libre.", r: "a", e: "Hace falta un lugar donde sentarte un rato y la disposición a darte cuenta de que te fuiste a otro lado, y volver." },
    { t: "Si te distraés, meditaste mal.", r: "a", e: "Darte cuenta de que te fuiste y volver es lo que entrena. No hay meditaciones «buenas» o «malas»: hay ratos de práctica." },
    { t: "Cinco minutos todos los días valen más que una hora una vez.", r: "b", e: "Corto y seguido: la regularidad pesa más que la duración." },
    { t: "Meditar es seguro para todas las personas en cualquier momento.", r: "a", e: "Es seguro para la mayoría, pero no para todas ni en cualquier momento. Si aparecen recuerdos traumáticos o mucha angustia, frená, abrí los ojos y volvé a algo concreto." },
    { t: "«Una palabra que calma» es lo mismo que la meditación trascendental.", r: "a", e: "Herbert Benson describió la respuesta de relajación. No es la meditación trascendental, que se enseña con un mantra asignado, sino una versión libre." },
    { t: "Ponerle una etiqueta breve a lo que aparece es una técnica de la vipassana.", r: "b", e: "Poner en palabras lo que sentimos, según la investigación, baja su intensidad." }
  ]);
  LAB.quiz("mindfulness-mitos", [
    { t: "Mindfulness es dejar la mente en blanco y estar siempre en paz.", r: "a", e: "Es algo más simple: darte cuenta de lo que estás haciendo mientras lo hacés." },
    { t: "Kabat-Zinn lo definió como prestar atención a propósito, en el momento presente y sin juzgar.", r: "b", e: "Por eso distraerte es parte de la práctica: volver es el ejercicio." },
    { t: "Distraerte arruina la práctica.", r: "a", e: "Distraerte es parte de la práctica. Volver es el ejercicio." },
    { t: "Un impulso crece como una ola, llega a un pico y, si no se actúa en seguida, vuelve a bajar.", r: "b", e: "Surfearlo es acompañarlo con la atención y la respiración, sin pelear ni obedecer." },
    { t: "Ante un impulso, solo se puede obedecerlo o pelearlo.", r: "a", e: "La práctica propone una tercera opción: acompañarlo como quien surfea una ola." },
    { t: "La atención plena es adecuada en cualquier momento, aun con trauma o depresión intensa.", r: "a", e: "No es para todos los momentos. Con trauma o una depresión intensa, conviene hacerlo acompañado." }
  ]);
  LAB.quiz("sentido-mitos", [
    { t: "Según Frankl, el sentido se inventa o se recibe hecho.", r: "a", e: "Para él, el sentido no se inventa ni se recibe hecho: se descubre en cada situación concreta." },
    { t: "Frankl describió tres vías del sentido: lo que damos, lo que recibimos y la actitud frente a lo que no podemos cambiar.", r: "b", e: "Son los valores de creación, de experiencia y de actitud." },
    { t: "Tomar una actitud frente a lo que no podés cambiar significa que «esté bien».", r: "a", e: "No se trata de que esté bien, sino de qué hacés vos con eso." },
    { t: "La pregunta invertida de Frankl es qué espera la vida de mí, y no qué espero yo de la vida.", r: "b", e: "Cambia el lugar desde donde mirás: de esperar que algo llegue a preguntarte a qué estás siendo llamado." },
    { t: "Si el dolor es muy reciente, conviene buscarle un sentido cuanto antes.", r: "a", e: "Quizás no sea el momento: primero está el tiempo de sentirlo." },
    { t: "La sensación de que nada tiene sentido puede ser parte de una depresión.", r: "b", e: "Si se sostiene en el tiempo o dejaste de disfrutar de casi todo, no es un problema de reflexión: es algo para consultar." }
  ]);
  LAB.quiz("valores-mitos", [
    { t: "Los valores son metas que se cumplen de una vez.", r: "a", e: "Son como una brújula: no un lugar al que se llega, sino una dirección que se elige cada día." },
    { t: "Hay valores mejores que otros.", r: "a", e: "No hay valores mejores que otros. Elegí lo que te importa, no lo que «debería» importarte." },
    { t: "A veces el malestar no viene de lo que nos pasa, sino de lo lejos que estamos de lo que valoramos.", r: "b", e: "Por eso este laboratorio parte de elegir y ordenar tus valores." },
    { t: "Para Frankl, lo que más nos sostiene es el sentido.", r: "b", e: "Sobrevivió a los campos de concentración y sostuvo que el sentido es lo que más nos sostiene." },
    { t: "Ver una distancia grande entre lo que valorás y la vida que llevás es un fracaso.", r: "a", e: "No es un fracaso: es información. Si duele, es un buen momento para conversarlo." },
    { t: "Las terapias de aceptación y compromiso trabajan los valores como una brújula.", r: "b", e: "Una dirección que se elige cada día, no un lugar al que se llega." }
  ]);
  LAB.quiz("alcohol-mitos", [
    { t: "Según la OMS, hay un nivel de consumo de alcohol totalmente seguro para la salud.", r: "a", e: "La OMS advirtió en 2023 que no hay un nivel totalmente seguro: el riesgo crece con la cantidad. Contar lo que tomás es un primer paso, sin juicio." },
    { t: "Lo único que importa para saber si el consumo es un problema es la cantidad.", r: "a", e: "Más que la cantidad, importa lo que el consumo hace en tu vida." },
    { t: "El AUDIT-C es un diagnóstico.", r: "a", e: "Son las tres primeras preguntas del AUDIT, de la OMS, y se usan para detectar un consumo de riesgo. No es un diagnóstico." },
    { t: "Si hoy no querés dejar de tomar, igual podés reducir los riesgos.", r: "b", e: "La reducción de daños es un enfoque de salud pública que acompaña a las personas donde están." },
    { t: "Las ganas de tomar suelen bajar en minutos si no se las alimenta.", r: "b", e: "Marlatt propuso tratarlas como una ola: sube, llega a un pico y baja. Si podés, esperá veinte minutos antes de decidir." },
    { t: "Si tomás mucho todos los días desde hace tiempo, dejar de golpe es siempre seguro.", r: "a", e: "Puede ser peligroso. Antes de dejar, consultá con un médico: hay tratamientos que ayudan. Si aparecen temblores fuertes, confusión, alucinaciones o convulsiones, andá a una guardia o llamá al 107." }
  ]);
  LAB.quiz("psicodrama-mitos", [
  { t: "Según Moreno, los conflictos se resuelven sobre todo hablando sobre ellos.", r: "a", e: "Mito. Para Moreno muchas cosas no se resuelven hablando, sino actuándolas: poner en escena el conflicto permite verlo desde afuera y probar respuestas distintas." },
  { t: "Para Moreno, la espontaneidad es responder de forma nueva a una situación conocida, o de forma adecuada a una situación nueva.", r: "b", e: "Verdad. Esa es su definición de espontaneidad, que consideraba la clave de la salud." },
  { t: "El psicodrama se hace siempre a solas, sin director ni grupo.", r: "a", e: "Mito. El psicodrama se practica en grupo, con un director formado. Este laboratorio solo adapta algunas técnicas para hacerlas a solas." },
  { t: "En psicodrama, el doble se pone detrás del protagonista y dice lo que este siente pero calla.", r: "b", e: "Verdad. Esa es la técnica del doble. A solas, podés escribir lo que tu doble diría en una conversación difícil." },
  { t: "Invertir los roles significa ponerse en el lugar del otro, literalmente, y hablar desde su rol.", r: "b", e: "Verdad. Es la técnica central de Moreno: cambiás de silla y respondés como la otra persona para ver lo que antes no veías." },
  { t: "Está bien usar estos ejercicios a solas para revivir situaciones traumáticas.", r: "a", e: "Mito. Actuar una escena puede despertar emociones más intensas que hablar de ella. En psicodrama siempre hay un director formado que cuida el proceso, y estos ejercicios no son para revivir traumas a solas." }
  ]);

  LAB.quiz("relaciones-poder-mitos", [
  { t: "Para Adler, el sentimiento comunitario es algo fijo que se tiene o no se tiene.", r: "a", e: "Mito. Adler lo describió como algo que se puede cultivar con actos concretos, como un gesto chico hacia otra persona." },
  { t: "Horney describió que un ideal de perfección puede volverse exigente y aumentar la distancia con el yo real.", r: "b", e: "Verdad. Cuando el ideal se vuelve una exigencia, la persona vive en tensión. Un puente posible es aceptar lo real y elegir un paso." },
  { t: "El yo ideal siempre es dañino y conviene eliminarlo.", r: "a", e: "Mito. El yo ideal sirve cuando orienta. Se vuelve una tiranía cuando no deja lugar al yo real." },
  { t: "Según Sullivan, el yo bueno surge de la aprobación y el yo malo surge del castigo.", r: "b", e: "Verdad. Y el no-yo es lo que se niega o se disocia. Son «mí» que se forman con la mirada de los otros." },
  { t: "Los «mí» que describió Sullivan son verdades fijas sobre quiénes somos.", r: "a", e: "Mito. Reconocerlos permite verlos como aprendidos, no como verdades fijas." },
  { t: "Hacer explícito lo que esperamos del otro y pedirlo con claridad reduce la ansiedad interpersonal.", r: "b", e: "Verdad. Esperar sin decir nada deja la angustia en nosotros. Pedir abre una respuesta posible, aunque no siempre sea la que queremos." }
  ]);

  LAB.quiz("respiraciones-mitos", [
  { t: "Cambiar la respiración puede cambiar algo de lo que sentimos.", r: "b", e: "Verdad. El camino también funciona al revés: así como cada emoción tiene su forma de respirar, cambiar la respiración puede modificar algo de lo que sentimos." },
  { t: "Las respiraciones rápidas tienden a calmar y las exhalaciones largas tienden a activar.", r: "a", e: "Mito. Es al revés: las exhalaciones largas tienden a calmar y las respiraciones rápidas tienden a activar." },
  { t: "La respiración de fuego (kapalabhati) sirve para calmar la ansiedad.", r: "a", e: "Mito. Es una técnica activadora: sube la energía y el estado de alerta, y en una persona ansiosa puede aumentar las sensaciones de alarma." },
  { t: "El suspiro fisiológico es lo que el cuerpo hace solo cuando suspira o después de llorar.", r: "b", e: "Verdad. Son dos inhalaciones seguidas por la nariz y una exhalación larga por la boca. Se usa cuando necesitás bajar rápido la tensión." },
  { t: "Si te mareás o te falta el aire mientras practicás, lo mejor es forzar la técnica un poco más.", r: "a", e: "Mito. Mareo, hormigueo o ahogo son señales de que estás respirando de más: frená y volvé a tu ritmo natural." },
  { t: "En un ataque de pánico, lo que más ayuda son las exhalaciones largas, no las retenciones.", r: "b", e: "Verdad. Con asma, enfermedades respiratorias o cardíacas, o embarazo, conviene consultar al médico antes de practicar retenciones o respiraciones rápidas." }
  ]);

  LAB.quiz("seneca-mitos", [
  { t: "Para Séneca, la ira empieza con una impresión y se alimenta del juicio.", r: "b", e: "Verdad. En De ira la describe como una pasión que se alimenta del juicio, y por eso aconseja esperar, pensar y preguntarse qué bien busca." },
  { t: "Séneca aconsejaba responder a la ofensa lo más rápido posible, para no acumular enojo.", r: "a", e: "Mito. Su consejo era esperar antes de responder y usar ese espacio para preguntarse qué busca la ira y si ese bien vale la pena." },
  { t: "Séneca advirtió que la multitud contagia vicios y opiniones con facilidad.", r: "b", e: "Verdad. Recomendaba elegir pocas compañías buenas. La multitud no decide por nosotros, pero contagia." },
  { t: "Consolar a alguien es minimizar su dolor.", r: "a", e: "Mito. Consolar no es minimizar: es ayudar a ver lo que depende de la persona y lo que no, sin negar el dolor." },
  { t: "Séneca escribió cartas a Lucilio para ordenar sus ideas y acompañarlo.", r: "b", e: "Verdad. Escribirle a alguien querido es también una forma de pensar en voz alta." },
  { t: "Estos ejercicios alcanzan para trabajar una ira que pone en riesgo a otras personas.", r: "a", e: "Mito. Si la ira es intensa o pone en riesgo a otros, no se trabaja sola: hay que pedir acompañamiento. Si hay violencia, podés llamar al 144 o al 911." }
  ]);

  LAB.quiz("sombra-mitos", [
  { t: "La sombra es todo lo malo que hay en vos.", r: "a", e: "Mito. Jung llamó sombra a lo que no aceptamos de nosotros mismos, y no es mala: es lo que todavía no integraste." },
  { t: "Lo que más nos irrita en otros puede ser una pista de una proyección.", r: "b", e: "Verdad. Un exceso de irritación sugiere que algo tuyo también está en juego, aunque eso no significa que el otro no tenga nada que ver." },
  { t: "La sombra guarda solo lo que rechazamos, nunca capacidades propias.", r: "a", e: "Mito. También guarda capacidades que no nos animamos a vivir. Los autores junguianos la llaman a veces «sombra dorada» y aparece en la admiración desmedida." },
  { t: "Las ocho figuras de este laboratorio son una tipología científica.", r: "a", e: "Mito. No son una tipología científica ni un test: son espejos para pensar qué historias se repiten en tu vida." },
  { t: "Cada arquetipo tiene un don y una sombra.", r: "b", e: "Verdad. Por ejemplo, el cuidador tiene el don de la generosidad y la sombra de darse hasta vaciarse." },
  { t: "Cuanto más rígida es la máscara que mostramos, más grande es la sombra.", r: "b", e: "Verdad. La persona es la máscara que mostramos al mundo y la sombra es lo que queda del otro lado. Estos ejercicios son una puerta de entrada, no un diagnóstico." }
  ]);

  LAB.quiz("transacciones-mitos", [
  { t: "Según Berne, hablamos desde tres estados del yo: padre, adulto y niño.", r: "b", e: "Verdad. Son formas de estar en una conversación, no personas distintas." },
  { t: "El estado adulto es el que no siente nada y evalúa con frialdad.", r: "a", e: "Mito. El adulto evalúa lo que pasa aquí y ahora: qué información tenés y qué pedís. Las emociones corresponden más al niño, y todos los estados forman parte de nosotros." },
  { t: "Una transacción cruzada es la que responde desde otro estado del yo, y suele cortar la comunicación.", r: "b", e: "Verdad. En la paralela, la respuesta continúa en el mismo estado y la comunicación fluye." },
  { t: "Para Berne, un juego es una conversación divertida entre dos personas.", r: "a", e: "Mito. Berne llamó juegos a secuencias de transacciones que se repiten, tienen un mensaje oculto y terminan en un resultado conocido, como sentirse herido." },
  { t: "Cambiar una sola respuesta, desde el adulto, puede cortar un juego que se repite.", r: "b", e: "Verdad. Reconocer el juego es el primer paso para salir de él." },
  { t: "Laura Perls trabajó la idea de vivir en la frontera del contacto con el otro, sin perderse en ninguno de los dos lados.", r: "b", e: "Verdad. Su obra póstuma se titula Viviendo en los límites. Estas prácticas son para tus conversaciones, sin analizar al otro." }
  ]);

  LAB.quiz("virtudes-mitos", [
  { t: "Para Aristóteles, la virtud es una regla que se obedece.", r: "a", e: "Mito. Aristóteles la pensaba como una manera de ser que se forma con la práctica." },
  { t: "Cada virtud está en un término medio entre dos extremos, como la valentía entre la cobardía y la temeridad.", r: "b", e: "Verdad. El medio se busca con la razón y según el contexto." },
  { t: "El término medio es siempre la mitad exacta entre los dos extremos.", r: "a", e: "Mito. La virtud no es el extremo ni la mitad mecánica: es el punto que la razón ubica según la situación." },
  { t: "Nos hacemos justos practicando la justicia y valientes practicando la valentía.", r: "b", e: "Verdad. La virtud es un hábito que se forma con actos repetidos: se practica, no solo se piensa." },
  { t: "Para corregir un exceso conviene irse al extremo opuesto.", r: "a", e: "Mito. Reconocer hacia qué lado tendemos ayuda a corregir la dirección sin irnos al otro extremo." },
  { t: "La eudaimonía, o buen vivir, se alcanza en una actividad acorde con la virtud que vale por sí misma.", r: "b", e: "Verdad. Buscar esas actividades, y no solo los resultados, es parte de la vida buena. Y si hay conductas que te dañan, un ejercicio no alcanza: pedí ayuda profesional." }
  ]);

  LAB.quiz("amor-arte-mitos", [
  { t: "Para Fromm, el amor es algo que nos pasa y no requiere práctica.", r: "a", e: "Mito. Fromm propuso que el amor exige conocimiento, esfuerzo y práctica, como cualquier arte." },
  { t: "Según Fromm, el cuidado es un interés activo por el crecimiento de la otra persona.", r: "b", e: "Verdad. No es solo sentir ternura: es hacer algo concreto para que la otra persona florezca." },
  { t: "La responsabilidad, para Fromm, es una obligación impuesta desde afuera.", r: "a", e: "Mito. Es responder voluntariamente a las necesidades del otro. Nace de elegir estar presente, y es distinta del deber." },
  { t: "Sin respeto, la responsabilidad puede degenerar en control o explotación.", r: "b", e: "Verdad. Fromm llamó respeto a ver al otro tal como es, sin usarlo para nuestros fines." },
  { t: "Para conocer de verdad a alguien alcanza con suponer lo que piensa.", r: "a", e: "Mito. Suponer es fácil y empobrece el vínculo. El conocimiento se practica con preguntas abiertas y escucha." },
  { t: "Si en el vínculo hay control, celos extremos o miedo, no es un tema de ejercicios de amor sino de seguridad.", r: "b", e: "Verdad. Si hay control del celular, del dinero o de las salidas, gritos, amenazas o violencia, podés llamar al 144 (violencia de género, las 24 horas) o al 911." }
  ]);

  LAB.quiz("cuerpo-vivido-mitos", [
  { t: "Merleau-Ponty usó la experiencia de una mano que toca a la otra para mostrar que el cuerpo es a la vez sujeto y objeto.", r: "b", e: "Verdad. La mano que toca puede ser tocada, y esa reversibilidad es lo que llamó cuerpo vivido." },
  { t: "Saber dónde está tu mano sin mirarla requiere pensarlo con cuidado.", r: "a", e: "Mito. El esquema corporal es un saber práctico que no pasa por el pensamiento: sabemos dónde están nuestras manos sin verlas." },
  { t: "Para Spinoza, la alegría aumenta nuestra potencia de actuar y la tristeza la disminuye.", r: "b", e: "Verdad. Junto con el deseo, son los tres afectos básicos que describió." },
  { t: "Entender las causas de un afecto no cambia nada en cómo nos domina.", r: "a", e: "Mito. Para Spinoza, un afecto que se entiende deja de dominarnos del mismo modo: entender las causas devuelve parte del poder de actuar." },
  { t: "Los reflejos son rápidos y no se pueden evitar del todo, pero queda un espacio chico para elegir qué hacer con ellos.", r: "b", e: "Verdad. Practicar ese espacio, con una respiración lenta, cambia la respuesta." },
  { t: "Si una práctica te incomoda, tenés que seguir hasta el final.", r: "a", e: "Mito. Las prácticas son cortas y, si algo te incomoda, podés cambiar de práctica sin problema." }
  ]);

  LAB.quiz("encuentro-mitos", [
  { t: "Buber distinguió la relación Yo-Tú, donde el otro aparece entero, de la relación Yo-Ello, donde el otro se usa o se conoce.", r: "b", e: "Verdad. La vida necesita las dos, pero solo la primera es encuentro." },
  { t: "Según Buber, la relación Yo-Ello es mala y hay que evitarla siempre.", r: "a", e: "Mito. La vida necesita las dos relaciones. Lo que ocurre es que solo la Yo-Tú es encuentro." },
  { t: "Para Hegel, necesitamos ser reconocidos por otra conciencia: necesitamos sentirnos vistos.", r: "b", e: "Verdad. Cuando esa necesidad no se cubre, aparecen la lucha, el enojo o el retraimiento." },
  { t: "Para Hegel, ante dos posiciones opuestas hay que elegir una y descartar la otra.", r: "a", e: "Mito. De la tensión surge algo que conserva y transforma a las dos. Aceptar y cambiar no son posiciones enemigas." },
  { t: "Pedir con claridad lo que necesitás para sentirte reconocido también es un paso.", r: "b", e: "Verdad. A veces esa necesidad se puede pedir, o se puede buscar a alguien que te reconozca." },
  { t: "Escuchar de verdad es ir preparando la respuesta mientras el otro habla.", r: "a", e: "Mito. Escuchar exige soltar la respuesta preparada. Cuando aparece la distracción, volver a escuchar es la práctica." }
  ]);

  LAB.quiz("estoico-mitos", [
  { t: "El estoicismo pide dejar de sentir.", r: "a", e: "Mito. No pide dejar de sentir: pide revisar los juicios que nos hacen sufrir." },
  { t: "Epicteto distinguió lo que está en nuestro poder, como los juicios, deseos y acciones, de lo que no, como el cuerpo, la reputación o lo que hacen los demás.", r: "b", e: "Verdad. Gran parte del malestar viene de querer controlar lo segundo." },
  { t: "Epicteto fue un emperador romano.", r: "a", e: "Mito. Epicteto fue esclavo y después maestro de filosofía. Sus enseñanzas las reunió Arriano en el Enquiridión." },
  { t: "Imaginar de antemano las dificultades posibles ayuda a no sorprendernos tanto cuando llegan.", r: "b", e: "Verdad. Es la premeditación de los males: pensar qué haríamos reduce la sorpresa y la angustia." },
  { t: "El examen nocturno consiste en castigarse por lo que se hizo mal.", r: "a", e: "Mito. Se revisa lo que hicimos bien, lo que hicimos mal y lo que dejamos de hacer, con honestidad y sin castigo, para aprender." },
  { t: "Para Epicteto, lo que nos perturba no son los hechos sino las opiniones que tenemos sobre ellos.", r: "b", e: "Verdad. Por eso lo que otros piensan de nosotros es un hecho ajeno, mientras que nuestro juicio sobre nosotros sí podemos revisarlo." }
  ]);

  LAB.quiz("logoterapia-trago-mitos", [
  { t: "El optimismo trágico consiste en exigirse ser feliz pase lo que pase.", r: "a", e: "Mito. Frankl distingue el optimismo trágico del mandato cultural de «ser feliz»: no niega el dolor ni exige felicidad." },
  { t: "La tríada trágica que describe Frankl es el dolor, la culpa y la muerte.", r: "b", e: "Verdad. Su respuesta es que cada uno puede transformarse en algo con sentido." },
  { t: "Frankl proponía buscar el sufrimiento porque es bueno en sí mismo.", r: "a", e: "Mito. No significa que el sufrimiento sea bueno ni que haya que buscarlo: si se puede evitar, lo sensato es evitarlo. Se trata de lo que no se puede evitar." },
  { t: "Para Frankl, la culpa puede ser el punto de partida para cambiar.", r: "b", e: "Verdad. Es la prueba de que somos libres y responsables. La pregunta pasa a ser «¿en quién me quiero convertir a partir de esto?»." },
  { t: "Para Frankl, lo vivido se pierde con el tiempo.", r: "a", e: "Mito. Frankl usaba la imagen del granero: lo que hicimos, amamos y sufrimos con valentía queda guardado en el pasado y nadie puede sacarlo." },
  { t: "Frankl pensaba que la transitoriedad de la vida es un incentivo para actuar con responsabilidad.", r: "b", e: "Verdad. Justamente porque el tiempo es limitado, cada momento pide una respuesta. Y si el sufrimiento es muy intenso, primero hace falta alivio y compañía." }
  ]);
  LAB.quiz("meditaciones-del-corazon-mitos", [
  { t: "Para practicar el amor bondadoso tenés que sentir algo especial mientras repetís las frases.", r: "a", e: "El laboratorio lo dice así: no hace falta sentir nada especial, porque lo que se cultiva es la intención." },
  { t: "En los textos budistas, las cuatro moradas sublimes son disposiciones que se entrenan con la práctica.", r: "b", e: "No son sentimientos que aparecen solos: el amor bondadoso, la compasión, la alegría por el bien ajeno y la ecuanimidad se cultivan." },
  { t: "La ecuanimidad es lo mismo que la indiferencia: «me da igual».", r: "a", e: "La indiferencia es justamente su enemigo cercano, algo que se le parece pero no lo es. La ecuanimidad sostiene el afecto sin dejarse arrastrar por los cambios." },
  { t: "Según Buddhaghosa, los enemigos cercanos son los más traicioneros porque se viven como virtudes.", r: "b", e: "Por ejemplo, la lástima puede confundirse con la compasión, y el apego con el amor bondadoso." },
  { t: "Cuando sentís envidia, la alegría empática sirve para taparla y no pensar más en eso.", r: "a", e: "El laboratorio propone lo contrario: no taparla, sino escuchar qué te muestra y no quedarte atrapado en ella." },
  { t: "Tania Singer y Olga Klimecki distinguieron el malestar empático, que desgasta, de la compasión, que se vive con calidez y protege a quien cuida.", r: "b", e: "Es una de las razones por las que la compasión con ecuanimidad se propone para quienes cuidan." }
  ]);

  LAB.quiz("mi-mapa-de-vinculos-mitos", [
  { t: "Este mapa te dice si un vínculo es «sano» o «tóxico».", r: "a", e: "El laboratorio aclara que no es una evaluación ni un test de relaciones sanas o tóxicas: dibuja lo que vos marcás." },
  { t: "El mapa admite vínculos pasados y personas que ya no están.", r: "b", e: "Se apoya en la idea del convoy de Kahn y Antonucci: los vínculos cercanos acompañan a lo largo de la vida y cambian de composición con el tiempo." },
  { t: "Si alguien vive lejos y casi no hablan, entonces no puede ser un vínculo central.", r: "a", e: "Cercanía emocional, frecuencia de contacto, confianza, intimidad y distancia física son dimensiones diferentes. Alguien puede vivir lejos y ser central." },
  { t: "El genograma y el mapa de la red social son herramientas distintas, y por eso el laboratorio las mantiene en dos capas.", r: "b", e: "Una persona puede ser central en tu historia familiar y no en tu vida actual, o al revés." },
  { t: "Según la perspectiva gestáltica del laboratorio, retirarse de un vínculo es siempre una forma de rechazo.", r: "a", e: "Contacto y retirada forman parte de un mismo ritmo. Retirarse no es rechazar: también es una manera de regular el encuentro." },
  { t: "En una relación valiosa no siempre se intercambia lo mismo ni al mismo tiempo.", r: "b", e: "Por eso la estación de reciprocidad no es una cuenta: un vínculo puede ser valioso aunque algo no circule de manera pareja." }
  ]);

  LAB.quiz("mito-personal-mitos", [
  { t: "Mirar tu vida como un viaje del héroe es convertirte en el protagonista de una película.", r: "a", e: "El laboratorio lo aclara: mirarla así no la vuelve ficción, ayuda a encontrarle un sentido." },
  { t: "Joseph Campbell describió la estructura del monomito en tres movimientos: la partida, la iniciación y el regreso.", r: "b", e: "Es la base del ejercicio del viaje del héroe de este laboratorio." },
  { t: "Para completar el viaje del héroe tenés que haberlo terminado y saber cómo sale.", r: "a", e: "Si estás en medio del viaje, está bien dejar en blanco lo que no llegó. A veces lo más honesto es reconocer que estamos en el bosque." },
  { t: "Jung se preguntó una vez, en una época de crisis, cuál era el mito que vivía, y descubrió que no lo sabía.", r: "b", e: "La pregunta «¿cuál es el mito que vivo?» es el punto de partida de este laboratorio." },
  { t: "Perséfone es la figura de los descensos involuntarios, como un duelo o una crisis, de los que también se vuelve.", r: "b", e: "Vive parte del año abajo y parte arriba. La pregunta que propone el laboratorio es qué estás aprendiendo «abajo» que no hubieras aprendido arriba." },
  { t: "Hay que recorrer sí o sí los capítulos más dolorosos de tu historia para que el ejercicio sirva.", r: "a", e: "No hace falta ir a los capítulos más difíciles si hoy no es el momento. Si algo te pesa, es un buen tema para trabajar en terapia." }
  ]);

  LAB.quiz("narrativa-testigos-mitos", [
  { t: "En una ceremonia de definición, los testigos aplauden y aconsejan a la persona.", r: "a", e: "Los testigos no aplauden, no aconsejan ni interpretan: responden cuatro preguntas, en orden." },
  { t: "Las cuatro preguntas del testigo son la expresión, la imagen, la resonancia y el transporte.", r: "b", e: "Primero se nombra algo concreto que se escuchó, y al final se dice a dónde lleva al testigo haberlo escuchado." },
  { t: "Al hablar de la resonancia, el testigo cuenta qué le pasó a él con lo que escuchó, no cómo es la vida del otro.", r: "b", e: "El testigo habla de su propia experiencia, no de la de la persona que contó su historia." },
  { t: "Cualquier persona sirve como testigo de tu historia, aunque juzgue o minimice.", r: "a", e: "El laboratorio advierte que un testigo que juzga, aconseja o minimiza puede lastimar. Conviene elegir con cuidado a quién mostrarle tu historia." },
  { t: "Epston observó que una carta después de una sesión podía valer, para muchas personas, tanto como varias sesiones.", r: "b", e: "Lo escrito se puede releer, compartir y no se lo lleva el olvido." },
  { t: "Los certificados son solo un juego para chicos y no cambian nada.", r: "a", e: "Puede parecer un juego, pero hace visible y compartible un cambio, como el «certificado de domador de miedos»." }
  ]);

  LAB.quiz("narrativo-mitos", [
  { t: "Según la terapia narrativa, la persona es el problema.", r: "a", e: "Una de las ideas centrales de White y Epston es que la persona no es el problema: el problema es el problema." },
  { t: "Externalizar el problema, ponerle un nombre y mirar cómo opera, abre espacio para elegir otra relación con él.", r: "b", e: "Por ejemplo, en lugar de «soy ansioso», «la Ansiedad aparece y me dice cosas»." },
  { t: "Externalizar significa minimizar lo que te pasa, incluso si hay violencia.", r: "a", e: "Externalizar no es minimizar: si el problema es una violencia que alguien ejerce sobre vos, la prioridad es tu seguridad." },
  { t: "Los acontecimientos extraordinarios son momentos, aunque sean chiquitos, en que el problema no se salió con la suya.", r: "b", e: "La historia dominante suele olvidarlos, y por eso son la semilla de otra historia." },
  { t: "La historia alternativa se inventa de cero, sin relación con lo que ya pasó.", r: "a", e: "Se arma con las excepciones, los valores y lo que la historia dominante deja afuera." },
  { t: "El árbol de la vida habla de la propia vida desde los recursos, no desde el problema.", r: "b", e: "Fue creado por Ncazelo Ncube y David Denborough. Las «tormentas» se trabajan después de reconocer las fortalezas, y conviene hacerlo acompañado." }
  ]);

  LAB.quiz("psicologia-positiva-emociones-mitos", [
  { t: "Las emociones positivas no sirven para nada, solo las negativas tienen una función.", r: "a", e: "Según la teoría de ampliar y construir de Barbara Fredrickson, amplían lo que podemos pensar y hacer y construyen recursos duraderos." },
  { t: "En «Tres cosas buenas», preguntarse por qué pasó cada cosa es una parte clave del ejercicio.", r: "b", e: "La pregunta por el porqué lleva a notar qué parte tuviste vos, o quién te ayudó." },
  { t: "Las tres cosas buenas tienen que ser extraordinarias para que el ejercicio funcione.", r: "a", e: "Pueden ser cosas chicas: un mensaje, una comida rica, un rato de sol." },
  { t: "Según Bryant y Veroff, se puede saborear el presente, el pasado y el futuro.", r: "b", e: "Saborear es la capacidad de notar, apreciar y prolongar las experiencias positivas." },
  { t: "Para que el ejercicio de saborear funcione, tenés que forzarte a sentir alegría aunque no la sientas.", r: "a", e: "El laboratorio dice lo contrario: no se trata de sentir algo que no sentís, sino de notar lo que ya está." },
  { t: "Si hace semanas que no encontrás nada bueno en tus días, puede ser una señal de depresión y conviene hablarlo con un profesional.", r: "b", e: "Y no es tu culpa. El laboratorio sugiere consultar, no insistir solo con los ejercicios." }
  ]);

  LAB.quiz("psicologia-positiva-fortalezas-mitos", [
  { t: "Peterson y Seligman describieron 24 fortalezas del carácter agrupadas en seis virtudes.", r: "b", e: "Investigaciones posteriores sugieren que la agrupación en seis no es tan nítida, pero las 24 fortalezas siguen siendo una herramienta útil." },
  { t: "Reconocer una fortaleza es lo mismo que creérsela, y por eso conviene la falsa modestia.", r: "a", e: "El laboratorio propone lo contrario: reconocer una fortaleza no es creérsela." },
  { t: "Las fortalezas distintivas son las que sentís como propias: te salen con naturalidad y te dan energía en lugar de cansarte.", r: "b", e: "Si dudás, podés pensar qué diría alguien que te conoce bien." },
  { t: "Según Csikszentmihalyi, el fluir aparece cuando la tarea es lo más fácil posible.", r: "a", e: "Aparece cuando el desafío y tu habilidad están parejos y altos. Si es muy fácil, aparece el aburrimiento; si te supera, la ansiedad." },
  { t: "El ejercicio de «mi mejor yo posible» de Laura King es una fantasía sin límites.", r: "a", e: "La palabra clave es «realista»: es una imagen de hacia dónde querés ir, que ayuda a ordenar las metas." },
  { t: "Las fortalezas también tienen excesos: la perseverancia puede volverse terquedad.", r: "b", e: "Y la amabilidad puede volverse incapacidad de decir que no." }
  ]);

  LAB.quiz("recorrido-mindfulness-mitos", [
  { t: "Kabat-Zinn definía mindfulness como prestar atención a propósito, en el momento presente y sin juzgar.", r: "b", e: "Es la definición con la que arranca el recorrido." },
  { t: "Con la técnica correcta alcanza: la actitud con que practicás no importa.", r: "a", e: "Kabat-Zinn insistía en que la técnica no alcanza: lo que transforma es la actitud con que se practica." },
  { t: "Aceptación significa resignarse a que las cosas no cambien.", r: "a", e: "No es resignación: es ver las cosas como son en este momento, y es el punto de partida de cualquier cambio." },
  { t: "Cuanto más te esforzás por relajarte, menos lo lográs.", r: "b", e: "Es la paradoja de la actitud de no esforzarse: en lugar de «tengo que calmarme», probá «estoy notando cómo estoy»." },
  { t: "El mindfulness ayuda a todas las personas de la misma forma.", r: "a", e: "Ayuda a muchas, pero no a todas igual. Con historias de trauma, disociación o una crisis intensa, quedarse quieto observando puede aumentar el malestar." },
  { t: "Si quedarte quieto te hace mal, podés elegir prácticas con los ojos abiertos, en movimiento o más breves.", r: "b", e: "Y conviene consultarlo con un profesional." }
  ]);

  LAB.quiz("respirar-volver-al-presente-mitos", [
  { t: "Una respiración «mejor» sirve para todas las personas, y hay que sostener el aire aunque incomode.", r: "a", e: "Ninguna técnica es obligatoria ni mejor. Si una pausa incomoda, se pone en cero." },
  { t: "La respiración es una de las pocas funciones del cuerpo que ocurre sola y que, a la vez, podemos modular.", r: "b", e: "Por eso puede ser un puente para volver al presente." },
  { t: "La respiración 4-7-8 tiene mucha investigación propia que la respalda.", r: "a", e: "Fue difundida por el médico Andrew Weil y tiene poca investigación propia. La retención larga se puede reducir o quitar." },
  { t: "Una exhalación algo más larga que la inspiración, sin forzar el aire, es para muchas personas una forma cómoda de bajar el ritmo.", r: "b", e: "Es la idea de la exhalación prolongada: inspirar cuatro y exhalar seis, sin pausas." },
  { t: "Respirar de determinada manera cura la ansiedad, el pánico y el insomnio.", r: "a", e: "Puede ser una herramienta de autorregulación útil, pero no es una cura ni reemplaza un tratamiento psicológico o médico." },
  { t: "En algunas personas, por ejemplo con ataques de pánico, prestar atención a la respiración puede aumentar el malestar.", r: "b", e: "En ese caso conviene elegir otra vía para volver al presente, como llevar la atención a los pies o a los sonidos, y consultarlo." }
  ]);

  LAB.quiz("rueda-de-las-emociones-mitos", [
  { t: "La rueda te dice qué sentís «en realidad».", r: "a", e: "Es una herramienta para explorar y poner palabras, no un test: no diagnostica ni dice qué sentís en realidad." },
  { t: "El modelo de Plutchik organiza ocho emociones primarias en pares opuestos, con tres intensidades cada una.", r: "b", e: "Además, entre dos colores vecinos aparece la combinación que propone el modelo." },
  { t: "Las palabras y los colores de la rueda son una clasificación universal de las emociones.", r: "a", e: "Provienen de un modelo teórico, el de Robert Plutchik, y no de una clasificación universal." },
  { t: "James Russell propone ubicar lo que sentís según cuán agradable o desagradable es y cuánta activación trae.", r: "b", e: "Es el plano del modelo circumplejo: no pregunta qué emoción es, sino cómo se siente." },
  { t: "Hace falta poder nombrar la emoción para empezar a explorarla.", r: "a", e: "A veces el cuerpo está muy activado y todavía no sabemos cómo nombrar lo que pasa. Por eso existe el plano de la estación 2, y en el recorrido podés elegir «No sé cómo nombrarlo»." },
  { t: "Podés sentir una emoción y, al mismo tiempo, elegir qué hacer con ella.", r: "b", e: "Es una de las ideas del paso 7 del recorrido guiado." }
  ]);

  LAB.quiz("sistemico-mitos", [
  { t: "Mirar el sistema familiar sirve para encontrar al culpable de lo que te pasa.", r: "a", e: "El laboratorio busca patrones, no responsables: mirar el sistema ayuda a entender lo que nos pasa." },
  { t: "La terapia sistémica mira los problemas en su contexto, en los patrones de relación, y no solo «adentro» de una persona.", r: "b", e: "Nació a mediados del siglo XX con autores como Bateson, Satir, Minuchin y la escuela de Milán." },
  { t: "En una discusión que se repite, hay un principio claro y un único culpable.", r: "a", e: "En los sistemas, las conductas se alimentan entre sí en círculos: no hay un principio claro ni un único culpable." },
  { t: "Según Minuchin, los límites de una familia pueden ser difusos, claros o rígidos, y ninguna familia es pura.", r: "b", e: "Suelen combinarse. Los claros tienen intercambio y también privacidad." },
  { t: "Una familia con límites rígidos es la que más se cuida, porque cada uno resuelve solo.", r: "a", e: "Los límites rígidos significan mucha distancia: se habla poco de lo que pasa y cuesta pedir apoyo. Los claros combinan cercanía y autonomía." },
  { t: "Las familias transmiten mandatos, a veces explícitos y a veces silenciosos, como «de eso no se habla».", r: "b", e: "Boszormenyi-Nagy habló además de lealtades invisibles: compromisos inconscientes con la familia que pueden pesar en la vida de cada uno." }
  ]);
  LAB.quiz("act-comprometido-mitos", [
  { t: "Abrirse a lo que duele y observar los pensamientos son un fin en sí mismos.", r: "a", e: "Están al servicio del tercer pilar: liberan energía para hacer lo que importa, que es el pilar comprometido." },
  { t: "Comprometerse con los valores significa exigirse más.", r: "a", e: "Si ya vivís agotado de tanto «tener que», quizás el valor que hoy pide lugar es el cuidado de vos mismo." },
  { t: "En la metáfora del colectivo, la alternativa a discutir con los pasajeros es dejarlos viajar, aunque griten, y seguir manejando hacia donde elegiste.", r: "b", e: "Si les hacés caso manejás adonde ellos quieren, y si parás a discutir no avanzás." },
  { t: "Para dar un paso hacia lo que te importa, primero tenés que sentirte listo y sin miedo.", r: "a", e: "La acción comprometida se hace con el malestar a bordo: no hace falta esperar a sentirse listo." },
  { t: "Un valor se vive en acciones concretas, y conviene empezar con un paso chico.", r: "b", e: "Un valor se vive en pasos concretos, no en grandes planes; la versión más chica también cuenta." },
  { t: "Si sentís que nada te importa, eso demuestra que no tenés valores.", r: "a", e: "Puede ser una señal de depresión más que de falta de valores, y conviene consultarlo." }
  ]);

  LAB.quiz("compasion-flujos-mitos", [
  { t: "Quien es muy compasivo con los demás lo es, seguramente, también consigo.", r: "a", e: "Muchas personas tienen un flujo muy desarrollado y otro bloqueado: son muy compasivas con otros y durísimas consigo." },
  { t: "Para algunas personas, la compasión no calma, sino que asusta.", r: "b", e: "Gilbert observó que la calidez puede activar el sistema de amenaza, sobre todo si el afecto vino mezclado con dolor." },
  { t: "Si la calidez de alguien te da tristeza, es que la práctica fracasó.", r: "a", e: "Esa tristeza es frecuente y puede ser el recuerdo de lo que faltó: señal de que algo se está abriendo." },
  { t: "Gilbert describe tres flujos de la compasión: hacia otros, desde otros y hacia uno mismo.", r: "b", e: "Son tres direcciones que no siempre fluyen igual." },
  { t: "Ser compasivo con uno mismo es ser débil o blando.", r: "a", e: "Es uno de los miedos a la compasión que Gilbert y sus colegas estudiaron. Nombrarlo ya lo afloja un poco." },
  { t: "El segundo flujo, recibir, suele ser el más difícil.", r: "b", e: "A muchas personas les cuesta dejarse ayudar, aunque puedan dar." }
  ]);

  LAB.quiz("compasion-sistemas-mitos", [
  { t: "Para Gilbert, la compasión es debilidad o lástima.", r: "a", e: "Es la sensibilidad al sufrimiento, propio y ajeno, junto con el compromiso de aliviarlo." },
  { t: "Gilbert propone tres sistemas de regulación emocional: amenaza, logro y calma.", r: "b", e: "Evolucionaron para funciones distintas, y muchos problemas aparecen cuando el de calma quedó poco desarrollado." },
  { t: "El sistema de amenaza es un defecto del cerebro que no sirve para nada.", r: "a", e: "Sirve para detectar peligros y protegernos. El problema aparece cuando domina." },
  { t: "Cuando el sistema de calma está débil, la única forma de sentirnos bien es lograr cosas o eliminar amenazas.", r: "b", e: "Por eso entrenar la calma ayuda a equilibrar los otros dos sistemas." },
  { t: "En la respiración de ritmo calmante hay que respirar «bien», de una forma perfecta.", r: "a", e: "No se trata de respirar bien, sino de encontrar un ritmo un poco más lento y suave que el habitual." },
  { t: "La imaginación activa sistemas del cuerpo como si lo imaginado estuviera pasando.", r: "b", e: "Por eso el lugar seguro sirve para entrenar el sistema de calma, aunque la imagen no sea nítida." }
  ]);

  LAB.quiz("adolescentes-mitos", [
  { t: "Sentir pérdida y confusión en la adolescencia es señal de que algo anda mal.", r: "a", e: "Aberastury y Knobel describieron tres duelos de la adolescencia, y es normal sentir pérdida y confusión." },
  { t: "Según Aberastury y Knobel, los tres duelos son por el cuerpo, la identidad y los padres de la infancia.", r: "b", e: "Nombrar cada despedida ayuda a entender el enojo, la tristeza o la confusión." },
  { t: "La identidad tiene que estar definida a esta edad.", r: "a", e: "Se construye probando cosas, equivocándose y volviendo a empezar." },
  { t: "Pedir ayuda es una forma de fallar.", r: "a", e: "Es una forma de cuidarte, y podés empezar con una persona de confianza y una frase simple." },
  { t: "Escuchar primero, sin interrumpir, muchas veces abre la conversación con un adolescente.", r: "b", e: "Escuchar sin corregir le da la sensación de ser entendido, y es más probable que vuelva a contar." },
  { t: "Como los adolescentes discuten los límites, no los necesitan.", r: "a", e: "Los necesitan aunque los discutan: pocos y claros funcionan mejor que muchos y cambiantes." }
  ]);

  LAB.quiz("aprendizaje-habito-mitos", [
  { t: "Un estímulo neutro puede volverse señal de una emoción si se asocia a algo que la produce.", r: "b", e: "Pávlov lo mostró con un sonido, y lo mismo pasa con olores, lugares u horas del día." },
  { t: "Un hábito nuevo se sostiene mejor empezando con un cambio grande y ambicioso.", r: "a", e: "Conviene empezar por un paso casi imposible de fallar, que dure menos de dos minutos." },
  { t: "Si la consecuencia de una conducta la refuerza, tiende a repetirse.", r: "b", e: "Por eso el análisis de la conducta mira lo que precede y lo que sigue." },
  { t: "La autoeficacia es una creencia fija con la que se nace.", r: "a", e: "Para Bandura se forma con experiencias propias, con ver a otros lograrlo, con palabras de aliento y con el estado del cuerpo." },
  { t: "Según William James, repetir una conducta no cambia lo fácil que resulta hacerla.", r: "a", e: "James describió que una conducta repetida se vuelve más fácil y automática." },
  { t: "Dividir una tarea en pasos chicos aporta evidencia para creer en uno mismo.", r: "b", e: "Cada paso logrado es una evidencia para la creencia en la propia capacidad." }
  ]);

  LAB.quiz("complejos-tipos-mitos", [
  { t: "Un complejo es un defecto que tienen solo algunas personas.", r: "a", e: "Un complejo no es un defecto: todos los tenemos." },
  { t: "Jung descubrió los complejos con un experimento de asociación de palabras en el hospital Burghölzli.", r: "b", e: "Notó que algunas palabras producían demoras, tropiezos u olvidos, detrás de los cuales había recuerdos con fuerte carga afectiva." },
  { t: "Una demora larga ante una palabra prueba que tenés un complejo.", r: "a", e: "Es solo una pista para explorar, no una conclusión." },
  { t: "Jung decía que a veces los complejos nos tienen a nosotros, y no al revés.", r: "b", e: "Se reconocen por la reacción desproporcionada y la sensación de que «algo se apoderó de mí»." },
  { t: "Los tipos psicológicos de Jung son casilleros en los que cada persona encaja.", r: "a", e: "Jung mismo advertía que los tipos no son casilleros sino orientaciones." },
  { t: "Bajo estrés, la función inferior suele aparecer de forma torpe o explosiva.", r: "b", e: "Pero también es una puerta hacia lo que falta desarrollar." }
  ]);

  LAB.quiz("creatividad-mitos", [
  { t: "Para ser creativo hace falta ser artista.", r: "a", e: "Hace falta acordarse de jugar, como cuando de chicos una caja podía ser un barco." },
  { t: "Winnicott decía que es jugando, y solo jugando, que podemos ser creativos y sentirnos vivos.", r: "b", e: "El garabato de Winnicott es un juego muy simple: uno hace un trazo y el otro lo convierte en dibujo." },
  { t: "En los usos imposibles de un objeto, lo importante es acertar la respuesta correcta.", r: "a", e: "No se trata de acertar, sino de abrir: Guilford miraba fluidez, flexibilidad y originalidad." },
  { t: "Las restricciones, aunque parezca raro, despiertan la creatividad.", r: "b", e: "Ponerse una regla extraña obliga a la cabeza a salir del camino de siempre." },
  { t: "Para escribir con creatividad hay que corregir cada frase mientras la escribís.", r: "a", e: "Escribir sin corregir es una forma de escucharse: conviene que la mano vaya más rápido que el juez interno." },
  { t: "Según el enfoque junguiano de esta estación, cada imagen tiene un significado fijo.", r: "a", e: "No hay significados fijos: vale lo que la imagen te despierta a vos." }
  ]);

  LAB.quiz("crisis-vitales-mitos", [
  { t: "Una crisis vital se resuelve «dando vuelta la página» o reinventándose en un fin de semana.", r: "a", e: "Es un momento en que lo anterior ya no sirve y lo nuevo todavía no tiene forma, y cada transición tiene su tiempo." },
  { t: "Bridges distinguía entre el cambio, que es externo, y la transición, que es interna y lleva tiempo.", r: "b", e: "El cambio puede ser rápido; la transición, no." },
  { t: "Para Bridges, toda transición empieza por un nuevo comienzo.", r: "a", e: "Empieza, paradójicamente, por un final, pasa por una zona neutral y recién después llega un nuevo comienzo." },
  { t: "Las tres fases de una transición se superponen en el tiempo.", r: "b", e: "No son etapas separadas: algo termina, aparece la zona neutral y algo empieza, a la vez." },
  { t: "Si el cambio fue elegido, no hay duelo.", r: "a", e: "Un final es un duelo aunque el cambio haya sido elegido." },
  { t: "El duelo migratorio es múltiple y suele volver en fechas o momentos inesperados.", r: "b", e: "Se cambia de lugar, de vínculos, de rutinas y a veces de idioma." }
  ]);

  LAB.quiz("duda-percepcion-mitos", [
  { t: "El ejercicio de Descartes consiste en dudar de todo.", r: "a", e: "Se trata de notar cuántas cosas damos por ciertas sin haberlas revisado." },
  { t: "Locke imaginó la mente como una tabla rasa: las ideas llegan por la sensación y por la reflexión.", r: "b", e: "Revisar el origen de una creencia ayuda a verla como algo aprendido." },
  { t: "La epojé de Husserl consiste en negar lo que sabemos.", r: "a", e: "Deja lo sabido en suspenso para mirar lo que aparece, y así describir con más precisión." },
  { t: "Si algo que das por cierto no tiene pruebas, conviene anotarlo como hipótesis y no como hecho.", r: "b", e: "Y averiguar en vez de suponer." },
  { t: "Una creencia sobre uno mismo es una verdad que siempre fue así.", r: "a", e: "Puede reescribirse como algo que aprendiste, no como lo que sos." },
  { t: "Según Locke, algunas ideas quedan unidas por costumbre o por azar y después aparecen juntas sin relación lógica.", r: "b", e: "La cadena de palabras hace visibles esos vínculos." }
  ]);

  LAB.quiz("escritura-expresiva-mitos", [
  { t: "La escritura expresiva es un diario donde hay que escribir bonito.", r: "a", e: "Es poner en palabras, sin censura, algo que te dolió o te sigue pesando." },
  { t: "Pennebaker encontró que estudiantes que escribieron así durante cuatro días consultaron menos al médico en los meses siguientes.", r: "b", e: "Los resultados posteriores fueron positivos, aunque modestos." },
  { t: "Mientras escribís, conviene corregir y releer cada párrafo.", r: "a", e: "La consigna es escribir sin parar, sin corregir y sin releer; si no sabés qué poner, repetí la última frase." },
  { t: "Es esperable sentirse un poco peor justo después de escribir.", r: "b", e: "Si te desborda, pará." },
  { t: "Se recomienda hacerlo sobre un trauma muy reciente o en medio de una crisis.", r: "a", e: "No se recomienda en esos casos, y conviene buscar acompañamiento." },
  { t: "A quienes más les servía la escritura eran quienes pasaban de contar a entender.", r: "b", e: "Usaban más palabras como «porque», «me doy cuenta» o «entiendo»." }
  ]);

  LAB.quiz("grupos-mitos", [
  { t: "Para Pichon-Rivière, la tarea explícita y la implícita de un grupo pueden no coincidir, y esa distancia suele explicar conflictos.", r: "b", e: "Nombrar la diferencia ayuda a trabajarla." },
  { t: "Lo que un grupo dice que hace es todo lo que hace.", r: "a", e: "Además de la tarea explícita hay una implícita: lo que el grupo hace en realidad." },
  { t: "Un grupo pasa por información, emoción y producción una sola vez y termina.", r: "a", e: "Estos momentos pueden repetirse dentro de una misma reunión." },
  { t: "Yalom llamó universalidad al alivio de descubrir que otros comparten lo que sentimos.", r: "b", e: "Escuchar que otros sintieron lo mismo reduce la sensación de anormalidad y de soledad." },
  { t: "Si alguien siente un malestar que no ve en otros, es que realmente es el único.", r: "a", e: "Muchas personas llegan al grupo creyendo que son las únicas, y descubren que no." },
  { t: "Si la emoción no se nombra, la producción del grupo suele trabarse.", r: "b", e: "Por eso observar el ciclo ayuda a entender por qué se traba un grupo." }
  ]);

  LAB.quiz("imaginacion-activa-mitos", [
  { t: "La imaginación activa es lo mismo que fantasear.", r: "a", e: "Dejás que aparezca una imagen propia y te relacionás con ella como si tuviera vida: la mirás, le hablás, la escuchás." },
  { t: "Jung consideraba la imaginación activa uno de los caminos más directos hacia el inconsciente.", r: "b", e: "La desarrolló a partir de su propia experiencia." },
  { t: "En la imaginación activa se trata de obedecer a lo que dice la imagen.", r: "a", e: "Es un encuentro entre dos: respondés desde vos, con tus valores y tus emociones." },
  { t: "Para empezar hay que poner la mente en blanco.", r: "a", e: "Alcanza con aquietarte y dejar pasar los pensamientos del día sin seguirlos." },
  { t: "Jung dibujó mandalas casi a diario durante una época difícil de su vida.", r: "b", e: "Vio en ellos una expresión espontánea del sí-mismo, y no hace falta saber dibujar." },
  { t: "Si la imagen te desborda, conviene seguir hasta terminar.", r: "a", e: "Conviene parar, volver al presente y, si hace falta, pedir acompañamiento." }
  ]);
  LAB.quiz("angustia-mitos", [
  { t: "La angustia y el miedo son lo mismo con otro nombre.", r: "a", e: "Kierkegaard distinguió el miedo, que tiene un objeto concreto, de la angustia, que no lo tiene. Reconocer la diferencia cambia la forma de atenderla." },
  { t: "Kierkegaard llamó a la angustia el vértigo de la libertad.", r: "b", e: "Aparece cuando se puede elegir de muchas maneras. Por eso mirar la decisión pendiente ayuda a usarla como señal." },
  { t: "Según Heidegger, la angustia vuelve más familiar el mundo que nos rodea.", r: "a", e: "Al revés: Heidegger describió que la angustia hace extraño el mundo y las cosas dejan de ser familiares." },
  { t: "Mirar con atención un objeto cotidiano puede ayudar a que vuelva a sentirse familiar.", r: "b", e: "Es el ejercicio de volver a lo cotidiano: un objeto mirado con atención devuelve el suelo que la angustia había movido." },
  { t: "Si la angustia es intensa, alcanza con hacer estos ejercicios por tu cuenta.", r: "a", e: "Ninguna de estas formas reemplaza una consulta cuando la angustia es intensa, no deja dormir o aparecen pensamientos de no querer vivir. Ahí conviene pedir ayuda." },
  { t: "Yalom subrayó que no conviene atravesar solo las preguntas sobre la muerte y la fragilidad de la vida.", r: "b", e: "En «Mirar al sol» escribió sobre eso, y sostenerse con otras personas es parte del trabajo de atravesar la angustia." },
  ]);

  LAB.quiz("libertad-mitos", [
  { t: "Para Sartre, la mala fe es culparse a uno mismo por todo lo que pasa.", r: "a", e: "La mala fe es el modo en que nos escondemos de nuestra propia libertad usando una identidad o una excusa. Y el ejercicio aclara que no se trata de culparse." },
  { t: "Para Sartre, la existencia precede a la esencia: primero estamos y después nos definimos con lo que hacemos.", r: "b", e: "No hay una naturaleza previa que decida quiénes somos. Por eso «soy así» puede reescribirse como «estoy siendo»." },
  { t: "Heidegger pensó al ser humano como una mente aislada que mira el mundo desde afuera.", r: "a", e: "Su idea del Dasein es la contraria: siempre estamos en el mundo, con otros y con las cosas." },
  { t: "La imagen de cómo nos mira el otro es nuestra, y se puede comprobar con preguntas.", r: "b", e: "Imaginar cómo nos ven es humano, pero muchas veces la imaginamos con más dureza de la que existe. Preguntar o notar ayuda a ponerla a prueba." },
  { t: "Para Kierkegaard, el paso de un estadio de la vida al siguiente es automático.", r: "a", e: "Cada estadio, el estético, el ético y el religioso, tiene su propio sentido, y el paso no siempre es automático. Por eso el ejercicio propone un paso sin apuro." },
  { t: "Una frase como «no tenía otra opción» puede ser cierta en parte y, aun así, servir para esconderse de elegir.", r: "b", e: "Son frases cómodas, y muchas veces ciertas en parte. La práctica sirve para descubrir qué parte de lo que hacemos sí podemos elegir." },
  ]);

  LAB.quiz("psique-imagen-mitos", [
  { t: "Según Hillman, una imagen que vuelve debe traducirse enseguida a una explicación.", r: "a", e: "Hillman sostuvo que las imágenes del alma no necesitan ser traducidas: piden ser vistas con atención. Conviene describirlas antes de interpretarlas." },
  { t: "Para Neumann, las posiciones de la conciencia no son una escala de valor.", r: "b", e: "Cada posición tiene su fuerza y sus riesgos. La pregunta es qué necesitamos hoy y qué nos falta mirar." },
  { t: "Según Neumann, la apertura es la mejor posición y las otras hay que dejarlas atrás.", r: "a", e: "Ninguna posición es mejor en sí misma: el orden, la inmersión y la apertura tienen fuerza y riesgos." },
  { t: "Para Hollis, la mitad de la vida empieza cuando algo que nos sostenía deja de hacerlo.", r: "b", e: "La segunda mitad de la vida pide preguntas distintas: qué dejar, qué sentido construir y qué parte de uno quedó postergada." },
  { t: "Según Woodman, la perfección es el camino más seguro hacia lo vivo.", r: "a", e: "En «Adicción a la perfección» describió cómo buscarla puede llevar a dejar de vivir en el cuerpo y en lo que sentimos. Lo imperfecto puede ser el camino hacia lo vivo." },
  { t: "Estos ejercicios sirven para acercarse a la propia psique, no para diagnosticarla.", r: "b", e: "Y si una imagen te angustia, el laboratorio sugiere dejarla y volver a la respiración. Este trabajo, en la terapia junguiana, se acompaña con tiempo." },
  ]);

  LAB.quiz("razon-autonomia-mitos", [
  { t: "Para Kant, la experiencia surge de dos cosas: lo que llega por los sentidos y las formas que pone la mente.", r: "b", e: "Entre esas formas están el espacio, el tiempo y la causa. Separar lo que pasó de lo que agregamos es un ejercicio de lucidez." },
  { t: "Para Epicteto, la reputación es algo que depende de nosotros.", r: "a", e: "Epicteto separó lo que depende de nosotros, que son los juicios, los deseos y las acciones, de lo que no: el cuerpo, la reputación y lo que hacen los demás." },
  { t: "Según Kant, usar a alguien para conseguir algo es siempre algo malo.", r: "a", e: "Kant propuso tratar a las personas como fines y nunca solo como medios. Usar a alguien no siempre es malo, pero conviene notarlo." },
  { t: "Para Schopenhauer, lo que creemos querer muchas veces responde a una necesidad más honda.", r: "b", e: "Por debajo de la representación hay una voluntad que nos mueve. Preguntar «¿para qué?» varias veces ayuda a verlo." },
  { t: "Nietzsche propuso evitar todas las obligaciones para pasar del camello al niño.", r: "a", e: "No se trata de evitar las obligaciones, sino de elegirlas: del «tú debes» al «yo quiero»." },
  { t: "Gran parte del malestar viene de querer controlar lo que no depende de nosotros.", r: "b", e: "Concentrar la energía en la propia respuesta, y no en el resultado de todo, cambia cómo vivimos lo que no controlamos." },
  ]);

  LAB.quiz("vida-breve-mitos", [
  { t: "Séneca sostuvo que la vida es corta por naturaleza.", r: "a", e: "Séneca sostuvo que la vida no es corta por naturaleza, sino porque la malgastamos." },
  { t: "Para Séneca, la vida es suficientemente larga si se usa bien.", r: "b", e: "Eso no quiere decir que la muerte no exista: quiere decir que pensarla puede ayudarnos a elegir mejor." },
  { t: "Pensar en la finitud tiene que ser siempre una experiencia angustiante.", r: "a", e: "Usada como guía, la muerte ayuda a distinguir lo importante de lo urgente, y no hace falta angustiarse para hacerlo." },
  { t: "Mirar un día entero, y no una semana, muestra con claridad dónde está la vida.", r: "b", e: "Permite separar lo que elegiste, lo que te impusieron y lo que se fue sin querer, y decidir qué parte querés recuperar." },
  { t: "Para vivir un momento completo hay que esperar una ocasión especial.", r: "a", e: "Es al revés: una actividad cotidiana, como comer, caminar o lavar los platos, hecha con atención, deja de ser un trámite." },
  { t: "Si pensar en la muerte te genera angustia o desesperanza, conviene dejar el ejercicio y buscar acompañamiento.", r: "b", e: "El laboratorio lo aclara desde el comienzo. Si la reflexión deriva en pensamientos de no querer vivir, podés llamar al 135 (CABA y GBA) o al 0800-345-1435 (todo el país)." },
  ]);

  LAB.quiz("tradiciones-orientales-mitos", [
  { t: "Para el Buda, el sufrimiento no tiene salida.", r: "a", e: "Las cuatro nobles verdades dicen que el sufrimiento existe, que tiene un origen en el apego, que puede cesar y que hay un camino para que cese." },
  { t: "El wu wei es actuar sin forzar, acompañando el curso de las cosas.", r: "b", e: "Lao Tse lo asoció con el agua, que, blanda como es, gasta la piedra." },
  { t: "Según los Yoga Sutras, la práctica consiste en no distraerse nunca.", r: "a", e: "La práctica es notar la distracción y volver al punto, cada vez, sin reproche. Volver también es parte de la práctica." },
  { t: "Un koan del zen no se resuelve con la lógica.", r: "b", e: "Lo que importa es sostener la pregunta hasta que la mente deje de dar vueltas. La duda que genera puede abrir el satori." },
  { t: "Para el taoísmo, el yin y el yang se oponen y no se mezclan nunca.", r: "a", e: "El yin y el yang no se oponen: se transforman uno en otro. Actuar sin forzar es seguir ese movimiento." },
  { t: "Si una de estas prácticas te desborda, podés dejarla y volver cuando quieras.", r: "b", e: "Las prácticas pueden remover emociones o recuerdos. Si algo te desborda, apoyate en el respiro y pedí ayuda si lo necesitás." },
  ]);

  LAB.quiz("lenguajes-amor-mitos", [
  { t: "Según Chapman, hay diez lenguajes del amor.", r: "a", e: "Chapman propuso cinco: palabras de afirmación, tiempo de calidad, actos de servicio, contacto físico y regalos." },
  { t: "El marco de los lenguajes del amor es útil para conversar, pero no tiene el respaldo de investigación de otros enfoques.", r: "b", e: "Por eso conviene tomarlo como punto de partida y no como un diagnóstico de la pareja." },
  { t: "Solemos dar cariño en la forma exacta que el otro necesita.", r: "a", e: "Muchas veces lo damos en la forma que a nosotros nos gusta, no en la que el otro necesita." },
  { t: "Traducir el cariño no es adivinar: es preguntar y observar qué le hace bien a esa persona.", r: "b", e: "Después se prueba una acción concreta en su idioma, y se mira cómo reacciona." },
  { t: "Si en un vínculo hay control del celular, gritos o amenazas, es un tema de lenguajes del amor.", r: "a", e: "No es un tema de lenguajes del amor sino de seguridad. Podés llamar al 144 (violencia de género, las 24 horas) o al 911." },
  { t: "Muchas veces el malentendido en una pareja no es falta de amor, sino de idioma.", r: "b", e: "Mirar la diferencia sin culpa abre una conversación más amable." },
  ]);

  LAB.quiz("marco-aurelio-mitos", [
  { t: "Marco Aurelio escribió las Meditaciones pensando en publicarlas.", r: "a", e: "Escribió para sí mismo y no tenía intención de publicar sus notas. Eso las vuelve directas: son consejos para uno mismo." },
  { t: "Marco Aurelio escribió sus recordatorios para sí mismo, en griego.", r: "b", e: "Eran recordatorios de cómo actuar bien, que podemos probar en el día." },
  { t: "Mirar a los demás con benevolencia exige aprobar lo que hacen.", r: "a", e: "La benevolencia no es aprobar: es reconocer que todos somos parte de algo común, incluso quien nos molesta." },
  { t: "Separar el hecho del juicio es un reencuadre que Marco Aurelio y Epicteto compartían.", r: "b", e: "Un hecho es un dato. El juicio y la historia que le agregamos son otra cosa, y separarlos cambia lo que sentimos." },
  { t: "Recordar que la vida es breve sirve para angustiarse y no postergar nada.", r: "a", e: "Esa conciencia no es para angustiarse, sino para elegir qué importa hoy." },
  { t: "Al empezar la jornada, Marco Aurelio se recordaba con quiénes iba a tratar, qué iba a encontrar y cómo quería actuar.", r: "b", e: "Empezar con propósito le da forma al día." },
  ]);

  LAB.quiz("pensamientos-repetitivos-mitos", [
  { t: "Con suficiente práctica se puede apagar la mente.", r: "a", e: "Nadie puede apagar la mente. Lo que se puede aprender es darse cuenta de que uno está dando vueltas, tomar distancia y elegir qué hacer después." },
  { t: "Pelearse con un pensamiento suele hacerlo más fuerte.", r: "b", e: "Por eso la idea no es ganarle al pensamiento, sino soltarlo." },
  { t: "Pensar un problema y rumiar son lo mismo.", r: "a", e: "Pensar un problema avanza: aparecen ideas, opciones, decisiones. Rumiar da vueltas sin llegar a ningún lado." },
  { t: "Defusión es dejar de estar fundido con un pensamiento y verlo como algo que la mente produce.", r: "b", e: "Es un término de la terapia de aceptación y compromiso. El pensamiento no cambia, pero cambia tu relación con él." },
  { t: "El mindfulness desapegado de Wells consiste en vaciar la mente.", r: "a", e: "No se trata de vaciar la mente, sino de dejar que un pensamiento esté ahí sin hacer nada con él, como el tigre del ejercicio." },
  { t: "Las preguntas abstractas de «por qué» alimentan el bucle, y las concretas ayudan a salir.", r: "b", e: "Preguntas como «¿qué pasó?» y «¿qué hago ahora?» ayudan a salir. Ese es el cambio que hace el formulario del «por qué» al «cómo»." },
  ]);

  LAB.quiz("pesadillas-mitos", [
  { t: "Ensayar de día una versión nueva de la pesadilla no sirve para nada.", r: "a", e: "El ensayo en imaginación consiste en cambiar un elemento del sueño y ensayar la versión nueva de día. En el estudio de Krakow y su equipo (2001, JAMA), tres sesiones bastaron para reducir las pesadillas." },
  { t: "Al despertar de una pesadilla, anclar la atención en lo que te rodea le avisa al cuerpo que ya no estás en el sueño.", r: "b", e: "Mirar, nombrar y sentir el apoyo son tres formas de avisarle al cuerpo dónde estás." },
  { t: "Para trabajar una pesadilla hay que escribir todos los detalles más dolorosos.", r: "a", e: "La consigna pide escribirla sin entrar en los detalles más dolorosos. Y si viene de un trauma, conviene hacerlo con acompañamiento profesional." },
  { t: "Escribir antes de dormir lo que da vueltas ayuda a separar lo que se puede hacer mañana de lo que solo se puede soltar.", r: "b", e: "Lo que se escribe deja de dar vueltas en la cabeza." },
  { t: "Si te despertás con calor o inquietud, lo mejor es mirar el reloj para saber cuánto falta.", r: "a", e: "El laboratorio sugiere destaparte un poco, tomar agua y volver a acostarte sin mirar el reloj." },
  { t: "Si las pesadillas se relacionan con una experiencia de violencia o trauma, no tenés que trabajarlas sola o solo.", r: "b", e: "Hay líneas de ayuda: el 144, el 911, el 135 (CABA y GBA) y el 0800-345-1435 (todo el país)." },
  ]);

  LAB.quiz("presencia-mitos", [
  { t: "Prestar atención plena es dejar la mente en blanco.", r: "a", e: "Es darte cuenta de que estabas en otro lado y volver: a la respiración, a los pies en el piso, al ruido de la calle." },
  { t: "Ir y volver con paciencia, una y otra vez, es la práctica.", r: "b", e: "Volver a la respiración cada vez que te distraés no es un fracaso: es la práctica misma." },
  { t: "La atención plena reemplaza un tratamiento.", r: "a", e: "No lo reemplaza, aunque puede ayudar a bajar la ansiedad y a tomar distancia de los pensamientos que no paran." },
  { t: "Exhalar más largo de lo que inhalás le indica al cuerpo que puede bajar la guardia.", r: "b", e: "Por eso el ritmo calmante de la respiración guiada es 4 · 6." },
  { t: "Es mejor practicar mucho de vez en cuando que poco y seguido.", r: "a", e: "El laboratorio propone lo contrario: un minuto alcanza, y es mejor poco y seguido que mucho de vez en cuando." },
  { t: "En algunas personas, sobre todo con historias de trauma, prestar atención al cuerpo puede traer malestar en lugar de calma.", r: "b", e: "Si te pasa, abrí los ojos, mirá a tu alrededor y volvé a algo concreto. No es un error tuyo: es una señal para hacerlo acompañado." },
  ]);

  LAB.quiz("psicoanalisis-practica-mitos", [
  { t: "Freud pidió a sus pacientes decir todo lo que se les ocurriera, sin seleccionar.", r: "b", e: "De ahí nació el método de la asociación libre. Escribir sin corregir durante unos minutos muestra qué se repite." },
  { t: "El objeto transicional de Winnicott sirve solo en la infancia.", r: "a", e: "Ese espacio intermedio también existe en los adultos: un lugar, una canción o un objeto que calma sin que tenga que estar otra persona." },
  { t: "Para Winnicott, el objeto transicional es la persona misma.", r: "a", e: "No es la persona, pero la representa en su ausencia. Ayuda a estar con uno mismo sin sentirse solo." },
  { t: "Bion describió la función contenedora: alguien que recibe una emoción confusa, la piensa y la devuelve en una forma comprensible.", r: "b", e: "Pensó que la mente se forma cuando alguien contiene lo que no podemos procesar solos. Hoy también podemos ser nuestro propio contenedor." },
  { t: "Kohut puso la empatía en un lugar secundario del trabajo terapéutico.", r: "a", e: "La puso en el centro: sentirse comprendido por otro permite crecer por dentro." },
  { t: "Si la asociación libre te desborda, podés cortar la práctica y apoyarte en la respiración.", r: "b", e: "Puede traer recuerdos o emociones intensas. Si se repite, conviene pedir acompañamiento." },
  ]);
})();
