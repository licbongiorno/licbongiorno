/* Laboratorios temáticos (7): jeong (el lazo que forma el tiempo) y habla interna (Vygotsky).
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

})();
