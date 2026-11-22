/* Laboratorios temáticos (2): culpa y vergüenza, perfeccionismo, celos, soledad y conexión, jubilación y burnout.
   Requiere lab-base.js. Nada se envía a ningún servidor. Los planes de 7 días y los formularios los maneja lab-base.js. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Culpa y vergüenza */
  var OPS_CULPA_VERGUENZA = ["Culpa: habla de lo que hice", "Vergüenza: habla de quién soy"];
  LAB.quiz("culpa-verguenza", [
    {"sinComillas": true, "t": "Se olvidó del cumpleaños de su hermana y piensa: «le fallé; tengo que llamarla hoy y pedirle perdón».", "ops": OPS_CULPA_VERGUENZA, "r": 0, "e": "Habla de una conducta puntual y empuja a reparar. Es el tono de la culpa."},
    {"sinComillas": true, "t": "Se equivocó en una presentación y piensa: «soy un inútil, no sé cómo me dejan estar acá».", "ops": OPS_CULPA_VERGUENZA, "r": 1, "e": "El juicio pasa de la conducta («me equivoqué») a la persona («soy un inútil»). Es el tono de la vergüenza."},
    {"sinComillas": true, "t": "Le gritó a su hijo y siente ganas de sentarse con él y explicarle que se pasó.", "ops": OPS_CULPA_VERGUENZA, "r": 0, "e": "Hay malestar por lo hecho y ganas de repararlo. Eso es culpa."},
    {"sinComillas": true, "t": "Después de contestar mal en una cena, quiere desaparecer y no volver a ver a nadie de esa mesa.", "ops": OPS_CULPA_VERGUENZA, "r": 1, "e": "El impulso es esconderse, no reparar. Suele acompañar a la vergüenza."},
    {"sinComillas": true, "t": "Rompió un objeto que le prestaron y piensa: «tengo que reponerlo, me siento muy mal».", "ops": OPS_CULPA_VERGUENZA, "r": 0, "e": "Se centra en el hecho y en lo que puede hacer. Es culpa."},
    {"sinComillas": true, "t": "Lo criticaron en público y piensa: «todos ven lo poca cosa que soy».", "ops": OPS_CULPA_VERGUENZA, "r": 1, "e": "Aparece el yo entero expuesto ante la mirada de los demás. Es vergüenza."}
  ]);
  var OPS_CULPA_RESPONSABILIDAD = ["Responsabilidad", "Autocastigo"];
  LAB.quiz("culpa-responsabilidad", [
    {"sinComillas": true, "t": "«Me equivoqué. Voy a ver qué se puede arreglar.»", "ops": OPS_CULPA_RESPONSABILIDAD, "r": 0, "e": "Reconoce el error y mira hacia adelante: es responsabilidad."},
    {"sinComillas": true, "t": "«No merezco que me quieran después de lo que hice.»", "ops": OPS_CULPA_RESPONSABILIDAD, "r": 1, "e": "Convierte un hecho en una sentencia sobre el propio valor. No repara nada."},
    {"sinComillas": true, "t": "«Lo que dije lastimó. Le voy a pedir disculpas y a cuidar cómo lo digo.»", "ops": OPS_CULPA_RESPONSABILIDAD, "r": 0, "e": "Nombra el daño y define una acción concreta."},
    {"sinComillas": true, "t": "«Voy a pasar el fin de semana pensando en lo mal que estuve, así aprendo.»", "ops": OPS_CULPA_RESPONSABILIDAD, "r": 1, "e": "Rumiar no es aprender. El castigo no suele producir ningún cambio."},
    {"sinComillas": true, "t": "«Esto no depende solo de mí, pero mi parte es esta, y la asumo.»", "ops": OPS_CULPA_RESPONSABILIDAD, "r": 0, "e": "Reconoce los límites de la propia responsabilidad sin eludirla."},
    {"sinComillas": true, "t": "«No me voy a permitir disfrutar hasta que esto se arregle.»", "ops": OPS_CULPA_RESPONSABILIDAD, "r": 1, "e": "El sufrimiento se usa como pago. A la otra persona no le sirve y a vos te agota."}
  ]);
  LAB.quiz("culpa-mitos", [
    {"t": "La vergüenza nos hace mejores personas porque nos frena de repetir los errores.", "r": "a", "e": "Según la línea de Tangney y Dearing, la vergüenza se asocia más con ocultarse y ponerse a la defensiva. La culpa es la que suele ir de la mano de la reparación."},
    {"t": "Cuando la culpa corresponde, puede ayudar a reparar un daño.", "r": "b", "e": "Al mirar una conducta concreta, la culpa orienta hacia lo que se puede hacer. El problema aparece cuando se vuelve desproporcionada o permanente."},
    {"t": "Si no te sentís culpable, es que no te importa lo que pasó.", "r": "a", "e": "Podés hacerte cargo y reparar sin sufrir de más. Además, a veces se siente culpa por cosas que no dependían de uno."},
    {"t": "Pedir perdón alcanza para que todo quede reparado.", "r": "a", "e": "Ayuda, pero reparar suele incluir hacerse cargo del daño concreto y cambiar lo que depende de uno."},
    {"t": "Se puede sentir culpa por algo que no fue responsabilidad propia.", "r": "b", "e": "Pasa, por ejemplo, ante una pérdida o cuando algo salió mal a alguien cercano. Mirar con calma qué dependía de uno y qué no ayuda a bajarla."},
    {"t": "La vergüenza se supera mejor guardando el secreto.", "r": "a", "e": "Suele crecer en el silencio. Contarlo a alguien de confianza, que escuche sin juzgar, la baja."}
  ]);

  /* Perfeccionismo */
  var OPS_PERFECCIONISMO = ["Chequeo o repaso", "Evitación o postergación", "Autocrítica dura", "Estándar razonable"];
  LAB.quiz("perfeccionismo", [
    {"sinComillas": true, "t": "Relee cuatro veces un correo de tres líneas antes de enviarlo.", "ops": OPS_PERFECCIONISMO, "r": 0, "e": "Revisar de más alivia un instante y obliga a repetirlo la próxima vez."},
    {"sinComillas": true, "t": "No entrega el trabajo hasta que esté «perfecto» y se le pasa la fecha.", "ops": OPS_PERFECCIONISMO, "r": 1, "e": "Postergar para no mostrar algo imperfecto termina costando más que el posible error."},
    {"sinComillas": true, "t": "Sacó un 9 y solo piensa en el punto que perdió: «soy un desastre».", "ops": OPS_PERFECCIONISMO, "r": 2, "e": "Ignora lo logrado y convierte un detalle en un juicio sobre sí mismo."},
    {"sinComillas": true, "t": "Se le quema una de las comidas, la sirve igual y disfruta de la cena.", "ops": OPS_PERFECCIONISMO, "r": 3, "e": "Acepta un resultado imperfecto sin que cambie su valor. Esa es la idea del estándar suficientemente bueno."},
    {"sinComillas": true, "t": "Rehace el informe por tercera vez aunque su jefe ya dijo que estaba bien.", "ops": OPS_PERFECCIONISMO, "r": 0, "e": "Chequeo: sigue buscando el defecto después de recibir la confirmación."},
    {"sinComillas": true, "t": "No se anota al taller de pintura porque «no voy a ser buena».", "ops": OPS_PERFECCIONISMO, "r": 1, "e": "Evita la actividad para no exponerse a hacerlo mal, y se pierde lo que le gustaría vivir."}
  ]);
  LAB.quiz("perfeccionismo-estandares", [
    {"sinComillas": true, "t": "Tenés que mandar un mensaje de trabajo de rutina.", "r": 1, "e": "Una lectura atenta antes de enviar suele alcanzar. Más que eso es chequeo.", "ops": ["No lo mando hasta releerlo cinco veces.", "Lo releo una vez y lo mando.", "Le pido a alguien que lo revise."]},
    {"sinComillas": true, "t": "Invitás gente a comer en tu casa.", "r": 2, "e": "Lo que importa es el encuentro, no que cada detalle salga como en una revista.", "ops": ["Hago un menú de tres pasos que nunca probé.", "Cancelo si no está todo ordenado.", "Hago algo simple que sé que sale bien y disfruto de la gente."]},
    {"sinComillas": true, "t": "Estás aprendiendo un instrumento y practicás.", "r": 0, "e": "Aprender incluye equivocarse muchas veces. El estándar es la práctica, no el resultado.", "ops": ["Practico veinte minutos aunque me salga mal.", "No toco hasta no saber la pieza completa.", "Dejo de practicar porque no avanzo rápido."]},
    {"sinComillas": true, "t": "Tenés que hacer una presentación de diez minutos.", "r": 1, "e": "Prepararla bien está bien. Guionarla palabra por palabra suele aumentar el miedo.", "ops": ["La escribo y la memorizo palabra por palabra.", "La preparo con los puntos principales y acepto que algo salga distinto.", "La delego porque seguro la haría mal."]},
    {"sinComillas": true, "t": "Tu casa recibe una visita improvisada.", "r": 2, "e": "Una casa vivida no es una falta. El estándar puede ser «limpio y ordenado lo básico».", "ops": ["Pido que vuelva otro día.", "Corro a limpiar todo antes de abrir.", "Dejo pasar tal como está y pongo la pava."]}
  ]);
  LAB.quiz("perfeccionismo-mitos", [
    {"t": "Tener estándares altos es lo mismo que ser perfeccionista.", "r": "a", "e": "Se puede aspirar a mucho sin que el valor propio dependa de lograrlo. El problema aparece cuando esa dependencia es total y trae costos."},
    {"t": "Si bajo un poco la vara, mi rendimiento se va a derrumbar.", "r": "a", "e": "Es una predicción, no un hecho. Los experimentos conductuales sirven para ponerla a prueba, y a menudo la diferencia es menor de lo que se teme."},
    {"t": "Revisar una y otra vez mi trabajo me da tranquilidad duradera.", "r": "a", "e": "Alivia un rato y alimenta la necesidad de volver a revisar. Es lo que el modelo llama conducta de chequeo."},
    {"t": "Postergar algo por miedo a no hacerlo perfecto es una forma de perfeccionismo.", "r": "b", "e": "Es la evitación: se deja de empezar para no exponerse a un resultado imperfecto."},
    {"t": "El enfoque cognitivo-conductual cuenta con un modelo y técnicas específicas para el perfeccionismo.", "r": "b", "e": "Shafran, Egan y Wade (2010) lo desarrollan en una guía de autoayuda basada en ese modelo."},
    {"t": "Ser exigente con uno mismo es siempre garantía de éxito.", "r": "a", "e": "La exigencia extrema puede traer agotamiento, evitación y malestar, y no mejora necesariamente los resultados."}
  ]);

  /* Celos */
  var OPS_CELOS_HECHOS = ["Hecho", "Interpretación"];
  LAB.quiz("celos-hechos", [
    {"sinComillas": true, "t": "Mi pareja salió a las 21 y volvió a la 1.", "ops": OPS_CELOS_HECHOS, "r": 0, "e": "Se puede comprobar con un reloj. Es un hecho."},
    {"sinComillas": true, "t": "Seguro se fue para encontrarse con alguien.", "ops": OPS_CELOS_HECHOS, "r": 1, "e": "Nadie lo vio ni lo dijo: es una interpretación, aunque se sienta muy cierta."},
    {"sinComillas": true, "t": "No contestó el mensaje durante tres horas.", "ops": OPS_CELOS_HECHOS, "r": 0, "e": "Es un dato verificable. Lo que significa es otra cosa."},
    {"sinComillas": true, "t": "Si no me contesta, es porque ya no le importo.", "ops": OPS_CELOS_HECHOS, "r": 1, "e": "Pasa de un dato a una conclusión sobre el vínculo, sin evidencia."},
    {"sinComillas": true, "t": "Mencionó dos veces a un compañero de trabajo en la cena.", "ops": OPS_CELOS_HECHOS, "r": 0, "e": "Es lo que se oyó. Lo que implica es una pregunta, no un hecho."},
    {"sinComillas": true, "t": "Se nota que le gusta esa persona.", "ops": OPS_CELOS_HECHOS, "r": 1, "e": "«Se nota» es una lectura. Conviene preguntar o mirar qué otros datos hay."}
  ]);
  var OPS_CELOS_CHEQUEO = ["Alimenta los celos", "Ayuda"];
  LAB.quiz("celos-chequeo", [
    {"sinComillas": true, "t": "Mirar el celular de tu pareja cuando está en la ducha.", "ops": OPS_CELOS_CHEQUEO, "r": 0, "e": "Alivia un rato y deja la duda intacta: la próxima vez vas a querer mirar de nuevo. Además daña la confianza."},
    {"sinComillas": true, "t": "Contarle a tu pareja que te sentiste inseguro y pedirle un rato de charla.", "ops": OPS_CELOS_CHEQUEO, "r": 1, "e": "Es hablar de lo propio. Abre una conversación sin acusar."},
    {"sinComillas": true, "t": "Pedirle varias veces al día que te confirme dónde está.", "ops": OPS_CELOS_CHEQUEO, "r": 0, "e": "Convierte el vínculo en vigilancia y la tranquilidad nunca dura."},
    {"sinComillas": true, "t": "Salir a caminar o llamar a un amigo cuando sentís que la ansiedad crece.", "ops": OPS_CELOS_CHEQUEO, "r": 1, "e": "Baja la activación sin buscar pruebas. Después se puede pensar con más calma."},
    {"sinComillas": true, "t": "Revisar las redes del ex de tu pareja para «saber si hay algo».", "ops": OPS_CELOS_CHEQUEO, "r": 0, "e": "El material nuevo siempre puede interpretarse como amenaza. Alimenta la rumiación."},
    {"sinComillas": true, "t": "Anotar el pensamiento («me va a dejar») y buscar qué datos lo respaldan.", "ops": OPS_CELOS_CHEQUEO, "r": 1, "e": "Es el trabajo cognitivo: tratar el pensamiento como hipótesis, no como un hecho."}
  ]);
  LAB.quiz("celos-mitos", [
    {"t": "Los celos son una prueba de amor.", "r": "a", "e": "Pueden aparecer con mucho amor o con mucha inseguridad. Medir el afecto por la intensidad de los celos es una trampa."},
    {"t": "Sentir celos de vez en cuando es una emoción humana y frecuente.", "r": "b", "e": "Lo que importa es qué hacemos con ellos: si hablamos de lo que sentimos o si controlamos."},
    {"t": "Si reviso un poco más, voy a quedarme tranquilo.", "r": "a", "e": "El chequeo calma un momento y mantiene el ciclo: cada vez hace falta más."},
    {"t": "Controlar con quién sale o qué hace la pareja, o aislarla de su entorno, puede ser una forma de violencia psicológica.", "r": "b", "e": "Aunque se diga que es por amor. Si pasa en tu vínculo, mirá el laboratorio de violencia en el vínculo."},
    {"t": "Hablar de lo que sentís sin acusar suele abrir una conversación más útil que pedir pruebas.", "r": "b", "e": "El reproche pone al otro a la defensiva, y contar lo propio permite escuchar."},
    {"t": "Si dudo, es porque seguramente hay algo que me están ocultando.", "r": "a", "e": "Dudar es una sensación, no una prueba. Conviene separar lo que sabés de lo que imaginás."}
  ]);

  /* Soledad */
  var OPS_SOLEDAD_TIPOS = ["Soledad elegida", "Soledad que duele"];
  LAB.quiz("soledad-tipos", [
    {"sinComillas": true, "t": "Pasa el domingo leyendo y caminando solo, y se siente tranquilo.", "ops": OPS_SOLEDAD_TIPOS, "r": 0, "e": "Es un tiempo buscado que lo recarga. Esa soledad no necesita corregirse."},
    {"sinComillas": true, "t": "Está en una fiesta rodeado de gente y siente que no pertenece.", "ops": OPS_SOLEDAD_TIPOS, "r": 1, "e": "La soledad no depende de la compañía física sino de la sensación de conexión."},
    {"sinComillas": true, "t": "Se mudó de ciudad, hace meses que no habla con nadie y le pesa el silencio de la casa.", "ops": OPS_SOLEDAD_TIPOS, "r": 1, "e": "Una red que se rompió con el cambio: la falta es de vínculos, no de ganas de estar solo."},
    {"sinComillas": true, "t": "Elige escribir por la mañana a solas, y a la tarde ve a sus amigos.", "ops": OPS_SOLEDAD_TIPOS, "r": 0, "e": "Alterna soledad buscada con contacto. Es un equilibrio saludable."},
    {"sinComillas": true, "t": "Quiere ver gente pero no se anima a invitar a nadie y cada semana lo posterga.", "ops": OPS_SOLEDAD_TIPOS, "r": 1, "e": "Quiere contacto y algo se lo impide. Esa distancia es la que duele."},
    {"sinComillas": true, "t": "Hace años que vive solo y disfruta su casa, su rutina y sus encuentros ocasionales.", "ops": OPS_SOLEDAD_TIPOS, "r": 0, "e": "Vivir solo no implica sentirse solo."}
  ]);
  var OPS_SOLEDAD_SESGOS = ["Esperar rechazo", "Leer en negativo", "Retirarse para protegerse", "Alternativa realista"];
  LAB.quiz("soledad-sesgos", [
    {"sinComillas": true, "t": "Va a una reunión convencido de que nadie le va a hablar.", "ops": OPS_SOLEDAD_SESGOS, "r": 0, "e": "Anticipa el rechazo antes de que pase, y llega a la defensiva."},
    {"sinComillas": true, "t": "Un amigo contesta «ok» y piensa que está harto de él.", "ops": OPS_SOLEDAD_SESGOS, "r": 1, "e": "Toma una respuesta breve como señal de rechazo, cuando puede tener muchas otras razones."},
    {"sinComillas": true, "t": "Rechaza una invitación «para no molestar».", "ops": OPS_SOLEDAD_SESGOS, "r": 2, "e": "Se aleja antes de ser rechazado. Alivia hoy y refuerza la soledad mañana."},
    {"sinComillas": true, "t": "Piensa: «no contestó, capaz está ocupado; le escribo mañana».", "ops": OPS_SOLEDAD_SESGOS, "r": 3, "e": "Considera otra explicación posible y no se retira."},
    {"sinComillas": true, "t": "Después de la cena recuerda solo el silencio incómodo y olvida las risas.", "ops": OPS_SOLEDAD_SESGOS, "r": 1, "e": "Se queda con lo negativo y descarta lo que sí funcionó."},
    {"sinComillas": true, "t": "Deja de escribir al grupo porque «seguro no les importa».", "ops": OPS_SOLEDAD_SESGOS, "r": 2, "e": "Se retira para evitar un posible rechazo, sin ponerlo a prueba."}
  ]);
  LAB.quiz("soledad-mitos", [
    {"t": "Estar solo y sentirse solo son lo mismo.", "r": "a", "e": "Se puede estar solo y sentirse bien, o acompañado y sentirse solo. Lo que cuenta es la conexión que uno percibe."},
    {"t": "Se puede estar rodeado de gente y sentirse solo.", "r": "b", "e": "Es frecuente cuando los vínculos no son cercanos o uno no se siente visto."},
    {"t": "Sentirse solo es una falla personal.", "r": "a", "e": "Cacioppo la describe como una señal, parecida al hambre: avisa que una necesidad de vínculo no está cubierta."},
    {"t": "Tener muchos contactos en redes sociales resuelve la soledad.", "r": "a", "e": "Lo que pesa es la calidad del contacto, no la cantidad. Las redes pueden acompañar, pero no reemplazan los vínculos cercanos."},
    {"t": "Elegir momentos de soledad puede ser saludable.", "r": "b", "e": "La soledad buscada permite descansar, pensar y crear. Lo que preocupa es la que duele y se prolonga."},
    {"t": "Para dejar de sentirme solo tengo que cambiar toda mi vida social de golpe.", "r": "a", "e": "Los pasos chicos y sostenidos suelen ser más posibles que un cambio radical."}
  ]);

  /* Jubilación */
  var OPS_JUBILACION_APORTES = ["Estructura del tiempo", "Identidad y lugar", "Vínculos cotidianos", "Sentido y utilidad"];
  LAB.quiz("jubilacion-aportes", [
    {"sinComillas": true, "t": "Se despierta a las siete sin saber qué hacer y el día se le hace interminable.", "ops": OPS_JUBILACION_APORTES, "r": 0, "e": "Extraña la estructura. Ayuda armar un esquema semanal con algunas anclas fijas."},
    {"sinComillas": true, "t": "Cuando le preguntan qué hace, no sabe qué contestar.", "ops": OPS_JUBILACION_APORTES, "r": 1, "e": "El oficio daba una respuesta a «quién soy». Hay que ensanchar esa respuesta."},
    {"sinComillas": true, "t": "Extraña el café de la mañana con sus compañeros y las charlas de pasillo.", "ops": OPS_JUBILACION_APORTES, "r": 2, "e": "Echa de menos el contacto cotidiano. Conviene sostener algunos vínculos del trabajo y sumar otros."},
    {"sinComillas": true, "t": "Siente que ya nadie lo necesita y que lo que sabe no sirve.", "ops": OPS_JUBILACION_APORTES, "r": 3, "e": "Se perdió la sensación de ser útil. Un proyecto o un voluntariado puede devolverla."},
    {"sinComillas": true, "t": "No sabe qué día es: todos le parecen iguales.", "ops": OPS_JUBILACION_APORTES, "r": 0, "e": "La falta de hitos semanales desdibuja el tiempo. Los horarios y las citas lo ordenan."},
    {"sinComillas": true, "t": "Después de tantos años de cargo, se siente «uno más» y eso le pesa.", "ops": OPS_JUBILACION_APORTES, "r": 1, "e": "Se perdió un rol con reconocimiento. Hay que buscar otros espacios donde su historia valga."}
  ]);
  LAB.quiz("jubilacion-mitos", [
    {"t": "La jubilación es solo descanso, no hace falta prepararla.", "r": "a", "e": "Es un cambio de horarios, de roles y de identidad. Pensarla antes ayuda a transitarla."},
    {"t": "Es frecuente que llevar tiempo adaptarse a la nueva rutina.", "r": "b", "e": "Pasa a muchas personas y no significa que algo haya salido mal."},
    {"t": "Para estar bien hay que mantenerse ocupado todo el día.", "r": "a", "e": "No se trata de llenar horas. Alcanza con algunas actividades que den estructura y sentido."},
    {"t": "Mantener vínculos, hábitos y valores propios ayuda a atravesar la etapa.", "r": "b", "e": "Es la idea de continuidad de Atchley (1989): conservar lo que ya forma parte de uno."},
    {"t": "Si extraño mi trabajo, es que me equivoqué al jubilarme.", "r": "a", "e": "Extrañar parte de lo que daba el trabajo es esperable. No siempre es arrepentimiento."},
    {"t": "A cierta edad es tarde para empezar algo nuevo.", "r": "a", "e": "Se pueden aprender cosas y armar proyectos en cualquier momento. Lo importante es que tengan sentido para vos."}
  ]);

  /* Burnout */
  var OPS_BURNOUT_DIMENSIONES = ["Agotamiento", "Cinismo o distancia", "Ineficacia"];
  LAB.quiz("burnout-dimensiones", [
    {"sinComillas": true, "t": "Duerme y no se repone; llega al trabajo ya vaciada.", "ops": OPS_BURNOUT_DIMENSIONES, "r": 0, "e": "Es el agotamiento emocional y físico, la dimensión central del burnout."},
    {"sinComillas": true, "t": "Antes le gustaba su trabajo y ahora trata a los pacientes con frialdad y fastidio.", "ops": OPS_BURNOUT_DIMENSIONES, "r": 1, "e": "Es el cinismo o la despersonalización: tomar distancia como forma de protegerse."},
    {"sinComillas": true, "t": "Siente que haga lo que haga, no logra nada y que ya no es buena en lo suyo.", "ops": OPS_BURNOUT_DIMENSIONES, "r": 2, "e": "Es la sensación de ineficacia y de pérdida del sentido de logro."},
    {"sinComillas": true, "t": "Los domingos a la tarde se le cierra el pecho de pensar en el lunes.", "ops": OPS_BURNOUT_DIMENSIONES, "r": 0, "e": "El agotamiento anticipa el desgaste que viene."},
    {"sinComillas": true, "t": "Se burla de sus compañeros y piensa «a nadie le importa nada de esto».", "ops": OPS_BURNOUT_DIMENSIONES, "r": 1, "e": "El cinismo suele aparecer como una coraza frente al desgaste."},
    {"sinComillas": true, "t": "Cada tarea le parece un mundo y duda de si alguna vez sirvió para algo.", "ops": OPS_BURNOUT_DIMENSIONES, "r": 2, "e": "Aparece la duda sobre la propia eficacia y la pérdida de sentido."}
  ]);
  var OPS_BURNOUT_RESPONSABILIDAD = ["Puedo trabajarlo yo", "Es de la organización"];
  LAB.quiz("burnout-responsabilidad", [
    {"sinComillas": true, "t": "Apagar las notificaciones del trabajo fuera de horario en tu teléfono.", "ops": OPS_BURNOUT_RESPONSABILIDAD, "r": 0, "e": "Es un límite personal que podés poner."},
    {"sinComillas": true, "t": "Un volumen de trabajo para tres personas repartido entre una.", "ops": OPS_BURNOUT_RESPONSABILIDAD, "r": 1, "e": "La sobrecarga es una condición del trabajo. Se puede nombrar y plantear, pero no se resuelve solo con organización personal."},
    {"sinComillas": true, "t": "Tomarte el almuerzo lejos del escritorio.", "ops": OPS_BURNOUT_RESPONSABILIDAD, "r": 0, "e": "Es una pausa que depende de vos, siempre que el trabajo lo permita."},
    {"sinComillas": true, "t": "Un jefe que cambia las prioridades todos los días sin explicar.", "ops": OPS_BURNOUT_RESPONSABILIDAD, "r": 1, "e": "La falta de control y de claridad es organizacional. Podés pedir criterios, pero el cambio no depende solo de vos."},
    {"sinComillas": true, "t": "Pedir por escrito una reunión para plantear que la carga actual no es sostenible.", "ops": OPS_BURNOUT_RESPONSABILIDAD, "r": 0, "e": "Plantearlo es una acción que depende de vos, aunque la respuesta no."},
    {"sinComillas": true, "t": "Un sueldo que no acompaña y falta de reconocimiento.", "ops": OPS_BURNOUT_RESPONSABILIDAD, "r": 1, "e": "La falta de recompensa es una de las fuentes de burnout que identifican Maslach y Leiter (1997)."}
  ]);
  LAB.quiz("burnout-mitos", [
    {"t": "El burnout es una debilidad personal.", "r": "a", "e": "Maslach y Leiter (1997) mostraron que pesan mucho las condiciones del trabajo: sobrecarga, falta de control, poco reconocimiento."},
    {"t": "Unas vacaciones alcanzan para resolver el burnout.", "r": "a", "e": "Descansar ayuda, pero si las condiciones no cambian, es esperable que el desgaste vuelva."},
    {"t": "Según la OMS, el burnout es un fenómeno ocupacional y no una enfermedad.", "r": "b", "e": "La CIE-11 (2019) lo describe como síndrome por estrés crónico en el trabajo que no se manejó con éxito."},
    {"t": "El cinismo con el trabajo es simplemente mala actitud.", "r": "a", "e": "Suele ser una forma de distancia protectora ante el agotamiento, y es una de las tres dimensiones."},
    {"t": "El burnout puede parecerse a una depresión, y conviene que lo evalúe un profesional.", "r": "b", "e": "Comparten síntomas. Una evaluación ayuda a distinguirlos y a decidir el tratamiento."},
    {"t": "Pedir ayuda a tiempo forma parte de la recuperación.", "r": "b", "e": "Consultar antes de que el desgaste avance suele facilitar la salida."}
  ]);

})();
