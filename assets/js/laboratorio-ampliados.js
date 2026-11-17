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
    { t: "Estar en la naturaleza cura la depresión.", r: "a", e: "Los estudios sugieren beneficios sobre la rumiación y el ánimo, sobre todo a corto plazo y en personas sanas. No curan trastornos ni reemplazan un tratamiento." },
    { t: "Ver un paisaje desde la ventana se asoció con una recuperación más rápida en pacientes operados.", r: "b", e: "Es lo que encontró Ulrich en 1984, con registros de un hospital. Como no fue un ensayo al azar, hay que tomarlo como una pista." },
    { t: "Los animales de compañía no tienen ninguna relación con el bienestar emocional.", r: "a", e: "Hay asociaciones con menor soledad y mejor ánimo, pero la evidencia es mixta y muchas veces correlacional." }
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
})();
