/* Laboratorios temáticos (5), serie de aprendizaje: Zeigarnik (lo que queda pendiente) y andamiaje (aprender con andamios).
   Requiere lab-base.js. Nada se envía a ningún servidor. Los planes de 7 días y los formularios los maneja lab-base.js. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Pendientes */
  var OPS_ZEIGARNIK_CERRAR_POSPONER_SOLTAR = ["Cerrar ahora", "Posponer con un plan", "Soltar"];
  LAB.quiz("zeigarnik-cerrar-posponer-soltar", [
    {"sinComillas": true, "t": "Tu prima te pide la dirección del salón de la fiesta. Contestarle lleva un minuto.", "ops": OPS_ZEIGARNIK_CERRAR_POSPONER_SOLTAR, "r": 0, "e": "Si lleva un par de minutos y está a mano, cerrarlo suele costar menos que seguir recordándolo."},
    {"sinComillas": true, "t": "Preparar la declaración de impuestos, que vence en tres semanas y exige juntar papeles.", "ops": OPS_ZEIGARNIK_CERRAR_POSPONER_SOLTAR, "r": 1, "e": "No se resuelve hoy, pero podés definir el próximo paso, el día y el lugar: «el sábado a las diez junto los recibos en la mesa del comedor»."},
    {"sinComillas": true, "t": "Una discusión de hace años con un excompañero con quien ya no tenés contacto. Seguís ensayando lo que le hubieras dicho.", "ops": OPS_ZEIGARNIK_CERRAR_POSPONER_SOLTAR, "r": 2, "e": "No hay una acción posible ni necesaria. Soltarlo puede incluir reconocer que te dolió, sin seguir tratándolo como una tarea que tenés que terminar."},
    {"sinComillas": true, "t": "Pedir un turno con el dentista, que venís postergando hace meses.", "ops": OPS_ZEIGARNIK_CERRAR_POSPONER_SOLTAR, "r": 0, "e": "Es breve y la postergación ya te cuesta atención. Pedirlo hoy lo saca de la lista."},
    {"sinComillas": true, "t": "Escribir la tesis, que te va a llevar meses.", "ops": OPS_ZEIGARNIK_CERRAR_POSPONER_SOLTAR, "r": 1, "e": "Un proyecto largo no se cierra de una vez. Lo que sí se puede cerrar hoy es la incertidumbre: definir el próximo bloque de trabajo con día y hora."},
    {"sinComillas": true, "t": "Un libro que empezaste por compromiso, no te gusta y nadie te pide terminar.", "ops": OPS_ZEIGARNIK_CERRAR_POSPONER_SOLTAR, "r": 2, "e": "Dejar algo que ya no tiene sentido también es una decisión. Podés tacharlo de la lista con tranquilidad."},
    {"sinComillas": true, "t": "Hablar con tu pareja sobre las vacaciones. Hoy los dos llegan muy cansados.", "ops": OPS_ZEIGARNIK_CERRAR_POSPONER_SOLTAR, "r": 1, "e": "No conviene forzar la charla hoy, pero sí acordar un momento: «el domingo después de comer lo hablamos»."},
    {"sinComillas": true, "t": "Esperar el resultado de un análisis que ya te hiciste y que llega el jueves.", "ops": OPS_ZEIGARNIK_CERRAR_POSPONER_SOLTAR, "r": 1, "e": "Lo que dependía de vos ya está hecho. Anotar cuándo lo retirás y a quién se lo vas a mostrar le da un lugar; repasarlo cada hora no agrega nada."}
  ]);
  LAB.quiz("zeigarnik-mitos", [
    {"t": "Zeigarnik demostró que siempre recordamos mejor lo que dejamos sin terminar.", "r": "a", "e": "Informó esa ventaja en 1927, pero los intentos de replicarla dieron resultados dispares. El metaanálisis de Ghibellini y Meier (2025) concluyó que el efecto en el recuerdo no tiene validez universal."},
    {"t": "Bluma Zeigarnik hizo su investigación en Berlín, en el grupo de Kurt Lewin.", "r": "b", "e": "Sí. Su tesis, dirigida por Lewin, se publicó en 1927 en <em>Psychologische Forschung</em>. En 1931 se instaló en Moscú."},
    {"t": "La tendencia a retomar una tarea interrumpida aparece de forma más firme que la ventaja en el recuerdo.", "r": "b", "e": "Es lo que encontró el metaanálisis de Ghibellini y Meier (2025): el efecto de retomar (llamado efecto Ovsiankina) aparece como tendencia general; el del recuerdo, no."},
    {"t": "Hacer un plan para un pendiente solo sirve si lo cumplís en el momento.", "r": "a", "e": "En los experimentos de Masicampo y Baumeister (2011), armar un plan específico redujo la interferencia de la meta pendiente aunque todavía no se hubiera cumplido. Después, claro, el plan hay que llevarlo a cabo."},
    {"t": "Escribir la lista de pendientes antes de dormir siempre quita el sueño.", "r": "a", "e": "En el estudio de Scullin y colaboradores (2018), quienes escribieron sus pendientes se durmieron más rápido que quienes escribieron lo ya hecho. Fue una sola noche con adultos jóvenes sin insomnio, así que conviene probar y observar."},
    {"t": "Para dejar de pensar en algo, lo mejor es obligarse a no pensarlo.", "r": "a", "e": "Pelearse con un pensamiento suele dejarlo en primer plano. Darle un lugar (anotarlo, planificarlo o decidir soltarlo) es otra opción."},
    {"t": "Soltar un pendiente es una forma de irresponsabilidad.", "r": "a", "e": "A veces lo responsable es reconocer que algo ya no te corresponde, que no tiene solución o que dejó de tener sentido."},
    {"t": "Si los pendientes no te dejan en paz aunque los anotes y planifiques, puede valer la pena consultar.", "r": "b", "e": "Cuando los pensamientos repetitivos ocupan muchas horas, afectan el sueño o vienen con mucha angustia, hablarlo con un profesional ayuda a entender qué los sostiene."}
  ]);

  /* Andamiaje */
  var OPS_ANDAMIAJE_ANDAMIA_O_REEMPLAZA = ["Andamia", "Reemplaza"];
  LAB.quiz("andamiaje-andamia-o-reemplaza", [
    {"sinComillas": true, "t": "Tu hijo no puede con un problema de matemática y lo resolvés vos en su cuaderno para terminar rápido.", "ops": OPS_ANDAMIAJE_ANDAMIA_O_REEMPLAZA, "r": 1, "e": "La tarea queda hecha, pero el que pensó fuiste vos. La próxima vez va a estar en el mismo lugar."},
    {"sinComillas": true, "t": "Le preguntás qué entendió del enunciado y le señalás el dato que se le pasó.", "ops": OPS_ANDAMIAJE_ANDAMIA_O_REEMPLAZA, "r": 0, "e": "Señalar lo importante es una de las funciones que describieron Wood, Bruner y Ross. El trabajo de pensar sigue siendo suyo."},
    {"sinComillas": true, "t": "Tu papá quiere mandar una foto por mensaje y le sacás el celular para mandarla vos.", "ops": OPS_ANDAMIAJE_ANDAMIA_O_REEMPLAZA, "r": 1, "e": "Es rápido, pero él no aprende cómo se hace y depende de vos la próxima vez."},
    {"sinComillas": true, "t": "Le escribís en un papel los tres pasos para mandar una foto y lo acompañás mientras lo hace con su propio celular.", "ops": OPS_ANDAMIAJE_ANDAMIA_O_REEMPLAZA, "r": 0, "e": "La guía simplifica la tarea y él la hace con sus manos. Después la puede usar sin vos."},
    {"sinComillas": true, "t": "Una compañera nueva te pregunta cómo cargar un pedido: le mostrás una vez, despacio, y después la mirás hacer el siguiente.", "ops": OPS_ANDAMIAJE_ANDAMIA_O_REEMPLAZA, "r": 0, "e": "Mostrar y después pasarle la tarea es transferir la responsabilidad."},
    {"sinComillas": true, "t": "Cada vez que esa compañera pregunta, cargás vos el pedido porque es más rápido.", "ops": OPS_ANDAMIAJE_ANDAMIA_O_REEMPLAZA, "r": 1, "e": "Resuelve el momento, pero la deja sin practicar. Con el tiempo, la dependencia también cansa a quien ayuda."},
    {"sinComillas": true, "t": "Estás aprendiendo a cocinar con una receta paso a paso y, con el tiempo, la mirás cada vez menos.", "ops": OPS_ANDAMIAJE_ANDAMIA_O_REEMPLAZA, "r": 0, "e": "La receta funciona como andamio: está mientras la necesitás y se va dejando de usar."},
    {"sinComillas": true, "t": "Ves a alguien frustrado/a con una tarea y le decís: «Dejá, no es para vos».", "ops": OPS_ANDAMIAJE_ANDAMIA_O_REEMPLAZA, "r": 1, "e": "Corta el intento. Manejar la frustración, otra función del andamiaje, sería ayudar a que pueda seguir, por ejemplo achicando el paso."}
  ]);
  LAB.quiz("andamiaje-mitos", [
    {"t": "La zona de desarrollo próximo es la distancia entre lo que alguien hace solo/a y lo que puede hacer con ayuda.", "r": "b", "e": "Es la definición que se difundió de Vygotsky: lo que se hace con la guía de alguien más capaz anticipa lo que se va a poder hacer sin ella."},
    {"t": "Vygotsky inventó la palabra «andamiaje».", "r": "a", "e": "El término lo usaron Wood, Bruner y Ross en 1976, y su artículo no citaba a Vygotsky. La relación entre las dos ideas se estableció después."},
    {"t": "Ayudar mucho siempre es mejor que ayudar poco.", "r": "a", "e": "Sirve la ayuda ajustada: suficiente para avanzar y no tanta como para hacer la tarea por la otra persona. La revisión de van de Pol y colaboradores (2010) llama contingencia a ese ajuste."},
    {"t": "Un buen andamio se va retirando a medida que la persona gana autonomía.", "r": "b", "e": "El retiro gradual y la transferencia de la responsabilidad son dos de los rasgos que destacó esa misma revisión."},
    {"t": "El andamiaje solo sirve para chicos.", "r": "a", "e": "Se estudió primero con niños, pero la lógica vale para cualquier edad: aprender un oficio, un idioma o una tecnología nueva."},
    {"t": "La ayuda puede venir de un par, no solo de un docente o de un experto.", "r": "b", "e": "Vygotsky hablaba de la guía de un adulto o de la colaboración con compañeros más capaces. Alguien que sabe un poco más que vos puede ser un muy buen andamio."},
    {"t": "Si necesitás ayuda para aprender algo, es porque no tenés capacidad.", "r": "a", "e": "Desde la idea de Vygotsky, lo que hoy hacés con ayuda es justamente lo que estás cerca de poder hacer solo/a."},
    {"t": "El andamiaje es una técnica con resultados garantizados para cualquier aprendizaje.", "r": "a", "e": "Es un marco muy usado, pero la investigación señala que es difícil de medir. Conviene tomarlo como una guía para pensar la ayuda, no como una garantía."}
  ]);

})();
