/* Laboratorio Gestalt — /laboratorio-gestalt/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Hablar en primera persona: quiz de tres opciones (r = índice de la correcta). */
  var q = function (t, ops, r, e) { return { t: t, ops: ops, r: r, e: e }; };
  LAB.quiz("primera", [
    q("Uno se cansa de tener que hacer todo.", ["Me canso de tener que hacer todo.", "Todo el mundo se cansaría.", "Es cansador hacer todo."], 0, "«Me canso» te devuelve lo que sentís a vos, en lugar de diluirlo en «uno»."),
    q("Me hiciste enojar.", ["Vos me enojás siempre.", "Me enojé cuando llegaste tarde.", "Es imposible no enojarse con vos."], 1, "Tu enojo es tuyo: lo que el otro hizo fue llegar tarde. Decirlo así abre la conversación en vez de acusar."),
    q("La gente piensa que soy aburrido.", ["Dicen que soy aburrido.", "Todos piensan eso de mí.", "Tengo miedo de que me vean aburrido."], 2, "«La gente piensa» suele esconder un temor propio. Nombrarlo como tuyo te acerca a lo que sentís."),
    q("Es difícil decir que no.", ["Me cuesta decir que no.", "Decir que no es difícil para todos.", "No se puede decir que no."], 0, "«Me cuesta» reconoce tu experiencia y abre la pregunta de por qué."),
    q("No puedo dejar de comer dulces.", ["Los dulces son adictivos.", "No quiero dejar de comer dulces todavía.", "Nadie puede dejar los dulces."], 1, "Perls proponía probar cambiar «no puedo» por «no quiero» para descubrir qué parte de la decisión es nuestra. No siempre aplica, pero vale la pena probarlo."),
    q("Tengo que ir a la reunión familiar.", ["Elijo ir a la reunión familiar, aunque me cueste.", "Me obligan a ir.", "Hay que ir a esas reuniones."], 0, "Cambiar «tengo que» por «elijo» ayuda a ver la responsabilidad y la libertad que hay en lo que hacemos."),
    q("Ese tema me pone triste.", ["Los temas tristes son difíciles.", "Cuando hablamos de eso, me pongo triste.", "Es un tema triste."], 1, "Pasar del tema a la experiencia («me pongo triste») te conecta con lo que sentís ahora.")
  ]);

  /* La silla vacía y las polaridades: el diálogo de dos voces está en lab-base.js ([data-silla]). */
})();
