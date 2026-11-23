/* Laboratorios temáticos (3), serie psicología japonesa: kaizen, Morita y Naikan, wabi-sabi y kintsugi.
   Requiere lab-base.js. Nada se envía a ningún servidor. Los planes de 7 días y los formularios los maneja lab-base.js. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Kaizen */
  var OPS_KAIZEN_PASO_SALTO = ["Paso kaizen", "Salto"];
  LAB.quiz("kaizen-paso-salto", [
    {"sinComillas": true, "t": "«Voy a leer una página antes de dormir.»", "ops": OPS_KAIZEN_PASO_SALTO, "r": 0, "e": "Es mínimo, concreto y se puede hacer aun en un mal día."},
    {"sinComillas": true, "t": "«Desde mañana me levanto a las cinco, entreno, medito y dejo el azúcar.»", "ops": OPS_KAIZEN_PASO_SALTO, "r": 1, "e": "Son varios cambios grandes a la vez. Depende de una motivación que rara vez se sostiene."},
    {"sinComillas": true, "t": "«Voy a poner un vaso de agua en la mesa de luz.»", "ops": OPS_KAIZEN_PASO_SALTO, "r": 0, "e": "Es un gesto de segundos que prepara el terreno para un hábito."},
    {"sinComillas": true, "t": "«Este mes escribo la tesis entera.»", "ops": OPS_KAIZEN_PASO_SALTO, "r": 1, "e": "La meta es enorme y no define qué hacer hoy. Falta el primer paso."},
    {"sinComillas": true, "t": "«Voy a abrir el documento y escribir una sola oración.»", "ops": OPS_KAIZEN_PASO_SALTO, "r": 0, "e": "Baja la barrera de entrada. Suele pasar que, una vez empezado, sigas un rato más, pero no hace falta."},
    {"sinComillas": true, "t": "«A partir de hoy, nada de pantallas después de las ocho, para siempre.»", "ops": OPS_KAIZEN_PASO_SALTO, "r": 1, "e": "Es una regla absoluta que se rompe en el primer desliz y deja sensación de fracaso."},
    {"sinComillas": true, "t": "«Voy a dejar el celular en otra habitación durante la cena de hoy.»", "ops": OPS_KAIZEN_PASO_SALTO, "r": 0, "e": "Es concreto, acotado a un momento y fácil de empezar. Si funciona, mañana se repite."},
    {"sinComillas": true, "t": "«Este año me pongo en forma.»", "ops": OPS_KAIZEN_PASO_SALTO, "r": 1, "e": "Es una dirección, no un paso: no dice qué vas a hacer mañana a las ocho de la mañana. Conviene bajarla a un gesto concreto."}
  ]);
  LAB.quiz("kaizen-mitos", [
    {"t": "El kaizen es una psicoterapia japonesa.", "r": "a", "e": "Es un concepto de mejora continua que viene de la gestión. Maurer (2004) lo aplicó al cambio personal, pero no es un tratamiento psicológico."},
    {"t": "Los pasos chicos solos alcanzan para cualquier problema.", "r": "a", "e": "Sirven para armar hábitos y empezar. Si hay depresión, ansiedad intensa o un problema con consumos, hace falta mucho más que un paso pequeño."},
    {"t": "Repetir una conducta en un contexto estable la vuelve cada vez más automática.", "r": "b", "e": "Es el hallazgo central de Lally y colaboradores (2010) sobre formación de hábitos."},
    {"t": "Un hábito se forma siempre en 21 días.", "r": "a", "e": "No hay un número fijo. Depende de la persona y de la conducta, y las más complejas suelen llevar más tiempo."},
    {"t": "Si un día fallás, se pierde todo lo avanzado.", "r": "a", "e": "Un día perdido no borra lo hecho. En el estudio de Lally y colaboradores, faltar una vez no alteró de manera relevante el proceso."},
    {"t": "Empezar por algo muy chico puede ser una estrategia razonable.", "r": "b", "e": "Baja la resistencia y permite repetir. Después se puede subir el escalón si querés."},
    {"t": "Un plan «cuando pase X, hago Y» ayuda a pasar de la intención a la acción.", "r": "b", "e": "Es lo que estudió Gollwitzer (1999). El metaanálisis de Gollwitzer y Sheeran (2006), con 94 pruebas, informó un efecto de mediano a grande sobre el logro de metas."},
    {"t": "Los pasos chicos sirven aunque la meta no sea tuya, solo hay que repetirlos.", "r": "a", "e": "Funcionan mejor cuando la meta te importa de verdad. Si el cambio te lo exige otra persona o te supera, antes conviene revisar eso, y quizás consultar."}
  ]);

  /* Morita y Naikan */
  var OPS_MORITA_CONTROLAR_ACTUAR = ["Controlar la emoción primero", "Actuar con la emoción presente"];
  LAB.quiz("morita-controlar-actuar", [
    {"sinComillas": true, "t": "Tenés que dar una charla y sentís el corazón acelerado. Pensás: «hasta que no me calme, no empiezo».", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 0, "e": "Condicionar la acción a que la emoción desaparezca. Morita propone empezar igual, con el nerviosismo ahí."},
    {"sinComillas": true, "t": "Tenés que dar una charla, sentís nervios y empezás a hablar con los nervios a bordo.", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 1, "e": "Es la idea central: la emoción puede estar y la acción sigue su curso."},
    {"sinComillas": true, "t": "Te despertás sin ganas y esperás a que te vengan las ganas para levantarte a trabajar.", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 0, "e": "Se espera un estado interno para actuar. En esta mirada, las ganas suelen llegar después de empezar, no antes."},
    {"sinComillas": true, "t": "Te despertás sin ganas, lo notás, y hacés igual lo que tenías previsto para la mañana.", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 1, "e": "Notar la emoción sin pelearla y hacer lo que corresponde. Eso es arugamama aplicado."},
    {"sinComillas": true, "t": "Sentís ansiedad en una reunión y dedicás toda tu energía a que nadie se dé cuenta.", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 0, "e": "Gastar la atención en esconder el síntoma suele aumentarlo. Morita propone dejar de pelearlo."},
    {"sinComillas": true, "t": "Sentís ansiedad en una reunión, la reconocés («está ahí») y prestás atención a lo que se está discutiendo.", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 1, "e": "La atención vuelve al entorno y a la tarea. La emoción queda como un acompañante, no como el jefe."},
    {"sinComillas": true, "t": "Tenés que hacer un llamado difícil y te decís: «lo hago cuando esté tranquilo/a».", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 0, "e": "Se condiciona la acción a un estado interno que quizás no llegue. Morita propone llamar con el malestar a cuestas."},
    {"sinComillas": true, "t": "Tenés que hacer un llamado difícil, sentís el estómago apretado y marcás el número igual.", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 1, "e": "El malestar está y la acción sigue su curso. No hace falta que desaparezca para poder hacerlo."}
  ]);
  var OPS_MORITA_DEPENDE_DE_MI = ["Depende de mí", "No depende directamente de mí"];
  LAB.quiz("morita-depende-de-mi", [
    {"sinComillas": true, "t": "Que no me dé vergüenza hablar en la reunión.", "ops": OPS_MORITA_DEPENDE_DE_MI, "r": 1, "e": "La vergüenza aparece o no aparece. Intentar eliminarla antes de hablar suele atar la acción a algo que no se maneja."},
    {"sinComillas": true, "t": "Pararme y empezar a hablar, aunque la vergüenza esté.", "ops": OPS_MORITA_DEPENDE_DE_MI, "r": 0, "e": "Es una conducta. Podés hacerla con la emoción presente."},
    {"sinComillas": true, "t": "Que no me dé fiaca sentarme a estudiar.", "ops": OPS_MORITA_DEPENDE_DE_MI, "r": 1, "e": "La pereza no se ordena. Lo que se puede decidir es abrir el cuaderno."},
    {"sinComillas": true, "t": "Abrir el cuaderno y leer una hoja.", "ops": OPS_MORITA_DEPENDE_DE_MI, "r": 0, "e": "Es un gesto concreto, de pocos minutos, que depende de vos."},
    {"sinComillas": true, "t": "Que la otra persona me perdone hoy.", "ops": OPS_MORITA_DEPENDE_DE_MI, "r": 1, "e": "El perdón es de quien lo da, y a su ritmo. Tu parte es la disculpa y lo que hagas después."},
    {"sinComillas": true, "t": "Pedir disculpas con claridad y ofrecer lo que puedas reparar.", "ops": OPS_MORITA_DEPENDE_DE_MI, "r": 0, "e": "Es tu parte, aunque el resultado no esté en tus manos."},
    {"sinComillas": true, "t": "Que el miedo a manejar en la ruta desaparezca antes de salir.", "ops": OPS_MORITA_DEPENDE_DE_MI, "r": 1, "e": "El miedo puede estar o no. Esperar a que se vaya antes de salir suele dejarte en el mismo lugar."},
    {"sinComillas": true, "t": "Salir con tiempo, ir despacio y parar a descansar si hace falta.", "ops": OPS_MORITA_DEPENDE_DE_MI, "r": 0, "e": "Son decisiones concretas que dependen de vos y cuidan el trayecto, con el miedo o sin él."}
  ]);
  LAB.quiz("morita-naikan-mitos", [
    {"t": "Morita y Naikan son lo mismo con distinto nombre.", "r": "a", "e": "Son enfoques distintos: Morita se centra en aceptar las emociones y actuar; Naikan, en reflexionar sobre una relación con tres preguntas."},
    {"t": "La terapia Morita propone suprimir las emociones difíciles.", "r": "a", "e": "Al revés: propone aceptarlas como forma natural de la experiencia (arugamama) y no hacer depender la acción de que desaparezcan."},
    {"t": "Una de las ideas de Morita es hacer lo que hay que hacer aunque la emoción siga presente.", "r": "b", "e": "Es el núcleo de la práctica: acción orientada a lo que la situación requiere, con la emoción como acompañante."},
    {"t": "El Naikan se puede usar con cualquier persona, sin límites.", "r": "a", "e": "No conviene hacerlo hacia quien nos maltrató, ni cuando hay mucha autocrítica sin acompañamiento: puede reforzar culpas injustas."},
    {"t": "El Naikan se basa en tres preguntas: qué recibí, qué di y qué problemas causé.", "r": "b", "e": "Así lo describe Krech (2002). Se aplican a una persona concreta y a un período acotado."},
    {"t": "Estas prácticas reemplazan un tratamiento psicológico o psiquiátrico.", "r": "a", "e": "Son enfoques para explorar, no sustituyen una evaluación ni un tratamiento cuando hay sufrimiento intenso."},
    {"t": "En su forma clásica, la terapia Morita se describe en fases que van del reposo a tareas de trabajo graduadas.", "r": "b", "e": "Se la suele describir en cuatro fases: reposo aislado, trabajo liviano, trabajo pesado y preparación para la vida cotidiana. Lo de este laboratorio es solo un ensayo breve."},
    {"t": "En el Naikan, cuanta más culpa sentís, mejor lo estás haciendo.", "r": "a", "e": "El Naikan no busca producir culpa. Si la reflexión te hunde, parás: la idea es mirar con más realismo, no castigarte."}
  ]);

  /* Wabi-sabi y kintsugi */
  var OPS_WABI_SABI_PERFECCIONISMO_CUIDADO = ["Perfeccionismo", "Cuidado"];
  LAB.quiz("wabi-sabi-perfeccionismo-cuidado", [
    {"sinComillas": true, "t": "Reparás con paciencia la taza que te regalaron, aunque la marca quede visible.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 1, "e": "Hay atención y valor por la cosa, y no hace falta esconder la reparación."},
    {"sinComillas": true, "t": "Tirás un trabajo que estaba bien porque tiene un detalle que solo vos notás.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 0, "e": "El estándar no mira que sirva, sino que no tenga ninguna falla."},
    {"sinComillas": true, "t": "Revisás una vez el informe, corregís lo importante y lo mandás.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 1, "e": "Hay esmero y también un punto de corte razonable."},
    {"sinComillas": true, "t": "Repetís una foto treinta veces antes de subirla, y al final no la subís.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 0, "e": "La búsqueda de lo impecable paraliza y termina evitando mostrar algo."},
    {"sinComillas": true, "t": "Ordenás la casa antes de que lleguen invitados, pero dejás lo que no llegás a hacer.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 1, "e": "Se cuida lo que importa sin exigir que todo esté perfecto."},
    {"sinComillas": true, "t": "Sentís vergüenza de que alguien vea tu casa vivida y cancelás la visita.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 0, "e": "Lo imperfecto se vive como una amenaza al propio valor, no como parte de la vida."},
    {"sinComillas": true, "t": "Dejás la mesa puesta con un mantel manchado porque lo importante es comer con tu familia.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 1, "e": "Se prioriza el encuentro sobre el detalle. El esmero está donde importa."},
    {"sinComillas": true, "t": "Rehacés tres veces una carta porque una coma «no suena perfecta», y se vence el plazo.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 0, "e": "La búsqueda de lo impecable tapa el propósito: la carta tenía que llegar."}
  ]);
  var OPS_WABI_SABI_IDEALIZAR_RECONOCER = ["Idealiza el daño", "Reconoce sin idealizar"];
  LAB.quiz("wabi-sabi-idealizar-reconocer", [
    {"sinComillas": true, "t": "«Tu separación fue una bendición, ya vas a ver.»", "ops": OPS_WABI_SABI_IDEALIZAR_RECONOCER, "r": 0, "e": "Le dice a otra persona qué tiene que sentir sobre su propia experiencia. Quizás lo sea con el tiempo, pero no es algo que se pueda imponer."},
    {"sinComillas": true, "t": "«Me dolió mucho y, de a poco, encontré cosas que me ayudaron.»", "ops": OPS_WABI_SABI_IDEALIZAR_RECONOCER, "r": 1, "e": "Nombra el dolor y la reparación sin ponerle un moño."},
    {"sinComillas": true, "t": "«Todo lo que no te mata te hace más fuerte.»", "ops": OPS_WABI_SABI_IDEALIZAR_RECONOCER, "r": 0, "e": "Es una frase hecha que ignora las secuelas. Hay experiencias que dejan cicatrices que se notan, y no por eso hay que agradecerlas."},
    {"sinComillas": true, "t": "«Me quedaron secuelas, y también reorganicé algunas cosas de mi vida.»", "ops": OPS_WABI_SABI_IDEALIZAR_RECONOCER, "r": 1, "e": "Sostiene las dos cosas a la vez, sin reclamarse una conclusión luminosa."},
    {"sinComillas": true, "t": "«Si no sacás algo positivo de esto, lo estás haciendo mal.»", "ops": OPS_WABI_SABI_IDEALIZAR_RECONOCER, "r": 0, "e": "Convierte el sufrimiento en una tarea con nota. Nadie está obligado a encontrarle un sentido."},
    {"sinComillas": true, "t": "«Si algún día le encuentro algún sentido, bien. Y si no, también está bien.»", "ops": OPS_WABI_SABI_IDEALIZAR_RECONOCER, "r": 1, "e": "Deja la puerta abierta sin exigirse nada. Es una manera de no idealizar."},
    {"sinComillas": true, "t": "«Esto te pasó para que aprendieras algo.»", "ops": OPS_WABI_SABI_IDEALIZAR_RECONOCER, "r": 0, "e": "Atribuye un propósito a algo que quizás no lo tuvo. A veces consuela y a veces lastima, según quién lo diga y cuándo."},
    {"sinComillas": true, "t": "«No sé si esto sirvió para algo, pero me ayudó hablarlo con mi hermana.»", "ops": OPS_WABI_SABI_IDEALIZAR_RECONOCER, "r": 1, "e": "Reconoce lo concreto que ayudó sin forzar una moraleja."}
  ]);
  LAB.quiz("wabi-sabi-mitos", [
    {"t": "El kintsugi es una técnica terapéutica.", "r": "a", "e": "Es una técnica artesanal de reparación de cerámica. Como metáfora puede inspirar, pero no es una terapia."},
    {"t": "El kintsugi consiste en reparar una pieza rota con laca y oro, dejando visible la fractura.", "r": "b", "e": "Esa es la técnica. La metáfora gira alrededor de no ocultar la reparación."},
    {"t": "Cada experiencia dolorosa nos vuelve más bellos o más fuertes.", "r": "a", "e": "Es una idealización. Algunos daños dejan secuelas, y no hace falta encontrarles un sentido positivo."},
    {"t": "El wabi-sabi valora lo imperfecto, lo incompleto y lo pasajero.", "r": "b", "e": "Así lo presenta Koren (1994), como una sensibilidad estética, no como una técnica ni una terapia."},
    {"t": "Aceptar la imperfección quiere decir dejar de cuidar las cosas.", "r": "a", "e": "Se puede cuidar con esmero sin exigir que todo sea impecable. La diferencia está en el motivo."},
    {"t": "Estas metáforas pueden acompañar un proceso, pero no reemplazan la ayuda profesional.", "r": "b", "e": "Sirven para mirar de otra forma. Si un dolor persiste, conviene consultar."},
    {"t": "El crecimiento postraumático significa que lo que pasó fue algo bueno.", "r": "a", "e": "Tedeschi y Calhoun (2004) hablan de cambios positivos que algunas personas refieren después de luchar con una adversidad. No dicen que el hecho haya sido bueno ni que a todos les ocurra."},
    {"t": "Reparar una pieza con oro la deja como nueva.", "r": "a", "e": "La pieza reparada queda distinta y la fractura se ve. Esa visibilidad es justamente lo que distingue a la técnica."}
  ]);

})();
