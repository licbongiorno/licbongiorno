/* Psicología positiva: puerta de entrada y tres niveles.
   /laboratorio-de-psicologia-positiva/, /laboratorio-psicologia-positiva-emociones/,
   /laboratorio-psicologia-positiva-fortalezas/, /laboratorio-psicologia-positiva-vinculos-y-sentido/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* PERMA: perfil a partir de cinco barras. */
  var perma = document.querySelector("[data-pp-perma]");
  if (perma) {
    var barras = perma.querySelectorAll("input[type=range]"), sal = perma.querySelector("[data-pp-salida]"), sug = perma.querySelector("[data-pp-sugerencia]");
    var pintar = function () {
      var lista = Array.prototype.map.call(barras, function (b) { return { n: b.getAttribute("data-pp-pilar"), v: +b.value, url: b.getAttribute("data-pp-nivel") }; });
      var orden = lista.slice().sort(function (x, y) { return y.v - x.v; });
      var parejos = orden[0].v === orden[orden.length - 1].v;
      sal.textContent = lista.map(function (x) { return x.n + ": " + x.v; }).join(" · ") + (parejos ? ". Tus cinco pilares están parejos: movés las barras para afinar." : ". Tu pilar más fuerte hoy: " + orden[0].n.toLowerCase() + ". El que más pide atención: " + orden[orden.length - 1].n.toLowerCase() + ".");
      if (parejos) { sug.textContent = "Podés empezar por cualquiera de los tres niveles."; return; }
      var debil = orden[orden.length - 1];
      sug.innerHTML = "";
      var a = document.createElement("a"); a.href = debil.url; a.textContent = "Ver ejercicios para " + debil.n.toLowerCase();
      sug.appendChild(document.createTextNode("Para empezar: ")); sug.appendChild(a); sug.appendChild(document.createTextNode(". Y usá tu pilar más fuerte como apoyo."));
    };
    perma.addEventListener("input", pintar);
    pintar();
  }

  LAB.quiz("positividad", [
    { t: "Hoy fue un día triste. Igual hubo un momento lindo cuando hablé con mi hermana.", r: "a", e: "Reconoce la tristeza y también nota lo bueno. Las dos cosas conviven." },
    { t: "No estés triste, hay gente que está mucho peor.", r: "b", e: "Invalida la emoción y compara. Es positividad tóxica." },
    { t: "Si te pasa algo malo es porque atraés energía negativa.", r: "b", e: "Culpa a la persona por lo que le pasa. No tiene respaldo y suma sufrimiento." },
    { t: "Estoy pasando un duelo. Saborear un café al sol no lo quita, pero me ayuda a sostenerme.", r: "a", e: "Usa una práctica positiva como apoyo, sin negar el dolor." },
    { t: "Tenés que estar bien todo el tiempo; las emociones negativas son tóxicas.", r: "b", e: "Todas las emociones cumplen una función. Pretender estar siempre bien es una exigencia que agota." },
    { t: "Conozco mis fortalezas y las uso para enfrentar lo difícil.", r: "a", e: "Es un uso típico de la psicología positiva: apoyarse en lo que funciona para atravesar lo que duele." }
  ]);

  /* Nivel 1: saborear, ideas. */
  LAB.azarLista("saborear", [
    "Tomá algo caliente y dedicá el primer minuto solo a sentir su sabor y su temperatura.",
    "Mirá el cielo durante dos minutos y notá cómo cambian las nubes o la luz.",
    "Contale a alguien algo bueno que te pasó hoy, con detalles.",
    "Antes de terminar una comida que te gusta, frená y notá que se está terminando.",
    "Guardá una foto mental: cerrá los ojos un instante en un momento lindo y registrá todo.",
    "Escuchá una canción que te encanta sin hacer ninguna otra cosa.",
    "Recordá un buen momento de la semana como si lo estuvieras viviendo de nuevo."
  ]);

  /* Nivel 2: fortalezas elegidas → sugerencias de uso nuevo. */
  var fz = document.querySelector("[data-pp-fortalezas]");
  if (fz) {
    var salF = fz.querySelector("[data-pp-fortalezas-salida]");
    var IDEAS = {
      "Creatividad": "resolvé un problema cotidiano de una forma que nunca probaste",
      "Curiosidad": "preguntale a alguien sobre un tema que no conocés y escuchá de verdad",
      "Juicio": "antes de una decisión, buscá un argumento en contra de tu opinión",
      "Amor por el aprendizaje": "aprendé algo nuevo durante quince minutos, solo por gusto",
      "Perspectiva": "ayudá a alguien a ver una situación desde más lejos",
      "Valentía": "decí algo que pensás y que solés callar",
      "Perseverancia": "terminá algo pequeño que venías postergando",
      "Honestidad": "decí cómo te sentís de verdad cuando te pregunten",
      "Vitalidad": "hacé algo físico al aire libre, con entusiasmo",
      "Amor": "decile a alguien concreto por qué lo querés",
      "Amabilidad": "hacé un favor anónimo",
      "Inteligencia social": "notá cómo se siente alguien que está callado y acercate",
      "Trabajo en equipo": "ofrecé tu ayuda en algo de tu grupo que no te toca",
      "Equidad": "escuchá la versión de alguien con quien no estás de acuerdo",
      "Liderazgo": "organizá algo pequeño con otros: una salida, una tarea",
      "Perdón": "soltá un rencor chico que venís cargando",
      "Humildad": "dejá que otro tenga el protagonismo en una conversación",
      "Prudencia": "antes de responder un mensaje que te altera, esperá una hora",
      "Autorregulación": "proponete un hábito pequeño y cumplilo hoy",
      "Apreciación de la belleza": "buscá algo bello en un lugar que recorrés todos los días",
      "Gratitud": "agradecé a alguien algo que nunca le agradeciste",
      "Esperanza": "escribí cómo te gustaría que sea tu vida dentro de un año",
      "Humor": "hacé reír a alguien que está pasando un mal momento",
      "Espiritualidad": "dedicá diez minutos a algo que te conecte con un sentido más amplio"
    };
    var actualizar = function () {
      var el = Array.prototype.map.call(fz.querySelectorAll("input:checked"), function (c) { return c.value; });
      if (!el.length) { salF.textContent = "Marcá las cinco fortalezas que más sentís como propias."; return; }
      var t = "Elegiste " + el.length + (el.length > 5 ? " (con cinco alcanza: quedate con las que más te representan)" : "") + ". Ideas para usarlas de una manera nueva: ";
      salF.textContent = t + el.slice(0, 5).map(function (n) { return n.toLowerCase() + ": " + IDEAS[n]; }).join("; ") + ".";
    };
    fz.addEventListener("change", actualizar);
    actualizar();
  }

  /* Nivel 2: fluir, desafío frente a habilidad. */
  var fl = document.querySelector("[data-pp-fluir]");
  if (fl) {
    var de = fl.querySelector("#pp-desafio"), ha = fl.querySelector("#pp-habilidad"), salFl = fl.querySelector("[data-pp-fluir-salida]");
    var calc = function () {
      var d = +de.value, h = +ha.value, t;
      if (d <= 3 && h <= 3) t = "Desafío y habilidad bajos: es la zona de la apatía. Subí un poco el desafío o elegí algo que te importe más.";
      else if (d - h >= 3) t = "El desafío supera mucho tu habilidad: es la zona de la ansiedad. Dividí la tarea en partes más chicas o buscá aprender lo que falta.";
      else if (h - d >= 3) t = "Tu habilidad supera mucho el desafío: es la zona del aburrimiento. Agregale dificultad, una meta o un límite de tiempo.";
      else t = "Desafío y habilidad están parejos y altos: es la zona donde puede aparecer el fluir. Cuidá las condiciones: una meta clara, algo que te diga cómo vas y pocas interrupciones.";
      salFl.textContent = "Desafío " + d + ", habilidad " + h + ". " + t;
    };
    fl.addEventListener("input", calc);
    calc();
  }

  /* Nivel 3: responder a las buenas noticias (Gable y otros, 2004). */
  var OPS = ["Activa y constructiva", "Pasiva y constructiva", "Activa y destructiva", "Pasiva y destructiva"];
  LAB.quiz("respuestas", [
    { sinComillas: true, t: "Tu amiga te cuenta que consiguió el trabajo que quería. Le decís: «¡Qué bueno! ¿Cómo te enteraste? Contame todo».", ops: OPS, r: 0, e: "Entusiasmo genuino y preguntas que la invitan a revivir la noticia. Es la única respuesta que, según la investigación, fortalece el vínculo." },
    { sinComillas: true, t: "Le decís: «Ah, qué bien», mientras seguís mirando el celular.", ops: OPS, r: 1, e: "Apoyo tibio, sin interés. Parece amable, pero comunica poca importancia." },
    { sinComillas: true, t: "Le decís: «¿Y no vas a tener mucho más trabajo? Mirá que esos puestos queman».", ops: OPS, r: 2, e: "Le encuentra el problema a la buena noticia. Le quita la alegría." },
    { sinComillas: true, t: "Le decís: «Ah. ¿Viste lo que me pasó a mí hoy?».", ops: OPS, r: 3, e: "Ignora la noticia y cambia el foco. Es la que más distancia genera." },
    { sinComillas: true, t: "Tu hijo te muestra un dibujo. Le decís: «¡Me encantan estos colores! ¿Qué estabas imaginando cuando lo hiciste?».", ops: OPS, r: 0, e: "Celebra y pregunta. Le muestra que lo que le importa a él te importa a vos." },
    { sinComillas: true, t: "Tu pareja te cuenta que corrió diez kilómetros. Le decís: «Bueno, pero mañana vas a estar destruido».", ops: OPS, r: 2, e: "Activa, pero destructiva: se enfoca en lo negativo. Lo constructivo sería: «¡Diez kilómetros! ¿Cómo te sentiste al llegar?»." }
  ]);
})();
