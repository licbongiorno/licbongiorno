# PsicoQuiz: arquitectura y cómo ampliarlo

Página: `/recursos/psicoquiz/` ([`contenido/paginas/psicoquiz.html`](../contenido/paginas/psicoquiz.html)) ·
Banco: [`contenido/psicoquiz.json`](../contenido/psicoquiz.json) · Motor: [`assets/js/psicoquiz.js`](../assets/js/psicoquiz.js) ·
Estilos: sección «PsicoQuiz» de `assets/css/interactivo.css` (y `.pq-acceso` en `estilos.css` para la tarjeta de Recursos).

## Cómo funciona

- `build.py` lee `contenido/psicoquiz.json` y lo publica como `public/assets/js/psicoquiz-banco.js`
  (`window.PSICOQUIZ = …`). El banco forma parte del hash de versión de los assets: cada cambio renueva la caché.
- `psicoquiz.js` no contiene preguntas: solo el motor (modos, tipos de pregunta, puntaje, logros, guardado).
- `validar.py` revisa el banco en cada build y en CI: campos obligatorios, ids y enunciados únicos, respuestas
  correctas válidas, categorías, temas y modos existentes, mínimos por categoría, nivel y modo, y que cada
  «Explorar este concepto» apunte a una página publicada.
- El progreso se guarda en `localStorage` (`psicoquiz-v1`) y puede borrarse desde «Mi progreso». No hay servidor.

## Estructura de una pregunta

```json
{
  "id": "con-06", "categoria": "conceptos", "subcategoria": "", "nivel": 2,
  "tipo": "unica", "modos": ["error"], "temas": ["jung"],
  "enunciado": "…", "opciones": ["…", "…"], "correcta": 0,
  "alternativas": ["", "por qué esta opción no es correcta", "…"],
  "explicacion": "…", "profundizar": "…", "autor": "…", "contexto": "…", "curiosidad": "…", "pista": "…",
  "fuente": "Referencia verificable", "conceptos": ["Sombra"], "etiquetas": ["mitos"],
  "enlace": {"texto": "La sombra según Jung", "url": "/recursos/la-sombra-segun-jung/"},
  "cita": {"tipo": "textual", "fuente": "Obra y año"}
}
```

- `tipo`: `unica`, `completar` (el enunciado lleva `____`), `vf` (opciones Verdadero/Falso), `multiple`
  (`correcta` es una lista), `relacionar` (usa `pares`: `[["izquierda", "derecha"], …]`) u `ordenar`
  (usa `orden`, en el orden correcto).
- `modos`: además de los modos generales, la pregunta aparece en `quien`, `error`, `caso` o `duelo`.
- `cita.tipo`: `textual` solo con fuente verificable; si no, `parafrasis`.
- `enlace`: solo a páginas existentes. El validador lo exige.

## Ampliaciones previstas

- **Categorías, temas, niveles y logros** se definen en el mismo JSON (`categorias`, `temas`, `niveles`, `logros`).
  Una categoría o un tema nuevo aparecen solos en la portada del juego. Un logro nuevo requiere agregar su
  condición en la función `terminar()` del motor.
- **Colecciones temáticas, desafíos semanales o preparación de exámenes** pueden resolverse con `etiquetas` y una
  nueva entrada en `poolDe()` que filtre por etiqueta, sin cambiar el formato del banco.
- **Controversias**: `controversias` admite cualquier cantidad de debates con `posiciones`, `abierto` y `fuentes`.

## Criterios editoriales

No inventar citas, experimentos ni atribuciones; distinguir teorías históricas, modelos clínicos y hallazgos
empíricos; señalar los debates abiertos y las limitaciones metodológicas o éticas; no usar diagnósticos como
entretenimiento; casos siempre ficticios. El puntaje no se presenta como medida de inteligencia ni de capacidad.
