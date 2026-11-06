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

  /* La silla vacía y las polaridades: diálogo escrito alternando dos voces. */
  document.querySelectorAll("[data-silla]").forEach(function (caja) {
    var dialogo = caja.querySelector("[data-silla-dialogo]"), texto = caja.querySelector("[data-silla-texto]");
    var turno = caja.querySelector("[data-silla-turno]"), estado = caja.querySelector("[data-silla-estado]");
    var nombres = { a: caja.querySelector('[data-silla-nombre="a"]'), b: caja.querySelector('[data-silla-nombre="b"]') };
    var defecto = { a: caja.getAttribute("data-silla-a"), b: caja.getAttribute("data-silla-b") };
    var actual = "a", lineas = [];
    var nombre = function (k) { return nombres[k].value.trim() || defecto[k]; };
    var pintarTurno = function () { turno.textContent = "Habla: " + nombre(actual); caja.setAttribute("data-silla-actual", actual); };
    var pintar = function () {
      dialogo.innerHTML = "";
      lineas.forEach(function (l) {
        var li = document.createElement("li");
        li.className = "lab-dialogo__linea lab-dialogo__linea--" + l.k;
        li.innerHTML = "<strong></strong> <span></span>";
        li.querySelector("strong").textContent = nombre(l.k) + ":";
        li.querySelector("span").textContent = l.t;
        dialogo.appendChild(li);
      });
    };
    caja.querySelector("[data-silla-cambiar]").addEventListener("click", function () {
      var t = texto.value.trim();
      if (!t) { texto.focus(); return; }
      lineas.push({ k: actual, t: t });
      actual = actual === "a" ? "b" : "a";
      texto.value = ""; pintar(); pintarTurno();
      estado.textContent = "Cambiaste de silla. Ahora habla: " + nombre(actual) + ".";
      texto.focus();
    });
    [nombres.a, nombres.b].forEach(function (n) { n.addEventListener("input", function () { pintar(); pintarTurno(); }); });
    caja.querySelector("[data-silla-bajar]").addEventListener("click", function () {
      if (!lineas.length) { estado.textContent = "Todavía no hay diálogo para guardar."; texto.focus(); return; }
      LAB.guardarTexto(caja.getAttribute("data-silla-archivo") + ".txt", "Diálogo entre " + nombre("a") + " y " + nombre("b") + "\n\n" +
        lineas.map(function (l) { return nombre(l.k) + ": " + l.t; }).join("\n\n") + "\n");
      estado.textContent = "Listo: se descargó en tu dispositivo.";
    });
    caja.querySelector("[data-silla-reiniciar]").addEventListener("click", function () {
      lineas = []; actual = "a"; texto.value = ""; pintar(); pintarTurno(); estado.textContent = "Diálogo borrado.";
    });
    pintarTurno();
  });
})();
