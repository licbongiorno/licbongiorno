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
    {"sinComillas": true, "t": "«A partir de hoy, nada de pantallas después de las ocho, para siempre.»", "ops": OPS_KAIZEN_PASO_SALTO, "r": 1, "e": "Es una regla absoluta que se rompe en el primer desliz y deja sensación de fracaso."}
  ]);
  LAB.quiz("kaizen-mitos", [
    {"t": "El kaizen es una psicoterapia japonesa.", "r": "a", "e": "Es un concepto de mejora continua que viene de la gestión. Maurer (2004) lo aplicó al cambio personal, pero no es un tratamiento psicológico."},
    {"t": "Los pasos chicos solos alcanzan para cualquier problema.", "r": "a", "e": "Sirven para armar hábitos y empezar. Si hay depresión, ansiedad intensa o un problema con consumos, hace falta mucho más que un paso pequeño."},
    {"t": "Repetir una conducta en un contexto estable la vuelve cada vez más automática.", "r": "b", "e": "Es el hallazgo central de Lally y colaboradores (2010) sobre formación de hábitos."},
    {"t": "Un hábito se forma siempre en 21 días.", "r": "a", "e": "No hay un número fijo. Depende de la persona y de la conducta, y las más complejas suelen llevar más tiempo."},
    {"t": "Si un día fallás, se pierde todo lo avanzado.", "r": "a", "e": "Un día perdido no borra lo hecho. En el estudio de Lally y colaboradores, faltar una vez no alteró de manera relevante el proceso."},
    {"t": "Empezar por algo muy chico puede ser una estrategia razonable.", "r": "b", "e": "Baja la resistencia y permite repetir. Después se puede subir el escalón si querés."}
  ]);

  /* Morita y Naikan */
  var OPS_MORITA_CONTROLAR_ACTUAR = ["Controlar la emoción primero", "Actuar con la emoción presente"];
  LAB.quiz("morita-controlar-actuar", [
    {"sinComillas": true, "t": "Tenés que dar una charla y sentís el corazón acelerado. Pensás: «hasta que no me calme, no empiezo».", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 0, "e": "Condicionar la acción a que la emoción desaparezca. Morita propone empezar igual, con el nerviosismo ahí."},
    {"sinComillas": true, "t": "Tenés que dar una charla, sentís nervios y empezás a hablar con los nervios a bordo.", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 1, "e": "Es la idea central: la emoción puede estar y la acción sigue su curso."},
    {"sinComillas": true, "t": "Te despertás sin ganas y esperás a que te vengan las ganas para levantarte a trabajar.", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 0, "e": "Se espera un estado interno para actuar. En esta mirada, las ganas suelen llegar después de empezar, no antes."},
    {"sinComillas": true, "t": "Te despertás sin ganas, lo notás, y hacés igual lo que tenías previsto para la mañana.", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 1, "e": "Notar la emoción sin pelearla y hacer lo que corresponde. Eso es arugamama aplicado."},
    {"sinComillas": true, "t": "Sentís ansiedad en una reunión y dedicás toda tu energía a que nadie se dé cuenta.", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 0, "e": "Gastar la atención en esconder el síntoma suele aumentarlo. Morita propone dejar de pelearlo."},
    {"sinComillas": true, "t": "Sentís ansiedad en una reunión, la reconocés («está ahí») y prestás atención a lo que se está discutiendo.", "ops": OPS_MORITA_CONTROLAR_ACTUAR, "r": 1, "e": "La atención vuelve al entorno y a la tarea. La emoción queda como un acompañante, no como el jefe."}
  ]);
  LAB.quiz("morita-naikan-mitos", [
    {"t": "Morita y Naikan son lo mismo con distinto nombre.", "r": "a", "e": "Son enfoques distintos: Morita se centra en aceptar las emociones y actuar; Naikan, en reflexionar sobre una relación con tres preguntas."},
    {"t": "La terapia Morita propone suprimir las emociones difíciles.", "r": "a", "e": "Al revés: propone aceptarlas como forma natural de la experiencia (arugamama) y no hacer depender la acción de que desaparezcan."},
    {"t": "Una de las ideas de Morita es hacer lo que hay que hacer aunque la emoción siga presente.", "r": "b", "e": "Es el núcleo de la práctica: acción orientada a lo que la situación requiere, con la emoción como acompañante."},
    {"t": "El Naikan se puede usar con cualquier persona, sin límites.", "r": "a", "e": "No conviene hacerlo hacia quien nos maltrató, ni cuando hay mucha autocrítica sin acompañamiento: puede reforzar culpas injustas."},
    {"t": "El Naikan se basa en tres preguntas: qué recibí, qué di y qué problemas causé.", "r": "b", "e": "Así lo describe Krech (2002). Se aplican a una persona concreta y a un período acotado."},
    {"t": "Estas prácticas reemplazan un tratamiento psicológico o psiquiátrico.", "r": "a", "e": "Son enfoques para explorar, no sustituyen una evaluación ni un tratamiento cuando hay sufrimiento intenso."}
  ]);

  /* Wabi-sabi y kintsugi */
  var OPS_WABI_SABI_PERFECCIONISMO_CUIDADO = ["Perfeccionismo", "Cuidado"];
  LAB.quiz("wabi-sabi-perfeccionismo-cuidado", [
    {"sinComillas": true, "t": "Reparás con paciencia la taza que te regalaron, aunque la marca quede visible.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 1, "e": "Hay atención y valor por la cosa, y no hace falta esconder la reparación."},
    {"sinComillas": true, "t": "Tirás un trabajo que estaba bien porque tiene un detalle que solo vos notás.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 0, "e": "El estándar no mira que sirva, sino que no tenga ninguna falla."},
    {"sinComillas": true, "t": "Revisás una vez el informe, corregís lo importante y lo mandás.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 1, "e": "Hay esmero y también un punto de corte razonable."},
    {"sinComillas": true, "t": "Repetís una foto treinta veces antes de subirla, y al final no la subís.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 0, "e": "La búsqueda de lo impecable paraliza y termina evitando mostrar algo."},
    {"sinComillas": true, "t": "Ordenás la casa antes de que lleguen invitados, pero dejás lo que no llegás a hacer.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 1, "e": "Se cuida lo que importa sin exigir que todo esté perfecto."},
    {"sinComillas": true, "t": "Sentís vergüenza de que alguien vea tu casa vivida y cancelás la visita.", "ops": OPS_WABI_SABI_PERFECCIONISMO_CUIDADO, "r": 0, "e": "Lo imperfecto se vive como una amenaza al propio valor, no como parte de la vida."}
  ]);
  LAB.quiz("wabi-sabi-mitos", [
    {"t": "El kintsugi es una técnica terapéutica.", "r": "a", "e": "Es una técnica artesanal de reparación de cerámica. Como metáfora puede inspirar, pero no es una terapia."},
    {"t": "El kintsugi consiste en reparar una pieza rota con laca y oro, dejando visible la fractura.", "r": "b", "e": "Esa es la técnica. La metáfora gira alrededor de no ocultar la reparación."},
    {"t": "Cada experiencia dolorosa nos vuelve más bellos o más fuertes.", "r": "a", "e": "Es una idealización. Algunos daños dejan secuelas, y no hace falta encontrarles un sentido positivo."},
    {"t": "El wabi-sabi valora lo imperfecto, lo incompleto y lo pasajero.", "r": "b", "e": "Así lo presenta Koren (1994), como una sensibilidad estética, no como una técnica ni una terapia."},
    {"t": "Aceptar la imperfección quiere decir dejar de cuidar las cosas.", "r": "a", "e": "Se puede cuidar con esmero sin exigir que todo sea impecable. La diferencia está en el motivo."},
    {"t": "Estas metáforas pueden acompañar un proceso, pero no reemplazan la ayuda profesional.", "r": "b", "e": "Sirven para mirar de otra forma. Si un dolor persiste, conviene consultar."}
  ]);

})();
