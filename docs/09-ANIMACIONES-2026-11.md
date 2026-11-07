# Animaciones con sentido: laboratorios, guías y herramientas (noviembre de 2026)

## Criterio

Cada animación responde al menos a una de estas preguntas:
- ¿ayuda a comprender?
- ¿hace visible un proceso?
- ¿mejora la interacción?
- ¿aporta significado?
- ¿facilita la navegación?

**Técnica:**
- SVG en línea, CSS (`transform`, `opacity`, `stroke-dashoffset`) y JavaScript sin dependencias.
- **No se incorporó ninguna librería:** ni GSAP ni Framer Motion. El sitio es HTML estático sin React, y las escenas no lo necesitan.

**Alternativa estática:**
- Cada diagrama está en el HTML con su composición final.
- Sin JavaScript, o con «reducir movimiento» activado en el sistema, se ve completo y quieto.

## Auditoría

Hay 32 laboratorios con 182 estaciones.

- **Ya visuales:** respiración, mandala, garabato, genograma, árbol de la vida, rueda de la vida, mapa de vínculos y secuencias.
- **Interactivos sin componente visual:** la mayoría (formularios, quizzes y selectores con paneles de texto).
- **Modelos explicados solo con texto:**
  - círculo del desánimo;
  - ventana de tolerancia;
  - pendulación;
  - ciclo de la experiencia;
  - duelo que va y viene;
  - tres fases de Bridges;
  - viaje del héroe;
  - yo real y yo ideal;
  - autocompasión;
  - tres vías del sentido;
  - límites familiares;
  - hojas en el río;
  - escalera de exposición;
  - curva del olvido.
- **Sin indicador de avance** entre estaciones.

## Lo que se hizo

### 1. Componentes comunes

| Componente | Archivo | Qué hace |
|---|---|---|
| Escenas conceptuales | `assets/js/escenas.js` + `[data-escena]` | Diagramas SVG que avanzan por pasos, con un rótulo de 4 palabras como máximo. Se reproducen solos una vez al aparecer y se pausan fuera de pantalla. Tienen controles Anterior, Siguiente y Ver de nuevo, además de una descripción accesible. Pueden sincronizarse con pasos guiados (`data-escena-sync`) o con una elección (`data-escena-radios`). |
| Recorrido de estaciones | `assets/js/lab-base.js` | La barra de estaciones queda fija, marca la estación actual y las visitadas (guardadas en el dispositivo) y muestra una línea de avance. Aplica a los 32 laboratorios. |
| Anillo de avance del plan | `lab-base.js` | Un anillo que se completa junto al «3 de 7 días». |
| Microinteracciones | `assets/css/interactivo.css` | En el quiz, un tilde que se dibuja al acertar, un vaivén suave al errar y la explicación que sube. También: paneles y pasos con fundido, pulso al elegir una opción y confirmación al guardar. |
| Visualizaciones reactivas | `assets/js/visual-labs.js` | Responden a lo que escribe o elige la persona (ver punto 3). |

### 2. Escenas conceptuales (12)

| Laboratorio | Escena | Para qué |
|---|---|---|
| Ánimo | Círculo del desánimo: el ciclo se cierra y gira, y una acción pequeña abre una salida en espiral. | Hacer visible el círculo y la salida. |
| Regulación | Ventana de tolerancia: la activación sube, baja y vuelve. El selector de zona mueve la escena. | Comprender las zonas. |
| Regulación | Pendulación: un péndulo entre el recurso y la incomodidad. La incomodidad se achica y el recurso se amplía, sincronizado con los pasos guiados. | Representar la metáfora de Levine. |
| Duelo | Doble proceso: la oscilación entre pérdida y reconstrucción se aquieta con el tiempo. | Normalizar el vaivén. |
| Crisis vitales | Tres fases de Bridges que se superponen. El selector destaca una. | Relación entre fases. |
| Gestalt | Ciclo de la experiencia. Al elegir la fase donde uno se traba, el ciclo queda marcado ahí. | Proceso más respuesta personal. |
| Mito personal | Viaje del héroe con el umbral. Las etapas se encienden a medida que se completa el formulario. | Progresión ligada a lo que se escribe. |
| Autocompasión | Tres círculos que se acercan hasta formar el centro. | Integración. |
| Sentido | Tres vías que confluyen. Cada una se llena cuando se escribe en ella. | Significado emocional. |
| Sistémico | Límites difusos, claros y rígidos, con una partícula que entra, pasa por la puerta o rebota. | Representar la metáfora. |
| Humanista | Yo real y yo ideal como dos círculos que se superponen según el deslizador. | Magnitud convertida en proporción. |
| ACT | Hojas en el río: el pensamiento escrito viaja sobre una hoja. | Defusión vivida. |

### 3. Visualizaciones que responden a la persona

- **Emociones:** un termómetro que se llena y cambia de color.
- **Estrés:** un semáforo de tres luces.
- **Ánimo:** un gráfico de placer y logro, con los mejores puntos destacados.
- **Diálogo socrático:** dos barras, «antes» y «ahora».
- **Ansiedad:** la escalera de exposición dibujada con los escalones de la persona.
- **Aprender:** la curva del olvido con los repasos.

### 4. Guías y catálogos

- **¿Por dónde empiezo?** El recorrido se traza en orden: Leer, Practicar y Entender.
- **Laboratorios:**
  - un glifo orgánico por tema (6 en total);
  - al filtrar, las tarjetas se reacomodan con una transición FLIP, sin saltos de diseño.
- **Tests:** las barras de resultado crecen y el punto del plano del apego aparece en su lugar.

## Validación

- **Pruebas de animaciones (Playwright):** 67 comprobaciones sin fallas. Incluyen:
  - autoplay, controles y parada manual;
  - sincronía con selectores y pasos;
  - formularios que encienden etapas;
  - deslizador, río, termómetro y semáforo;
  - gráfico, escalera y barras;
  - filtros y guía;
  - **movimiento reducido** (composición final, sin animaciones corriendo) y **sin JavaScript** (escena completa).
- **Regresión:** las 11 suites del sitio pasan, sin fallas.
- **Accesibilidad:** axe en las 183 páginas en modo claro y oscuro (366 combinaciones), 0 violaciones.
- **Desbordes:** 0 en 732 combinaciones (320 y 390 px, claro y oscuro).
- **Lighthouse en móvil:**

  | Página | Rendimiento | CLS | Accesibilidad, buenas prácticas y SEO |
  |---|---|---|---|
  | Ánimo | 98 | 0 | 100 |
  | Regulación | 98 | 0 | 100 |
  | `/laboratorios/` | 100 | 0 | 100 |

## Segunda tanda (hecha)

| Laboratorio | Qué se anima | Para qué |
|---|---|---|
| Gestalt | Las tres zonas del darse cuenta (afuera, adentro y la fantasía). Una luz de atención sigue los pasos guiados y al final salta entre las tres. | Hacer visible dónde está la atención. |
| DBT | TIP: un medidor de intensidad baja un escalón con cada recurso del cuerpo (agua fría, mover el cuerpo, exhalar largo y soltar los músculos) hasta la franja en la que se puede pensar. | Mostrar la magnitud y el proceso. |
| Presencia | Anclaje 5-4-3-2-1: hileras de 5, 4, 3, 2 y 1 que se encienden con los pasos y convergen en «estás acá». | Mostrar la cuenta regresiva hacia el presente. |
| Narrativo | Dos historias: el hilo de la historia alternativa se engrosa a medida que se escribe y el de la dominante se aligera. | Representar el «engrosamiento» de la historia alternativa, idea de White y Epston. |
| Mito personal | La línea de vida se dibuja como un camino con los capítulos escritos. El último se marca como «ahora» y el próximo aparece punteado. | Ver la propia historia como recorrido. |
| Sistémico | Preguntas circulares: cada pregunta nueva enciende una relación entre otras dos personas. | Mostrar qué mira una pregunta circular. |

**Validación de la segunda tanda:**
- 40 comprobaciones automáticas sin fallas, incluidas las pruebas con movimiento reducido y sin JavaScript.
- La regresión del sitio completo, axe y las comprobaciones de desborde se repitieron.
