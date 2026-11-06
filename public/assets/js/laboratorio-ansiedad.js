/* Laboratorio de ansiedad y preocupación — /laboratorio-de-ansiedad/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* a = útil, b = rumiación */
  LAB.quiz("util", [
    { t: "Mañana tengo la entrevista: ¿qué ropa me pongo y a qué hora salgo para llegar bien?", r: "a", e: "Termina en decisiones concretas. Una vez resueltas, la preocupación puede descansar." },
    { t: "¿Y si en la entrevista me quedo en blanco y todos se dan cuenta de que no sirvo?", r: "b", e: "Es un «¿y si…?» sin acción posible. Lo útil sería preparar dos o tres respuestas y practicarlas." },
    { t: "El médico me pidió un estudio: voy a sacar turno hoy.", r: "a", e: "La preocupación se convierte en un paso concreto." },
    { t: "Hace una hora que pienso qué habrá querido decir con ese «ok» seco.", r: "b", e: "Dar vueltas sobre la intención del otro no lleva a ningún lado. Si importa, se puede preguntar." },
    { t: "Este mes no llego con la plata: voy a revisar los gastos y ver qué puedo postergar.", r: "a", e: "Es una preocupación con un plan." },
    { t: "¿Por qué siempre me pasa todo a mí? ¿Por qué no puedo ser como los demás?", r: "b", e: "Son preguntas que giran sobre sí mismas y suelen bajar el ánimo. Probá cambiar el «por qué» por un «qué puedo hacer»." },
    { t: "Si mi hijo no avisa al llegar, le escribo a las diez.", r: "a", e: "Pone un límite de tiempo y una acción. Es una forma de cuidar sin quedar atrapado." },
    { t: "No paro de imaginar todo lo que puede salir mal en el viaje del mes que viene.", r: "b", e: "La mente recorre escenarios sin fin. Lo útil sería una lista de lo que sí se puede preparar." },
    { t: "Tengo que entregar el trabajo el viernes: hoy hago la primera parte.", r: "a", e: "Convierte la preocupación en un paso chico y posible." },
    { t: "Vuelvo una y otra vez a lo que dije en la reunión de ayer.", r: "b", e: "Revivir lo que ya pasó, sin sacar algo nuevo, es rumiación. Si hubo un error, se puede reparar; si no, dejarlo ir." }
  ]);

  var OPS = ["Catastrofizar", "Leer la mente", "Todo o nada", "Generalizar", "Filtro negativo", "«Debería»"];
  var it = function (t, r, e) { return { t: t, r: OPS.indexOf(r), e: e, ops: OPS.slice() }; };
  LAB.quiz("errores", [
    it("Me duele la cabeza desde ayer: seguro es algo grave.", "Catastrofizar", "Saltar al peor desenlace posible sin evidencia suficiente."),
    it("Mi jefa no me saludó: seguro está enojada conmigo.", "Leer la mente", "Dar por hecho lo que piensa el otro sin preguntarlo."),
    it("Si no me sale perfecto, es un fracaso total.", "Todo o nada", "Ver las cosas en blanco o negro, sin grises."),
    it("Me fue mal en esta entrevista: nunca voy a conseguir trabajo.", "Generalizar", "Sacar una regla para siempre a partir de un solo hecho."),
    it("Me felicitaron por la presentación, pero me trabé una vez: salió horrible.", "Filtro negativo", "Ver solo lo malo e ignorar lo bueno."),
    it("Debería poder con todo sin pedir ayuda.", "«Debería»", "Exigencias rígidas que, cuando no se cumplen, traen culpa o ansiedad."),
    it("Si el avión se mueve un poco, es que se va a caer.", "Catastrofizar", "Leer una señal normal como prueba del desastre."),
    it("Se rieron cuando entré: seguro se burlaban de mí.", "Leer la mente", "Puede haber mil motivos para esa risa."),
    it("Comí una galletita: ya arruiné toda la dieta, me como el paquete.", "Todo o nada", "Un desvío pequeño no anula todo el esfuerzo."),
    it("Todas mis relaciones terminan mal.", "Generalizar", "«Todas» suele ser una exageración que oculta las excepciones.")
  ]);
})();
