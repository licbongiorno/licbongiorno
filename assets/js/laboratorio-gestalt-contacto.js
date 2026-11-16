/* Gestalt, nivel 2: el contacto — /laboratorio-gestalt-contacto/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Asimilado (a) o tragado entero (b). */
  LAB.quiz("masticar", [
    { t: "Mi mamá decía que hay que ahorrar. Lo pensé y me sirve, aunque no ahorro como ella.", r: "a", e: "Tomó la idea, la probó y se quedó con lo que le sirve. Es asimilación." },
    { t: "No sé por qué, pero si no tengo la casa impecable siento que soy un desastre.", r: "b", e: "Una norma que funciona sola, sin saber de dónde viene. Es un introyecto." },
    { t: "En mi familia nadie se divorcia. Por eso sigo, aunque no sea feliz.", r: "b", e: "El mandato decide por encima de lo que vivís. Vale la pena masticarlo." },
    { t: "Mi maestro me enseñó a ser puntual. Lo valoro, y cuando llego tarde no me castigo.", r: "a", e: "Conserva el valor sin la rigidez. Está asimilado." },
    { t: "Tengo que ser fuerte siempre. Nunca me pregunté por qué.", r: "b", e: "«Nunca me lo pregunté» es la marca del introyecto: tragado sin masticar." },
    { t: "Leí que hay que meditar todos los días. Lo probé, me sirve tres veces por semana y así lo hago.", r: "a", e: "Probó la idea y la adaptó a su medida. Eso es masticar." }
  ]);

  var OPS = ["Confluencia", "Introyección", "Proyección", "Retroflexión", "Deflexión", "Egotismo"];
  LAB.quiz("mecanismos", [
    { sinComillas: true, t: "Cuando su pareja le pregunta qué quiere cenar, siempre responde: «lo que vos quieras». Ya no sabe qué le gusta.", ops: OPS, r: 0, e: "La frontera se borró: sus preferencias se diluyeron en las del otro. Es confluencia." },
    { sinComillas: true, t: "Está furiosa con su jefe, no le dice nada, y a la noche se muerde las uñas hasta lastimarse.", ops: OPS, r: 3, e: "El enojo que iba hacia el jefe vuelve hacia ella misma. Es retroflexión." },
    { sinComillas: true, t: "Entra a una reunión y está seguro de que todos piensan que es un incompetente, aunque nadie dijo nada.", ops: OPS, r: 2, e: "Atribuye a los demás su propia autocrítica. Es proyección." },
    { sinComillas: true, t: "Cada vez que su hermano le habla de algo doloroso, ella hace un chiste o cambia de tema.", ops: OPS, r: 4, e: "Se desvía del contacto directo cuando la intensidad sube. Es deflexión." },
    { sinComillas: true, t: "Piensa «una buena madre nunca se enoja con sus hijos» y se siente culpable cada vez que se enoja.", ops: OPS, r: 1, e: "Un mandato tragado entero, que choca con lo que siente. Es introyección." },
    { sinComillas: true, t: "En la fiesta quiere bailar, pero está tan pendiente de cómo se ve que se queda mirando desde un costado.", ops: OPS, r: 5, e: "Se observa y se controla tanto que no se entrega a la experiencia. Es egotismo." },
    { sinComillas: true, t: "Dice que su amigo es muy envidioso, y no ve la envidia que él mismo siente por su amigo.", ops: OPS, r: 2, e: "Ubica afuera un sentimiento propio que no reconoce. Es proyección." },
    { sinComillas: true, t: "En lugar de pedirle a alguien un abrazo, se abraza a sí mismo y dice que no necesita a nadie.", ops: OPS, r: 3, e: "Se da a sí mismo lo que querría recibir de otro. Es retroflexión." }
  ]);
})();
