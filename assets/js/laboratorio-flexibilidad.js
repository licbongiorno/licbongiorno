/* Laboratorio de flexibilidad yoica — /laboratorio-de-flexibilidad-yoica/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* ---------- Otras explicaciones posibles ---------- */
  var SITUACIONES = [
    ["Le escribí a una amiga y no me contestó en todo el día.", "Está con mucho trabajo; vio el mensaje y se olvidó de responder; está pasando algo difícil; no le llegó la notificación; quiere contestarte con tiempo."],
    ["Mi jefe pasó al lado mío y no me saludó.", "Iba pensando en otra cosa; está preocupado por algo; no me vio; tuvo una mala mañana; es así con todos."],
    ["Mi pareja llegó a casa callada y se fue directo a la ducha.", "Tuvo un mal día; está cansada o cansado; necesita un rato a solas antes de hablar; le duele algo; está pensando en un problema propio."],
    ["En la reunión familiar mi hermano no me pidió opinión.", "Pensó que ya sabía lo que yo opinaba; estaba nervioso; no se le ocurrió; quiso evitar una discusión; también le cuesta pedir opiniones a otros."],
    ["Una persona que conozco cruzó de vereda cuando me vio.", "No me vio; tenía que ir a un negocio de enfrente; estaba apurada; le daba vergüenza algo suyo; iba hablando por teléfono."],
    ["Un amigo canceló el plan a último momento.", "Le surgió un imprevisto; está con poca energía; tuvo un problema familiar; se sintió mal; le costó decir antes que no podía."],
    ["Publiqué algo y nadie reaccionó.", "El algoritmo no lo mostró; la gente lo vio y no reaccionó, pero lo leyó; era un horario de poco movimiento; no siempre reaccionamos a lo que nos gusta."],
    ["Mi hijo adolescente me contestó mal cuando le pregunté cómo le fue.", "Tuvo un mal día en la escuela; está cansado; necesita espacio; le da vergüenza algo; es parte de separarse de los padres a esa edad."]
  ];
  var caja = document.querySelector("[data-flex-explicaciones]");
  if (caja) {
    var sit = caja.querySelector("[data-flex-situacion]"), ej = caja.querySelector("[data-flex-ejemplos]"), txt = caja.querySelector("textarea");
    var actual = LAB.azar(SITUACIONES);
    sit.textContent = "«" + actual[0] + "»";
    caja.querySelector("[data-flex-ver]").addEventListener("click", function () {
      ej.textContent = "Algunas posibles: " + actual[1] + " Ninguna es seguramente la verdadera; lo importante es que hay más de una.";
      ej.hidden = false;
    });
    caja.querySelector("[data-flex-otra]").addEventListener("click", function () {
      actual = LAB.azar(SITUACIONES.filter(function (s) { return s !== actual; }));
      ej.hidden = true; txt.value = ""; LAB.poner(sit, "«" + actual[0] + "»");
    });
  }

  /* ---------- ¿Qué hago para no sentir? (quiz de varias opciones) ---------- */
  var OPS = ["Negación", "Racionalización", "Desplazamiento", "Proyección", "Humor", "Intelectualización"];
  var item = function (t, r, e) { return { t: t, r: OPS.indexOf(r), e: e, ops: OPS.slice() }; };
  LAB.quiz("defensas", [
    item("Después de un día terrible en el trabajo, Laura llega a casa y le grita a su perro por ladrar.", "Desplazamiento", "La emoción se descarga sobre alguien «más seguro» que quien la provocó."),
    item("Hace meses que Pablo tiene un dolor en el pecho y dice: «No es nada, ya se me va a pasar».", "Negación", "No registrar algo evidente que asusta. A veces protege; otras, demora lo que hace falta atender."),
    item("Martín no se presentó a la entrevista y explica: «Total, el sueldo no era tan bueno».", "Racionalización", "Una razón lógica que tapa el verdadero motivo, muchas veces el miedo."),
    item("Ana, que es muy competitiva, dice que su compañera «es una envidiosa que quiere ganar siempre».", "Proyección", "Ver con claridad en otro algo propio que no se reconoce."),
    item("En el velorio de su abuelo, Diego cuenta anécdotas graciosas y todos se ríen entre lágrimas.", "Humor", "Reírse de lo que duele sin negarlo. Es una de las defensas más sanas."),
    item("Después de su separación, Sofía habla del divorcio solo en términos de estadísticas y teorías del apego.", "Intelectualización", "Hablar de lo doloroso desde lo técnico para no sentirlo."),
    item("Carlos discute con su madre y después pasa la tarde criticando a su compañero de oficina.", "Desplazamiento", "El enojo con la madre encontró un destino más fácil."),
    item("Cuando le preguntan si está triste por la mudanza de su mejor amiga, Juli responde: «¿Triste? Para nada».", "Negación", "Negar la emoción no la hace desaparecer; muchas veces vuelve por otro lado."),
    item("Tomás no estudió y dice que el examen estaba «mal armado y era injusto para todos».", "Racionalización", "Una explicación razonable que protege la autoestima."),
    item("A Lucía le cuesta pedir ayuda y critica a sus amigas porque «son unas dependientes».", "Proyección", "Lo que rechazamos de nosotros suele aparecer con fuerza en los demás.")
  ]);

  /* ---------- Pequeños cambios ---------- */
  LAB.azarLista("cambios", [
    "Hacé un trayecto de siempre por otro camino.",
    "Desayuná algo que nunca desayunás.",
    "Escuchá un género de música que no te gusta, con curiosidad, durante una canción completa.",
    "Cambiá de lugar en la mesa a la hora de comer.",
    "Dejá que otra persona elija la película o el plan de hoy, sin opinar.",
    "Usá tu mano no dominante para lavarte los dientes.",
    "Antes de responder una opinión distinta a la tuya, decí «contame más».",
    "Reordená un estante o un cajón de una forma nueva.",
    "Empezá el día por la tarea que siempre dejás para el final.",
    "Hacé una pregunta en un lugar donde normalmente te quedás callado o callada.",
    "Salí sin el celular durante media hora.",
    "Cociná una receta de un país que no conocés."
  ]);
})();
