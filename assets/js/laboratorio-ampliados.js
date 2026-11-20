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
})();
