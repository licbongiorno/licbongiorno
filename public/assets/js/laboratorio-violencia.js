/* Laboratorio de violencia en el vínculo — /laboratorio-de-violencia-en-el-vinculo/
   Requiere lab-base.js. Nada se guarda: ni localStorage ni ningún servidor. */
(function () {
  "use strict";
  var LAB = window.LAB;

  /* Salida rápida: un botón fijo y la tecla Escape dos veces seguidas. Reemplaza la página en el historial. */
  var salir = function () {
    try { document.body.innerHTML = ""; } catch (e) { /* nada */ }
    window.location.replace("https://www.google.com/search?q=clima");
  };
  var b = document.createElement("button");
  b.type = "button";
  b.className = "salida-rapida";
  b.textContent = "Salir rápido";
  b.setAttribute("aria-label", "Salir rápido de esta página");
  b.addEventListener("click", salir);
  document.body.appendChild(b);
  var ultimo = 0;
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var ahora = Date.now();
    if (ahora - ultimo < 800) salir();
    ultimo = ahora;
  });

  /* Señales: cuenta lo marcado sin guardarlo. */
  var caja = document.querySelector("[data-vv-senales]");
  if (caja) {
    var sal = caja.querySelector("[data-vv-resultado]");
    caja.addEventListener("change", function () {
      var n = caja.querySelectorAll("input:checked").length;
      if (!n) sal.textContent = "";
      else if (n < 3) sal.textContent = "Marcaste " + n + ". Aun una sola de estas situaciones merece atención, sobre todo si se repite o si te da miedo. Hablarlo con alguien de confianza o con la línea 144 puede ayudarte a pensarlo.";
      else sal.textContent = "Marcaste " + n + ". Varias de estas señales juntas describen un vínculo con control y violencia. No es tu culpa, y no tenés que resolverlo sola o solo: la línea 144 atiende las 24 horas, es gratuita y confidencial.";
    });
  }

  if (!LAB) return;

  /* Conflicto (a) o señal de violencia (b). */
  LAB.quiz("conflicto", [
    { t: "Discutimos fuerte por cómo repartir los gastos, y al día siguiente lo hablamos y llegamos a un acuerdo.", r: "a", e: "Los dos pudieron decir lo suyo y negociar. Es un conflicto." },
    { t: "Cada vez que salgo con mis amigas me llama diez veces y después no me habla por días.", r: "b", e: "El control y el castigo con silencio buscan limitar tu libertad. Es una señal de violencia psicológica." },
    { t: "No estamos de acuerdo sobre dónde vivir, y cada uno defiende su postura.", r: "a", e: "Un desacuerdo entre iguales, sin miedo. Es un conflicto." },
    { t: "Me dijo que si lo dejo, se mata, y que va a ser mi culpa.", r: "b", e: "Es una amenaza que busca retenerte con culpa y miedo. Es violencia psicológica. Si hay riesgo real para esa persona, el 911 y la guardia son el lugar." },
    { t: "En una discusión me agarró fuerte del brazo para que no me fuera.", r: "b", e: "Impedirte salir y sujetarte es violencia física, aunque no deje marcas." },
    { t: "Se enojó porque me olvidé de su cumpleaños, me lo dijo, y yo le pedí perdón.", r: "a", e: "Expresar un enojo y repararlo es parte de un vínculo. Es un conflicto." },
    { t: "Tengo que mandarle una foto para demostrar dónde estoy.", r: "b", e: "Exigir pruebas de tu ubicación es control. Es una señal de violencia." },
    { t: "Maneja toda la plata y me da lo justo para el supermercado.", r: "b", e: "Controlar el dinero para limitar tu autonomía es violencia económica." }
  ]);

  /* Acompañar: ayuda (a) o no ayuda (b). */
  LAB.quiz("acompanar", [
    { t: "Te creo. No es tu culpa. Estoy acá para lo que necesites.", r: "a", e: "Creerle y quitarle la culpa es lo más importante que podés hacer." },
    { t: "¿Y vos qué hiciste para que se ponga así?", r: "b", e: "Pone la responsabilidad en quien sufre la violencia. Refuerza la culpa que ya siente." },
    { t: "Si no lo dejás ya, no me llames más.", r: "b", e: "Un ultimátum aísla todavía más. Quien sufre violencia necesita a alguien que siga ahí, aun si todavía no puede irse." },
    { t: "¿Querés que busquemos juntas qué opciones tenés? La línea 144 puede orientarnos.", r: "a", e: "Ofrece ayuda concreta sin presionar y respeta sus tiempos." },
    { t: "Yo en tu lugar ya me hubiera ido hace rato.", r: "b", e: "Juzga desde afuera y desconoce lo difícil que es salir. Genera vergüenza." },
    { t: "Sea cual sea tu decisión, voy a seguir acompañándote.", r: "a", e: "Sostener el vínculo sin condiciones es una de las mayores protecciones." }
  ]);
})();
