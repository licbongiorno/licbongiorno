# Auditoría integral de loquetehabita.com (noviembre de 2026)

Rama: `claude/auditoria-loquetehabita`. **No está publicada.** Al fusionarla con `main`, Vercel la publica.

## Cómo se hizo

- **Sobre qué se auditó.** Desde el entorno de trabajo no se pudo abrir www.loquetehabita.com, porque el proxy lo bloquea. La auditoría se hizo sobre el código y el sitio generado (`public/`), que es lo mismo que se publica.
- **Herramientas** (solo en la carpeta temporal, no en el proyecto):
  - Lighthouse 12, en móvil y escritorio;
  - axe-core, en las 167 páginas, en modo claro y oscuro;
  - Playwright, con capturas, pruebas funcionales y comparación píxel a píxel;
  - `validar.py`, el validador del proyecto.

## Mediciones antes y después

| Página | Antes (móvil) | Después (móvil) | Escritorio |
|---|---|---|---|
| Inicio | Rendimiento 88 · TBT 460 ms · LCP 2,1 s | **99** · TBT 0 ms · LCP 2,1 s · CLS 0 | 100 → 100 |
| Artículo (la sombra) | 99 · CLS 0,03 | 99 · CLS 0 | 100 → 100 |
| Laboratorio de ansiedad | 90 · **CLS 0,178** | **99** · CLS 0 | 100 → 100 |
| Contacto | 99 | 100 | 100 → 100 |

- **Accesibilidad, buenas prácticas y SEO:** 100 en todos los casos, antes y después.
- **axe:** 0 violaciones en las 334 combinaciones (167 páginas × claro y oscuro).
- **Desbordes horizontales:** 0 en 668 combinaciones (320 y 390 px × claro y oscuro).
- **Pruebas funcionales:** las 7 suites de regresión (398 comprobaciones), el motor de tests (15), los ejercicios (11) y el menú móvil más el movimiento reducido (11). Todas pasan.

## 1. Lo que encontré

### Crítico
- **Dominio equivocado en todo el SEO.** Las canónicas, `og:url`, el sitemap, los datos estructurados, `robots.txt` y `llms.txt` apuntaban a `licbongiorno5.vercel.app`. Para Google, la versión oficial del sitio no era loquetehabita.com.
- **Sin una versión única.** El dominio de Vercel seguía respondiendo con el mismo contenido.

### Alta prioridad
- **Portada sobrecargada:**
  - 16 secciones y unas 24 cajas o tarjetas;
  - «+15 años» repetido 3 veces, y la UNC y la matrícula 2 veces cada una;
  - 3 cajas de llamado a la acción, además del asistente de WhatsApp;
  - «Las palabras justas» como h3 y como h2;
  - un subtítulo duplicado.
- **Esquema de títulos roto en la portada:**
  - el h1 incluía el antetítulo, así que se leía como una sola frase;
  - había h2 de llamados a la acción en medio de las secciones;
  - las reseñas estaban rotuladas por un texto oculto, aunque había un h2 real;
  - el asistente no tenía rótulo.
- **Menú móvil:** una lista plana de unos 20 enlaces, sin agrupar.
- **Rendimiento móvil de la portada:**
  - 1,1 s de cálculo de estilos y maquetación, y 460 ms de bloqueo;
  - la causa: animaciones infinitas con `box-shadow` y secciones fuera de pantalla que se renderizaban igual.
- **Salto de diseño (CLS 0,178) en los laboratorios:** las fuentes del primer pantallazo (Playfair itálica y Montserrat) no se precargaban.

### Media prioridad
- **CSS:** 132 KB que se cargaban en todas las páginas. Un 27 % era exclusivo de laboratorios, tests y ejercicios.
- **Avatar del hero:** se mostraba a 56 px pero se descargaba la imagen de 480 px.
- **`llms-full.txt`:** 909 KB, una copia de todo el sitio en un formato que no es estándar.
- **Brecha temática:** no había una página de **psicoterapia para adultos**, aunque sí para adolescentes y adultos mayores.

### Lo que ya estaba bien
- Accesibilidad de base, modo oscuro y respeto de `prefers-reduced-motion`.
- Datos estructurados: Person, ProfilePage, Article con autor y fecha de revisión, FAQPage y BreadcrumbList.
- Bloques «En pocas palabras», glosario, FAQ y enlaces internos.
- Twitter Cards y Open Graph en las 166 páginas.
- Títulos, descripciones y h1 sin duplicados.
- Imágenes con medidas y textos alternativos.
- Seguridad: CSP estricta, HSTS, X-Frame-Options y COOP.

## 2. Lo que modifiqué

### SEO
- **Dominio principal `https://www.loquetehabita.com`** (en `sitio.json`). Se regeneraron canónicas, sitemap, Open Graph, JSON-LD, `robots.txt`, `llms.txt`, el feed RSS y los enlaces para compartir.
- **Redirecciones 301** en `vercel.json`, que genera `build.py`: `licbongiorno5.vercel.app` y `loquetehabita.com` (sin www) → `https://www.loquetehabita.com`.
- **Textos de perfiles y redes** (`docs/06`, `redes/`) con el dominio nuevo.
- **Título de la portada orientado a la marca:** «Nicolás Bongiorno, psicólogo clínico en Alta Gracia y online». Así no compite con `/psicologo-alta-gracia/`, que es la página para búsquedas locales.
- **Enlaces internos:** los chips de modalidad del hero ahora enlazan a la página presencial y a la de terapia online.
- **Página nueva `/psicoterapia-para-adultos/`:**
  - motivos frecuentes enlazados a cada página;
  - cómo trabajo, presencial u online, y aviso de urgencia;
  - 5 preguntas frecuentes con su FAQPage;
  - un Service en los datos estructurados.

  Aparece en el pie, en el mapa del sitio y en `llms.txt`.

### GEO
- **`llms.txt` se mantiene**, conciso y con el dominio correcto.
- **Eliminé `llms-full.txt`.** No es un estándar, pesaba 909 KB y duplicaba todo el contenido, que ya es indexable en HTML.
- **No agregué etiquetas «mágicas».** La base sigue siendo la que funciona:
  - respuestas directas («En pocas palabras»);
  - autoría identificable con la matrícula;
  - datos estructurados coherentes;
  - bibliografía real.

### UX/UI
- **Portada de 16 a 10 secciones**, sin perder contenido:

  | Sección | Qué cambió |
  |---|---|
  | Hero | Dos llamados: entrevista y WhatsApp |
  | Franja de confianza | Único lugar de las credenciales |
  | Manifiesto «Lo que te habita» | Con título visible |
  | Sobre mí | Sin repetir datos |
  | Enfoque | Sin cambios |
  | Motivos | Incluye «¿Es para vos?» |
  | Cómo es el espacio | Incluye las reseñas |
  | Cómo empezamos | Incluye las modalidades |
  | Preguntas frecuentes | Sin cambios |
  | Recursos | Sin cambios |
  | Contacto | Incluye el asistente de WhatsApp |

  El largo de la página bajó de 16 900 a unos 14 400 px en escritorio y de 46 700 a unos 42 300 px en móvil.
- **Esquema de títulos limpio:**
  - el h1 es solo el lema;
  - los llamados intermedios ya no son h2;
  - las reseñas y el asistente se integraron como h3 dentro de sus secciones.
- **Menú móvil por grupos** desplegables (Enfoque, Modalidades, Recursos, Empezar). El grupo de la página actual se abre solo. Se conservan el cierre con Escape, el manejo del foco y el `inert`.
- **Llamados a la acción unificados** en todo el sitio: «Pedir una primera entrevista», «Pedir una entrevista» en la cabecera y «Escribirme por WhatsApp».

### Motion y microinteracciones
- **Pulsos más livianos:** el punto de disponibilidad, el paso actual del asistente y el botón de WhatsApp ahora se animan con `transform` y `opacity`. Ya no usan `box-shadow` y se repiten unas pocas veces en lugar de infinitamente. El ícono de zona horaria gira una vez.
- **Barra de progreso de lectura** con `animation-timeline: scroll()`: la mueve el navegador sin JavaScript. Donde no hay soporte, o con movimiento reducido, sigue funcionando la versión con JS.
- **Chips de modalidad** con hover: elevación y escala del ícono.
- **Grupos del menú móvil** con una apertura suave y el signo + y − animado.
- **Lo que se mantiene:** revelado por líneas del hero, aparición al hacer scroll, microinteracción de botones (incluido el efecto magnético), subrayado animado de enlaces, transiciones entre páginas y paralaje moderado de las fotos.
- **Movimiento reducido:** con `prefers-reduced-motion: reduce` no queda ninguna animación corriendo (verificado).

### Copy
- **Manifiesto «Lo que te habita»:** sumé un párrafo que despliega el concepto. «Lo que sentís y todavía no sabés nombrar. Lo que callás para no molestar. Lo que se repite aunque te prometas que esta vez no. Lo que deseás y te da miedo desear. Todo eso también sos vos, y tiene algo para decir.»
- **Hero:** se mantiene tu texto («personajes, cualidades y kryptonita…»). La frase final ahora dice el enfoque y para quién trabajás, sin repetir los años.
- **Página de adultos:** escrita en tu voz, sin afirmaciones nuevas sobre tu formación.

### Performance
- **CSS separado:** `interactivo.css`, con los estilos de laboratorios, tests, ejercicios, guía y buscador, se carga solo en las páginas que lo usan.
  - El CSS común bajó de 24 KB a 20 KB comprimido.
  - Comparé píxel a píxel 20 páginas × 2 tamaños: idénticas.
- **`content-visibility: auto`** en las secciones fuera de pantalla.
- **Precarga** de Playfair itálica y Montserrat, que se usan en el primer pantallazo. Esto eliminó el salto de diseño.
- **Avatar** de 112 px: 1 KB en lugar de 12 KB.

## 3. Lo que evalué y no hice

- **Sprite de íconos SVG.** La portada tiene 80 SVG en línea, pero comprimida pesa 18,7 KB y el ahorro real sería de unos 3 KB. Además, varias animaciones de hover dependen de los trazos internos de los íconos. No compensa el riesgo.
- **Reescritura integral del CSS** (selectores duplicados y unificar `@media`). Los puntajes ya están en 99–100, y el riesgo de romper estilos en 167 páginas es mayor que el beneficio. La separación en dos archivos dio la mejora principal.

## 4. Pendientes que requieren intervención externa

1. **Vercel → Domains:** confirmar que `www.loquetehabita.com` es el dominio principal del proyecto y que `loquetehabita.com` (sin www) también está agregado.
   - **Antes de publicar esta rama:** si www todavía no está conectado, la redirección desde vercel.app dejaría el sitio inaccesible.
2. **Google Search Console:**
   - agregar la propiedad `https://www.loquetehabita.com`;
   - cargar `sitemap.xml`;
   - si existía la propiedad de vercel.app, usar «Cambio de dirección».
3. **Google Business Profile, Doctoralia, Instagram, Facebook y LinkedIn:** actualizar el enlace a www.loquetehabita.com (textos listos en `docs/06-TEXTOS-PARA-PERFILES.md`).
4. **Bing Webmaster Tools:** importar desde Search Console.
5. **Revisión de copy por Nicolás:**
   - el párrafo nuevo del manifiesto;
   - la página de adultos;
   - los botones unificados.

## 5. Recomendaciones para después

- **Fotos reales del consultorio** de Dean Funes 56, para la página presencial y el hero de Alta Gracia.
- **Duración de la sesión y horarios:** completar la FAQ y `openingHoursSpecification` (ver `docs/04-PENDIENTES.md`).
- **Formación de posgrado comprobable:** agregarla a Sobre mí y a `Person.hasCredential`. Fortalece la señal de experiencia (E-E-A-T) para SEO y GEO.
