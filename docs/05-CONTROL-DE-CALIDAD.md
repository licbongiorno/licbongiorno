# Etapa 4 — Control de calidad

**Fecha:** 5 de noviembre de 2026 · Navegador: Chromium (Playwright) · Servidor local estático.

## Resultados

| Prueba | Resultado |
|---|---|
| Validador propio (`validar.py`): títulos, descripciones, canonical, H1, Open Graph, JSON-LD, enlaces internos, anclas, `alt`, FAQ visible = JSON-LD, sitemap | **0 errores, 0 avisos** (11 páginas publicadas; 16 con borradores) |
| Accesibilidad — axe-core 4.10 (WCAG 2.0/2.1 A y AA + buenas prácticas), 11 páginas × escritorio y móvil | **0 violaciones** |
| Lighthouse 12 (perfil móvil simulado) — Inicio | Rendimiento **97** · Accesibilidad **100** · Buenas prácticas **100** · SEO **100** |
| Lighthouse — Enfoque / Contacto | 95 / 97 · 100 · 100 · 100 |
| Core Web Vitals (laboratorio) | LCP 2,4–2,6 s en 4G simulado sin compresión · CLS 0–0,006 · TBT 0 ms |
| Peso por página | ≈ 240–290 KB (incluye 3 tipografías variables); sin imágenes de mapa de bits en el contenido |
| Errores de consola | **Ninguno** en todas las páginas (escritorio y móvil) |
| Desborde horizontal | **Ninguno** a 320, 390 y 1440 px |
| Botón flotante de WhatsApp | Abre `wa.me/5493516575261` con el mensaje inicial; fijo abajo a la derecha; mensaje distinto en Alta Gracia / Online / Exterior |
| Formulario | Valida campos obligatorios (con `aria-invalid` y mensajes accesibles), trampa anti-bots + tiempo mínimo; sin servicio configurado abre WhatsApp con el mensaje armado (verificado) |
| Menú móvil | Abre, lleva el foco adentro, se cierra con Escape y al elegir una opción |
| Submenú de escritorio | Abre con teclado y con el puntero; Escape lo cierra |
| «Saltar al contenido» | Primer elemento al tabular, visible al recibir foco |
| `prefers-reduced-motion` | Todo el contenido visible sin animaciones |
| Sin JavaScript | Todo el contenido visible y navegable |
| Ortografía | Revisión manual de todos los textos (voseo rioplatense consistente) |
| Datos inventados | Ninguno: credenciales, dirección, teléfono, cifra de opiniones y citas provienen de fuentes indicadas en `01-INFORME-INVESTIGACION.md` o de tu confirmación. Lo deducido está listado en `04-PENDIENTES.md`. |
| Reseñas | Solo fragmentos públicos de Doctoralia, sin nombres, con fuente y enlace. Sin `Review`/`AggregateRating`. |
| Sitio de Centro Sinapsis | Sin cambios salvo 4 líneas en `vercel.json` (noindex para `/sitio-bongiorno/`); `validar_seo.py` y `auditoria_periodica.py` siguen pasando. |

## No verificable desde este entorno

- **Enlaces externos** (Instagram, Facebook, LinkedIn, Doctoralia, Google Maps, wa.me): este entorno no tiene acceso a
  esos dominios. Las URL están armadas con los datos indicados; **abrilas una vez publicado el sitio** para confirmarlas
  (en especial `instagram.com/psicologobongiorno`, que no aparece indexada).
- Rendimiento real con compresión y CDN (será mejor que en local).
- Envío por correo del formulario (requiere configurar Formspree u otro servicio).
- Prueba en dispositivos físicos iOS/Android (recomendado antes de difundir).

## Actualización — microanimaciones y copy (5 de noviembre de 2026)

| Prueba | Resultado |
|---|---|
| Trazo del logo al cargar (solo en la primera página de cada visita) | OK |
| Indicador deslizante del menú (puntero y teclado) | OK |
| Contadores (+15, +100) al aparecer | OK |
| Carrusel: puntos de posición y arrastre con mouse | OK |
| Barra de progreso de lectura en artículos | OK |
| Formulario: confirmación con check animado, campo activo resaltado, campo inválido con sacudida breve | OK |
| `prefers-reduced-motion`: todo en estado final, sin animación | OK |
| axe-core (12 páginas × escritorio y móvil) | 0 violaciones |
| Consola y desborde horizontal | Sin errores · sin desborde |

## Actualización — capa de movimiento ampliada (5 de noviembre de 2026)

| Animación / microinteracción | Prueba |
|---|---|
| Cortina y leve acercamiento en la foto del arco y en los retratos | OK |
| Profundidad del hero que responde al puntero (solo escritorio) | OK |
| Manifiesto: las palabras se encienden al desplazarse (contraste AA en ambos estados) | OK |
| Subrayado de pincel bajo las palabras en itálica de los títulos | OK |
| Cabecera que se oculta al bajar y vuelve al subir | OK |
| Diagrama de enfoque: las órbitas se dibujan y las etiquetas aparecen en secuencia | OK |
| Luz que sigue al cursor en tarjetas | OK |
| Botones principales con atracción magnética sutil | OK |
| Grillas que aparecen en cascada | OK |
| Preguntas frecuentes: la respuesta entra suavemente | OK |
| Asistente: paso actual que late, check con rebote, mensaje que se renueva | OK |
| Saludo de WhatsApp (escritorio, una vez por visita, se cierra) | OK |
| Transición entre páginas: cabecera fija y el título de la tarjeta se transforma en el título del artículo | Mejora progresiva (Chrome/Edge) |
| Animaciones continuas en pausa fuera de pantalla o con la pestaña oculta | OK |
| `prefers-reduced-motion`: todo visible y quieto | OK |
| axe-core, 45 páginas × escritorio y móvil | 0 violaciones |
| Lighthouse (inicio, local sin compresión) | 94 · 100 · 100 · 100 · CLS 0,005 |

## Actualización — modo oscuro y mejoras por comparación (6 de noviembre de 2026)

| Prueba | Resultado |
|---|---|
| Modo oscuro automático (preferencia del sistema) y botón manual que recuerda la elección | OK |
| axe-core en modo claro, 47 páginas × escritorio y móvil | 0 violaciones |
| axe-core en modo oscuro, 47 páginas × escritorio y móvil | 0 violaciones (tras corregir 2 contrastes) |
| Desborde horizontal: 47 páginas × 320 y 390 px × claro y oscuro (188 casos) | 0 |
| Aviso de disponibilidad, franja de confianza, «¿Es este espacio para vos?», página de ayuda urgente | OK |
