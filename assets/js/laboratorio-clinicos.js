/* Laboratorios clínicos: plan de seguridad, alcohol y consumos, ataques de pánico, insomnio (TCC-I).
   Requiere lab-base.js. Nada se envía a ningún servidor: lo que se guarda queda solo en este navegador. */
(function () {
  "use strict";
  var LAB = window.LAB;
  if (!LAB) return;
  var leer = function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  var guardar = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };
  var borrar = function (k) { try { localStorage.removeItem(k); } catch (e) {} };

  /* ---------- Plan de seguridad: se guarda solo en este navegador, se puede imprimir ---------- */
  var plan = document.querySelector("[data-ps-plan]");
  if (plan) {
    var CLAVE = "plan-de-seguridad";
    var campos = plan.querySelectorAll("textarea, input[type=text], input[type=tel]");
    var estado = plan.querySelector("[data-ps-estado]");
    var datos = leer(CLAVE) || {};
    campos.forEach(function (c) { if (datos[c.id]) c.value = datos[c.id]; });
    var t = null;
    plan.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var d = {};
        campos.forEach(function (c) { if (c.value.trim()) d[c.id] = c.value; });
        estado.textContent = guardar(CLAVE, d) ? "Guardado en este navegador." : "No se pudo guardar en este navegador: descargalo o imprimilo.";
      }, 500);
    });
    var imprimir = plan.querySelector("[data-ps-imprimir]");
    if (imprimir) imprimir.addEventListener("click", function () { document.body.classList.add("imprimiendo-plan"); window.print(); setTimeout(function () { document.body.classList.remove("imprimiendo-plan"); }, 500); });
    var limpiar = plan.querySelector("[data-ps-borrar]");
    if (limpiar) limpiar.addEventListener("click", function () {
      if (!window.confirm("¿Borrar el plan guardado en este navegador?")) return;
      campos.forEach(function (c) { c.value = ""; });
      borrar(CLAVE);
      estado.textContent = "Se borró el plan de este navegador.";
    });
  }


  LAB.quiz("mitos-suicidio", [
    { t: "Preguntarle a alguien si piensa en suicidarse puede darle la idea.", r: "a", e: "Es un mito. Los estudios muestran que preguntar de forma directa no aumenta el riesgo y muchas veces alivia." },
    { t: "Quien habla de matarse no lo hace.", r: "a", e: "Es un mito. Muchas personas que murieron por suicidio lo habían anticipado de alguna forma. Hay que tomarlo en serio." },
    { t: "Las crisis suicidas suelen ser intensas pero transitorias.", r: "b", e: "Es así: por eso ganar tiempo y alejar los medios salva vidas." },
    { t: "Alejar los medios (medicamentos, armas) no sirve, porque si alguien quiere, encuentra otra forma.", r: "a", e: "Es un mito. Restringir el acceso a los medios es una de las medidas de prevención con más respaldo." },
    { t: "Una mejoría repentina después de una etapa muy mala puede ser una señal de alerta.", r: "b", e: "A veces una calma súbita aparece cuando la persona ya tomó una decisión. Vale la pena preguntar." },
    { t: "Pedir ayuda es una señal de debilidad.", r: "a", e: "Pedir ayuda es una forma de cuidarse, y la mayoría de las personas que atraviesan una crisis suicida, con ayuda, la superan." }
  ]);

  /* ---------- AUDIT-C ---------- */
  var audit = document.querySelector("[data-auditc]");
  if (audit) {
    var salida = audit.querySelector("[data-auditc-salida]");
    var calc = function () {
      var sel = audit.querySelectorAll("select[data-auditc-p]"), total = 0, completas = 0;
      sel.forEach(function (s) { if (s.value !== "") { total += +s.value; completas++; } });
      var sexo = audit.querySelector("[data-auditc-sexo]").value;
      if (completas < sel.length) { salida.textContent = "Respondé las tres preguntas para ver el resultado."; return; }
      var corte = sexo === "hombre" ? 4 : 3;
      var txt = "Puntaje: " + total + " de 12. ";
      if (total >= corte) {
        txt += "Está por encima del punto de corte usado en atención primaria (" + corte + " o más" + (sexo === "hombre" ? " en hombres" : sexo === "mujer" ? " en mujeres" : ", el más prudente") + "). Sugiere un consumo de riesgo que vale la pena revisar con un profesional. ";
        if (total >= 8) txt += "Un puntaje de 8 o más suele indicar un consumo con más riesgo: conviene consultar pronto. ";
      } else {
        txt += "Está por debajo del punto de corte usado en atención primaria. Igual, si el alcohol te preocupa o te trae problemas, vale la pena conversarlo. ";
      }
      salida.textContent = txt + "Es una orientación, no un diagnóstico.";
    };
    audit.addEventListener("change", calc);
    calc();
  }

  /* ---------- Unidades de alcohol en la semana ---------- */
  var uni = document.querySelector("[data-unidades]");
  if (uni) {
    var us = uni.querySelector("[data-unidades-salida]");
    var calcU = function () {
      var gramos = 0;
      uni.querySelectorAll("input[data-gramos]").forEach(function (i) { gramos += (+i.value || 0) * (+i.getAttribute("data-gramos")); });
      var u = gramos / 10;
      us.textContent = gramos ? "En una semana: unos " + Math.round(gramos) + " gramos de alcohol puro, alrededor de " + (Math.round(u * 10) / 10) + " unidades de 10 gramos." : "Completá cuántas bebidas tomaste en la semana.";
    };
    uni.addEventListener("input", calcU);
    calcU();
  }

  /* ---------- Pánico: exposición interoceptiva con reloj y registro ---------- */
  var EJ = {
    hiperventilar: [60, "Respirá rápido y profundo por la boca, como inflando un globo, durante un minuto.", "Mareo, hormigueo, falta de aire"],
    pajita: [60, "Respirá solo a través de una pajita fina, con la nariz tapada, durante un minuto.", "Falta de aire, ahogo"],
    girar: [60, "Sentado en una silla giratoria, girá sobre vos mismo durante un minuto (o parado, despacio, con algo firme cerca).", "Mareo, inestabilidad"],
    cabeza: [30, "Sacudí la cabeza de un lado al otro durante treinta segundos, y después mirá al frente.", "Mareo, desorientación"],
    piernas: [30, "Sentado, poné la cabeza entre las piernas treinta segundos y después levantala rápido.", "Mareo, presión en la cabeza"],
    correr: [60, "Corré en el lugar o subí y bajá un escalón durante un minuto.", "Corazón acelerado, calor, falta de aire"],
    tension: [60, "Tensá todo el cuerpo, como si fueras de madera, durante un minuto.", "Temblor, tensión, debilidad"],
    mirar: [90, "Mirá fijo un punto de la pared, o tu cara en el espejo, durante un minuto y medio.", "Irrealidad, sensación de extrañeza"]
  };
  var inter = document.querySelector("[data-interoceptiva]");
  if (inter) {
    var selE = inter.querySelector("[data-int-ejercicio]"), desc = inter.querySelector("[data-int-desc]"), reloj = inter.querySelector("[data-int-reloj]");
    var btn = inter.querySelector("[data-int-empezar]"), puntaje = inter.querySelector("[data-int-puntaje]"), lista = inter.querySelector("[data-int-lista]");
    var CL = "panico-interoceptiva", registro = leer(CL) || [];
    var pintar = function () {
      lista.innerHTML = "";
      registro.slice(-12).forEach(function (r) {
        var li = document.createElement("li");
        li.textContent = r.f + " · " + r.n + ": intensidad " + r.i + "/10, parecido al pánico " + r.p + "/10, ansiedad " + r.a + "/10";
        lista.appendChild(li);
      });
    };
    var mostrar = function () { var e = EJ[selE.value]; desc.textContent = e[1] + " Sensaciones habituales: " + e[2].toLowerCase() + "."; reloj.textContent = LAB.mmss(e[0]); };
    var timer = null;
    btn.addEventListener("click", function () {
      if (timer) return;
      var seg = EJ[selE.value][0];
      puntaje.hidden = true;
      btn.disabled = true;
      timer = setInterval(function () {
        seg--;
        reloj.textContent = LAB.mmss(Math.max(seg, 0));
        if (seg <= 0) {
          clearInterval(timer); timer = null; btn.disabled = false;
          LAB.campana();
          puntaje.hidden = false;
          puntaje.querySelector("input").focus();
        }
      }, 1000);
    });
    inter.querySelector("[data-int-anotar]").addEventListener("click", function () {
      var v = function (id) { return inter.querySelector(id).value; };
      registro.push({ f: new Date().toLocaleDateString("es-AR"), n: selE.options[selE.selectedIndex].text, i: v("#int-intensidad"), p: v("#int-parecido"), a: v("#int-ansiedad") });
      guardar(CL, registro);
      pintar();
      puntaje.hidden = true;
      mostrar();
    });
    selE.addEventListener("change", mostrar);
    mostrar();
    pintar();
  }

  LAB.quiz("panico-interpretacion", [
    { t: "Me late fuerte el corazón: me está dando un infarto.", r: "a", e: "Es la interpretación catastrófica que, según David Clark, alimenta el círculo del pánico." },
    { t: "Me late fuerte el corazón porque subí la escalera rápido y estoy nervioso.", r: "b", e: "Una explicación realista de la misma sensación." },
    { t: "Me mareo: me voy a desmayar acá mismo.", r: "a", e: "En un ataque de pánico la presión suele subir, no bajar, por eso desmayarse es muy poco frecuente (salvo en quienes se desmayan ante la sangre o las agujas)." },
    { t: "Siento que todo es irreal: me estoy volviendo loco.", r: "a", e: "La sensación de irrealidad es un síntoma frecuente de la ansiedad intensa. Asusta mucho, pero no es locura." },
    { t: "Es una ola de ansiedad: sube, llega a un pico y baja.", r: "b", e: "Así suele ser: un ataque de pánico alcanza su pico en minutos y después cede." },
    { t: "Me falta el aire: me voy a ahogar.", r: "a", e: "Muchas veces la sensación de falta de aire viene de respirar de más, no de menos." }
  ]);
  LAB.quiz("conductas-seguridad", [
    { sinComillas: true, t: "Lleva siempre una botella de agua por si le da un ataque.", r: "a", e: "Alivia, pero le impide comprobar que el ataque pasa solo." },
    { sinComillas: true, t: "Va al supermercado aunque sienta ansiedad, y se queda hasta que la ansiedad baja.", r: "b", e: "Es exposición: aprende que puede atravesar la ansiedad." },
    { sinComillas: true, t: "Solo sale si la acompaña alguien de confianza.", r: "a", e: "Es una conducta de seguridad frecuente en la agorafobia. Se puede ir dejando de a poco." },
    { sinComillas: true, t: "Se sienta cerca de la puerta en el cine, por si tiene que salir.", r: "a", e: "Parece inofensiva, pero mantiene la idea de que hay que escapar." },
    { sinComillas: true, t: "Cuando siente el corazón rápido, en lugar de tomarse el pulso, sigue con lo que estaba haciendo.", r: "b", e: "Deja de chequear y de buscar señales de peligro: así la alarma se va desactivando." }
  ]);

  /* ---------- Insomnio: diario de sueño y ventana de sueño ---------- */
  var diario = document.querySelector("[data-tcci]");
  if (diario) {
    var filas = diario.querySelectorAll("[data-noche]"), res = diario.querySelector("[data-tcci-salida]"), CLS = "tcci-diario";
    var guardado = leer(CLS) || {};
    var min = function (hhmm) { if (!hhmm) return null; var p = hhmm.split(":"); return (+p[0]) * 60 + (+p[1]); };
    var hhmm = function (m) { m = ((Math.round(m) % 1440) + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); };
    var horas = function (m) { return Math.floor(m / 60) + " h " + Math.round(m % 60) + " min"; };
    filas.forEach(function (f, k) {
      f.querySelectorAll("input").forEach(function (i) { var v = guardado[k + "-" + i.name]; if (v) i.value = v; });
    });
    var calcular = function () {
      var noches = [], g = {};
      filas.forEach(function (f, k) {
        var o = {};
        f.querySelectorAll("input").forEach(function (i) { o[i.name] = i.value; if (i.value) g[k + "-" + i.name] = i.value; });
        var a = min(o.acostarse), l = min(o.levantarse);
        if (a === null || l === null) return;
        var cama = l - a; if (cama <= 0) cama += 1440;
        var dormido = cama - (+o.latencia || 0) - (+o.despierto || 0);
        if (dormido > 0 && cama < 1080) noches.push({ cama: cama, dormido: dormido, levantarse: l });
      });
      guardar(CLS, g);
      if (noches.length < 3) { res.innerHTML = "Completá al menos tres noches para ver tus números. Lo ideal son dos semanas."; return; }
      var prom = function (k) { return noches.reduce(function (s, n) { return s + n[k]; }, 0) / noches.length; };
      var cama = prom("cama"), dormido = prom("dormido"), ef = Math.round(dormido / cama * 100);
      var ventana = Math.max(300, Math.round(dormido / 15) * 15);
      var levantar = diario.querySelector("#tcci-hora-fija").value || hhmm(prom("levantarse"));
      var acostarse = hhmm(min(levantar) - ventana);
      var consejo = ef >= 85 ? "Tu eficiencia ya es buena: quizás alcance con el control de estímulos y una hora fija para levantarte. Si ya estás usando una ventana y de día tenés sueño, podés sumarle 15 minutos." :
        ef >= 80 ? "Está cerca del 85 %. Ajustar el tiempo en la cama a lo que realmente dormís puede ayudar a consolidar el sueño; si ya usás una ventana, mantenela una semana más." :
        "Tu eficiencia es baja: pasás mucho tiempo despierto en la cama. La restricción del sueño propone acortar el tiempo en la cama hasta lo que de verdad dormís.";
      res.innerHTML = "<strong>" + noches.length + " noches.</strong> En promedio pasás <strong>" + horas(cama) + "</strong> en la cama y dormís <strong>" + horas(dormido) +
        "</strong>. Eficiencia del sueño: <strong>" + ef + " %</strong>. " + consejo +
        "<br><br>Una ventana de sueño posible: <strong>" + horas(ventana) + "</strong>, de <strong>" + acostarse + "</strong> a <strong>" + levantar + "</strong>, todos los días, también el fin de semana. Nunca menos de 5 horas." +
        (ventana === 300 ? " (Tu promedio era más bajo, pero no se recomienda bajar de 5 horas.)" : "");
    };
    diario.addEventListener("input", calcular);
    var borrarD = diario.querySelector("[data-tcci-borrar]");
    if (borrarD) borrarD.addEventListener("click", function () { diario.querySelectorAll("input").forEach(function (i) { i.value = ""; }); borrar(CLS); calcular(); });
    calcular();
  }
  LAB.quiz("tcci-mitos", [
    { t: "Si no duermo ocho horas, mañana voy a rendir pésimo.", r: "a", e: "La necesidad de sueño varía entre personas, y el cuerpo compensa. Esta idea aumenta la presión por dormir, que justamente lo impide." },
    { t: "Si no me duermo en veinte minutos, conviene levantarme y hacer algo tranquilo.", r: "b", e: "Es el control de estímulos: que la cama vuelva a asociarse con dormir, no con dar vueltas." },
    { t: "Lo mejor después de una mala noche es quedarme en la cama hasta tarde para recuperar.", r: "a", e: "Desordena el reloj y quita presión de sueño para la noche siguiente. Levantarse a la misma hora ayuda más." },
    { t: "Hacer esfuerzo para dormirme me va a ayudar.", r: "a", e: "El sueño no responde al esfuerzo: cuanto más se intenta, más se activa la mente." },
    { t: "Una siesta larga a la tarde puede empeorar el insomnio.", r: "b", e: "Gasta la presión de sueño que necesitás a la noche. Si la necesitás, que sea corta y temprana." },
    { t: "Pasar más tiempo en la cama me da más oportunidades de dormir.", r: "a", e: "Suele ser al revés: más tiempo en la cama fragmenta el sueño. La restricción del sueño se basa en esto." }
  ]);
})();
