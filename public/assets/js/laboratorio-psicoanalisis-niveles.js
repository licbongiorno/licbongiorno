/* Recorrido psicoanalítico: puerta de entrada y niveles 1 y 3.
   /laboratorio-recorrido-psicoanalitico/, /laboratorio-psicoanalisis-freud/, /laboratorio-psicoanalisis-klein-winnicott/
   Requiere lab-base.js. Nada se envía a ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;

  /* Mito (a) o realidad (b). */
  LAB.quiz("mitos-psicoanalisis", [
    { t: "El psicoanálisis dice que todo es sexual.", r: "a", e: "Freud le dio un lugar central a la sexualidad, en un sentido amplio que incluye el placer y el deseo. Pero el psicoanálisis no reduce todo a eso, y las corrientes posteriores pusieron el foco en otros temas, como los vínculos tempranos." },
    { t: "Un análisis siempre dura muchos años y se hace en un diván.", r: "a", e: "Hay análisis largos, pero también tratamientos de orientación psicoanalítica más breves, cara a cara, con distinta frecuencia." },
    { t: "Lo que no recordamos de la infancia puede seguir influyendo en cómo nos vinculamos.", r: "b", e: "Es una de las ideas centrales del psicoanálisis, y también la retoman la teoría del apego y otras corrientes." },
    { t: "El analista interpreta todo lo que decís y te dice qué te pasa.", r: "a", e: "El trabajo es conjunto: el analista escucha y ofrece intervenciones, pero el sentido se construye entre los dos y lo descubre el paciente." },
    { t: "Todos usamos mecanismos de defensa, y muchas veces nos protegen.", r: "b", e: "Las defensas son normales. El problema aparece cuando son tan rígidas que no dejan ver lo que pasa." },
    { t: "Los sueños pueden decir algo de nosotros.", r: "b", e: "Freud llamó a los sueños «la vía regia» hacia lo inconsciente. El sentido de cada sueño se descubre asociando, no con un diccionario de símbolos." }
  ]);

  /* Nivel 1: mecanismos de defensa. */
  var OPS = ["Represión", "Proyección", "Formación reactiva", "Racionalización", "Desplazamiento", "Sublimación"];
  LAB.quiz("defensas", [
    { sinComillas: true, t: "No puede recordar casi nada del año en que se separaron sus padres.", ops: OPS, r: 0, e: "Lo doloroso queda fuera de la conciencia. Es represión." },
    { sinComillas: true, t: "Está convencido de que su compañero le tiene envidia, cuando es él quien envidia al compañero.", ops: OPS, r: 1, e: "Atribuye a otro un sentimiento propio que no puede reconocer. Es proyección." },
    { sinComillas: true, t: "Es exageradamente amable con una persona que, en el fondo, le cae muy mal.", ops: OPS, r: 2, e: "Transforma un sentimiento en su opuesto, de forma exagerada. Es formación reactiva." },
    { sinComillas: true, t: "No consiguió el trabajo y dice: «En realidad no me convenía, quedaba lejos».", ops: OPS, r: 3, e: "Encuentra una explicación razonable para no sentir la frustración. Es racionalización." },
    { sinComillas: true, t: "Su jefe la maltrató todo el día y, al llegar a casa, le grita a su perro.", ops: OPS, r: 4, e: "Descarga la emoción sobre un blanco más seguro. Es desplazamiento." },
    { sinComillas: true, t: "Canaliza una agresividad que lo asustaba en el boxeo, donde se volvió un buen deportista.", ops: OPS, r: 5, e: "Dirige la energía hacia algo valorado socialmente. Es sublimación, la defensa que Freud consideraba más madura." }
  ]);

  /* Nivel 3: escisión (a) o integración (b). */
  LAB.quiz("escision", [
    { t: "Mi ex es una mala persona, nunca me quiso, todo fue una mentira.", r: "a", e: "Todo lo bueno del vínculo desaparece. Es escisión: comprensible cuando duele mucho, pero deja una imagen parcial." },
    { t: "Mi ex me lastimó mucho, y también hubo momentos en que me quiso de verdad.", r: "b", e: "Sostiene lo bueno y lo malo en la misma persona. Es integración." },
    { t: "Mi nueva terapeuta es perfecta, la mejor que conocí; la anterior era un desastre.", r: "a", e: "Idealizar a uno y devaluar al otro es una forma típica de escisión." },
    { t: "Mi mamá me cuidó como pudo, y hubo cosas que me faltaron.", r: "b", e: "Reconoce el cuidado y la falta a la vez. Es la posición depresiva: más dolorosa, pero más real." },
    { t: "Ahora que me falló una vez, ya no puedo confiar en él para nada.", r: "a", e: "Un error borra todo lo anterior. La integración permitiría ver el error dentro de una historia más amplia." },
    { t: "Me enojé con mi amiga y sigo queriéndola.", r: "b", e: "El enojo y el amor conviven. Esa es la capacidad que Klein describe en la posición depresiva." }
  ]);
})();
