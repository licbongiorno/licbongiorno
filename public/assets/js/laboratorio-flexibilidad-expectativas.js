/* Laboratorio de flexibilidad ante las expectativas — /laboratorio-de-flexibilidad-ante-expectativas/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Preferencia (a) o exigencia (b), según Ellis. */
  LAB.quiz("preferencia", [
    { t: "Me gustaría que mi proyecto salga bien, aunque no depende solo de mí.", r: "a", e: "Desea un resultado y reconoce que no lo controla. Es una preferencia: deja lugar a otros desenlaces." },
    { t: "Tiene que salir perfecto, si no, no soporto nada.", r: "b", e: "Convierte el deseo en una orden absoluta. Esa rigidez suele generar más malestar que el fracaso mismo." },
    { t: "Me encantaría que mi familia entienda mi decisión.", r: "a", e: "Un deseo legítimo sobre otra persona. Podés desearlo sin que dependa de ella." },
    { t: "Mi pareja tiene que adivinar lo que necesito.", r: "b", e: "Exige algo a otra persona como si fuera obligatorio. Lo que sí podés hacer es pedirlo." },
    { t: "Ojalá la vida fuera más justa, pero sigo adelante.", r: "a", e: "Desea algo sin convertirlo en una ley. Puede doler, pero permite seguir." },
    { t: "La vida tiene que ser fácil, no puede ser así.", r: "b", e: "Una exigencia sobre cómo debería ser el mundo. Es la frase típica de la rigidez frente a lo que pasa." }
  ]);

  /* Valor (a) o meta (b), según ACT. */
  LAB.quiz("valores", [
    { t: "Quiero recibirme este año.", r: "b", e: "Es un punto de llegada que se cumple o no. Es una meta." },
    { t: "Quiero ser una persona honesta en mis relaciones.", r: "a", e: "Es una dirección que se practica todos los días. Es un valor." },
    { t: "Quiero comprar una casa.", r: "b", e: "Un objetivo concreto que puede cumplirse. Es una meta." },
    { t: "Quiero cuidar a las personas que quiero.", r: "a", e: "Se practica en cada gesto, aunque algunas metas no salgan. Es un valor." },
    { t: "Quiero bajar cinco kilos para fin de año.", r: "b", e: "Una meta medible. Puede servir, pero no define la dirección de tu vida." },
    { t: "Quiero seguir aprendiendo y estar abierto a lo nuevo.", r: "a", e: "Es una forma de estar en la vida, no un logro. Es un valor." }
  ]);

  /* Exigencias para desarmar con una frase de distancia. */
  LAB.azarLista("pensamientos", [
    "Estoy teniendo el pensamiento de que tiene que salir perfecto.",
    "Estoy teniendo el pensamiento de que los demás deberían entenderme sin que lo diga.",
    "Estoy teniendo el pensamiento de que si no sale como planeé, no sirvo.",
    "Estoy teniendo el pensamiento de que la vida debería ser más justa conmigo.",
    "Estoy teniendo el pensamiento de que no puedo soportar esta incertidumbre.",
    "Estoy teniendo el pensamiento de que siempre me tiene que ir mal."
  ]);
})();
