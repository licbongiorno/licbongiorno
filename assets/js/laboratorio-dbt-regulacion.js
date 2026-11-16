/* DBT, módulo de regulación emocional — /laboratorio-dbt-regulacion-emocional/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  var OPS = ["Prepararme para actuar", "Comunicar algo a otros", "Comunicarme algo a mí"];

  /* Funciones de las emociones: índice de la opción correcta. */
  LAB.quiz("funciones", [
    { sinComillas: true, t: "Un auto frena de golpe frente a vos y saltás hacia atrás antes de pensar.", ops: OPS, r: 0, e: "El miedo preparó al cuerpo para actuar en una fracción de segundo." },
    { sinComillas: true, t: "Tu hijo te ve la cara después de una discusión y te pregunta si estás triste.", ops: OPS, r: 1, e: "Tu expresión comunicó la tristeza sin palabras." },
    { sinComillas: true, t: "Te incomoda cada vez que un compañero hace un chiste sobre vos, y te das cuenta de que te importa más de lo que creías.", ops: OPS, r: 2, e: "La incomodidad te avisó que algo de eso te importa." },
    { sinComillas: true, t: "Sentís enojo y te ponés firme para que no te pasen por encima en una reunión.", ops: OPS, r: 0, e: "El enojo da energía para defenderse y poner límites." },
    { sinComillas: true, t: "Llorás en el velorio y tus amigos se acercan a abrazarte.", ops: OPS, r: 1, e: "El llanto comunica dolor y convoca el cuidado de los demás." },
    { sinComillas: true, t: "Sentís ansiedad antes de firmar un contrato y decidís leerlo otra vez.", ops: OPS, r: 2, e: "La ansiedad te avisó que había algo para revisar. Conviene escucharla, sin tomarla como un hecho." }
  ]);

  /* Ideas de cosas agradables. */
  LAB.azarLista("positivas", [
    "Tomar un café o un mate al sol, sin el celular.",
    "Escuchar un disco entero que te guste.",
    "Llamar a alguien con quien te reís.",
    "Caminar por un lugar con árboles.",
    "Cocinar tu comida favorita.",
    "Ver una película que ya sabés que te encanta.",
    "Darte una ducha larga y caliente.",
    "Leer algunas páginas de un libro por gusto, no por obligación.",
    "Jugar con un animal.",
    "Mirar fotos de un momento lindo."
  ]);
})();
