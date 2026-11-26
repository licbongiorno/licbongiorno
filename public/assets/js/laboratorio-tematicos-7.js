/* Laboratorios temáticos (7): jeong, habla interna (Vygotsky), el yo y el nosotros (Markus y Kitayama) y los Yoga Sutras.
   Requiere lab-base.js. Nada se envía a ningún servidor. Los planes de 7 días y los formularios los maneja lab-base.js. */
(function () {
  "use strict";
  var LAB = window.LAB;
var OPS_SAUDADE = ["Nostalgia", "Saudade", "Duelo", "Conviene consultar"];
LAB.quiz("saudade-distinguir", [
  {"sinComillas": true, "t": "Huele pan dulce en diciembre y se acuerda de las navidades en la casa de su abuela, que murió hace doce años. Sonríe, se le humedecen los ojos y sigue con su día.", "ops": OPS_SAUDADE, "r": 0, "e": "Se parece a la nostalgia: un recuerdo cálido y agridulce de un pasado que ya no está, que acompaña sin paralizar. Un recuerdo así también puede tocar el duelo, y está bien."},
  {"sinComillas": true, "t": "Vive en otro país hace dos años. Extraña el olor a lluvia de su ciudad, la voz de sus amigos y el ritmo de las tardes. Sabe que puede volver de visita y se lo dice: «Tengo saudade».", "ops": OPS_SAUDADE, "r": 1, "e": "Es una saudade: la falta de algo que todavía existe y que se siente presente. Puede doler, pero no es una enfermedad y suele convivir con una vida que sigue."},
  {"sinComillas": true, "t": "Su madre murió hace cuatro meses. Llora seguido, se despierta buscando su voz y a veces se olvida de que ya no está.", "ops": OPS_SAUDADE, "r": 2, "e": "Es un duelo en curso: una respuesta esperable a la muerte de alguien querido, con altibajos. Ser acompañado ayuda, y consultar también es válido si lo necesitás."},
  {"sinComillas": true, "t": "Su hermano murió hace dos años. Casi no trabaja, no sale, siente que nada tiene sentido y piensa todo el día en que podría haberlo evitado.", "ops": OPS_SAUDADE, "r": 3, "e": "Conviene consultar. El dolor intenso y la preocupación constante que limitan la vida mucho tiempo después pueden ser un duelo prolongado, que tiene tratamiento. Si aparecen ideas de hacerse daño, buscá ayuda urgente."},
  {"sinComillas": true, "t": "Emigró hace cuatro años y no puede volver por ahora. Duerme mal, llora casi a diario, se aisló y ya no disfruta nada de lo que antes le gustaba.", "ops": OPS_SAUDADE, "r": 3, "e": "Conviene consultar. El duelo migratorio es real, pero cuando se suman insomnio, aislamiento y pérdida del disfrute durante meses, un profesional puede acompañar y evaluar si hay una depresión."},
  {"sinComillas": true, "t": "Cada tanto escucha una canción de la época en que vivía con su ex y siente una mezcla de ternura y tristeza. Después se prepara la cena y se pone a leer.", "ops": OPS_SAUDADE, "r": 0, "e": "Es nostalgia: la mirada afectuosa a un pasado cerrado que no interrumpe la vida. Para la investigación, ese tipo de recuerdo suele dar sensación de continuidad y de conexión."},
  {"sinComillas": true, "t": "Un amigo se mudó a Lisboa. Cada tanto le escribe «me hacés falta», le manda audios y planea una visita. Lo extraña, y se alegra de que le vaya bien.", "ops": OPS_SAUDADE, "r": 1, "e": "Es saudade: se extraña a alguien presente en la vida, con cariño y con la posibilidad de un reencuentro. No necesita resolverse: se puede llevar así."}
]);
LAB.quiz("saudade-mitos", [
  {"t": "La saudade es una palabra intraducible: no existe nada parecido en otros idiomas.", "r": "a", "e": "Es una exageración. Hay palabras cercanas, como añoranza, morriña, hiraeth en galés o Sehnsucht en alemán, aunque ninguna coincide exactamente. Lo que sí es particular es su peso cultural en el mundo lusófono."},
  {"t": "La nostalgia llegó a considerarse una enfermedad médica.", "r": "b", "e": "Johannes Hofer la describió en 1688 como una dolencia de soldados suizos lejos de casa. Hoy se la estudia como una emoción corriente, agridulce, y no como un trastorno."},
  {"t": "La investigación de Sedikides y Wildschut encontró que la nostalgia suele aumentar la sensación de conexión social y de que la vida tiene sentido.", "r": "b", "e": "Es un hallazgo repetido en sus experimentos, con matices: muchas muestras son de países occidentales o de estudiantes, y no a todos les sienta igual. No es un tratamiento."},
  {"t": "Extrañar mucho es señal de que algo anda mal.", "r": "a", "e": "Extrañar es esperable cuando algo o alguien importante no está. Lo que importa es cuánto limita tu vida y cuánto dura."},
  {"t": "Saudade y duelo son lo mismo.", "r": "a", "e": "Se parecen en el anhelo y comparten territorio, pero el duelo responde a una pérdida concreta, sobre todo una muerte, y tiene su propio recorrido. La saudade también se siente por lo que sigue existiendo."},
  {"t": "Si pasó un año de la muerte de alguien y todavía duele, hay un trastorno.", "r": "a", "e": "Seguir sintiendo dolor es esperable. Se habla de duelo prolongado cuando, pasados 12 meses en adultos (6 según la CIE-11), el anhelo y la preocupación siguen siendo muy intensos y limitan el funcionamiento diario."},
  {"t": "Tras emigrar, extrañar el lugar de origen es normal.", "r": "b", "e": "Es una de las experiencias más comunes del desarraigo. Si se suman insomnio, aislamiento o desesperanza persistentes, conviene consultar."},
  {"t": "Lo mejor para sufrir menos es evitar todo lo que recuerda a lo perdido.", "r": "a", "e": "Evitarlo todo suele mantener el dolor. El modelo del proceso dual (Stroebe y Schut, 1999) describe el vaivén entre mirar la pérdida y ocuparse de la vida como un modo saludable de transitar un duelo."},
  {"t": "Escribirle una carta a lo que extrañás reemplaza una consulta cuando el dolor te desborda.", "r": "a", "e": "Escribir puede acompañar, pero no sustituye una consulta si el dolor es intenso, dura mucho o aparecen ideas de hacerte daño."}
]);
LAB.quiz("interser-mitos", [
  {"t": "Thich Nhat Hanh inventó el mindfulness.", "r": "a", "e": "La atención plena viene de la tradición budista, mucho más antigua que él. Kabat-Zinn creó en 1979 el programa secular MBSR; Thich Nhat Hanh fue una influencia importante en su difusión, entre otras."},
  {"t": "El interser plantea que nada existe por sí solo, sino en relación con otras cosas.", "r": "b", "e": "Es la idea central: una hoja de papel contiene la nube, el árbol y el leñador. Es una enseñanza budista, no un resultado de la psicología experimental."},
  {"t": "Hay que ser budista para caminar con atención.", "r": "a", "e": "No hace falta. Quien lo vive como práctica religiosa merece respeto, y quien lo toma como un ejercicio de atención puede hacerlo sabiendo de dónde viene."},
  {"t": "Los programas de atención plena tienen apoyo moderado para la ansiedad, la depresión y el dolor, pero la calidad de los estudios es dispareja.", "r": "b", "e": "Es lo que halló la revisión de Goyal y colegas (2014), con matices: poca evidencia en otras áreas y sin ventaja clara sobre otros tratamientos activos. Van Dam y colegas (2018) pidieron cautela con las promesas."},
  {"t": "La atención plena reemplaza el tratamiento de una depresión o un trastorno de ansiedad.", "r": "a", "e": "Puede ser un complemento en algunos casos, pero no sustituye una evaluación ni un tratamiento. Si el malestar es intenso o dura, conviene consultar."},
  {"t": "Las prácticas contemplativas pueden traer efectos desagradables en algunas personas.", "r": "b", "e": "Se describieron más ansiedad, recuerdos intensos o sensación de desconexión (Lindahl y colegas, 2017). Si te pasa, podés parar y consultar."},
  {"t": "Si la mente se distrae durante la caminata, la estás haciendo mal.", "r": "a", "e": "Distraerse es lo esperable. Darte cuenta y volver al paso es la práctica misma."},
  {"t": "Los gathas son oraciones para pedirle algo a una divinidad.", "r": "a", "e": "Son versos breves para acompañar la respiración o un gesto cotidiano y recordar la atención. En la tradición tienen un marco budista, pero no hace falta creer nada para probar uno."},
  {"t": "El interser significa que todo es lo mismo y que por eso no hay que poner límites.", "r": "a", "e": "Dice que nada existe aislado, no que no haya diferencias. Thich Nhat Hanh insistía además en la acción: ver la interdependencia no obliga a tolerar el daño."}
]);
var OPS_ISUMA_SITUACIONES = ["Contiene y piensa antes de actuar", "Descarga el enojo sobre otros", "Lo reprime y lo guarda sin procesar"];
LAB.quiz("isuma-situaciones", [
  {"sinComillas": true, "t": "Un hombre se siente muy irritado por un comentario de su cuñada. Respira, sale un momento al patio y, cuando vuelve, le dice con calma que eso le molestó.", "ops": OPS_ISUMA_SITUACIONES, "r": 0, "e": "Sintió el enojo, se dio una pausa y después lo dijo con calma. Es parecido a lo que la idea de isuma propone: pensar antes de actuar, sin negar lo que se siente."},
  {"sinComillas": true, "t": "Una mujer recibe una crítica en una reunión y grita delante de todos hasta que la otra persona se va llorando.", "ops": OPS_ISUMA_SITUACIONES, "r": 1, "e": "Es una descarga: el enojo salió sin pensar y cayó sobre otra persona. Entender el enojo no obliga a justificar el daño."},
  {"sinComillas": true, "t": "Un joven se enoja con su jefe todos los días, pero sonríe, dice que no pasa nada y se queda con un nudo en el estómago que ya lleva meses.", "ops": OPS_ISUMA_SITUACIONES, "r": 2, "e": "Contener sin procesar no es lo mismo que manejar. El enojo sigue ahí y pasa factura en el cuerpo y en el ánimo, justo lo que Briggs y la clínica advierten."},
  {"sinComillas": true, "t": "Una madre ve que su hijo de tres años tira un juguete furioso. Espera, le pregunta si se enojó porque se le rompió y lo acompaña un rato antes de hablar.", "ops": OPS_ISUMA_SITUACIONES, "r": 0, "e": "No lo reta ni lo ignora: lo acompaña y usa una pregunta. Es el tipo de guía paciente que Briggs describió hacia los niños chicos, que todavía no tienen isuma."},
  {"sinComillas": true, "t": "Una mujer no dice nada cuando su pareja la insulta, por miedo a cómo reaccionaría si le contesta.", "ops": OPS_ISUMA_SITUACIONES, "r": 2, "e": "Acá callar es protegerse de un riesgo, no madurez ni calma. Si hay miedo o maltrato, el tema es la violencia y no el manejo del enojo, y conviene pedir ayuda."},
  {"sinComillas": true, "t": "Un hombre siente que el enojo le sube y avisa: «Necesito un rato, después lo hablamos». Sale a caminar y vuelve a la hora.", "ops": OPS_ISUMA_SITUACIONES, "r": 0, "e": "Se retira para no actuar con el impulso, avisa que vuelve y retoma la conversación. Es una pausa con regreso, distinta de la evitación."}
]);
LAB.quiz("isuma-mitos", [
  {"t": "Los inuit no sienten enojo.", "r": "a", "e": "Briggs aclaró que el enojo, los celos y los conflictos existían. Lo que describió es cómo se expresaban y qué se esperaba hacer con ellos."},
  {"t": "Never in Anger es una etnografía de una comunidad utku muy pequeña, de mediados del siglo XX.", "r": "b", "e": "Briggs vivió entre 1963 y 1965 con unas pocas familias utku en el Ártico canadiense. No describe a todos los inuit ni a los de hoy."},
  {"t": "Isuma significa solamente «inteligencia».", "r": "a", "e": "Se traduce como mente, pensamiento y razón, y también como juicio o madurez. Para Briggs nombra la capacidad de pensar y no actuar por impulso, y se adquiere con los años."},
  {"t": "Según Briggs, los chicos pequeños todavía no tienen isuma y se los trata con mucha paciencia cuando se enojan.", "r": "b", "e": "Los adultos toleraban los enojos de los niños chicos y los iban guiando con preguntas, bromas y pequeñas escenas, no con castigos físicos ni gritos."},
  {"t": "Reprimir el enojo es la solución, y por eso conviene imitar a los utku.", "r": "a", "e": "Contener no es lo mismo que no sentir, y guardar el enojo también tiene costos. Además, la propia Briggs vio las tensiones de ese modo de vida, y su cultura cambió mucho desde entonces."},
  {"t": "Cuando Briggs mostró su irritación, la comunidad la apartó durante un tiempo.", "r": "b", "e": "El silencio le hizo ver cuánto amenazaba el enojo abierto la convivencia en un lugar donde la supervivencia dependía de cooperar. Después el vínculo se restableció."},
  {"t": "Hay estudios clínicos que prueban que el método inuit sirve para tratar el enojo.", "r": "a", "e": "No lo hay: es una descripción etnográfica, no un método terapéutico. Sirve para pensar la relación entre emoción y juicio, con cuidado de no exotizar."},
  {"t": "Si el enojo viene de una situación de maltrato, el problema es aprender a contenerse.", "r": "a", "e": "En una situación de violencia o miedo, callar o aguantar puede ser un riesgo. Lo que corresponde es protegerse y pedir ayuda, no ejercitar la calma."}
]);
LAB.quiz("dadirri-mitos", [
  {"t": "Dadirri es una técnica de meditación que se aprende en cinco minutos.", "r": "a", "e": "Es una forma de relación de los pueblos del río Daly, ligada a la comunidad, a los ancianos y al territorio. Quienes lo explican cuentan que se aprende conviviendo, no con una lista de pasos."},
  {"t": "Miriam-Rose Ungunmerr-Baumann, anciana de Nauiyu, fue quien dio a conocer el dadirri fuera de su pueblo.", "r": "b", "e": "Lo ofreció como un regalo de su gente al resto del país, en un escrito que circula desde fines de los años ochenta."},
  {"t": "Dadirri es lo mismo que el mindfulness con otro nombre.", "r": "a", "e": "Se parecen en la atención y el silencio. Pero tienen otro origen, otra lengua, otro sentido comunitario y espiritual, y el mindfulness tiene ensayos clínicos que dadirri no tiene ni necesita."},
  {"t": "Dadirri tiene estudios clínicos que prueban que sirve para tratar la ansiedad.", "r": "a", "e": "No los hay, y no corresponde pedírselos: no se lo presenta como tratamiento. Tiene lugar sobre todo en la investigación cualitativa indígena y en prácticas de salud respetuosas."},
  {"t": "Esperar sin apurar y aceptar los silencios es una pauta que se cita en la atención de salud a personas aborígenes.", "r": "b", "e": "Se la menciona como principio de atención respetuosa, y se relaciona con el yarning, la conversación como método descripto por Bessarab y Ng'andu."},
  {"t": "Si hago un ejercicio de escucha inspirado en el dadirri, puedo decir que practico dadirri.", "r": "a", "e": "Conviene distinguir inspiración de práctica. Podés decir que una forma de escuchar te inspiró y de dónde viene, sin afirmar que practicás lo que pertenece a otro pueblo."},
  {"t": "Nombrar la fuente y el pueblo ayuda a no apropiarse de una palabra.", "r": "b", "e": "Decir quién la compartió, de qué pueblo y lugar viene, y no hablar de una «antigua sabiduría aborigen» en general, es una de las pautas más básicas."},
  {"t": "Escuchar en silencio siempre le hace bien a todo el mundo.", "r": "a", "e": "A algunas personas el silencio les trae angustia o recuerdos dolorosos. En ese caso conviene cortar y buscar compañía o una consulta, sin forzarse."}
]);
  /* Te Whare Tapa Whā */
  var OPS_WHARE = ["Tinana (cuerpo)", "Hinengaro (mente y emociones)", "Whānau (vínculos)", "Wairua (sentido)"];
  LAB.quiz("whare-paredes-floja", [
    {"sinComillas": true, "t": "Hace tres semanas que duerme cuatro horas por noche y se enferma seguido, aunque en el trabajo y con sus amigos todo marcha bien.", "ops": OPS_WHARE, "r": 0, "e": "La pared más comprometida es el cuerpo. Dormir poco también pesa sobre el ánimo, lo que muestra cómo una pared floja carga a las otras."},
    {"sinComillas": true, "t": "Se despierta con la cabeza llena de preocupaciones, se critica todo el día y le cuesta ponerle nombre a lo que siente.", "ops": OPS_WHARE, "r": 1, "e": "Tiene que ver sobre todo con el hinengaro: pensamientos y emociones. Si dura mucho o se intensifica, conviene consultar."},
    {"sinComillas": true, "t": "Se mudó de ciudad hace un año, hace ejercicio y trabaja bien, pero no tiene a nadie a quien llamar un sábado a la noche.", "ops": OPS_WHARE, "r": 2, "e": "La pared floja es la whānau: familia y vínculos. Puede apuntalarse de a poco con pequeños contactos regulares."},
    {"sinComillas": true, "t": "Tiene trabajo, salud y gente que lo quiere, pero siente que nada de lo que hace tiene sentido ni lo conecta con algo que le importe.", "ops": OPS_WHARE, "r": 3, "e": "Se parece a una pared wairua floja. Wairua es más amplio que religión: incluye valores, pertenencia y conexión con algo mayor. Si el vacío es muy fuerte o viene con tristeza profunda, conviene consultar."},
    {"sinComillas": true, "t": "Después de un duelo, dejó de comer bien, no sale de casa y evita a su familia.", "ops": OPS_WHARE, "r": 2, "e": "Hay varias paredes tocadas. La más urgente de apuntalar suele ser la whānau: no quedarse solo. Un duelo prolongado merece acompañamiento profesional."},
    {"sinComillas": true, "t": "Cuida a su padre enfermo, cumple con todo y se olvidó de ver a su médica, de caminar y de comer sentada.", "ops": OPS_WHARE, "r": 0, "e": "El cuidado de otros dejó floja la pared del cuerpo. Cuidar también requiere ser cuidado."}
  ]);
  LAB.quiz("whare-mitos", [
    {"t": "Te Whare Tapa Whā es una escala validada que mide el bienestar con un puntaje.", "r": "a", "e": "Es un marco conceptual y de salud pública, no una escala. Ofrece un lenguaje y una lista de cosas para mirar."},
    {"t": "El modelo lo propuso el psiquiatra maorí Mason Durie en 1984.", "r": "b", "e": "Durie lo presentó en 1984 y lo desarrolló en Whaiora: Māori Health Development (1998, 2.ª ed.)."},
    {"t": "Wairua significa lo mismo que religión.", "r": "a", "e": "Es más amplio: el espíritu y la relación con lo que da sentido, incluida la naturaleza, los antepasados y los valores. Puede incluir una fe, pero no la exige."},
    {"t": "Si una pared falla, las demás también se resienten.", "r": "b", "e": "Es la idea central del modelo: la casa se sostiene con todas sus paredes."},
    {"t": "Cualquiera puede usar el modelo sin conocer su origen cultural.", "r": "a", "e": "Es un modelo maorí, creado dentro de una visión del mundo propia. Conviene usarlo con respeto, citar la fuente y no presentarlo como invención propia."},
    {"t": "Las desigualdades de salud de la población maorí se explican por rasgos del pueblo.", "r": "a", "e": "Se vinculan con pobreza, discriminación y colonización, según los informes neozelandeses como He Ara Oranga (2018)."},
    {"t": "Una de las paredes del modelo es la familia y los vínculos.", "r": "b", "e": "Es taha whānau, junto con taha tinana, taha hinengaro y taha wairua."},
    {"t": "Apuntalar una pared reemplaza la consulta profesional cuando el sufrimiento es intenso.", "r": "a", "e": "Los puntales ayudan con lo cotidiano. Si el malestar es fuerte o dura, conviene consultar."}
  ]);
  LAB.quiz("musar-mitos", [
    {"t": "El musar es una técnica psicológica con eficacia comprobada.", "r": "a", "e": "Es una práctica ética y religiosa de unos dos siglos como movimiento, con raíces más antiguas. No tiene ensayos clínicos propios que se conozcan con certeza y no corresponde presentarlo como terapia."},
    {"t": "Hace falta ser religioso para probar un ejercicio de middá.", "r": "a", "e": "Quien lo practica dentro del judaísmo lo hace por convicción religiosa, y eso merece respeto. Pero la idea de elegir un rasgo, observarlo y registrarlo puede tomarse como reflexión ética sin adherir a la fe."},
    {"t": "Estudiar sobre la humildad no vuelve humilde a nadie.", "r": "b", "e": "Es una observación central de Salanter: las pasiones pesan más sobre la conducta que el conocimiento. Por eso el musar insiste en la práctica, la repetición y el acompañamiento."},
    {"t": "Maimónides decía que la virtud es el punto exacto en el medio, igual para todos.", "r": "a", "e": "Describió un camino medio que depende de la persona y la situación, y aclaró que a veces conviene inclinarse hacia el extremo opuesto un tiempo para corregirse, y que en el caso de la soberbia y la ira hay que alejarse más."},
    {"t": "El jeshbon hanefesh es una lista de culpas.", "r": "a", "e": "Es una cuenta, un registro para ordenar y aprender. Si se vuelve una máquina de autoacusación deja de cumplir su fin, y la tradición misma advierte contra la tristeza que paraliza."},
    {"t": "Llevar un registro y trabajar un rasgo por vez se parece a técnicas conocidas de la psicología.", "r": "b", "e": "Se parece al automonitoreo de las terapias conductuales y a la fijación de un objetivo único. Es una coincidencia de forma: no prueba que el musar funcione en términos clínicos."},
    {"t": "Si tenés tendencia a la autoexigencia, este tipo de ejercicio te va a ayudar igual.", "r": "a", "e": "Puede empeorar las cosas, sobre todo con perfeccionismo, depresión o pensamientos obsesivos. En ese caso conviene hacerlo con acompañamiento, o no hacerlo."}
  ]);
  LAB.quiz("lojong-mitos", [
    {"t": "«Echá todas las culpas a uno solo» significa que todo es culpa tuya.", "r": "a", "e": "Los comentarios lo leen como una invitación a soltar la actitud de defenderse siempre y mirar la propia reacción. No pretende que una persona herida se declare responsable de lo que otros le hicieron."},
    {"t": "Hay que ser budista para probar el lojong.", "r": "a", "e": "Es una práctica religiosa dentro del budismo tibetano, y quien la vive así merece respeto. Algunas ideas, como la gratitud o la mirada sobre el apego a uno mismo, pueden tomarse como reflexión, sabiendo de dónde vienen."},
    {"t": "Las 59 consignas tienen una única traducción correcta.", "r": "a", "e": "Las traducciones varían bastante y cada comentarista las interpreta a su modo, desde Jamgön Kongtrül hasta Trungpa o Pema Chödrön."},
    {"t": "El objetivo del lojong es anularse o despreciarse.", "r": "a", "e": "Los maestros aclaran que la autoestima rota no es el objetivo. Se entrena una actitud que ponga a los demás al menos a la par."},
    {"t": "Usar una consigna para no sentir algo es una forma de bypass espiritual.", "r": "b", "e": "John Welwood describió el bypass espiritual como usar lo espiritual para esquivar asuntos emocionales. Con el lojong, el riesgo es apurarse a agradecer o a estar alegre sin haber sentido primero."},
    {"t": "Los programas de compasión inspirados en el lojong ya están firmemente probados.", "r": "a", "e": "Una revisión de 2017 (Kirby, Tellegen y Steindl) halló efectos moderados en algunas medidas, junto con muestras chicas y comparaciones débiles. El panorama es alentador y preliminar, y lo estudiado es la versión secular, no el lojong tradicional."},
    {"t": "Si una consigna te hace sentir peor, la estás haciendo mal.", "r": "a", "e": "Puede ser una señal legítima de que no es el momento. Con duelo reciente, trauma o autoculpa intensa, conviene hacerlo con acompañamiento o dejarlo."}
  ]);
  LAB.quiz("epicureo-mitos", [
    {"t": "El epicureísmo consiste en darse todos los gustos.", "r": "a", "e": "Epicuro hablaba de un placer que se alcanza con poco: la ausencia de dolor y de perturbación. Advertía que muchos placeres traen más pena que gozo. El uso moderno de «epicúreo» como sinónimo de glotón lo deformó."},
    {"t": "Epicuro daba a la amistad un lugar central.", "r": "b", "e": "Entre sus Máximas capitales dice que, de todo lo que la sabiduría procura para la vida entera, lo más grande es la posesión de la amistad. El Jardín era una comunidad de amigos."},
    {"t": "Todos los deseos son igual de peligrosos.", "r": "a", "e": "Distinguía tres clases. Los naturales y necesarios son sanos y fáciles de cubrir; los vanos, sin medida natural, son los que inquietan."},
    {"t": "El tetrafármaco está comprobado como tratamiento de la ansiedad.", "r": "a", "e": "Es una fórmula filosófica antigua, conocida por un papiro de Filodemo. Se parece en la forma a técnicas de reestructuración de miedos, pero no se estudió como tratamiento y no reemplaza una consulta."},
    {"t": "Según Epicuro, no hay razón para temerle a la muerte.", "r": "b", "e": "Es su argumento: cuando estamos nosotros no está ella, y cuando ella está ya no estamos. Es un argumento que se discute hasta hoy, y no todas las personas lo sienten consolador."},
    {"t": "La ataraxia es no sentir nada.", "r": "a", "e": "Es sosiego, ausencia de perturbación evitable. No pide anular emociones ni negar el dolor, y no se alcanza de una vez para siempre."},
    {"t": "Las relaciones cercanas se asocian con mejor salud y menor mortalidad.", "r": "b", "e": "El metaanálisis de Holt-Lunstad y colaboradores (2010) encontró asociación entre relaciones sociales sólidas y menor mortalidad. Es una asociación de estudios observacionales, y no demuestra que el Jardín funcionara."}
  ]);
  /* Ubuntu */
  var OPS_UBUNTU = ["Apoyo mutuo", "Presión comunitaria", "Ninguno de los dos"];
  LAB.quiz("ubuntu-apoyo-presion", [
    {"sinComillas": true, "t": "Los vecinos de una cuadra se turnan para llevar comida a una familia cuyo hijo está internado.", "ops": OPS_UBUNTU, "r": 0, "e": "Es apoyo mutuo: se da hoy porque mañana puede tocar recibir. Reciprocidad que no es inmediata ni idéntica."},
    {"sinComillas": true, "t": "Una joven quiere estudiar en otra ciudad y la familia le dice que si se va deja mal parados a todos.", "ops": OPS_UBUNTU, "r": 1, "e": "La pertenencia se usa para frenar una decisión propia. Es presión comunitaria, aunque venga con afecto."},
    {"sinComillas": true, "t": "Un grupo de amigas organiza una colecta para pagar el tratamiento de una de ellas.", "ops": OPS_UBUNTU, "r": 0, "e": "Es apoyo mutuo, con una necesidad real y una respuesta compartida."},
    {"sinComillas": true, "t": "Un dirigente pide a los vecinos aguantar los cortes de agua en nombre de «la unidad», sin dar explicaciones.", "ops": OPS_UBUNTU, "r": 1, "e": "Es el uso político que señalaron críticos como Matolino y Kwindingwi: invocar la armonía para pedir sacrificios sin rendir cuentas."},
    {"sinComillas": true, "t": "Una persona decide mudarse sola a otro país después de hablarlo con su familia, que no está de acuerdo pero la acompaña.", "ops": OPS_UBUNTU, "r": 2, "e": "Hay una decisión propia y un vínculo que sigue. Ni presión ni apoyo pleno: pertenecer y elegir pueden convivir."},
    {"sinComillas": true, "t": "En una familia, nadie habla del maltrato de un tío para no romper la unidad.", "ops": OPS_UBUNTU, "r": 1, "e": "La unidad se usa para tapar un daño. Pertenecer no obliga a callar el maltrato."},
    {"sinComillas": true, "t": "Una mujer le pide a su hermana que la acompañe a un trámite difícil, y la hermana la acompaña sin hacer preguntas.", "ops": OPS_UBUNTU, "r": 0, "e": "Pedir y recibir ayuda es parte de la reciprocidad. Pedir también es una forma de pertenecer."}
  ]);
  LAB.quiz("ubuntu-mitos", [
    {"t": "Ubuntu es un concepto de toda África.", "r": "a", "e": "Viene de las lenguas nguni del sur de África. El continente tiene más de cincuenta países y miles de lenguas, y hablar de «psicología africana» en singular es una simplificación."},
    {"t": "El proverbio umuntu ngumuntu ngabantu se traduce como «una persona es persona a través de otras personas».", "r": "b", "e": "Es la traducción más citada, que Desmond Tutu popularizó en el mundo."},
    {"t": "El ubuntu es una teoría psicológica con validación empírica.", "r": "a", "e": "Es una filosofía de la persona, con una larga discusión académica. Sirve como hipótesis, no como dato."},
    {"t": "Para Ifeanyi Menkiti, la condición de persona se alcanza a lo largo de la vida.", "r": "b", "e": "Lo sostuvo en 1984, con la idea de que se llega a ser persona con ritos y con responsabilidades hacia la comunidad."},
    {"t": "Pensadores africanos criticaron el uso del ubuntu como consigna.", "r": "b", "e": "Matolino y Kwindingwi (2013), entre otros, advirtieron que puede tapar desigualdades y pedir sacrificios injustos."},
    {"t": "Vivir en comunidad garantiza que nadie quede solo ni sufra.", "r": "a", "e": "Ninguna comunidad es armoniosa por definición. Idealizar es otra forma de no escuchar."},
    {"t": "Pertenecer a una comunidad obliga a aceptar cualquier cosa del grupo.", "r": "a", "e": "La pertenencia no obliga a callar el maltrato ni a anular lo propio. Gyekye propuso un comunitarismo moderado que conserva la capacidad de elegir."},
    {"t": "Los lazos sociales importan para la salud.", "r": "b", "e": "Un metaanálisis de Holt-Lunstad y colegas (2010) vinculó las relaciones sociales con la supervivencia. No prueba el ubuntu, pero la pregunta por los lazos es seria."}
  ]);
  if (!LAB) return;

  /* Jeong */
  var OPS_JEONG_GOUN_MIUN = ["Goun jeong", "Miun jeong", "Ninguno de los dos"];
  LAB.quiz("jeong-goun-miun", [
    {"sinComillas": true, "t": "Dos amigas de la infancia se juntan cada verano a tomar mate en la misma plaza y se ríen de las mismas historias.", "ops": OPS_JEONG_GOUN_MIUN, "r": 0, "e": "El lazo se alimentó de momentos lindos compartidos durante años. Es el goun jeong."},
    {"sinComillas": true, "t": "Un hombre se queja todo el tiempo de su cuñado, pero cuando este se enferma es el primero en ir al hospital.", "ops": OPS_JEONG_GOUN_MIUN, "r": 1, "e": "El fastidio y el cariño conviven. Es el ejemplo típico de miun jeong: un afecto que se formó también con los roces."},
    {"sinComillas": true, "t": "Una mujer sigue con su pareja porque él la amenaza si intenta irse.", "ops": OPS_JEONG_GOUN_MIUN, "r": 2, "e": "Esto no es jeong, sino una relación de control y violencia. El tiempo compartido no la vuelve un lazo de cariño, y conviene pedir ayuda."},
    {"sinComillas": true, "t": "Un vecino y otro discutieron por años por el ruido; cuando uno se muda, el otro le regala una planta para la casa nueva.", "ops": OPS_JEONG_GOUN_MIUN, "r": 1, "e": "Detrás de las discusiones se fue formando un lazo. La despedida lo deja ver."},
    {"sinComillas": true, "t": "Una abuela y su nieta cocinan juntas todos los domingos desde que la nieta tenía cinco años.", "ops": OPS_JEONG_GOUN_MIUN, "r": 0, "e": "Un ritual compartido y querido sostiene el vínculo. Es goun jeong."},
    {"sinComillas": true, "t": "Alguien conoce a una persona en una fiesta y a la semana dice que es su alma gemela.", "ops": OPS_JEONG_GOUN_MIUN, "r": 2, "e": "Puede ser un comienzo lindo, pero el jeong, por definición, necesita tiempo. Todavía no hubo historia compartida."},
    {"sinComillas": true, "t": "Dos compañeros de oficina se pelean seguido por el aire acondicionado, pero se cubren el uno al otro cuando alguno tiene un problema.", "ops": OPS_JEONG_GOUN_MIUN, "r": 1, "e": "El roce cotidiano y el cuidado mutuo conviven. Es miun jeong."},
    {"sinComillas": true, "t": "Una persona visita a su madre solo por culpa, se siente mal cada vez y no encuentra nada que la una a ella más que la obligación.", "ops": OPS_JEONG_GOUN_MIUN, "r": 2, "e": "Puede haber deber o culpa sin jeong. No es un juicio: a veces la historia no dejó ese depósito de afecto, y entenderlo también ayuda."}
  ]);
  LAB.quiz("jeong-mitos", [
    {"t": "El jeong es un diagnóstico psicológico.", "r": "a", "e": "Es un concepto cultural coreano, estudiado por la psicología cultural (Choi Sang-chin y colaboradores), no un diagnóstico."},
    {"t": "Según la expresión coreana, se puede tener jeong por alguien que también nos irrita.", "r": "b", "e": "Es lo que nombra <em>miun jeong goun jeong</em>: hay un jeong que nace de lo lindo y otro que nace incluso de los roces."},
    {"t": "El jeong aparece de golpe, como un flechazo.", "r": "a", "e": "Lo que lo caracteriza es que se acumula con el tiempo compartido y la convivencia."},
    {"t": "Tendemos a valorar mejor lo que vemos con frecuencia.", "r": "b", "e": "Es el efecto de mera exposición que describió Robert Zajonc en 1968. Tiene límites: con lo que de entrada desagrada mucho, la exposición repetida no siempre ayuda."},
    {"t": "Para que un conocido se vuelva amigo alcanza con coincidir en el mismo lugar muchas horas.", "r": "a", "e": "Jeffrey Hall (2019) encontró que importa el tipo de tiempo: conversar y hacer cosas juntos pesa más que solo coincidir."},
    {"t": "Querer a un familiar y a la vez sentirse molesto con él es señal de que el vínculo está roto.", "r": "a", "e": "Lüscher y Pillemer (1998) describieron la ambivalencia como algo frecuente en los vínculos familiares."},
    {"t": "Si hay mucho jeong, hay que tolerar cualquier cosa del otro.", "r": "a", "e": "El cariño acumulado no obliga a soportar el maltrato. Si un vínculo te hace daño, conviene pedir ayuda."},
    {"t": "Los gestos pequeños y repetidos ayudan a sostener un vínculo.", "r": "b", "e": "John Gottman describió cómo las respuestas a los pequeños intentos de conexión construyen o desgastan una relación con el tiempo."}
  ]);

  /* Habla interna */
  var OPS_HABLA_INSTRUCCION_ANIMO_CRITICA = ["Instrucción", "Ánimo", "Crítica"];
  LAB.quiz("habla-instruccion-animo-critica", [
    {"sinComillas": true, "t": "«Primero leo todas las preguntas, después empiezo por la que sé.»", "ops": OPS_HABLA_INSTRUCCION_ANIMO_CRITICA, "r": 0, "e": "Organiza la tarea paso a paso. Es la función de autoinstrucción que estudió Meichenbaum."},
    {"sinComillas": true, "t": "«Sos un desastre, siempre te pasa lo mismo.»", "ops": OPS_HABLA_INSTRUCCION_ANIMO_CRITICA, "r": 2, "e": "Juzga a la persona y generaliza. Este tipo de frase suele aumentar la ansiedad y no ayuda a resolver nada."},
    {"sinComillas": true, "t": "«Vamos, ya hiciste cosas más difíciles que esta.»", "ops": OPS_HABLA_INSTRUCCION_ANIMO_CRITICA, "r": 1, "e": "Sostiene el esfuerzo recordando experiencias previas. Hablarse en segunda persona, además, ayuda a tomar distancia."},
    {"sinComillas": true, "t": "«Despacio: la llave grande va abajo, la chica arriba.»", "ops": OPS_HABLA_INSTRUCCION_ANIMO_CRITICA, "r": 0, "e": "Es una instrucción concreta, como la del chico que arma la torre de bloques."},
    {"sinComillas": true, "t": "«¿Cómo pudiste olvidarte? Nadie es tan tonto.»", "ops": OPS_HABLA_INSTRUCCION_ANIMO_CRITICA, "r": 2, "e": "Es una voz autocrítica dura. En la terapia centrada en la compasión se trabaja para que esa voz pueda convivir con otra más amable."},
    {"sinComillas": true, "t": "«Está bien estar nervioso/a, es una entrevista importante.»", "ops": OPS_HABLA_INSTRUCCION_ANIMO_CRITICA, "r": 1, "e": "Valida la emoción y acompaña. No niega el nervio: lo pone en contexto."},
    {"sinComillas": true, "t": "«Respiro, miro el semáforo, pongo primera.»", "ops": OPS_HABLA_INSTRUCCION_ANIMO_CRITICA, "r": 0, "e": "Guía la acción en una situación que requiere atención. Mucha gente se habla así cuando aprende a manejar."},
    {"sinComillas": true, "t": "«No vas a poder, mejor ni lo intentes.»", "ops": OPS_HABLA_INSTRUCCION_ANIMO_CRITICA, "r": 2, "e": "Anticipa el fracaso y desalienta. A veces se presenta como prudencia, pero funciona como crítica."}
  ]);
  LAB.quiz("habla-interna-mitos", [
    {"t": "Para Vygotsky, el habla de los chicos que juegan hablando solos desaparece con la edad.", "r": "a", "e": "Esa era la idea de Piaget. Vygotsky propuso que ese habla se interioriza y se transforma en habla interna."},
    {"t": "El habla interna suele ser más abreviada que el habla en voz alta.", "r": "b", "e": "Vygotsky la describió como condensada y fragmentaria, y la investigación posterior lo confirma en buena medida."},
    {"t": "Todas las personas piensan todo el tiempo con palabras.", "r": "a", "e": "Con su método de muestreo de la experiencia, Russell Hurlburt encontró una gran variedad: imágenes, sensaciones y pensamiento sin palabras son frecuentes."},
    {"t": "Hablarse en segunda persona puede ayudar a tomar distancia en situaciones de estrés.", "r": "b", "e": "Es lo que encontraron Ethan Kross y sus colegas en 2014."},
    {"t": "Hablar solo es señal de que algo anda mal.", "r": "a", "e": "Hablarse en voz alta o en voz baja es frecuente y suele ayudar a organizar una tarea. Lo que conviene consultar son las voces que se sienten ajenas o que dan órdenes."},
    {"t": "Darse instrucciones paso a paso es una técnica usada en terapia.", "r": "b", "e": "Donald Meichenbaum desarrolló el entrenamiento en autoinstrucciones a comienzos de los años setenta."},
    {"t": "Una voz interna muy crítica ayuda a rendir más.", "r": "a", "e": "La autocrítica constante suele asociarse con más ansiedad y menos capacidad de resolver problemas. Una voz firme y amable puede exigir sin castigar."},
    {"t": "Nos hablamos, en parte, como nos hablaron.", "r": "b", "e": "Es una lectura posible de la idea de internalización de Vygotsky: lo que primero ocurre entre personas pasa luego a funcionar dentro de cada uno."}
  ]);

  /* Yo y nosotros */
  var OPS_YYN_SITUACIONES = ["Más independiente", "Más interdependiente", "Ambas a la vez"];
  LAB.quiz("yyn-situaciones", [
    {"sinComillas": true, "t": "Una estudiante elige su carrera según lo que le apasiona, aunque su familia preferiría otra.", "ops": OPS_YYN_SITUACIONES, "r": 0, "e": "Pone en primer plano los deseos personales. Es una elección típica del yo independiente, que no significa desinterés por la familia."},
    {"sinComillas": true, "t": "Un empleado no dice en la reunión que no está de acuerdo, para no dejar mal parado a su jefe delante de todos, y se lo plantea después en privado.", "ops": OPS_YYN_SITUACIONES, "r": 1, "e": "Cuida la cara del otro y la armonía del grupo. Se parece a lo que en China se llama mianzi y en Corea chemyeon."},
    {"sinComillas": true, "t": "Una mujer decide mudarse a otra ciudad por trabajo y organiza con sus hermanos cómo van a cuidar a su madre.", "ops": OPS_YYN_SITUACIONES, "r": 2, "e": "Toma una decisión propia y, a la vez, se hace cargo de su lugar en la familia. Es una combinación frecuente."},
    {"sinComillas": true, "t": "Al recibir un premio, un deportista agradece primero a su equipo, a su entrenador y a su familia.", "ops": OPS_YYN_SITUACIONES, "r": 1, "e": "Ubica el logro en una red de vínculos. También puede ser una costumbre social, por eso conviene no sacar conclusiones de una sola frase."},
    {"sinComillas": true, "t": "Alguien se describe como «muy independiente» y dice que no le gusta pedir ayuda.", "ops": OPS_YYN_SITUACIONES, "r": 0, "e": "Valora la autonomía. Llevada al extremo, puede costar aceptar el apoyo de otros."},
    {"sinComillas": true, "t": "Un chico consulta a sus padres antes de aceptar una beca, aunque la decisión final sea suya.", "ops": OPS_YYN_SITUACIONES, "r": 2, "e": "Incluye a la familia en el proceso sin renunciar a decidir. Muchas personas funcionan así."},
    {"sinComillas": true, "t": "Una abuela dice «en nuestra casa hacemos así», cuando en realidad habla de lo que piensa ella.", "ops": OPS_YYN_SITUACIONES, "r": 1, "e": "Habla desde el «nosotros». Recuerda el uso coreano de <em>uri</em>, «nuestro», aun en singular."},
    {"sinComillas": true, "t": "Una persona se siente orgullosa de sí misma cuando logra una meta que se propuso sola.", "ops": OPS_YYN_SITUACIONES, "r": 0, "e": "El bienestar ligado al logro personal es más típico del yo independiente, según Kitayama, Markus y Kurokawa (2000)."}
  ]);
  LAB.quiz("yyn-mitos", [
    {"t": "Markus y Kitayama propusieron en 1991 la distinción entre un yo independiente y uno interdependiente.", "r": "b", "e": "Lo hicieron en un artículo publicado en <em>Psychological Review</em> que se volvió uno de los más citados de la psicología."},
    {"t": "Todas las personas de Japón tienen un yo interdependiente y todas las de Estados Unidos uno independiente.", "r": "a", "e": "Son tendencias culturales promedio. Dentro de cada país hay muchísima variación entre personas, regiones y generaciones."},
    {"t": "Las diferencias entre países en individualismo y colectivismo son menores y menos consistentes de lo que se creía.", "r": "b", "e": "Es lo que encontró el metaanálisis de Oyserman, Coon y Kemmelmeier (2002)."},
    {"t": "Los modelos culturales del yo se ordenan en una sola línea entre Oriente y Occidente.", "r": "a", "e": "Vignoles y colaboradores (2016) encontraron que varían en muchas dimensiones distintas que no siguen esa división."},
    {"t": "Una misma persona puede ser más independiente en un contexto y más interdependiente en otro.", "r": "b", "e": "El yo es sensible al contexto. Muchas personas combinan las dos maneras según la situación."},
    {"t": "Ser interdependiente es lo mismo que ser dependiente o sumiso.", "r": "a", "e": "El yo interdependiente pone el acento en los vínculos y el ajuste con los demás, lo cual no implica falta de criterio propio."},
    {"t": "En algunos estudios, en Japón el bienestar se asoció más con emociones de conexión y en Estados Unidos con emociones de logro.", "r": "b", "e": "Es lo que encontraron Kitayama, Markus y Kurokawa (2000)."},
    {"t": "Este autochequeo mide tu tipo de yo.", "r": "a", "e": "Es una guía de reflexión sin puntaje ni validación. Para medir estos conceptos en investigación se usan escalas como la de Singelis (1994), que también tiene sus críticas."}
  ]);

  /* Yoga Sutras */
  var OPS_YSU_KLESHAS = ["Avidya", "Asmita", "Raga", "Dvesha", "Abhinivesha"];
  LAB.quiz("ysu-kleshas", [
    {"sinComillas": true, "t": "Una persona revisa el celular cada cinco minutos esperando otro mensaje de alguien que le gusta.", "ops": OPS_YSU_KLESHAS, "r": 2, "e": "Es el apego a lo que dio placer, que empuja a buscarlo de nuevo una y otra vez."},
    {"sinComillas": true, "t": "Alguien no vuelve a manejar desde que tuvo un choque menor, hace años.", "ops": OPS_YSU_KLESHAS, "r": 3, "e": "Es la aversión a lo que dio dolor. La psicología la estudiaría como evitación, que mantiene el miedo."},
    {"sinComillas": true, "t": "Un hombre se derrumba cuando lo jubilan porque sentía que él «era» su cargo.", "ops": OPS_YSU_KLESHAS, "r": 1, "e": "Es la identificación completa con una imagen de uno mismo. Cuando esa imagen se pierde, parece que se pierde todo."},
    {"sinComillas": true, "t": "Una mujer vive como si su juventud y su salud fueran a durar para siempre, y cada señal del paso del tiempo la desespera.", "ops": OPS_YSU_KLESHAS, "r": 0, "e": "Es confundir lo pasajero con lo permanente, la ignorancia de fondo que Patañjali pone en la raíz de las demás."},
    {"sinComillas": true, "t": "Alguien sano siente terror cada vez que piensa que algún día va a morir, y evita cualquier conversación sobre el tema.", "ops": OPS_YSU_KLESHAS, "r": 4, "e": "Es el aferrarse a la vida y el miedo a la muerte. Patañjali dice que afecta incluso a los sabios."},
    {"sinComillas": true, "t": "Una persona no tolera que la critiquen porque siente que cualquier crítica la define entera.", "ops": OPS_YSU_KLESHAS, "r": 1, "e": "Otra forma de asmita: quedar pegado a una imagen de uno mismo que necesita ser protegida."},
    {"sinComillas": true, "t": "Un chico come algo dulce cada vez que se aburre, aunque después se sienta mal.", "ops": OPS_YSU_KLESHAS, "r": 2, "e": "Es raga: buscar de nuevo algo que alguna vez trajo alivio o placer."},
    {"sinComillas": true, "t": "Una mujer cambia de vereda cada vez que ve a una ex compañera con la que tuvo un conflicto.", "ops": OPS_YSU_KLESHAS, "r": 3, "e": "Es dvesha, la aversión. Evitar alivia en el momento, pero mantiene el malestar."}
  ]);
  LAB.quiz("ysu-mitos", [
    {"t": "En los Yoga Sutras, el yoga se define como el aquietamiento de las fluctuaciones de la mente.", "r": "b", "e": "Es el segundo aforismo del texto: <em>yogas citta vritti nirodhah</em>."},
    {"t": "Los Yoga Sutras dedican la mayor parte del texto a las posturas.", "r": "a", "e": "Las posturas ocupan muy poco. El texto trata sobre todo de la mente, el sufrimiento y la meditación."},
    {"t": "El yoga de posturas que se practica hoy es en buena medida una creación moderna.", "r": "b", "e": "Mark Singleton lo documentó en <em>Yoga Body</em> (2010), al estudiar cómo se combinó con la gimnasia y la cultura física de los siglos XIX y XX."},
    {"t": "Está demostrado que el yoga cura la depresión.", "r": "a", "e": "Las revisiones encontraron efectos moderados a corto plazo, con estudios de calidad variable, y una de 2024 no halló diferencias claras frente a otros ejercicios. Puede ser un complemento, no un reemplazo del tratamiento."},
    {"t": "Para Patañjali, el apego y la aversión son dos de las causas del sufrimiento.", "r": "b", "e": "Son <em>raga</em> y <em>dvesha</em>, dos de las cinco aflicciones."},
    {"t": "El desapego del yoga es lo mismo que la indiferencia.", "r": "a", "e": "<em>Vairagya</em> es no aferrarse al resultado. Se puede practicar con compromiso y con afecto."},
    {"t": "Una exhalación un poco más larga que la inhalación suele ayudar a calmarse.", "r": "b", "e": "Es una práctica sencilla con cierto respaldo en la investigación sobre la respiración lenta, aunque los estudios son variados."},
    {"t": "Cualquier técnica de respiración intensa es segura para cualquier persona.", "r": "a", "e": "Las respiraciones muy rápidas o con retenciones largas pueden marear o angustiar. Si tenés problemas de salud, consultá antes y practicá con guía."}
  ]);

})();
