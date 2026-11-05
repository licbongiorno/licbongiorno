# Datos para validar y configuraciones pendientes

Marcá cada punto cuando lo resuelvas. Casi todo se cambia en `sitio.json` o en `contenido/` y se publica con `python3 build.py`.

## A. Necesitan tu confirmación (están publicados en el sitio)

| # | Dato | Dónde aparece | Estado |
|---|---|---|---|
| 1 | Matrícula otorgada por el **Colegio de Psicólogos de la Provincia de Córdoba** | Sobre mí, pie, datos estructurados | Asumido (es quien matricula en Córdoba). Confirmar. |
| 2 | Código postal de Alta Gracia **5186** | Datos estructurados | Confirmar. |
| 3 | Trayectoria: «primero en la ciudad de Córdoba y hoy en Alta Gracia» | Sobre mí | Deducido de direcciones antiguas (Colón 184 y Colón 567). Confirmar. |
| 4 | Integrás el equipo de **Centro Sinapsis** (online) | Sobre mí, `llms.txt`, `Person.memberOf` | Tomado de su web. Confirmar que querés mostrarlo. |
| 5 | Las dos citas de Doctoralia y la cifra de **80 opiniones** | Inicio (sección reseñas) | Leídas por buscador. Abrí Doctoralia, verificá el texto exacto y la cifra, y confirmá que te parece bien citarlas (sin nombres). |
| 6 | Instagram **@psicologobongiorno** (el indexado es **@lic.bongiorno**) | Contacto, pie, datos estructurados | ¿Cuál es el principal? ¿Existen los dos? |
| 7 | Textos en primera persona de **Sobre mí** y la cita destacada | Sobre mí | Redactados a partir del brief: revisá que suenen como vos. |
| 8 | Lugar de cada corriente en tu práctica («Eje», «Marco de referencia», «Recursos puntuales», «Marco en diálogo», «Lecturas») | Enfoque | Revisá que refleje tu formación real. |
| 9 | Que la frecuencia habitual sea **semanal** | FAQ «¿Cuánto dura una sesión?» | Confirmar. |

## B. Datos que faltan (mejoran conversión y SEO)

- [ ] **Fotografía profesional** (4:5, luz natural, fondo cálido; idealmente también una del consultorio). Guardala en `assets/img/` y completá `"foto"` en `sitio.json`.
- [ ] **Duración de la sesión** en minutos (para completar la FAQ).
- [ ] **Días y horarios** de atención (para Google Business Profile y `openingHoursSpecification`).
- [ ] **Correo profesional** (`"email"` en `sitio.json`).
- [ ] **Honorarios / obras sociales**: ¿se informan? (Los directorios mencionan una tarifa antigua.)
- [ ] **Otros servicios** que aparecen en directorios: psicoterapia de pareja, orientación a padres, psicodiagnóstico, aptos psicológicos. ¿Los incluimos?
- [ ] **Formación de posgrado / continua** comprobable (cursos, posgrados, supervisiones). Solo se publica lo que confirmes.
- [ ] Idiomas además del español.

## C. Configuración técnica pendiente

- [ ] **Dominio.** Hoy el sitio usa `https://nicolasbongiorno.com.ar` como provisorio. Registrá el dominio en [NIC Argentina](https://nic.ar), cambiá `"url"` en `sitio.json` y regenerá.
- [ ] **Publicación** (ver README → «Publicar»).
- [ ] **Google Search Console**: verificar el dominio, cargar `sitemap.xml`. Si usás la verificación por meta etiqueta, pegá el código en `"search_console_token"`.
- [ ] **Bing Webmaster Tools** (`"bing_token"`); permite importar desde Search Console.
- [ ] **Google Analytics 4** (opcional): crear la propiedad y pegar el ID `G-…` en `"ga4_id"`. Se activa un aviso de consentimiento automáticamente.
- [ ] **Formulario con envío por correo** (opcional): crear un formulario en Formspree y pegar la URL en `"formulario_endpoint"`. Sin eso, el formulario abre WhatsApp con el mensaje armado (funciona igual y no guarda datos).
- [ ] **Google Business Profile** a tu nombre, con la URL del sitio.
- [ ] **Revisar y publicar los 5 artículos** (cambiar `estado: borrador` por `estado: publicado` en cada `.md`).

## D. Fuera del sitio (prioridad alta)

- [ ] Actualizar la dirección a **Dean Funes 56** en Doctoralia, Mundopsicólogos, psicologos.com.ar, Instagram y Beacons.
- [ ] Agregar la URL del sitio en Instagram, Facebook, LinkedIn y Doctoralia.
- [ ] Cerrar o unificar el perfil antiguo de LinkedIn (`nicolas-bongiorno-8a0b6948`).
- [ ] Consultar al Colegio sobre atención online a residentes en el exterior (ver `03-ESTRATEGIA-CONTENIDOS-SEO-GEO.md` §6).
