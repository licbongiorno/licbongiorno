/* Laboratorios temáticos (6), serie coreana: nunchi (leer el ambiente sin perderte) y pena y enojo (han y hwa-byung).
   Requiere lab-base.js. Nada se envía a ningún servidor. Los planes de 7 días y los formularios los maneja lab-base.js. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Nunchi */
  var OPS_NUNCHI_PERCEPCION_SUPOSICION_PROYECCION = ["Percepción", "Suposición", "Proyección"];
  LAB.quiz("nunchi-percepcion-suposicion-proyeccion", [
    {"sinComillas": true, "t": "«Desde que llegó, mi hermana no me dirigió la palabra.»", "ops": OPS_NUNCHI_PERCEPCION_SUPOSICION_PROYECCION, "r": 0, "e": "Describe un hecho que se puede chequear. Qué significa ese silencio es otra pregunta."},
    {"sinComillas": true, "t": "«Mi hermana no me habla porque sigue resentida por lo de la herencia.»", "ops": OPS_NUNCHI_PERCEPCION_SUPOSICION_PROYECCION, "r": 1, "e": "Puede ser cierto, pero agrega una causa que no se observó. Es una hipótesis que vale la pena confirmar antes de actuar en consecuencia."},
    {"sinComillas": true, "t": "«Yo me siento muy incómodo/a en este cumpleaños, así que seguro que todos la están pasando mal.»", "ops": OPS_NUNCHI_PERCEPCION_SUPOSICION_PROYECCION, "r": 2, "e": "Se toma el propio malestar como si fuera el clima general. Es una forma frecuente de proyección."},
    {"sinComillas": true, "t": "«La profesora frunció el ceño mientras yo hablaba.»", "ops": OPS_NUNCHI_PERCEPCION_SUPOSICION_PROYECCION, "r": 0, "e": "Es un dato. El ceño fruncido puede ser desacuerdo, concentración o que no escuchó bien."},
    {"sinComillas": true, "t": "«Si nadie comentó mi propuesta, es que les pareció malísima.»", "ops": OPS_NUNCHI_PERCEPCION_SUPOSICION_PROYECCION, "r": 1, "e": "Del silencio se deduce un juicio. Hay otras explicaciones posibles: falta de tiempo, timidez, que la estén pensando."},
    {"sinComillas": true, "t": "«Mi compañero de trabajo me tiene envidia», dice alguien que, en el fondo, se compara todo el tiempo con él.", "ops": OPS_NUNCHI_PERCEPCION_SUPOSICION_PROYECCION, "r": 2, "e": "El sentimiento que se le atribuye al otro está, al menos en parte, en quien lo dice. Darse cuenta de eso no siempre es fácil ni cómodo."},
    {"sinComillas": true, "t": "«Mi pareja suspiró dos veces mientras le contaba mi día.»", "ops": OPS_NUNCHI_PERCEPCION_SUPOSICION_PROYECCION, "r": 0, "e": "Se queda en lo observable. Preguntar «¿estás cansado/a o te pasa algo?» completaría la lectura."},
    {"sinComillas": true, "t": "«Ya sé lo que me va a contestar, así que ni le pregunto.»", "ops": OPS_NUNCHI_PERCEPCION_SUPOSICION_PROYECCION, "r": 1, "e": "Anticipar la respuesta del otro es suponer. A veces acertamos, pero la pregunta podría sorprender."}
  ]);
  LAB.quiz("nunchi-mitos", [
    {"t": "El nunchi es un concepto científico con estudios propios que lo miden.", "r": "a", "e": "Es un concepto cultural coreano. Lo que tiene investigación son procesos relacionados, como la precisión empática y la mentalización."},
    {"t": "La palabra nunchi suele traducirse como «medida del ojo».", "r": "b", "e": "Es la traducción literal más difundida. En el habla cotidiana se dice que alguien «no tiene nunchi» cuando no registra lo que pasa a su alrededor."},
    {"t": "Quien tiene buen nunchi sabe exactamente lo que piensan los demás.", "r": "a", "e": "Nadie accede directamente a la mente ajena. Desde la mentalización, una buena lectura incluye saber que puede estar equivocada."},
    {"t": "Solemos creer que los demás notan nuestras emociones más de lo que realmente las notan.", "r": "b", "e": "Es lo que Gilovich, Savitsky y Medvec (1998) llamaron ilusión de transparencia."},
    {"t": "Cuanto más atento/a estés a las señales de rechazo, mejor vas a leer una situación social.", "r": "a", "e": "En el modelo de Clark y Wells (1995) sobre la ansiedad social, la atención puesta en uno mismo y en la amenaza hace que se pierda información que contradiría el miedo."},
    {"t": "Leer bien el ambiente es lo mismo que hacer lo que los demás esperan.", "r": "a", "e": "Percibir lo que otro siente no obliga a complacerlo. La lectura informa; la decisión sigue siendo tuya."},
    {"t": "Preguntar «¿te pasa algo?» puede ser más preciso que adivinar.", "r": "b", "e": "Una pregunta abierta, sin acusar, permite confirmar o descartar una suposición. No siempre es posible, pero en los vínculos cercanos suele ahorrar malentendidos."},
    {"t": "Si vivís pendiente del humor de los demás y eso te agota, puede valer la pena consultar.", "r": "b", "e": "Una vigilancia constante del clima ajeno a veces tiene raíces en la historia de cada uno, y en terapia se puede entender y aflojar."}
  ]);

  /* Pena y enojo */
  var OPS_PENA_ENOJO_EXPRESAR_CONTENER_TRAGARSE = ["Expresar", "Contener con criterio", "Tragarse"];
  LAB.quiz("pena-enojo-expresar-contener-tragarse", [
    {"sinComillas": true, "t": "Tu hermano llega una hora tarde a buscar a tu mamá por tercera vez. Cuando están solos, le decís: «Me molesta que llegues tarde, porque me quedo sin tiempo. Necesito que avises».", "ops": OPS_PENA_ENOJO_EXPRESAR_CONTENER_TRAGARSE, "r": 0, "e": "Dice lo que siente, por qué y qué necesita, a la persona indicada y en un momento adecuado."},
    {"sinComillas": true, "t": "Tu jefe te critica delante de un cliente. Te enojás, pero no contestás ahí; a la tarde le pedís cinco minutos para hablarlo a solas.", "ops": OPS_PENA_ENOJO_EXPRESAR_CONTENER_TRAGARSE, "r": 1, "e": "Elegir el momento no es callar: hay una razón para esperar y un plan para retomarlo."},
    {"sinComillas": true, "t": "Hace diez años que tu suegra comenta tu forma de cocinar. Siempre sonreís, nunca dijiste nada y lo pensás de noche.", "ops": OPS_PENA_ENOJO_EXPRESAR_CONTENER_TRAGARSE, "r": 2, "e": "No hay salida ni plan: el enojo se guarda y vuelve. Eso es lo que, con el tiempo, puede pesar."},
    {"sinComillas": true, "t": "En una discusión de tránsito, el otro conductor te insulta. Respirás, no contestás y lo hablás después con alguien de confianza.", "ops": OPS_PENA_ENOJO_EXPRESAR_CONTENER_TRAGARSE, "r": 1, "e": "No vale la pena ni es seguro responder ahí. Le das al enojo otra salida, que es hablarlo después."},
    {"sinComillas": true, "t": "Tu pareja olvidó tu cumpleaños. Le decís «no pasa nada» y durante semanas le contestás con frialdad.", "ops": OPS_PENA_ENOJO_EXPRESAR_CONTENER_TRAGARSE, "r": 2, "e": "El enojo no desaparece: se filtra de forma indirecta. Decir «me dolió» suele ser más claro para los dos."},
    {"sinComillas": true, "t": "Una amiga te pide plata por cuarta vez y te cuesta decir que no. Esta vez le decís: «Te quiero, y no puedo prestarte de nuevo».", "ops": OPS_PENA_ENOJO_EXPRESAR_CONTENER_TRAGARSE, "r": 0, "e": "Pone un límite con afecto y sin agredir: es una forma asertiva de expresar."},
    {"sinComillas": true, "t": "Estás muy enojado/a con tu hijo adolescente. Le decís: «Ahora estoy muy enojado/a para hablar. Lo hablamos a la noche».", "ops": OPS_PENA_ENOJO_EXPRESAR_CONTENER_TRAGARSE, "r": 1, "e": "Contener para no decir algo de lo que te arrepientas, con un momento acordado para retomarlo."},
    {"sinComillas": true, "t": "En el trabajo te asignan siempre las tareas que nadie quiere. Nunca lo planteás y te dolés de la espalda cada vez más.", "ops": OPS_PENA_ENOJO_EXPRESAR_CONTENER_TRAGARSE, "r": 2, "e": "El dolor tiene que consultarse con un médico. Además, el malestar callado puede sumar tensión: plantearlo es una opción para pensar."}
  ]);
  LAB.quiz("pena-enojo-mitos", [
    {"t": "Descargar el enojo pegándole a un almohadón o a una bolsa de boxeo ayuda a que se vaya.", "r": "a", "e": "En el experimento de Bushman (2002), pegarle a una bolsa pensando en quien había provocado el enojo lo aumentó. El metaanálisis de Kjærvik y Bushman (2024) encontró que bajar la activación sirve más."},
    {"t": "El hwa-byung figuró en el glosario de síndromes ligados a la cultura del DSM-IV.", "r": "b", "e": "Sí, en 1994. Sung Kil Min lo describe como un síndrome de ira ligado a la cultura coreana."},
    {"t": "Si el pecho se cierra cuando estás enojado/a, seguro es solo emocional.", "r": "a", "e": "Una opresión en el pecho, palpitaciones o falta de aire tienen que consultarse con un médico. Lo emocional se piensa después de descartar otras causas, o junto con eso."},
    {"t": "Esconder habitualmente lo que sentís se asocia, en promedio, con menos bienestar.", "r": "b", "e": "Es lo que encontraron Gross y John (2003) con la supresión expresiva. Son estudios de correlación: muestran una asociación, no prueban la causa."},
    {"t": "Escribir sobre una experiencia difícil cura cualquier malestar.", "r": "a", "e": "El metaanálisis de Frattaroli (2006) encontró un efecto positivo pero pequeño. Puede ayudar a algunas personas, y no reemplaza un tratamiento."},
    {"t": "Ponerle nombre a una emoción puede bajar su intensidad.", "r": "b", "e": "Lieberman y colaboradores (2007) observaron que nombrar la emoción reducía la respuesta de la amígdala ante imágenes negativas, en un estudio de laboratorio."},
    {"t": "Expresar el enojo es lo mismo que gritar o agredir.", "r": "a", "e": "Se puede decir el enojo con firmeza y respeto: el hecho, lo que sentís, lo que necesitás y un pedido."},
    {"t": "El han y el hwa-byung son experiencias solo coreanas que no tienen nada que ver con nosotros.", "r": "a", "e": "Son conceptos de la cultura coreana, con su historia propia. Sung Kil Min sugirió que el hwa-byung podría entenderse también desde una perspectiva general: el enojo y la pena callados por años existen en muchas culturas."}
  ]);

})();
