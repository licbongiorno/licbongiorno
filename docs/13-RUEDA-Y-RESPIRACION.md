# «La rueda de las emociones» y «Respirar, volver al presente»

## La rueda de las emociones (`/laboratorio-rueda-de-las-emociones/`)

Archivos: `contenido/paginas/laboratorio-rueda-de-las-emociones.html` · `assets/js/rueda-emociones.js` · estilos `.re-*` en `interactivo.css`.

**Fundamento.** Modelo organizador único: la teoría psicoevolutiva de Robert Plutchik (ocho emociones primarias en
pares opuestos —alegría/tristeza, confianza/aversión, miedo/ira, sorpresa/anticipación—, tres intensidades y díadas).
Modelos complementarios, sin mezclar sus categorías: Russell (plano de valencia y activación), Ekman (explicado aparte;
el laboratorio de emociones existente sigue su enfoque), Lazarus (valoración), y preguntas de la Gestalt, la TCC, ACT,
el psicoanálisis y Jung. Se señala el debate actual (emoción construida, Barrett) y que la rueda es un mapa, no el territorio.

**Decisiones.**
- Las ocho emociones y sus intensidades siguen a Plutchik; las palabras son traducciones aproximadas y se aclara
  cuando una elección del modelo es discutible (por ejemplo, el aburrimiento como forma leve de la aversión).
- Las combinaciones incluyen díadas primarias, secundarias y terciarias. Las emociones opuestas no se combinan:
  se presentan como posible ambivalencia. La persona decide si la combinación la representa.
- Cada matiz se rotula como emoción, estado, sentimiento, proceso o experiencia compleja (el duelo es un proceso).
- Las fichas están en el HTML (contenido indexable, una sola fuente) y el script las reutiliza en la rueda.
- El recorrido guiado no guarda nada. La tarjeta descargable o compartida no incluye contexto ni reflexión salvo que
  la persona lo marque.

## Respirar, volver al presente (`/laboratorio-respirar-volver-al-presente/`)

Archivos: `contenido/paginas/laboratorio-respirar-volver-al-presente.html` · `assets/js/respirar.js` · estilos `.rp-*`.

**Técnicas.** Libre (sin tiempos; conteo opcional), cuadrada (4-4-4-4), 4-7-8 (retención editable o eliminable),
exhalación prolongada (4-6) y personalizada. Todas las fases son editables y se recuerdan en el navegador.

**Motor.** El ciclo se calcula con el reloj real, por lo que no acumula error; se puede pausar en cualquier punto. La práctica
termina al completar el ciclo en curso. Tres estilos (esfera, flor, ondas) muestran el mismo ciclo; la respiración
cuadrada se acompaña con un cuadrado y las demás con un anillo de fases proporcionales. Con `prefers-reduced-motion`
la figura no cambia de tamaño. Sonido opcional sintetizado en el navegador (campana o mar), desactivado por defecto y
solo después de «Iniciar». Mantiene la pantalla encendida durante la práctica cuando el navegador lo permite.

**Seguridad.** Advertencia visible siempre y confirmación antes de la primera práctica de la sesión: no forzar ni
retener si incomoda; detenerse ante mareo, falta de aire, angustia o malestar; precauciones ante enfermedades
respiratorias o cardíacas, embarazo o pánico asociado a la retención; no reemplaza un tratamiento; enlace a ayuda
urgente. La evidencia se presenta con prudencia (respiración lenta y variabilidad cardíaca; Balban y otros, 2023).
