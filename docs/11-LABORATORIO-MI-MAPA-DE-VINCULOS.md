# Laboratorio «Mi mapa de vínculos»: matriz teórica y criterios

Página: [`/laboratorio-mi-mapa-de-vinculos/`](../contenido/paginas/laboratorio-mi-mapa-de-vinculos.html) ·
Lógica: [`assets/js/mapa-vinculos.js`](../assets/js/mapa-vinculos.js) · Estilos: final de `assets/css/interactivo.css`.

**Concepto rector:** «Comprender los vínculos también implica reconocer el lugar que ocupamos en ellos».

## 1. Decisiones conceptuales

1. **Dos capas sobre los mismos datos.** *Universo vincular actual* (círculos de cercanía emocional percibida, por
   ámbitos, a la manera del mapa de red social de Sluzki) e *historia familiar* (genograma por generaciones). Cada
   persona puede estar en una, en otra o en ambas, y las capas se ven juntas o por separado. Así se puede representar
   a alguien central en la historia familiar y lejano hoy, o al revés.
2. **Eje sistémico** (Sluzki, Bowen, Minuchin, Satir, Bateson, Boszormenyi-Nagy, McGoldrick), con aportes del
   psicoanálisis, Jung y la Gestalt, y como marcos complementarios el humanismo, la TCC, ACT y la perspectiva
   existencial. Cada estación tiene un desplegable con perspectivas, una distinción conceptual y qué no puede concluirse.
3. **La persona define todas las dimensiones.** El mapa dibuja lo que se marca: el círculo, el estilo de línea, las
   flechas de intercambio y los segmentos de límites. No calcula cercanía, reciprocidad, «salud» del vínculo ni patrones.
4. **Sin colores evaluativos.** Los colores identifican ámbitos (familia, amistades, trabajo…), nunca «bueno» o «malo».
   Los estilos de línea muestran la palabra que eligió la persona (estrecho, distante, conflictivo, ambivalente,
   intermitente, en transformación, cortado).
5. **Diversidad familiar.** Las categorías son editables. El genograma admite familias ensambladas, uniones y
   separaciones, personas fallecidas y cualquier parentalidad (hasta dos figuras por persona, opcionales). El símbolo
   es opcional: se explica la convención clásica (cuadrado y círculo) sin imponerla.
6. **Repeticiones: solo registros propios.** Se distingue *repetición observada*, *hipótesis personal* e
   *interpretación*; el laboratorio registra las dos primeras y no produce la tercera.

## 2. Matriz por estación

| Estación | Objetivo | Conceptos | Escuelas y autores | Registro / visualización | Riesgos que se evitan |
|---|---|---|---|---|---|
| 0. El umbral | Encuadre y cuidado | — | — | Aviso, dos capas, guardado local opcional | Presentarlo como evaluación |
| 1. Mi universo vincular | Identificar personas y grupos significativos | Red social personal, ecomapa, convoy social | Sluzki (1996), Hartman (1978), Kahn y Antonucci (1980) | Nombre o seudónimo, tipo (editable), actual o pasado, desde cuándo, lugar subjetivo, capas, falleció, nota | Exigir datos reales; imponer una familia «tipo» |
| 2. Cercanía y distancia | Ubicar la cercanía emocional percibida y separarla de otras dimensiones | Atributos del vínculo; diferenciación; contacto y retirada | Sluzki, Bowen; Perls, Goodman | Cuatro círculos (arrastre o teclado), frecuencia, confianza, intimidad, distancia física, cualidad del vínculo | Leer la distancia como rechazo o la cercanía como dependencia |
| 3. Reciprocidad | Explorar qué circula y en qué sentido | Justicia relacional, funciones de la red; empatía | Boszormenyi-Nagy y Spark (1973); Sluzki; Rogers | Diez dimensiones × (ambos sentidos, de mí, hacia mí, varía, insuficiente, difícil de definir); flechas opcionales en el mapa | Convertirlo en una cuenta; calificar relaciones |
| 4. Límites y posiciones | Qué se puede decir, pedir, aceptar o rechazar | Límites, posición del yo; frontera de contacto, confluencia, retroflexión; congruencia | Minuchin (1974), Bowen; Perls, Polster; Rogers | Cinco dimensiones (posible, depende, cuesta, no sé); segmentos alrededor del nodo | Confundir límite con ruptura; sugerir alejarse |
| 5. Historia familiar | Configuración familiar y acontecimientos | Genograma, transmisión multigeneracional, lealtades | McGoldrick, Gerson y Petry (2008); Bowen; Boszormenyi-Nagy | Generaciones −3 a +2, filiación, uniones y separaciones, fallecimientos, notas, acontecimientos; «prefiero no explorar» | Inferir causas, secretos o patrones transgeneracionales |
| 6. Los lugares que ocupo | Roles y posiciones por ámbito | Roles, posturas comunicacionales; persona; identificación | Minuchin, Satir; Jung; Freud | Hipótesis de rol por ámbito + roles propios; aparecen junto a cada ámbito del mapa | Fijar categorías de identidad |
| 7. Conflictos | Cómo empiezan, siguen y se reparan los desacuerdos | Simetría y complementariedad, puntuación; ambivalencia, reparación; evitación experiencial, fusión; atribuciones | Watzlawick, Bateson, Satir; Klein, Winnicott; Hayes; Beck (1988) | Respuestas habituales + preguntas abiertas | Exigir reconciliación; calificar a una persona por el conflicto |
| 8. Patrones y repeticiones | Registrar similitudes que la persona observa | Repetición, transferencia, relaciones de objeto; proyección, complejos; pautas circulares, esquemas interpersonales | Freud (1914), Klein, Winnicott; Jung; Watzlawick, Safran (1990) | Registros tipificados (observación o hipótesis) vinculados a personas | Detectar o interpretar patrones automáticamente |
| 9. Mi posición actual | Síntesis reflexiva sin decisiones forzadas | Aislamiento existencial, intimidad; valores; autenticidad | Yalom (1980), May; Hayes; Rogers | Preguntas abiertas | Recomendar rupturas o reconciliaciones |
| 10. Mi mapa | Cartografía en dos capas, fichas y síntesis | — | — | Vista de capas, intercambios, límites y roles opcionales, ficha por vínculo, síntesis y exportaciones | Diagnosticar el sistema familiar o a terceros |

## 3. Síntesis

Cuatro partes fijas: **1)** lo que la persona expresó (textual); **2)** relaciones y modalidades que identificó
(descripción de sus marcas, sin juicio); **3)** sus observaciones sobre repeticiones; **4)** entre cinco y ocho
preguntas. Cada pregunta muestra la regla que la activó («Aparece porque…»). Si hay menos de cinco reglas activas, se
completan con preguntas generales de cierre, rotuladas como tales. Las reglas están en `REGLAS` dentro del script.

No se infieren estilos de apego, trastornos, traumas, disfunciones familiares ni características de terceros, y no se
usa ninguna IA ni servicio externo.

## 4. Privacidad y exportación

- Todo queda en el navegador. El progreso se guarda en `localStorage` mientras la casilla esté marcada (por defecto);
  al desmarcarla se borra. «Borrar toda la información» elimina todo.
- Exportaciones generadas en el dispositivo: mapa en PNG (según la vista elegida), genograma en PNG y SVG, síntesis en
  texto, e informe imprimible (el navegador permite «Guardar como PDF»). Las imágenes se exportan siempre en tema claro.

## 5. Relación con otras páginas

Convive con el «Mapa de vínculos» del [laboratorio de vínculos](../contenido/paginas/laboratorio-de-vinculos.html) y el
genograma del [laboratorio sistémico](../contenido/paginas/laboratorio-sistemico.html), que son ejercicios breves y no
se modificaron. Aparece en el catálogo de laboratorios (tema «Vínculos») y en «¿Por dónde empiezo?» («Vínculos o pareja»
y «Mi familia»).
