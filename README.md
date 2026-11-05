# Sitio web — Lic. Nicolás Raúl Bongiorno, psicólogo clínico

Sitio profesional estático, rápido y accesible. Concepto de marca: **«Lo que te habita»**.

| Documento | Contenido |
|---|---|
| [`docs/01-INFORME-INVESTIGACION.md`](docs/01-INFORME-INVESTIGACION.md) | Etapa 1: presencia digital, fuentes, contradicciones, reseñas |
| [`docs/02-ESTRATEGIA-MARCA-Y-DISENO.md`](docs/02-ESTRATEGIA-MARCA-Y-DISENO.md) | Etapa 2: concepto, titulares, identidad visual, arquitectura, UX |
| [`docs/03-ESTRATEGIA-CONTENIDOS-SEO-GEO.md`](docs/03-ESTRATEGIA-CONTENIDOS-SEO-GEO.md) | SEO, SEO local, GEO, plan de contenidos, cuestiones regulatorias |
| [`docs/04-PENDIENTES.md`](docs/04-PENDIENTES.md) | **Datos a validar y configuraciones pendientes** |
| [`docs/05-CONTROL-DE-CALIDAD.md`](docs/05-CONTROL-DE-CALIDAD.md) | Etapa 4: resultados de las pruebas |

## Tecnología

- HTML + CSS + JavaScript sin frameworks ni dependencias en el navegador (≈270 KB por página, tipografías incluidas).
- Un generador en Python (`build.py`, solo biblioteca estándar, Python 3.12+) arma las páginas a partir de los
  contenidos y de `sitio.json`. Así un dato (WhatsApp, dirección, dominio) se cambia en un solo lugar.
- Tipografías autoalojadas (Playfair Display, Lora, Montserrat; licencia SIL OFL).
- Sin cookies ni rastreo salvo que actives Google Analytics (y entonces, solo con consentimiento).

```
./
├── sitio.json               ← configuración central
├── build.py                 ← generador
├── validar.py               ← control de calidad automático
├── contenido/
│   ├── paginas/*.html       ← cuerpo de cada página (metadatos en el comentario inicial)
│   ├── blog/*.md            ← artículos (estado: borrador | publicado)
│   ├── motivos.json         ← motivos de consulta
│   ├── faq.json             ← preguntas frecuentes (HTML y datos estructurados salen de acá)
│   └── resenas.json         ← citas reales de opiniones
├── assets/                  ← CSS, JS, tipografías, imágenes
├── herramientas/            ← generador de favicon e imagen para redes
└── public/                  ← SALIDA LISTA PARA PUBLICAR (no editar a mano)
```

## Editar contenidos

1. Cambiá lo que necesites:
   - Datos de contacto, dirección, redes, dominio, foto → `sitio.json`
   - Textos de una página → `contenido/paginas/<página>.html`
   - Preguntas frecuentes → `contenido/faq.json`
   - Motivos de consulta → `contenido/motivos.json`
2. Generá y verificá:
   ```bash
   python3 build.py
   python3 validar.py
   ```
3. Para ver el sitio en tu computadora: `cd public && python3 -m http.server 8000` y abrí <http://localhost:8000>.

### Publicar un artículo

1. Creá `contenido/blog/mi-articulo.md` copiando la cabecera de uno existente (título, descripción ≤ 160
   caracteres, resumen, categoría, fecha, orden).
2. Mientras diga `estado: borrador`, **no se publica**. Para revisarlo: `python3 build.py --borradores` (se genera con
   `noindex` y un aviso de borrador). **No publiques una versión generada con `--borradores`.**
3. Cuando esté revisado, cambiá a `estado: publicado`, corré `python3 build.py` y publicá. Entra solo al sitemap,
   a `llms.txt` y a la portada de Recursos.

Formato admitido en el Markdown: `## Subtítulo`, `### Sub-subtítulo`, párrafos, `**negrita**`, `*itálica*`,
`[enlace](/ruta/)`, listas con `-` o `1.` y citas con `> `.

### Agregar la fotografía profesional

Guardá la foto en `assets/img/nicolas-bongiorno.webp` (formato 4:5, unos 960×1200 px, menos de 200 KB) y en
`sitio.json` poné `"foto": "assets/img/nicolas-bongiorno.webp"`. Aparece en el arco del inicio, en Sobre mí y en
los datos estructurados.

## Publicar

La carpeta a publicar es **`public/`**. Ya incluye `vercel.json` (Vercel) y `_headers`
(Netlify / Cloudflare Pages) con cabeceras de seguridad (CSP estricta, HSTS, etc.) y caché.

**Opción recomendada: Vercel.**
1. En Vercel → *Add New Project* → importar este repositorio.
2. *Root Directory*: `public`. *Framework Preset*: **Other**. Sin comando de build.
3. *Deploy*. Luego, en *Settings → Domains*, agregar el dominio y configurar los DNS que indica Vercel en NIC.ar.
4. Cada cambio que se suba a la rama `main` se publica solo.

**Alternativas:** Netlify o Cloudflare Pages (carpeta de publicación `public`), o cualquier
hosting por FTP subiendo el contenido de `public/` (en ese caso, configurar a mano la página 404 y las cabeceras).


### Después de publicar

1. Cambiar `"url"` en `sitio.json` por el dominio definitivo y volver a generar.
2. Google Search Console: verificar el dominio y enviar `https://TU-DOMINIO/sitemap.xml`.
3. Probar los datos estructurados en <https://search.google.com/test/rich-results> y <https://validator.schema.org>.
4. Revisar la vista previa al compartir en <https://www.opengraph.xyz>.
5. Completar Google Business Profile con la URL del sitio.

## Calidad

`python3 validar.py` revisa títulos, descripciones, canonical, un único H1, Open Graph, JSON-LD (sin reseñas
autoasignadas), enlaces internos, `alt` de imágenes, coherencia entre FAQ visible y datos estructurados, y el
sitemap. El flujo de GitHub Actions `.github/workflows/calidad.yml` lo ejecuta en cada cambio
y además comprueba que `public/` esté actualizado.

## Regenerar íconos e imagen para redes

```bash
npm i playwright   # una sola vez
node herramientas/generar_imagenes.js
```
