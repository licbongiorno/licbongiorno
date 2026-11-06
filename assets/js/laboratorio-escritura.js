/* Laboratorio de escritura expresiva — /laboratorio-de-escritura-expresiva/
   Requiere lab-base.js. El texto no se guarda en ningún lado: vive en la página hasta que la cerrás o lo descargás. */
(function () {
  "use strict";
  var LAB = window.LAB;
  var caja = document.querySelector("[data-escritura]");
  if (!LAB || !caja) return;

  var CONSIGNAS = {
    1: "Escribí sobre una experiencia que te haya afectado mucho y de la que quizás no hablaste con nadie. Contá qué pasó y, sobre todo, qué sentiste y qué pensaste. No te preocupes por la ortografía ni por el orden.",
    2: "Volvé sobre la misma experiencia, o sobre otra que haya aparecido. Esta vez, concentrate en tus emociones: qué sentiste entonces y qué sentís hoy al recordarlo. Dejá que salga lo que salga.",
    3: "Escribí cómo se conecta esta experiencia con otras partes de tu vida: tu infancia, tus vínculos, quién sos hoy, lo que te gustaría ser. ¿Qué tiene que ver con tu historia?",
    4: "Escribí cómo ves hoy lo que pasó. ¿Qué entendés ahora que antes no veías? ¿Qué te llevás, qué todavía duele, qué querés hacer con esto de acá en adelante?"
  };
  var consigna = caja.querySelector("[data-escritura-consigna]"), texto = caja.querySelector("[data-escritura-texto]");
  var reloj = caja.querySelector("[data-escritura-reloj]"), palabras = caja.querySelector("[data-escritura-palabras]");
  var estado = caja.querySelector("[data-escritura-estado]"), minutos = caja.querySelector("[data-escritura-minutos]");
  var bEmpezar = caja.querySelector("[data-escritura-empezar]");
  var dia = function () { var r = caja.querySelector('input[name="dia"]:checked'); return r ? r.value : "1"; };
  var crearReloj = function () {
    return LAB.temporizador((+minutos.value || 20) * 60, reloj, function () {
      estado.textContent = "Tiempo cumplido. Si querés, podés seguir escribiendo. Cuando termines, respirá y volvé de a poco.";
      bEmpezar.textContent = "Empezar el reloj";
      LAB.campana();
    });
  };
  var t = crearReloj();
  var contar = function () {
    var n = (texto.value.trim().match(/\S+/g) || []).length;
    palabras.textContent = n + (n === 1 ? " palabra" : " palabras");
  };
  var pintarConsigna = function () { consigna.textContent = "Día " + dia() + ". " + CONSIGNAS[dia()]; };

  caja.addEventListener("change", function (e) {
    if (e.target.name === "dia") pintarConsigna();
    if (e.target === minutos) { t.frenar(); t = crearReloj(); reloj.textContent = LAB.mmss((+minutos.value) * 60); bEmpezar.textContent = "Empezar el reloj"; }
  });
  texto.addEventListener("input", contar);
  bEmpezar.addEventListener("click", function () {
    if (t.activo()) { t.frenar(); bEmpezar.textContent = "Empezar el reloj"; estado.textContent = "Reloj detenido."; return; }
    t.empezar(); bEmpezar.textContent = "Detener el reloj";
    estado.textContent = "Reloj en marcha. Escribí sin parar.";
    texto.focus();
  });
  caja.querySelector("[data-escritura-bajar]").addEventListener("click", function () {
    if (!texto.value.trim()) { estado.textContent = "Todavía no hay nada escrito para guardar."; return; }
    var hoy = new Date().toLocaleDateString("es-AR");
    LAB.guardarTexto("escritura-expresiva-dia-" + dia() + ".txt", "Escritura expresiva · Día " + dia() + " · " + hoy + "\n\n" + CONSIGNAS[dia()] + "\n\n" + texto.value.trim() + "\n");
    estado.textContent = "Listo: se descargó en tu dispositivo.";
  });
  caja.querySelector("[data-escritura-borrar]").addEventListener("click", function () {
    if (texto.value.trim() && !window.confirm("¿Borrar el texto? No se puede recuperar.")) return;
    texto.value = ""; contar(); estado.textContent = "Texto borrado.";
  });
  pintarConsigna(); contar(); reloj.textContent = LAB.mmss((+minutos.value) * 60);
})();
