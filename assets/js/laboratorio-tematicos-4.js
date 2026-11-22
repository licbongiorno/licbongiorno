/* Laboratorios temáticos (4), serie psicología china: taoísta, confuciano de vínculos, qigong y tai chi, Zhuangzi y pensamiento dialéctico.
   Requiere lab-base.js. Nada se envía a ningún servidor. Los planes de 7 días y los formularios los maneja lab-base.js. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Taoísta */
  var OPS_TAOISTA_FORZAR_FLUIR = ["Forzar", "Fluir", "Abandonar"];
  LAB.quiz("taoista-forzar-fluir", [
    {"sinComillas": true, "t": "Hace una hora que querés dormirte y mirás el reloj cada cinco minutos, cada vez más enojado/a con vos.", "ops": OPS_TAOISTA_FORZAR_FLUIR, "r": 0, "e": "Cuanto más se empuja el sueño, más se aleja. Es forcejear con algo que no se puede ordenar."},
    {"sinComillas": true, "t": "No te podés dormir, así que te levantás, leés algo tranquilo con poca luz y volvés a la cama cuando te viene el sueño.", "ops": OPS_TAOISTA_FORZAR_FLUIR, "r": 1, "e": "Se acepta lo que pasa y se hace algo razonable con eso, sin pelearse con el insomnio."},
    {"sinComillas": true, "t": "Tenés un trámite importante pendiente y decidís no hacer nada «para no forzar las cosas».", "ops": OPS_TAOISTA_FORZAR_FLUIR, "r": 2, "e": "Es una confusión frecuente: no hacer nada no es wu wei. El trámite sigue ahí, y el paso razonable es darlo."},
    {"sinComillas": true, "t": "Querés que tu hijo adolescente te cuente todo y lo interrogás cada noche hasta que se cierra.", "ops": OPS_TAOISTA_FORZAR_FLUIR, "r": 0, "e": "Empujar la apertura del otro suele producir lo contrario. Es forzar un resultado que no controlás."},
    {"sinComillas": true, "t": "Dejás una puerta abierta para conversar, estás disponible cuando quiere hablar y respetás sus silencios.", "ops": OPS_TAOISTA_FORZAR_FLUIR, "r": 1, "e": "Se pone lo que depende de uno (la disponibilidad) y se deja de empujar lo que no depende."},
    {"sinComillas": true, "t": "Un proyecto no avanza y decidís dejarlo sin revisar si ya no te interesa o si solo faltaba un cambio de método.", "ops": OPS_TAOISTA_FORZAR_FLUIR, "r": 2, "e": "Renunciar sin mirar qué pasa es abandonar. Fluir incluiría ajustar el camino con lo que aprendiste."}
  ]);
  LAB.quiz("taoista-mitos", [
    {"t": "El taoísmo es una psicoterapia.", "r": "a", "e": "Es una tradición filosófica y religiosa. Puede inspirar una mirada, pero no es un tratamiento ni tiene ensayos clínicos propios."},
    {"t": "Wu wei significa no hacer nada.", "r": "a", "e": "Suele traducirse como «no acción», pero según Slingerland (2003) alude a actuar con soltura y sin esfuerzo forzado, no a la pasividad."},
    {"t": "El Tao Te Ching se atribuye por tradición a Laozi, aunque su autoría y su fecha son inciertas.", "r": "b", "e": "Es lo que sostienen los estudios: el nombre es tradicional y el texto se habría formado a lo largo de varios siglos."},
    {"t": "El yin y el yang son dos fuerzas enfrentadas, una buena y otra mala.", "r": "a", "e": "Se presentan como opuestos complementarios que se transforman uno en otro. Ninguno es «el malo»."},
    {"t": "Fluir sirve para esperar a que los problemas se resuelvan solos.", "r": "a", "e": "Fluir no es evitar. Los problemas concretos suelen pedir una acción, aunque sea sin forcejear."},
    {"t": "Estas ideas pueden inspirar una forma de mirar el esfuerzo, pero no reemplazan un tratamiento.", "r": "b", "e": "Sirven como metáfora. Si algo te hace sufrir de forma sostenida, conviene consultar."}
  ]);

  /* Confuciano */
  var OPS_CONFUCIANO_RESPETO_OBEDIENCIA = ["Respeto", "Obediencia"];
  LAB.quiz("confuciano-respeto-obediencia", [
    {"sinComillas": true, "t": "Escuchás con atención lo que opina tu padre sobre tu mudanza y después decidís vos.", "ops": OPS_CONFUCIANO_RESPETO_OBEDIENCIA, "r": 0, "e": "Hay consideración por el otro y también autonomía. Se puede respetar una opinión sin seguirla."},
    {"sinComillas": true, "t": "Aceptás cambiar de carrera para no decepcionar a tu madre, aunque no querés.", "ops": OPS_CONFUCIANO_RESPETO_OBEDIENCIA, "r": 1, "e": "Se actúa para evitar el disgusto o el castigo afectivo, no por reverencia. Es lo que Yeh y Bedford llaman piedad filial autoritaria."},
    {"sinComillas": true, "t": "Llamás a tu abuela los domingos porque disfrutás charlar con ella.", "ops": OPS_CONFUCIANO_RESPETO_OBEDIENCIA, "r": 0, "e": "Es un gesto de cuidado que sale del afecto, no de una orden."},
    {"sinComillas": true, "t": "Le das la razón a tu tío en todo para que no se enoje.", "ops": OPS_CONFUCIANO_RESPETO_OBEDIENCIA, "r": 1, "e": "Es acomodarse por miedo a su reacción. El respeto admite el desacuerdo."},
    {"sinComillas": true, "t": "Le decís a una persona mayor, con buenos modos, que no estás de acuerdo.", "ops": OPS_CONFUCIANO_RESPETO_OBEDIENCIA, "r": 0, "e": "Se puede disentir con consideración. La forma cuida el vínculo sin renunciar a tu parecer."},
    {"sinComillas": true, "t": "Callás algo que te lastima para no «faltarle el respeto» a quien te lo hace.", "ops": OPS_CONFUCIANO_RESPETO_OBEDIENCIA, "r": 1, "e": "El respeto no exige callar un daño. Si te lastima, corresponde cuidarte, y a veces pedir ayuda."}
  ]);
  LAB.quiz("confuciano-mitos", [
    {"t": "El confucianismo es una psicoterapia.", "r": "a", "e": "Es una tradición filosófica y ética. Puede inspirar una mirada sobre los vínculos, pero no es un tratamiento."},
    {"t": "Xiao, la piedad filial, significa obedecer a los padres en todo.", "r": "a", "e": "Los Analectas hablan de reverencia y no solo de cumplimiento, y Yeh y Bedford (2003) distinguen una forma recíproca, basada en el afecto, de otra autoritaria."},
    {"t": "Ren suele traducirse como humanidad o benevolencia.", "r": "b", "e": "Es una de las ideas centrales del confucianismo: la cualidad de tratar a los demás de forma humana."},
    {"t": "La gratitud hacia los mayores obliga a soportar el maltrato.", "r": "a", "e": "Nunca. Si hubo maltrato, no corresponde forzar gratitud ni respeto hacia quien lo ejerció."},
    {"t": "Los ritos (li) pueden pensarse como pequeños gestos concretos de cuidado.", "r": "b", "e": "Li abarca ritos y formas de conducta. Como metáfora, un saludo o una visita regular son una manera de sostener un vínculo."},
    {"t": "Las ideas confucianas se pueden aplicar sin matices a cualquier familia de hoy.", "r": "a", "e": "Nacieron en otra época y con jerarquías que hoy se cuestionan. Conviene tomar lo que cuida y revisar lo que somete."}
  ]);

  /* Qigong y tai chi */
  LAB.quiz("qigong-mitos", [
    {"t": "El qigong y el tai chi son psicoterapias.", "r": "a", "e": "Son prácticas de movimiento y respiración de origen chino. Pueden ser un complemento, pero no son una psicoterapia ni reemplazan un tratamiento."},
    {"t": "El tai chi combina movimientos lentos y coordinados con la respiración y la atención.", "r": "b", "e": "Así se lo describe habitualmente, y es lo que se ensaya en este laboratorio."},
    {"t": "La ciencia demostró que el qigong equilibra el qi.", "r": "a", "e": "El qi es un concepto tradicional que la ciencia no mide. Lo estudiado son efectos del ejercicio suave y la atención, sin afirmaciones sobre el qi."},
    {"t": "Una revisión de estudios encontró beneficios en el bienestar psicológico, pero con estudios de calidad dispareja.", "r": "b", "e": "Es lo que informan Wang y colaboradores (2010), que piden ensayos mejor controlados antes de sacar conclusiones firmes."},
    {"t": "Si duele o marea, hay que seguir hasta que se pase.", "r": "a", "e": "Al revés: si hay dolor o mareo se detiene la práctica, y si se repite conviene consultar."},
    {"t": "Estas prácticas alcanzan para tratar la ansiedad o la depresión.", "r": "a", "e": "Pueden acompañar, pero no sustituyen una evaluación ni un tratamiento cuando hay sufrimiento intenso."}
  ]);

  /* Zhuangzi */
  var OPS_ZHUANGZI_INUTIL = ["Sostiene algo", "Sobra de verdad"];
  LAB.quiz("zhuangzi-inutil", [
    {"sinComillas": true, "t": "Un paseo de media hora sin destino ni objetivo, solo para caminar.", "ops": OPS_ZHUANGZI_INUTIL, "r": 0, "e": "No produce nada medible, pero suele darle aire a la jornada y ordenar la cabeza. Es lo que el relato del árbol invita a valorar."},
    {"sinComillas": true, "t": "Seguir mirando por décima vez el chat de alguien que no te contesta.", "ops": OPS_ZHUANGZI_INUTIL, "r": 1, "e": "No sostiene nada: alimenta la espera y el malestar. Ser inútil no vuelve valioso a todo lo que no sirve."},
    {"sinComillas": true, "t": "Una amistad con quien no «hacés» nada productivo: charlan, se ríen, se acompañan.", "ops": OPS_ZHUANGZI_INUTIL, "r": 0, "e": "No tiene meta ni rendimiento y sin embargo sostiene. Es un caso típico de utilidad escondida."},
    {"sinComillas": true, "t": "Una suscripción que no usás hace meses y que seguís pagando por costumbre.", "ops": OPS_ZHUANGZI_INUTIL, "r": 1, "e": "Acá no hay sombra oculta: es un gasto que podés revisar. No toda cosa «inútil» merece defensa."},
    {"sinComillas": true, "t": "Un rato por semana para dibujar, tocar un instrumento o armar algo, sin fines de lucro y sin público.", "ops": OPS_ZHUANGZI_INUTIL, "r": 0, "e": "Nadie lo necesita y aun así puede sostener el ánimo y la sensación de ser más que lo que producís."},
    {"sinComillas": true, "t": "Un rencor que cultivás con detalle y que no te lleva a ninguna conversación ni decisión.", "ops": OPS_ZHUANGZI_INUTIL, "r": 1, "e": "Ocupa lugar y energía y no ofrece nada a cambio. Mirarlo con curiosidad puede ser un primer paso."}
  ]);
  LAB.quiz("zhuangzi-mitos", [
    {"t": "El Zhuangzi es un manual de psicoterapia.", "r": "a", "e": "Es una obra filosófica y literaria de la tradición taoísta. Puede inspirar una mirada, pero no es un tratamiento ni tiene ensayos clínicos propios."},
    {"t": "Se trata de un texto lleno de relatos, diálogos y paradojas, no de una exposición sistemática.", "r": "b", "e": "Es una de sus características más notorias y lo que lo diferencia de un tratado ordenado."},
    {"t": "El sueño de la mariposa demuestra que nada es real.", "r": "a", "e": "El relato deja una pregunta abierta, pero no afirma que nada exista. Es una invitación a no aferrarse a una sola mirada."},
    {"t": "Cambiar de perspectiva significa que lo que te pasa no importa.", "r": "a", "e": "Mirar desde otro lugar amplía la vista, pero no borra el dolor ni vuelve irreal lo que ocurrió."},
    {"t": "Lo que no se puede medir o cobrar puede, aun así, sostener algo importante.", "r": "b", "e": "Es la idea central del relato del árbol inútil: no todo valor se ve a primera vista."},
    {"t": "Si no puedo saber lo que siente el otro, no vale la pena preguntarle.", "r": "a", "e": "Al contrario. Reconocer que no lo sabés es lo que vuelve valiosa la pregunta."}
  ]);

  /* Pensamiento dialéctico */
  var OPS_DIALECTICO_TODO_O_NADA = ["Todo o nada", "Ambas cosas"];
  LAB.quiz("dialectico-todo-o-nada", [
    {"sinComillas": true, "t": "«Si no lo hice perfecto, lo hice mal.»", "ops": OPS_DIALECTICO_TODO_O_NADA, "r": 0, "e": "Solo hay dos casillas: perfecto o un fracaso. Se pierde todo lo que hay en el medio."},
    {"sinComillas": true, "t": "«Estoy haciendo lo que puedo con lo que tengo, y también me gustaría poder más.»", "ops": OPS_DIALECTICO_TODO_O_NADA, "r": 1, "e": "Sostiene aceptación y cambio a la vez. Es el tipo de equilibrio que propone la dialéctica de Linehan."},
    {"sinComillas": true, "t": "«O me quiere o no me quiere, no hay otra.»", "ops": OPS_DIALECTICO_TODO_O_NADA, "r": 0, "e": "Reduce el vínculo a una sola alternativa. Alguien puede quererte y, a la vez, hacerte daño o fallarte."},
    {"sinComillas": true, "t": "«Lo quiero mucho y hoy estoy enojado/a con él.»", "ops": OPS_DIALECTICO_TODO_O_NADA, "r": 1, "e": "Dos emociones que parecen opuestas conviven. No hace falta resolver cuál es la «verdadera»."},
    {"sinComillas": true, "t": "«Me equivoqué, así que soy un desastre.»", "ops": OPS_DIALECTICO_TODO_O_NADA, "r": 0, "e": "Un error se convierte en un veredicto total. Es una generalización de todo o nada."},
    {"sinComillas": true, "t": "«Me equivoqué, me hago cargo de la parte que me toca y sigo siendo alguien que vale.»", "ops": OPS_DIALECTICO_TODO_O_NADA, "r": 1, "e": "Reconoce el error sin que arrastre toda la identidad. Es posible hacer ambas cosas."}
  ]);
  LAB.quiz("dialectico-mitos", [
    {"t": "Pensar dialécticamente es no tomar posición ante nada.", "r": "a", "e": "Es sostener dos perspectivas y, aun así, decidir y actuar. No es neutralidad ni indecisión."},
    {"t": "Peng y Nisbett (1999) informaron que participantes chinos buscaban más el camino del medio ante una contradicción que los estadounidenses.", "r": "b", "e": "Es lo que describe ese trabajo, aunque son tendencias de grupo y estudios posteriores cuestionaron algunos de sus resultados."},
    {"t": "Todas las personas de culturas orientales piensan de forma dialéctica.", "r": "a", "e": "Se trata de tendencias promedio entre grupos, con enorme variación entre personas. No sirve para predecir cómo piensa alguien."},
    {"t": "La dialéctica central de la DBT es el equilibrio entre aceptación y cambio.", "r": "b", "e": "Es lo que sostiene Linehan desde su libro de 1993: aceptarse tal cual y trabajar para cambiar, a la vez."},
    {"t": "Aceptar algo quiere decir que te resignás y que no vas a cambiarlo.", "r": "a", "e": "Aceptar es reconocer lo que hay. En la DBT va de la mano de cambiar lo que sí se puede cambiar."},
    {"t": "Sostener dos ideas opuestas justifica quedarse en un vínculo que daña.", "r": "a", "e": "Podés entender a la otra persona y, a la vez, protegerte. Entender no obliga a quedarse."}
  ]);

})();
