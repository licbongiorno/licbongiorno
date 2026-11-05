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
