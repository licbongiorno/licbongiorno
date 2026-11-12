# «Voces que nos habitan»

Biblioteca de citas verificadas en `/recursos/voces-que-nos-habitan/`. El informe de verificación, con los conteos por
autor, las frases descartadas y los autores pendientes, está en `docs/14-INFORME-VOCES.md` (se regenera solo).

## Rutas

| Ruta | Contenido |
|---|---|
| `/recursos/voces-que-nos-habitan/` | Una idea para hoy, Sorprendeme, Un tema distintas miradas, autores, temas, favoritas y método |
| `/recursos/voces-que-nos-habitan/autores/` | Índice con búsqueda, filtro por disciplina y orden (destacados, alfabético, disciplina, cantidad, recientes) |
| `/recursos/voces-que-nos-habitan/autores/<slug>/` | Ficha del autor y todas sus citas, con búsqueda, filtros por tema y obra, orden y cita al azar |
| `/recursos/voces-que-nos-habitan/temas/<slug>/` | Un tema visto por varios autores. Solo existe si tiene al menos 8 citas de al menos 3 autores |

Cada cita tiene un ancla `#cita-<id>`, que es el enlace que se copia o se comparte.

## Archivos

- `contenido/voces/autores.json`: registro de autores. Los incorporados tienen ficha completa; el resto figura como
  `pendiente` con el motivo (derechos de autor vigentes o fuentes por verificar). También guarda las frases descartadas.
- `contenido/voces/citas/<slug>.json`: las citas de cada autor.
- `contenido/voces/fuentes.json`: las ediciones de dominio público usadas para verificar.
- `contenido/voces/temas.json`: nombres y categorías de los temas. Un tema que no figure se muestra igual, con un nombre derivado.
- `voces_sitio.py`: genera las páginas (lo llama `build.py`). `assets/js/voces.js` y los estilos `.vo-*` en `interactivo.css`.
- `herramientas/fuentes_voces.py`, `herramientas/verificar_voces.py`, `herramientas/voces.py`, `herramientas/gen_registro_voces.py`.

## Reglas editoriales

1. Solo se publica una cita si su texto original aparece literalmente en la fuente (`verificar_voces.py` lo comprueba
   y calcula la ubicación). `validar.py` falla si hay una cita publicada sin verificar.
2. Las traducciones son propias y se dicen propias. Marco Aurelio se cita en la traducción inglesa de George Long (1862).
3. No se incluyen frases que el autor cita de otro, paráfrasis ni atribuciones dudosas. Se registran en `descartadas`.
4. Solo obras de dominio público (vida + 70 años, Ley 11.723). Los autores con obra protegida quedan pendientes.
5. Mínimo de 50 citas verificadas por autor incorporado. Si no se llega, el informe lo dice; no se completa con relleno.

## Agregar un autor

1. Si no está en `contenido/mapa_autores.json`, agregarlo ahí y correr `python3 herramientas/gen_registro_voces.py`.
2. Declarar sus obras en `contenido/voces/fuentes.json` (URL de una edición de dominio público, idioma, año,
   `titulo_es`, `edicion`, `localizador`) y descargarlas: `python3 herramientas/fuentes_voces.py <id>`.
3. Completar su ficha en `contenido/voces/autores.json` (nombre, nombre_completo, nacimiento, muerte, nacionalidad,
   disciplinas, corriente, bio, aportes, obras, relacion, nota_citas).
4. Agregar las citas, una por una, leyendo la obra:
   `python3 herramientas/voces.py agregar <slug> --fuente <id> --original "texto literal" --traduccion "..." --temas a,b`
5. `python3 herramientas/voces.py incorporar <slug>`, luego `python3 build.py` y `python3 validar.py`.

El centro, el índice de autores, los filtros, los contadores, las páginas de tema, el sitemap y el buscador se actualizan solos.

## Otras operaciones

`python3 herramientas/voces.py informe | publicar ID | despublicar ID | editar ID --traduccion ... | eliminar ID`.
Para volver a comprobar todo: `python3 herramientas/verificar_voces.py` (requiere haber descargado las fuentes).
