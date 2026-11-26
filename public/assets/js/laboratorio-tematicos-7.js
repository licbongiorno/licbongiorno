/* Laboratorios temáticos (7): jeong, habla interna (Vygotsky), el yo y el nosotros (Markus y Kitayama) y los Yoga Sutras.
   Requiere lab-base.js. Nada se envía a ningún servidor. Los planes de 7 días y los formularios los maneja lab-base.js. */
(function () {
  "use strict";
  var LAB = window.LAB;
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
