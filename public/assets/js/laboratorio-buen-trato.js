/* Laboratorio de buen trato y paz — /laboratorio-de-buen-trato/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* GIVE (la relación) = a; FAST (el respeto propio) = b. */
  LAB.quiz("give-fast", [
    { t: "«Escucho sin interrumpir y reconozco lo que te pasa, aunque no esté de acuerdo.»", r: "a", e: "Es validación e interés: GIVE. Cuida el vínculo sin renunciar a tu opinión." },
    { t: "«No voy a pedirte perdón de nuevo por algo que ya aclaramos.»", r: "b", e: "Evitar disculpas excesivas y ser justo con uno mismo: FAST." },
    { t: "«No me voy a sumar a esa crítica, no es algo que comparta.»", r: "b", e: "Mantenerse fiel a los valores: FAST, sin atacar al otro." },
    { t: "«Vamos a hablarlo sin levantar la voz. Me importa lo que pensás.»", r: "a", e: "Tono gentil e interés genuino: GIVE. Cuidar la forma es cuidar el vínculo." },
    { t: "«¿Te parece si lo hablamos después de cenar, con más calma?»", r: "a", e: "Propone un espacio sin presionar y con buen ánimo: GIVE." },
    { t: "«No voy a decir que estoy de acuerdo si no lo estoy.»", r: "b", e: "Ser veraz, aunque incomode: FAST. Mentir para evitar el conflicto erosiona el respeto propio." },
    { t: "«Entiendo que estés cansado; igual necesito que hablemos de esto hoy.»", r: "b", e: "Valida, sí, pero el centro es sostener lo que es justo para vos: FAST con un toque de GIVE. Las dos pautas se combinan." }
  ]);

  /* Validar: el índice de la opción correcta. */
  LAB.quiz("validar", [
    { t: "Tu amiga: «Estoy agotada, no doy más con el trabajo.»", ops: ["«Bueno, a todos nos pasa.»", "«Tiene sentido que estés agotada con todo lo que venís cargando.»", "«Deberías renunciar.»"], r: 1, e: "Validar es reconocer que su cansancio tiene sentido. Minimizar o aconsejar de entrada suele dejar al otro sin escucha." },
    { t: "Tu hijo: «Odio la escuela, nadie me entiende.»", ops: ["«No digas eso, la escuela es importante.»", "«Parece que estás pasando un momento muy feo. ¿Qué pasó?»", "«Cuando yo tenía tu edad era peor.»"], r: 1, e: "Reconoce la emoción e invita a contar más. Corregir o comparar cierra la conversación." },
    { t: "Tu pareja: «Me molestó que no me llamaras.»", ops: ["«Estás exagerando, estuve ocupado.»", "«Ya, otra vez con lo mismo.»", "«Entiendo que te haya molestado; te dejé esperando sin saber nada.»"], r: 2, e: "Validar no es darle toda la razón: es reconocer que su molestia se entiende. Después se puede explicar qué pasó." },
    { t: "Un compañero: «Me siento un inútil, me salió todo mal en la presentación.»", ops: ["«Es lógico que te sientas mal; te habías preparado mucho.»", "«No fue para tanto.»", "«La próxima preparate mejor.»"], r: 0, e: "Valida la emoción a partir de lo que pasó. El consejo, si hace falta, llega después." },
    { t: "Tu madre: «Ya no me visitan nunca.»", ops: ["«No es verdad, vinimos hace un mes.»", "«Te entiendo, te debés sentir sola. Me gustaría verte más.»", "«Vos tampoco venís.»"], r: 1, e: "Escucha el sentimiento debajo del reproche. Defenderse con datos o contraatacar suele escalar." }
  ]);

  /* Decir que no en paz (a) o evadir, ceder o atacar (b). */
  LAB.quiz("decir-no", [
    { t: "«Hoy no puedo ir. Te aviso si cambia algo.»", r: "a", e: "Un no claro, sin excusas largas, con una salida honesta." },
    { t: "«Hoy no sé, después veo… capaz, no sé, ya te digo.»", r: "b", e: "La ambigüedad no es amabilidad: deja al otro esperando y a vos sin decir lo que querés." },
    { t: "«No me sirve, pero gracias por pensar en mí.»", r: "a", e: "Agradece y deja el límite sin ataque ni rodeos." },
    { t: "«Sí, claro, aunque no quiero, así no te enojás.»", r: "b", e: "Ceder para evitar el enojo ajeno es lo contrario de FAST: no te respeta a vos." },
    { t: "«¿Otra vez me pedís esto? ¡Siempre lo mismo con vos!»", r: "b", e: "El no está, pero viene con un ataque. El límite se pierde en la pelea." },
    { t: "«Esta vez no voy a poder prestarte el auto. Sé que te complica, y prefiero decírtelo claro.»", r: "a", e: "Un no firme que reconoce lo que le genera al otro. GIVE y FAST a la vez." }
  ]);

  /* Ideas de microgestos. */
  LAB.azarLista("microgestos", [
    "Preguntarle a alguien cómo le fue, y escuchar la respuesta entera.",
    "Agradecer algo que el otro hace siempre y que nadie nota.",
    "Saludar mirando a los ojos a quien te atiende en un negocio.",
    "Dejar el celular boca abajo durante una charla.",
    "Responder un mensaje pendiente que sabés que alguien espera.",
    "Decir «tenés razón» cuando el otro la tiene, sin agregar un «pero».",
    "Contarle a alguien algo que admirás de él o de ella.",
    "No opinar de alguien que no está presente."
  ]);
})();
