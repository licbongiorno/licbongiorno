/* Laboratorio de diálogo socrático — /laboratorio-de-dialogo-socratico/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  var OPS = ["Abre", "Induce la respuesta", "Aconseja o juzga"];
  var q = function (t, r, e) { return { t: t, ops: OPS, r: r, e: e }; };
  LAB.quiz("reconocer", [
    q("¿Qué te hace pensar que no le importás?", 0, "Invita a revisar en qué se apoya la idea, sin decir si es cierta o no."),
    q("¿No te parece que estás exagerando un poco?", 1, "Trae la respuesta adentro: el otro solo puede decir que sí o defenderse."),
    q("¿Por qué no lo dejás de una vez?", 2, "Es un consejo con forma de pregunta."),
    q("¿Qué querés decir cuando decís que todo te sale mal?", 0, "Pide aclarar una palabra grande, sin corregirla."),
    q("¿Te diste cuenta de que siempre hacés lo mismo?", 1, "Es una conclusión ya armada. Una versión que abre sería: «¿notás algo que se repita?»."),
    q("Si tu mejor amiga estuviera en tu lugar, ¿qué le dirías?", 0, "Ofrece otra perspectiva y deja que la persona la encuentre."),
    q("¿Cómo podés ser tan ingenua?", 2, "Es un juicio. Cierra la conversación en lugar de abrirla."),
    q("¿Qué pasaría si fuera cierto? ¿Y después?", 0, "Ayuda a recorrer las consecuencias y a ver que lo temido suele tener un después."),
    q("¿No será que en el fondo tenés miedo?", 1, "Puede ser una buena intuición, pero llega como interpretación cerrada. Mejor: «¿qué sentís cuando lo pensás?»."),
    q("¿Por qué no hablás con él directamente?", 2, "Sugiere qué hacer. Una versión abierta: «¿qué te frena de hablarlo con él?»."),
    q("¿Qué tendría que pasar para que te sientas un poco mejor con esto?", 0, "Invita a imaginar, sin imponer un camino."),
    q("¿Te das cuenta de que así nunca vas a cambiar?", 2, "Es un juicio y una predicción. Duele y cierra.")
  ]);

  var m = function (t, ops, r, e) { return { t: t, ops: ops, r: r, e: e }; };
  LAB.quiz("mejor", [
    m("Nadie me tiene en cuenta en el trabajo.", ["¿No será que vos no te hacés valer?", "¿En qué situaciones lo sentís más? ¿Hubo alguna vez en que no fue así?", "Tenés que hablar con tu jefe."], 1, "Pide ejemplos concretos y busca excepciones, sin culpar ni aconsejar."),
    m("Soy un desastre como madre.", ["¿Qué te hace sentir eso hoy? ¿Qué diría tu hijo de vos?", "No digas eso, sos una gran madre.", "¿Por qué siempre sos tan dura con vos?"], 0, "Abre a lo que pasó y a otra perspectiva. El elogio, aunque bien intencionado, cierra la conversación."),
    m("No puedo dejar de pensar que algo malo va a pasar.", ["¿Y si pensás en otra cosa?", "¿Qué es lo que imaginás que va a pasar? ¿Qué tan probable te parece cuando lo mirás de cerca?", "Eso es ansiedad, ya se te va a pasar."], 1, "Ayuda a ponerle forma al temor y a mirarlo con más distancia."),
    m("Mi hermano nunca me llama.", ["¿Nunca, nunca? ¿Cuándo fue la última vez que hablaron?", "Llamalo vos, entonces.", "Es un egoísta, no le des bola."], 0, "Clarifica una palabra grande con curiosidad, no con ironía."),
    m("No sé qué hacer con mi vida.", ["¿Qué te gustaría que fuera distinto dentro de un año?", "Tenés que encontrar tu pasión.", "¿No será que te falta disciplina?"], 0, "Abre a lo que la persona desea, en vez de darle una fórmula o un diagnóstico."),
    m("Siempre elijo mal a mis parejas.", ["Tenés mala suerte, nada más.", "¿Qué tienen en común esas elecciones? ¿Qué te atrajo de cada una?", "¿Por qué no hacés terapia?"], 1, "Invita a buscar patrones con curiosidad, sin etiquetas.")
  ]);

  LAB.azarLista("clarificar", ["¿Qué querés decir exactamente con eso?", "¿Podés darme un ejemplo?", "Cuando decís «siempre», ¿es literal?", "¿Cómo te darías cuenta de que eso está pasando?", "Si tuvieras que decirlo con otras palabras, ¿cuáles usarías?", "¿Qué parte de esto es la que más te pesa?"]);
  LAB.azarLista("supuestos", ["¿Qué estás dando por hecho?", "¿Qué tendría que ser cierto para que eso pase?", "¿De dónde viene esa idea? ¿Quién te la enseñó?", "¿Siempre fue así, o hubo un momento en que lo pensabas distinto?", "¿Qué pasaría si ese supuesto no fuera cierto?", "¿Es una regla tuya o heredada?"]);
  LAB.azarLista("evidencia", ["¿Qué te hace pensar eso?", "¿Hay algo que no encaje con esa idea?", "¿Qué pruebas tendría alguien que pensara lo contrario?", "¿Es un hecho o una interpretación?", "¿Cómo podrías comprobarlo?", "¿Qué dirías si un amigo te lo planteara con esta evidencia?"]);
  LAB.azarLista("perspectivas", ["¿Cómo lo vería alguien que te quiere?", "¿Y cómo lo vería la otra persona involucrada?", "¿Cómo lo vas a ver dentro de cinco años?", "¿Hay otra forma de explicar lo que pasó?", "¿Qué le dirías a alguien querido que pensara esto de sí?", "Si esta situación fuera una película, ¿qué vería el espectador que vos no ves?"]);
  LAB.azarLista("consecuencias", ["Si lo creés, ¿qué hacés? ¿Y qué dejás de hacer?", "¿Qué te cuesta pensar así?", "¿Qué ganás, aunque sea un poco, pensando así?", "¿Qué pasaría si lo peor fuera cierto? ¿Y después?", "¿A dónde te lleva esa idea si la seguís hasta el final?", "¿Cómo cambiaría tu semana si lo creyeras un poco menos?"]);
  LAB.azarLista("meta", ["¿Por qué esta pregunta te importa tanto ahora?", "¿Qué esperás encontrar con esta respuesta?", "¿Es la pregunta correcta, o hay otra más importante debajo?", "¿Qué cambiaría si encontraras la respuesta?", "¿Qué pregunta estás evitando hacerte?", "¿Quién más se hace esta pregunta en tu vida?"]);

  LAB.azarLista("pareja", ["¿Qué fue lo que más te dolió de lo que pasó?", "¿Qué necesitarías de mí en momentos así?", "¿Cómo lo viviste vos?", "¿Qué te gustaría que hagamos distinto la próxima vez?", "¿Hay algo que no me dijiste por miedo a cómo iba a reaccionar?", "¿Qué te haría sentir más acompañado o acompañada?"]);
  LAB.azarLista("familia", ["¿Cómo te acordás vos de esa época?", "¿Qué te habría gustado que pasara?", "¿Qué sentiste cuando pasó?", "¿Qué esperás de esta conversación?", "¿Hay algo que nunca pudiste decir en la familia?", "¿Qué es lo que más te preocupa de esto?"]);
  LAB.azarLista("trabajo", ["¿Cómo ves vos la situación?", "¿Qué es lo más importante para vos en este proyecto?", "¿Qué te haría falta para hacerlo bien?", "¿Qué te preocupa de este cambio?", "¿Cómo podríamos saber si está funcionando?", "¿Qué harías vos en mi lugar?"]);
  LAB.azarLista("amistad", ["¿Cómo estás, de verdad?", "¿Qué fue lo más difícil de esta semana?", "¿Querés que te escuche o que te dé mi opinión?", "¿Qué te ayudaría ahora?", "¿Hay algo que te esté costando decirme?", "¿Qué te gustaría que pase con esto?"]);
})();
