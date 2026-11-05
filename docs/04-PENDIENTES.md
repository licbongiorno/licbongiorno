# Datos para validar y configuraciones pendientes

Marcá cada punto cuando lo resuelvas. Casi todo se cambia en `sitio.json` o en `contenido/` y se publica con `python3 build.py`.

## A. Necesitan tu confirmación (están publicados en el sitio)

| # | Dato | Dónde aparece | Estado |
|---|---|---|---|
| 1 | Matrícula otorgada por el **Colegio de Psicólogos de la Provincia de Córdoba** | Sobre mí, pie, datos estructurados | Asumido (es quien matricula en Córdoba). Confirmar. |
| 2 | Código postal de Alta Gracia **5186** | Datos estructurados | Confirmar. |
| 3 | Trayectoria: «primero en la ciudad de Córdoba y hoy en Alta Gracia» | Sobre mí | ✅ Confirmado por tu texto «No es un sillón». |
| 4 | Integrás el equipo de **Centro Sinapsis** (online) | Sobre mí, `llms.txt`, `Person.memberOf` | Tomado de su web. Confirmar que querés mostrarlo. |
| 5 | Reseñas: «+100 en Google» y 8 citas sin nombres; «80 en Doctoralia» | Inicio (sección reseñas) | Pasame el **enlace exacto de tu ficha de Google** (Compartir → Copiar vínculo) y la **puntuación y cantidad exactas**. Hoy el botón lleva a una búsqueda de Maps. |
| 5b | Reseñas que mencionan **terapia de pareja** y **niños** | — | ¿Atendés parejas y/o niños? Si es así, se agregan a la web. |
| 6 | Instagram **@psicologobongiorno** (el indexado es **@lic.bongiorno**) | Contacto, pie, datos estructurados | ¿Cuál es el principal? ¿Existen los dos? |
| 7 | Textos en primera persona de **Sobre mí** y la cita destacada | Sobre mí | Redactados a partir del brief: revisá que suenen como vos. |
| 8 | Lugar de cada corriente en tu práctica («Eje», «Marco de referencia», «Recursos puntuales», «Marco en diálogo», «Lecturas») | Enfoque | Revisá que refleje tu formación real. |
| 9b | **Jung como eje** de la práctica (cambio pedido el 2026-11-05). Contame tu formación junguiana (cursos, grupos de estudio, supervisión, instituciones) para mencionarla con precisión. Por prudencia, el sitio aclara que no usás el título «analista junguiano» (lo otorgan instituciones reconocidas por la IAAP). | Terapia junguiana, Enfoque | Confirmar. |
| 9c | Copy basado en reseñas: sección «Cómo es el espacio» (las palabras justas, la sesión que sigue trabajando, el encuadre humano) y párrafo de Sobre mí sobre compartir lecturas, películas o textos | Inicio, Sobre mí | Surge de tus reseñas de Google. Confirmá que te representa. |
| 9 | Que la frecuencia habitual sea **semanal** | FAQ «¿Cuánto dura una sesión?» | Confirmar. |

## B. Datos que faltan (mejoran conversión y SEO)

- [x] **Fotografías**: retrato, lectura, sillón y biblioteca (tono cálido monocromo). Falta: fotos del consultorio actual de Dean Funes 56.
- [ ] **Duración de la sesión** en minutos (para completar la FAQ).
- [ ] **Días y horarios** de atención (para Google Business Profile y `openingHoursSpecification`).
- [ ] **Correo profesional** (`"email"` en `sitio.json`).
- [ ] **Honorarios / obras sociales**: ¿se informan? (Los directorios mencionan una tarifa antigua.)
- [ ] **Otros servicios** que aparecen en directorios: psicoterapia de pareja, orientación a padres, psicodiagnóstico, aptos psicológicos. ¿Los incluimos?
- [ ] **Formación de posgrado / continua** comprobable (cursos, posgrados, supervisiones). Solo se publica lo que confirmes.
- [ ] Idiomas además del español.

## C. Configuración técnica pendiente

- [ ] **Dominio.** Hoy el sitio usa `https://licbongiorno5.vercel.app`. Registrá el dominio en [NIC Argentina](https://nic.ar), cambiá `"url"` en `sitio.json` y regenerá.
- [ ] **Publicación** (ver README → «Publicar»).
- [ ] **Google Search Console**: verificar el dominio, cargar `sitemap.xml`. Si usás la verificación por meta etiqueta, pegá el código en `"search_console_token"`.
- [ ] **Bing Webmaster Tools** (`"bing_token"`); permite importar desde Search Console.
- [ ] **Google Analytics 4** (opcional): crear la propiedad y pegar el ID `G-…` en `"ga4_id"`. Se activa un aviso de consentimiento automáticamente.
- [ ] **Formulario con envío por correo** (opcional): crear un formulario en Formspree y pegar la URL en `"formulario_endpoint"`. Sin eso, el formulario abre WhatsApp con el mensaje armado (funciona igual y no guarda datos).
- [ ] **Google Business Profile** a tu nombre, con la URL del sitio.
- [x] **Artículos publicados** (13).

## D. Fuera del sitio (prioridad alta)

- [ ] Actualizar la dirección a **Dean Funes 56** en Doctoralia, Mundopsicólogos, psicologos.com.ar, Instagram y Beacons.
- [ ] Agregar la URL del sitio en Instagram, Facebook, LinkedIn y Doctoralia.
- [ ] Cerrar o unificar el perfil antiguo de LinkedIn (`nicolas-bongiorno-8a0b6948`).
- [ ] Consultar al Colegio sobre atención online a residentes en el exterior (ver `03-ESTRATEGIA-CONTENIDOS-SEO-GEO.md` §6).

## E. Para revisar después de la tanda de mejoras (5 de noviembre de 2026)

- [ ] **Copy en tu voz** (inicio, sobre mí, invitaciones a consultar) y el fragmento de «No es un sillón» en Sobre mí.
- [ ] **5 páginas por motivo** (ansiedad y pánico, duelo, crisis vitales, autoestima, vínculos): ya están publicadas porque son descriptivas; revisalas igual.
- [ ] **Glosario junguiano** (17 términos) y **Tu primera consulta**: publicados; revisá definiciones y pasos.
- [x] **13 artículos publicados** el 5 de noviembre de 2026 (aperturas y cierres en la voz del autor).
- [ ] **Textos para Google, directorios y redes**: `docs/06-TEXTOS-PARA-PERFILES.md`.
- [ ] **Página de opiniones**: 30 fragmentos textuales. Pasame el enlace exacto de tu ficha de Google para el botón.
